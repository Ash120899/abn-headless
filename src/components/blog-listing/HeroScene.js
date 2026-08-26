"use client";

// Hero — the actual "magnetic orb" interaction from design-concepts/
// ABN_Blogs_V4_Magnetic_Interactive_Concept.html: headline + stat counters
// on the left, an orbiting sphere with 8 floating tool chips on the right
// that get pulled in and absorbed as the hero scrolls past (~line 394-430
// markup, ~line 114-188 CSS, ~line 1299-1396 JS — ported near-verbatim,
// including the exact gather/absorb math, just re-homed onto React refs
// instead of getElementById). Uses plain CSS (not Tailwind utility chains)
// for the same reason FeaturedGrid.js's layout does — this is intricate
// enough that a faithful, readable port beats reconstructing it from
// utilities. The orb logo is the real site logo (same plain <img> pattern
// SiteHeader.js uses), not the concept's inlined base64 copy.
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CHIPS = [
  { key: "google", label: "Google Ads", pos: "c1" },
  { key: "meta", label: "Meta", pos: "c2" },
  { key: "seo", label: "SEO", pos: "c3" },
  { key: "ga4", label: "GA4", pos: "c4" },
  { key: "wordpress", label: "WordPress", pos: "c5" },
  { key: "shopify", label: "Shopify", pos: "c6" },
  { key: "next", label: "Next.js", pos: "c7" },
  { key: "analytics", label: "Analytics", pos: "c8" },
];

function ChipIcon({ chipKey }) {
  const common = "w-[18px] h-[18px] flex-shrink-0 grid place-items-center relative";
  switch (chipKey) {
    case "google":
      return (
        <span className={common}>
          <span style={{ position: "absolute", width: 8, height: 15, background: "#5bb8ff", borderRadius: "6px 6px 2px 2px", transform: "rotate(26deg)", left: 3, top: 1 }} />
          <span style={{ position: "absolute", width: 7, height: 7, background: "#f2b75b", borderRadius: "50%", right: 0, bottom: 1 }} />
        </span>
      );
    case "meta":
      return <span className={common} style={{ color: "#5ba6ff", fontWeight: 900, fontSize: 14 }}>∞</span>;
    case "seo":
      return (
        <span className={common}>
          <span style={{ position: "absolute", width: 11, height: 11, border: "2px solid #6abcf7", borderRadius: "50%", left: 1, top: 1 }} />
          <span style={{ position: "absolute", width: 7, height: 2, background: "#6abcf7", right: -1, bottom: 1, transform: "rotate(42deg)", borderRadius: 2 }} />
        </span>
      );
    case "ga4":
    case "analytics":
      return (
        <span className={common}>
          <span style={{ position: "absolute", width: 4, height: 13, background: "#f0ad54", borderRadius: 10, left: 2, bottom: 1, boxShadow: "6px -4px 0 0 #d79242, 12px -8px 0 0 #5bb8ff" }} />
        </span>
      );
    case "wordpress":
      return <span className={common} style={{ width: 18, height: 18, borderRadius: "50%", background: "#1e2f3d", color: "#fff", fontSize: 10, fontWeight: 900 }}>W</span>;
    case "shopify":
      return <span className={common} style={{ width: 18, height: 18, borderRadius: 4, background: "#86c268", color: "#fff", fontSize: 10, fontWeight: 900 }}>S</span>;
    case "next":
      return <span className={common} style={{ width: 18, height: 18, borderRadius: "50%", background: "#0f0f10", color: "#fff", fontSize: 10, fontWeight: 900, border: "1px solid rgba(255,255,255,.16)" }}>N</span>;
    default:
      return null;
  }
}

