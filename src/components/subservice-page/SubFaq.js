// FAQ: intro on the left, native <details> accordion on the right, first
// item open, as in the concept. Server component: <details> needs no JS.
import Lines from "./Lines";

export default function SubFaq({ faq }) {
  if (!faq.items.length) return null;
  return (
    <section className="section faq" id="faq">
      <div className="wrap faqgrid">
        <div className="reveal">
          {faq.eyebrow ? <div className="eyebrow">{faq.eyebrow}</div> : null}
          {faq.heading.length ? (
            <h2>
              <Lines lines={faq.heading} />
            </h2>
          ) : null}
          {faq.intro ? <p className="lead">{faq.intro}</p> : null}
        </div>
        <div className="reveal">
          {faq.items.map((item, i) => (
            <details key={`${i}-${item.q}`} open={i === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
