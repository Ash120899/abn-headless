"use client";

// "Browse all articles" — filter pills + paginated grid + load-more, all
// client-side against /api/wp-proxy. Ported from the concept's .filters/
// .article-grid/.card (~line 564-591, 1122 pagination), simplified the same
// way src/components/case-studies-listing/ExploreGrid.js simplifies its own
// concept: a fluid auto-fit grid + real load-more instead of the concept's
// baked-in numbered pagination, and an honest error+retry state instead of
// ever silently swapping in mock posts once the page is interactive.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatPostDate } from "@/lib/blog-shared";
import { fetchPostsClient } from "@/lib/wp-blog-client";
import SwitchWord from "./SwitchWord";
import ScrollReveal from "./ScrollReveal";

function PostCard({ item }) {
  return (
    <Link href={`/blog/${item.slug}`} data-slug={item.slug} className="card block">
      <div className="rounded-[20px] border border-theme bg-surface-2 flex flex-col h-full p-[18px] transition-shadow duration-300 hover:shadow-lg">
        <div className="relative h-[190px] rounded-[10px] overflow-hidden bg-surface flex items-center justify-center mb-4 flex-shrink-0">
          {item.image ? (
            <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 90vw, 400px" className="object-contain" />
          ) : (
            <span className="text-3xl text-muted" style={{ fontFamily: "var(--font-editorial)", fontWeight: 800 }}>
              ABN
            </span>
          )}
        </div>
        <span className="text-[11.5px] text-muted mb-1.5 block">{formatPostDate(item.date)}</span>
        <h3 className="font-bold text-[1.1rem] leading-[1.3] text-foreground">{item.title}</h3>
        <p className="text-muted text-[14px] leading-[1.6] mt-2">{item.desc}</p>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div aria-hidden="true" className="animate-pulse rounded-[20px] border border-theme bg-surface-2 p-[18px] flex flex-col h-full">
      <div className="h-[190px] rounded-[10px] bg-surface mb-4" />
      <div className="h-[11px] w-1/4 rounded bg-surface mb-2.5" />
      <div className="h-[1.1rem] w-4/5 rounded bg-surface mb-2.5" />
      <div className="h-[13px] w-full rounded bg-surface mb-1.5" />
      <div className="h-[13px] w-2/3 rounded bg-surface" />
    </div>
  );
}

