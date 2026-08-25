"use client";

// Featured Case Studies grid — 3 real featured stories + a static "browse all"
// tile. Reads the concept's ~lines 539-550 (markup), 195-245 (story-card CSS),
// 1230-1258 (renderFeatured JS), and 1299-1309 (attachTilt) — ported to a
// React component using this app's design tokens instead of the concept's
// own --panel/--line/--muted vars.
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import ScrollReveal from "./ScrollReveal";
import { categoryNames, STORY_ACCENTS } from "@/lib/case-study-shared";

function StoryCard({ item, categoriesMap, accent }) {
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
      className="card block group"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={innerRef}
        className="rounded-[20px] border overflow-hidden bg-surface flex flex-col h-full transition-[box-shadow,border-color] duration-300 hover:shadow-lg"
        style={{ borderColor: "color-mix(in srgb, " + accent + " 25%, var(--border))", transformStyle: "preserve-3d" }}
      >
        <div
          className="relative h-[200px] mx-4 mt-4 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
          style={{
            background: `color-mix(in srgb, ${accent} 14%, var(--surface-2))`,
            border: `1px solid color-mix(in srgb, ${accent} 20%, var(--border))`,
          }}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 45vw, 320px"
              className="object-cover"
            />
          ) : (
            <span className="text-3xl text-muted" style={{ fontFamily: "var(--font-display)" }}>
              {item.title.charAt(0)}
            </span>
          )}
        </div>

        <div className="p-4 pb-5 flex flex-col flex-1">
          <div className="text-[11px] tracking-[0.14em] uppercase text-muted mb-2.5">
            Featured &middot; {names[0] || "Case Study"}
          </div>
          <div
            className="inline-flex items-center w-max min-h-[28px] px-3 rounded-full text-[12.5px] font-bold mb-3"
            style={{
              color: accent,
              background: `color-mix(in srgb, ${accent} 14%, transparent)`,
              border: `1px solid color-mix(in srgb, ${accent} 30%, var(--border))`,
            }}
          >
            {item.metric || "Case Study"}
          </div>
          <h3 className="font-bold text-[1.05rem] leading-snug text-foreground">{item.title}</h3>
          <p className="text-muted text-[13px] leading-relaxed mt-2 flex-1">
            {item.desc || "A closer look at the strategy, execution, and measurable results behind this project."}
          </p>
          <span className="inline-flex mt-3.5 text-[13px] font-bold" style={{ color: accent }}>
            Read the Case Study →
          </span>
        </div>
      </div>
    </Link>
  );
}

function BrowseAllCard() {
  return (
    <a
      href="#explore"
      className="card block rounded-[20px] border overflow-hidden transition-colors duration-300"
      style={{ background: "#050505", color: "#fff", borderColor: "rgba(255,255,255,.11)" }}
    >
      <div className="flex flex-col justify-between p-6 h-full min-h-[280px]">
        <div
          className="w-[42px] h-[42px] rounded-full grid place-items-center text-lg"
          style={{ border: "1px solid rgba(255,255,255,.16)", color: "#F97316" }}
        >
          ↗
        </div>
        <div>
          <strong
            className="block uppercase mt-5 mb-2.5 text-[clamp(1.5rem,2.2vw,1.9rem)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Explore Every Case Study
          </strong>
          <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,.65)" }}>
            Filter by service pillar and browse the full library below.
          </p>
          <span className="inline-flex mt-3.5 text-[13px] font-bold" style={{ color: "#F97316" }}>
            See All Results →
          </span>
        </div>
      </div>
    </a>
  );
}

export default function FeaturedGrid({ items, categoriesMap }) {
  const cards = items || [];

  return (
    <section className="pt-[70px] pb-[40px] md:pt-[110px] px-[20px] md:px-0">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(260px,.65fr)] gap-8 items-end mb-8">
          <div>
            <span className="inline-block text-[11.5px] font-extrabold tracking-[0.24em] uppercase text-accent mb-4">
              Featured Case Studies
            </span>
            {/*
              Sentence-case sans, not the site-wide .section-heading utility
              (League Gothic) — the concept explicitly calls these 5
              section-intro headings out as deliberately NOT the display
              font (design-concepts/case-studies-listing.html ~line 181-190).
            */}
            <h2
              className="text-foreground mt-2"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.1rem,4.6vw,4rem)",
                lineHeight: 1.02,
              }}
            >
              Start with a story that matches your challenge.
            </h2>
          </div>
          <p className="text-muted leading-relaxed text-[15.5px]">
            Three featured outcomes, presented in the same clean card language used across ABN&apos;s related
            case-study modules. Not sure where to begin? Let us pick one for you.
          </p>
        </div>

        <ScrollReveal
          as="div"
          className="grid gap-5 mt-3 grid-cols-[repeat(auto-fit,minmax(max(240px,(100%-60px)/4),1fr))]"
          selector=".card"
          stagger={0.12}
          y={40}
        >
          {cards.slice(0, 3).map((item, i) => (
            <StoryCard key={item.slug} item={item} categoriesMap={categoriesMap} accent={STORY_ACCENTS[i % STORY_ACCENTS.length]} />
          ))}
          <BrowseAllCard />
        </ScrollReveal>
      </div>
    </section>
  );
}
