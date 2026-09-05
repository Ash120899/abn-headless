// The whole service-page stylesheet, ported near-verbatim from
// design-concepts/ABN_Digital_Marketing_V4_1_V3_Locked_Refinement.html
// (including its V3 cinematic layer and the V4.1 refinement layer at the
// bottom, which deliberately overrides parts of V3 — that ordering is
// preserved because the refinements rely on it).
//
// Written as real CSS in one scoped block rather than rebuilt out of
// Tailwind utilities: this concept's layout is intricate enough (sticky
// scroll stages, absolutely-positioned orbit systems, multi-layer
// gradients) that a faithful copy is both more accurate and far less
// error-prone than re-deriving it — the same conclusion reached on the
// blog listing after utility-composition bugs there.
//
// Three deliberate deviations from the source file:
//  1. Everything is scoped under `.svc-page` so this light coral palette
//     can't leak into the site's global dark theme.
//  2. The concept's own .nav/.footer are dropped — the real SiteHeader and
//     SiteFooter come from src/app/layout.js. Sticky offsets that were
//     hard-coded to its 78px bar now track --site-header-h instead.
//  3. Keyframes are `svc-` prefixed, because globals.css already defines a
//     `marquee` keyframe that would otherwise collide.
//
// The concept's `@media(prefers-reduced-motion:reduce)` blocks are
// intentionally not ported — see memory/feedback_no-reduced-motion-guards:
// on this project those guards have silently disabled animations three
// times over, and can't be verified on the current dev machine.

