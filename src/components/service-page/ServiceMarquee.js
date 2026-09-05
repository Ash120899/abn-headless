// Two opposite-direction scrolling keyword rows. Server component — the
// motion is pure CSS (the svc-marquee keyframe translates the row to -50%
// and loops).
//
// The row is repeated 4×, not the 2× the concept uses, because the loop
// only reads seamlessly while *half* the row is at least as wide as the
// viewport. At 2× repeats the shorter second row measures ~1.4k px, so its
// half falls short of a wide monitor and a visible blank gap tracks across
// the black band near the end of each cycle. 4× keeps a half comfortably
// wider than any realistic viewport, and costs nothing but a little text.
const REPEATS = 4;

function Row({ text, className }) {
  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: REPEATS }, (_, i) => `${text} ✦ `).join("")}
    </div>
  );
}

export default function ServiceMarquee({ marquee }) {
  return (
    <section className="marquee">
      <Row text={marquee.rowOne} className="marquee-row" />
      <Row text={marquee.rowTwo} className="marquee-row two" />
    </section>
  );
}
