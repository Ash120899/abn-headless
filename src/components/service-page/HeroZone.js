"use client";

// Hero with the orbiting tool system that converges into a locked network
// as the pinned hero-zone scrolls. Ported from the concept's renderHero /
// heroProgress / makeCurvePath RAF loop, with the same constants, easing
// and thresholds — only re-homed onto React refs and given teardown.
//
// How it reads on screen: the six tool pills orbit on a wide ellipse while
// idle, drift with the pointer, then (as the hero-zone scrolls) tighten
// onto a smaller ellipse, collapse to icon-only "nodes", get joined by a
// closed loop with a travelling pulse, and finally the whole visual flips
// to `system-locked`.
import { useEffect, useRef } from "react";
import KineticWord from "./KineticWord";
import SwitchWord from "./SwitchWord";
import Counter from "./Counter";

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function makeCurvePath(cx, cy, x, y, bend = 0) {
  const mx = (cx + x) / 2 + bend;
  const my = (cy + y) / 2 - bend * 0.38;
  return `M ${cx} ${cy} Q ${mx} ${my} ${x} ${y}`;
}

export default function HeroZone({ hero }) {
  const zoneRef = useRef(null);
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const netRef = useRef(null);
  const orbitGuideRef = useRef(null);
  const growthTailRef = useRef(null);

  useEffect(() => {
    const zone = zoneRef.current;
    const heroEl = heroRef.current;
    const hv = visualRef.current;
    const net = netRef.current;
    const orbitGuide = orbitGuideRef.current;
    const growthTail = growthTailRef.current;
    if (!zone || !hv) return;

    const tools = Array.from(hv.querySelectorAll(".tool"));
    if (!tools.length) return;

    const pointer = { x: 0, y: 0 };
    let rafId = null;

    function heroProgress() {
      const r = zone.getBoundingClientRect();
      const stickyH = heroEl ? heroEl.offsetHeight : window.innerHeight;
      const total = Math.max(1, zone.offsetHeight - stickyH);
      return clamp(-r.top / total, 0, 1);
    }

    function render(t) {
      const time = t || 0;
      const r = hv.getBoundingClientRect();
      const cx = r.width / 2;
      const cy = r.height / 2;
      const mobile = window.innerWidth < 900;
      const p = heroProgress();
      const ease = p * p * (3 - 2 * p);
      const wideX = mobile ? 135 : 255;
      const wideY = mobile ? 95 : 175;
      const lockX = mobile ? 100 : 150;
      const lockY = mobile ? 76 : 112;

      if (net) {
        net.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
        net.innerHTML = "";
      }

      const pts = [];
      const fine = window.matchMedia("(pointer:fine)").matches && !mobile;

      tools.forEach((el, i) => {
        const base = ((Math.PI * 2) / tools.length) * i - 1.38;
        const idleA = base + Math.sin(time * 0.00034 + i * 0.9) * 0.12 + time * 0.000035;
        const a = idleA * (1 - ease) + base * ease;
        const rx = wideX * (1 - ease) + lockX * ease;
        const ry = wideY * (1 - ease) + lockY * ease;
        const x = cx + Math.cos(a) * rx;
        const y = cy + Math.sin(a) * ry;
        pts.push([x, y]);

        const px = fine ? pointer.x * 5 * (1 - ease) : 0;
        const py = fine ? pointer.y * 4 * (1 - ease) : 0;
        el.style.transform = `translate(${x - el.offsetWidth / 2 - cx + px}px,${
          y - el.offsetHeight / 2 - cy + py
        }px) scale(${1 - ease * 0.07})`;
        el.classList.toggle("node-mode", p > 0.48);

        if (net) {
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", makeCurvePath(cx, cy, x, y, (i - 2.5) * 5));
          path.style.opacity = (0.06 + ease * 0.42).toFixed(2);
          net.appendChild(path);
        }
      });

      // Past ~30% the nodes get wired into a closed loop with a pulse
      // travelling around it — the "connected system" payoff.
      if (net && p > 0.3) {
        let d = "";
        pts.forEach((pt, i) => {
          d += (i ? "L" : "M") + pt[0] + " " + pt[1] + " ";
        });
        d += "Z";
        const loop = document.createElementNS("http://www.w3.org/2000/svg", "path");
        loop.setAttribute("d", d);
        loop.setAttribute("class", "loop");
        loop.style.opacity = clamp((p - 0.3) / 0.42, 0, 1);
        net.appendChild(loop);

        const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const seg = (time * 0.00018) % 1;
        const idx = Math.floor(seg * pts.length);
        const next = (idx + 1) % pts.length;
        const local = seg * pts.length - idx;
        pulse.setAttribute("cx", pts[idx][0] + (pts[next][0] - pts[idx][0]) * local);
        pulse.setAttribute("cy", pts[idx][1] + (pts[next][1] - pts[idx][1]) * local);
        pulse.setAttribute("r", mobile ? 2.6 : 3.4);
        pulse.setAttribute("class", "pulse");
        pulse.style.opacity = clamp((p - 0.38) / 0.25, 0, 1);
        net.appendChild(pulse);
      }

      hv.classList.toggle("system-locked", p > 0.68);
      if (orbitGuide) {
        orbitGuide.style.transform = `rotate(${time * 0.004 * (1 - ease * 0.8)}deg) scale(${1 - ease * 0.08})`;
      }
      if (growthTail) {
        growthTail.style.transform = `scaleY(${0.15 + ease * 0.85})`;
        growthTail.style.opacity = 0.12 + ease * 0.72;
      }

      const ch = hv.querySelector(".hero-char");
      if (ch) {
        const lift = Math.sin(time * 0.0011) * 3 - ease * (mobile ? 4 : 12);
        ch.style.transform = `translate(${pointer.x * (mobile ? 0 : 3)}px,${lift}px) scale(${1 + ease * 0.025})`;
        ch.style.filter = `drop-shadow(0 22px 24px rgba(73,21,16,.22)) drop-shadow(0 0 ${
          8 + ease * 22
        }px rgba(255,255,255,${0.04 + ease * 0.15}))`;
      }

      rafId = requestAnimationFrame(render);
    }

    function onPointerMove(e) {
      if (!window.matchMedia("(pointer:fine)").matches) return;
      const r = hv.getBoundingClientRect();
      pointer.x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      pointer.y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    }
    function onPointerLeave() {
      pointer.x = 0;
      pointer.y = 0;
    }

    hv.addEventListener("pointermove", onPointerMove);
    hv.addEventListener("pointerleave", onPointerLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      hv.removeEventListener("pointermove", onPointerMove);
      hv.removeEventListener("pointerleave", onPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="hero-zone" ref={zoneRef}>
      <section className="hero" ref={heroRef}>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">{hero.eyebrow}</div>
            <h1>
              {hero.headingBefore} <span>{hero.headingHighlight}</span> {hero.headingAfter}{" "}
              <KineticWord as="em">{hero.headingKinetic}</KineticWord>
            </h1>
            <p>{hero.description}</p>
            <div className="actions">
              <a className="btn dark" href={hero.ctaPrimary.href}>
                {hero.ctaPrimary.label}
              </a>
              <a className="btn ghost" href={hero.ctaSecondary.href}>
                {hero.ctaSecondary.label}
              </a>
            </div>
            <div className="hero-stats">
              {hero.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <b>
                    <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </b>
                  <small>{s.label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" ref={visualRef}>
            {/* The concept's "SIGNALS — CONNECTED SYSTEM" status label sat
                here; dropped on request. The `system-locked` class it keyed
                off is still applied by the RAF loop, since the halo/tool
                styling also depends on it. */}
            <div className="orbit-guide" ref={orbitGuideRef} />
            <svg className="connection-svg" ref={netRef} aria-hidden="true" />
            <div className="halo">
              <span className="halo-core" />
            </div>
            <div className="growth-tail" ref={growthTailRef} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-char" src={hero.character} alt="" />
            {hero.tools.map((tool) => (
              <span className="tool" key={tool.label}>
                <i>{tool.glyph}</i>
                <b>{tool.label}</b>
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
