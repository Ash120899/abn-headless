"use client";

// Reusable scroll-reveal wrapper — ported to match the concept's own
// mechanism exactly (design-concepts/ABN_Blogs_V4_Magnetic_Interactive_Concept.html
// ~line 1229-1232: a plain IntersectionObserver adding a "revealed" class,
// same threshold 0.12), not GSAP ScrollTrigger as originally built here.
// ScrollTrigger pre-calculates absolute scroll-offset trigger points at
// refresh() time and only recomputes them on an explicit refresh call —
// on this page (a hero with a height that depends on live post/category
// counts, a canvas, and images below it) that repeatedly went stale enough
// that every section's reveal fired noticeably later on mobile than where
// it visually entered the screen, even after adding several redundant
// refresh calls (see ScrollFX.js's git history). IntersectionObserver has
// no such cache — it's driven by the browser's own real-time viewport
// intersection — so this class of bug can't recur.
import { useEffect, useRef } from "react";

export default function ScrollReveal({
  children,
  as: Tag = "div",
  className,
  y = 40,
  stagger,
  duration = 0.8,
  selector,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = selector ? Array.from(el.querySelectorAll(selector)) : [el];
    targets.forEach((t) => {
      t.style.opacity = "0";
      t.style.transform = `translateY(${y}px)`;
      t.style.transition = `opacity ${duration}s ease, transform ${duration}s ease`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target;
          const idx = targets.indexOf(target);
          target.style.transitionDelay = stagger ? `${idx * stagger}s` : "0s";
          target.style.opacity = "1";
          target.style.transform = "none";
          observer.unobserve(target);
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, [y, stagger, duration, selector]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
