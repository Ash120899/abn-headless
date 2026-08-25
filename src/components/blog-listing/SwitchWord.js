"use client";

// Reusable "switching word" heading accent — types a word, deletes it,
// types the next, on loop, with a blinking cursor. Identical to
// src/components/case-studies-listing/SwitchWord.js — duplicated rather
// than shared so each listing page's component folder stays self-contained.
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
    // Deliberately NOT [words] — see the sibling case-studies-listing
    // component for the full explanation of why a joined-string dep is used.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words.join("|")]);

  return (
    <span
      ref={ref}
      className="blog-switch-word text-accent relative inline-block whitespace-nowrap text-left"
    >
      {words[0]}
    </span>
  );
}
