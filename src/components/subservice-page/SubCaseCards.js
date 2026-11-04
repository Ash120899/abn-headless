// "Proof in action": two case studies pulled live from WordPress, in the
// concept's editorial card (accent visual on top, label, title, excerpt,
// link). The concept's visual block held placeholder client names; here it
// shows the study's featured image, which already carries its headline
// figure, over the accent gradient. A study without one shows its title on
// the gradient instead.
//
// Only real case studies are shown. If WordPress returns none, the section
// isn't rendered at all.
import Link from "next/link";
import Lines from "./Lines";

export default function SubCaseCards({ cases, studies = [] }) {
  const items = studies.slice(0, 2);
  if (!items.length) return null;

  return (
    <section className="section case" id="work">
      <div className="wrap">
        <div className="sectionhead reveal">
          {cases.eyebrow ? <div className="eyebrow light">{cases.eyebrow}</div> : null}
          {cases.heading.length ? (
            <h2>
              <Lines lines={cases.heading} />
            </h2>
          ) : null}
          {cases.description ? <p>{cases.description}</p> : null}
        </div>
        <div className="case-v2">
          {items.map((s) => (
            <Link className="case-v2-card reveal" key={s.slug} href={`/case-studies/${s.slug}`}>
              <div className={`case-v2-visual${s.image ? " has-image" : ""}`}>
                {s.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.image} alt="" loading="lazy" />
                ) : (
                  <>
                    <div className="big-number">{s.title}</div>
                    {s.metric ? <small>{s.metric}</small> : null}
                  </>
                )}
              </div>
              <div className="case-v2-body">
                {cases.cardLabel ? <span className="label">{cases.cardLabel}</span> : null}
                <h3>{s.title}</h3>
                {s.desc ? <p>{s.desc}</p> : null}
                {cases.linkLabel ? <span className="more">{cases.linkLabel}</span> : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
