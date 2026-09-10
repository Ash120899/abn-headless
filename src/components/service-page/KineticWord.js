"use client";

// The headline word that "wipes" in from left to right when scrolled into
// view. The wipe itself is pure CSS (@property --svc-wipe + the
// svc-kineticWipe keyframe in ServicePageStyles.js); this component only
// decides when to start it.
//
// The concept played the wipe once and unobserved the element. Here it
// replays: the class comes off when the word leaves the viewport, so
// scrolling back up resets it and scrolling down runs it again.
import { useEffect, useRef } from "react";

export default function KineticWord({ children, as: Tag = "span", className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("played");
          } else {
            // Removing the class rewinds the animation. Without forcing a
            // reflow between remove and the next add, a fast scroll that
            // leaves and re-enters within one frame would coalesce into no
            // change at all, and the wipe would not restart.
            entry.target.classList.remove("played");
            void entry.target.offsetWidth;
          }
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
