"use client";

// "What we offer": capability cards, each with a "what's included" toggle.
// The detail text is always in the HTML (hidden by CSS until expanded) so
// it stays crawlable. Card numbers are the row order.
import { useState } from "react";
import Lines from "./Lines";

export default function OfferGrid({ offers }) {
  const [open, setOpen] = useState(() => new Set());

  if (!offers.items.length) return null;

  function toggle(i) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section className="section offers" id="offers">
      <div className="wrap">
        <div className="sectionhead reveal">
          {offers.eyebrow ? <div className="eyebrow">{offers.eyebrow}</div> : null}
          {offers.heading.length ? (
            <h2>
              <Lines lines={offers.heading} />
            </h2>
          ) : null}
          {offers.description ? <p>{offers.description}</p> : null}
        </div>
        <div className="offer-grid">
          {offers.items.map((item, i) => {
            const expanded = open.has(i);
            const detailId = `offer-detail-${i}`;
            return (
              <article className={`offer reveal${expanded ? " expanded" : ""}`} key={`${i}-${item.title}`}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                {item.icon ? (
                  <span className="icon" aria-hidden="true">
                    {item.icon}
                  </span>
                ) : null}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.detail ? (
                  <>
                    {offers.moreLabel ? (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={detailId}
                        onClick={() => toggle(i)}
                      >
                        {expanded ? `${offers.lessLabel || offers.moreLabel} −` : `${offers.moreLabel} +`}
                      </button>
                    ) : null}
                    <div className="detail" id={detailId}>
                      {item.detail}
                    </div>
                  </>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
