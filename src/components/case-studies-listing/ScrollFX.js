'use client'

// Page-chrome component: fixed top-of-viewport scroll-progress bar, driven
// by native scroll via GSAP ScrollTrigger.
//
// This used to also run Lenis (a smooth-scroll library) on top of native
// scrolling, per the concept's "3. SMOOTH SCROLL (Lenis) + GSAP ScrollTrigger
// sync" block (design-concepts/case-studies-listing.html, ~lines 856-890).
// Removed: this page has two things that change document height after
// mount — the hero's own pin, and ProcessSection.js's sticky-scroll zone —
// and getting Lenis's cached scroll-range to reliably stay in sync with
// those changes proved fragile in practice (two separate targeted fixes for
// it each failed to resolve a real "mouse wheel silently stops scrolling,
// only the native scrollbar still works" bug reported live). Since Lenis
// was always progressive enhancement here (its own setup is wrapped in
// try/catch) and GSAP ScrollTrigger drives every scroll-linked animation on
// this page from real scroll position regardless of what produces it,
// dropping Lenis trades away the smooth momentum-scroll feel for guaranteed
// scrolling that can't desync — native scroll has no cached range to go
// stale in the first place.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// registerPlugin is idempotent — safe even though ScrollReveal.js also calls it,
// since React doesn't guarantee mount order between sibling components.
gsap.registerPlugin(ScrollTrigger)

export default function ScrollFX() {
  const barRef = useRef(null)

  useEffect(() => {
    let progressTween = null

    if (barRef.current) {
      progressTween = gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    }

    // The hero's pin calculates its start/end offsets from document height
    // at mount time. League Gothic loading in afterward (web font swap) and
    // below-the-fold images finishing decode both change that height later,
    // silently invalidating those offsets. Refresh once each source of
    // shift actually settles — a hard refresh (the `true` argument) so it
    // fully remeasures from a clean slate rather than trusting any cached
    // pin-spacer state.
    document.fonts?.ready.then(() => ScrollTrigger.refresh(true))

    const pendingImages = Array.from(document.images).filter((img) => !img.complete)
    if (pendingImages.length) {
      Promise.all(
        pendingImages.map((img) => new Promise((res) => { img.onload = img.onerror = res }))
      ).then(() => ScrollTrigger.refresh(true))
    }

    return () => {
      if (progressTween) {
        progressTween.scrollTrigger?.kill()
        progressTween.kill()
      }
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 100001,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '100%',
          background: 'var(--accent)',
          transform: 'scaleX(0)',
          transformOrigin: 'left',
        }}
      />
    </div>
  )
}
