// What the sub-service content files have in common: section labels, the lead
// form's wording, each service's colours and case-study band, and the cards
// for cross-links. A content file passes its own copy to subservice() and gets
// back the ACF payload seed.mjs writes. The field names match
// acf/subservice-page-fields.json exactly.
//
// This file sits outside the service folders, so seed.mjs doesn't list it as a
// page. digital-marketing/performance-marketing.mjs predates it and spells its
// payload out in full, which also makes it the reference for the shape.
//
// Copy rules for these pages: service lines come from the live WordPress page,
// with no stats, rankings or guarantees that nobody has evidenced.

const SITE = "https://abnjunction.com";

// Colours left out inherit from the parent service page in WP. Digital
// Marketing's three pickers are all #db3f32, so its pages set their own.
// Video and security have no case_study_category term yet, so `cases` is null
// and their pages leave the band out rather than show unrelated work.
//
// `images` are attachment IDs of the parent service page's own art (its
// hero_character and cb_image), a stand-in until a page has its own. To give a
// page its own art, pass `images: { hero_image: id, diff_image: id }` in its
// content file: seeding again overwrites anything picked by hand in WP Admin.
const SERVICES = {
  "digital-marketing": {
    label: "DIGITAL MARKETING",
    colors: { color_primary: "#d95c51", color_primary_light: "#f07e73", color_accent: "#a93930" },
    images: { hero_image: 12825, diff_image: 12835 },
    cases: {
      category: 14,
      heading: "REAL CAMPAIGNS.\nREAL BUSINESS CHALLENGES.",
      description: "How strategy, creative, targeting and measurement came together for real clients.",
    },
  },
  "web-and-graphic-design": {
    label: "WEB & GRAPHIC DESIGN",
    colors: {},
    images: { hero_image: 13028, diff_image: 13027 },
    cases: {
      category: 15,
      heading: "REAL BRANDS.\nREAL DESIGN CHALLENGES.",
      description: "How research, visual thinking and craft came together for real clients.",
    },
  },
  "web-development": {
    label: "WEB DEVELOPMENT",
    colors: {},
    images: { hero_image: 12979, diff_image: 12954 },
    cases: {
      category: 16,
      heading: "REAL BUILDS.\nREAL BUSINESS PROBLEMS.",
      description: "How planning, engineering and delivery came together for real clients.",
    },
  },
  "video-production": {
    label: "VIDEO PRODUCTION",
    colors: {},
    images: { hero_image: 12885, diff_image: 12950 },
    cases: null,
  },
  "web-data-security": {
    label: "WEB & DATA SECURITY",
    colors: {},
    images: { hero_image: 12980, diff_image: 13003 },
    cases: null,
  },
};

