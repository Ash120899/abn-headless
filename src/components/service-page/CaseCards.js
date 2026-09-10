// Case studies pulled live from WordPress, using the same card design as the
// case-studies listing (ExploreGrid.js): featured image on top, then the
// category-style label, title and excerpt. Hover outlines and scales the card
// in this service's accent colour.
//
// No metric line: the featured artwork already carries the headline figure
// ("1M+ Revenue Generated" and so on), so printing it again under the title
// duplicated it.
//
// Falls back to the authored copy in service-content.js if the live fetch
// returns nothing, so the section never renders empty.
import Link from "next/link";
import SwitchWord from "./SwitchWord";

export default function CaseCards({ cases, studies = [] }) {
  const live = studies.length > 0;

  const items = live
    ? studies.slice(0, 3).map((s) => ({
        key: s.slug,
        href: `/case-studies/${s.slug}`,
        title: s.title,
        description: s.desc,
        image: s.image,
      }))
    : cases.items.map((item) => ({
        key: item.title,
        href: item.href,
        title: item.title,
        description: item.description,
        image: null,
      }));

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
                  card. Falls back to the title's initial when a study has no
                  featured media, as that listing does. */}
              <div className="case-media">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt="" loading="lazy" />
                ) : (
                  <span className="case-media-fallback">{item.title.charAt(0)}</span>
                )}
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
