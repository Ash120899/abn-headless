// Closing band: "you don't need a perfect brief to talk to us".
export default function ContactFinalCta({ content }) {
  return (
    <section className="final">
      <div className="wrap finalbox">
        <div>
          <div className="kicker">{content.kicker}</div>
          <h2>{content.heading}</h2>
          <p>{content.description}</p>
        </div>
        <a className="btn primary" href={content.cta.href}>
          {content.cta.label}
        </a>
      </div>
    </section>
  );
}
