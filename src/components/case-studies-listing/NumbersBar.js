"use client";

// "By The Numbers" strip — bordered/divided 4-up grid, matching the
// reference concept's own .kpi-strip/.kpi-grid design (a plain divided
// strip, not individual cards) per product decision. An earlier version of
// this component deliberately avoided that layout because it doesn't
// collapse as gracefully on narrow screens as an auto-fit card grid — kept
// working here by handling the 2x2 mobile / 1x4 desktop divider logic
// explicitly instead of relying on auto-fit.
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Counter({ target, prefix = "", suffix = "", decimals = 0 }) {
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
            el.textContent =
              prefix + (decimals ? obj.val.toFixed(decimals) : Math.floor(obj.val).toLocaleString()) + suffix;
          },
        }),
    });

    return () => st.kill();
  }, [target, prefix, suffix, decimals]);

  return (
    <strong
      ref={ref}
      className="block text-foreground"
      style={{ fontFamily: "var(--font-editorial)", fontWeight: 900, letterSpacing: "-0.03em", fontSize: "clamp(2.625rem,4vw,3.875rem)" }}
    >
      0
    </strong>
  );
}

// Divider logic for a 2x2 (mobile) → 1x4 (desktop) grid: right border
// between the two mobile columns (removed on even cells), bottom border
// between the two mobile rows (removed on cells 3-4) — then at md+, right
// border between all 4 desktop columns (removed only on the true last
// cell) and no bottom border at all.
const KPI_CELL_CLASSES =
  "text-center py-9 px-6 border-theme border-r border-b " +
  "[&:nth-child(2n)]:border-r-0 [&:nth-child(n+3)]:border-b-0 " +
  "md:border-b-0 md:border-r md:last:border-r-0";

function Kpi({ label, children }) {
  return (
    <div className={KPI_CELL_CLASSES}>
      {children}
      <span className="block text-[11px] tracking-[0.16em] uppercase text-muted mt-2">{label}</span>
    </div>
  );
}

export default function NumbersBar({ totalCount }) {
  // Static per product decision — live ROAS/revenue aggregation across case
  // studies isn't reliable enough yet (metrics mix "%"-style and "×"-style
  // ROAS with no consistent unit), so this and the hero stats above use
  // fixed, correct numbers instead of a live computation that can currently
  // go wrong.
  return (
    <section className="border-t border-b border-theme bg-surface">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-0">
        <div className="grid grid-cols-2 md:grid-cols-4">
          <Kpi label="Highest Recorded ROAS">
            <Counter target={13} suffix="×" />
          </Kpi>
          <Kpi label="Leads Generated">
            <Counter target={6500} suffix="+" />
          </Kpi>
          <Kpi label="Revenue Generated">
            <Counter target={75} prefix="₹" suffix="L+" />
          </Kpi>
          <Kpi label="Connected Service Pillars">
            {/* Static, not derived from fetched data — deliberate, see task brief. */}
            <strong
              className="block text-foreground"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 900, letterSpacing: "-0.03em", fontSize: "clamp(2.625rem,4vw,3.875rem)" }}
            >
              5
            </strong>
          </Kpi>
        </div>
        {totalCount ? (
          <p className="sr-only">Based on {totalCount} published case studies.</p>
        ) : null}
      </div>
    </section>
  );
}
