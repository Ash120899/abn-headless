"use client";

// FAQ accordion. Still native <details>/<summary>, so it stays
// keyboard-accessible and readable with JS disabled — the concept used the
// same markup.
//
// Two additions on top of the concept:
//  1. The first item starts open.
//  2. Opening one closes the others. That is not native <details> behaviour
//     (the `name` attribute does it natively, but Safari only shipped it in
//     17.2, so this is done in JS to work everywhere).
//
// The +/- indicator is drawn in CSS from summary::after — see
// ServicePageStyles.js — rather than an icon font or inline SVG.
import { useEffect, useRef } from "react";

export default function ServiceFaq({ faq }) {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = Array.from(list.querySelectorAll("details"));
    if (!items.length) return;

    // `toggle` doesn't bubble, so each item is listened to individually.
    function onToggle(event) {
      if (!event.target.open) return;
      for (const other of items) {
        if (other !== event.target) other.open = false;
      }
    }

    items.forEach((item) => item.addEventListener("toggle", onToggle));
    return () => items.forEach((item) => item.removeEventListener("toggle", onToggle));
  }, [faq.items]);

  return (
    <section className="faq">
      <div className="container">
        <div className="eyebrow" style={{ color: "var(--coral)" }}>
          {faq.eyebrow}
        </div>
        <h2>{faq.heading}</h2>
        <div className="faqgrid">
          <div className="faqintro">
            <p>{faq.intro}</p>
          </div>
          <div ref={listRef}>
            {faq.items.map((item, i) => (
              // defaultOpen on the first item only. Using the `open` attribute
              // directly (not React state) keeps this uncontrolled, so the
              // browser's own toggling still works if JS never runs.
              <details key={item.q} open={i === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
