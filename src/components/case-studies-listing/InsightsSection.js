// "Insights Behind the Results" — blog teaser grid + a jump-to-blog tile,
// with a slot for the CharacterCard alongside the jump tile. Server
// component: the grid content itself is static per-request (posts come from
// getInsightsPosts() in page.js); only the CharacterCard child needs 'use
// client' for its animations.
// Ported from the concept's "insights" section
// (design-concepts/case-studies-listing.html ~lines 632-659, CSS .blog-*/
// .character-cta ~lines 413-460, JS loadInsights ~lines 1423-1455).
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function InsightsSection({ posts = [], children }) {
  return (
    <section className="py-[60px] md:py-[100px] pb-[40px] md:pb-[60px]">
      <div className="max-w-[1200px] mx-auto px-[20px] md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_.7fr] gap-8 items-end mb-9">
          <div>
            <span className="text-accent uppercase tracking-[0.35em] text-xs font-bold">
              Insights Behind The Results
            </span>
            {/* Sentence-case sans per the concept, not League Gothic — see FeaturedGrid.js for the full note. */}
            <h2
              className="mt-3 text-foreground"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.1rem,4.6vw,4rem)",
                lineHeight: 1.02,
              }}
            >
              You saw the outcome. Now see how we <span className="text-accent">think.</span>
            </h2>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Case studies show what changed. Our blog explains the thinking, experiments and lessons behind the work.
          </p>
        </div>

        {/*
          Fluid grid: repeat(auto-fit, minmax(max(220px, (100% - 2*gap)/3), 1fr))
          — 3-column cap that collapses fluidly, instead of the concept's
          single hard breakpoint at 640px (.blog-grid{grid-template-columns:1fr})
          with no intermediate step.
        */}
        <ScrollReveal
          selector=".card"
          stagger={0.08}
          as="div"
          className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(max(220px,(100%-40px)/3),1fr))]"
        >
          {posts.map((post, i) => (
            <Link
              key={i}
              href={post.href}
              className="card block rounded-2xl border border-theme bg-surface-weak overflow-hidden shadow-xl hover:-translate-y-1 hover:shadow-2xl transition"
            >
              {post.image ? (
                <div className="relative h-[150px]">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 90vw, 380px" className="object-cover" />
                </div>
              ) : (
                // Solid accent block, not the concept's from-accent/to-accent-2
                // gradient — this app's token system (src/app/globals.css)
                // has no --accent-2, so a real two-color gradient would mean
                // inventing a second brand color that doesn't exist here.
                <div className="h-[150px] bg-accent" />
              )}
              <div className="p-5">
                <small className="text-accent uppercase tracking-[0.12em] font-bold text-[11px]">
                  {post.label}
                </small>
                <h3 className="text-foreground text-base font-bold leading-snug my-2.5">
                  {post.title}
                </h3>
                <p className="text-muted text-[13px] leading-relaxed">{post.desc}</p>
                <span className="inline-flex mt-3 text-accent text-[13px] font-bold">
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_.7fr] gap-4.5 mt-6">
          {children}
          <Link
            href="/blog"
            className="rounded-2xl bg-[#0d1115] border border-white/10 text-white p-6 flex flex-col justify-between items-start transition-all hover:-translate-y-1 hover:border-accent"
          >
            <strong
              className="text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.02] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Go To
              <br />
              Blog &amp;
              <br />
              Resources
            </strong>
            <span className="self-end text-2xl text-accent mt-3.5">▶</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
