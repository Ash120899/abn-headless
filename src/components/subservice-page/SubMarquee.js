// Two opposite-direction keyword tapes. Server component: the motion is
// pure CSS (ssp-marquee translates the line to -50% and loops).
//
// Repeated 4× rather than the concept's 2× for the same reason as
// service-page/ServiceMarquee.js: the loop only reads seamlessly while half
// the line is at least as wide as the viewport.
const REPEATS = 4;

function Line({ words, className }) {
  const run = `✦ ${words.join(" ✦ ")} `;
  return (
    <div className={className}>
      {Array.from({ length: REPEATS }, (_, i) => (
        <span key={i} aria-hidden={i > 0 ? "true" : undefined}>
          {run}
        </span>
      ))}
    </div>
  );
}

export default function SubMarquee({ marquee }) {
  if (!marquee.rowOne.length && !marquee.rowTwo.length) return null;
  return (
    <div className="tape" aria-label={[...marquee.rowOne, ...marquee.rowTwo].join(", ")} role="img">
      {marquee.rowOne.length ? <Line words={marquee.rowOne} className="tape-line" /> : null}
      {marquee.rowTwo.length ? <Line words={marquee.rowTwo} className="tape-line reverse" /> : null}
    </div>
  );
}
