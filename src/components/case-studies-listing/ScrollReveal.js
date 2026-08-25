"use client";

// Reusable scroll-reveal wrapper, matching the exact gsap.from()+ScrollTrigger
// pattern already established in src/components/Testimonial.js, so sections
// on this page don't each hand-roll the same useEffect.
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// registerPlugin is idempotent (safe to call from multiple modules) — every
// file on this page that uses ScrollTrigger directly registers it itself
// rather than relying on another component mounting first, since React
// doesn't guarantee sibling mount order.
gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
  as: Tag = "div",
  className,
  y = 40,
  stagger,
  start = "top 85%",
  duration = 0.8,
  ease = "power3.out",
  selector, // when set, animates matching descendants (e.g. '.card') with stagger, instead of the wrapper itself
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const targets = selector ? ref.current.querySelectorAll(selector) : ref.current;
    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        stagger,
        scrollTrigger: { trigger: ref.current, start },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, stagger, start, duration, ease, selector]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
