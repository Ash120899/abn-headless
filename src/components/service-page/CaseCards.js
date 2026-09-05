// Case studies pulled live from WordPress, laid out like the blog
// listing's "connected proof" band (CaseBridge.js) rather than the
// concept's gradient art tiles — same card shape, same per-card metric
// variety (leads → reach → CPL), but on this page's red accent.
//
// Falls back to the authored copy in service-content.js if the live fetch
// returns nothing, so the section never renders empty.
import Link from "next/link";
import SwitchWord from "./SwitchWord";
import { findMetric } from "@/lib/case-study-shared";

const METRIC_PRIORITY = [["lead"], ["reach"], ["cpl"]];

function displayMetric(item, i) {
  const found = findMetric(item, METRIC_PRIORITY[i] || []) || item.metrics?.[0];
  return found ? `${found.value} ${found.label}` : null;
}

export default function CaseCards({ cases, studies = [] }) {
  const live = studies.length > 0;

  const items = live
    ? studies.slice(0, 3).map((s, i) => ({
        key: s.slug,
        href: `/case-studies/${s.slug}`,
        title: s.title,
        metric: displayMetric(s, i),
        description: s.desc,
      }))
    : cases.items.map((item) => ({
        key: item.title,
        href: item.href,
        title: item.title,
        metric: item.art,
        description: item.description,
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
              <div className="case-body">
                <small>Case Study</small>
                <h3>{item.title}</h3>
                {item.metric ? <div className="case-metric">{item.metric}</div> : null}
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
