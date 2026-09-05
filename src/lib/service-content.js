// Content + theme for the service pages, ported verbatim from
// design-concepts/ABN_Digital_Marketing_V4_1_V3_Locked_Refinement.html.
//
// This is deliberately shaped as one plain data object per service rather
// than being inlined into the components: all five service pages share the
// same layout and differ only in copy, colours and character art, so when
// the ACF field group is set up in WordPress the only change needed is to
// build this same shape from `post.acf` (see getServiceContent below) —
// no component touches required.
//
// The ACF field names below mirror these keys 1:1, so the mapping stays
// mechanical.

import { mergeServiceContent } from "./acf-merge";
import { acf as ACF_DIGITAL_MARKETING } from "../../acf/content/digital-marketing.mjs";
import { acf as ACF_WEB_GRAPHIC_DESIGN } from "../../acf/content/web-and-graphic-design.mjs";
import { acf as ACF_WEB_DEVELOPMENT } from "../../acf/content/web-development.mjs";
import { acf as ACF_VIDEO_PRODUCTION } from "../../acf/content/video-production.mjs";
import { acf as ACF_WEB_DATA_SECURITY } from "../../acf/content/web-data-security.mjs";

export const SERVICE_THEME_DEFAULT = {
  // --coral / --red / --cyan in the concept. These three are what actually
  // change per service; everything else in the palette is shared chrome.
  primary: "#f56f5d",
  primaryLight: "#ff856f",
  accent: "#db3f32",
  secondary: "#52c5e8",
  ink: "#0b0d0f",
  cream: "#fff6ef",
  paper: "#fffaf6",
};

