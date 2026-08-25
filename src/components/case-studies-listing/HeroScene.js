'use client'

// Hero section: headline + stat counters + the three.js "ascending growth
// chart" scene, ported from design-concepts/case-studies-listing.html —
// hero markup (~lines 516-533), initHero3D (~lines 898-1032), hero text
// intro (~lines 805-814), hero pin/scrub ScrollTrigger (~lines 879-890) and
// setupCounter (~lines 1037-1048).
//
// Deviations from the concept, both required by the brief:
//  - No `window.heroScrollProgress` global: scroll progress lives in a
//    useRef, written by the pin ScrollTrigger's onUpdate and read by the
//    three.js RAF loop, both inside the same effect.
//  - No preloader: the concept gates the hero text intro behind
//    `window.addEventListener('load', ...)` on a separate preloader
//    component we're not porting. Here it just runs on mount after a short
//    timeout so it doesn't look instant/jarring.

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

function Counter({ target, suffix = '', decimals = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { val: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent =
              (decimals ? obj.val.toFixed(decimals) : Math.floor(obj.val).toLocaleString()) + suffix
          },
        }),
    })

    return () => st.kill()
  }, [target, suffix, decimals])

  return (
    <strong
      ref={ref}
      className="block text-foreground"
      style={{ fontFamily: 'var(--font-editorial)', fontWeight: 900, letterSpacing: '-0.03em', fontSize: 'clamp(1.1rem,5vw,3.4rem)' }}
    >
      0
    </strong>
  )
}

