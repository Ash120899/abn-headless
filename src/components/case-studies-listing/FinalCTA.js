// Final call-to-action block. Server component — no JS needed. Ported from
// the concept's .cta-block (design-concepts/case-studies-listing.html
// ~lines 673-679).
import { PRIMARY_LINKS } from "@/data/navigation";

export default function FinalCTA() {
  return (
    <section className="py-[70px] md:py-[130px] border-t border-theme bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_70%)]">
      <div className="max-w-[820px] mx-auto px-[20px] md:px-6 text-center">
        <h2
          className="text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.08] mb-5.5 text-foreground uppercase"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.01em" }}
        >
          Your Business Could Be
          <br />
          <span className="text-accent">Our Next Case Study.</span>
        </h2>
        <p className="text-muted text-[1.1rem] mb-9.5">
          Every case study above started with a single conversation. Let&apos;s find out what&apos;s possible for yours.
        </p>
        <a
          href={PRIMARY_LINKS.contact.href}
          className="inline-flex items-center justify-center rounded-full bg-accent text-white font-bold px-9 py-4.5 text-[1.05rem] transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          Book a Strategy Call →
        </a>
      </div>
    </section>
  );
}
