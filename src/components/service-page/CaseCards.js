// Case studies pulled live from WordPress, using the same card design as the
// case-studies listing (ExploreGrid.js): featured image on top, then the
// category-style label, title and excerpt. Hover outlines and scales the card
// in this service's accent colour.
//
// No metric line: the featured artwork already carries the headline figure
// ("1M+ Revenue Generated" and so on), so printing it again under the title
// duplicated it.
//
// Only real case studies are shown. If WordPress returns none, the section
// isn't rendered at all.
import Link from "next/link";
import SwitchWord from "./SwitchWord";

export default function CaseCards({ cases, studies = [] }) {
  const items = studies.slice(0, 3).map((s) => ({
    key: s.slug,
    href: `/case-studies/${s.slug}`,
    title: s.title,
    description: s.desc,
    image: s.image,
  }));

  if (!items.length) return null;

  return (
    <section className="cards-section">
      <div className="container">
        <div className="section-top">
          <div>
            <div className="eyebrow" style={{ color: "var(--coral)" }}>
              {cases.eyebrow}
            </div>
            <h2>
              {cases.headingBefore} <SwitchWord words={cases.headingSwitch} />
            </h2>
          </div>
          <p>{cases.description}</p>
        </div>

        <div className="cards">
          {items.map((item) => (
            <Link className="case" key={item.key} href={item.href}>
              {/* Featured image on top, matching the case-studies listing
                  card. A study with no featured media keeps the empty frame
                  so the row stays aligned. */}
              <div className="case-media">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt="" loading="lazy" />
                ) : null}
              </div>
              <div className="case-body">
                <small>Case Study</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
