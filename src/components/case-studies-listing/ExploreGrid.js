"use client";

// "Browse All Case Studies" — the real interactive listing: filter pills +
// paginated grid + load-more, all client-side against /api/wp-proxy. Reads
// the concept's ~lines 575-589 (markup), the .filters/.grid/.card CSS, and
// the state/renderFilters/refreshGrid/attachTilt JS (~lines 722-1309,
// 1503-1533). Ported deliberately different from the concept in three ways:
//  1. Fluid auto-fit grid instead of the concept's hard repeat(3,1fr) jump.
//  2. Real aria-pressed filter pills + an aria-live status region.
//  3. Client-side failures render an honest error+retry state instead of
//     silently swapping in MOCK_CASE_STUDIES (see task brief) — the SSR'd
//     first page already carries its own server-side mock fallback inside
//     getCaseStudies(), but once the page is interactive, a failed filter
//     or load-more must not lie to the visitor with fabricated content.
//  4. The concept's gsap.fromTo('.card', ...) re-targets EVERY card on every
//     render (a bug — already-visible cards restart their fade on load
//     more). Fixed here by tracking previously-seen slugs in a ref and only
//     animating cards whose slug wasn't seen before this render.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categoryNames } from "@/lib/case-study-shared";
import { fetchCaseStudiesClient } from "@/lib/wp-proxy-client";
import SwitchWord from "./SwitchWord";

function ExploreCard({ item, categoriesMap }) {
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    function onMove(e) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(inner, { rotateY: x * 8, rotateX: -y * 8, duration: 0.4, ease: "power2.out", transformPerspective: 900 });
    }
    function onLeave() {
      gsap.to(inner, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
    }
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const names = categoryNames(item.categories, categoriesMap);

  return (
    <Link
      ref={cardRef}
      href={`/case-studies/${item.slug}`}
      data-slug={item.slug}
      className="card block"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={innerRef}
        className="rounded-[20px] border border-theme bg-surface-2 p-[18px] flex flex-col h-full transition-[box-shadow,border-color] duration-300 hover:shadow-lg"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative h-[200px] rounded-[10px] overflow-hidden bg-surface flex items-center justify-center mb-4 flex-shrink-0">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 90vw, 400px"
              className="object-cover"
            />
          ) : (
            <span className="text-4xl text-muted" style={{ fontFamily: "var(--font-editorial)", fontWeight: 800 }}>
              {item.title.charAt(0)}
            </span>
          )}
        </div>

        {names.length ? (
          <div className="text-[11px] tracking-[0.14em] uppercase text-muted mb-2">{names.join(" · ")}</div>
        ) : null}

        <h3 className="font-bold text-[1.15rem] leading-snug text-foreground">{item.title}</h3>

        <p className="text-muted text-[13.5px] leading-relaxed mt-2 flex-1">
          {item.desc || "A closer look at the strategy, execution, and measurable results behind this project."}
        </p>
      </div>
    </Link>
  );
}

// Skeleton placeholder shown while a category switch is loading a fresh
// page of results — replaces the grid content rather than just dimming it,
// since a static half-opacity grid read as broken/unfinished, not "loading".
// animate-pulse is neutralized automatically by globals.css's
// prefers-reduced-motion guard (it zeroes all animation-duration).
function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse rounded-[20px] border border-theme bg-surface-2 p-[18px] flex flex-col h-full"
    >
      <div className="h-[200px] rounded-[10px] bg-surface mb-4" />
      <div className="h-[11px] w-2/5 rounded bg-surface mb-2.5" />
      <div className="h-[1.15rem] w-4/5 rounded bg-surface mb-2.5" />
      <div className="h-[26px] w-24 rounded-full bg-surface mb-2.5" />
      <div className="h-[13px] w-full rounded bg-surface mb-1.5" />
      <div className="h-[13px] w-2/3 rounded bg-surface" />
    </div>
  );
}

