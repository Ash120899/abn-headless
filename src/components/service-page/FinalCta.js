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
          {finalCta.ctaPrimary.label ? (
            <a className="btn dark" href={finalCta.ctaPrimary.href || undefined}>
              {finalCta.ctaPrimary.label}
            </a>
          ) : null}
          {finalCta.ctaSecondary.label ? (
            <a className="btn ghost" href={finalCta.ctaSecondary.href || undefined}>
              {finalCta.ctaSecondary.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
