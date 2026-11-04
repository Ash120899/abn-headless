// The whole sub-service stylesheet, ported from
// design-concepts/ABN_Junction_Performance_Marketing_V2_Campaign_Lab_Leadgen.html
// as one scoped block (same approach and reasons as ServicePageStyles.js).
//
// Deliberate deviations from the source file:
//  1. Everything is scoped under .ssp-page so the light palette can't leak
//     into the site's global dark theme.
//  2. The concept's own header/footer are dropped (the real SiteHeader and
//     SiteFooter come from src/app/layout.js). Its sticky offsets, hard-coded
//     to a 70px bar, track --navh (the site header) and --railh (the section
//     rail, 0 when the page has none) instead.
//  3. Every accent literal (the concept's coral and its dozen hand-picked
//     tints and shades) now derives from --coral / --coral2 / --red, which
//     come only from ACF: the page's own pickers, else its parent service's.
//     Neutrals and the lab's teal chart colours stay literal.
//  4. Keyframes are ssp- prefixed (globals.css already defines marquee).
//  5. Tailwind's preflight zeroes heading weights and paragraph margins,
//     which the concept relied on browser defaults for; the base rules
//     below restore them.
//  6. The concept's @media(prefers-reduced-motion:reduce) blocks are not
//     ported (see ServicePageStyles.js and docs/PROJECT.md section 6). The
//     re-assert block near the end exists for the same reason as the
//     service page's.

