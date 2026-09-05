// Closing full-width CTA. Server component; only the kinetic headline
// word is interactive.
import KineticWord from "./KineticWord";

export default function FinalCta({ finalCta }) {
  return (
    <section className="final">
      <div className="container">
        <div className="eyebrow">{finalCta.eyebrow}</div>
        <h2>
          {finalCta.headingBefore} <KineticWord>{finalCta.headingKinetic}</KineticWord>
        </h2>
        <p>{finalCta.description}</p>
        <div className="actions" style={{ justifyContent: "center" }}>
          <a className="btn dark" href={finalCta.ctaPrimary.href}>
            {finalCta.ctaPrimary.label}
          </a>
          <a className="btn ghost" href={finalCta.ctaSecondary.href}>
            {finalCta.ctaSecondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
