// Hero: breadcrumb, eyebrow, three-part headline (middle part in the
// accent), intro, two CTAs, the character art with up to three floating
// tags, and the highlights strip underneath. Server component; the entrance
// and float animations are CSS.
//
// The breadcrumb is built from WordPress (Services > parent service page >
// this page), not typed into ACF, so it can't drift from the real URLs.

export default function SubHero({ hero, crumbs }) {
  const tagClass = ["one", "two", "three"];

  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <nav className="crumb" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.label}>
                {i > 0 ? <span aria-hidden="true">/ </span> : null}
                {c.href ? <a href={c.href}>{c.label}</a> : <strong aria-current="page">{c.label}</strong>}
              </span>
            ))}
          </nav>
          {hero.eyebrow ? <div className="eyebrow">{hero.eyebrow}</div> : null}
          <h1>
            {hero.headingBefore}
            {hero.headingHighlight ? <> <span>{hero.headingHighlight}</span></> : null}
            {hero.headingAfter ? <> {hero.headingAfter}</> : null}
          </h1>
          {hero.description ? <p className="lead">{hero.description}</p> : null}
          {hero.ctaPrimary.label || hero.ctaSecondary.label ? (
            <div className="hero-actions">
              {hero.ctaPrimary.label && hero.ctaPrimary.href ? (
                <a className="btn black" href={hero.ctaPrimary.href}>
                  {hero.ctaPrimary.label}
                </a>
              ) : null}
              {hero.ctaSecondary.label && hero.ctaSecondary.href ? (
                <a className="btn outline" href={hero.ctaSecondary.href}>
                  {hero.ctaSecondary.label}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className={`hero-art${hero.image ? "" : " no-image"}`}>
          {hero.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.image.url} alt={hero.image.alt} fetchPriority="high" />
          ) : null}
          {hero.tags.map((tag, i) => (
            <div className={`hero-tag ${tagClass[i]}`} key={`${i}-${tag.text}`}>
              {tag.icon ? <>{tag.icon} </> : null}
              {tag.text}
            </div>
          ))}
        </div>
      </div>

      {hero.highlights.length ? (
        <div className="wrap herobottom">
          {hero.highlights.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
