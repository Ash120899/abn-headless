// The plain-English summary panel — highest-value block on the page. Each
// answer bolds its key terms and jumps straight to the clause it comes from.
//
// `item.bold` is a list of exact substrings to bold within `item.a`; this
// keeps privacy-content.js as plain text (so the legal wording stays easy to
// diff against the live policy) while still letting the rendered answer
// highlight its key terms, matching the concept's hand-authored <b> tags.
function renderAnswer(text, boldTerms = []) {
  if (!boldTerms.length) return text;
  // Split on any of the bold terms, keeping the delimiters, so each term
  // becomes its own segment we can wrap in <b> without touching the rest.
  const pattern = new RegExp(`(${boldTerms.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    boldTerms.includes(part) ? <b key={i}>{part}</b> : <span key={i}>{part}</span>
  );
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function PrivacyShortVersion({ content }) {
  return (
    <section className="short" aria-labelledby="short-h">
      <div className="wrap">
        <div className="short-card rv">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="short-h">{content.heading}</h2>
          <p className="note">{content.note}</p>

          <div className="short-grid">
            {content.items.map((item) => (
              <div className="short-item" key={item.q}>
                <p className="q">{item.q}</p>
                <p className="a">{renderAnswer(item.a, item.bold)}</p>
                <a className="jump" href={`#${item.jumpTo}`}>
                  Read the clause
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
