'use client'

// Page-chrome component: fixed top-of-viewport scroll-progress bar, driven
// by native scroll via GSAP ScrollTrigger. Identical to
// src/components/case-studies-listing/ScrollFX.js — duplicated rather than
// shared so each listing page's component folder stays self-contained.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// Mobile browsers resize the viewport mid-scroll as the address bar
// collapses — that resize was firing a ScrollTrigger refresh that
// recalculated every reveal's trigger position against the new (taller)
// viewport height, desyncing it from the actual scroll position. In
// practice this made every section's reveal fire noticeably later than
// where it visually entered the screen, as if the reader had already
// scrolled past it. This is GSAP's own documented fix for exactly that.
ScrollTrigger.config({ ignoreMobileResize: true })

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

    document.fonts?.ready.then(() => ScrollTrigger.refresh(true))

    const pendingImages = Array.from(document.images).filter((img) => !img.complete)
    if (pendingImages.length) {
      Promise.all(
        pendingImages.map((img) => new Promise((res) => { img.onload = img.onerror = res }))
      ).then(() => ScrollTrigger.refresh(true))
    }

    // The fonts/images checks above still weren't enough on their own —
    // every section's reveal was firing noticeably later than where it
    // visually entered the screen on mobile, meaning ScrollTrigger's
    // cached trigger positions (computed from the page's layout at the
    // moment each one refreshes) were stale relative to where content
    // actually ended up: this page has a hero whose height is dynamic
    // (real post/category counts, a canvas, live-fetched images below it),
    // so its final height can still be settling after fonts/images
    // technically finish loading. Rather than chase the exact remaining
    // cause, refresh redundantly on window 'load' (everything, including
    // any late subresource) and again after a couple of short delays to
    // catch layout shifts from things neither check covers (hydration,
    // client-fetched data, font/layout settling one more paint later).
    const onWindowLoad = () => ScrollTrigger.refresh(true)
    window.addEventListener('load', onWindowLoad)
    const t1 = setTimeout(() => ScrollTrigger.refresh(true), 400)
    const t2 = setTimeout(() => ScrollTrigger.refresh(true), 1200)

    return () => {
      window.removeEventListener('load', onWindowLoad)
      clearTimeout(t1)
      clearTimeout(t2)
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
