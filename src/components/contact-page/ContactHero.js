"use client";

// Hero with five service orbs that orbit the ABN logo and then converge into
// it as the sticky hero scrolls. Ported from the concept's positionOrbits()
// and particle canvas, with the same constants, easing and thresholds —
// re-homed onto React refs and given teardown.
//
// How it reads: the orbs travel an ellipse while the hero is pinned, then
// past ~60% scroll progress they collapse toward the bulb in the logo,
// shrinking and fading out as they arrive — services converging on one point.
import { useEffect, useRef } from "react";

const SERVICES = [
  { label: "MARKETING", color: "var(--ct-dm)" },
  { label: "DESIGN", color: "var(--ct-design)" },
  { label: "DEVELOPMENT", color: "var(--ct-dev)" },
  { label: "VIDEO", color: "var(--ct-video)" },
  { label: "SECURITY", color: "var(--ct-security)" },
];

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}
function ease(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export default function ContactHero({ hero }) {
  const scrollRef = useRef(null);
  const stageRef = useRef(null);
  const logoRef = useRef(null);
  const canvasRef = useRef(null);

  // --- orbit convergence -------------------------------------------------
  useEffect(() => {
    const heroScroll = scrollRef.current;
    const orbitStage = stageRef.current;
    const centerLogo = logoRef.current;
    if (!heroScroll || !orbitStage || !centerLogo) return;

    const orbs = Array.from(orbitStage.querySelectorAll(".service-orb"));
    if (!orbs.length) return;

    function positionOrbits() {
      const r = heroScroll.getBoundingClientRect();
      const total = heroScroll.offsetHeight - window.innerHeight;
      const p = clamp(-r.top / Math.max(total, 1), 0, 1);
      const stage = orbitStage.getBoundingClientRect();
      const logo = centerLogo.getBoundingClientRect();

      // Convergence target: the centre of the bulb inside the logo artwork.
      const targetX = logo.left - stage.left + logo.width * 0.845;
      const targetY = logo.top - stage.top + logo.height * 0.53;

      const cx = stage.width * 0.5;
      const cy = stage.height * 0.49;
      const rx = Math.min(stage.width * 0.38, 290);
      const ry = Math.min(stage.height * 0.38, 185);
      const rotation = p * Math.PI * 2.25;
      const converge = ease(clamp((p - 0.6) / 0.34, 0, 1));

      orbs.forEach((orb, i) => {
        const base = -Math.PI / 2 + i * ((Math.PI * 2) / orbs.length);
        const angle = base + rotation;
        const ox = cx + Math.cos(angle) * rx;
        const oy = cy + Math.sin(angle) * ry;
        let x = ox + (targetX - ox) * converge;
        let y = oy + (targetY - oy) * converge;

        // Orbs are centred on their coordinate, so half the pill sits either
        // side. On narrow screens the ellipse alone keeps them in bounds but
        // the pill does not — clamp to the stage so labels never clip out of
        // the hero or collide with the character in the corner.
        const halfW = orb.offsetWidth / 2;
        const halfH = orb.offsetHeight / 2;
        x = clamp(x, halfW + 2, stage.width - halfW - 2);
        y = clamp(y, halfH + 2, stage.height - halfH - 2);

        orb.style.left = `${x}px`;
        orb.style.top = `${y}px`;
        orb.style.opacity = String(1 - clamp((converge - 0.68) / 0.32, 0, 1));
        orb.style.transform = `translate(-50%,-50%) scale(${1 - converge * 0.55})`;
      });
    }

    positionOrbits();
    window.addEventListener("scroll", positionOrbits, { passive: true });
    window.addEventListener("resize", positionOrbits);
    return () => {
      window.removeEventListener("scroll", positionOrbits);
      window.removeEventListener("resize", positionOrbits);
    };
  }, []);

  // --- hero particles ----------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles = [];
    let rafId = null;

    function resizeParticles() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: Math.max(24, Math.floor(rect.width / 45)) }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        r: Math.random() * 1.45 + 0.35,
        vx: (Math.random() - 0.5) * 0.12,
        vy: Math.random() * 0.18 + 0.03,
        a: Math.random() * 0.28 + 0.08,
      }));
    }

    function draw() {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > rect.height + 4) {
          p.y = -4;
          p.x = Math.random() * rect.width;
        }
        if (p.x < -4) p.x = rect.width + 4;
        if (p.x > rect.width + 4) p.x = -4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(95,225,245,${p.a})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    }

    resizeParticles();
    draw();
    window.addEventListener("resize", resizeParticles);
    return () => {
      window.removeEventListener("resize", resizeParticles);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="hero-scroll" ref={scrollRef}>
      <div className="hero">
        <canvas id="heroParticles" ref={canvasRef} aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">{hero.eyebrow}</div>
            <h1>{hero.heading}</h1>
            <p>{hero.description}</p>
            <div className="ctas">
              <a className="btn primary" href={hero.ctaPrimary.href}>
                {hero.ctaPrimary.label}
              </a>
              <a className="btn" href={hero.ctaSecondary.href}>
                {hero.ctaSecondary.label}
              </a>
            </div>
          </div>

          <div className="orbit-stage" ref={stageRef}>
            <div className="orbit-glow" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="center-logo"
              ref={logoRef}
              src="/contact/center-logo.png"
              alt="ABN Junction logo"
            />
            {SERVICES.map((s, i) => (
              <div className="service-orb" key={s.label} data-i={i} style={{ "--c": s.color }}>
                <span>{s.label}</span>
              </div>
            ))}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="devil" src="/contact/devil-character.png" alt="" />
            <div className="devil-note">{hero.characterNote}</div>
            <div className="scrollhint">{hero.scrollHint}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
