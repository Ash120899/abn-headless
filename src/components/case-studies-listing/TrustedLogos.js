// Server component — "Trusted Across Industries" section: heading + two
// marquee rows of client logos scrolling in opposite directions. Reads the
// concept's ~lines 561-573 (markup), 255-276 (CSS), and renderLogos()
// (~line 1354). Reuses .animate-marquee (see Clients.js for the exact
// opposite-direction technique via animation-direction: reverse) instead of
// inventing new keyframes.
import Image from "next/image";

function LogoRow({ urls, reverse }) {
  // Duplicated for a seamless loop, same technique as the marquee above /
  // Clients.js.
  const doubled = [...urls, ...urls];
  const duration = reverse ? 40 : 34;

  return (
    <div
      className="overflow-hidden mt-3.5"
      style={{
        WebkitMaskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)",
        maskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)",
      }}
    >
      <div
        className="flex items-center gap-4.5 w-max my-2 animate-marquee"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
          gap: "18px",
        }}
      >
        {doubled.map((url, i) => (
          <div
            key={i}
            className="w-[170px] h-[96px] flex-shrink-0 rounded-[18px] border border-theme bg-surface flex items-center justify-center p-3.5"
          >
            <div className="relative w-[130px] h-[70px] rounded-xl bg-white flex items-center justify-center p-2.5">
              <Image src={url} alt="Client logo" fill sizes="130px" className="object-contain p-2.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustedLogos({ logoUrls }) {
  const urls = logoUrls || [];
  if (!urls.length) return null;

  const mid = Math.max(1, Math.ceil(urls.length / 2));
  const row1 = urls.slice(0, mid);
  const row2 = urls.slice(mid).length ? urls.slice(mid) : urls;

  return (
    <section className="pt-[60px] pb-[70px] md:pt-[90px] md:pb-[110px]">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-0">
        <div className="grid md:grid-cols-[1.1fr_.75fr] gap-8 items-end mb-9">
          <div>
            <span className="inline-block text-[11.5px] font-extrabold tracking-[0.24em] uppercase text-accent mb-4">
              Trusted Across Industries
            </span>
            {/* Sentence-case sans per the concept, not the site-wide League-Gothic .section-heading — see FeaturedGrid.js for the full note. */}
            <h2
              className="text-foreground mt-2"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.1rem,4.6vw,4rem)",
                lineHeight: 1.02,
              }}
            >
              Brands that trusted us with <span className="text-accent">real growth.</span>
            </h2>
          </div>
          <p className="text-muted leading-relaxed text-[15px]">
            From healthcare and education to food, media and e-commerce — these are the brands behind the outcomes,
            not just logos in a portfolio.
          </p>
        </div>
      </div>

      <LogoRow urls={row1} reverse={false} />
      <LogoRow urls={row2} reverse={true} />
    </section>
  );
}
