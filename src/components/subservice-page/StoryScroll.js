"use client";

// The signature scroller: a pinned stage whose track of panels slides
// sideways as the section scrolls, with a progress meter and step dots.
// Ported from the concept's onScroll handler.
//
// Two changes from the concept:
//  1. The stage pins under the fixed site header and the section rail
//     (the concept pinned at top:0 under nothing), and the scrub range is
//     measured from the stage's real height instead of innerHeight.
//  2. The scroll length follows the panel count (--slide-count), so a page
//     with 4 panels doesn't scroll through 6 panels' worth of nothing.
//
// At 700px and below the concept drops the pin and stacks the panels; the
// CSS does that and this effect stands down.
import { useEffect, useRef } from "react";
import Lines from "./Lines";

const MOBILE = 700;

export default function StoryScroll({ journey }) {
  const scrollRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const meterRef = useRef(null);
  const indexRef = useRef(null);
  const count = journey.slides.length;

  useEffect(() => {
    const story = scrollRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!story || !sticky || !track) return;

    const dots = indexRef.current ? Array.from(indexRef.current.querySelectorAll("span[data-dot]")) : [];
    let scheduled = false;

    function update() {
      scheduled = false;
      if (window.innerWidth <= MOBILE) {
        track.style.transform = "";
        return;
      }
      const rect = story.getBoundingClientRect();
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const travel = story.offsetHeight - sticky.offsetHeight;
      const p = Math.max(0, Math.min(1, (stickyTop - rect.top) / Math.max(travel, 1)));
      const end = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
      track.style.transform = `translate3d(${-p * end}px,0,0)`;
      if (meterRef.current) meterRef.current.style.width = `${p * 100}%`;
      const step = Math.floor(p * (dots.length - 0.001));
      dots.forEach((el, i) => el.classList.toggle("on", i <= step));
    }

    function schedule() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("load", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
    };
  }, [count]);

  if (!count) return null;

  return (
    <section className="story" id="journey">
      <div className="story-scroll" ref={scrollRef} style={{ "--slide-count": count }}>
        <div className="story-sticky" ref={stickyRef}>
          <div className="story-inner">
            <div className="story-top">
              <div>
                {journey.eyebrow ? <div className="eyebrow">{journey.eyebrow}</div> : null}
                {journey.heading.length ? (
                  <h2>
                    <Lines lines={journey.heading} />
                  </h2>
                ) : null}
              </div>
              {journey.description ? <p>{journey.description}</p> : null}
            </div>

            <div className="story-window">
              <div className="story-track" ref={trackRef}>
                {journey.slides.map((s, i) => (
                  <article className="story-slide" key={`${i}-${s.title}`}>
                    <div>
                      {s.step ? <span className="step">{s.step}</span> : null}
                      <h3>{s.title}</h3>
                      <p>{s.description}</p>
                    </div>
                    <div className="story-graphic" aria-hidden="true">
                      {s.icon ? <span className="big">{s.icon}</span> : null}
                      {s.panelTitle || s.panelItems.length ? (
                        <div className="story-ui">
                          {s.panelTitle ? <b>{s.panelTitle}</b> : null}
                          {s.panelItems.map((item) => (
                            <i key={item}>{item}</i>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="story-meter">
              <span ref={meterRef} />
            </div>
            <div className="story-index" ref={indexRef}>
              {journey.slides.map((_, i) => (
                <span data-dot key={i} className={i === 0 ? "on" : undefined}>
                  {i + 1}
                </span>
              ))}
              {journey.scrollHint ? <em>{journey.scrollHint}</em> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
