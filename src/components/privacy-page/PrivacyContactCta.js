// Closing band: someone reaching the bottom of a privacy policy usually
// wants to DO something (export, erase, ask) — this gives them that route
// rather than a generic marketing CTA.
export default function PrivacyContactCta({ content }) {
  return (
    <section
      className="contact-band"
      id="contact"
      style={{ scrollMarginTop: "calc(var(--navh) + 26px)" }}
    >
      <div className="wrap">
        <p className="eyebrow rv">{content.eyebrow}</p>
        <h2 className="rv">{content.heading}</h2>
        <p className="rv">{content.description}</p>
        <div className="contact-actions rv">
          <a className="btn solid" href={content.primary.href}>
            {content.primary.label}
          </a>
          <a className="btn" href={content.secondary.href}>
            {content.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
