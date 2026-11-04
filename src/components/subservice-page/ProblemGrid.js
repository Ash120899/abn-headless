// "The challenge": dark band of problem cards. Server component.
import Lines from "./Lines";

export default function ProblemGrid({ problems }) {
  if (!problems.items.length) return null;
  return (
    <section className="section problems" id="problems">
      <div className="wrap">
        <div className="sectionhead reveal">
          {problems.eyebrow ? <div className="eyebrow">{problems.eyebrow}</div> : null}
          {problems.heading.length ? (
            <h2>
              <Lines lines={problems.heading} />
            </h2>
          ) : null}
          {problems.description ? <p>{problems.description}</p> : null}
        </div>
        <div className="problem-grid">
          {problems.items.map((item, i) => (
            <article className="problem reveal" key={`${i}-${item.title}`}>
              {item.label ? <span className="num">{item.label}</span> : null}
              {item.symbol ? (
                <span className="symbol" aria-hidden="true">
                  {item.symbol}
                </span>
              ) : null}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
