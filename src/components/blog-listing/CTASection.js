// Server component — character card + "Go to case studies" resource panel,
// plus the 5-step process bar. Ported from the concept's #cta section
// (~line 1167-1192).
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const STEPS = ["Understand", "Strategise", "Execute", "Measure", "Improve"];

export default function CTASection() {
  return (
    <section id="cta" className="py-[70px] md:py-[100px] border-t border-theme">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-6">
        <ScrollReveal as="div" className="grid gap-6 grid-cols-1 md:grid-cols-2 items-stretch">
          {/*
            180px is the concept's own fixed image-column width — kept
            literal (not stacked until lg/1024px) rather than the earlier
            100/150px approximation, but deliberately NOT switched on at the
            same breakpoint (md/768) where the outer cta-duo pair goes
            side-by-side: that combination leaves a ~768-1020px tablet zone
            where 180px+text barely fits (a variant of the same cramped-panel
            bug fixed on the concept file itself for its own character-panel).
          */}
          <div className="rounded-[30px] border border-theme bg-surface p-7 grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-6 items-center">
            <div className="grid place-items-center">
              <span className="cta-bob-emoji text-[64px] md:text-[80px] leading-none block animate-[cta-bob_3.2s_ease-in-out_infinite]">
                📚
              </span>
            </div>
            <div className="text-center lg:text-left">
              <h3
                className="text-foreground"
                style={{ fontFamily: "var(--font-editorial)", fontWeight: 950, letterSpacing: "-.05em", fontSize: "clamp(2rem,3.2vw,3.7rem)" }}
              >
                Not sure what to explore next?
              </h3>
              <p className="text-muted mt-2.5 mx-auto lg:mx-0" style={{ fontSize: "1.12rem", maxWidth: "42ch" }}>
                Jump into the ABN knowledge hub for practical articles, tools and ideas behind better digital
                performance.
              </p>
            </div>
          </div>

          <Link
            href="/case-studies"
            className="rounded-[30px] border border-theme grid place-items-center text-left p-8"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--surface-2) 88%, transparent), color-mix(in srgb, var(--surface) 96%, transparent))",
            }}
          >
            <div
              className="text-foreground uppercase"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 735, letterSpacing: "-.055em", lineHeight: 0.9, fontSize: "clamp(2.5rem,4.2vw,4rem)", maxWidth: "7ch" }}
            >
              Go to case studies
            </div>
          </Link>
        </ScrollReveal>

        <ScrollReveal
          as="div"
          className="mt-[26px] py-6 border-t border-b border-theme flex justify-center gap-[22px] flex-wrap font-black text-foreground"
        >
          {STEPS.map((step, i) => (
            <span key={step} className="relative pr-4.5">
              {step}
              {i < STEPS.length - 1 ? <span className="absolute -right-2" style={{ color: "var(--bl-cyan)" }}>→</span> : null}
            </span>
          ))}
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes cta-bob { 50% { transform: translateY(-8px) rotate(-2deg); } }
      `}</style>
    </section>
  );
}
