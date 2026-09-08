// The contact page stylesheet, ported near-verbatim from
// C:\Users\ashuu\Downloads\ABN_Contact_2026_V3.html.
//
// Deliberate deviations from the source file:
//  1. Everything is scoped under `.contact-page` so the concept's palette
//     cannot leak into the site's global theme.
//  2. The concept's own .header/.footer and its dark/light toggle are
//     dropped — the real SiteHeader and SiteFooter come from
//     src/app/layout.js. Sticky offsets that were hard-coded to its 68px
//     bar now track --site-header-h instead.
//  3. Keyframes are `ct-` prefixed: globals.css already defines `marquee`,
//     and the service page defines `svc-*`.
//  4. The concept's body.light rules become :root-level light-mode rules
//     driven by the site's own theme class, so this page follows the site
//     switch rather than its own localStorage key.
//
// The concept's @media(prefers-reduced-motion:reduce) block is intentionally
// not ported — see memory/feedback_no-reduced-motion-guards: on this project
// those guards have silently disabled animations three times over. globals.css
// already applies a site-wide guard, so this sheet re-asserts its own
// durations to stay visible on machines with the OS setting on.

export default function ContactPageStyles() {
  return (
    <style>{`
.contact-page{
  --ct-bg:#070808;--ct-ink:#f7f8f5;--ct-muted:#a6abae;--ct-cyan:#08b9d8;
  --ct-dm:#ff625e;--ct-design:#ffd541;--ct-dev:#3aa9ff;--ct-video:#57dc8b;--ct-security:#afb3ba;
  --ct-panel:#0f1112;--ct-line:rgba(255,255,255,.105);--ct-soft:#f5f4ef;
  --ct-hero-bg:#070808;--ct-hero-muted:#b8bdbe;
  --ct-card-dark:#0e1011;
  --navh:var(--site-header-h,76px);
  background:var(--ct-bg);color:var(--ct-ink);
  /* clip, not hidden: hidden would make this a scroll container and break
     the sticky hero. Same trap hit on the service pages. */
  overflow-x:clip;
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}
.contact-page *{box-sizing:border-box}
.contact-page a{color:inherit;text-decoration:none}
.contact-page button,.contact-page input,.contact-page textarea{font:inherit}
.contact-page button{cursor:pointer}
/* The concept never declares font-weight on its headings, so they render at
   the browser default of bold (700). This app loads Tailwind, whose Preflight
   resets headings to font-weight:inherit — which resolves to the body's 400
   and made every heading here noticeably thinner than the concept. Restoring
   700 explicitly is what keeps the two visually identical. */
.contact-page h1,.contact-page h2,.contact-page h3{margin:0;font-weight:700}
.contact-page img{display:block;max-width:100%}

.contact-page .wrap{width:min(1180px,calc(100% - 36px));margin:auto}

/* The in-page CTAs jump to these sections, and the site header is fixed, so
   without a scroll margin the landing point sits underneath it and the
   section heading is hidden. */
.contact-page #contact,.contact-page #channels{scroll-margin-top:calc(var(--navh) + 12px)}

/* ---------- HERO ---------- */
.contact-page .hero-scroll{height:170svh;position:relative}
/* The concept's hero was 100svh under its own 68px bar, which it subtracted
   inside .hero-grid. Here the hero sticks BELOW the site header, so the
   header height has to come out of the hero itself — otherwise it overhangs
   the viewport by exactly --navh and the orbit stage is cut off. */
.contact-page .hero{height:calc(100svh - var(--navh));min-height:0;position:sticky;top:var(--navh);overflow:hidden;background:
radial-gradient(circle at 19% 25%,rgba(8,185,216,.10),transparent 26%),
radial-gradient(circle at 82% 64%,rgba(255,255,255,.035),transparent 28%),#070808}
/* Fills the hero, which has already had the header height removed. */
.contact-page .hero-grid{height:100%;min-height:0;display:grid;grid-template-columns:.92fr 1.08fr;align-items:center;gap:36px}
.contact-page .eyebrow{font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:850;color:#9ca2a5;display:flex;gap:10px;align-items:center}
.contact-page .eyebrow:before{content:"";width:24px;height:1px;background:var(--ct-cyan)}
.contact-page .hero h1{font-size:clamp(48px,5.6vw,82px);line-height:.92;letter-spacing:-.057em;margin:17px 0;max-width:720px}
.contact-page .hero-copy p{font-size:clamp(16px,1.45vw,19px);line-height:1.5;color:var(--ct-hero-muted);max-width:610px;margin:0}
.contact-page .ctas{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}
/* nowrap keeps the trailing arrow on the same line as the label: they are
   separate text nodes, so a narrow button would otherwise drop the arrow
   underneath. flex-shrink:0 stops the button being squeezed below its
   content width when it sits in a flex row (the final CTA band). */
.contact-page .btn{border-radius:999px;padding:13px 17px;border:1px solid var(--ct-line);font-weight:800;font-size:13px;transition:.25s;display:inline-flex;align-items:center;gap:8px;white-space:nowrap;flex-shrink:0}
.contact-page .btn.primary{background:#fff;color:#060707}
.contact-page .btn:hover{transform:translateY(-2px)}

.contact-page .orbit-stage{height:min(68vh,610px);min-height:450px;position:relative;isolation:isolate}
.contact-page .orbit-glow{position:absolute;left:50%;top:49%;width:310px;height:310px;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(8,185,216,.13),transparent 68%);filter:blur(8px);pointer-events:none}
.contact-page .center-logo{position:absolute;left:50%;top:49%;width:min(330px,48%);transform:translate(-50%,-50%);z-index:4;filter:drop-shadow(0 18px 42px rgba(0,0,0,.35))}
.contact-page .service-orb{position:absolute;left:50%;top:50%;z-index:8;transform:translate(-50%,-50%);will-change:transform,left,top,opacity}
.contact-page .service-orb span{display:block;padding:9px 14px;border:1px solid color-mix(in srgb,var(--c) 72%,white 0%);border-radius:999px;background:rgba(7,8,8,.82);font-size:10px;font-weight:900;letter-spacing:.09em;white-space:nowrap;color:#e8e9e5;transition:.25s;box-shadow:0 0 0 rgba(0,0,0,0)}
.contact-page .service-orb span:hover{color:#fff;border-color:var(--c);box-shadow:0 0 12px color-mix(in srgb,var(--c) 58%,transparent),0 0 34px color-mix(in srgb,var(--c) 26%,transparent);background:color-mix(in srgb,var(--c) 7%,#080909)}
.contact-page .scrollhint{position:absolute;right:2px;bottom:12px;color:#7f8588;font-size:10px;letter-spacing:.16em;text-transform:uppercase;writing-mode:vertical-rl;display:flex;align-items:center;gap:8px}
.contact-page .scrollhint:after{content:"";display:block;height:42px;width:1px;background:linear-gradient(var(--ct-cyan),transparent)}
.contact-page .devil{position:absolute;right:-6px;bottom:-18px;width:145px;z-index:10;filter:drop-shadow(0 18px 35px rgba(0,0,0,.25));transform:rotate(-2deg)}
.contact-page .devil-note{position:absolute;right:110px;bottom:40px;padding:8px 11px;border:1px solid var(--ct-line);border-radius:999px;background:rgba(14,16,17,.9);font-size:10px;color:#aeb3b4;z-index:9}
.contact-page #heroParticles{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.5}
.contact-page .hero .wrap{position:relative;z-index:2}

/* ---------- MARQUEE STRIP ---------- */
.contact-page .strip{height:64px;border-block:1px solid rgba(8,185,216,.32);background:#050606;overflow:hidden;display:flex;align-items:center}
.contact-page .track{display:flex;gap:32px;align-items:center;white-space:nowrap;min-width:max-content;animation:ct-marquee 26s linear infinite;font-size:12px;font-weight:900;letter-spacing:.08em;color:#ecf9fb}
.contact-page .track b{color:var(--ct-cyan);font-size:15px}
@keyframes ct-marquee{to{transform:translateX(-50%)}}

/* ---------- FORM ---------- */
.contact-page .contact{background:var(--ct-soft);color:#0b0c0c;padding:92px 0}
.contact-page .kicker{font-size:11px;letter-spacing:.17em;text-transform:uppercase;font-weight:900;color:#777c7c}
.contact-page .contact h2,.contact-page .channels h2{font-size:clamp(40px,5vw,68px);line-height:.98;letter-spacing:-.055em;margin:12px 0 13px}
.contact-page .contact-lead{font-size:17px;line-height:1.55;color:#656969;max-width:760px}
/* No align-items here: the grid default (stretch) makes the "Why ABN
   Junction" panel match the form card's height, so the two columns end on
   the same line. Setting it to start leaves the shorter panel floating. */
.contact-page .form-shell{display:grid;grid-template-columns:1.12fr .88fr;gap:14px;margin-top:40px}
.contact-page .card{border:1px solid #dfded8;border-radius:26px;background:#fff;padding:26px}
.contact-page .card h3{font-size:25px;letter-spacing:-.035em;margin:0 0 7px}
.contact-page .card .sub{color:#747878;font-size:14px;margin:0 0 20px}
.contact-page .service-select{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px}
.contact-page .service-btn{border:1px solid #dad9d3;background:#faf9f5;border-radius:999px;padding:10px 12px;font-size:12px;font-weight:800;color:#494d4d;transition:.2s}
.contact-page .service-btn.active{border-color:var(--c);box-shadow:inset 0 0 0 1px var(--c);color:#111;background:color-mix(in srgb,var(--c) 7%,white)}
.contact-page .fields{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.contact-page .field{display:flex;flex-direction:column;gap:6px}
.contact-page .full{grid-column:1/-1}
.contact-page label{font-size:10px;text-transform:uppercase;letter-spacing:.1em;font-weight:850;color:#777}
.contact-page input,.contact-page textarea{width:100%;border:1px solid #dcdad3;border-radius:13px;background:#faf9f6;padding:13px 14px;color:#111;outline:none}
.contact-page input:focus,.contact-page textarea:focus{border-color:#1a1b1b}
.contact-page textarea{min-height:125px;resize:vertical}
.contact-page .form-bottom{display:flex;justify-content:space-between;align-items:center;gap:15px;margin-top:15px}
.contact-page .micro{font-size:11px;color:#8a8c88;max-width:350px}
/* nowrap for the same reason as .btn: "Send Enquiry →" must not drop its
   arrow onto a second line when the form column is narrow. */
.contact-page .submit{border:0;border-radius:999px;background:#101111;color:white;padding:13px 18px;font-weight:900;transition:.2s;white-space:nowrap}
.contact-page .submit:disabled{opacity:.55;cursor:not-allowed}

/* Validation + submission feedback. Not in the concept (its form was inert),
   added because a real form has to tell people what went wrong. */
.contact-page .field-error{font-size:11px;color:#c2352c;font-weight:700;letter-spacing:0;text-transform:none}
.contact-page input[aria-invalid="true"],.contact-page textarea[aria-invalid="true"]{border-color:#c2352c;background:#fffafa}
.contact-page .form-status{margin-top:14px;padding:13px 15px;border-radius:14px;font-size:13.5px;line-height:1.5;font-weight:600}
.contact-page .form-status.ok{background:#eaf7ef;border:1px solid #b7e0c6;color:#1d6435}
.contact-page .form-status.err{background:#fdeeee;border:1px solid #f0c4c1;color:#9d2b23}

.contact-page .why{background:#0d0f10;color:#fff;border-color:rgba(255,255,255,.09);position:relative;overflow:hidden}
.contact-page .why:after{content:"";position:absolute;width:280px;height:280px;right:-120px;bottom:-150px;border-radius:50%;background:rgba(8,185,216,.15);filter:blur(35px)}
.contact-page .why ul{list-style:none;padding:0;margin:23px 0 0;display:grid;gap:12px;position:relative;z-index:2}
.contact-page .why li{padding:16px 0;border-top:1px solid rgba(255,255,255,.09)}
.contact-page .why b{font-size:18px;letter-spacing:-.02em}
.contact-page .why small{display:block;color:#9da2a4;margin-top:4px;line-height:1.45}
.contact-page .why .kicker{color:#7edff0}
.contact-page .why .sub{color:#9da2a4}
.contact-page .ai-line{color:#68e6ff}

/* ---------- CHANNELS / TABS ---------- */
.contact-page .channels{padding:100px 0 110px;background:#080909}
.contact-page .channels-inner{position:relative}
.contact-page .channels-head{max-width:760px}
.contact-page .channels-head p{color:#a8adae;line-height:1.55}
.contact-page .channels .kicker{color:#7edff0}
.contact-page .channel-character{position:absolute;right:0;top:-36px;width:148px;z-index:3;filter:drop-shadow(0 18px 32px rgba(0,0,0,.22));transform:rotate(3deg);pointer-events:none}
.contact-page .channel-bubble{position:absolute;right:118px;top:8px;z-index:4;padding:8px 11px;border-radius:999px;border:1px solid var(--ct-line);background:rgba(15,17,18,.88);color:#aeb4b5;font-size:10px;letter-spacing:.05em;pointer-events:none}
.contact-page .tabs{display:flex;gap:8px;flex-wrap:wrap;margin-top:28px}
.contact-page .tab{border:1px solid var(--ct-line);background:#0f1112;color:#bbb;border-radius:999px;padding:10px 14px;font-weight:850;font-size:12px}
.contact-page .tab.active{background:#fff;color:#080909;border-color:#fff}
.contact-page .tab-progress{height:2px;background:rgba(255,255,255,.08);margin-top:10px;border-radius:999px;overflow:hidden}
.contact-page .tab-progress span{display:block;height:100%;width:0;background:var(--ct-cyan)}
.contact-page .tab-progress span.run{animation:ct-tabTimer 5s linear forwards}
@keyframes ct-tabTimer{from{width:0}to{width:100%}}
.contact-page .tabpanels{margin-top:16px}
.contact-page .tabpane{display:none;border:1px solid var(--ct-line);border-radius:28px;background:#0e1011;min-height:380px;overflow:hidden}
.contact-page .tabpane.active{display:grid}
.contact-page .calendar{grid-template-columns:.78fr 1.22fr}
.contact-page .cal-copy{padding:34px;border-right:1px solid var(--ct-line)}
.contact-page .cal-copy h3,.contact-page .simple-pane h3{font-size:32px;letter-spacing:-.045em;margin:0 0 10px}
.contact-page .cal-copy p,.contact-page .simple-pane p{color:#a9adae;line-height:1.55}
.contact-page .cal-embed{padding:24px;background:#f3f2ed;color:#111}
.contact-page .calendar-card{height:100%;border:1px dashed #b8b7b1;border-radius:20px;display:grid;place-items:center;text-align:center;padding:28px}
.contact-page .calendar-card b{font-size:20px}
.contact-page .calendar-card small{display:block;color:#777;margin-top:7px}
.contact-page .simple-pane{padding:36px;align-items:center;grid-template-columns:1fr auto;gap:28px}
.contact-page .simple-pane .action{padding:14px 17px;border-radius:999px;background:#fff;color:#111;font-weight:900;white-space:nowrap}

/* ---------- FINAL CTA ---------- */
.contact-page .final{padding:95px 0;background:#050606;border-top:1px solid rgba(8,185,216,.24)}
.contact-page .finalbox{display:flex;align-items:end;justify-content:space-between;gap:24px;padding:36px;border:1px solid var(--ct-line);border-radius:28px;background:linear-gradient(120deg,rgba(8,185,216,.07),rgba(255,255,255,.025))}
.contact-page .final h2{font-size:clamp(36px,4vw,58px);letter-spacing:-.05em;line-height:1;margin:10px 0}
.contact-page .final p{color:#a9adae;max-width:700px}
.contact-page .final .kicker{color:#7edff0}

/* The site-wide reduced-motion guard in globals.css zeroes every animation
   with !important. This page's marquee and tab timer are content, not
   decoration, so their durations are re-asserted here. */
@media(prefers-reduced-motion:reduce){
  .contact-page .track{animation-duration:26s !important}
  .contact-page .tab-progress span.run{animation-duration:5s !important}
}

@media(max-width:900px){
 .contact-page .hero-scroll{height:150svh}
 /* Copy on top, orbit stage below. The rows are explicit so the stage keeps
    a usable height instead of being squeezed by however long the headline
    wraps — auto rows let a 4-line h1 collapse the animation to nothing. */
 .contact-page .hero-grid{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);gap:10px;align-content:stretch;padding-block:18px}
 .contact-page .hero-copy{padding-top:0;align-self:center}
 .contact-page .hero h1{font-size:clamp(36px,7.6vw,58px);max-width:680px;margin:12px 0}
 .contact-page .hero-copy p{font-size:16px;max-width:660px}
 .contact-page .orbit-stage{height:auto;min-height:250px;margin-top:0;align-self:stretch}
 .contact-page .center-logo{width:min(225px,52%)}
 .contact-page .devil{width:105px;right:0;bottom:-8px}
 .contact-page .devil-note,.contact-page .scrollhint{display:none}
 .contact-page .form-shell,.contact-page .calendar{grid-template-columns:1fr}
 .contact-page .cal-copy{border-right:0;border-bottom:1px solid var(--ct-line)}
 .contact-page .simple-pane{grid-template-columns:1fr}
 .contact-page .channel-character,.contact-page .channel-bubble{display:none}
}
@media(max-width:600px){
 .contact-page .wrap{width:min(100% - 22px,1180px)}
 .contact-page .hero-grid{gap:8px;padding-block:14px}
 .contact-page .hero h1{font-size:clamp(32px,8.4vw,44px);line-height:.96;margin-block:10px}
 .contact-page .hero-copy p{font-size:15px;line-height:1.45}
 .contact-page .ctas{margin-top:14px;gap:8px}
 /* Two per row rather than stacked: both labels are short enough to fit
    side by side even at 320px, and stacking pushed the orbit stage off
    the fold. */
 /* The two hero CTAs share the row and may shrink to fit (overriding the
    base flex-shrink:0); nowrap still keeps each label and its arrow on one
    line, and they wrap to separate rows rather than breaking mid-label. */
 .contact-page .ctas .btn{flex:1 1 auto;min-width:max-content;justify-content:center;padding:12px 14px;font-size:12.5px}
 .contact-page .orbit-stage{min-height:180px}
 .contact-page .center-logo{width:min(188px,50%)}
 .contact-page .service-orb span{font-size:8px;padding:7px 9px}
 .contact-page .devil{width:78px;right:-2px;bottom:-4px}
 .contact-page .strip{height:54px}
 .contact-page .contact,.contact-page .channels{padding:72px 0}
 .contact-page .card{padding:20px;border-radius:21px}
 .contact-page .fields{grid-template-columns:1fr}
 .contact-page .full{grid-column:auto}
 .contact-page .form-bottom{align-items:flex-start;flex-direction:column}
 .contact-page .submit{width:100%}
 .contact-page .tabpane{min-height:320px}
 .contact-page .cal-copy,.contact-page .cal-embed,.contact-page .simple-pane{padding:22px}
 .contact-page .finalbox{align-items:flex-start;flex-direction:column;padding:25px}
}

/* Short viewports (small phones, and any phone in landscape). The hero is
   one screen tall by design, so when there is little height to divide the
   copy has to give some back or the orbit stage gets squeezed out of
   existence. Tightening type and dropping the paragraph keeps the headline,
   the buttons and the animation all on the fold. */
@media(max-height:700px) and (max-width:900px){
 .contact-page .hero h1{font-size:clamp(26px,6.6vw,36px);line-height:.98;margin-block:8px}
 .contact-page .hero-copy p{font-size:14px;line-height:1.4}
 .contact-page .ctas{margin-top:10px}
 .contact-page .eyebrow{font-size:10px}
 .contact-page .orbit-stage{min-height:150px}
}
@media(max-height:600px) and (max-width:900px){
 /* Below this the paragraph cannot earn its space: the headline and the two
    CTAs carry the message on their own. */
 .contact-page .hero-copy p{display:none}
 .contact-page .hero h1{font-size:clamp(24px,6vw,32px)}
 .contact-page .orbit-stage{min-height:130px}
}
`}</style>
  );
}