// Cross-link cards: [title, description, path]. A page lists keys in `related`.
const RELATED = {
  "digital-marketing": ["Digital Marketing", "Connect search, social, paid media and measurement into one plan.", "/services/digital-marketing/"],
  "web-and-graphic-design": ["Web & Graphic Design", "Give every campaign and page a clear, consistent visual identity.", "/services/web-and-graphic-design/"],
  "web-development": ["Web Development", "Build fast, reliable websites and applications that can grow.", "/services/web-development/"],
  "video-production": ["Video Production", "Turn your message into video people actually watch.", "/services/video-production/"],
  "web-data-security": ["Web & Data Security", "Find and fix weaknesses before they become incidents.", "/services/web-data-security/"],

  seo: ["Search Engine Optimization", "Build long-term organic visibility for the searches that matter.", "/services/digital-marketing/seo/"],
  smm: ["Social Media Marketing", "Reach and grow your audience across social platforms.", "/services/digital-marketing/social-media-marketing/"],
  smo: ["Social Media Optimization", "Keep your profiles consistent, discoverable and active.", "/services/digital-marketing/social-media-optimization/"],
  sem: ["Search Engine Marketing", "Appear at the moment people search for what you offer.", "/services/digital-marketing/search-engine-marketing/"],
  performance: ["Performance Marketing", "Connect paid media, landing pages and tracking to real outcomes.", "/services/digital-marketing/performance-marketing/"],
  programmatic: ["Programmatic Advertising", "Buy display reach automatically, against the right audiences.", "/services/digital-marketing/programmatic-advertising/"],
  email: ["Email & WhatsApp Marketing", "Stay in touch with people who asked to hear from you.", "/services/digital-marketing/email-whatsapp-marketing/"],
  analytics: ["Analytics & Conversion Tracking", "Set up tracking your team can trust and act on.", "/services/digital-marketing/analytics-conversion-tracking/"],
  meta: ["Meta Ads", "Run Facebook and Instagram campaigns built around real outcomes.", "/services/digital-marketing/meta-ads/"],

  branding: ["Branding & Visual Identity", "Build one visual language across every channel.", "/services/web-and-graphic-design/branding-visual-identity/"],
  campaigndesign: ["Campaign & Content Design", "Keep ad creatives and content recognisable on every platform.", "/services/web-and-graphic-design/campaign-content-design/"],
  infrastructure: ["Performance & Infrastructure", "Keep your platform fast under real traffic.", "/services/web-development/performance-infrastructure/"],
  maintenance: ["Maintenance & Iteration", "Keep your platform healthy and improving after launch.", "/services/web-development/maintenance-iteration/"],
  production: ["Production & Direction", "Plan and capture the footage the edit will need.", "/services/video-production/production-direction/"],
  delivery: ["Campaign & Platform Delivery", "Turn one shoot into versions for every platform.", "/services/video-production/campaign-platform-delivery/"],

  uiux: ["UI/UX Design", "Shape interfaces around how people really use them.", "/services/web-and-graphic-design/ui-ux-design/"],
  webdesign: ["Web Design", "Design websites that look right and work on every screen.", "/services/web-and-graphic-design/web-design/"],
  graphic: ["Graphic Design", "Create logos, brand systems and marketing visuals.", "/services/web-and-graphic-design/graphic-design/"],
  illustration: ["Illustrations & 3D", "Add custom characters, artwork and 3D models to your brand.", "/services/web-and-graphic-design/illustrations-3d-designs/"],

  website: ["Website Development", "Turn approved designs into fast, maintainable websites.", "/services/web-development/website-development/"],
  cms: ["Content Management Systems", "Give your team a site they can update without a developer.", "/services/web-development/content-management-system/"],
  app: ["App Development", "Build iOS and Android apps around real user needs.", "/services/web-development/app-development/"],
  software: ["Adaptive Software Development", "Build custom software in short, reviewable cycles.", "/services/web-development/adaptive-software-development/"],

  content: ["Content Marketing", "Plan and publish content your audience finds useful.", "/services/video-production/content-marketing/"],
  editing: ["Video Editing", "Shape raw footage into clear, watchable stories.", "/services/video-production/video-editing/"],
  vfx: ["VFX & Animation", "Add motion graphics, animation and visual effects.", "/services/video-production/vfx-animation/"],
  audio: ["Audio Editing & SFX", "Clean, mix and master sound for every platform.", "/services/video-production/audio-editing-sfx/"],

  network: ["Network Penetration Testing", "Test your network the way a real attacker would, with permission.", "/services/web-data-security/network-penetration-testing/"],
  server: ["Server Penetration Testing", "Assess server configuration, services and access controls.", "/services/web-data-security/server-penetration-testing/"],
  hacking: ["Ethical Hacking", "Authorised testing across web, mobile, wireless and people.", "/services/web-data-security/ethical-hacking/"],
  bounty: ["Ethical Bug Bounty", "Set up and run a responsible vulnerability programme.", "/services/web-data-security/ethical-hacking-bug-bounty/"],
  firewall: ["Data & Firewall Protection", "Harden the network and protect sensitive data.", "/services/web-data-security/firewall-datasecuity/"],
};

const pad = (n) => String(n).padStart(2, "0");

// "Campaign" reads as "your campaign brief" mid-sentence, but acronyms and
// names ("SEO", "UX", "Meta Ads") keep their capitals.
const briefInSentence = (brief) => (/^[A-Z][a-z]+$/.test(brief) ? brief.toLowerCase() : brief);

