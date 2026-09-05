"use client";

// "How ABN works" — a horizontal row of method cards. On desktop a vertical
// wheel gesture over the section scrolls the row sideways (the concept's
// intent); on touch it's plain native horizontal scrolling with snap.
//
// Fixes a real bug in the concept while keeping its behaviour: there, the
// wheel handler wrote to `.method-track`'s scrollLeft, but that element is
// `width:max-content` with no width constraint of its own, so it can never
// overflow itself and scrollLeft stayed 0 — the row was simply clipped by
// `.method{overflow:hidden}` and the later cards were unreachable. The
// track now sits inside a `.method-scroller` that is the actual (viewport-
// width) scroll container, which is what makes both the wheel gesture and
// touch scrolling work.
import { useEffect, useRef } from "react";
import SwitchWord from "./SwitchWord";

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

export default function MethodTrack({ method }) {
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scroller = scrollerRef.current;
    if (!section || !scroller) return;
    if (window.innerWidth <= 900) return;

    function onWheel(e) {
      const max = scroller.scrollWidth - scroller.clientWidth;
      if (max <= 0 || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const next = clamp(scroller.scrollLeft + e.deltaY, 0, max);
      // Only swallow the page scroll while the row still has somewhere to
      // go — at either end the gesture falls through so the page keeps
      // scrolling instead of trapping the reader in this section.
      if (next !== scroller.scrollLeft) {
        e.preventDefault();
        scroller.scrollLeft = next;
      }
    }

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="method" ref={sectionRef}>
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
      </div>
    </section>
  );
}
