"use client";

// The "choose how you want to talk" tabs: book a call, WhatsApp, or email.
// Ported from the concept's showTab / startAutoTabs, including the 5s
// auto-advance and the progress bar that resets on each change.
//
// Auto-advance pauses while the pointer is over the tabs or the panels, so
// it never yanks a panel away from someone reading it.
import { useCallback, useEffect, useRef, useState } from "react";

const INTERVAL = 5000;

export default function ContactChannels({ content }) {
  const tabs = content.tabs;
  const [active, setActive] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const hoveringRef = useRef(false);

  // Bumping timerKey remounts the progress bar, which restarts its CSS
  // animation — the concept did this by removing and re-adding a class.
  const show = useCallback((index) => {
    setActive((prev) => (index + tabs.length) % tabs.length);
    setTimerKey((k) => k + 1);
  }, [tabs.length]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!hoveringRef.current) show(active + 1);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [active, show]);

  const hoverOn = () => (hoveringRef.current = true);
  const hoverOff = () => (hoveringRef.current = false);

  return (
    <section className="channels" id="channels">
      <div className="wrap channels-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="channel-character" src="/contact/devil-character.png" alt="" />
        <div className="channel-bubble">{content.bubble}</div>

        <div className="channels-head">
          <div className="kicker">{content.kicker}</div>
          <h2>{content.heading}</h2>
          <p>{content.description}</p>
        </div>

        <div className="tabs" onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              className={`tab${i === active ? " active" : ""}`}
              onClick={() => show(i)}
              aria-selected={i === active}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-progress" aria-hidden="true">
          <span key={timerKey} className="run" />
        </div>

        <div className="tabpanels" onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
          {tabs.map((tab, i) => {
            const isActive = i === active;
            if (tab.id === "book") {
              return (
                <div key={tab.id} className={`tabpane calendar${isActive ? " active" : ""}`}>
                  <div className="cal-copy">
                    <h3>{tab.heading}</h3>
                    <p>{tab.description}</p>
                  </div>
                  <div className="cal-embed">
                    <div className="calendar-card">
                      <div>
                        <b>{tab.embedTitle}</b>
                        <small>{tab.embedNote}</small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={tab.id} className={`tabpane simple-pane${isActive ? " active" : ""}`}>
                <div>
                  <h3>{tab.heading}</h3>
                  <p>{tab.description}</p>
                </div>
                <a
                  className="action"
                  href={tab.action.href}
                  target={tab.action.external ? "_blank" : undefined}
                  rel={tab.action.external ? "noopener noreferrer" : undefined}
                >
                  {tab.action.label}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
