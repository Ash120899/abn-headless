// Final call-to-action block. Server component. Ported from the concept's
// .final-cta (~line 1194-1202).
import { PRIMARY_LINKS } from "@/data/navigation";
import ScrollReveal from "./ScrollReveal";

export default function FinalCTA() {
  return (
    <section
      className="py-[70px] md:py-[110px] border-t border-theme text-center"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 62%), var(--surface)",
      }}
    >
      <ScrollReveal as="div" className="max-w-[760px] mx-auto px-[20px] md:px-6">
        <h2
          className="text-foreground"
          style={{ fontFamily: "var(--font-editorial)", fontWeight: 950, letterSpacing: "-.03em", lineHeight: 1.08, fontSize: "clamp(2.2rem,4.4vw,3.6rem)" }}
        >
          Want growth strategies
          <br />
          <span className="text-accent">applied to your business?</span>
        </h2>
        <p className="text-muted mt-4.5" style={{ fontSize: "1.1rem" }}>
          We don&apos;t just write about marketing — we run it. Let&apos;s talk about what could work for you.
        </p>
        <a
          href={PRIMARY_LINKS.contact.href}
          className="inline-flex items-center justify-center rounded-full bg-accent text-white font-black px-8 py-4.5 text-[13px] uppercase tracking-[.08em] mt-7 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          Book a Strategy Call →
        </a>
      </ScrollReveal>
    </section>
  );
}
