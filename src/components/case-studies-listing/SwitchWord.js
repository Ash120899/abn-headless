"use client";

// Reusable "switching word" heading accent — types a word, deletes it,
// types the next, on loop, with a blinking cursor. Ported from
// design-concepts/ABN_Blogs_V4_Magnetic_Interactive_Concept.html's
// `.switch-word` effect (~line 78 CSS, ~line 1544 JS): every section
// heading there accents one word/phrase this way instead of a static
// color-only accent.
import { useEffect, useRef } from "react";

const TYPE_SPEED = 90;
const DELETE_SPEED = 55;
const HOLD = 1400;
const GAP = 300;

export default function SwitchWord({ words }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || words.length < 2) return;

    // Pins the span to the widest word's rendered width so a shorter/partial
    // word never lets the heading reflow onto a different number of lines.
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
    // Deliberately NOT [words]: callers pass an inline array literal
    // (`words={["a","b"]}`), which is a new object reference on every
    // parent re-render — with `words` itself as the dep, this effect would
    // tear down and restart from scratch (back to word 0, HOLD delay) on
    // every single re-render of whatever parent this lives in, which for a
    // component like TestimonialCarousel (re-renders every 6s on autoplay)
    // meant it could never get further than the opening hold before being
    // reset — exactly the "cursor blinks, nothing ever types" symptom.
    // words.join("|") is a primitive that's stable across renders as long
    // as the actual words don't change, so the effect only restarts when
    // the content genuinely does.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words.join("|")]);

  // The ::after cursor + its keyframe live once in globals.css (this
  // component renders on 4-5 headings on the same page, so a per-instance
  // <style> tag like HeroScene's single-use scroll-cue would just repeat
  // the same rule that many times).
  return (
    <span
      ref={ref}
      className="case-studies-switch-word text-accent relative inline-block whitespace-nowrap text-left"
    >
      {words[0]}
    </span>
  );
}
