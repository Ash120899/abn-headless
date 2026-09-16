// The document itself: sticky desktop TOC + collapsible mobile TOC (both
// generated from the same `TOC` array so they cannot drift out of sync with
// each other or with the section ids below), and the policy <article> body,
// rendered from `PRIVACY_CONTENT.sections`.
//
// All scroll-driven behaviour (progress rail, scrollspy, reveals, clause
// permalinks, back-to-top) lives in the client component PrivacyScrollFx,
// mounted once from the page and reading this DOM by id — mirrors how
// ContactForm.js is the one stateful client piece on the contact page while
// its siblings stay server components.
function Body({ blocks }) {
  return blocks.map((block, i) => {
    if (block.type === "callout") {
      return (
        <div className="callout" key={i}>
          <span className="lbl">{block.label}</span>
          {block.html ? (
            <p dangerouslySetInnerHTML={{ __html: block.html }} />
          ) : (
            <p>{block.text}</p>
          )}
        </div>
      );
    }
    if (block.type === "pending") {
      return (
        <div className="pending" key={i}>
          <p dangerouslySetInnerHTML={{ __html: block.html }} />
          <ul>
            {block.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>
      );
    }
    // Plain paragraph — html when the source has an inline link, text
    // otherwise (kept as two branches so the common case never needs
    // dangerouslySetInnerHTML).
    return block.html ? (
      <p key={i} dangerouslySetInnerHTML={{ __html: block.html }} />
    ) : (
      <p key={i}>{block.text}</p>
    );
  });
}

// The scrollspy in PrivacyScrollFx selects links by their container
// (#tocDesktop a / #tocMobile a) and matches on href, so no per-link id is
// needed here — both renders of this list can share one component.
function TocList({ toc }) {
  return (
    <ol>
      {toc.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`}>{item.label}</a>
          {item.sub && (
            <ol className="sub">
              {item.sub.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.label}</a>
                </li>
              ))}
            </ol>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function PrivacyDocument({ toc, sections }) {
  return (
    <div className="doc" id="policy">
      <div className="wrap">
        <div className="doc-grid">
          {/* Desktop sticky index */}
          <nav className="toc toc-desktop" id="tocDesktop" aria-label="Sections of this policy">
            <p className="toc-title">On this page</p>
            <TocList toc={toc} />
          </nav>

          {/* Mobile collapsed index */}
          <div className="toc-mobile">
            <details id="tocDetails">
              <summary>
                <span>On this page</span>
                <span className="cur" id="tocCurrent">
                  {toc[0]?.label}
                </span>
              </summary>
              <nav className="toc" id="tocMobile" aria-label="Sections of this policy (mobile)">
                <TocList toc={toc} />
              </nav>
            </details>
          </div>

          {/* The policy itself. Legal wording is verbatim from the live
              page; only structure and presentation are new. */}
          <article className="policy" id="policyBody">
            {sections.map((section) => (
              <section id={section.id} className="rv" key={section.id}>
                <span className="sec-n">{section.number}</span>
                <div className="h-row">
                  <h2>{section.heading}</h2>
                  <a className="anchor" href={`#${section.id}`} aria-label={`Copy link to: ${section.heading}`}>
                    #
                  </a>
                </div>

                {section.body?.length > 0 && <Body blocks={section.body} />}

                {section.children?.map((child) => (
                  <div id={child.id} key={child.id} style={{ scrollMarginTop: "calc(var(--navh) + 26px)" }}>
                    <div className="h-row">
                      <h3>{child.heading}</h3>
                      <a className="anchor" href={`#${child.id}`} aria-label={`Copy link to: ${child.heading}`}>
                        #
                      </a>
                    </div>
                    <Body blocks={child.body} />
                  </div>
                ))}
              </section>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}
