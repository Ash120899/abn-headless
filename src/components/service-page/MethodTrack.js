"use client";

// "How ABN works" — a horizontal row of method cards.
//
// Desktop: the section is taller than the viewport and its inner panel is
// sticky, so ordinary page scrolling drives the row sideways. Card 1 is
// always the first thing you see and the last card lands exactly as the pin
// releases.
//
// This replaces a wheel-hijacking version that was unreliable: it called
// preventDefault() whenever the row could still move, so page scrolling got
// swallowed unpredictably, momentum scrolling fought it, and reversing
// direction could leave the row parked mid-way with card 1 stranded
// off-screen. Deriving scrollLeft from page position instead means the row
// can never disagree with the scrollbar, and there is nothing to get stuck.
//
// Touch: no pinning. Native horizontal swipe with snap, which is what phone
// users expect and what already worked.
import { useEffect, useRef, useState } from "react";
import SwitchWord from "./SwitchWord";

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

export default function MethodTrack({ method }) {
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);
  const fillRef = useRef(null);
  // Extra scroll length the pin needs, in px. Measured from the row's real
  // overflow so it is exactly enough to reveal the last card and no more.
  const [pinLength, setPinLength] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const scroller = scrollerRef.current;
    if (!section || !scroller) return;

    const desktop = window.matchMedia("(min-width: 901px)");
    let raf = null;

    function measure() {
      if (!desktop.matches) {
        setPinLength(0);
        scroller.scrollLeft = 0;
        if (fillRef.current) fillRef.current.style.transform = "scaleX(0)";
        return;
      }
      setPinLength(Math.max(0, scroller.scrollWidth - scroller.clientWidth));
    }

    function update() {
      raf = null;
      if (!desktop.matches) return;

      const max = scroller.scrollWidth - scroller.clientWidth;
      if (max <= 0) return;

      // Progress through the pinned region: 0 while the panel is still
      // arriving, 1 once it has been held for the full extra length.
      const rect = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      const p = travel > 0 ? clamp(-rect.top / travel, 0, 1) : 0;

      scroller.scrollLeft = p * max;
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;
    }

    function onScroll() {
      if (raf === null) raf = requestAnimationFrame(update);
    }

    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    desktop.addEventListener("change", measure);

    // Card widths depend on fonts and container width, so re-measure when
    // the row's own size settles rather than trusting the first paint.
    const ro = new ResizeObserver(measure);
    ro.observe(scroller);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      desktop.removeEventListener("change", measure);
      ro.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [method.steps]);

  return (
    <section
      className="method"
      ref={sectionRef}
      // Viewport height plus exactly the row's overflow. At 0 (mobile, or a
      // row that already fits) the section is its natural height and nothing
      // is pinned.
      style={pinLength ? { height: `calc(100vh + ${pinLength}px)` } : undefined}
    >
      <div className={pinLength ? "method-pin" : undefined}>
        <div className="container">
          <div className="eyebrow accent">{method.eyebrow}</div>
          <h2>
            {method.headingBefore} <SwitchWord words={method.headingSwitch} />
          </h2>

          <div className="method-scroller" ref={scrollerRef}>
            <div className="method-track">
              {method.steps.map((step) => (
                <div className="method-card" key={step.num}>
                  <b>{step.num}</b>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="method-progress" aria-hidden="true">
            <span ref={fillRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
