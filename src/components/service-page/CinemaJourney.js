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

const DEPTH = [54, 38, 72, 46];
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
        card.style.opacity = (0.34 + Math.sin(clamp(p * 1.2, 0, 1) * Math.PI) * 0.66).toFixed(2);
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
        const x = 10 + p * 78;
        const y = 53 + Math.sin(p * Math.PI * 2) * -12 + (p > 0.48 ? 6 : 0);
        orbRef.current.style.left = `${x}%`;
        orbRef.current.style.top = `${y}%`;
        orbRef.current.style.transform = `scale(${0.86 + Math.sin(p * Math.PI * 3) * 0.16})`;
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
