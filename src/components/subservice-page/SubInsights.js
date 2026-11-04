// "Insights": three blog posts pulled live from WordPress (from the page's
// chosen blog category, else the latest), under a heading whose last word
// types through a list. The concept used emoji placeholders for the card
// art; these are the posts' featured images.
//
// Only real posts are shown. If WordPress returns none, the section isn't
// rendered at all.
import Link from "next/link";
import Image from "next/image";
import Lines from "./Lines";
import SwitchWord from "@/components/service-page/SwitchWord";

// WP term names arrive HTML-escaped and in their long form ("eCommerce &
// Marketplace SEO: Strategies, Tips, and Conversions"); the listings show
// only the part before the colon.
function cleanCategory(label) {
  if (!label) return "";
  return label.replace(/&amp;/g, "&").split(":")[0].trim();
}

export default function SubInsights({ insights, posts = [] }) {
  const items = posts.slice(0, 3);
  if (!items.length) return null;

  return (
    <section className="section insights" id="insights">
      <div className="wrap">
        <div className="sectionhead reveal">
          {insights.eyebrow ? <div className="eyebrow">{insights.eyebrow}</div> : null}
          {insights.heading.length ? (
            <h2>
              <Lines lines={insights.heading} />
              {insights.headingSwitch.length ? (
                <>
                  {" "}
                  <SwitchWord words={insights.headingSwitch} />
                </>
              ) : null}
            </h2>
          ) : null}
          {insights.description ? <p>{insights.description}</p> : null}
        </div>
        <div className="bloggrid">
          {items.map((p) => (
            <Link className="blogcard reveal" key={p.href} href={p.href}>
              <div className="blogimg">
                {p.image ? (
                  <Image src={p.image} alt={p.title} width={760} height={430} sizes="(max-width: 980px) 90vw, 380px" />
                ) : null}
              </div>
              <div className="blogbody">
                <small>{cleanCategory(p.label)}</small>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                {insights.linkLabel ? <span className="more">{insights.linkLabel}</span> : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