export default function HeroScene({ totalCount = 0 }) {
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const heroInnerRef = useRef(null)
  const scrollCueRef = useRef(null)
  const progressRef = useRef(0)

  // Hero text intro — one-time entrance on mount (not scroll-driven; the
  // concept fires this from a preloader we're not porting).
  useEffect(() => {
    gsap.set('.hero-title .line span', { yPercent: 110 })
    gsap.set('.eyebrow, .hero-sub, .hero-stats', { opacity: 0, y: 20 })

    const timer = setTimeout(() => {
      gsap.to('.hero-title .line span', { yPercent: 0, duration: 1, stagger: 0.12, ease: 'power4.out' })
      gsap.to('.eyebrow, .hero-sub, .hero-stats', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.3,
        ease: 'power3.out',
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Hero pin/scrub ScrollTrigger — drives the text fade-out and feeds
  // progressRef for the three.js scene below.
  useEffect(() => {
    if (!heroRef.current) return

    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressRef.current = self.progress
        if (heroInnerRef.current) {
          gsap.set(heroInnerRef.current, {
            opacity: 1 - self.progress,
            y: -self.progress * 60,
            scale: 1 - self.progress * 0.06,
          })
        }
        if (scrollCueRef.current) {
          gsap.set(scrollCueRef.current, { opacity: Math.max(0, 1 - self.progress * 4) })
        }
      },
    })

    return () => st.kill()
  }, [])

  // Three.js "ascending growth chart" scene.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0.5, 9)
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const group = new THREE.Group()
    scene.add(group)

    const BASELINE = -1.6
    const cyan = new THREE.Color(0x38c5e7)
    const orange = new THREE.Color(0xf97316)

    // Ascending bars: fill mesh + bright edge outline per bar.
    const barCount = 9
    const bars = []
    const disposables = []
    for (let i = 0; i < barCount; i++) {
      const t = i / (barCount - 1)
      const fullH = 0.55 + Math.pow(t, 1.25) * 3.15
      const color = cyan.clone().lerp(orange, t)

      const bar = new THREE.Group()
      const geo = new THREE.BoxGeometry(0.36, fullH, 0.36)
      const fillMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.16 })
      const fill = new THREE.Mesh(geo, fillMat)
      const edgesGeo = new THREE.EdgesGeometry(geo)
      const edgesMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.85 })
      const edges = new THREE.LineSegments(edgesGeo, edgesMat)
      bar.add(fill, edges)

      bar.position.x = (i - (barCount - 1) / 2) * 0.56
      bar.userData.fullH = fullH
      bar.userData.curH = fullH
      bars.push(bar)
      group.add(bar)
      disposables.push(geo, fillMat, edgesGeo, edgesMat)
    }

    // Trend line that draws itself across the bar tops as scroll progresses.
    const trendMat = new THREE.MeshBasicMaterial({ color: 0xffb27a, transparent: true, opacity: 0.95 })
    const trendGlowMat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.22 })
    const arrowMat = new THREE.MeshBasicMaterial({ color: 0xffb27a, transparent: true, opacity: 0.95 })
    let trendMesh = null
    let trendGlowMesh = null
    const arrowGeo = new THREE.ConeGeometry(0.09, 0.26, 12)
    const arrowMesh = new THREE.Mesh(arrowGeo, arrowMat)
    group.add(arrowMesh)
    disposables.push(arrowGeo, arrowMat, trendMat, trendGlowMat)

    function updateTrendLine(sp) {
      const pts = bars.map(
        (bar) => new THREE.Vector3(bar.position.x, BASELINE + bar.userData.curH + 0.16, 0.05)
      )
      const curve = new THREE.CatmullRomCurve3(pts)
      const full = curve.getPoints(80)
      const visibleCount = Math.max(2, Math.round(full.length * Math.min(1, Math.max(0.06, sp))))
      const visible = full.slice(0, visibleCount)
      const subCurve = new THREE.CatmullRomCurve3(visible)

      if (trendMesh) trendMesh.geometry.dispose()
      if (trendGlowMesh) trendGlowMesh.geometry.dispose()
      const segs = Math.max(2, visible.length - 1)
      const coreGeo = new THREE.TubeGeometry(subCurve, segs, 0.028, 6, false)
      const glowGeo = new THREE.TubeGeometry(subCurve, segs, 0.075, 6, false)
      if (trendMesh) {
        trendMesh.geometry = coreGeo
      } else {
        trendMesh = new THREE.Mesh(coreGeo, trendMat)
        group.add(trendMesh)
      }
      if (trendGlowMesh) {
        trendGlowMesh.geometry = glowGeo
      } else {
        trendGlowMesh = new THREE.Mesh(glowGeo, trendGlowMat)
        group.add(trendGlowMesh)
      }

      const tip = visible[visible.length - 1]
      const prev = visible[Math.max(0, visible.length - 2)]
      arrowMesh.position.copy(tip)
      const dir = new THREE.Vector3().subVectors(tip, prev).normalize()
      if (dir.lengthSq() > 0) {
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
        arrowMesh.quaternion.copy(quat)
      }
    }

    // Faint chart gridlines.
    const gridGroup = new THREE.Group()
    const gridMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.05 })
    disposables.push(gridMat)
    ;[0, 1.1, 2.2].forEach((y) => {
      const gGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-3.4, BASELINE + y, -0.3),
        new THREE.Vector3(3.4, BASELINE + y, -0.3),
      ])
      gridGroup.add(new THREE.Line(gGeo, gridMat))
      disposables.push(gGeo)
    })
    group.add(gridGroup)

    // Ambient particle field.
    const particleCount = 260
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) positions[i] = (Math.random() - 0.5) * 16
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pMat = new THREE.PointsMaterial({ color: 0x38c5e7, size: 0.035, transparent: true, opacity: 0.55 })
    const points = new THREE.Points(pGeo, pMat)
    scene.add(points)
    disposables.push(pGeo, pMat)

    let mouseX = 0
    let mouseY = 0
    function onPointerMove(e) {
      mouseX = e.clientX / window.innerWidth - 0.5
      mouseY = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', onPointerMove)

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    let rafId = null
    const timer = new THREE.Timer()

    function renderFrame(sp, t) {
      group.rotation.y = -0.1 + mouseX * 0.22
      group.rotation.x = -mouseY * 0.12

      const growth = 0.32 + 0.68 * sp
      bars.forEach((bar, i) => {
        const curH = bar.userData.fullH * growth
        bar.userData.curH = curH
        bar.scale.y = growth
        bar.position.y = BASELINE + curH / 2 + Math.sin(t * 0.8 + i) * 0.025
      })
      updateTrendLine(sp)

      points.rotation.y += 0.0006
      camera.position.x += (mouseX * 1.0 - camera.position.x) * 0.02
      camera.position.z = 9 - sp * 2.4
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }

    const animate = (now) => {
      rafId = requestAnimationFrame(animate)
      timer.update(now)
      const t = timer.getElapsed()
      renderFrame(progressRef.current || 0, t)
    }
    animate()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      disposables.forEach((d) => d.dispose())
      if (trendMesh) trendMesh.geometry.dispose()
      if (trendGlowMesh) trendGlowMesh.geometry.dispose()
      renderer.dispose()
    }
  }, [])


  return (
    <section
      ref={heroRef}
      className="hero relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-[82px]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ opacity: 0.9 }} />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 15%, rgba(249,115,22,.16), transparent 60%), radial-gradient(ellipse 50% 40% at 85% 80%, rgba(56,197,231,.12), transparent 60%)',
        }}
      />

      <div ref={heroInnerRef} className="hero-inner relative z-[2] px-[20px] pt-[40px] text-center lg:px-0">
        <span className="eyebrow text-accent mb-[22px] inline-flex items-center gap-[10px] text-[12px] font-extrabold uppercase tracking-[.3em]">
          <span className="bg-accent h-px w-[28px]" />
          Case Studies · Proven Results
        </span>

        <h1
          className="hero-title text-foreground uppercase"
          style={{
            fontFamily: 'var(--font-editorial)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            lineHeight: 0.91,
          }}
        >
          <span className="line block overflow-hidden">
            <span className="block">We don&apos;t guess.</span>
          </span>
          <span className="line block overflow-hidden">
            <span className="text-accent block">We engineer growth.</span>
          </span>
        </h1>

        <p
          className="hero-sub text-muted mx-auto mt-[26px] max-w-[640px]"
          style={{ fontSize: 'clamp(1rem,1.6vw,1.2rem)', lineHeight: 1.6 }}
        >
          Real businesses. Real investment. Real outcomes. Explore how ABN Junction turns connected strategy,
          creativity and technology into measurable growth.
        </p>

        <div
          className="hero-stats mt-[56px] grid grid-cols-4 justify-items-center md:flex md:flex-wrap md:justify-center"
          style={{ gap: 'clamp(6px,3vw,70px)' }}
        >
          <div className="stat text-center">
            <Counter target={totalCount} suffix="+" />
            <span className="text-muted mt-1 block text-[11px] uppercase tracking-[.14em]">Case Studies</span>
          </div>
          <div className="stat text-center">
            {/* Static per product decision — live ROAS/revenue aggregation
                across case studies isn't reliable enough yet (metrics mix
                "%"-style and "×"-style ROAS with no consistent unit), so
                this and the KPI strip below use fixed, correct numbers
                instead of a live computation that can currently go wrong. */}
            <Counter target={6500} suffix="+" />
            <span className="text-muted mt-1 block text-[11px] uppercase tracking-[.14em]">Leads Generated</span>
          </div>
          <div className="stat text-center">
            <Counter target={13} suffix="×" />
            <span className="text-muted mt-1 block text-[11px] uppercase tracking-[.14em]">Peak ROAS</span>
          </div>
          <div className="stat text-center">
            <Counter target={5} />
            <span className="text-muted mt-1 block text-[11px] uppercase tracking-[.14em]">Service Pillars</span>
          </div>
        </div>
      </div>

      <div
        ref={scrollCueRef}
        className="scroll-cue text-muted absolute bottom-[32px] left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[.2em]"
      >
        <span className="relative block h-[34px] w-px overflow-hidden" style={{ background: 'linear-gradient(var(--muted),transparent)' }}>
          <span className="scroll-cue-dot bg-accent absolute left-0 top-[-100%] h-full w-full" />
        </span>
        Scroll
      </div>

      {/* Plain (non-jsx) <style> tag — no styled-jsx precedent elsewhere in
          this codebase, and this is scoped by a specific-enough class name
          that global injection is safe. globals.css's reduced-motion guard
          already zeroes animation-duration, but it's repeated explicitly
          here since this keyframe is defined locally, not in globals.css. */}
      <style>{`
        @keyframes case-studies-hero-scrollcue {
          0% {
            top: -100%;
          }
          60% {
            top: 100%;
          }
          100% {
            top: 100%;
          }
        }
        .scroll-cue-dot {
          animation: case-studies-hero-scrollcue 1.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-cue-dot {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
