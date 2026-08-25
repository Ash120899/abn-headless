// Server component — no interactivity needed, just a CSS-driven marquee.
// Reuses the app's existing .animate-marquee/@keyframes marquee (defined in
// src/app/globals.css, see src/components/Clients.js for the reference
// pattern) instead of inventing new keyframes for this page.
import { SERVICE_PILLARS } from "@/data/navigation";

// The concept's own marquee list mixes service pillars with ad-hoc channel
// names (META ADS, GOOGLE ADS, SEO). navigation.js already has a clean,
// real "service pillars" list used elsewhere on the site (mega menu /
// mobile drawer), so that's reused here instead of duplicating a second,
// slightly different list of service names.
const MARQUEE_ITEMS = SERVICE_PILLARS.map((p) => p.label.toUpperCase());

export default function Marquee() {
  // Content duplicated once for a seamless loop, same technique as Clients.js.
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="border-t border-b border-theme bg-surface py-5 overflow-hidden relative z-[2]">
      <div className="flex w-max gap-9 animate-marquee" style={{ animationDuration: "26s" }}>
        {items.map((label, i) => (
          <span key={i} className="flex items-center gap-9 shrink-0 whitespace-nowrap">
            <span
              className="text-2xl tracking-wide text-muted uppercase"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 800 }}
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