export default function BlogGrid({ categories, totalCount, initialItems, initialTotalPages }) {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(initialItems || []);
  const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
  const [status, setStatus] = useState("idle");
  const [loadingMode, setLoadingMode] = useState(null);
  const [announce, setAnnounce] = useState(`Showing ${(initialItems || []).length} of ${totalCount} articles`);

  const seenSlugsRef = useRef(new Set());
  const gridRef = useRef(null);
  const retryRef = useRef(null);
  const searchDebounceRef = useRef(null);

  function poolCountFor(catId) {
    if (catId === "all") return totalCount;
    const found = (categories || []).find((c) => c.id === catId);
    return found ? found.count : totalCount;
  }

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

    const newImages = newEls.flatMap((el) => Array.from(el.querySelectorAll("img"))).filter((img) => !img.complete);
    if (newImages.length) {
      Promise.all(newImages.map((img) => new Promise((res) => { img.onload = img.onerror = res; }))).then(() =>
        ScrollTrigger.refresh(true)
      );
    } else {
      ScrollTrigger.refresh(true);
    }
  }, [items]);

  async function runFetch({ mode, targetCategory, targetPage, targetSearch }) {
    retryRef.current = { mode, targetCategory, targetPage, targetSearch };
    setStatus("loading");
    setLoadingMode(mode);
    if (mode === "replace") setAnnounce("Loading articles…");
    try {
      const result = await fetchPostsClient({ page: targetPage, categoryId: targetCategory, search: targetSearch });
      const nextItems = mode === "append" ? items.concat(result.items) : result.items;
      setTotalPages(result.totalPages);
      setItems(nextItems);
      setPage(targetPage);
      setAnnounce(
        targetSearch
          ? `Showing ${nextItems.length} articles matching "${targetSearch}"`
          : `Showing ${nextItems.length} of ${poolCountFor(targetCategory)} articles`
      );
      setStatus("idle");
      setLoadingMode(null);
    } catch (err) {
      console.error("BlogGrid: fetch failed", err);
      setStatus("error");
      setLoadingMode(null);
    }
  }

  function handleFilterClick(catId) {
    if (status === "loading") return;
    setCategory(catId);
    runFetch({ mode: "replace", targetCategory: catId, targetPage: 1, targetSearch: search });
  }

  function handleLoadMore() {
    if (status === "loading") return;
    runFetch({ mode: "append", targetCategory: category, targetPage: page + 1, targetSearch: search });
  }

  function handleRetry() {
    if (!retryRef.current) return;
    runFetch(retryRef.current);
  }

  // Debounced live search — matches the concept's "Search articles, topics,
  // tools or categories..." box, but queries WP's own REST search server-side
  // (see wp-blog.js) instead of substring-matching the concept's baked-in
  // 66-post snapshot client-side.
  function handleSearchChange(e) {
    const value = e.target.value;
    setSearch(value);
    if (status === "loading" && loadingMode === "replace") {
      // let the in-flight replace settle rather than racing it — the next
      // keystroke's debounce will fire another replace shortly after anyway
    }
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      runFetch({ mode: "replace", targetCategory: category, targetPage: 1, targetSearch: value });
    }, 400);
  }

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, []);

  const pills = [{ id: "all", name: "All Articles", count: totalCount }, ...(categories || [])];

  return (
    <section id="articles" className="pt-[50px] pb-[80px] md:pt-[70px] md:pb-[110px] border-t border-theme">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-6">
        <ScrollReveal as="div" className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-end mb-4">
          <div>
            <span
              className="inline-flex items-center gap-3 text-[12px] uppercase"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 800, letterSpacing: ".28em", color: "var(--bl-cyan)" }}
            >
              <span className="w-8 h-px" style={{ background: "currentColor" }} />
              Browse all articles
            </span>
            <h2
              className="text-foreground mt-3"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 880, letterSpacing: "-.05em", lineHeight: 1.02, fontSize: "clamp(2.8rem,5.6vw,5rem)" }}
            >
              Find the <SwitchWord words={["outcome", "juice"]} /> relevant to you.
            </h2>
          </div>
          <p className="text-muted" style={{ lineHeight: 1.72, fontSize: "clamp(1.02rem,1.5vw,1.18rem)" }}>
            Primary filters keep the library scannable — pick a category to narrow the list, or browse everything.
          </p>
        </ScrollReveal>

        {/*
          Wrapping into 8 separate rows on mobile (each pill full-width-ish)
          ate a huge amount of vertical space before the reader ever saw an
          article. Below md this is a 2-row grid that fills column-by-column
          (grid-flow-col) and scrolls horizontally as one unit, instead of
          either that tall 8-row stack or a single very-long scrolling row —
          reverting to the normal multi-row wrap once there's enough width
          to not need scrolling at all.
        */}
        <ScrollReveal
          as="div"
          className="grid grid-rows-2 grid-flow-col auto-cols-max gap-3 mt-7 mb-8 overflow-x-auto md:flex md:flex-wrap md:overflow-visible pb-1 md:pb-0 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Filter articles by category"
        >
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
                  "shrink-0 inline-flex items-baseline gap-2 px-[22px] py-3.5 rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-60 " +
                  (pressed ? "bg-accent border-accent" : "border-theme text-muted hover:text-foreground")
                }
                style={{
                  fontWeight: 800,
                  ...(pressed
                    ? { color: "#0a0a0a" }
                    : { background: "color-mix(in srgb, var(--surface) 78%, transparent)" }),
                }}
              >
                {c.name}
                <span className="opacity-65 text-[11.5px] font-semibold">{c.count}</span>
              </button>
            );
          })}
        </ScrollReveal>

        <ScrollReveal
          as="div"
          className="mt-4.5 mb-4 flex items-center gap-3.5 bg-surface border border-theme px-4 py-3 rounded-[22px]"
        >
          <span className="text-[12px] uppercase text-muted" style={{ fontWeight: 900, letterSpacing: ".16em" }}>
            Search
          </span>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search articles, topics, tools or categories..."
            className="border-0 bg-transparent outline-none text-foreground text-base w-full"
          />
        </ScrollReveal>

        <div aria-live="polite" className="sr-only">{announce}</div>

        {status === "error" ? (
          <div className="text-center py-16 px-5 text-muted">
            <p className="mb-4">Something went wrong loading these articles. Please try again.</p>
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
            className="grid gap-[26px] min-h-[200px] mt-7 grid-cols-[repeat(auto-fit,minmax(max(240px,(100%-52px)/3),1fr))]"
          >
            {status === "loading" && loadingMode === "replace" ? (
              Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
            ) : items.length ? (
              items.map((item) => <PostCard key={item.slug} item={item} />)
            ) : (
              <div className="col-span-full text-center py-16 px-5 text-muted">No articles found in this category yet.</div>
            )}
          </div>
        )}

        {status !== "error" && page < totalPages ? (
          <div className="text-center mt-11">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-theme bg-surface text-foreground font-bold text-[13px] hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Loading…" : "View More Articles ↓"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
