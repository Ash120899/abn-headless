"use client";

// Featured section — feature-main + support-story + a random-post
// discovery tile + a recent-posts/core-topics side panel + a rotating CTA
// card. Layout/content/typography port
// design-concepts/ABN_Blogs_V4_Magnetic_Interactive_Concept.html's
// .featured-layout (~line 456-538) as closely as real data allows.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SwitchWord from "./SwitchWord";
import ScrollReveal from "./ScrollReveal";

const BLOG_TITLE = {
  fontFamily: "var(--font-editorial)",
  fontWeight: 900,
  letterSpacing: "-.04em",
  lineHeight: 0.96,
  color: "var(--heading, var(--foreground))",
};

const BLOG_CARD_BG = {
  background:
    "linear-gradient(180deg, color-mix(in srgb, var(--surface-2) 84%, transparent), color-mix(in srgb, var(--surface) 92%, transparent))",
};

function PostCard({ item, big }) {
  return (
    <Link href={`/blog/${item.slug}`} className="block h-full">
      <article
        className="rounded-[30px] border border-theme overflow-hidden flex flex-col h-full shadow-sm"
        style={BLOG_CARD_BG}
      >
        <div
          className="relative overflow-hidden bg-surface flex-shrink-0"
          style={{ minHeight: big ? 360 : 220 }}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes={big ? "(max-width: 1024px) 100vw, 640px" : "(max-width: 1024px) 100vw, 400px"}
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-muted text-3xl" style={BLOG_TITLE}>
              ABN
            </div>
          )}
          <span className="absolute left-[18px] top-[18px] z-[2] px-3.5 py-2 rounded-full bg-black/60 backdrop-blur text-white text-[11px] font-black uppercase tracking-[.16em]">
            {big ? `Featured${item.categoryLabel ? ` · ${item.categoryLabel}` : ""}` : item.categoryLabel || "Blog"}
          </span>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2.5 text-[12px] uppercase text-muted" style={{ fontWeight: 900, letterSpacing: ".18em" }}>
            {/* The concept only shows the 3-dot service marker on the
                feature-main card, not on support-story. */}
            {big ? (
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "linear-gradient(145deg,var(--accent),var(--bl-cyan))" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "linear-gradient(145deg,var(--accent),var(--bl-cyan))" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "linear-gradient(145deg,var(--accent),var(--bl-cyan))" }} />
              </span>
            ) : null}
            {item.categoryLabel || "Blog"}
          </div>
          <h3
            className="text-foreground mt-3.5"
            style={{ ...BLOG_TITLE, fontSize: big ? "clamp(2.2rem,4.1vw,4.35rem)" : "clamp(1.65rem,2vw,2.8rem)" }}
          >
            {item.title}
          </h3>
          <p className="text-muted mt-3.5 flex-1" style={{ fontSize: "1.03rem", maxWidth: "50ch" }}>
            {item.desc}
          </p>
          <span className="inline-flex mt-4.5 font-black" style={{ fontSize: "1rem", color: "var(--bl-cyan)" }}>
            Read the Article →
          </span>
        </div>
      </article>
    </Link>
  );
}

function RandomBox({ href }) {
  return (
    <a
      href={href}
      className="h-full rounded-[30px] border border-theme bg-[#080a0d] text-white grid place-items-center text-center min-h-[260px] p-8"
    >
      <div>
        <div className="text-accent text-[12px] font-black uppercase tracking-[.24em]">Discovery Mode</div>
        <div
          className="mt-3 uppercase mx-auto"
          style={{ ...BLOG_TITLE, color: "#fff", fontWeight: 735, letterSpacing: "-.055em", lineHeight: 0.9, fontSize: "clamp(2.25rem,4vw,3.8rem)", maxWidth: "6.5ch" }}
        >
          Read a random blog.
        </div>
        <p className="mt-3.5 text-white/65 mx-auto" style={{ maxWidth: "22ch" }}>
          Not sure where to start? Let ABN pick one useful article for you.
        </p>
      </div>
    </a>
  );
}

const SIDE_PANEL_BG = { background: "color-mix(in srgb, var(--surface) 86%, transparent)" };

