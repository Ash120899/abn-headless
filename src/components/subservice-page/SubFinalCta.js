// Closing call to action. Server component.
import Lines from "./Lines";

export default function SubFinalCta({ finalCta }) {
  if (!finalCta.heading.length && !finalCta.cta.label) return null;
  return (
    <section className="final" id="final">
      <div className="wrap final-inner">
        <div>
          {finalCta.eyebrow ? <div className="eyebrow light">{finalCta.eyebrow}</div> : null}
          {finalCta.heading.length ? (
            <h2>
              <Lines lines={finalCta.heading} />
            </h2>
          ) : null}
          {finalCta.description ? <p>{finalCta.description}</p> : null}
        </div>
        {finalCta.cta.label && finalCta.cta.href ? (
          <a className="btn white" href={finalCta.cta.href}>
            {finalCta.cta.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}