const DIGITAL_MARKETING = {
  slug: "digital-marketing",
  title: "Digital Marketing",
  metaDescription:
    "Paid media, SEO, social, CRM and analytics working together as one connected growth system — not isolated marketing activities.",
  theme: SERVICE_THEME_DEFAULT,

  hero: {
    eyebrow: "Digital Marketing · ABN Junction",
    // The headline is split so the middle word can be tinted and the last
    // word can run the kinetic wipe, exactly as the concept marks it up.
    headingBefore: "WE TURN",
    headingHighlight: "ATTENTION",
    headingAfter: "INTO",
    headingKinetic: "GROWTH.",
    description:
      "Paid media, SEO, social, CRM and analytics working together as one connected growth system — not isolated marketing activities.",
    ctaPrimary: { label: "Build My Growth Strategy →", href: "https://abnjunction.com/contact-us/" },
    ctaSecondary: { label: "See Marketing Results", href: "/case-studies" },
    // prefix / value / suffix are separate so ACF can edit the symbols
    // independently of the number, and so only the digits animate.
    stats: [
      { prefix: "", value: "13", suffix: "×", label: "Peak ROAS" },
      { prefix: "", value: "6,500", suffix: "+", label: "Leads generated" },
      { prefix: "", value: "5", suffix: "", label: "Connected pillars" },
    ],
    systemLabel: { idle: "SIGNALS", locked: "CONNECTED SYSTEM" },
    character: "/services/digital-marketing/hero-character.png",
    // The glyphs are the concept's own single-character tool marks.
    tools: [
      { glyph: "G", label: "Google Ads" },
      { glyph: "∞", label: "Meta Ads" },
      { glyph: "⌕", label: "SEO" },
      { glyph: "▥", label: "GA4 / GTM" },
      { glyph: "◉", label: "CRM" },
      { glyph: "W", label: "WhatsApp" },
    ],
  },

  journey: {
    eyebrow: "One journey · multiple channels",
    // Split so the last word can cycle through synonyms (the switch-word
    // animation). Both halves are ACF-editable; the switch list is a
    // comma-separated field.
    headingBefore: "Scroll through the growth",
    headingSwitch: ["engine", "system"],
    description:
      "Each channel has a job. The advantage comes from how strategy, creative, technology and measurement connect them.",
    scenes: [
      {
        num: "01 · ORGANIC DEMAND",
        title: "Search Engine Optimization",
        description:
          "Build discoverability around what people are already searching for. Technical foundations, intent-led content and scalable architecture work together to compound organic visibility.",
        chips: ["Technical SEO", "Content SEO", "Local SEO", "E-commerce SEO"],
        link: { label: "Explore SEO →", href: "https://abnjunction.com/services/digital-marketing/seo/" },
        image: "/services/digital-marketing/scene-1.png",
      },
      {
        num: "02 · PAID ACQUISITION",
        title: "Performance Marketing",
        description:
          "Search, Shopping, PMax, Meta and Microsoft campaigns engineered around commercial outcomes — not vanity traffic.",
        chips: ["Google Ads", "Meta Ads", "Shopping / PMax", "Microsoft Ads"],
        link: { label: "Explore Performance Marketing →", href: "#" },
        image: "/services/digital-marketing/scene-2.png",
      },
      {
        num: "03 · SOCIAL GROWTH",
        title: "Social Media Growth",
        description:
          "Paid and organic social working together: content, creative testing, communities, lead generation and retargeting built around the audience journey.",
        chips: ["Meta Lead Gen", "Organic Social", "Retargeting", "Creative Testing"],
        link: {
          label: "Explore Social Media →",
          href: "https://abnjunction.com/services/digital-marketing/social-media-marketing/",
        },
        image: "/services/digital-marketing/scene-3.png",
      },
      {
        num: "04 · NURTURE & RETENTION",
        title: "Email, WhatsApp & CRM",
        description:
          "Turn enquiries into conversations and conversations into customers. Connect follow-ups, reminders, segmentation and lifecycle messaging instead of letting leads disappear.",
        chips: ["WhatsApp", "Email", "CRM", "Automation"],
        link: {
          label: "Explore CRM & Messaging →",
          href: "https://abnjunction.com/services/digital-marketing/email-whatsapp-marketing/",
        },
        image: "/services/digital-marketing/scene-4.png",
      },
      {
        num: "05 · MEASUREMENT",
        title: "Analytics & Conversion Tracking",
        description:
          "Know what actually worked. GA4, GTM, enhanced conversions, e-commerce tracking and clean event architecture make optimisation possible.",
        chips: ["GA4", "GTM", "Enhanced Conversions", "Attribution"],
        link: { label: "Explore Tracking & Analytics →", href: "#" },
        image: "/services/digital-marketing/scene-5.png",
      },
      {
        num: "06 · ADVANCED MEDIA",
        title: "Programmatic & Audience Activation",
        description:
          "Extend reach intelligently with audience strategy, display, remarketing and advanced media where they genuinely support the growth plan.",
        chips: ["Programmatic", "Display", "Remarketing", "Audience Strategy"],
        link: { label: "Explore Advanced Media →", href: "#" },
        image: "/services/digital-marketing/scene-6.png",
      },
    ],
  },

  marquee: {
    rowOne:
      "GOOGLE ADS ✦ META ADS ✦ SEO ✦ PERFORMANCE MARKETING ✦ CRM ✦ ANALYTICS ✦ SOCIAL MEDIA ✦ EMAIL ✦ WHATSAPP ✦ MICROSOFT ADS",
    rowTwo:
      "TECHNICAL SEO ✦ SHOPPING ✦ PMAX ✦ LEAD GENERATION ✦ RETARGETING ✦ GA4 ✦ GTM ✦ AUTOMATION ✦ CONTENT ✦ CRO",
  },

  system: {
    eyebrow: "Connected marketing",
    headingBefore: "Marketing is not seven services. It’s",
    headingKinetic: "one system.",
    description:
      "Search, paid media, creative, landing experiences, CRM and analytics should not behave like separate departments. We connect them around one commercial journey.",
    nodes: [
      { num: "01 · ATTRACT", title: "Find demand", description: "SEO, Google Ads and Meta put you in front of the right intent and audiences." },
      { num: "02 · ENGAGE", title: "Earn attention", description: "Creative, content, social and landing experiences turn visibility into interest." },
      { num: "03 · CONVERT", title: "Remove friction", description: "CRO, messaging and conversion-focused journeys help people act." },
      { num: "04 · MEASURE", title: "Trust the data", description: "GA4, GTM and conversion tracking connect actions back to outcomes." },
      { num: "05 · IMPROVE", title: "Compound gains", description: "Testing, budget shifts and iteration turn learnings into better performance." },
    ],
  },

  cinema: {
    eyebrow: "FROM SIGNAL TO SALE · ONE CONNECTED JOURNEY",
    words: ["ATTENTION", "INTENT", "CONVERSION", "GROWTH"],
    description:
      "Scroll through the journey. Search creates intent, creative earns attention, performance captures demand and measurement sends the learning back into the system.",
    depthCards: [
      { label: "SEARCH", title: "high-intent query", note: "“best solution near me”" },
      { label: "CREATIVE", title: "message + visual", note: "attention earned" },
      { label: "LANDING", title: "intent matched", note: "friction ↓ relevance ↑" },
      { label: "MEASUREMENT", title: "signal returned", note: "GA4 · CRM · revenue" },
    ],
    // The concept clones scene images 1, 3 and 2 (in that order) for the
    // three hand-off characters rather than shipping separate art.
    handoff: [
      { image: "/services/digital-marketing/scene-1.png", roleFx: "↑ RANKS · SEO · ORGANIC", caption: "SEO · RANKINGS · ORGANIC DEMAND" },
      { image: "/services/digital-marketing/scene-3.png", roleFx: "◎ META · CONTENT · ENGAGEMENT", caption: "SOCIAL · CREATIVE · COMMUNITY" },
      { image: "/services/digital-marketing/scene-2.png", roleFx: "₹ ROAS · LEADS · REVENUE", caption: "PAID MEDIA · CONVERSION · REVENUE" },
    ],
    scrollHint: "SCROLL · WATCH THE JOURNEY CONNECT",
  },

  proof: {
    eyebrow: "Selected performance signals",
    headingBefore: "Proof that",
    headingKinetic: "moves business.",
    items: [
      { prefix: "", value: "13", suffix: "×", label: "Highest recorded ROAS" },
      { prefix: "", value: "6,500", suffix: "+", label: "Leads generated" },
      { prefix: "₹", value: "7.5", suffix: "M+", label: "Revenue generated" },
      { prefix: "", value: "360", suffix: "°", label: "Connected measurement" },
    ],
  },

  cases: {
    // case_study_category term ID, so each service shows its own work.
    // Live terms: 14 digital-marketing, 15 web-graphics-deisgn (sic),
    // 16 web-development. Video production and security have no case
    // studies categorised yet — those pass null and fall back to the three
    // most recent from any category. Overridden per page by the ACF
    // "Show case studies from" field.
    categoryId: 14,
    eyebrow: "Digital Marketing case studies",
    headingBefore: "See the case studies behind the",
    headingSwitch: ["ideas", "impact"],
    description:
      "Proof should show the challenge, the connected decisions and the commercial outcome — not just a screenshot of an ad account.",
    items: [
      {
        art: "13×",
        category: "PAID MEDIA + SEO",
        title: "TimeTec24 growth system",
        description: "Performance marketing, shopping and organic visibility working as one commercial engine.",
        href: "/case-studies/shopify-seo-indexing-fix-turbolader24",
      },
      {
        art: "730%",
        category: "MULTI-SERVICE GROWTH",
        title: "Moonbakes: smarter strategies",
        description: "Paid media, creative and website improvements connected around measurable revenue.",
        href: "/case-studies/moonbakes-baking-up-digital-success-with-smarter-strategies",
      },
      {
        art: "1,270+",
        category: "LEAD GENERATION",
        title: "Arena: admissions growth",
        description: "High-intent paid traffic and creative optimisation supporting a stronger admissions pipeline.",
        href: "/case-studies/arena-animation-velachery",
      },
    ],
  },

  method: {
    eyebrow: "How ABN works",
    headingBefore: "Understand. Strategise. Execute. Measure.",
    headingSwitch: ["Improve", "Compound"],
    steps: [
      { num: "01 · UNDERSTAND", title: "Start with the business.", description: "Commercial goals, demand, margins, audience, geography and current data come before channel choice." },
      { num: "02 · STRATEGISE", title: "Build the connected plan.", description: "We decide which channels should acquire, nurture, convert and measure — and what each one needs from the others." },
      { num: "03 · EXECUTE", title: "Launch with precision.", description: "Campaigns, content, creative, landing journeys and tracking go live as one coordinated system." },
      { num: "04 · MEASURE", title: "Watch what moves.", description: "We separate useful signals from noise and connect platform metrics to meaningful business outcomes." },
      { num: "05 · IMPROVE", title: "Compound what works.", description: "Testing, optimisation and cross-channel learning keep the growth system evolving." },
    ],
  },

  characterBreak: {
    eyebrow: "A little ABN personality",
    headingBefore: "Campaigns don’t improve by staring at",
    headingSwitch: ["dashboards", "spreadsheets"],
    description:
      "They improve when people understand why the numbers moved, test the right thing and connect the result back to the customer journey.",
    cta: { label: "Talk Through Your Growth Problem →", href: "https://abnjunction.com/contact-us/" },
    image: "/services/digital-marketing/fun-character.png",
    badges: ["CPA ↑ 😬", "Creative test →", "ROAS ↑ 😎"],
  },

  insights: {
    eyebrow: "From the people doing the work",
    headingBefore: "What we’re learning from the",
    headingSwitch: ["campaigns", "experiments"],
    items: [
      { category: "GOOGLE ADS", title: "How better signal quality changes campaign performance.", description: "Practical thinking around conversion data, bidding and the signals modern ad systems actually need.", href: "/blogs" },
      { category: "SEO", title: "Why technical SEO still decides whether scale is possible.", description: "Architecture, crawlability, indexing and intent — the foundations behind sustainable organic growth.", href: "/blogs" },
      { category: "CONVERSION", title: "Traffic is only useful when the journey makes sense.", description: "How messaging, UX, tracking and follow-up connect acquisition to revenue.", href: "/blogs" },
    ],
  },

  faq: {
    eyebrow: "Digital Marketing FAQs",
    heading: "Questions worth answering before you spend.",
    intro:
      "These are the practical questions businesses usually ask before choosing channels, budgets and an agency partner.",
    items: [
      { q: "What does a digital marketing agency actually do?", a: "A good agency connects acquisition, content, user journeys, measurement and optimisation around business outcomes instead of operating every channel in isolation." },
      { q: "Should I start with Google Ads, Meta Ads or SEO?", a: "It depends on demand, buying cycle, margins, competition, speed required and the quality of your existing website and tracking. Channel choice should follow the business problem." },
      { q: "How do you measure marketing ROI?", a: "We connect platform activity to meaningful actions such as qualified leads, sales, booked calls and revenue, then evaluate efficiency and quality rather than relying only on clicks or impressions." },
      { q: "Can ABN manage paid media and SEO together?", a: "Yes. This first-level page is deliberately structured around connected services because paid search, organic search, creative, CRO and analytics can strengthen each other." },
      { q: "Do you work with international businesses?", a: "Yes. Campaign structure, language, market demand, tracking and landing experience are adapted to the geography and commercial context." },
    ],
  },

  finalCta: {
    eyebrow: "Ready to connect the pieces?",
    headingBefore: "STOP MANAGING CHANNELS. START BUILDING A",
    headingKinetic: "GROWTH SYSTEM.",
    description:
      "Tell us what you are trying to grow. We’ll help identify what should attract, convert, measure and improve it.",
    ctaPrimary: { label: "Book a Strategy Call →", href: "https://abnjunction.com/contact-us/" },
    ctaSecondary: { label: "See Results", href: "/case-studies" },
  },
};