export default function SubservicePageStyles({ theme }) {
  return (
    <>
      {/* The header is a SIBLING of the page in layout.js, so inline accent
          variables never reach it. Its CTA colours are set on <body>, the
          nearest common ancestor, as on the service pages. */}
      {theme?.primary ? (
        <style>{`
body:has(.ssp-page){--site-cta-bg:${theme.primary};--site-cta-fg:#0b0d0f}
`}</style>
      ) : null}
      <style>{`
@keyframes ssp-float{50%{transform:translateY(-12px)}}
@keyframes ssp-marquee{to{transform:translateX(-50%)}}
@keyframes ssp-heroEnter{from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:translateY(0)}}

html:has(.ssp-page){scroll-behavior:smooth}
/* Fixed light palette, not theme-reactive: hide the site theme switch, as
   the service pages do. */
body:has(.ssp-page) .btn-slide{display:none !important}

/* --coral / --coral2 / --red are deliberately not declared here: they come
   only from ACF, set inline on .ssp-page. */
.ssp-page{
  --ink:#121416;--cream:#f7f6f2;--muted:#62696d;--line:#deded8;--cyan:#27b9d2;
  --navh:var(--site-header-h,76px);
  --railh:0px;
  background:var(--cream);color:var(--ink);
  /* clip, NOT hidden: hidden makes this a scroll container and every
     position:sticky descendant (rail, story stage, lab preview) stops
     pinning. */
  overflow-x:clip;
  font-family:Inter,Arial,system-ui,sans-serif;
}
.ssp-page:has(.rail){--railh:54px}
.ssp-page :where(h1,h2,h3){font-weight:700}
.ssp-page :where(p){margin-block:1em}
.ssp-page :where(button,input,textarea){font:inherit}
.ssp-page :where(button){cursor:pointer}
.ssp-page :where(section[id]){scroll-margin-top:calc(var(--navh) + var(--railh))}

.ssp-progress{position:fixed;left:0;top:0;width:0;height:4px;background:linear-gradient(90deg,var(--coral),var(--coral2),var(--cyan));z-index:2147483646;box-shadow:0 0 14px color-mix(in srgb,var(--coral) 35%,transparent)}
.ssp-preview-badge{position:fixed;right:12px;bottom:12px;z-index:2147483646;background:#121416;color:#ffd27a;border:1px solid #3a3e40;border-radius:10px;padding:8px 11px;font:700 11px/1.3 ui-monospace,Consolas,monospace;pointer-events:none}

.ssp-page .wrap{width:min(1220px,calc(100% - 64px));margin:auto}
.ssp-page .btn{display:inline-flex;align-items:center;justify-content:center;gap:12px;border-radius:999px;padding:14px 19px;font-size:12px;font-weight:850;border:1px solid transparent;transition:transform .25s,background .25s}
.ssp-page .btn:hover{transform:translateY(-3px)}
.ssp-page .btn.black{background:#121416;color:#fff}
.ssp-page .btn.outline{border-color:#b8bbb9;color:#151515}
.ssp-page .btn.white{background:#fff;color:#111}

.ssp-page .eyebrow{font-size:11px;font-weight:950;letter-spacing:.18em;text-transform:uppercase;color:var(--red)}
.ssp-page .eyebrow.light{color:color-mix(in srgb,var(--coral2) 62%,#fff)}
.ssp-page .lead{font-size:16px;line-height:1.65;color:var(--muted);max-width:660px}
.ssp-page .section{padding:105px 0}
.ssp-page .sectionhead{max-width:860px;margin-bottom:42px}
.ssp-page .sectionhead h2{font-size:clamp(35px,4.6vw,65px);line-height:1.02;letter-spacing:-.06em;margin:14px 0 15px}
.ssp-page .sectionhead p{color:var(--muted);font-size:16px;line-height:1.65}

/* ---------- HERO ---------- */
.ssp-page .hero{background:var(--cream);position:relative;overflow:hidden}
.ssp-page .hero-grid{min-height:min(720px,calc(100svh - var(--navh)));display:grid;grid-template-columns:1fr .91fr;align-items:center;gap:38px}
.ssp-page .crumb{font-size:11px;color:#6c7172;display:flex;gap:9px;flex-wrap:wrap;margin-bottom:26px}
.ssp-page .crumb a{text-decoration:underline;text-underline-offset:4px}
.ssp-page .hero h1{font-size:clamp(55px,6.8vw,100px);line-height:.92;letter-spacing:-.075em;margin:14px 0 22px;max-width:750px}
.ssp-page .hero h1 span{color:var(--coral)}
.ssp-page .hero .lead{max-width:580px}
.ssp-page .hero-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:25px}
.ssp-page .hero-copy{animation:ssp-heroEnter .9s both}
.ssp-page .hero-art{height:600px;max-height:70vh;min-height:400px;position:relative;display:grid;place-items:center;animation:ssp-heroEnter 1.1s .18s both}
.ssp-page .hero-art:before{content:"";position:absolute;width:85%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--coral) 18%,var(--cream)) 0%,color-mix(in srgb,var(--coral) 10%,var(--cream)) 50%,transparent 72%);filter:blur(7px)}
.ssp-page .hero-art img{position:relative;z-index:2;width:min(100%,560px);height:auto;max-height:100%;object-fit:contain;border-radius:48% 48% 36% 36%;mix-blend-mode:multiply}
.ssp-page .hero-tag{position:absolute;z-index:4;background:#fff;border:1px solid color-mix(in srgb,var(--coral) 18%,#fff);box-shadow:0 10px 35px #28191516;border-radius:999px;padding:11px 15px;font-size:11px;font-weight:850;animation:ssp-float 5s ease-in-out infinite}
.ssp-page .hero-tag.one{top:14%;left:0}
.ssp-page .hero-tag.two{bottom:20%;right:-1%;animation-delay:-2s}
.ssp-page .hero-tag.three{top:17%;right:0;animation-delay:-3s}
.ssp-page .herobottom{display:flex;gap:24px;border-top:1px solid #dddcd6;padding:20px 0 25px;font-size:11px;color:#606668;letter-spacing:.05em;font-weight:800;flex-wrap:wrap}
.ssp-page .herobottom span:before{content:"✳";color:var(--coral);margin-right:8px}

/* ---------- REVEAL ---------- */
/* Only once SubserviceFx has run (.fx): without JS everything shows. */
.ssp-page.fx .reveal{opacity:0;transform:translateY(35px);transition:opacity .8s,transform .8s}
.ssp-page.fx .reveal.show{opacity:1;transform:translateY(0);transition-delay:var(--delay,0ms)}
.ssp-page .problem:nth-child(3n+2),.ssp-page .offer:nth-child(3n+2),.ssp-page .blogcard:nth-child(3n+2){--delay:110ms}
.ssp-page .problem:nth-child(3n),.ssp-page .offer:nth-child(3n),.ssp-page .blogcard:nth-child(3n){--delay:220ms}

/* ---------- TAPE ---------- */
.ssp-page .tape{background:#0d1012;color:#fff;overflow:hidden;padding:13px 0 12px;border-block:1px solid #252b2e}
.ssp-page .tape-line{display:flex;gap:30px;white-space:nowrap;width:max-content;animation:ssp-marquee 35s linear infinite;font-weight:950;font-size:clamp(15px,2vw,26px);letter-spacing:-.035em}
.ssp-page .tape-line.reverse{animation-direction:reverse;color:var(--coral2);margin-top:9px}
.ssp-page .tape-line span{flex:none}
.ssp-page .tape:hover .tape-line{animation-play-state:paused}

/* ---------- RAIL ---------- */
.ssp-page .rail{position:sticky;top:var(--navh);z-index:190;background:#fffefc;border-bottom:1px solid #e0dfd9;box-shadow:0 10px 20px #00000006}
.ssp-page .railin{display:flex;align-items:center;gap:8px;overflow-x:auto;scrollbar-width:none;min-height:54px}
.ssp-page .railin::-webkit-scrollbar{display:none}
.ssp-page .rail .loc{font-size:11px;font-weight:900;white-space:nowrap;padding-right:16px;margin-right:10px;border-right:1px solid #deded8;color:var(--red)}
.ssp-page .rail a{padding:9px 12px;border-radius:999px;font-size:11px;white-space:nowrap;font-weight:750;color:#5c6263}
.ssp-page .rail a:hover,.ssp-page .rail a.active{background:color-mix(in srgb,var(--coral) 13%,#fff);color:var(--red)}

/* ---------- PROBLEMS ---------- */
.ssp-page .problems{background:#121516;color:#fff}
.ssp-page .problems .sectionhead p{color:#b5b9ba}
.ssp-page .problems .eyebrow{color:color-mix(in srgb,var(--coral2) 62%,#fff)}
.ssp-page .problem-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.ssp-page .problem{border:1px solid #383c3d;border-radius:22px;background:#1b1e1f;padding:27px;min-height:260px;position:relative;overflow:hidden;transition:transform .3s,border-color .3s}
.ssp-page.fx .problem.reveal{transition:opacity .8s,transform .8s,border-color .3s}
.ssp-page .problem:hover{transform:translateY(-5px);border-color:var(--coral)}
.ssp-page .problem .num{color:var(--coral2);font-size:12px;font-weight:900}
.ssp-page .problem .symbol{font-size:45px;display:block;margin:24px 0 15px}
.ssp-page .problem h3{font-size:23px;letter-spacing:-.04em;margin:0 0 10px}
.ssp-page .problem p{color:#b6babb;font-size:13px;line-height:1.6;margin:0}
.ssp-page .problem:after{content:"";position:absolute;width:130px;height:130px;background:var(--coral);filter:blur(90px);opacity:.11;right:-50px;bottom:-50px}

/* ---------- OFFERS ---------- */
.ssp-page .offers{background:var(--cream)}
.ssp-page .offer-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.ssp-page .offer{background:#fff;border:1px solid #deded8;border-radius:22px;padding:26px;min-height:240px;position:relative;overflow:hidden;transition:border-color .25s,transform .25s}
.ssp-page .offer:hover{border-color:var(--coral);transform:translateY(-3px)}
.ssp-page .offer .n{font-size:12px;font-weight:950;color:var(--coral)}
.ssp-page .offer .icon{font-size:30px;display:block;margin:17px 0}
.ssp-page .offer h3{font-size:21px;letter-spacing:-.04em;margin:0 0 9px}
.ssp-page .offer p{font-size:13px;color:#666e70;line-height:1.55;margin:0}
.ssp-page .offer button{border:0;background:transparent;padding:0;margin-top:18px;color:var(--red);font-weight:850;font-size:12px}
.ssp-page .offer .detail{display:none;margin-top:12px;border-top:1px solid #e7e5e0;padding-top:12px;font-size:12px;line-height:1.6;color:#4e5557}
.ssp-page .offer.expanded .detail{display:block}

/* ---------- STORY ---------- */
.ssp-page .story{background:#10181d;color:#f7fbfd;position:relative}
.ssp-page .story:before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 70% 28%,#19667a30,transparent 48%),radial-gradient(ellipse at 12% 76%,color-mix(in srgb,var(--coral) 13%,transparent),transparent 42%);pointer-events:none}
.ssp-page .story .eyebrow{color:#7ee3f2}
/* One viewport plus ~85vh of travel per panel: 6 panels gives the
   concept's 610vh. */
.ssp-page .story-scroll{height:calc(100vh + var(--slide-count,6) * 85vh);position:relative}
.ssp-page .story-sticky{height:calc(100svh - var(--navh) - var(--railh));min-height:0;position:sticky;top:calc(var(--navh) + var(--railh));display:flex;align-items:center;overflow:hidden;z-index:2}
.ssp-page .story-inner{width:min(1220px,calc(100% - 64px));margin:auto}
.ssp-page .story-top{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:30px}
.ssp-page .story-top h2{font-size:clamp(38px,5vw,70px);letter-spacing:-.06em;line-height:1;margin:10px 0}
.ssp-page .story-top p{max-width:360px;font-size:14px;line-height:1.5;color:#bacbd0;margin:0}
.ssp-page .story-window{overflow:hidden;width:100%}
.ssp-page .story-track{display:flex;gap:18px;will-change:transform}
.ssp-page .story-slide{flex:0 0 min(690px,70vw);height:390px;background:#edf6f7;color:var(--ink);border-radius:27px;padding:38px;display:grid;grid-template-columns:1fr .7fr;gap:22px;align-items:center;box-shadow:0 20px 65px #51201716}
.ssp-page .story-slide:nth-child(2n){background:#17191a;color:#fff}
.ssp-page .story-slide:nth-child(2n) p{color:#bbb}
.ssp-page .story-slide .step{font-size:12px;letter-spacing:.12em;font-weight:950;color:var(--red)}
.ssp-page .story-slide:nth-child(2n) .step{color:var(--coral2)}
.ssp-page .story-slide h3{font-size:clamp(30px,3.1vw,48px);line-height:1;letter-spacing:-.06em;margin:16px 0}
.ssp-page .story-slide p{font-size:14px;line-height:1.6;color:#62696a}
.ssp-page .story-graphic{height:260px;border-radius:20px;background:linear-gradient(145deg,color-mix(in srgb,var(--coral) 24%,#fff),color-mix(in srgb,var(--coral) 10%,#fff));display:grid;place-items:center;position:relative;overflow:hidden;isolation:isolate}
.ssp-page .story-graphic:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 70% 20%,#ffffff55,transparent 60%);pointer-events:none}
.ssp-page .story-graphic .big{font-size:80px;position:absolute;top:12px;right:18px;opacity:.14;filter:drop-shadow(0 15px 18px #00000015);animation:ssp-float 5s ease-in-out infinite}
.ssp-page .story-slide:nth-child(2n) .story-graphic{background:linear-gradient(145deg,#2e3436,#131617)}
.ssp-page .story-ui{position:relative;z-index:2;width:90%;max-width:245px;background:#fff;border:1px solid #e1e8ea;border-radius:15px;padding:17px;box-shadow:0 15px 35px #06131b20;display:flex;flex-direction:column;gap:8px;transform:perspective(600px) rotateY(-8deg) rotateX(3deg);transition:transform .55s;color:var(--ink)}
.ssp-page .story-slide:nth-child(2n) .story-ui{background:#222d33;color:#fff;border-color:#52616b}
.ssp-page .story-ui b{font-size:12px;line-height:1.3;margin-bottom:5px}
.ssp-page .story-ui i{font-style:normal;font-size:10px;border-radius:6px;padding:8px 9px;background:#eaf2f3;color:#34454a}
.ssp-page .story-slide:nth-child(2n) .story-ui i{background:#34444b;color:#e7f4f7}
.ssp-page .story-slide:hover .story-ui{transform:perspective(600px) rotateY(0deg) rotateX(0deg) translateY(-5px)}
.ssp-page .story-meter{height:4px;background:#ffffff25;margin-top:26px;border-radius:99px;overflow:hidden}
.ssp-page .story-meter span{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--coral),#53d9ec)}
.ssp-page .story-index{display:flex;align-items:center;gap:8px;margin-top:14px;font-size:10px;font-weight:900;letter-spacing:.12em;color:#c6d9dd}
.ssp-page .story-index span{display:inline-flex;align-items:center;justify-content:center;width:23px;height:23px;border-radius:50%;border:1px solid #7f9aa4;color:#c6d9dd;transition:.2s}
.ssp-page .story-index span.on{background:#68d8e8;border-color:#68d8e8;color:#102027}
.ssp-page .story-index em{font-style:normal;margin-left:8px}

/* ---------- LAB ---------- */
.ssp-page .lab{background:#e9ecea;padding:105px 0;color:#12191d;position:relative;overflow:hidden}
.ssp-page .lab:before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 95% 10%,#b9dee466,transparent 45%),radial-gradient(ellipse at 0% 90%,color-mix(in srgb,var(--coral) 28%,transparent),transparent 40%);pointer-events:none}
.ssp-page .lab .sectionhead{margin-bottom:28px;position:relative}
.ssp-page .lab .sectionhead h2{font-size:clamp(37px,4.3vw,64px)}
.ssp-page .lab .sectionhead .hl{color:var(--red)}
.ssp-page .lab-layout{position:relative;display:grid;grid-template-columns:.95fr 1.05fr;gap:28px;align-items:start}
.ssp-page .lab-controls{display:grid;gap:17px}
.ssp-page .lab-step{background:#fff;border:1px solid #d8dfdf;border-radius:20px;padding:19px 20px;margin:0;min-width:0}
.ssp-page .lab-step legend{font-size:13px;font-weight:900;margin-bottom:13px;padding:0;float:left;width:100%}
.ssp-page .lab-step legend + *{clear:both}
.ssp-page .lab-step .stepno{font-size:10px;color:var(--red);font-weight:950;letter-spacing:.13em;margin-bottom:6px}
.ssp-page .choices{display:flex;gap:8px;flex-wrap:wrap}
.ssp-page .choice{border:1px solid #d6dcdb;border-radius:999px;background:#f7f9f8;color:#30393d;font-size:12px;font-weight:850;padding:10px 14px;transition:.2s}
.ssp-page .choice:hover{border-color:var(--red);transform:translateY(-2px)}
.ssp-page .choice.selected{background:#182428;border-color:#182428;color:#fff}
.ssp-page .choice-icon{margin-right:6px}
.ssp-page .lab-step input[type=range]{width:100%;accent-color:var(--coral);cursor:pointer}
.ssp-page .lab-range{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#657075;margin-bottom:10px}
.ssp-page .lab-range strong{font-size:25px;letter-spacing:-.04em;color:#11191c}
.ssp-page .lab-note{font-size:11px;color:#647174;line-height:1.5;margin:0}
.ssp-page .lab-preview{position:sticky;top:calc(var(--navh) + var(--railh) + 18px);background:#121b20;color:#fff;border-radius:27px;overflow:hidden;border:1px solid #28383f;box-shadow:0 22px 60px #1a343522}
.ssp-page .lab-preview-top{padding:21px 23px 18px;border-bottom:1px solid #2b3940;display:flex;justify-content:space-between;gap:10px;align-items:center}
.ssp-page .lab-preview-top strong{font-size:13px;letter-spacing:.12em}
.ssp-page .lab-live{font-size:10px;color:#8ee8c6;font-weight:900;white-space:nowrap}
.ssp-page .lab-live:before{content:"●";margin-right:7px}
.ssp-page .lab-screen{padding:24px}
.ssp-page .lab-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px;margin-bottom:20px}
.ssp-page .lab-kpi{background:#1c2a30;border:1px solid #30434b;border-radius:13px;padding:14px 10px}
.ssp-page .lab-kpi small{font-size:10px;color:#9eb1b9;display:block;margin-bottom:8px}
.ssp-page .lab-kpi strong{font-size:clamp(16px,2vw,25px);letter-spacing:-.05em}
.ssp-page .lab-chart{border:1px solid #31434a;border-radius:15px;padding:15px;background:#152127}
.ssp-page .lab-chart-label{font-size:11px;color:#a7c4cb;font-weight:900;margin-bottom:8px}
.ssp-page .lab-chart svg{display:block;width:100%;height:auto}
.ssp-page .lab-funnel{display:grid;grid-template-columns:repeat(var(--funnel-count,4),1fr);gap:5px;margin-top:17px}
.ssp-page .lab-funnel span{font-size:10px;text-align:center;padding:12px 4px;border-radius:9px;background:#263740;color:#c8dbe1}
.ssp-page .lab-funnel span:last-child{background:#31594d;color:#b5ffdf}
.ssp-page .lab-summary{margin-top:18px;background:#1d3034;border:1px solid #35565a;border-radius:15px;padding:17px}
.ssp-page .lab-summary h3{margin:0 0 8px;font-size:15px}
.ssp-page .lab-summary p{font-size:12px;color:#b4ccd0;line-height:1.6;margin:0}
.ssp-page .lab-action{display:flex;flex-wrap:wrap;gap:9px;margin-top:16px}
.ssp-page .lab-action button{border:0;background:var(--coral);color:#111;padding:13px 18px;border-radius:999px;font-size:12px;font-weight:950;cursor:pointer}
.ssp-page .lab-action a{border:1px solid #52656b;padding:12px 17px;border-radius:999px;font-size:12px;font-weight:850}
.ssp-page .lab-disclaimer{color:#a5b7bd;font-size:10px;line-height:1.55;margin:14px 0 0}

/* ---------- LEAD MODAL ---------- */
/* Above the site header, whose z-index already sits at the maximum; later
   in the DOM wins the tie. */
.ssp-page .lead-modal{position:fixed;inset:0;z-index:2147483647;background:#080c0de0;display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto}
.ssp-page .lead-panel{background:#fff;color:#172024;border-radius:24px;padding:28px;width:min(520px,100%);position:relative;max-height:calc(100svh - 32px);overflow:auto}
.ssp-page .lead-panel h2{font-size:30px;letter-spacing:-.05em;line-height:1.1;margin:8px 0}
.ssp-page .lead-panel p{font-size:13px;color:#59666b;line-height:1.6}
.ssp-page .lead-close{position:absolute;top:15px;right:15px;background:#eff2f2;border:0;border-radius:50%;width:34px;height:34px;font-size:20px;line-height:1}
.ssp-page .lead-form{display:grid;gap:12px;margin-top:20px}
.ssp-page .lead-form label{display:grid;gap:5px;font-size:12px;font-weight:850}
.ssp-page .lead-form input,.ssp-page .lead-form textarea{width:100%;border:1px solid #cbd2d4;border-radius:10px;padding:11px 12px;background:#fff;color:#14191b;font-size:14px;font-weight:400}
.ssp-page .lead-form input[aria-invalid=true]{border-color:var(--red)}
.ssp-page .lead-form textarea{min-height:72px;resize:vertical}
.ssp-page .lead-form .consent{display:flex;align-items:flex-start;gap:9px;font-weight:500;line-height:1.5}
.ssp-page .lead-form .consent input{width:auto;margin-top:3px}
.ssp-page .lead-form button[type=submit]{background:#151d20;color:#fff;border:0;border-radius:99px;padding:14px;font-weight:900}
.ssp-page .lead-form button[type=submit]:disabled{opacity:.6;cursor:wait}
.ssp-page .lead-form .field-error{display:block;color:var(--red);font-size:11px;font-weight:700}
.ssp-page .lead-form .status{font-size:12px;margin:0;color:var(--red)}
.ssp-page .lead-form .status.ok{color:#23704d}

/* ---------- DIFFERENCE ---------- */
.ssp-page .difference{background:#fff}
.ssp-page .diff-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:38px;align-items:center}
.ssp-page .diff-grid.no-art{grid-template-columns:minmax(0,860px)}
.ssp-page .diff-art{position:relative;background:color-mix(in srgb,var(--coral) 22%,#fff);border-radius:32px;min-height:520px;display:grid;place-items:center;overflow:hidden}
.ssp-page .diff-art img{width:95%;max-width:450px;mix-blend-mode:multiply;filter:saturate(.92)}
.ssp-page .diff-art .label{position:absolute;left:25px;top:24px;background:#fff;border-radius:999px;padding:10px 15px;font-weight:900;font-size:11px;z-index:2}
.ssp-page .diff-copy h2{font-size:clamp(39px,4.6vw,65px);line-height:1;letter-spacing:-.06em;margin:15px 0}
.ssp-page .diff-copy p{line-height:1.65;color:#62696d}
.ssp-page .diff-list{margin-top:24px}
.ssp-page .diff-row{padding:17px 0;border-top:1px solid #ddd;display:grid;grid-template-columns:26px 1fr;gap:10px}
.ssp-page .diff-row strong{font-size:15px}
.ssp-page .diff-row small{display:block;color:#697071;margin-top:5px;line-height:1.5;font-size:13px}
.ssp-page .diff-row .tick{color:var(--red);font-weight:950}

/* ---------- CASES ---------- */
.ssp-page .case{background:#151819;color:#fff}
.ssp-page .case .sectionhead p{color:#b5b9ba}
.ssp-page .case-v2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.ssp-page .case-v2-card{border:1px solid #364047;border-radius:22px;background:#1c2428;overflow:hidden;display:flex;flex-direction:column;transition:transform .35s,border-color .35s}
.ssp-page.fx .case-v2-card.reveal{transition:opacity .8s,transform .8s,border-color .35s}
.ssp-page .case-v2-card:hover{border-color:var(--coral);transform:translateY(-4px)}
.ssp-page .case-v2-visual{min-height:155px;padding:24px;background:radial-gradient(circle at 85% 10%,color-mix(in srgb,var(--coral2) 33%,transparent),transparent 42%),linear-gradient(135deg,var(--red),var(--coral));display:flex;flex-direction:column;justify-content:center;gap:9px}
.ssp-page .case-v2-visual.has-image{padding:0;aspect-ratio:16/9;min-height:0;overflow:hidden}
.ssp-page .case-v2-visual.has-image img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.ssp-page .case-v2-card:hover .case-v2-visual.has-image img{transform:scale(1.03)}
.ssp-page .case-v2-visual .big-number{font-size:clamp(27px,4vw,51px);line-height:1;font-weight:950;letter-spacing:-.06em;text-transform:uppercase}
.ssp-page .case-v2-visual small{display:block;font-size:11px;color:#ffe8e4}
.ssp-page .case-v2-body{padding:22px;flex:1;display:flex;flex-direction:column}
.ssp-page .case-v2-body .label{font-size:10px;letter-spacing:.13em;color:var(--coral2);font-weight:950;text-transform:uppercase}
.ssp-page .case-v2-body h3{font-size:23px;line-height:1.17;letter-spacing:-.04em;margin:12px 0}
.ssp-page .case-v2-body p{font-size:13px;color:#b5c0c4;line-height:1.65;margin:0 0 4px}
.ssp-page .case-v2-body .more{color:color-mix(in srgb,var(--coral2) 70%,#fff);font-weight:900;font-size:12px;margin-top:auto;padding-top:16px}

/* ---------- RELATED ---------- */
.ssp-page .connected{background:#f1eee8}
.ssp-page .linkgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.ssp-page .linkcard{background:#fff;border:1px solid #dedbd4;border-radius:19px;padding:24px;min-height:230px;transition:.25s;display:flex;flex-direction:column}
.ssp-page.fx .linkcard.reveal{transition:opacity .8s,transform .8s,border-color .25s}
.ssp-page .linkcard:hover{transform:translateY(-4px);border-color:var(--coral)}
.ssp-page .linkcard .arrow{font-size:23px;color:var(--red)}
.ssp-page .linkcard h3{font-size:19px;letter-spacing:-.04em;margin:22px 0 8px}
.ssp-page .linkcard p{font-size:12px;color:#6b7274;line-height:1.6;margin:0 0 14px}
.ssp-page .linkcard small{font-size:11px;color:var(--red);font-weight:900;margin-top:auto}

/* ---------- INSIGHTS ---------- */
.ssp-page .insights{background:#fff}
/* SwitchWord (shared with the service pages) types the heading's last
   word; the concept styles it as an accent word with a bar caret. */
.ssp-page .svc-switch-word{display:inline-block;white-space:nowrap;text-align:left;color:var(--coral)}
.ssp-page .svc-switch-word::after{content:"";display:inline-block;width:3px;height:.8em;margin-left:5px;vertical-align:-.04em;background:currentColor}
.ssp-page .bloggrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.ssp-page .blogcard{border:1px solid #ddd;border-radius:23px;overflow:hidden;display:flex;flex-direction:column;min-height:480px;background:#fff;transition:border-color .25s}
.ssp-page.fx .blogcard.reveal{transition:opacity .8s,transform .8s,border-color .25s}
.ssp-page .blogcard:hover{border-color:var(--coral)}
/* Featured images are wide banners (1440x520), so they show at their own
   ratio rather than cropped into the concept's 215px box. The concept's
   gradient stays as the backdrop for a post with no image. */
.ssp-page .blogimg{overflow:hidden;background:linear-gradient(130deg,#e3edf8,#e9f0ef)}
.ssp-page .blogimg:empty{height:215px}
.ssp-page .blogcard:nth-child(3n+2) .blogimg{background:linear-gradient(130deg,#f4e7dd,#e9e6f7)}
.ssp-page .blogcard:nth-child(3n) .blogimg{background:linear-gradient(130deg,#dce9f3,#f4ece4)}
.ssp-page .blogimg img{display:block;width:100%;height:auto;transition:transform .5s}
.ssp-page .blogcard:hover .blogimg img{transform:scale(1.03)}
.ssp-page .blogbody{padding:25px;display:flex;flex-direction:column;flex:1}
.ssp-page .blogbody small{color:var(--red);font-size:10px;font-weight:950;letter-spacing:.13em;text-transform:uppercase}
.ssp-page .blogbody h3{font-size:21px;line-height:1.23;letter-spacing:-.04em;margin:19px 0 13px}
.ssp-page .blogbody p{color:#6b7375;font-size:13px;line-height:1.65;margin:0 0 22px}
.ssp-page .blogbody .more{margin-top:auto;font-weight:900;font-size:12px;color:var(--red)}

/* ---------- FAQ ---------- */
.ssp-page .faq{background:#f6f4f0}
.ssp-page .faqgrid{display:grid;grid-template-columns:.8fr 1.2fr;gap:50px}
.ssp-page .faq h2{font-size:clamp(39px,4.8vw,66px);line-height:1;letter-spacing:-.06em;margin:15px 0}
.ssp-page .faq details{border-bottom:1px solid #d5d4cf;padding:19px 0}
.ssp-page .faq summary{list-style:none;display:flex;justify-content:space-between;gap:20px;cursor:pointer;font-weight:850;font-size:15px}
.ssp-page .faq summary::-webkit-details-marker{display:none}
.ssp-page .faq summary:after{content:"+";color:var(--red);font-size:22px;line-height:1}
.ssp-page .faq details[open] summary:after{content:"−"}
.ssp-page .faq details p{font-size:13px;line-height:1.7;color:#687071;max-width:650px;margin:1em 0 0}

/* ---------- FINAL ---------- */
.ssp-page .final{background:#141718;color:#fff;padding:100px 0}
.ssp-page .final-inner{border:1px solid #3a3e40;background:radial-gradient(circle at 85% 20%,color-mix(in srgb,var(--coral) 19%,transparent),transparent 36%),#1a1d1e;border-radius:30px;padding:70px;display:flex;align-items:center;justify-content:space-between;gap:40px}
.ssp-page .final h2{font-size:clamp(40px,5.2vw,72px);line-height:1;letter-spacing:-.06em;max-width:760px;margin:15px 0}
.ssp-page .final p{color:#aeb5b6;line-height:1.6}
.ssp-page .final .btn{flex:none}

/* globals.css applies a site-wide reduced-motion rule that zeroes every
   animation-duration with !important, which parks looping animations on
   their last keyframe (the tapes stop mid-slide, the floats freeze). Same
   re-assert as the service pages; see ServicePageStyles.js. */
@media(prefers-reduced-motion:reduce){
  .ssp-page .tape-line{animation-duration:35s !important}
  .ssp-page .hero-tag,.ssp-page .story-graphic .big{animation-duration:5s !important}
}

/* Short laptop screens: the pinned story stage has less height to fit
   its heading and panel into. */
@media(min-width:701px) and (max-height:820px){
  .ssp-page .story-top{margin-bottom:18px}
  .ssp-page .story-top h2{font-size:clamp(32px,4vw,52px)}
  .ssp-page .story-slide{height:330px;padding:30px}
  .ssp-page .story-graphic{height:220px}
  .ssp-page .story-meter{margin-top:16px}
}

@media(max-width:980px){
  .ssp-page .hero-grid{grid-template-columns:1fr 1fr;gap:12px}
  .ssp-page .hero h1{font-size:65px}
  .ssp-page .hero-art{height:460px;min-height:350px}
  .ssp-page .problem-grid,.ssp-page .offer-grid,.ssp-page .bloggrid,.ssp-page .linkgrid{grid-template-columns:repeat(2,1fr)}
  .ssp-page .diff-grid{gap:20px}
  .ssp-page .story-slide{flex-basis:78vw}
}
@media(max-width:800px){
  .ssp-page .lab-layout{grid-template-columns:1fr}
  .ssp-page .lab-preview{position:relative;top:auto}
  .ssp-page .case-v2{grid-template-columns:1fr}
}
@media(max-width:700px){
  .ssp-page .wrap{width:calc(100% - 34px)}
  .ssp-page .hero-grid{min-height:unset;grid-template-columns:1fr;padding-top:34px;gap:0}
  .ssp-page .crumb{margin-bottom:18px}
  .ssp-page .hero h1{font-size:clamp(49px,13vw,76px)}
  .ssp-page .hero .lead{font-size:14px}
  .ssp-page .hero-art{height:340px;min-height:0;max-height:none;margin-top:-4px}
  .ssp-page .hero-art.no-image{height:auto;min-height:0;padding:18px 0}
  .ssp-page .hero-art.no-image:before{display:none}
  .ssp-page .hero-art.no-image .hero-tag{position:static;display:inline-block;margin:0 6px 6px 0;animation:none}
  .ssp-page .hero-art.no-image{display:block}
  .ssp-page .hero-art img{height:330px;width:auto;max-width:100%}
  .ssp-page .hero-tag{font-size:9px;padding:8px 10px}
  .ssp-page .hero-tag.one{left:1%;top:12%}
  .ssp-page .hero-tag.two{right:0;bottom:10%}
  .ssp-page .hero-tag.three{right:0;top:12%}
  .ssp-page .herobottom{gap:9px 20px;font-size:10px}
  .ssp-page .section{padding:75px 0}
  .ssp-page .sectionhead{margin-bottom:28px}
  .ssp-page .sectionhead h2{font-size:clamp(36px,9vw,50px)}
  .ssp-page .problem-grid,.ssp-page .offer-grid,.ssp-page .bloggrid,.ssp-page .case-v2,.ssp-page .linkgrid,.ssp-page .diff-grid,.ssp-page .faqgrid{grid-template-columns:1fr}
  .ssp-page .faqgrid{gap:10px}
  .ssp-page .problem{min-height:215px}
  .ssp-page .offer{min-height:0}
  .ssp-page .diff-art{min-height:380px}
  .ssp-page .diff-art img{max-width:320px}
  /* No pin on phones: the panels stack. */
  .ssp-page .story-scroll{height:auto}
  .ssp-page .story-sticky{position:relative;top:auto;height:auto;min-height:0;padding:65px 0}
  .ssp-page .story-inner{width:calc(100% - 34px)}
  .ssp-page .story-top{display:block}
  .ssp-page .story-top h2{font-size:40px}
  .ssp-page .story-top p{margin-top:12px}
  .ssp-page .story-window{overflow:visible}
  .ssp-page .story-track{display:grid;gap:13px;transform:none !important}
  .ssp-page .story-slide{height:auto;min-height:290px;grid-template-columns:1fr 100px;gap:10px;padding:20px;border-radius:19px}
  .ssp-page .story-slide h3{font-size:30px}
  .ssp-page .story-slide p{font-size:12px}
  .ssp-page .story-graphic{height:170px}
  .ssp-page .story-graphic .big{font-size:38px}
  .ssp-page .story-ui{padding:10px;gap:4px}
  .ssp-page .story-ui b{font-size:10px}
  .ssp-page .story-ui i{font-size:8px;padding:5px}
  .ssp-page .story-meter,.ssp-page .story-index{display:none}
  .ssp-page .lab{padding:70px 0}
  .ssp-page .lab-screen{padding:14px}
  .ssp-page .lab-kpi{padding:12px 7px}
  .ssp-page .lab-kpi strong{font-size:17px}
  .ssp-page .lab-funnel span{font-size:9px}
  .ssp-page .tape-line{font-size:17px}
  .ssp-page .case-v2-visual{min-height:125px}
  .ssp-page .lead-panel{padding:22px}
  .ssp-page .blogcard{min-height:0}
  .ssp-page .blogimg:empty{height:190px}
  .ssp-page .final{padding:70px 0}
  .ssp-page .final-inner{padding:28px;display:block}
  .ssp-page .final h2{font-size:40px}
  .ssp-page .final .btn{margin-top:14px}
}
`}</style>
    </>
  );
}
