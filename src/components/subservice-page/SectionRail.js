// Sticky in-page section menu under the site header. Server component; the
// active state is set by SubserviceFx as the page scrolls.
//
// `links` is already filtered by the page to sections that render and have
// a rail label in ACF, so an empty section never gets a dead anchor.

export default function SectionRail({ location, links }) {
  if (!links.length) return null;
  return (
    <nav className="rail" aria-label="On this page">
      <div className="wrap railin">
        {location ? <span className="loc">{location}</span> : null}
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
