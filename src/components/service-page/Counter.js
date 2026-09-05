"use client";

// Count-up number that runs once when scrolled into view. Same cubic
// ease-out and 1200ms duration as the KPI strip, so the hero stats and the
// proof band animate identically.
//
// prefix and suffix are separate from the number and are held constant for
// the whole animation — only the digits move. They come straight from ACF
// (Prefix / Number / Suffix), so "₹" + "7.5" + "M+" is editable without
// touching code, and nothing has to guess where the symbols are.
//
// Comma grouping in the authored number ("6,500") is preserved as it counts.
import { useEffect, useRef, useState } from "react";

const DURATION = 1200;

function parseNumber(value) {
  const raw = String(value ?? "").trim();
  const cleaned = raw.replace(/,/g, "");
  const number = parseFloat(cleaned);
  if (!Number.isFinite(number)) return null;
  const dot = cleaned.indexOf(".");
  return {
    number,
    decimals: dot === -1 ? 0 : cleaned.length - dot - 1,
    grouped: raw.includes(","),
  };
}

function render(parsed, current) {
  const fixed = parsed.decimals ? current.toFixed(parsed.decimals) : Math.round(current).toString();
  return parsed.grouped ? Number(fixed).toLocaleString("en-US") : fixed;
}

export default function Counter({ value, prefix = "", suffix = "", className }) {
  const numRef = useRef(null);
  const [parsed] = useState(() => parseNumber(value));

  useEffect(() => {
    const el = numRef.current;
    if (!el || !parsed) return;
    let rafId = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - start) / DURATION);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = render(parsed, parsed.number * eased);
          if (p < 1) rafId = requestAnimationFrame(tick);
        }
        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [parsed]);

  // A non-numeric value (or none) just renders as authored, uncounted.
  if (!parsed) {
    return (
      <span className={className}>
        {prefix}
        {value}
        {suffix}
      </span>
    );
  }

  return (
    <span className={className}>
      {prefix}
      <span ref={numRef}>{render(parsed, 0)}</span>
      {suffix}
    </span>
  );
}
