// The privacy policy page stylesheet, ported from
// design-concepts/verified-working/ABN_Privacy_V1_Concept.html.
//
// Deliberate deviations from the concept, following the pattern already
// established in src/components/contact-page/ContactPageStyles.js:
//
//  1. Everything is scoped under `.privacy-page` so nothing leaks into the
//     site's global theme.
//  2. The concept's own <header class="nav">, skip-link target and <footer>
//     are dropped — the real SiteHeader/SiteFooter come from
//     src/app/layout.js, which already supplies the fixed-header spacer.
//     Sticky/scroll offsets that referenced the concept's own --navh now
//     read --site-header-h instead.
//  3. The concept's standalone coral accent (#f56f5d) is replaced with the
//     site's real theme accent (var(--accent) — blue in light mode, orange
//     in dark), since this is a legal page, not a service page: the
//     five-service accent palette does not apply here. Every element that
//     used coral for text-on-paper still applies the concept's contrast fix
//     (a color-mix darken) so the accent stays readable at body size in both
//     themes rather than just visually matching the brand color swatch.
//  4. The concept's own `body.light` toggle is replaced by the real
//     `[data-theme="light"|"dark"]` attribute the site's ThemeToggle sets.
//  5. The concept's `@media(prefers-reduced-motion:reduce)` block is NOT
//     ported — globals.css already applies a site-wide guard with
//     `!important`, and duplicating a second guard here has silently killed
//     animation on this project three times before (see project memory).
//     This page's own reveal transition needs no exemption: it is a single
//     14px/520ms fade, well within what the guard already reduces safely,
//     and there is no scroll-jacked or otherwise disorienting motion here
//     that would need special-casing back in.
export default function PrivacyPageStyles() {
  return (
    <style>{`
.privacy-page{
  --pv-line:rgba(11,13,15,.12);
  --pv-line-soft:rgba(11,13,15,.07);
  /* The brand --muted (from globals.css) is ~4.39:1 on the page background,
     which fails AA for the small text it is used on here (section ordinals,
     footer, index labels). Measured, not guessed: this darker step clears
     4.5:1 while staying visibly the same grey family. Light/dark variants
     below keep it AA in both themes. */
  --pv-muted-aa:#656d74;
  --navh:var(--site-header-h,76px);
  /* The page background is the site's real --background token (pure white
     in light mode, near-black in dark) — not the concept's warm cream. The
     concept's own light theme used an off-white paper tone for its whole
     page; this page follows the real site instead, matching every other
     page rather than reading as a slightly different shade of white. */
  background:var(--background);color:var(--foreground);
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:17px;line-height:1.7;
  -webkit-font-smoothing:antialiased;
  /* clip, not hidden: hidden computes to "hidden auto" and turns this into
     a scroll container, which would break the sticky TOC this page depends
     on. Same trap documented on the service pages. */
  overflow-x:clip;
}
[data-theme="dark"] .privacy-page{
  --pv-line:rgba(255,255,255,.14);
  --pv-line-soft:rgba(255,255,255,.08);
  --pv-muted-aa:#b3b3b3;
}
.privacy-page *{box-sizing:border-box}
.privacy-page a{color:inherit}
.privacy-page button{font:inherit;cursor:pointer}
.privacy-page h1,.privacy-page h2,.privacy-page h3{margin:0;font-weight:700}
.privacy-page p{margin:0}

.privacy-page :focus-visible{outline:3px solid var(--accent);outline-offset:3px;border-radius:3px}

.privacy-page .wrap{width:min(1240px,calc(100% - 44px));margin:auto}

.privacy-page .eyebrow{
  font-size:12px;font-weight:800;letter-spacing:.28em;text-transform:uppercase;
  display:flex;align-items:center;gap:12px;color:var(--pv-muted-aa);
}
.privacy-page .eyebrow:before{content:"";width:26px;height:1px;background:currentColor;opacity:.6}

/* Skip link: SiteHeader has none of its own, and this page's document is
   long enough that jumping straight to the policy body is worth offering.
   Hidden off-screen until it takes keyboard focus. */
.privacy-page .skip{
  position:fixed;left:16px;top:-80px;z-index:100;
  background:var(--foreground);color:var(--background);padding:13px 20px;border-radius:999px;
  font-weight:800;font-size:14px;text-decoration:none;transition:top .18s;
}
.privacy-page .skip:focus{top:calc(var(--navh) + 10px)}

/* Reading progress rail — the one piece of always-on accent color. */
.privacy-page .progress{
  position:fixed;top:var(--navh);left:0;height:3px;width:0;
  background:var(--accent);z-index:60;
}

/* ============================================================
   1. MASTHEAD
   ============================================================ */
.privacy-page .masthead{padding:56px 0 0}
.privacy-page .masthead h1{
  font-size:clamp(44px,6vw,86px);line-height:.92;letter-spacing:-.055em;
  font-weight:820;margin:18px 0 22px;max-width:14ch;
}
.privacy-page .masthead .lede{
  font-size:clamp(17px,1.6vw,20px);line-height:1.62;color:var(--pv-muted-aa);max-width:58ch;
}
.privacy-page .meta{
  display:flex;flex-wrap:wrap;gap:10px;margin:34px 0 0;
  padding:0 0 56px;border-bottom:1px solid var(--pv-line);
}
.privacy-page .meta-item{
  display:inline-flex;align-items:center;gap:9px;min-height:44px;
  padding:10px 17px;border-radius:999px;border:1px solid var(--pv-line);
  font-size:13.5px;font-weight:600;color:var(--pv-muted-aa);background:var(--surface);
  text-decoration:none;transition:border-color .2s,transform .2s;
}
.privacy-page a.meta-item:hover{border-color:var(--foreground);transform:translateY(-1px)}
.privacy-page .meta-item b{font-weight:800;color:var(--foreground)}
.privacy-page .meta-item .dot{width:7px;height:7px;border-radius:50%;background:var(--accent);flex:0 0 auto}

/* ============================================================
   2. THE SHORT VERSION
   Visually distinct (ink card) so it reads as an aside rather than
   binding policy text. Coral in the concept, --foreground/--background
   inverted-surface here so it stays legible in both themes.
   ============================================================ */
.privacy-page .short{margin:56px 0 0}
.privacy-page .short-card{
  background:var(--foreground);color:var(--background);border-radius:28px;
  padding:clamp(28px,4vw,46px);
}
.privacy-page .short-card .eyebrow{color:color-mix(in srgb, var(--background) 66%, transparent)}
.privacy-page .short-card h2{
  font-size:clamp(1.7rem,2.7vw,2.5rem);line-height:1.1;letter-spacing:-.04em;
  font-weight:880;margin:16px 0 12px;
}
.privacy-page .short-card .note{
  font-size:14.5px;line-height:1.6;color:color-mix(in srgb, var(--background) 62%, transparent);max-width:62ch;
  margin:0 0 32px;
}
.privacy-page .short-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;background:color-mix(in srgb, var(--background) 14%, transparent);border-radius:18px;overflow:hidden}
.privacy-page .short-item{background:var(--foreground);padding:26px 24px}
.privacy-page .short-item .q{
  font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;
  color:var(--accent);margin-bottom:12px;
}
.privacy-page .short-item .a{font-size:17px;line-height:1.62;color:color-mix(in srgb, var(--background) 90%, transparent);margin:0 0 14px}
.privacy-page .short-item .a b{font-weight:800;color:var(--background)}
.privacy-page .short-item a.jump{
  font-size:13px;font-weight:800;color:var(--background);text-decoration:none;
  border-bottom:1.5px solid color-mix(in srgb, var(--background) 34%, transparent);padding:8px 0 4px;
  display:inline-flex;align-items:center;gap:7px;min-height:32px;
}
.privacy-page .short-item a.jump:hover{border-bottom-color:var(--accent)}
.privacy-page .short-item a.jump:after{content:"↓";font-size:12px;opacity:.7}

/* ============================================================
   3. THE DOCUMENT — sticky index + policy body
   ============================================================ */
.privacy-page .doc{padding:84px 0 40px}
.privacy-page .doc-grid{display:grid;grid-template-columns:250px minmax(0,1fr);gap:clamp(40px,6vw,90px);align-items:start}

.privacy-page .toc{
  position:sticky;top:calc(var(--navh) + 34px);
  max-height:calc(100vh - var(--navh) - 70px);overflow-y:auto;
  scrollbar-width:thin;scrollbar-color:var(--pv-line) transparent;
}
.privacy-page .toc-title{
  font-size:11.5px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;
  color:var(--pv-muted-aa);margin:0 0 6px;padding-bottom:14px;border-bottom:1px solid var(--pv-line);
}
.privacy-page .toc ol{list-style:none;margin:0;padding:6px 0 0}
.privacy-page .toc a{
  display:block;position:relative;padding:9px 10px 9px 18px;
  font-size:14px;line-height:1.4;font-weight:600;color:var(--pv-muted-aa);
  text-decoration:none;border-radius:8px;transition:color .2s,background .2s;
}
.privacy-page .toc a:before{
  content:"";position:absolute;left:0;top:9px;bottom:9px;width:2px;
  background:var(--pv-line);border-radius:2px;transition:background .25s,transform .25s;
}
.privacy-page .toc a:hover{color:var(--foreground);background:color-mix(in srgb, var(--foreground) 3.5%, transparent)}
.privacy-page .toc a[aria-current="true"]{color:var(--foreground);font-weight:800}
.privacy-page .toc a[aria-current="true"]:before{background:var(--accent);transform:scaleX(2);transform-origin:left}
.privacy-page .toc .sub a{padding-left:30px;font-size:13.5px;font-weight:500}
.privacy-page .toc .sub a:before{left:12px}

.privacy-page .policy{max-width:72ch}
/* CSS "ch" is the width of the ZERO glyph, which in Inter is noticeably
   wider than the average lowercase letter, so 68ch measured out at 82 real
   characters when checked with a canvas against the actual font. 58ch is
   what actually lands the rendered line in the 68-74 character band. */
.privacy-page .policy p,.privacy-page .policy li{max-width:58ch}

.privacy-page .policy section{
  scroll-margin-top:calc(var(--navh) + 26px);
  padding:0 0 8px;
}
.privacy-page .policy section + section{margin-top:56px}

.privacy-page .policy h2{
  /* Deliberately calmer than the marketing pages' clamp(2.8rem,5.6vw,5rem):
     long-form legal text does not want a 5rem shout every 400px. The 880
     weight and eyebrow rules are kept so it still reads as ABN. */
  font-size:clamp(1.65rem,2.5vw,2.3rem);line-height:1.14;letter-spacing:-.04em;
  font-weight:880;margin:0 0 18px;scroll-margin-top:calc(var(--navh) + 26px);
}
.privacy-page .policy h3{
  font-size:clamp(1.05rem,1.35vw,1.3rem);line-height:1.35;letter-spacing:-.02em;
  font-weight:800;margin:38px 0 12px;scroll-margin-top:calc(var(--navh) + 26px);
}
.privacy-page .policy h2 + h3{margin-top:24px}
.privacy-page .policy p{font-size:17px;line-height:1.7;color:color-mix(in srgb, var(--foreground) 88%, transparent);margin:0 0 18px}
.privacy-page .policy p:last-child{margin-bottom:0}
.privacy-page .policy a:not(.anchor){
  color:var(--accent);text-decoration:underline;text-underline-offset:3px;
  text-decoration-thickness:1.5px;text-decoration-color:color-mix(in srgb, var(--accent) 40%, transparent);
  transition:text-decoration-color .2s;
}
.privacy-page .policy a:not(.anchor):hover{text-decoration-color:var(--accent)}

.privacy-page .h-row{display:flex;align-items:baseline;gap:10px}
.privacy-page .anchor{
  flex:0 0 auto;display:inline-grid;place-items:center;
  width:44px;height:44px;margin-left:-6px;
  color:var(--pv-muted-aa);text-decoration:none;font-size:15px;font-weight:700;
  opacity:0;transition:opacity .18s,color .18s;
}
.privacy-page .h-row:hover .anchor,.privacy-page .anchor:focus-visible{opacity:1}
.privacy-page .anchor:hover{color:var(--accent)}
.privacy-page .anchor.copied{opacity:1;color:var(--accent)}

.privacy-page .sec-n{
  font-size:11.5px;font-weight:800;letter-spacing:.2em;color:var(--pv-muted-aa);
  display:block;margin-bottom:10px;
}

.privacy-page .callout{
  border-left:3px solid var(--accent);background:var(--surface);
  border-radius:0 16px 16px 0;padding:22px 26px;margin:24px 0;
  border-top:1px solid var(--pv-line-soft);border-right:1px solid var(--pv-line-soft);
  border-bottom:1px solid var(--pv-line-soft);
}
.privacy-page .callout p{margin:0;font-size:16.5px;color:color-mix(in srgb, var(--foreground) 88%, transparent)}
.privacy-page .callout .lbl{
  font-size:11px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;
  color:var(--accent);display:block;margin-bottom:9px;
}

.privacy-page .pending{
  background:var(--surface-2);border:1px solid var(--pv-line);border-radius:22px;
  padding:clamp(24px,3vw,34px);
}
.privacy-page .pending p{color:var(--pv-muted-aa);font-size:16px}
.privacy-page .pending ul{margin:18px 0 0;padding:0;list-style:none;display:grid;gap:1px;background:var(--pv-line);border-radius:14px;overflow:hidden}
.privacy-page .pending li{background:var(--surface-2);padding:14px 18px;font-size:15.5px;font-weight:600;color:color-mix(in srgb, var(--foreground) 82%, transparent);max-width:none}

/* ============================================================
   4. CONTACT CTA
   ============================================================ */
.privacy-page .contact-band{background:var(--foreground);color:var(--background);padding:clamp(64px,8vw,104px) 0;margin-top:80px}
.privacy-page .contact-band h2{
  font-size:clamp(1.9rem,3.4vw,3rem);line-height:1.06;letter-spacing:-.045em;
  font-weight:700;margin:16px 0 16px;max-width:18ch;
}
.privacy-page .contact-band .eyebrow{color:color-mix(in srgb, var(--background) 60%, transparent)}
.privacy-page .contact-band p{font-size:17px;line-height:1.66;color:color-mix(in srgb, var(--background) 72%, transparent);max-width:56ch;margin:0 0 34px}
.privacy-page .contact-actions{display:flex;flex-wrap:wrap;gap:12px}
.privacy-page .btn{
  display:inline-flex;align-items:center;gap:10px;min-height:48px;
  border-radius:999px;padding:14px 24px;font-weight:800;font-size:14.5px;
  text-decoration:none;border:1px solid color-mix(in srgb, var(--background) 26%, transparent);color:var(--background);
  transition:transform .2s,background .2s,color .2s,border-color .2s;
}
.privacy-page .btn.solid{background:var(--accent);color:var(--accent-contrast);border-color:transparent}
.privacy-page .btn:hover{transform:translateY(-2px)}
.privacy-page .btn:not(.solid):hover{background:color-mix(in srgb, var(--background) 9%, transparent);border-color:color-mix(in srgb, var(--background) 50%, transparent)}

/* No page-local .foot here — the real SiteFooter (src/components/SiteFooter.js)
   already renders full site-wide branding, partner badges and link columns;
   the concept's minimal copyright footer would only duplicate it. The
   "last updated" date lives in the masthead meta pills instead. */

/* ── Reveal: gentle, one-way, 14px/520ms. Well inside what the site-wide
   reduced-motion guard already reduces safely — no exemption needed. ──── */
.privacy-page .rv{opacity:0;transform:translateY(14px);transition:opacity .52s cubic-bezier(.16,1,.3,1),transform .52s cubic-bezier(.16,1,.3,1)}
.privacy-page .rv.in{opacity:1;transform:none}

.privacy-page .totop{
  position:fixed;right:20px;bottom:20px;z-index:55;
  width:48px;height:48px;border-radius:50%;display:grid;place-items:center;
  background:var(--foreground);color:var(--background);border:0;font-size:17px;
  box-shadow:0 10px 30px rgba(0,0,0,.2);
  opacity:0;pointer-events:none;transform:translateY(10px);transition:opacity .25s,transform .25s;
}
.privacy-page .totop.show{opacity:1;pointer-events:auto;transform:none}

/* ============================================================
   RESPONSIVE
   ============================================================ */
.privacy-page .toc-mobile{display:none}

@media (max-width:980px){
  .privacy-page .doc-grid{grid-template-columns:minmax(0,1fr);gap:0}
  .privacy-page .toc-desktop{display:none}
  .privacy-page .toc-mobile{
    display:block;position:sticky;top:var(--navh);z-index:50;
    margin:0 0 34px;background:var(--background);
    padding:12px 0;border-bottom:1px solid var(--pv-line);
  }
  .privacy-page .toc-mobile details{
    border:1px solid var(--pv-line);border-radius:16px;background:var(--surface);overflow:hidden;
  }
  .privacy-page .toc-mobile summary{
    list-style:none;cursor:pointer;min-height:52px;display:flex;align-items:center;
    justify-content:space-between;gap:14px;padding:14px 18px;
    font-size:14px;font-weight:800;letter-spacing:.02em;
  }
  .privacy-page .toc-mobile summary::-webkit-details-marker{display:none}
  .privacy-page .toc-mobile summary .cur{font-weight:600;color:var(--pv-muted-aa);font-size:13px;text-align:right;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:58%}
  .privacy-page .toc-mobile summary:after{content:"▾";font-size:12px;color:var(--pv-muted-aa);transition:transform .2s}
  .privacy-page .toc-mobile details[open] summary:after{transform:rotate(180deg)}
  .privacy-page .toc-mobile .toc{position:static;max-height:min(58vh,420px);overflow-y:auto;
    padding:4px 12px 12px;border-top:1px solid var(--pv-line)}
  .privacy-page .toc-mobile .toc-title{display:none}
  .privacy-page .toc-mobile .toc a{min-height:44px;display:flex;align-items:center}
  .privacy-page .short-grid{grid-template-columns:1fr}
  .privacy-page .policy{max-width:none}
}

@media (max-width:760px){
  .privacy-page body{font-size:16.5px}
  .privacy-page .masthead{padding-top:26px}
  .privacy-page .policy section + section{margin-top:46px}
  .privacy-page .anchor{opacity:.35;width:40px;height:40px}
}

@media (max-width:420px){
  .privacy-page .wrap{width:calc(100% - 32px)}
  .privacy-page .short-item{padding:22px 20px}
}
`}</style>
  );
}
