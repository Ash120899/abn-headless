"use client";

// Testimonials section — a static Google-rating proof card + a cross-fading
// quote carousel. Ported from the concept's "testimonials" section
// (design-concepts/case-studies-listing.html ~lines 591-630, CSS .testi-*/
// .google-* ~lines 360-411, JS renderTestimonials/showTestimonial/goToTesti/
// restartTestiAutoplay ~lines 1366-1418).
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { CURATED_QUOTES, GOOGLE_RATING } from "@/lib/case-study-shared";
import SwitchWord from "./SwitchWord";

const AUTOPLAY_MS = 6000;
const GENERIC_QUOTE = "Working with ABN Junction moved the needle for us.";

export default function TestimonialCarousel({ testimonials = [] }) {
  const items = testimonials.map((t) => ({
    ...t,
    quote: CURATED_QUOTES[t.slug] || GENERIC_QUOTE,
  }));

  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const quoteRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const avatarRef = useRef(null);

  const restartAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (items.length < 2) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, AUTOPLAY_MS);
  }, [items.length]);

  useEffect(() => {
    restartAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  // GSAP crossfade whenever the active testimonial changes.
  useEffect(() => {
    const targets = [quoteRef.current, nameRef.current, roleRef.current, avatarRef.current].filter(Boolean);
    if (!targets.length) return;
    gsap.fromTo(
      targets,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" }
    );
  }, [index]);

  function goTo(i, manual) {
    const n = items.length;
    setIndex(((i % n) + n) % n);
    if (manual) restartAutoplay();
  }

  const active = items[index];

  return (
    // Always-dark showcase section by design, independent of the theme
    // toggle — matches the concept and the same kind of deliberate override
    // globals.css already makes for .hero-section.
    <section className="bg-[#020304] text-white border-t border-b border-white/10 py-[60px] md:py-[100px]">
      <div className="max-w-[1200px] mx-auto px-[20px] md:px-6">
        <div className="text-center">
          <span className="text-accent uppercase tracking-[0.35em] text-xs font-bold">What Clients Say</span>
          {/* Sentence-case per the concept, not League Gothic — see FeaturedGrid.js for the full note. */}
          <h2
            className="mt-3 text-white"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 880,
              letterSpacing: "-0.05em",
              fontSize: "clamp(2.1rem,4.6vw,4rem)",
              lineHeight: 1.02,
            }}
          >
            Voices of <SwitchWord words={["trust", "proof"]} />
          </h2>
          <p className="mt-3 max-w-[640px] mx-auto text-[#aeb8bd]">
            From challenges to champions — their stories say it all.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] gap-7 items-stretch text-left">
          {/*
            PLACEHOLDER: this is a static Google rating card, not a live
            Google Places/Business Profile fetch — score/count are hand-set
            (see GOOGLE_RATING in src/lib/case-study-shared.js) and need
            either a live integration or manual periodic updates.
          */}
          <aside className="border border-white/10 bg-[#10171b] rounded-[20px] p-7 flex flex-col justify-center">
            <div className="flex items-start gap-3.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4285F4"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-9 h-9 flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M3 9.5 4.2 4h15.6l1.2 5.5" />
                <path d="M3 9.5a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0 4.4 0" />
                <path d="M4.2 9.8V20h15.6V9.8" />
                <path d="M9.6 20v-6.4h4.8V20" />
              </svg>
              {/* globals.css has a blanket `h3{margin-top:1rem!important}` rule
                  (relied on elsewhere, so not worth removing site-wide) —
                  override it locally with matching !important specificity
                  rather than fighting it with the m-0 utility alone. */}
              <h3 className="google-proof-heading font-bold text-lg leading-snug text-white m-0">
                ABN Junction — Performance Marketing Agency Chennai
              </h3>
            </div>
            <div className="mt-6 flex items-center gap-2.5">
              <span
                className="text-[#ffa436] text-[32px] leading-none"
                style={{ fontFamily: "var(--font-editorial)", fontWeight: 900 }}
              >
                {GOOGLE_RATING.score}
              </span>
              <span className="text-[#ffa436] text-lg tracking-[2px]">★★★★★</span>
            </div>
            <div className="mt-3 text-sm text-[#c9d0d4]">{GOOGLE_RATING.count}</div>
            <div className="mt-5 font-extrabold text-[13.5px]">
              powered by{" "}
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </div>
            <a
              className="mt-4 inline-flex items-center gap-2 w-max pl-4 pr-1.5 py-1.5 rounded-full bg-[#405bd7] text-white font-bold text-[13.5px] underline underline-offset-2"
              href={GOOGLE_RATING.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Review us on
              <span className="w-7 h-7 rounded-full bg-white grid place-items-center flex-shrink-0">
                <svg viewBox="0 0 48 48" className="w-4 h-4" aria-hidden="true">
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
              </span>
            </a>
          </aside>

          {items.length === 0 ? (
            <div className="w-full flex items-center justify-center border border-white/8 rounded-[20px] p-10 text-[#aeb8bd] text-sm">
              Testimonials are unavailable right now.
            </div>
          ) : (
            <div className="w-full text-center relative px-4 md:px-10 py-6 border border-white/8 rounded-[20px] bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col justify-center">
              {/*
                PLACEHOLDER: these quotes are hand-written stand-ins, not the
                live WP testimonial ACF text. Every one of the 10 case
                studies currently shares the exact same duplicated paragraph
                in WordPress (a content bug in WP admin, not something worth
                reproducing here) — names/roles/avatars below are real,
                pulled from WP; only the quote copy is curated filler. See
                CURATED_QUOTES in src/lib/case-study-shared.js. Replace once
                the WP testimonial content is fixed per-client.
              */}
              <div aria-live="polite">
                <div
                  ref={quoteRef}
                  className="text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.3] text-white min-h-[130px] flex items-center justify-center"
                  style={{ fontFamily: "var(--font-editorial)", fontWeight: 600, letterSpacing: "-0.02em" }}
                >
                  <span aria-hidden="true" className="text-accent">&ldquo;</span>
                  {active.quote}
                  <span aria-hidden="true" className="text-accent">&rdquo;</span>
                </div>
                <div className="flex items-center justify-center gap-3.5 mt-5">
                  <div
                    ref={avatarRef}
                    className="relative w-[52px] h-[52px] rounded-xl bg-[#0a0e11] border border-white/12 overflow-hidden flex items-center justify-center flex-none"
                  >
                    {active.image ? (
                      <Image
                        src={active.image}
                        alt={active.name || "Client"}
                        fill
                        sizes="52px"
                        className="object-contain p-1.5"
                      />
                    ) : null}
                  </div>
                  <div className="text-left">
                    <div ref={nameRef} className="font-extrabold text-sm text-white">
                      {active.name || "Client"}
                    </div>
                    <div ref={roleRef} className="text-[12.5px] text-[#aab6bc]">
                      {active.role || ""}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4.5 mt-8">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => goTo(index - 1, true)}
                  className="w-11 h-11 rounded-full border border-white/12 bg-[#10171b] text-white cursor-pointer text-base transition-all hover:border-accent hover:bg-accent/10"
                >
                  ←
                </button>
                <div className="flex gap-2">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i, true)}
                      aria-label={`Show testimonial ${i + 1} of ${items.length}`}
                      aria-current={i === index ? "true" : undefined}
                      className={`h-2 rounded-full border-none cursor-pointer transition-all ${
                        i === index ? "w-6 bg-accent" : "w-2 bg-white/15"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => goTo(index + 1, true)}
                  className="w-11 h-11 rounded-full border border-white/12 bg-[#10171b] text-white cursor-pointer text-base transition-all hover:border-accent hover:bg-accent/10"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .google-proof-heading {
          margin-top: 0 !important;
        }
      `}</style>
    </section>
  );
}
