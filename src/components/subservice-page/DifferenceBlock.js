// "The approach": character art on a tinted panel beside a ticked list.
// Server component.
import Lines from "./Lines";

export default function DifferenceBlock({ difference }) {
  if (!difference.points.length && !difference.heading.length) return null;
  return (
    <section className="section difference" id="difference">
      <div className={`wrap diff-grid${difference.image ? "" : " no-art"}`}>
        {difference.image ? (
          <div className="diff-art reveal">
            {difference.imageLabel ? <span className="label">{difference.imageLabel}</span> : null}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={difference.image.url} alt={difference.image.alt} loading="lazy" />
          </div>
        ) : null}
        <div className="diff-copy reveal">
          {difference.eyebrow ? <div className="eyebrow">{difference.eyebrow}</div> : null}
          {difference.heading.length ? (
            <h2>
              <Lines lines={difference.heading} />
            </h2>
          ) : null}
          {difference.description ? <p>{difference.description}</p> : null}
          {difference.points.length ? (
            <div className="diff-list">
              {difference.points.map((p, i) => (
                <div className="diff-row" key={`${i}-${p.title}`}>
                  <span className="tick" aria-hidden="true">
                    ✓
                  </span>
                  <div>
                    <strong>{p.title}</strong>
                    {p.description ? <small>{p.description}</small> : null}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
