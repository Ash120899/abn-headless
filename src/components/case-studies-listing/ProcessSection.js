"use client";

// "How We Work" — 4 process step cards, held in place while the page
// scrolls the track horizontally underneath, on desktop. Ported from
// design-concepts/case-studies-listing.html's pinned version, but using the
// technique from design-concepts/ABN_Blogs_V4_Magnetic_Interactive_Concept.html's
// "story scroll" section (~line 247 CSS, ~line 1424 JS) instead of GSAP
// ScrollTrigger's `pin:true`: plain CSS `position: sticky` holds the inner
// content in place while a taller wrapper div scrolls underneath it, and a
// vanilla `scroll` listener drives the horizontal transform from a live
// getBoundingClientRect() read — no pin-spacer, no cached start/end offsets
// to go stale. (GSAP's own pin:true was tried first and dropped — see git
// history — after repeatedly conflicting with the hero section's own pin.)
//
// Below 900px this becomes a plain native horizontally-scrollable row
// (touch/wheel/trackpad + snap, no JS involved) instead of the sticky-drag
// mechanic, which only makes sense once there's a comfortable amount of
// vertical dwell room to work with.
import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { PROCESS_STEPS } from "@/lib/case-study-shared";

// Matches the fixed site header's height (see HeroScene.js's pt-[82px]).
const HEADER_OFFSET = 82;
const DESKTOP_BREAKPOINT = 900;

export default function ProcessSection() {
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

    // Below 900px the track is a plain native-scroll row (see the effect
    // below), so progress there comes from the wrap's own scrollLeft
    // instead of the vertical zone math desktop uses.
    function updateMobileProgress() {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) return;
      const range = wrap.scrollWidth - wrap.clientWidth;
      const progress = range > 0 ? Math.min(1, Math.max(0, wrap.scrollLeft / range)) : 0;
      if (progressBarRef.current) progressBarRef.current.style.width = `${progress * 100}%`;
    }

    function sizeZone() {
      if (window.innerWidth < DESKTOP_BREAKPOINT) {
        // Reset any leftover transform/height from a desktop-width layout in
        // case the viewport was resized down across the breakpoint (e.g. a
        // foldable/tablet rotation) — otherwise the mobile row could stay
        // shifted sideways from whatever progress was applied at the wider
        // width.
        zone.style.height = "";
        track.style.transform = "";
        updateMobileProgress();
        return;
      }
      track.style.transform = "translateX(0px)";
      const maxShift = Math.max(0, track.scrollWidth - zone.clientWidth);
      maxShiftRef.current = maxShift;
      // Extra scroll room the horizontal drag consumes: scaled below the
      // real pixel distance (0.56x) so the drag reads as brisk rather than
      // 1:1 with mouse/trackpad input, with a floor so even a small
      // distance still gets a comfortable dwell — both values ported
      // as-is from the concept's own tuning.
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
    <section id="process" className="py-[70px] md:py-[110px] pb-[80px] md:pb-[130px] border-t border-theme">
      <div className="max-w-[1200px] mx-auto px-[20px] md:px-6">
        <div ref={zoneRef} className="relative">
          <div
            className="flex flex-col justify-center min-[900px]:sticky min-[900px]:overflow-hidden"
            style={{ top: HEADER_OFFSET, minHeight: `calc(100vh - ${HEADER_OFFSET}px)` }}
          >
            <div className="text-center mb-12 md:mb-[60px]">
              <span className="text-accent uppercase tracking-[0.35em] text-xs font-bold">How We Work</span>
              <h2
                className="mt-3.5 text-[clamp(1.8rem,3.6vw,2.6rem)] text-foreground uppercase"
                style={{ fontFamily: "var(--font-editorial)", fontWeight: 900, letterSpacing: "-0.04em" }}
              >
                From First Call To Measurable Growth
              </h2>
            </div>

            {/*
              Below 900px this is a plain native horizontally-scrollable row
              (touch/wheel/trackpad scroll + snap, no JS involved) instead of
              a vertical stack — the sticky-drag mechanic above is desktop-only
              (see DESKTOP_BREAKPOINT gates in the effect), so mobile needs
              its own way to move through all 4 cards.
            */}
            <div
              ref={wrapRef}
              className="overflow-x-auto min-[900px]:overflow-hidden snap-x snap-mandatory min-[900px]:snap-none [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
            >
              <ScrollReveal as="div" selector=".step-card" stagger={0.15} start="top 85%">
                <div ref={trackRef} className="flex w-max gap-7 px-1 py-1 pb-5">
                  {PROCESS_STEPS.map((step, i) => (
                    <div
                      key={step.title}
                      className="step-card snap-start flex-none text-left p-9 md:p-9 rounded-[24px] bg-surface-weak border border-theme"
                      style={{ width: "clamp(260px, 32vw, 340px)" }}
                    >
                      <div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-background border border-theme text-accent text-[1.4rem] mb-6.5"
                        style={{ fontFamily: "var(--font-editorial)", fontWeight: 800 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3
                        className="text-[1.6rem] mb-3 text-foreground uppercase"
                        style={{ fontFamily: "var(--font-editorial)", fontWeight: 900, letterSpacing: "-0.03em" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-muted text-[13.5px] leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <div className="h-1.5 rounded-full bg-surface-weak overflow-hidden mt-4.5 mx-1">
              <span ref={progressBarRef} className="block h-full w-0 rounded-full bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
