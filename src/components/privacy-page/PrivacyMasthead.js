// H1, lede and the meta pill row (last-updated, applies-to, jump links).
// Skip-link target for the real content lives on PrivacyDocument's #policy;
// the concept's own skip-link markup is reproduced here since it needs to be
// the first focusable element in the page, ahead of even the sticky header
// (SiteHeader already provides its own skip link if any — this one targets
// the policy body specifically, which SiteHeader cannot know about).
export default function PrivacyMasthead({ content }) {
  return (
    <div className="masthead">
      <div className="wrap">
        <p className="eyebrow rv">{content.eyebrow}</p>
        <h1 className="rv">{content.heading}</h1>
        <p className="lede rv">{content.lede}</p>
        <div className="meta rv">
          <span className="meta-item">
            <span className="dot" />
            Last updated <b>{content.lastUpdated}</b>
          </span>
          <span className="meta-item">
            Applies to <b>{content.appliesTo}</b>
          </span>
          <a className="meta-item" href="#rights">
            Jump to your data rights
          </a>
          <a className="meta-item" href="https://abnjunction.com/contact-us/">
            Make a data request
          </a>
        </div>
      </div>
    </div>
  );
}
