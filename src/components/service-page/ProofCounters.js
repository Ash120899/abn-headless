"use client";

// KPI strip: the numbers count up once when the section scrolls into view,
// and each cell's bar-chart motif slides up behind it.
//
// The counting itself lives in Counter.js (shared with the hero stats), so
// prefix/number/suffix come through as three separate ACF values and only
// the digits animate.
import { useEffect, useRef, useState } from "react";
import KineticWord from "./KineticWord";
import Counter from "./Counter";

export default function ProofCounters({ proof }) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Drives the little bar-chart motif behind each cell (the concept's
  // separate proofObserver, threshold .35).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        setInView(true);
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="proof" ref={sectionRef}>
      <div className="container">
        <div className="eyebrow">{proof.eyebrow}</div>
        <h2 style={{ fontSize: "clamp(48px,6vw,88px)", letterSpacing: "-.055em", lineHeight: 0.92, margin: "9px 0 0" }}>
          {proof.headingBefore} <KineticWord>{proof.headingKinetic}</KineticWord>
        </h2>
        <div className="proof-grid">
          {proof.items.map((item) => (
            <div className={`proof-item${inView ? " in-view" : ""}`} key={item.label}>
              <b>
                <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} />
              </b>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
