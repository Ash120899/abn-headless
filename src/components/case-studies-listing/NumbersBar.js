"use client";

// "By The Numbers" strip — reads the concept's ~lines 552-559 (markup) and
// 248-253 (.numbers-inner CSS) and the counter-tween pattern from
// setupCounter() (~line 1037). The concept's bordered/divided 4-up grid
// (repeat(4,1fr) + :nth-child dividers) is deliberately NOT ported — that
// breaks once the grid becomes fluid/auto-fit, so each stat gets its own
// card instead (see task brief).
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Counter({ target, suffix = "", decimals = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = (decimals ? obj.val.toFixed(decimals) : Math.floor(obj.val).toLocaleString()) + suffix;
          },
        }),
    });

    return () => st.kill();
  }, [target, suffix, decimals]);

  return (
    <strong
      ref={ref}
      className="block text-foreground"
      style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem,4vw,3.6rem)" }}
    >
      0
    </strong>
  );
}

function StatCard({ children, label }) {
  return (
    <div className="rounded-2xl border border-theme bg-surface-weak text-center py-9 px-6">
      {children}
      <span className="block text-[11px] tracking-[0.14em] uppercase text-muted mt-1.5">{label}</span>
    </div>
  );
}

export default function NumbersBar({ totalCount, leadsSum, reachSum, lowestCpl }) {
  const reachM = reachSum ? +(reachSum / 1e6).toFixed(1) : 0;
  const cplLabel = lowestCpl ? `₹${Number(lowestCpl).toFixed(2)}` : "On Request";

  return (
    <section className="border-t border-b border-theme bg-surface">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-0 py-10">
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
          <StatCard label="Leads Generated">
            <Counter target={leadsSum || 0} suffix="+" />
          </StatCard>
          <StatCard label="Total Reach">
            <Counter target={reachM} suffix="M+" decimals={1} />
          </StatCard>
          <StatCard label="Lowest Cost Per Lead">
            <strong
              className="block text-accent"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem,4vw,3.6rem)" }}
            >
              {cplLabel}
            </strong>
          </StatCard>
          <StatCard label="Connected Service Pillars">
            {/* Static, not derived from fetched data — deliberate, see task brief. */}
            <strong className="block text-foreground" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem,4vw,3.6rem)" }}>
              5
            </strong>
          </StatCard>
        </div>
        {totalCount ? (
          <p className="sr-only">Based on {totalCount} published case studies.</p>
        ) : null}
      </div>
    </section>
  );
}