export default function ServicePageStyles({ theme }) {
  return (
    <>
      {/* The header lives in src/app/layout.js as a SIBLING of the page, so
          the accent variables set inline on .svc-page never cascade into it.
          This rule sets the header CTA's colours on <body> instead, which is
          the nearest common ancestor of both. Emitted per service rather
          than living in the static sheet below because the value changes
          with the palette. */}
      {theme ? (
        <style>{`
body:has(.svc-page){--site-cta-bg:${theme.primary};--site-cta-fg:${theme.ink}}
`}</style>
      ) : null}
      <style>{`
@property --svc-wipe{syntax:'<percentage>';initial-value:0%;inherits:false}

@keyframes svc-marquee{to{transform:translateX(-50%)}}
@keyframes svc-breathe{50%{transform:translateY(-10px) rotate(.3deg)}}
@keyframes svc-visualDrift{to{transform:translate3d(70px,34px,0)}}
@keyframes svc-kineticWipe{0%{--svc-wipe:0%;transform:translateY(.12em);filter:blur(3px)}55%{filter:blur(0)}100%{--svc-wipe:100%;transform:none}}
@keyframes svc-orbPulse{50%{transform:scale(1.35);opacity:.15}}

.svc-page{
  --coral:#f56f5d;--coral2:#ff856f;--red:#db3f32;--ink:#0b0d0f;
  --cream:#fff6ef;--paper:#fffaf6;--cyan:#52c5e8;--muted:#6f777e;
  --line:rgba(11,13,15,.14);--card:rgba(255,255,255,.88);
  --navh:var(--site-header-h,76px);
  background:var(--paper);color:var(--ink);
  /* clip, NOT hidden: the concept put overflow-x:hidden on the body, where
     it propagates to the viewport. On a regular div it instead computes to
     "overflow: hidden auto", which makes this element a scroll container —
     and every position:sticky descendant (the pinned hero, the story stage,
     the cinema stage) then sticks to *it* rather than the viewport, so none
     of them pin at all. "clip" contains the same horizontal overflow
     without establishing a scroll container. */
  overflow-x:clip;
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}
/* The service pages carry a fixed coral palette of their own and aren't
   theme-reactive, so the global light/dark switch has nothing to act on
   here. Hidden from this page only — :has() reaches the header because
   both it and .svc-page live under <body>. */
body:has(.svc-page) .btn-slide{display:none !important}

/* Typewriter accent — shares the blog/case-study listings' look: accent
   colour, blinking caret, and a reserved min-width set by the component so
   the heading never reflows mid-cycle. */
.svc-page .svc-switch-word{position:relative;display:inline-block;white-space:nowrap;text-align:left;color:var(--red)}
.svc-page .svc-switch-word::after{content:"";display:inline-block;width:2px;height:.82em;margin-left:2px;vertical-align:-.08em;background:currentColor;animation:svc-caret .9s step-end infinite}
/* Per-section colour is driven by the background behind it, since the
   default red only has contrast on the light sections:
     .journey / .character-break  → coral background, so white
     .cards-section               → near-black background, so coral accent
     .method (cream) / .insights (white) → default red
   The caret inherits via currentColor, so it follows automatically. */
.svc-page .journey .svc-switch-word,.svc-page .character-break .svc-switch-word{color:#fff}
.svc-page .cards-section .svc-switch-word{color:var(--coral)}
@keyframes svc-caret{0%,100%{opacity:1}50%{opacity:0}}

.svc-page *{box-sizing:border-box}
.svc-page a{color:inherit;text-decoration:none}
.svc-page button{font:inherit}
.svc-page img{display:block;max-width:100%}
.svc-page h1,.svc-page h2,.svc-page h3{margin:0}

.svc-progress{position:fixed;left:0;top:0;height:4px;width:0;background:linear-gradient(90deg,var(--red),var(--coral),var(--cyan));z-index:9999}

.svc-page .container{max-width:1460px;margin:auto;padding:0 42px}
/* Eyebrow matched to the listings' spec (Inter 800 / .28em / 12px). */
.svc-page .eyebrow{font-family:var(--font-editorial);font-size:12px;font-weight:800;letter-spacing:.28em;text-transform:uppercase}
.svc-page .eyebrow.light{color:#fff}
.svc-page .accent{color:var(--red)}

/* ---------- HERO ---------- */
.svc-page .hero{position:relative;height:calc(100svh - var(--navh));min-height:0;background:var(--coral);overflow:hidden;display:grid;align-items:center;padding:18px 0 28px}
.svc-page .hero:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 72% 38%,rgba(255,255,255,.22),transparent 24%),linear-gradient(115deg,rgba(255,255,255,.07),transparent 38%)}
.svc-page .hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:1.04fr .96fr;gap:34px;align-items:center;height:100%}
.svc-page .hero h1{font-size:clamp(56px,6.7vw,108px);line-height:.86;letter-spacing:-.062em;margin:10px 0 18px;font-weight:820;max-width:830px}
.svc-page .hero h1 span{display:block;color:#fff9f2}
.svc-page .hero h1 em{font-style:normal;color:var(--ink)}
.svc-page .hero p{max-width:650px;font-size:18px;line-height:1.52}
.svc-page .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}
.svc-page .btn{border:1px solid var(--ink);padding:15px 20px;border-radius:999px;font-weight:900;display:inline-flex;align-items:center;gap:8px}
.svc-page .btn.dark{background:var(--ink);color:#fff}
.svc-page .btn.ghost{background:rgba(255,255,255,.22)}

.svc-page .hero-visual{position:relative;height:min(58vh,520px);min-height:410px;display:grid;place-items:center;isolation:isolate}
.svc-page .hero-visual:before{content:"";position:absolute;width:72%;height:72%;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.17),rgba(255,255,255,.04) 46%,transparent 72%);filter:blur(1px);z-index:0}
.svc-page .orbit-guide{position:absolute;width:76%;aspect-ratio:1;border:1px dashed rgba(11,13,15,.18);border-radius:50%;z-index:1;transition:transform .3s ease}
.svc-page .orbit-guide:before,.svc-page .orbit-guide:after{content:"";position:absolute;inset:10%;border:1px solid rgba(255,255,255,.16);border-radius:50%}
.svc-page .orbit-guide:after{inset:22%;border-color:rgba(11,13,15,.10)}
.svc-page .connection-svg{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none;overflow:visible}
.svc-page .connection-svg path,.svc-page .connection-svg circle{fill:none;stroke:rgba(11,13,15,.27);stroke-width:1.35;vector-effect:non-scaling-stroke}
.svc-page .connection-svg .loop{stroke:rgba(255,255,255,.7);stroke-width:1.8;stroke-dasharray:10 8}
.svc-page .connection-svg .pulse{fill:#fff;stroke:none;filter:drop-shadow(0 0 7px #fff)}
.svc-page .growth-tail{position:absolute;left:50%;bottom:-40px;width:2px;height:90px;background:linear-gradient(var(--ink),var(--red));transform-origin:top;z-index:2;opacity:.45}
.svc-page .halo{position:absolute;width:360px;height:360px;border-radius:50%;border:1px solid rgba(11,13,15,.14);box-shadow:0 0 0 34px rgba(255,255,255,.05),0 0 0 76px rgba(255,255,255,.035);z-index:1;transition:transform .35s ease,box-shadow .35s ease;overflow:visible}
.svc-page .halo-core{position:absolute;inset:34%;border-radius:50%;border:1px solid rgba(11,13,15,.14);box-shadow:0 0 0 1px rgba(255,255,255,.13) inset;transition:.35s}
.svc-page .hero-visual.system-locked .halo-core{box-shadow:0 0 0 1px rgba(255,255,255,.55) inset,0 0 34px rgba(255,255,255,.35)}
.svc-page .hero-char{position:relative;z-index:4;width:min(390px,68%);height:auto;filter:drop-shadow(0 22px 24px rgba(73,21,16,.22));animation:svc-breathe 5s ease-in-out infinite;transition:filter .25s ease}
.svc-page .tool{position:absolute;left:50%;top:50%;z-index:5;background:rgba(255,255,255,.88);border:1px solid rgba(0,0,0,.10);border-radius:999px;padding:9px 13px;font-size:12px;font-weight:900;box-shadow:0 12px 30px rgba(0,0,0,.12);will-change:transform;transition:box-shadow .2s,background .2s;display:inline-flex;align-items:center;gap:8px;transform-origin:center;overflow:hidden;white-space:nowrap}
.svc-page .tool i{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;font-style:normal;font-size:11px;background:#111;color:#fff;flex:0 0 auto;transition:.35s}
.svc-page .tool b{font-size:12px;transition:opacity .32s,max-width .45s,margin .45s;max-width:120px;overflow:hidden}
.svc-page .tool.node-mode{padding:7px;background:rgba(255,255,255,.94);box-shadow:0 8px 24px rgba(0,0,0,.12)}
.svc-page .tool.node-mode b{opacity:0;max-width:0;margin:0}
.svc-page .tool.node-mode i{background:linear-gradient(135deg,var(--red),#111);box-shadow:0 0 0 4px rgba(255,255,255,.65)}
/* The concept's "SIGNALS — CONNECTED SYSTEM" status label and its sweep
   animation lived here; the label was dropped on request, so its rules
   (and the svc-signalSweep keyframe) are removed with it. The
   .system-locked class it shared is still used by the halo and tool pills. */
.svc-page .hero-stats{display:flex;gap:10px;margin-top:22px;flex-wrap:wrap}
.svc-page .stat{background:rgba(255,255,255,.20);border:1px solid rgba(255,255,255,.28);border-radius:16px;padding:13px 16px;min-width:140px}
.svc-page .stat b{font-size:27px;display:block}
.svc-page .stat small{font-size:10px;letter-spacing:.17em;text-transform:uppercase;font-weight:900}

/* kinetic headline wipe */
.svc-page .kinetic-word{position:relative;display:inline-block;isolation:isolate;--svc-wipe:0%;background:linear-gradient(90deg,currentColor 0 var(--svc-wipe),rgba(11,13,15,.16) var(--svc-wipe) 100%);-webkit-background-clip:text;background-clip:text;color:transparent;transition:filter .25s}
.svc-page .hero .kinetic-word{background:linear-gradient(90deg,var(--ink) 0 var(--svc-wipe),rgba(11,13,15,.15) var(--svc-wipe) 100%);-webkit-background-clip:text;background-clip:text}
.svc-page .system .kinetic-word{background:linear-gradient(90deg,var(--red) 0 var(--svc-wipe),rgba(11,13,15,.14) var(--svc-wipe) 100%);-webkit-background-clip:text;background-clip:text}
.svc-page .final .kinetic-word{background:linear-gradient(90deg,#fff 0 var(--svc-wipe),rgba(255,255,255,.18) var(--svc-wipe) 100%);-webkit-background-clip:text;background-clip:text}
/* The base .kinetic-word rule paints its gradient from currentColor while
   also setting color:transparent — so currentColor resolves to transparent
   and the text is invisible. Every section that works has an explicit colour
   override; the concept never gave .proof one, which is why "moves business."
   rendered blank there. Same ink treatment as the hero, on the same coral. */
.svc-page .proof .kinetic-word{background:linear-gradient(90deg,var(--ink) 0 var(--svc-wipe),rgba(11,13,15,.15) var(--svc-wipe) 100%);-webkit-background-clip:text;background-clip:text}
.svc-page .kinetic-word.played{animation:svc-kineticWipe 1.15s cubic-bezier(.2,.9,.2,1) forwards}

/* ---------- JOURNEY / STORY ---------- */
/* The concept opened this section with a 104px black band (its gradient's
   first stop) purely as a seam between the coral hero and the coral story
   panel — with 110px of top padding over it, so it rendered as an empty
   black strip. The marquee now sits immediately above and supplies that
   dark seam itself, so the section is solid coral from the top. */
.svc-page .journey{color:var(--ink);padding:70px 0 0;background:var(--coral)}
/* Was #fff to read against the old black top strip; now that the section
   starts on coral it takes the same ink as the rest of the story panel. */
.svc-page .journey-head{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:end;margin-bottom:55px;color:var(--ink)}
/* Section headings use the blog/case-study listings' scale rather than the
   concept's larger one, so all three page types read as one system:
   Inter (--font-editorial) at 880, -.05em tracking, same clamp. */
.svc-page .journey h2,.svc-page .system h2,.svc-page .proof h2,.svc-page .method h2,.svc-page .insights h2,.svc-page .faq h2,.svc-page .section-top h2,.svc-page .character-copy h2{font-family:var(--font-editorial);font-weight:880;font-size:clamp(2.8rem,5.6vw,5rem);line-height:1.02;letter-spacing:-.05em;margin:8px 0 0}
.svc-page .journey-head p{color:rgba(11,13,15,.78);font-size:19px;line-height:1.6;max-width:620px;justify-self:end}
/* The stage is pinned for one viewport, so total height is 100vh plus the
   scroll travel that steps through the scenes. The concept's 520vh over 6
   scenes is 420vh of travel = 70vh each; --scene-count comes from
   JourneyStory so a 4-scene service gets 380vh instead of a viewport and a
   half of dead scroll on the last one. Falls back to 6 if unset. */
.svc-page .story-zone{position:relative;height:calc(100vh + (var(--scene-count,6) * 70vh))}
/* The concept hardcoded three coral stops (#f56f5d / #f27664 / #ef6758),
   which kept the stage coral on all five services. Rebuilt from the theme
   tokens so it tracks each accent. The middle stop is very slightly LIGHTER
   than the base and the end stop darker, so they mix toward --coral2 and
   --red respectively; the ratios below were fitted against the concept's
   original values (within a delta of 6 and 2 in RGB distance). */
.svc-page .story-stage{position:sticky;top:var(--navh);height:calc(100svh - var(--navh));overflow:hidden;background:linear-gradient(135deg,var(--coral) 0%,color-mix(in srgb,var(--coral) 79%,var(--coral2)) 47%,color-mix(in srgb,var(--coral) 86%,var(--red)) 100%)}
.svc-page .story-grid{height:100%;display:grid;grid-template-columns:48% 52%;position:relative;background:transparent}
.svc-page .story-copy{position:relative;background:transparent;padding:9vh 6vw;display:flex;align-items:center;color:var(--ink);z-index:5}
.svc-page .story-visual{position:relative;overflow:hidden;display:grid;place-items:center;background:radial-gradient(circle at 58% 46%,rgba(255,255,255,.22),transparent 30%),linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,0));isolation:isolate}
.svc-page .story-visual:before{content:"";position:absolute;inset:-15%;background:radial-gradient(circle at 28% 22%,rgba(255,255,255,.16),transparent 26%),repeating-linear-gradient(120deg,rgba(255,255,255,.028) 0 1px,transparent 1px 52px);animation:svc-visualDrift 16s linear infinite;pointer-events:none;z-index:1;opacity:.34}
.svc-page .scene{position:absolute;inset:auto 6vw;opacity:0;transform:translateY(54px);transition:opacity .35s,transform .35s;pointer-events:none}
.svc-page .scene.active{opacity:1;transform:none;pointer-events:auto}
.svc-page .scene .num{font-size:12px;letter-spacing:.2em;color:rgba(11,13,15,.66);font-weight:950}
.svc-page .scene h3{font-size:clamp(44px,5vw,78px);line-height:.94;letter-spacing:-.05em;margin:10px 0 14px}
.svc-page .scene p{max-width:620px;color:rgba(11,13,15,.78);font-size:17px;line-height:1.65}
.svc-page .chips{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}
.svc-page .chip{border:1px solid rgba(11,13,15,.22);border-radius:999px;padding:7px 10px;font-size:11px;font-weight:850;color:var(--ink);background:rgba(255,255,255,.12)}
.svc-page .scene a{display:inline-flex;margin-top:10px;color:var(--ink);font-weight:900;border-bottom:2px solid var(--ink);padding-bottom:4px}
.svc-page .scene-img{position:absolute;width:min(620px,78%);height:auto;max-height:82%;object-fit:contain;opacity:0;transform:translateX(110px) scale(.9);transition:.5s cubic-bezier(.2,.8,.2,1);z-index:7;filter:drop-shadow(0 26px 30px rgba(95,28,20,.20))}
.svc-page .scene-img.active{opacity:1;transform:none}
.svc-page .growth-line{position:absolute;right:18px;top:7%;bottom:7%;width:3px;background:rgba(11,13,15,.15);border-radius:999px;z-index:7}
.svc-page .growth-line i{display:block;width:100%;height:0;background:var(--ink);border-radius:999px;box-shadow:0 0 22px rgba(255,255,255,.48)}

/* ---------- MARQUEE ---------- */
.svc-page .marquee{background:#070808;color:#fff;border-top:1px solid #25292b;border-bottom:1px solid #25292b;overflow:hidden;padding:26px 0}
.svc-page .marquee-row{display:flex;width:max-content;gap:34px;white-space:nowrap;font-weight:950;letter-spacing:.06em;text-transform:uppercase;font-size:20px;animation:svc-marquee 28s linear infinite}
.svc-page .marquee-row.two{margin-top:20px;animation-direction:reverse;animation-duration:34s;color:var(--coral)}

/* ---------- SYSTEM ---------- */
.svc-page .system{padding:125px 0;background:var(--cream);overflow:hidden}
.svc-page .system-intro{display:grid;grid-template-columns:1.15fr .85fr;gap:50px;align-items:end}
.svc-page .system-intro p{font-size:20px;line-height:1.65;color:#5d646a;max-width:600px}
.svc-page .system-map{margin-top:70px;display:grid;grid-template-columns:repeat(5,1fr);gap:14px;position:relative}
.svc-page .node{background:#fff;border:1px solid var(--line);border-radius:24px;padding:28px 18px;min-height:190px;position:relative;box-shadow:0 18px 40px rgba(0,0,0,.04)}
.svc-page .node:after{content:"→";position:absolute;right:-22px;top:50%;font-size:28px;color:var(--red);z-index:3}
.svc-page .node:last-child:after{display:none}
.svc-page .node small{color:var(--red);font-weight:950;letter-spacing:.16em}
.svc-page .node h3{font-size:27px;margin:12px 0}
.svc-page .node p{color:#687078;line-height:1.55;margin:0}

/* ---------- CINEMA ---------- */
.svc-page .cinema{background:#090b0d;color:#fff;position:relative;overflow:clip}
.svc-page .cinema-track{height:330vh;position:relative}
.svc-page .cinema-sticky{height:100svh;min-height:680px;position:sticky;top:0;overflow:hidden;display:grid;place-items:center;background:radial-gradient(circle at 50% 45%,rgba(245,111,93,.14),transparent 28%),radial-gradient(circle at 15% 75%,rgba(82,197,232,.10),transparent 25%),#090b0d}
.svc-page .cinema-sticky:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,#090b0d 0%,transparent 9%,transparent 91%,#090b0d 100%);pointer-events:none;z-index:20}
.svc-page .cinema-atmosphere{position:absolute;inset:0;z-index:0;opacity:.55}
.svc-page .cinema-atmosphere i{position:absolute;border:1px solid rgba(255,255,255,.08);border-radius:50%;width:42vw;height:42vw;left:29vw;top:10vh;transform:rotate(12deg)}
.svc-page .cinema-atmosphere i:nth-child(2){width:32vw;height:32vw;left:34vw;top:18vh;border-color:rgba(245,111,93,.19)}
.svc-page .cinema-atmosphere i:nth-child(3){width:18vw;height:18vw;left:41vw;top:30vh;border-color:rgba(82,197,232,.16)}
.svc-page .cinema-copy{position:absolute;z-index:12;top:8vh;left:50%;transform:translateX(-50%);text-align:center;width:min(1040px,90vw)}
.svc-page .cinema-copy .eyebrow{color:var(--coral)}
.svc-page .cinema-words{height:1.06em;position:relative;font-size:clamp(72px,10vw,168px);font-weight:900;letter-spacing:-.07em;line-height:.9;margin:18px 0 24px}
.svc-page .cinema-word{position:absolute;inset:0;opacity:0;transform:translateY(46px) scale(.97);filter:blur(8px);transition:.55s cubic-bezier(.2,.8,.2,1)}
.svc-page .cinema-word.active{opacity:1;transform:none;filter:none}
.svc-page .cinema-word:last-child{color:var(--coral)}
.svc-page .cinema-copy p{margin:0 auto;max-width:760px;color:#abb3b9;font-size:17px;line-height:1.6}
.svc-page .depth-card{position:absolute;z-index:3;width:230px;padding:18px 20px;border:1px solid rgba(255,255,255,.12);border-radius:20px;background:rgba(17,21,24,.58);backdrop-filter:blur(12px);box-shadow:0 18px 50px rgba(0,0,0,.24);will-change:transform}
.svc-page .depth-card small{display:block;color:var(--coral);font-weight:900;letter-spacing:.16em;font-size:9px}
.svc-page .depth-card b{display:block;font-size:20px;margin:7px 0}
.svc-page .depth-card span{color:#8f9aa0;font-size:12px}
.svc-page .d1{left:4vw;top:34vh}
.svc-page .d2{right:5vw;top:32vh}
.svc-page .d3{left:8vw;bottom:11vh}
.svc-page .d4{right:8vw;bottom:12vh}
.svc-page .handoff-team{position:absolute;z-index:8;left:50%;bottom:5vh;transform:translateX(-50%);width:min(1120px,86vw);height:42vh;min-height:300px}
.svc-page .handoff-char{position:absolute;bottom:0;width:29%;max-width:330px;display:flex;flex-direction:column;align-items:center;transition:opacity .2s}
.svc-page .handoff-char img{max-height:34vh;width:auto;object-fit:contain;filter:drop-shadow(0 20px 28px rgba(0,0,0,.3));transform-origin:bottom center;will-change:transform,filter}
.svc-page .handoff-char span{font-size:9px;letter-spacing:.17em;color:#88939a;font-weight:950;margin-top:4px}
.svc-page .hc1{left:0}
.svc-page .hc2{left:50%;transform:translateX(-50%)}
.svc-page .hc3{right:0}
.svc-page .role-fx{position:absolute;left:50%;top:8%;transform:translate(-50%,10px);font-style:normal;font-size:9px;letter-spacing:.11em;font-weight:950;white-space:nowrap;color:#fff;background:rgba(10,12,14,.72);border:1px solid rgba(255,255,255,.13);border-radius:999px;padding:7px 10px;opacity:0;box-shadow:0 12px 26px rgba(0,0,0,.22);backdrop-filter:blur(10px);will-change:transform,opacity}
.svc-page .hc1 .role-fx{color:#bcefff}
.svc-page .hc2 .role-fx{color:#ffd4ca}
.svc-page .hc3 .role-fx{color:#ffe2a8}
.svc-page .signal-orb{position:absolute;left:10%;top:53%;width:28px;height:28px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff 0 10%,#ffd8cd 22%,var(--coral) 52%,#d9362e 100%);box-shadow:0 0 0 8px rgba(245,111,93,.10),0 0 28px rgba(245,111,93,.7);z-index:10;will-change:transform}
.svc-page .signal-orb i{position:absolute;inset:-9px;border:1px solid rgba(255,255,255,.38);border-radius:50%;animation:svc-orbPulse 1.6s ease-in-out infinite}
.svc-page .cinema-scroll{position:absolute;z-index:21;bottom:18px;left:50%;transform:translateX(-50%);font-size:9px;letter-spacing:.2em;color:#778087}

/* ---------- PROOF ---------- */
.svc-page .proof{background:var(--coral);padding:100px 0}
.svc-page .proof-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(0,0,0,.18);border-bottom:1px solid rgba(0,0,0,.18);margin-top:48px}
.svc-page .proof-item{padding:42px 28px;border-right:1px solid rgba(0,0,0,.18);position:relative;overflow:hidden}
.svc-page .proof-item:last-child{border-right:0}
.svc-page .proof-item b{font-size:56px;letter-spacing:-.05em;font-variant-numeric:tabular-nums}
/* Direct child only: the counter renders its own nested spans inside the
   <b> (prefix / animating number / suffix). A bare descendant selector here
   caught those too, shrinking the number to the 11px label size and making
   display:block push the suffix onto its own line. */
.svc-page .proof-item > span{display:block;text-transform:uppercase;font-size:11px;letter-spacing:.17em;font-weight:950;margin-top:7px}
.svc-page .proof-item:after{content:"";position:absolute;left:18px;right:18px;bottom:16px;height:30px;background:linear-gradient(135deg,transparent 0 18%,rgba(11,13,15,.10) 18% 20%,transparent 20% 36%,rgba(11,13,15,.16) 36% 38%,transparent 38% 56%,rgba(11,13,15,.20) 56% 58%,transparent 58% 72%,rgba(11,13,15,.26) 72% 74%,transparent 74%);opacity:.55;transform:translateY(30px);transition:.7s}
.svc-page .proof-item.in-view:after{transform:none}

/* ---------- CASES ---------- */
.svc-page .cards-section{background:#0b0d0f;color:#fff;padding:115px 0}
.svc-page .section-top{display:flex;justify-content:space-between;gap:30px;align-items:end;margin-bottom:42px}
.svc-page .section-top h2{font-size:clamp(45px,5.7vw,84px);line-height:.92;letter-spacing:-.052em;margin:7px 0}
.svc-page .section-top p{max-width:510px;color:#adb5bb;font-size:18px;line-height:1.6}
.svc-page .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
/* Card shape matched to the blog listing's connected-proof band rather than
   the concept's gradient art tiles, since these now carry real WP data. */
.svc-page .case{background:#12171a;border:1px solid #2a3034;border-radius:24px;overflow:hidden;transition:.25s;display:block}
.svc-page .case:hover{transform:translateY(-7px);border-color:var(--coral)}
.svc-page .case-body{padding:22px}
.svc-page .case small{color:var(--muted);letter-spacing:.12em;font-weight:800;font-size:11px;text-transform:uppercase}
.svc-page .case h3{font-family:var(--font-editorial);font-size:1.5rem;font-weight:900;line-height:1.15;margin:14px 0 0}
.svc-page .case-metric{font-family:var(--font-editorial);font-weight:950;font-size:2rem;color:var(--coral);margin-top:8px;line-height:1.05}
.svc-page .case p{color:#aeb7bd;line-height:1.6;margin:10px 0 0;font-size:15px}

/* ---------- METHOD ---------- */
.svc-page .method{padding:125px 0;background:#f8f2ec;overflow:hidden}
/* The scroll container the concept was missing — see MethodTrack.js. The
   negative/positive padding pair lets cards bleed to the container edge
   while still leaving room for their shadows. */
.svc-page .method-scroller{margin-top:60px;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:6px 2px 14px}
.svc-page .method-scroller::-webkit-scrollbar{display:none}
.svc-page .method-track{display:flex;gap:18px;width:max-content}
.svc-page .method-card{width:360px;min-height:290px;background:#fff;border:1px solid var(--line);border-radius:28px;padding:30px;box-shadow:0 18px 45px rgba(0,0,0,.04);flex:0 0 auto}
.svc-page .method-card b{color:var(--red);letter-spacing:.13em}
.svc-page .method-card h3{font-size:34px;margin:22px 0 12px}
.svc-page .method-card p{color:#697179;line-height:1.65;margin:0}

/* ---------- CHARACTER BREAK ---------- */
.svc-page .character-break{position:relative;min-height:650px;background:var(--coral);overflow:hidden;display:grid;align-items:center}
.svc-page .character-break .container{display:grid;grid-template-columns:.9fr 1.1fr;align-items:center;gap:30px}
.svc-page .char-wrap{position:relative;height:520px;display:grid;place-items:center}
.svc-page .char-wrap img{width:min(520px,88%);height:auto;max-height:490px;object-fit:contain;filter:drop-shadow(0 24px 24px rgba(0,0,0,.16));transform-origin:50% 80%}
.svc-page .float-badge{position:absolute;background:#fff;border-radius:20px;padding:14px 16px;font-weight:900;box-shadow:0 14px 30px rgba(0,0,0,.12);z-index:3}
.svc-page .fb1{top:14%;left:5%}
.svc-page .fb2{right:3%;top:31%}
.svc-page .fb3{left:11%;bottom:16%}
.svc-page .character-copy h2{font-size:clamp(50px,6vw,90px);line-height:.9;letter-spacing:-.055em;margin:10px 0 20px}
.svc-page .character-copy p{font-size:19px;line-height:1.65;max-width:600px}

/* ---------- INSIGHTS ---------- */
.svc-page .insights{background:#fff;padding:115px 0}
/* Two-column head to match the case-studies page's insights block. */
.svc-page .insights-top{display:grid;grid-template-columns:1.1fr .7fr;gap:32px;align-items:end;margin-bottom:40px}
.svc-page .insights-top p{color:#697179;font-size:16px;line-height:1.6;margin:0}
.svc-page .blogcards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.svc-page .blogcard{border:1px solid var(--line);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;background:#fff;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}
.svc-page .blogcard:hover{transform:translateY(-4px);box-shadow:0 20px 45px rgba(0,0,0,.09);border-color:color-mix(in srgb,var(--red) 40%,transparent)}
.svc-page .blogcard-media{position:relative;height:180px;background:#f3ece7;flex-shrink:0}
.svc-page .blogcard-media--empty{background:var(--red)}
.svc-page .blogcard-img{object-fit:cover}
.svc-page .blogcard-body{padding:22px;display:flex;flex-direction:column;flex:1}
.svc-page .blogcard small{color:var(--red);font-weight:900;letter-spacing:.12em;font-size:11px;text-transform:uppercase;line-height:1.4}
.svc-page .blogcard h3{font-family:var(--font-editorial);font-size:1.15rem;font-weight:800;line-height:1.3;margin:12px 0 0;letter-spacing:-.01em}
.svc-page .blogcard p{color:#697179;line-height:1.6;margin:10px 0 0;font-size:14px}
.svc-page .blogcard .blog-link{margin-top:auto;padding-top:16px;font-weight:900;color:var(--red);font-size:13px}

/* ---------- FAQ ---------- */
.svc-page .faq{background:#0b0d0f;color:#fff;padding:115px 0}
.svc-page .faqgrid{display:grid;grid-template-columns:.9fr 1.1fr;gap:70px;margin-top:45px}
.svc-page .faqintro p{color:#adb5bb;font-size:18px;line-height:1.65}
.svc-page details{border-top:1px solid #2a3034;padding:20px 0}
.svc-page details:last-child{border-bottom:1px solid #2a3034}
.svc-page summary{font-weight:900;font-size:20px;cursor:pointer;list-style:none}
.svc-page summary::-webkit-details-marker{display:none}
.svc-page details p{color:#abb4bb;line-height:1.65;max-width:720px;margin:12px 0 0}

/* ---------- FINAL ---------- */
.svc-page .final{background:var(--coral);padding:110px 0;text-align:center}
.svc-page .final h2{font-size:clamp(54px,7.4vw,112px);line-height:.86;letter-spacing:-.065em;margin:10px auto 24px;max-width:1200px}
.svc-page .final p{font-size:20px;max-width:720px;margin:auto;line-height:1.6}

/* ---------- HERO PIN ZONE (V4.1) ---------- */
.svc-page .hero-zone{height:176svh;background:var(--coral);position:relative}
.svc-page .hero-zone .hero{position:sticky;top:var(--navh);height:calc(100svh - var(--navh));z-index:2}
.svc-page .hero-zone:after{content:"";position:absolute;left:0;right:0;bottom:0;height:90px;background:linear-gradient(180deg,transparent,rgba(11,13,15,.06));pointer-events:none}

/* globals.css (line ~58) applies a site-wide
   @media (prefers-reduced-motion: reduce) rule that zeroes
   animation-duration on *everything* with !important. On any machine with
   that OS setting on, it doesn't just "reduce" this page's motion — it
   parks each looping animation on its final keyframe. For the marquee that
   final frame is translateX(-50%), which slides the row's second copy off
   to the left and leaves the right-hand half of the black band completely
   empty, reading as a broken/blank strip rather than a ticker.
   These decorative loops are re-enabled at matching specificity. They are
   ambient, non-essential motion (a ticker, a slow drift, a breathing
   character) with no flashing or large-area movement, and the page's
   scroll-driven effects are unaffected either way. If you'd rather honour
   the OS setting strictly here, delete this block — the only visible cost
   is that the marquee must then be made to sit still legibly instead. */
@media(prefers-reduced-motion:reduce){
  .svc-page .marquee-row{animation-duration:28s !important}
  .svc-page .marquee-row.two{animation-duration:34s !important}
  .svc-page .hero-char{animation-duration:5s !important}
  .svc-page .story-visual:before{animation-duration:16s !important}
  .svc-page .signal-orb i{animation-duration:1.6s !important}
  .svc-page .kinetic-word.played{animation-duration:1.15s !important}
  .svc-page .svc-switch-word::after{animation-duration:.9s !important}
}

@media(min-width:901px) and (max-height:820px){
  .svc-page .hero h1{font-size:clamp(52px,6.1vw,92px)}
  .svc-page .hero p{font-size:16px}
  .svc-page .hero-visual{height:min(55vh,460px);min-height:360px}
  .svc-page .hero-char{width:min(350px,64%)}
  .svc-page .halo{width:320px;height:320px}
  .svc-page .hero-stats{margin-top:14px}
  .svc-page .stat{padding:10px 14px}
  .svc-page .stat b{font-size:24px}
}

@media(max-width:900px){
  .svc-page .container{padding:0 20px}
  .svc-page .hero{height:auto;min-height:calc(100svh - var(--navh));padding:14px 0 26px}
  /* The concept writes this as "padding:6px 0 4px". Because the element
     carries both .container and .hero-grid, and this rule comes later at
     equal specificity, that shorthand also zeroes the container's 20px
     side padding — leaving the hero headline and body copy flush against
     the screen edge on mobile. Vertical values kept as authored; the side
     padding is restored. */
  .svc-page .hero-grid{grid-template-columns:1fr;gap:2px;padding:6px 20px 4px;align-content:center}
  .svc-page .hero-copy{order:1}
  .svc-page .hero h1{font-size:clamp(42px,12vw,64px);line-height:.87;margin:6px 0 10px;max-width:720px}
  .svc-page .hero p{font-size:15px;line-height:1.45}
  .svc-page .hero-visual{height:286px;min-height:286px;order:0;margin-bottom:0}
  .svc-page .hero-char{width:214px}
  .svc-page .halo{width:202px;height:202px}
  .svc-page .orbit-guide{width:min(82vw,315px)}
  .svc-page .tool{font-size:8.5px;padding:6px 8px}
  .svc-page .tool b{font-size:10px}
  .svc-page .tool i{width:18px;height:18px;font-size:9px}
  .svc-page .hero-visual.system-locked .tool b{opacity:0;max-width:0}
  .svc-page .hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:12px}
  .svc-page .stat{min-width:0;padding:10px}
  .svc-page .stat b{font-size:22px}
  .svc-page .stat small{font-size:8px}
  .svc-page .hero-zone{height:168svh}
  .svc-page .hero-zone .hero{height:calc(100svh - var(--navh));min-height:0}

  .svc-page .journey{padding-top:52px;background:var(--coral)}
  .svc-page .journey-head{grid-template-columns:1fr;gap:18px;margin-bottom:32px}
  .svc-page .journey-head p{justify-self:start;font-size:16px}
  /* Same formula as desktop, but mobile gives each scene more travel
     (the concept's 620vh / 6 scenes = ~87vh each) since the stacked
     layout has more to read per scene. */
  .svc-page .story-zone{height:calc(100vh + (var(--scene-count,6) * 87vh))}
  .svc-page .story-grid{grid-template-columns:1fr}
  .svc-page .story-copy{padding:7vh 7vw 40vh;background:transparent;color:var(--ink);z-index:8}
  .svc-page .story-visual{position:absolute;inset:0;z-index:2;background:radial-gradient(circle at 50% 76%,rgba(255,255,255,.18),transparent 30%),linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0))}
  .svc-page .scene{inset:auto 7vw;top:8vh}
  .svc-page .scene h3{font-size:clamp(38px,12vw,58px)}
  .svc-page .scene p{font-size:14px;line-height:1.55;color:rgba(11,13,15,.78)}
  .svc-page .chips{margin:10px 0}
  .svc-page .chip{font-size:9px;padding:5px 8px}
  .svc-page .scene-img{width:min(390px,70vw);bottom:4vh;top:auto;max-height:34vh;z-index:7}
  .svc-page .growth-line{right:10px;top:10%;bottom:10%}

  .svc-page .system,.svc-page .proof,.svc-page .cards-section,.svc-page .method,.svc-page .insights,.svc-page .faq,.svc-page .final{padding:80px 0}
  .svc-page .system-intro,.svc-page .faqgrid,.svc-page .character-break .container,.svc-page .insights-top{grid-template-columns:1fr}
  .svc-page .insights-top{gap:16px;margin-bottom:28px}
  .svc-page .system-map{grid-template-columns:1fr;gap:10px}
  .svc-page .node{min-height:0}
  .svc-page .node:after{content:"↓";right:24px;top:auto;bottom:-22px}

  .svc-page .cinema-track{height:300vh}
  .svc-page .cinema-sticky{min-height:620px}
  .svc-page .cinema-copy{top:7vh;width:90vw}
  .svc-page .cinema-words{font-size:clamp(52px,15vw,80px);height:1.9em;line-height:.88}
  .svc-page .cinema-copy p{font-size:13px;max-width:90%}
  .svc-page .depth-card{width:145px;padding:11px 12px;border-radius:14px}
  .svc-page .depth-card b{font-size:13px}
  .svc-page .depth-card span{font-size:9px}
  .svc-page .d1{left:3vw;top:37vh}
  .svc-page .d2{right:3vw;top:39vh}
  .svc-page .d3{left:4vw;bottom:20vh}
  .svc-page .d4{right:4vw;bottom:19vh}
  .svc-page .handoff-team{width:94vw;height:31vh;bottom:4vh}
  .svc-page .handoff-char{width:35%}
  .svc-page .handoff-char img{max-height:23vh}
  .svc-page .hc1{left:-3%}
  .svc-page .hc2{left:50%}
  .svc-page .hc3{right:-3%}
  .svc-page .handoff-char span{display:none}
  .svc-page .role-fx{font-size:7px;padding:5px 7px;top:12%}
  .svc-page .signal-orb{width:20px;height:20px}
  .svc-page .cinema-scroll{font-size:7px}

  .svc-page .proof-grid{grid-template-columns:1fr 1fr}
  .svc-page .proof-item:nth-child(2){border-right:0}
  .svc-page .proof-item{padding:26px 18px;border-bottom:1px solid rgba(0,0,0,.18)}
  .svc-page .proof-item b{font-size:42px}
  .svc-page .section-top{display:block}
  .svc-page .cards,.svc-page .blogcards{grid-template-columns:1fr}
  .svc-page .method-scroller{margin-top:34px;scroll-snap-type:x mandatory}
  .svc-page .method-card{width:82vw;scroll-snap-align:start}
  .svc-page .character-break{min-height:760px}
  .svc-page .char-wrap{height:380px}
  .svc-page .character-copy{padding-bottom:48px}
  .svc-page .character-copy h2{font-size:54px}
}
    `}</style>
    </>
  );
}
