"use client";

// Full-bleed cinematic scroll: four headline words swap as you scroll, four
// glass "depth cards" parallax at different rates, three characters enter
// in sequence and lean into a hand-off, and a signal orb travels the arc
// between them. Ported from the concept's cinemaProgress / updateCinema —
// same easing curves, per-index constants and stagger windows.
import { useEffect, useRef, useState } from "react";

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

// Catmull-Rom spline through the orb waypoints: each segment is shaped by
// its neighbours, so the wave flows continuously instead of changing
// direction sharply at every point. Endpoints are duplicated so the first
// and last segments have something to lean on.
function catmullRom(pts, t) {
  const segs = pts.length - 1;
  const scaled = clamp(t, 0, 1) * segs;
  const i = Math.min(segs - 1, Math.floor(scaled));
  const u = scaled - i;
  const p0 = pts[Math.max(0, i - 1)];
  const p1 = pts[i];
  const p2 = pts[i + 1];
  const p3 = pts[Math.min(pts.length - 1, i + 2)];
  const u2 = u * u;
  const u3 = u2 * u;
  const axis = (a, b, c, d) =>
    0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u2 + (-a + 3 * b - 3 * c + d) * u3);
  return { x: axis(p0.x, p1.x, p2.x, p3.x), y: axis(p0.y, p1.y, p2.y, p3.y) };
}

const DEPTH = [54, 38, 72, 46];

// Waypoints for the signal orb, as percentages of the sticky stage.
//
// The route is a broad U. It starts high on the left, tucked against the
// "high-intent query" / "intent matched" cards, drops down past the first
// character, runs along the bottom beneath all three characters, then climbs
// the right-hand side past "signal returned" to finish at "message + visual".
//
// Interpolation is Catmull-Rom (see catmullRom below) so the corners round
// off into one continuous curve rather than the straight segments a plain
// lerp would give.
const ORB_PATH = [
  { x: 23, y: 46 }, // start · high, beside high-intent query
  { x: 22, y: 62 }, // drop down the left, past intent matched
  { x: 26, y: 80 }, // round the bottom-left corner
  { x: 42, y: 86 }, // along the bottom, under character 1
  { x: 58, y: 84 }, // under character 2
  { x: 74, y: 85 }, // under character 3
  { x: 84, y: 78 }, // round the bottom-right corner
  { x: 87, y: 58 }, // climb the right edge, past signal returned
  { x: 86, y: 40 }, // finish · message + visual
];
const ENTER_STARTS = [0, 0.24, 0.5];
const ENTER_ENDS = [0.42, 0.69, 0.96];

export default function CinemaJourney({ cinema }) {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const charRefs = useRef([]);
  const orbRef = useRef(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function update() {
      const r = section.getBoundingClientRect();
      const total = Math.max(1, section.offsetHeight - window.innerHeight);
      const p = clamp(-r.top / total, 0, 1);

      setStep(Math.min(3, Math.floor(p * 4)));

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const dir = i % 2 ? -1 : 1;
        card.style.transform = `translate3d(${dir * (p - 0.5) * DEPTH[i]}px,${
          (p - 0.5) * (i < 2 ? -34 : 30)
        }px,0) scale(${1 + (i % 2 ? 0.018 : 0.03) * Math.sin(p * Math.PI)})`;
        // Fade in and stay. The concept used sin(p·π), which peaks mid-scroll
        // and returns to near-zero at the end, so the cards faded out again
        // on the last frame. Ramp up over the first third and hold at 1.
        card.style.opacity = clamp(0.34 + (p / 0.33) * 0.66, 0.34, 1).toFixed(2);
      });

      charRefs.current.forEach((el, i) => {
        if (!el) return;
        const q = clamp((p - ENTER_STARTS[i]) / (ENTER_ENDS[i] - ENTER_STARTS[i]), 0, 1);
        const enter = 1 - Math.pow(1 - q, 3);
        const shift = (i === 0 ? -70 : i === 2 ? 70 : 0) * (1 - enter);
        el.style.opacity = (0.22 + 0.78 * enter).toFixed(2);
        el.style.transform =
          (i === 1 ? "translateX(-50%) " : "") +
          `translateY(${(1 - enter) * 42}px) rotate(${(i - 1) * (1 - enter) * 4}deg)`;

        const im = el.querySelector("img");
        if (im) {
          const roleFloat = Math.sin((p * 7 + i) * Math.PI) * 3 * enter;
          const roleTilt = (i === 0 ? -2 : i === 2 ? 2 : 0) * Math.sin(p * Math.PI) * enter;
          im.style.transform = `scale(${0.86 + enter * 0.14}) translate(${shift * 0.18}px,${roleFloat}px) rotate(${roleTilt}deg)`;
          im.style.filter = `drop-shadow(0 20px 28px rgba(0,0,0,.30)) drop-shadow(0 0 ${8 + enter * 12}px rgba(245,111,93,.10))`;
        }

        const fx = el.querySelector(".role-fx");
        if (fx) {
          const reveal = clamp((q - 0.28) / 0.34, 0, 1);
          const drift = (i === 0 ? -10 : i === 2 ? 10 : 0) * (1 - reveal);
          fx.style.opacity = (reveal * 0.94).toFixed(2);
          fx.style.transform = `translate(calc(-50% + ${drift}px),${10 - 10 * reveal}px) scale(${0.94 + 0.06 * reveal})`;
        }
      });

      if (orbRef.current) {
        // The signal visits the four depth cards in narrative order:
        //   search (top-left) → landing (bottom-left)
        //   → measurement (bottom-right) → creative (top-right)
        // Percentages are of the sticky stage and are kept just inside each
        // card so the orb reads as arriving at it rather than covering it.
        const pos = catmullRom(ORB_PATH, p);
        orbRef.current.style.left = `${pos.x}%`;
        orbRef.current.style.top = `${pos.y}%`;
        // Gentle pulse as it travels, independent of the path itself.
        orbRef.current.style.transform = `scale(${0.9 + Math.sin(p * Math.PI * 6) * 0.12})`;
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="cinema" ref={sectionRef}>
      <div className="cinema-track">
        <div className="cinema-sticky">
          <div className="cinema-atmosphere" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>

          <div className="cinema-copy">
            <div className="eyebrow">{cinema.eyebrow}</div>
            <div className="cinema-words" aria-label={cinema.words.join(". ")}>
              {cinema.words.map((word, i) => (
                <span className={`cinema-word${i === step ? " active" : ""}`} key={word}>
                  {word}
                </span>
              ))}
            </div>
            <p>{cinema.description}</p>
          </div>

          {/* Wrapper is inert on desktop (the cards position themselves
              absolutely against the stage) but becomes the 2x2 grid on
              mobile, where absolute placement has no room to work. */}
          <div className="cinema-depth">
            {cinema.depthCards.map((card, i) => (
              <div
                className={`depth-card d${i + 1}`}
                key={card.label}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
                <small>{card.label}</small>
                <b>{card.title}</b>
                <span>{card.note}</span>
              </div>
            ))}
          </div>

          <div className="handoff-team" aria-hidden="true">
            {cinema.handoff.map((char, i) => (
              <div
                className={`handoff-char hc${i + 1}`}
                key={char.caption}
                ref={(el) => {
                  charRefs.current[i] = el;
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={char.image} alt="" />
                <i className="role-fx">{char.roleFx}</i>
                <span>{char.caption}</span>
              </div>
            ))}
            <div className="signal-orb" ref={orbRef}>
              <i />
            </div>
          </div>

          <div className="cinema-scroll">{cinema.scrollHint}</div>
        </div>
      </div>
    </section>
  );
}
