// Server component — static tool rail, no live data. Ported from the
// concept's .tool-rail (~line 1143-1163).
import SwitchWord from "./SwitchWord";
import ScrollReveal from "./ScrollReveal";
import BrandIcon from "./BrandIcon";
import { TOOLS_LIST } from "@/lib/blog-shared";

export default function ToolsRail() {
  return (
    <section id="tools" className="py-[70px] md:py-[100px] border-t border-theme">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-6">
        <ScrollReveal as="div" className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-end mb-9">
          <div>
            <span
              className="inline-flex items-center gap-3 text-[12px] uppercase"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 800, letterSpacing: ".28em", color: "var(--bl-cyan)" }}
            >
              <span className="w-8 h-px" style={{ background: "currentColor" }} />
              The stack behind the thinking
            </span>
            <h2
              className="text-foreground mt-3"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 880, letterSpacing: "-.05em", lineHeight: 1.02, fontSize: "clamp(2.8rem,5.6vw,5rem)" }}
            >
              <SwitchWord words={["Tools", "Toys"]} /> we actually use.
            </h2>
          </div>
          <p className="text-muted" style={{ lineHeight: 1.72, fontSize: "clamp(1.02rem,1.5vw,1.18rem)" }}>
            The real ecosystem behind the work — kept out of the hero so the first fold stays premium and abstract.
          </p>
        </ScrollReveal>

        <ScrollReveal
          as="div"
          className="grid gap-[18px] grid-cols-[repeat(auto-fit,minmax(max(140px,(100%-72px)/5),1fr))]"
        >
          {TOOLS_LIST.map((tool) => (
            <div
              key={tool.label}
              className="tool-card p-6 rounded-[22px] border border-theme bg-surface flex items-center justify-center gap-3 min-h-[92px] font-black text-foreground transition-transform duration-200 hover:-translate-y-[3px]"
            >
              <BrandIcon name={tool.icon} />
              {tool.label}
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
