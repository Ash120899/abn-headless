"use client";

// The pinned "growth engine" story: a tall scroll zone whose progress
// swaps which service scene (copy + character art) is active, and fills a
// vertical progress rail. Ported from the concept's storyZone block inside
// its onScroll handler — same progress math and same
// `floor(p * sceneCount)` stepping.
//
// The active scene is React state rather than a class-toggle loop, but the
// rendered `.active` class and its CSS transition are identical, so the
// visual behaviour matches. The rail fill stays a direct ref write since
// it's a continuous value, not a step.
import { useEffect, useRef, useState } from "react";
import SwitchWord from "./SwitchWord";

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

export default function JourneyStory({ journey }) {
  const zoneRef = useRef(null);
  const fillRef = useRef(null);
  const [active, setActive] = useState(0);
  const sceneCount = journey.scenes.length;

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    function onScroll() {
      const r = zone.getBoundingClientRect();
      const total = Math.max(1, zone.offsetHeight - window.innerHeight);
      const p = clamp(-r.top / total, 0, 1);
      setActive(Math.min(sceneCount - 1, Math.floor(p * sceneCount)));
      if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sceneCount]);

  return (
    <section className="journey">
      <div className="container journey-head">
        <div>
          <div className="eyebrow" style={{ color: "var(--coral)" }}>
            {journey.eyebrow}
          </div>
          <h2>
            {journey.headingBefore} <SwitchWord words={journey.headingSwitch} />
          </h2>
        </div>
        <p>{journey.description}</p>
      </div>

      {/* The concept hardcoded 520vh for its 6 scenes: 100vh of pinned stage
          plus 70vh of scroll per scene. Services with 4 or 5 sub-services
          need proportionally less, or the last scene sits on screen for an
          extra viewport of dead scrolling — so the same formula is expressed
          against the real scene count. */}
      <div
        className="story-zone"
        ref={zoneRef}
        style={{ "--scene-count": sceneCount }}
      >
        <div className="story-stage">
          <div className="story-grid">
            <div className="story-copy">
              {journey.scenes.map((scene, i) => (
                <div className={`scene${i === active ? " active" : ""}`} key={scene.title}>
                  <div className="num">{scene.num}</div>
                  <h3>{scene.title}</h3>
                  <p>{scene.description}</p>
                  <div className="chips">
                    {scene.chips.map((chip) => (
                      <span className="chip" key={chip}>
                        {chip}
                      </span>
                    ))}
                  </div>
                  <a href={scene.link.href}>{scene.link.label}</a>
                </div>
              ))}
            </div>

            <div className="story-visual">
              {journey.scenes.map((scene, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={scene.title}
                  className={`scene-img${i === active ? " active" : ""}`}
                  src={scene.image}
                  alt=""
                />
              ))}
              <div className="growth-line">
                <i ref={fillRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
