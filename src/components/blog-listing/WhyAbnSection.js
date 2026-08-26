"use client";

// "Why ABN Insights" — 5 story cards, held in place while the page scrolls
// the track horizontally underneath, on desktop. Same plain CSS
// `position: sticky` + vanilla-scroll technique as
// src/components/case-studies-listing/ProcessSection.js (itself ported from
// this concept's own story-scroll section — design-concepts/
// ABN_Blogs_V4_Magnetic_Interactive_Concept.html ~line 540-562, CSS ~line
// 247-258, JS ~line 1424-1448). Below 900px this is a plain native
// horizontally-scrollable row instead of the sticky-drag mechanic.
import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import SwitchWord from "./SwitchWord";
import { WHY_ABN_ITEMS } from "@/lib/blog-shared";

const HEADER_OFFSET = 82;
const DESKTOP_BREAKPOINT = 900;

export default function WhyAbnSection() {
  const zoneRef = useRef(null);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const maxShiftRef = useRef(0);

  useEffect(() => {
    const zone = zoneRef.current;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!zone || !wrap || !track) return;

    function updateMobileProgress() {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) return;
      const range = wrap.scrollWidth - wrap.clientWidth;
      const progress = range > 0 ? Math.min(1, Math.max(0, wrap.scrollLeft / range)) : 0;
      if (progressBarRef.current) progressBarRef.current.style.width = `${progress * 100}%`;
    }

    function sizeZone() {
      if (window.innerWidth < DESKTOP_BREAKPOINT) {
        zone.style.height = "";
        track.style.transform = "";
        updateMobileProgress();
        return;
      }
      track.style.transform = "translateX(0px)";
      const maxShift = Math.max(0, track.scrollWidth - zone.clientWidth);
      maxShiftRef.current = maxShift;
      zone.style.height = `${window.innerHeight + Math.max(260, maxShift * 0.56)}px`;
    }

    function update() {
      if (window.innerWidth < DESKTOP_BREAKPOINT) return;
      const rect = zone.getBoundingClientRect();
      const total = Math.max(1, zone.offsetHeight - window.innerHeight);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = Math.min(1, scrolled / total);
      track.style.transform = `translateX(${-maxShiftRef.current * progress}px)`;
      if (progressBarRef.current) progressBarRef.current.style.width = `${progress * 100}%`;
    }

    function onResize() {
      sizeZone();
      update();
    }

    sizeZone();
    update();
    updateMobileProgress();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    wrap.addEventListener("scroll", updateMobileProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      wrap.removeEventListener("scroll", updateMobileProgress);
      zone.style.height = "";
      track.style.transform = "";
    };
  }, []);

  return (
    <section id="why-abn" className="py-[70px] md:py-[100px] border-t border-theme">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-6">
        <div ref={zoneRef} className="relative">
          <div
            className="flex flex-col justify-center min-[900px]:sticky min-[900px]:overflow-hidden"
            style={{ top: HEADER_OFFSET, minHeight: `calc(100vh - ${HEADER_OFFSET}px)` }}
          >
            <ScrollReveal as="div" className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-end mb-9">
              <div>
                <span
                  className="inline-flex items-center gap-3 text-[12px] uppercase"
                  style={{ fontFamily: "var(--font-editorial)", fontWeight: 800, letterSpacing: ".28em", color: "var(--bl-cyan)" }}
                >
                  <span className="w-8 h-px" style={{ background: "currentColor" }} />
                  Why ABN Insights
                </span>
                <h2
                  className="text-foreground mt-3"
                  style={{ fontFamily: "var(--font-editorial)", fontWeight: 880, letterSpacing: "-.05em", lineHeight: 1.02, fontSize: "clamp(2.8rem,5.6vw,5rem)" }}
                >
                  Written by the people running the <SwitchWord words={["campaigns", "chaos"]} />.
                </h2>
              </div>
              <p className="text-muted" style={{ lineHeight: 1.72, fontSize: "clamp(1.02rem,1.5vw,1.18rem)" }}>
                This is where the blog becomes brand-specific — not generic marketing content, but ideas shaped by
                execution, data, iteration and cross-service thinking.
              </p>
            </ScrollReveal>

            <div
              ref={wrapRef}
              className="overflow-x-auto min-[900px]:overflow-hidden snap-x snap-mandatory min-[900px]:snap-none [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
            >
              <ScrollReveal as="div" selector=".why-card" stagger={0.12}>
                <div ref={trackRef} className="flex w-max gap-[22px] px-1 py-1 pb-5">
                  {WHY_ABN_ITEMS.map((item) => (
                    <div
                      key={item.num}
                      className="why-card snap-start flex-none rounded-[28px] border border-theme p-[26px] flex flex-col justify-between"
                      style={{
                        width: "320px",
                        minHeight: "260px",
                        background:
                          "linear-gradient(180deg, color-mix(in srgb, var(--surface) 74%, transparent), color-mix(in srgb, var(--surface-2) 92%, transparent))",
                      }}
                    >
                      <div>
                        <div
                          className="text-accent uppercase"
                          style={{ fontSize: ".84rem", fontWeight: 900, letterSpacing: ".2em" }}
                        >
                          {item.num}
                        </div>
                        <strong
                          className="block text-foreground mt-3"
                          style={{ fontFamily: "var(--font-editorial)", fontWeight: 900, fontSize: "1.4rem" }}
                        >
                          {item.title}
                        </strong>
                        <p className="text-muted mt-2.5" style={{ maxWidth: "32ch" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <div className="h-1.5 rounded-full bg-surface-weak overflow-hidden mt-4.5">
              <span
                ref={progressBarRef}
                className="block h-full w-0 rounded-full"
                style={{ background: "linear-gradient(90deg,var(--accent),var(--bl-cyan))" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
