"use client";

// Reusable scroll-reveal wrapper. Identical to
// src/components/case-studies-listing/ScrollReveal.js — duplicated rather
// than shared so each listing page's component folder stays self-contained.
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  selector,
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