export default function ExploreGrid({ categories, categoriesMap, totalCount, initialItems, initialTotalPages }) {
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(initialItems || []);
  const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [loadingMode, setLoadingMode] = useState(null); // "replace" | "append" | null — which action triggered the current load
  const [announce, setAnnounce] = useState(`Showing ${(initialItems || []).length} of ${totalCount} case studies`);

  const seenSlugsRef = useRef(new Set());
  const gridRef = useRef(null);
  const retryRef = useRef(null); // last request, for the "Try again" button

  function poolCountFor(catId) {
    if (catId === "all") return totalCount;
    const found = (categories || []).find((c) => c.id === catId);
    return found ? found.count : totalCount;
  }

  // Fade in only newly-added cards (fixes the concept's every-render bug —
  // see file header).
  useEffect(() => {
    if (!gridRef.current) return;
    const newEls = [];
    items.forEach((item) => {
      if (!seenSlugsRef.current.has(item.slug)) {
        const el = gridRef.current.querySelector(`[data-slug="${item.slug}"]`);
        if (el) newEls.push(el);
      }
    });
    if (newEls.length) {
      gsap.fromTo(newEls, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" });
    }
    items.forEach((item) => seenSlugsRef.current.add(item.slug));

    // Filtering/loading more resizes this grid, which shifts every pinned
    // section below it (process) out from under their already-calculated
    // scroll offsets — same stale-offset bug ScrollFX guards against on
    // initial load. Refresh once the new cards' images have actually loaded
    // (not just once the DOM nodes exist). Must be a hard refresh (see
    // ScrollFX.js) since process's pin sits after the hero's.
    const newImages = newEls.flatMap((el) => Array.from(el.querySelectorAll("img"))).filter((img) => !img.complete);
    if (newImages.length) {
      Promise.all(
        newImages.map((img) => new Promise((res) => { img.onload = img.onerror = res; }))
      ).then(() => ScrollTrigger.refresh(true));
    } else {
      ScrollTrigger.refresh(true);
    }
  }, [items]);

  async function runFetch({ mode, targetCategory, targetPage }) {
    retryRef.current = { mode, targetCategory, targetPage };
    setStatus("loading");
    setLoadingMode(mode);
    if (mode === "replace") setAnnounce("Loading case studies…");
    try {
      const result = await fetchCaseStudiesClient({ page: targetPage, categoryId: targetCategory });
      const nextItems = mode === "append" ? items.concat(result.items) : result.items;
      setTotalPages(result.totalPages);
      setItems(nextItems);
      setPage(targetPage);
      setAnnounce(`Showing ${nextItems.length} of ${poolCountFor(targetCategory)} case studies`);
      setStatus("idle");
      setLoadingMode(null);
    } catch (err) {
      // Honest failure — no silent mock swap for a live, already-interactive user.
      console.error("ExploreGrid: fetch failed", err);
      setStatus("error");
      setLoadingMode(null);
    }
  }

  function handleFilterClick(catId) {
    if (status === "loading") return;
    setCategory(catId);
    runFetch({ mode: "replace", targetCategory: catId, targetPage: 1 });
  }

  function handleLoadMore() {
    if (status === "loading") return;
    runFetch({ mode: "append", targetCategory: category, targetPage: page + 1 });
  }

  function handleRetry() {
    if (!retryRef.current) return;
    runFetch(retryRef.current);
  }

  const pills = [{ id: "all", name: "All Case Studies", count: totalCount }, ...(categories || [])];

  return (
    <section id="explore" className="pt-[50px] pb-[80px] md:pt-[70px] md:pb-[130px]">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-0">
        <div>
          <span className="inline-block text-[11.5px] font-extrabold tracking-[0.24em] uppercase text-accent mb-4">
            Browse All Case Studies
          </span>
          {/* Sentence-case per the concept, not the site-wide League-Gothic .section-heading; typography + switching-word accent match FeaturedGrid.js's note. */}
          <h2
            className="text-foreground mt-2"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 880,
              letterSpacing: "-0.05em",
              fontSize: "clamp(2.1rem,4.6vw,4rem)",
              lineHeight: 1.02,
            }}
          >
            Find the <SwitchWord words={["outcome", "result"]} /> relevant to you.
          </h2>
          <p className="text-muted text-sm max-w-[560px] mt-2.5">
            Start with one of ABN Junction&apos;s five core pillars. Secondary filters only appear after you choose
            a primary category, keeping the page simple as the case-study library grows.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 my-8" role="group" aria-label="Filter case studies by category">
          {pills.map((c) => {
            const pressed = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={pressed}
                disabled={status === "loading"}
                onClick={() => handleFilterClick(c.id)}
                className={
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-[13px] font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 " +
                  (pressed ? "bg-accent border-accent" : "bg-surface border-theme text-muted hover:text-foreground")
                }
                style={pressed ? { color: "#0a0a0a" } : undefined}
              >
                {c.name}
                <span className="opacity-70 text-[11.5px] font-semibold">{c.count}</span>
              </button>
            );
          })}
        </div>

        {/* Screen-reader feedback when filtered/loaded results change. */}
        <div aria-live="polite" className="sr-only">
          {announce}
        </div>

        {status === "error" ? (
          <div className="text-center py-16 px-5 text-muted">
            <p className="mb-4">Something went wrong loading these case studies. Please try again.</p>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-theme bg-surface text-foreground font-bold text-[13px] hover:border-accent hover:text-accent transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid gap-6 min-h-[200px] grid-cols-[repeat(auto-fit,minmax(max(240px,(100%-48px)/3),1fr))]"
          >
            {status === "loading" && loadingMode === "replace" ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
            ) : items.length ? (
              items.map((item) => <ExploreCard key={item.slug} item={item} categoriesMap={categoriesMap} />)
            ) : (
              <div className="col-span-full text-center py-16 px-5 text-muted">
                No case studies found in this category yet.
              </div>
            )}
          </div>
        )}

        {status !== "error" && page < totalPages ? (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-theme bg-surface text-foreground font-bold text-[13px] hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Loading…" : "View More Case Studies ↓"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
