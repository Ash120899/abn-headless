"use client";

// Page-wide effects from the concept's script, in one client component so
// the sections themselves can stay server-rendered:
//  1. the top scroll-progress bar,
//  2. .reveal fade-ups (plain IntersectionObserver, as the concept and the
//     service pages use; GSAP ScrollTrigger cached stale offsets on mobile),
//  3. the section rail's active link.
//
// Content renders visible on the server. The `fx` class is added here, and
// only then does CSS hide not-yet-revealed blocks, so a page whose JS never
// runs (or a crawler) still shows everything.
import { useEffect, useRef } from "react";

export default function SubserviceFx() {
  const barRef = useRef(null);

  useEffect(() => {
    const page = barRef.current?.closest(".ssp-page");
    if (!page) return;
    page.classList.add("fx");

    // --- reveal -----------------------------------------------------------
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("show");
          observer.unobserve(e.target);
        }),
      { threshold: 0.09 }
    );
    page.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // --- progress + rail --------------------------------------------------
    const bar = barRef.current;
    const links = Array.from(page.querySelectorAll(".rail a[href^='#']"));
    const sections = links.map((a) => document.getElementById(a.getAttribute("href").slice(1)));
    let scheduled = false;

    function update() {
      scheduled = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;

      if (!links.length) return;
      // A section counts as current once its top passes just under the
      // fixed header + rail.
      const styles = getComputedStyle(page);
      const line =
        (parseFloat(styles.getPropertyValue("--navh")) || 76) +
        (parseFloat(styles.getPropertyValue("--railh")) || 54) +
        50;
      let current = -1;
      sections.forEach((s, i) => {
        if (s && s.getBoundingClientRect().top < line) current = i;
      });
      links.forEach((a, i) => a.classList.toggle("active", i === current));

      // Keep the active pill in view on the horizontally scrolling rail.
      const active = links[current];
      const rail = active?.parentElement;
      if (active && rail && rail.scrollWidth > rail.clientWidth) {
        const left = active.offsetLeft - rail.clientWidth / 2 + active.offsetWidth / 2;
        if (Math.abs(rail.scrollLeft - left) > 40) rail.scrollTo({ left, behavior: "smooth" });
      }
    }

    function schedule() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <div ref={barRef} className="ssp-progress" />;
}