function Counter({ target, suffix = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 1.6,
      ease: "power2.out",
      delay: 0.35,
      onUpdate: () => {
        el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
      },
    });
    return () => tween.kill();
  }, [target, suffix]);

  return (
    <strong ref={ref} className="bh-kpi-num">
      0
    </strong>
  );
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}
function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export default function HeroScene({ totalCount = 0, categoryCount = 0 }) {
  const zoneRef = useRef(null);
  const orbitShellRef = useRef(null);
  const orbCoreRef = useRef(null);
  const bulbPortalRef = useRef(null);
  const canvasRef = useRef(null);

  // Particle-network canvas — the concept's #hero-particles (~line 1234-1291):
  // a field of small dots drifting and re-bouncing off the edges, with a
  // faint connecting line drawn between any two close enough together. This
  // was the single biggest visual gap against the concept's own screenshot —
  // without it the hero background is just a flat gradient.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let rafId = null;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const h = Math.max(window.innerHeight, 720);
      canvas.width = window.innerWidth * dpr;
      canvas.height = h * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      resizeCanvas();
      const h = Math.max(window.innerHeight, 720);
      const count = window.innerWidth < 768 ? 52 : 90;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: Math.random() * 2.3 + 0.8,
        c: Math.random() > 0.5 ? "rgba(87,200,243,.82)" : "rgba(245,138,33,.62)",
      }));
    }

    function drawParticles() {
      const h = Math.max(window.innerHeight, 720);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.82;
        ctx.fill();
        ctx.globalAlpha = 1;
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 96) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(255,255,255,.08)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      rafId = requestAnimationFrame(drawParticles);
    }

    initParticles();
    drawParticles();
    window.addEventListener("resize", initParticles);
    return () => {
      window.removeEventListener("resize", initParticles);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    gsap.set(".bh-line span", { yPercent: 110 });
    gsap.set(".bh-sub, .bh-kpis", { opacity: 0, y: 20 });
    const t = setTimeout(() => {
      gsap.to(".bh-line span", { yPercent: 0, duration: 1, stagger: 0.12, ease: "power4.out" });
      gsap.to(".bh-sub, .bh-kpis", { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, delay: 0.25, ease: "power3.out" });
    }, 100);
    return () => clearTimeout(t);
  }, []);

  // Ported near-verbatim from the concept's own magnetic-pull sequence.
  useEffect(() => {
    const zone = zoneRef.current;
    const orbitShell = orbitShellRef.current;
    const orbCore = orbCoreRef.current;
    const bulbPortal = bulbPortalRef.current;
    if (!zone || !orbitShell || !orbCore || !bulbPortal) return;

    const chips = Array.from(orbitShell.querySelectorAll(".bh-chip"));
    let cursorX = 0;
    let cursorY = 0;
    let rafId = null;

    function heroMagnetProgress() {
      const rect = zone.getBoundingClientRect();
      const total = Math.max(1, zone.offsetHeight - window.innerHeight * 0.88);
      return clamp(-rect.top / total, 0, 1);
    }

    // bulbPortal lives inside orbCore, not directly in orbitShell, so its own
    // offsetLeft/offsetTop are relative to the wrong ancestor — walk the
    // offsetParent chain up to orbitShell for a position in the same
    // coordinate space the chips already use.
    function offsetRelativeTo(el, ancestor) {
      let x = 0;
      let y = 0;
      let node = el;
      while (node && node !== ancestor) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent;
      }
      return { x, y };
    }

    function updateMagnet(time = 0) {
      const isMobile = window.innerWidth <= 760;
      if (isMobile) {
        cursorX = Math.sin((time || performance.now()) * 0.0015) * 16;
        cursorY = Math.cos((time || performance.now()) * 0.0011) * 12;
      }
      const p = heroMagnetProgress();
      const shellW = orbitShell.clientWidth;
      const shellH = orbitShell.clientHeight;
      const centerX = shellW / 2;
      const centerY = shellH / 2;
      const portalPos = offsetRelativeTo(bulbPortal, orbitShell);
      const portalX = portalPos.x + bulbPortal.offsetWidth / 2;
      const portalY = portalPos.y + bulbPortal.offsetHeight / 2;
      const gather = smoothstep(0.08, 0.62, p);
      const absorb = smoothstep(0.54, 0.98, p);
      const sphereScale = 1 + gather * 0.2 + absorb * 0.16;
      orbCore.style.transform = `scale(${sphereScale}) rotateY(${cursorX * 0.022}deg) rotateX(${-cursorY * 0.022}deg)`;
      orbCore.style.boxShadow = `0 0 ${42 + gather * 34 + absorb * 72}px color-mix(in srgb,var(--bh-cyan) ${14 + gather * 10 + absorb * 16}%, transparent), inset -18px -20px 28px rgba(0,0,0,.12)`;
      bulbPortal.style.transform = `translateZ(36px) scale(${1 + absorb * 0.08})`;
      bulbPortal.style.filter = `drop-shadow(0 0 ${8 + absorb * 16}px color-mix(in srgb,var(--bh-cyan) ${18 + absorb * 32}%, transparent))`;

      chips.forEach((chip) => {
        const baseX = chip.offsetLeft + chip.offsetWidth / 2;
        const baseY = chip.offsetTop + chip.offsetHeight / 2;
        const dx = centerX - baseX;
        const dy = centerY - baseY;
        const portalDx = portalX - baseX;
        const portalDy = portalY - baseY;
        const distCursor = Math.hypot(cursorX - (baseX - centerX), cursorY - (baseY - centerY));
        const cursorForce = isMobile ? 0 : Math.max(0, 1 - distCursor / 180);
        const hoverDriftX = cursorX * 0.05 * cursorForce;
        const hoverDriftY = cursorY * 0.05 * cursorForce;
        const gatherX = dx * gather * 0.36;
        const gatherY = dy * gather * 0.36;
        const tx = gatherX + (portalDx - gatherX) * absorb + hoverDriftX;
        const ty = gatherY + (portalDy - gatherY) * absorb + hoverDriftY;
        const sc = 1 - gather * 0.12 - absorb * 0.75 + cursorForce * 0.04;
        const fade = smoothstep(0.88, 0.98, p);
        chip.style.transform = `translate(${tx}px,${ty}px) scale(${Math.max(0.16, sc)})`;
        chip.style.opacity = `${1 - fade * 0.96}`;
        chip.style.filter = `drop-shadow(0 0 ${4 + gather * 8 + absorb * 12 + cursorForce * 12}px color-mix(in srgb,var(--bh-cyan) ${12 + gather * 18 + absorb * 18 + cursorForce * 34}%, transparent))`;
      });

      orbitShell.querySelectorAll(".bh-orb-ring").forEach((ring, i) => {
        ring.style.opacity = 0.48 + gather * 0.18 + absorb * 0.3;
        ring.style.filter = `drop-shadow(0 0 ${6 + gather * 10 + absorb * 18}px color-mix(in srgb,var(--bh-cyan) ${8 + gather * 12 + absorb * 18}%, transparent))`;
        ring.style.transform = `translate(-50%,-50%) scale(${1 - absorb * 0.18 + i * 0.012})`;
      });
    }

    function onMove(e) {
      const rect = orbitShell.getBoundingClientRect();
      cursorX = e.clientX - (rect.left + rect.width / 2);
      cursorY = e.clientY - (rect.top + rect.height / 2);
      updateMagnet();
    }
    function onLeave() {
      cursorX = 0;
      cursorY = 0;
      updateMagnet();
    }
    function onScroll() {
      updateMagnet(performance.now());
    }
    function onResize() {
      updateMagnet(performance.now());
    }
    function animate(t) {
      updateMagnet(t);
      rafId = requestAnimationFrame(animate);
    }

    orbitShell.addEventListener("mousemove", onMove);
    orbitShell.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    rafId = requestAnimationFrame(animate);

    return () => {
      orbitShell.removeEventListener("mousemove", onMove);
      orbitShell.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={zoneRef} className="bh-magnet-zone">
      <section className="bh-hero">
        <canvas ref={canvasRef} className="bh-particles" />
        <div className="bh-inner">
          <div className="bh-copy">
            <span className="bh-eyebrow">ABN Insights · Blogs</span>
            <h1 className="bh-title">
              <span className="bh-line"><span>Ideas that move</span></span>
              <span className="bh-line"><span className="bh-accent">the needle.</span></span>
            </h1>
            <p className="bh-sub">
              What we are testing, learning and seeing across paid media, SEO, design, development, video and
              digital infrastructure — written by the people actually doing the work.
            </p>
            <div className="bh-kpis">
              <div className="bh-kpi">
                <Counter target={totalCount} suffix="+" />
                <span>Articles Published</span>
              </div>
              <div className="bh-kpi">
                <Counter target={categoryCount} suffix="+" />
                <span>Knowledge Areas</span>
              </div>
              <div className="bh-kpi">
                <Counter target={5} />
                <span>Service Pillars</span>
              </div>
            </div>
          </div>

          <div className="bh-orbit-shell" ref={orbitShellRef}>
            <div className="bh-orb-ring r1" />
            <div className="bh-orb-ring r2" />
            <div className="bh-orb-ring r3" />
            <div className="bh-orb-aura" />
            <div className="bh-orb-outer-shell">
              <div className="bh-orb-core" ref={orbCoreRef}>
                <div className="bh-orb-shine" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="bh-orb-logo" src="https://abnjunction.com/wp-content/uploads/2026/07/abn-logo.webp" alt="ABN Junction" />
                <div className="bh-bulb-portal" ref={bulbPortalRef} />
              </div>
            </div>
            {CHIPS.map((chip) => (
              <div key={chip.key} className={`bh-chip bh-chip-${chip.pos}`}>
                <ChipIcon chipKey={chip.key} />
                {chip.label}
              </div>
            ))}
          </div>
        </div>
        <div className="bh-scroll-cue">Scroll</div>
      </section>

      <style>{`
        .bh-magnet-zone{position:relative;height:162vh}
        .bh-hero{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;flex-direction:column}
        /* --bh-cyan aliases the page-level --bl-cyan (defined in
           src/app/blogs/page.js) — the concept's own --accent-alt, used for
           the orb/rings/glow, distinct from --accent (orange) which the
           concept reserves for text and a lighter share of the ambient
           background glow. Page-level rather than hardcoded here so it can
           actually change value in light mode (see page.js for why). */
        .bh-magnet-zone{--bh-cyan:var(--bl-cyan)}
        .bh-particles{position:absolute;inset:0;z-index:0}
        .bh-hero::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(circle at 50% 12%, color-mix(in srgb,var(--accent) 16%, transparent), transparent 36%), radial-gradient(circle at 84% 26%, color-mix(in srgb,var(--bh-cyan) 12%, transparent), transparent 32%)}
        .bh-inner{position:relative;z-index:3;flex:1;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(380px,100%),1fr));align-items:center;gap:24px;max-width:1320px;width:min(calc(100% - 40px),1320px);margin:0 auto;padding:70px 0}
        .bh-copy{max-width:700px}
        .bh-eyebrow{display:inline-flex;align-items:center;gap:12px;font-family:var(--font-editorial);font-size:12px;font-weight:800;letter-spacing:.28em;text-transform:uppercase;color:var(--bh-cyan)}
        .bh-eyebrow::before{content:"";width:32px;height:1px;background:currentColor}
        .bh-title{margin:14px 0 0;font-family:var(--font-editorial);font-weight:735;letter-spacing:-.055em;line-height:.9;font-size:clamp(2.75rem,6.35vw,5.55rem);text-transform:uppercase;color:var(--foreground)}
        .bh-line{display:block;overflow:hidden}
        .bh-line span{display:block}
        .bh-accent{color:var(--accent)}
        .bh-sub{margin-top:18px;max-width:560px;font-family:var(--font-editorial);font-size:clamp(1.02rem,1.5vw,1.18rem);line-height:1.72;color:var(--muted)}
        .bh-kpis{display:flex;gap:14px;flex-wrap:wrap;margin-top:22px}
        .bh-kpi{min-width:145px;padding:14px 17px 13px;border:1px solid var(--border);border-radius:22px;background:color-mix(in srgb, var(--surface) 78%, transparent)}
        .bh-kpi-num{display:block;font-family:var(--font-editorial);font-weight:900;font-size:2.08rem;line-height:1;color:var(--foreground)}
        .bh-kpi span{display:block;margin-top:8px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}

        .bh-orbit-shell{position:relative;min-height:clamp(360px,44vw,428px);display:flex;align-items:center;justify-content:center;isolation:isolate}
        /* :has() lets the hover glow live on the outer clip wrapper — the
           actual hoverable element (bh-orb-core) sits inside a border-radius
           overflow:hidden shell, so a filter/drop-shadow placed directly on
           the core itself would get clipped by that shell's own edge. */
        .bh-orb-outer-shell{position:relative;width:clamp(268px,36vw,340px);height:clamp(268px,36vw,340px);border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;pointer-events:none;transition:filter .35s ease}
        .bh-orb-outer-shell:has(.bh-orb-core:hover){filter:drop-shadow(0 0 30px color-mix(in srgb,var(--bh-cyan) 45%, transparent)) drop-shadow(0 0 60px color-mix(in srgb,var(--accent) 25%, transparent))}
        .bh-orb-core{pointer-events:auto;position:relative;width:clamp(188px,25vw,240px);height:clamp(188px,25vw,240px);border-radius:50%;background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.28),transparent 24%),radial-gradient(circle at 64% 72%,color-mix(in srgb,var(--bh-cyan) 20%, transparent),transparent 34%),linear-gradient(145deg,var(--surface-2),var(--surface));backdrop-filter:blur(14px) saturate(185%);-webkit-backdrop-filter:blur(14px) saturate(185%);border:1px solid color-mix(in srgb,#fff 30%, var(--border) 55%);box-shadow:inset -18px -22px 34px rgba(0,0,0,.38), inset 10px 12px 22px color-mix(in srgb,#fff 14%, transparent), 0 0 60px rgba(0,0,0,.24), 0 26px 54px rgba(0,0,0,.36);display:flex;align-items:center;justify-content:center;overflow:hidden;transition:box-shadow .25s ease;transform-style:preserve-3d}
        .bh-orb-core::before{content:"";position:absolute;inset:16px;border-radius:50%;border:1px dashed color-mix(in srgb,var(--bh-cyan) 38%, transparent);animation:bh-spin 16s linear infinite}
        /* Glossy sphere shading — lighter top-left, darker bottom-right — is
           what actually reads as "glass ball" rather than a flat disc. */
        .bh-orb-core::after{content:"";position:absolute;inset:7%;border-radius:50%;background:linear-gradient(140deg,rgba(255,255,255,.20),transparent 34% 68%,rgba(0,0,0,.10));box-shadow:inset -18px -20px 28px rgba(0,0,0,.12),inset 12px 10px 24px rgba(255,255,255,.08);pointer-events:none}
        .bh-orb-aura{position:absolute;left:50%;top:50%;width:200px;height:200px;translate:-50% -50%;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--bh-cyan) 30%, transparent),transparent 70%);filter:blur(30px);pointer-events:none;animation:bh-aura 5.5s ease-in-out infinite}
        .bh-orb-shine{position:absolute;inset:0;z-index:5;border-radius:50%;overflow:hidden;pointer-events:none;transform:translateZ(40px);background:radial-gradient(110px 85px at 26% 20%, rgba(255,255,255,.32), transparent 60%)}
        /* The diagonal light streak that sweeps across the sphere on a loop. */
        .bh-orb-shine::after{content:"";position:absolute;inset:-30%;background:linear-gradient(100deg,transparent 42%,rgba(255,255,255,.5) 49%,rgba(255,255,255,.14) 53%,transparent 62%);translate:-70% -40%;animation:bh-shine-sweep 6.5s ease-in-out infinite}
        .bh-orb-logo{position:relative;z-index:3;width:89%;max-width:194px;filter:drop-shadow(0 14px 24px rgba(0,0,0,.22));transform:translateZ(28px)}
        .bh-bulb-portal{position:absolute;right:14%;top:25%;width:clamp(60px,9vw,68px);height:clamp(92px,14vw,106px);border-radius:30px;z-index:4;pointer-events:none;display:grid;place-items:center}
        .bh-bulb-portal::before{content:"";position:absolute;inset:8px 12px 24px;border-radius:24px;background:radial-gradient(circle at 50% 40%, color-mix(in srgb,var(--bh-cyan) 30%, transparent), transparent 68%);opacity:.66;filter:blur(2px)}
        .bh-bulb-portal::after{content:"";position:absolute;left:50%;bottom:8px;translate:-50% 0;width:20px;height:18px;border-radius:10px;background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 62%, transparent),transparent);opacity:.55}
        .bh-orb-ring{position:absolute;inset:50%;translate:-50% -50%;border-radius:50%;border:1px solid color-mix(in srgb,var(--bh-cyan) 28%, transparent);box-shadow:0 0 30px color-mix(in srgb,var(--accent) 6%, transparent);transition:opacity .2s ease,filter .2s ease}
        .bh-orb-ring.r1{width:clamp(250px,32vw,300px);height:clamp(250px,32vw,300px);animation:bh-spin 30s linear infinite}
        .bh-orb-ring.r2{width:clamp(312px,42vw,392px);height:clamp(312px,42vw,392px);animation:bh-spin-rev 42s linear infinite}
        .bh-orb-ring.r3{width:clamp(372px,50vw,476px);height:clamp(372px,50vw,476px);animation:bh-spin 58s linear infinite}

        .bh-chip{position:absolute;display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:999px;border:1px solid color-mix(in srgb,#fff 26%, var(--border) 65%);background:color-mix(in srgb, var(--surface-2) 55%, transparent);backdrop-filter:blur(12px) saturate(180%);-webkit-backdrop-filter:blur(12px) saturate(180%);font-family:var(--font-editorial);font-size:12px;font-weight:850;color:var(--foreground);white-space:nowrap;animation-timing-function:ease-in-out;animation-iteration-count:infinite}
        .bh-chip-c1{top:2%;left:calc(50% - 64px);animation-name:bh-float-a;animation-duration:4.8s;animation-delay:-.6s}
        .bh-chip-c2{top:16%;right:2%;animation-name:bh-float-b;animation-duration:5.6s;animation-delay:-2.1s}
        .bh-chip-c3{top:51%;right:-2%;animation-name:bh-float-a;animation-duration:4.1s;animation-delay:-1.4s}
        .bh-chip-c4{bottom:10%;right:9%;animation-name:bh-float-b;animation-duration:5.2s;animation-delay:-3s}
        .bh-chip-c5{bottom:0;left:calc(50% - 56px);animation-name:bh-float-a;animation-duration:4.9s;animation-delay:-.2s}
        .bh-chip-c6{bottom:16%;left:3%;animation-name:bh-float-b;animation-duration:4.4s;animation-delay:-2.6s}
        .bh-chip-c7{top:50%;left:-2%;animation-name:bh-float-a;animation-duration:5.4s;animation-delay:-1.9s}
        .bh-chip-c8{top:20%;left:8%;animation-name:bh-float-b;animation-duration:4.7s;animation-delay:-.9s}

        .bh-scroll-cue{position:relative;z-index:3;text-align:center;padding-bottom:18px;font-family:var(--font-editorial);font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--muted)}
        .bh-scroll-cue::after{content:"";display:block;width:1px;height:34px;margin:10px auto 0;background:linear-gradient(var(--muted),transparent)}

        @keyframes bh-spin{to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes bh-spin-rev{to{transform:translate(-50%,-50%) rotate(-360deg)}}
        @keyframes bh-aura{0%,100%{opacity:.45;scale:1}50%{opacity:.85;scale:1.14}}
        @keyframes bh-shine-sweep{0%,100%{translate:-70% -40%}50%{translate:70% 40%}}
        @keyframes bh-float-a{0%,100%{translate:0 0;rotate:0deg}50%{translate:0 -9px;rotate:-2deg}}
        @keyframes bh-float-b{0%,100%{translate:0 0;rotate:0deg}50%{translate:4px -7px;rotate:2deg}}

        @media (max-width:980px){
          .bh-inner{padding-top:100px}
        }
        @media (max-width:760px){
          .bh-magnet-zone{height:152svh}
          .bh-hero{height:100svh}
          .bh-inner{height:calc(100svh - 20px);padding:90px 0 16px}
          .bh-title{font-size:clamp(2.6rem,12vw,3.35rem)}
          .bh-kpis{gap:10px}
          .bh-kpi{min-width:calc(50% - 8px);padding:12px 14px 11px}
          .bh-orbit-shell{min-height:min(58vw,260px)}
          .bh-orb-outer-shell{width:clamp(190px,46vw,240px);height:clamp(190px,46vw,240px)}
          .bh-orb-core{width:clamp(130px,32vw,168px);height:clamp(130px,32vw,168px)}
          .bh-chip{font-size:10px;padding:7px 10px}
          .bh-scroll-cue{display:none}
        }
      `}</style>
    </div>
  );
}
