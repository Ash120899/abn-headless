"use client";

// Hero — headline + stat counters. Content and typography match
// design-concepts/ABN_Blogs_V4_Magnetic_Interactive_Concept.html's hero
// (~line 397-407: .eyebrow/.big-kicker/.section-copy/.hero-kpis) as closely
// as a real, live-data hero can — same Inter typography scale (weight 735
// big-kicker, -.055em tracking, uppercase), same copy, same 3 KPIs. The
// concept's own magnetic-orb mouse-tracking sphere is not ported (a huge,
// bespoke interaction with no equivalent elsewhere in this app) — replaced
// with a lightweight decorative CSS-only ring/orb so the hero isn't just a
// text column, without the full-cursor-magnet build.
import { useEffect, useRef } from "react";
import gsap from "gsap";

function Counter({ target, suffix = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 1.6,
      ease: "power2.out",
      delay: 0.35,
      onUpdate: () => {
        el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
      },
    });
    return () => tween.kill();
  }, [target, suffix]);

  return (
    <strong
      ref={ref}
      className="block text-foreground"
      style={{ fontFamily: "var(--font-editorial)", fontWeight: 900, fontSize: "2.08rem", lineHeight: 1 }}
    >
      0
    </strong>
  );
}

export default function HeroScene({ totalCount = 0, categoryCount = 0 }) {
  useEffect(() => {
    gsap.set(".blog-hero-line span", { yPercent: 110 });
    gsap.set(".blog-hero-sub, .blog-hero-kpis", { opacity: 0, y: 20 });
    const t = setTimeout(() => {
      gsap.to(".blog-hero-line span", { yPercent: 0, duration: 1, stagger: 0.12, ease: "power4.out" });
      gsap.to(".blog-hero-sub, .blog-hero-kpis", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden pt-[64px] pb-[70px] md:pt-[92px] md:pb-[110px]">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 12%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 36%), radial-gradient(circle at 84% 26%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 32%)",
        }}
      />
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-6 relative z-[1] grid gap-10 items-center lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <span
            className="inline-flex items-center gap-3 text-[12px] uppercase"
            style={{ fontFamily: "var(--font-editorial)", fontWeight: 800, letterSpacing: ".28em", color: "var(--accent)" }}
          >
            <span className="w-8 h-px" style={{ background: "currentColor" }} />
            ABN Insights · Blog
          </span>

          <h1
            className="mt-4 text-foreground uppercase"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 735,
              letterSpacing: "-.055em",
              lineHeight: 0.9,
              fontSize: "clamp(2.75rem,6.35vw,5.55rem)",
            }}
          >
            <span className="blog-hero-line block overflow-hidden">
              <span className="block">Ideas that move</span>
            </span>
            <span className="blog-hero-line block overflow-hidden">
              <span className="block text-accent">the needle.</span>
            </span>
          </h1>

          <p
            className="blog-hero-sub text-muted mt-6 max-w-[560px]"
            style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(1.02rem,1.5vw,1.18rem)", lineHeight: 1.72 }}
          >
            What we are testing, learning and seeing across paid media, SEO, design, development, video and digital
            infrastructure — written by the people actually doing the work.
          </p>

          <div className="blog-hero-kpis mt-9 flex flex-wrap gap-3.5">
            <div className="min-w-[135px] px-[17px] pt-3.5 pb-3 rounded-[22px] border border-theme bg-surface-weak">
              <Counter target={totalCount} suffix="+" />
              <span
                className="text-muted mt-2 block text-[11px] uppercase"
                style={{ fontWeight: 700, letterSpacing: ".18em" }}
              >
                Articles Published
              </span>
            </div>
            <div className="min-w-[135px] px-[17px] pt-3.5 pb-3 rounded-[22px] border border-theme bg-surface-weak">
              <Counter target={categoryCount} suffix="+" />
              <span
                className="text-muted mt-2 block text-[11px] uppercase"
                style={{ fontWeight: 700, letterSpacing: ".18em" }}
              >
                Knowledge Areas
              </span>
            </div>
            <div className="min-w-[135px] px-[17px] pt-3.5 pb-3 rounded-[22px] border border-theme bg-surface-weak">
              <Counter target={5} />
              <span
                className="text-muted mt-2 block text-[11px] uppercase"
                style={{ fontWeight: 700, letterSpacing: ".18em" }}
              >
                Service Pillars
              </span>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:flex items-center justify-center" aria-hidden="true">
          <span
            className="absolute rounded-full border border-theme"
            style={{
              width: "clamp(280px,26vw,360px)",
              height: "clamp(280px,26vw,360px)",
              opacity: 0.4,
              animation: "blog-hero-spin 30s linear infinite",
            }}
          />
          <span
            className="absolute rounded-full border border-theme"
            style={{
              width: "clamp(340px,32vw,440px)",
              height: "clamp(340px,32vw,440px)",
              opacity: 0.22,
              animation: "blog-hero-spin-rev 42s linear infinite",
            }}
          />
          <div
            className="relative rounded-full flex items-center justify-center"
            style={{
              width: "clamp(180px,18vw,240px)",
              height: "clamp(180px,18vw,240px)",
              background:
                "radial-gradient(circle at 34% 28%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 62%), var(--surface-weak)",
              border: "1px solid color-mix(in srgb, var(--accent) 32%, var(--border))",
              boxShadow: "0 30px 60px rgba(0,0,0,.24)",
            }}
          >
            <span style={{ fontFamily: "var(--font-editorial)", fontWeight: 900, fontSize: "2.1rem", letterSpacing: "-0.05em", color: "var(--accent)" }}>
              ABN
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blog-hero-spin { to { transform: rotate(360deg); } }
        @keyframes blog-hero-spin-rev { to { transform: rotate(-360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .blog-hero-line span, .blog-hero-sub, .blog-hero-kpis { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