// Per-service palette. Derived from each service's base brand colour using
// the same relationship as the two supplied examples:
//   primary      = the base colour, essentially unchanged
//   primaryLight = the base lightened ~10-12% toward white
//   accent       = a darker, slightly desaturated shade — needed because the
//                  base is too light to read on the cream/white sections
// (#FF6D59 → f56f5d / ff856f / db3f32, and #F3C521 → f4c928 / ffdc55.)
// ACF's three colour pickers override these per page.
function theme(primary, primaryLight, accent) {
  return { ...SERVICE_THEME_DEFAULT, primary, primaryLight, accent };
}

const THEMES = {
  "digital-marketing": theme("#f56f5d", "#ff856f", "#db3f32"),
  "web-and-graphic-design": theme("#f4c928", "#ffdc55", "#c79a0d"),
  "web-development": theme("#4c8dff", "#7aa9ff", "#2f63c9"),
  "video-production": theme("#a66bff", "#c093ff", "#7b3fd1"),
  "web-data-security": theme("#2fbf9f", "#5fd6bb", "#1d8a72"),
};

// Which case_study_category each service pulls its cards from. null means
// "no matching category yet" and falls back to the most recent studies.
const CASE_CATEGORIES = {
  "digital-marketing": 14,
  "web-and-graphic-design": 15,
  "web-development": 16,
  "video-production": null,
  "web-data-security": null,
};

