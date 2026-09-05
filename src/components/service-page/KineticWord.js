"use client";

// The headline word that "wipes" in from left to right when scrolled into
// view — the concept's `[data-kinetic]` elements plus its kineticObserver
// (threshold .35, adds a `played` class once). The wipe itself is pure CSS
// (@property --svc-wipe + the svc-kineticWipe keyframe in
// ServicePageStyles.js); this component only decides when to start it.
import { useEffect, useRef } from "react";

export default function KineticWord({ children, as: Tag = "span", className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("played");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`kinetic-word ${className}`.trim()}>
      {children}
    </Tag>
  );
}
