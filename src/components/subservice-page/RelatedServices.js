// "The connected growth system": link cards to neighbouring services.
// Server component. Plain <a>, not next/link: most of these point at pages
// WordPress still serves, which client-side navigation would 404.
import Lines from "./Lines";

export default function RelatedServices({ related }) {
  if (!related.items.length) return null;
  return (
    <section className="section connected" id="connected">
      <div className="wrap">
        <div className="sectionhead reveal">
          {related.eyebrow ? <div className="eyebrow">{related.eyebrow}</div> : null}
          {related.heading.length ? (
            <h2>
              <Lines lines={related.heading} />
            </h2>
          ) : null}
          {related.description ? <p>{related.description}</p> : null}
        </div>
        <div className="linkgrid">
          {related.items.map((item, i) => (
            <a href={item.href} className="linkcard reveal" key={`${i}-${item.title}`}>
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
              <h3>{item.title}</h3>
              {item.description ? <p>{item.description}</p> : null}
              {item.linkLabel ? <small>{item.linkLabel}</small> : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
