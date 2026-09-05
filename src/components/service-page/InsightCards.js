// Blog teasers pulled live from WordPress. Keeps the concept's white
// background, but adopts the card treatment from the case-studies page's
// "Insights Behind The Results" block (featured image on top, category
// eyebrow, title, excerpt, read link) on this page's red accent.
//
// Falls back to the authored copy in service-content.js when the live
// fetch returns nothing.
import Link from "next/link";
import Image from "next/image";
import SwitchWord from "./SwitchWord";

// getInsightsPosts() hands back the raw WP term name, which is both HTML-
// escaped ("&amp;") and the full verbose form ("eCommerce & Marketplace
// SEO: Strategies, Tips, and Conversions"). The listings show only the part
// before the colon; same treatment here so a category label still fits on a
// card.
function cleanCategory(label) {
  if (!label) return "Blog";
  return label.replace(/&amp;/g, "&").split(":")[0].trim();
}

export default function InsightCards({ insights, posts = [] }) {
  const live = posts.length > 0;

  const items = live
    ? posts.slice(0, 3).map((p) => ({
        key: p.href,
        href: p.href,
        category: cleanCategory(p.label),
        title: p.title,
        description: p.desc,
        image: p.image || null,
      }))
    : insights.items.map((item) => ({
        key: item.title,
        href: item.href,
        category: item.category,
        title: item.title,
        description: item.description,
        image: null,
      }));

  return (
    <section className="insights">
      <div className="container">
        <div className="insights-top">
          <div>
            <div className="eyebrow accent">{insights.eyebrow}</div>
            <h2>
              {insights.headingBefore} <SwitchWord words={insights.headingSwitch} />
            </h2>
          </div>
          <p>
            Case studies show what changed. Our blog explains the thinking, experiments and lessons behind the work.
          </p>
        </div>

        <div className="blogcards">
          {items.map((item) => (
            <Link className="blogcard" key={item.key} href={item.href}>
              {item.image ? (
                <div className="blogcard-media">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 90vw, 380px" className="blogcard-img" />
                </div>
              ) : (
                <div className="blogcard-media blogcard-media--empty" />
              )}
              <div className="blogcard-body">
                <small>{item.category}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="blog-link">Read Article →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
