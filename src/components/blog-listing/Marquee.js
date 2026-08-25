// Server component — CSS-driven marquee. Content matches the concept's own
// marquee list verbatim (design-concepts/ABN_Blogs_V4_Magnetic_Interactive_Concept.html
// ~line 435-452). Reuses the app's existing .animate-marquee/@keyframes
// marquee (src/app/globals.css) instead of inventing new keyframes.
const MARQUEE_ITEMS = [
  "Performance Marketing",
  "SEO",
  "AI & Tools",
  "Brand Stories",
  "Development",
  "Design",
  "WordPress",
  "eCommerce",
  "Analytics",
];

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="border-t border-b border-theme bg-surface py-4 overflow-hidden relative z-[2]">
      <div className="flex w-max gap-[30px] animate-marquee" style={{ animationDuration: "26s" }}>
        {items.map((label, i) => (
          <span key={i} className="flex items-center gap-[26px] shrink-0 whitespace-nowrap">
            <span
              className="text-[14px] uppercase text-muted"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 900, letterSpacing: ".14em" }}
            >
              {label}
            </span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
