"use client";

// Typewriter word-cycling heading accent — same component and timings as
// the blog/case-study listings use, so all three pages share one behaviour.
// Kept in this folder (rather than imported across features) to match the
// existing convention where each listing owns its own copy.
import { useEffect, useRef } from "react";

const TYPE_SPEED = 90;
const DELETE_SPEED = 55;
const HOLD = 1400;
const GAP = 300;

export default function SwitchWord({ words }) {
  const ref = useRef(null);
  // The word list now comes from ACF via the content mapper, so a section
  // whose switch field is empty (or a service added without one) must
  // render the static heading rather than crash the page.
  const list = Array.isArray(words) ? words.filter(Boolean) : [];
  const key = list.join("|");

  useEffect(() => {
    const el = ref.current;
    const words = key ? key.split("|") : [];
    if (!el || words.length < 2) return;

    // Pin the span to the widest word so a shorter/partial word never
    // reflows the heading onto a different number of lines.
    function reserveWidth() {
      let maxWidth = 0;
      const prev = el.textContent;
      words.forEach((w) => {
        el.textContent = w;
        maxWidth = Math.max(maxWidth, el.getBoundingClientRect().width);
      });
      el.textContent = prev;
      el.style.minWidth = `${Math.ceil(maxWidth)}px`;
    }

    reserveWidth();
    window.addEventListener("resize", reserveWidth);

    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = true;
    let timeoutId = null;
    el.textContent = words[0];

    function tick() {
      const current = words[wordIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex >= current.length) {
          deleting = true;
          timeoutId = setTimeout(tick, HOLD);
          return;
        }
        timeoutId = setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timeoutId = setTimeout(tick, GAP);
          return;
        }
        timeoutId = setTimeout(tick, DELETE_SPEED);
      }
    }

    timeoutId = setTimeout(tick, HOLD);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", reserveWidth);
    };
    // Joined string, not the array: callers pass an inline literal, which is
    // a new reference every render and would restart the effect constantly.
  }, [key]);

  return (
    <span ref={ref} className="svc-switch-word">
      {list[0] ?? ""}
    </span>
  );
}