const choices = (n, name, question, kpiLabel, options) => ({
  label: `STEP ${pad(n)} / ${name}`,
  question,
  type: "choices",
  kpi_label: kpiLabel,
  options,
});

export function subservice(c) {
  const service = SERVICES[c.service];
  const lab = c.lab;

  // Section numbers run on, skipping any band a service leaves out.
  let section = 0;
  const eyebrow = (text) => `${pad(++section)} / ${text}`;

  const steps = [
    choices(
      1,
      "THE MISSION",
      lab.goal.question,
      "",
      lab.goal.options.map(([label, icon, plan_title, outcome]) => ({ label, icon, kpi: "", plan_title, plan_text: "", outcome }))
    ),
    choices(
      2,
      lab.scope.name,
      lab.scope.question,
      lab.scope.kpi,
      lab.scope.options.map(([label, icon, kpi, plan_text]) => ({ label, icon, kpi, plan_title: "", plan_text, outcome: "" }))
    ),
    {
      label: `STEP 03 / ${lab.range.name}`,
      question: lab.range.question,
      type: "range",
      kpi_label: lab.range.kpi,
      range_min: lab.range.min,
      range_max: lab.range.max,
      range_step: lab.range.step,
      range_default: lab.range.value,
      range_prefix: lab.range.prefix || "",
      range_caption: lab.range.caption,
      range_min_label: lab.range.minLabel,
      range_max_label: lab.range.maxLabel,
      range_note: lab.range.note,
      range_per_day_label: "",
      range_plan_text: lab.range.planText,
    },
    choices(
      4,
      "YOUR STAGE",
      lab.stage.question,
      "",
      lab.stage.options.map(([label, plan_text]) => ({ label, icon: "", kpi: "", plan_title: "", plan_text, outcome: "" }))
    ),
  ];

  return {
    meta_description: c.meta,
    ...service.colors,
    ...service.images,
    ...c.images,

    crumb_label: c.crumb,
    hero_eyebrow: `${c.hero.eyebrow} · ABN Junction`,
    hero_heading_before: c.hero.before,
    hero_heading_highlight: c.hero.highlight,
    hero_heading_after: c.hero.after,
    hero_description: c.hero.description,
    hero_cta_primary_label: `${c.hero.cta} ↗`,
    hero_cta_primary_url: "#campaign-lab",
    hero_cta_secondary_label: "Explore What We Do ↓",
    hero_cta_secondary_url: "#offers",
    hero_tags: c.hero.tags.map(([icon, text]) => ({ icon, text })),
    hero_highlights: c.hero.highlights,

    marquee_row_one: c.marquee[0],
    marquee_row_two: c.marquee[1],

    rail_location: `${service.label} / ${c.rail}`,
    rail_problems: "The Challenge",
    rail_offers: "What We Offer",
    rail_journey: "The Journey",
    rail_lab: lab.name,
    rail_difference: "Why ABN Junction",
    rail_cases: "Case Studies",
    rail_related: "Related Services",
    rail_insights: "Insights",
    rail_faq: "FAQs",

    problems_eyebrow: eyebrow("The challenge"),
    problems_heading: c.problems.heading,
    problems_description: c.problems.description,
    problems_items: c.problems.items.map(([label, symbol, title, description], i) => ({
      label: `${pad(i + 1)} / ${label}`,
      symbol,
      title,
      description,
    })),

    offers_eyebrow: eyebrow("What we offer"),
    offers_heading: c.offers.heading,
    offers_description: c.offers.description,
    offers_more_label: "What's included",
    offers_less_label: "Show less",
    offers_items: c.offers.items.map(([icon, title, description, detail]) => ({ icon, title, description, detail })),

    journey_eyebrow: eyebrow("The signature experience"),
    journey_heading: c.journey.heading,
    journey_description: c.journey.description,
    journey_scroll_hint: "SCROLL TO ADVANCE THE STORY →",
    journey_slides: c.journey.slides.map(([step, title, description, icon, panel_title, items], i) => ({
      step: `${pad(i + 1)} / ${step}`,
      title,
      description,
      icon,
      panel_title,
      panel_items: items.join("\n"),
    })),

    lab_eyebrow: eyebrow(`The interactive ${lab.name.toLowerCase()}`),
    lab_heading: lab.heading,
    lab_heading_highlight: lab.highlight,
    lab_description: lab.description,
    lab_steps: steps,
    lab_preview_title: `✦ ABN ${lab.preview} CONTROL ROOM`,
    lab_preview_badge: "LIVE PREVIEW",
    lab_chart_label: `${lab.preview} JOURNEY / ILLUSTRATION`,
    lab_funnel: lab.funnel,
    lab_plan_title: lab.planTitle,
    lab_plan_text: lab.planText,
    lab_cta_label: `Get My ${lab.brief} Plan ↗`,
    lab_replay_label: "Replay the story ↑",
    lab_disclaimer: [
      "This is an educational planning preview, not a quote, forecast or guarantee.",
      lab.disclaimer,
      "No data is submitted until you explicitly choose to send an enquiry.",
    ]
      .filter(Boolean)
      .join(" "),

    lead_form_id: null,
    lead_services_label: c.crumb,
    lead_eyebrow: `Your ${briefInSentence(lab.brief)} brief is ready`,
    lead_heading: "Let's turn your plan into a conversation.",
    lead_description: "Your selections are included with your enquiry, so we can come back with a plan that fits your goals.",
    lead_consent: "I agree to include these details in an enquiry to ABN Junction and be contacted about my request.",
    lead_submit_label: `Send My ${lab.brief} Brief ↗`,
    lead_success_message: `Thanks! Your ${briefInSentence(lab.brief)} brief is with us. We'll be in touch within one working day.`,
    lead_error_message: "We couldn't send that just now. Please try again, or email abnjunction@gmail.com and we'll pick it up right away.",

    diff_eyebrow: eyebrow("The ABN Junction approach"),
    diff_heading: c.difference.heading,
    diff_description: c.difference.description,
    diff_image_label: c.difference.imageLabel,
    diff_points: c.difference.points.map(([title, description]) => ({ title, description })),

    ...(service.cases
      ? {
          cases_category: service.cases.category,
          cases_eyebrow: eyebrow("Proof in action"),
          cases_heading: service.cases.heading,
          cases_description: service.cases.description,
          cases_card_label: "SELECTED CASE STUDY",
          cases_link_label: "Explore this case study ↗",
        }
      : {}),

    related_eyebrow: eyebrow("The connected growth system"),
    related_heading: c.related.heading,
    related_description: c.related.description,
    related_items: c.related.items.map((key) => {
      const [title, description, path] = RELATED[key];
      return { title, description, url: `${SITE}${path}`, link_label: "EXPLORE SERVICE →" };
    }),

    insights_eyebrow: eyebrow("From the people doing the work"),
    insights_heading: "WHAT WE'RE LEARNING\nABOUT",
    insights_heading_switch: c.insights,
    insights_description: "Recent articles from the ABN Junction team.",
    insights_link_label: "Read article →",

    faq_eyebrow: eyebrow("Real questions, useful answers"),
    faq_heading: c.faq.heading,
    faq_intro: c.faq.intro,
    faq_items: c.faq.items.map(([question, answer]) => ({ question, answer })),

    final_eyebrow: eyebrow("Let's build what comes next"),
    final_heading: c.final.heading,
    final_description: c.final.description,
    final_cta_label: `${c.final.cta} ↗`,
    final_cta_url: `${SITE}/contact-us/`,
  };
}

// The ad budget step, shared by every paid-media page.
export const adBudget = (question) => ({
  name: "THE INVESTMENT",
  question,
  kpi: "Monthly ad budget",
  min: 10000,
  max: 300000,
  step: 5000,
  value: 50000,
  prefix: "₹",
  caption: "Monthly ad spend",
  minLabel: "₹10,000",
  maxLabel: "₹3,00,000+",
  note: "Illustrative INR budget selector. This is ad spend only, not an ABN Junction management fee.",
  planText: "Your {value} monthly budget is an input for planning, not a prediction of leads or revenue.",
});

// Security testing needs permission; every security lab says so.
export const SECURITY_DISCLAIMER = "Testing only ever starts after written authorisation and an agreed scope.";
