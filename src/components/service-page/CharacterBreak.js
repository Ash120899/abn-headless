"use client";

// Personality break: the character drifts/tilts slightly as the section
// passes the middle of the viewport, with three floating metric badges
// pinned around it. Ported from the concept's `funChar` block inside its
// onScroll handler — same coefficients and clamps.
import { useEffect, useRef } from "react";
import SwitchWord from "./SwitchWord";

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

export default function CharacterBreak({ characterBreak }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    function onScroll() {
      const r = img.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      img.style.transform = `translateY(${clamp(-center * 0.035, -18, 18)}px) rotate(${clamp(
        -center * 0.008,
        -3,
        3
      )}deg) scale(${1 + Math.abs(clamp(center / window.innerHeight, -1, 1)) * 0.02})`;
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="character-break">
      <div className="container">
        <div className="char-wrap">
          {characterBreak.badges.map((badge, i) => (
            <span className={`float-badge fb${i + 1}`} key={badge}>
              {badge}
            </span>
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={imgRef} src={characterBreak.image} alt="" />
        </div>
        <div className="character-copy">
          <div className="eyebrow">{characterBreak.eyebrow}</div>
          <h2>
            {characterBreak.headingBefore} <SwitchWord words={characterBreak.headingSwitch} />
          </h2>
          <p>{characterBreak.description}</p>
          <div className="actions">
            <a className="btn dark" href={characterBreak.cta.href}>
              {characterBreak.cta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
