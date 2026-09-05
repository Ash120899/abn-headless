// FAQ accordion. Server component — native <details>/<summary> keeps it
// keyboard-accessible and working without JS, which is what the concept
// used too.
export default function ServiceFaq({ faq }) {
  return (
    <section className="faq">
      <div className="container">
        <div className="eyebrow" style={{ color: "var(--coral)" }}>
          {faq.eyebrow}
        </div>
        <h2>{faq.heading}</h2>
        <div className="faqgrid">
          <div className="faqintro">
            <p>{faq.intro}</p>
          </div>
          <div>
            {faq.items.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