function SidePanelWrap({ recentPosts, topics }) {
  return (
    <div className="grid gap-6 content-start">
      <div className="border border-theme rounded-[26px] p-6" style={SIDE_PANEL_BG}>
        <h4 className="text-[1.34rem] mb-4 text-foreground" style={{ fontWeight: 900 }}>Recent Posts</h4>
        <div className="grid gap-3.5">
          {recentPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="pb-3 border-b border-dashed border-theme font-bold text-muted last:border-b-0 last:pb-0 hover:text-foreground transition-colors"
            >
              {p.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="border border-theme rounded-[26px] p-6" style={SIDE_PANEL_BG}>
        <h4 className="text-[1.34rem] mb-4 text-foreground" style={{ fontWeight: 900 }}>Core Topics</h4>
        <div className="grid gap-3.5">
          {topics.map((c) => (
            <span key={c.id} className="pb-3 border-b border-dashed border-theme font-bold text-muted last:border-b-0 last:pb-0">
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const SWAP_SLIDES = [
  {
    headline: "Turn blog interest into a strategy conversation.",
    copy: "If a topic resonates, the next natural step is to speak with ABN about applying that thinking to your own brand or campaign.",
  },
  {
    headline: "Need help applying the insight to your business?",
    copy: "Want a growth audit, campaign direction or landing-page input? Use this space to move readers from insights to action.",
  },
  {
    headline: "Want ABN to cover a topic relevant to you?",
    copy: "You can even rotate messages here automatically — strategy call, contact us, or suggest a topic you want the team to cover next.",
  },
];

function CtaSwapCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SWAP_SLIDES.length), 3200);
    return () => clearInterval(id);
  }, []);

  const slide = SWAP_SLIDES[index];

  return (
    <div
      className="bl-swap-card rounded-[28px] border border-theme p-6 flex flex-col justify-between min-h-[292px] relative overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, color-mix(in srgb, var(--surface) 86%, transparent), color-mix(in srgb, var(--surface-2) 96%, transparent))",
      }}
    >
      <div>
        <div className="text-accent text-[12px] font-black uppercase tracking-[.18em]">
          Need something more direct?
        </div>
        <div
          className="mt-3.5 text-foreground min-h-[2.1em]"
          style={{ ...BLOG_TITLE, fontSize: "clamp(1.8rem,2.4vw,2.7rem)", lineHeight: 1.03 }}
        >
          {slide.headline}
        </div>
        <p className="text-muted mt-2.5" style={{ lineHeight: 1.7 }}>{slide.copy}</p>
      </div>
      <div>
        <div className="flex flex-wrap gap-3 mt-5">
          <a
            href="https://abnjunction.com/contact-us/"
            className="inline-flex items-center justify-center rounded-full bg-accent text-white font-black px-6 py-3.5 text-[13px] uppercase tracking-[.08em]"
          >
            Book a Strategy Call
          </a>
          <a
            href="https://abnjunction.com/contact-us/"
            className="inline-flex items-center justify-center rounded-full border border-theme text-foreground font-black px-6 py-3.5 text-[13px] uppercase tracking-[.08em]"
          >
            Contact ABN
          </a>
        </div>
        <div className="flex gap-2 mt-4">
          {SWAP_SLIDES.map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full transition-transform"
              style={{
                background: i === index ? "linear-gradient(145deg,var(--accent),var(--bl-cyan))" : "var(--border)",
                transform: i === index ? "scale(1.18)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedGrid({ items, categoriesMap, categories, randomHref }) {
  const [featureMain, supportStory] = items;
  const recentPosts = items.slice(0, 3);

  if (!featureMain) return null;

  return (
    <section className="py-[70px] md:py-[100px]">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-6">
        <ScrollReveal as="div" className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-end mb-9">
          <div>
            <span
              className="inline-flex items-center gap-3 text-[12px] uppercase"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 800, letterSpacing: ".28em", color: "var(--bl-cyan)" }}
            >
              <span className="w-8 h-px" style={{ background: "currentColor" }} />
              Latest / Editor&apos;s Pick
            </span>
            <h2
              className="text-foreground mt-3"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 880, letterSpacing: "-.05em", lineHeight: 1.02, fontSize: "clamp(2.8rem,5.6vw,5rem)" }}
            >
              Open with <SwitchWord words={["stories", "gossip"]} /> worth reading.
            </h2>
          </div>
          <p className="text-muted" style={{ lineHeight: 1.72, fontSize: "clamp(1.02rem,1.5vw,1.18rem)" }}>
            One lead story, one support story, a random article starter, and a conversion-friendly CTA block —
            a stronger editorial hierarchy for the page.
          </p>
        </ScrollReveal>

        <ScrollReveal as="div" className="bl-featured-layout">
          <div className="bl-feature-main">
            <PostCard item={featureMain} big />
          </div>
          {/*
            Column 2 and column 3 are each a single grid item — a flex column
            holding its own 2 cards — rather than the concept's literal
            grid-row-span split (bl-feature-main spanning rows 1-2 while
            support-story/random-box sit in row 1 and side-panel/cta-swap sit
            in row 2). The grid stretches all 3 columns to equal height (the
            default align-items:stretch — matching feature-main, usually the
            tallest). Within each column the TOP card (support-story /
            random-box) is flex-1 and grows to absorb that extra height,
            while the bottom card (side-panel / cta-swap) stays at its
            natural size, pinned below — not justify-content:space-between,
            which just relocates the dead space into a gap between the two
            cards instead of removing it.
          */}
          <div className="bl-side-col flex flex-col gap-6">
            {supportStory ? (
              <div className="flex-1">
                <PostCard item={supportStory} />
              </div>
            ) : null}
            <SidePanelWrap recentPosts={recentPosts} topics={(categories || []).slice(0, 3)} />
          </div>
          <div className="bl-side-col flex flex-col gap-6">
            <div className="flex-1">
              <RandomBox href={randomHref} />
            </div>
            <CtaSwapCard />
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .bl-featured-layout{display:grid;gap:24px;grid-template-columns:1.18fr .82fr .82fr}
        @media (max-width:1180px){
          .bl-featured-layout{grid-template-columns:1fr 1fr}
          .bl-feature-main{grid-column:1 / -1}
        }
        @media (max-width:760px){
          .bl-featured-layout{grid-template-columns:1fr}
        }
        .bl-swap-card::before{content:"";position:absolute;inset:auto -15% -15% auto;width:180px;height:180px;background:radial-gradient(circle, rgba(87,200,243,.16), transparent 68%);pointer-events:none}
      `}</style>
    </section>
  );
}