// Per-service copy, authored in acf/content/<slug>.mjs and seeded into
// WordPress from there. Importing the same files here means the built-in
// defaults are already correct per service, so a page renders its own copy
// even before WordPress has been seeded (and if WP is ever unreachable).
//
// These are ACF-shaped (flat, `hero_eyebrow`), so they go through the very
// same merge the live WP payload uses — one code path, no second copy of the
// content to keep in sync.

const ACF_CONTENT = {
  "digital-marketing": ACF_DIGITAL_MARKETING,
  "web-and-graphic-design": ACF_WEB_GRAPHIC_DESIGN,
  "web-development": ACF_WEB_DEVELOPMENT,
  "video-production": ACF_VIDEO_PRODUCTION,
  "web-data-security": ACF_WEB_DATA_SECURITY,
};

function service(slug, title) {
  // Digital Marketing's object is the structural base: it supplies the shape,
  // the artwork paths and anything a content file leaves out (images, chiefly).
  const base = {
    ...DIGITAL_MARKETING,
    slug,
    title,
    theme: THEMES[slug] || SERVICE_THEME_DEFAULT,
    cases: { ...DIGITAL_MARKETING.cases, categoryId: CASE_CATEGORIES[slug] ?? null },
  };

  const content = ACF_CONTENT[slug];
  return content ? mergeServiceContent(base, content) : base;
}

// Keyed by the slug used in the live URL (abnjunction.com/services/<slug>/),
// verified against the live WP pages (children of page 1023).
//
// Only the palette and the case-study category differ per service so far —
// the copy and artwork are still Digital Marketing's until the ACF fields
// are filled in, at which point WP supplies them and these become the
// fallback only.
export const SERVICES = {
  "digital-marketing": service("digital-marketing", "Digital Marketing"),
  "web-and-graphic-design": service("web-and-graphic-design", "Web & Graphic Design"),
  "web-development": service("web-development", "Web Development"),
  "video-production": service("video-production", "Video Production"),
  "web-data-security": service("web-data-security", "Data & Web Security"),
};

export function getServiceContent(slug) {
  return SERVICES[slug] || null;
}

export const SERVICE_SLUGS = Object.keys(SERVICES);
