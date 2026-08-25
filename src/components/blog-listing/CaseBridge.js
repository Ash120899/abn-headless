// Server component — 3 real case-study preview cards linking blog readers
// to proof. Ported from the concept's .case-track (~line 1126-1141).
import Link from "next/link";
import SwitchWord from "./SwitchWord";

export default function CaseBridge({ items }) {
  if (!items?.length) return null;

  return (
    <section id="cases-bridge" className="py-[70px] md:py-[100px] border-t border-theme">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-6">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-end mb-9">
          <div>
            <span
              className="inline-flex items-center gap-3 text-[12px] uppercase"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 800, letterSpacing: ".28em", color: "var(--accent)" }}
            >
              <span className="w-8 h-px" style={{ background: "currentColor" }} />
              Connected proof
            </span>
            <h2
              className="text-foreground mt-3"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 880, letterSpacing: "-.05em", lineHeight: 1.02, fontSize: "clamp(2.8rem,5.6vw,5rem)" }}
            >
              See the case studies behind the <SwitchWord words={["ideas", "madness"]} />
            </h2>
          </div>
          <p className="text-muted" style={{ lineHeight: 1.72, fontSize: "clamp(1.02rem,1.5vw,1.18rem)" }}>
            Blogs and case studies should not feel isolated. Jump from ideas to proof, and from proof back to
            related articles.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(320px,1fr))] overflow-x-auto pb-2.5">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/case-studies/${item.slug}`}
              className="block rounded-[24px] border border-theme bg-surface-weak p-[22px] hover:border-accent transition-colors"
            >
              <div className="flex justify-between gap-3 text-[11px] uppercase text-muted" style={{ fontWeight: 800, letterSpacing: ".12em" }}>
                <span>Case Study</span>
              </div>
              <h4
                className="mt-3.5 text-foreground"
                style={{ fontFamily: "var(--font-editorial)", fontWeight: 900, fontSize: "1.5rem" }}
              >
                {item.title}
              </h4>
              {item.metric ? (
                <div className="text-accent mt-2" style={{ fontFamily: "var(--font-editorial)", fontWeight: 950, fontSize: "2rem" }}>
                  {item.metric}
                </div>
              ) : null}
              <p className="text-muted mt-2.5">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
