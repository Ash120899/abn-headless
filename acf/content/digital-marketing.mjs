// Written content for /services/digital-marketing/ (WP page 4399).
//
// Edit the copy here, then push it up with:
//   node acf/seed.mjs digital-marketing --dry-run
//   node acf/seed.mjs digital-marketing
//
// Image fields are intentionally absent — see the note at the top of
// acf/seed.mjs. Repeater rows are plain arrays of objects; the subfield
// names must match acf/service-page-fields.json exactly.

const SITE = "https://abnjunction.com";

export const PAGE_ID = 4399;

export const acf = {
  meta_description:
    "Paid media, SEO, social, CRM and analytics working together as one connected growth system — not isolated marketing activities.",

  color_primary: "#f56f5d",
  color_primary_light: "#ff856f",
  color_accent: "#db3f32",

  hero_eyebrow: "Digital Marketing · ABN Junction",
  hero_heading_before: "WE TURN",
  hero_heading_highlight: "ATTENTION",
  hero_heading_after: "INTO",
  hero_heading_kinetic: "GROWTH.",
  hero_description:
    "Paid media, SEO, social, CRM and analytics working together as one connected growth system — not isolated marketing activities.",
  hero_cta_primary_label: "Build My Growth Strategy →",
  hero_cta_primary_url: `${SITE}/contact-us/`,
  hero_cta_secondary_label: "See Marketing Results",
  hero_cta_secondary_url: "/case-studies",
  hero_stats: [
    { prefix: "", value: "13", suffix: "×", label: "Peak ROAS" },
    { prefix: "", value: "6,500", suffix: "+", label: "Leads generated" },
    { prefix: "", value: "5", suffix: "", label: "Connected pillars" },
  ],
  hero_tools: [
    { glyph: "G", label: "Google Ads" },
    { glyph: "∞", label: "Meta Ads" },
    { glyph: "⌕", label: "SEO" },
    { glyph: "▥", label: "GA4 / GTM" },
    { glyph: "◉", label: "CRM" },
    { glyph: "W", label: "WhatsApp" },
  ],

  journey_eyebrow: "One journey · multiple channels",
  journey_heading_before: "Scroll through the growth",
  journey_heading_switch: "engine, system",
  journey_description:
    "Each channel has a job. The advantage comes from how strategy, creative, technology and measurement connect them.",
  journey_scenes: [
    {
      num: "01 · ORGANIC DEMAND",
      title: "Search Engine Optimization",
      description:
        "Build discoverability around what people are already searching for. Technical foundations, intent-led content and scalable architecture work together to compound organic visibility.",
      chips: "Technical SEO, Content SEO, Local SEO, E-commerce SEO",
      link_label: "Explore SEO →",
      link_url: `${SITE}/services/digital-marketing/seo/`,
    },
    {
      num: "02 · PAID ACQUISITION",
      title: "Performance Marketing",
      description:
        "Search, Shopping, PMax, Meta and Microsoft campaigns engineered around commercial outcomes — not vanity traffic.",
      chips: "Google Ads, Meta Ads, Shopping / PMax, Microsoft Ads",
      link_label: "Explore Performance Marketing →",
      link_url: `${SITE}/services/digital-marketing/`,
    },
    {
      num: "03 · SOCIAL GROWTH",
      title: "Social Media Growth",
      description:
        "Paid and organic social working together: content, creative testing, communities, lead generation and retargeting built around the audience journey.",
      chips: "Meta Lead Gen, Organic Social, Retargeting, Creative Testing",
      link_label: "Explore Social Media →",
      link_url: `${SITE}/services/digital-marketing/social-media-marketing/`,
    },
    {
      num: "04 · NURTURE & RETENTION",
      title: "Email, WhatsApp & CRM",
      description:
        "Turn enquiries into conversations and conversations into customers. Connect follow-ups, reminders, segmentation and lifecycle messaging instead of letting leads disappear.",
      chips: "WhatsApp, Email, CRM, Automation",
      link_label: "Explore CRM & Messaging →",
      link_url: `${SITE}/services/digital-marketing/email-whatsapp-marketing/`,
    },
    {
      num: "05 · MEASUREMENT",
      title: "Analytics & Conversion Tracking",
      description:
        "Know what actually worked. GA4, GTM, enhanced conversions, e-commerce tracking and clean event architecture make optimisation possible.",
      chips: "GA4, GTM, Enhanced Conversions, Attribution",
      link_label: "Explore Tracking & Analytics →",
      link_url: `${SITE}/services/digital-marketing/`,
    },
    {
      num: "06 · ADVANCED MEDIA",
      title: "Programmatic & Audience Activation",
      description:
        "Extend reach intelligently with audience strategy, display, remarketing and advanced media where they genuinely support the growth plan.",
      chips: "Programmatic, Display, Remarketing, Audience Strategy",
      link_label: "Explore Advanced Media →",
      link_url: `${SITE}/services/digital-marketing/`,
    },
  ],

  marquee_row_one:
    "GOOGLE ADS ✦ META ADS ✦ SEO ✦ PERFORMANCE MARKETING ✦ CRM ✦ ANALYTICS ✦ SOCIAL MEDIA ✦ EMAIL ✦ WHATSAPP ✦ MICROSOFT ADS",
  marquee_row_two:
    "TECHNICAL SEO ✦ SHOPPING ✦ PMAX ✦ LEAD GENERATION ✦ RETARGETING ✦ GA4 ✦ GTM ✦ AUTOMATION ✦ CONTENT ✦ CRO",

  system_eyebrow: "Connected marketing",
  system_heading_before: "Marketing is not seven services. It’s",
  system_heading_kinetic: "one system.",
  system_description:
    "Search, paid media, creative, landing experiences, CRM and analytics should not behave like separate departments. We connect them around one commercial journey.",
  system_nodes: [
    { num: "01 · ATTRACT", title: "Find demand", description: "SEO, Google Ads and Meta put you in front of the right intent and audiences." },
    { num: "02 · ENGAGE", title: "Earn attention", description: "Creative, content, social and landing experiences turn visibility into interest." },
    { num: "03 · CONVERT", title: "Remove friction", description: "CRO, messaging and conversion-focused journeys help people act." },
    { num: "04 · MEASURE", title: "Trust the data", description: "GA4, GTM and conversion tracking connect actions back to outcomes." },
    { num: "05 · IMPROVE", title: "Compound gains", description: "Testing, budget shifts and iteration turn learnings into better performance." },
  ],

  cinema_eyebrow: "FROM SIGNAL TO SALE · ONE CONNECTED JOURNEY",
  cinema_words: "ATTENTION, INTENT, CONVERSION, GROWTH",
  cinema_description:
    "Scroll through the journey. Search creates intent, creative earns attention, performance captures demand and measurement sends the learning back into the system.",
  cinema_scroll_hint: "SCROLL · WATCH THE JOURNEY CONNECT",
  cinema_depth_cards: [
    { label: "SEARCH", title: "high-intent query", note: "“best solution near me”" },
    { label: "CREATIVE", title: "message + visual", note: "attention earned" },
    { label: "LANDING", title: "intent matched", note: "friction ↓ relevance ↑" },
    { label: "MEASUREMENT", title: "signal returned", note: "GA4 · CRM · revenue" },
  ],
  cinema_handoff: [
    { role_fx: "↑ RANKS · SEO · ORGANIC", caption: "SEO · RANKINGS · ORGANIC DEMAND" },
    { role_fx: "◎ META · CONTENT · ENGAGEMENT", caption: "SOCIAL · CREATIVE · COMMUNITY" },
    { role_fx: "₹ ROAS · LEADS · REVENUE", caption: "PAID MEDIA · CONVERSION · REVENUE" },
  ],

  proof_eyebrow: "Selected performance signals",
  proof_heading_before: "Proof that",
  proof_heading_kinetic: "moves business.",
  proof_items: [
    { prefix: "", value: "13", suffix: "×", label: "Highest recorded ROAS" },
    { prefix: "", value: "6,500", suffix: "+", label: "Leads generated" },
    { prefix: "₹", value: "7.5", suffix: "M+", label: "Revenue generated" },
    { prefix: "", value: "360", suffix: "°", label: "Connected measurement" },
  ],

  cases_category: 14, // case_study_category: digital-marketing
  cases_eyebrow: "Digital Marketing case studies",
  cases_heading_before: "See the case studies behind the",
  cases_heading_switch: "ideas, impact",
  cases_description:
    "Proof should show the challenge, the connected decisions and the commercial outcome — not just a screenshot of an ad account.",

  method_eyebrow: "How ABN works",
  method_heading_before: "Understand. Strategise. Execute. Measure.",
  method_heading_switch: "Improve, Compound",
  method_steps: [
    { num: "01 · UNDERSTAND", title: "Start with the business.", description: "Commercial goals, demand, margins, audience, geography and current data come before channel choice." },
    { num: "02 · STRATEGISE", title: "Build the connected plan.", description: "We decide which channels should acquire, nurture, convert and measure — and what each one needs from the others." },
    { num: "03 · EXECUTE", title: "Launch with precision.", description: "Campaigns, content, creative, landing journeys and tracking go live as one coordinated system." },
    { num: "04 · MEASURE", title: "Watch what moves.", description: "We separate useful signals from noise and connect platform metrics to meaningful business outcomes." },
    { num: "05 · IMPROVE", title: "Compound what works.", description: "Testing, optimisation and cross-channel learning keep the growth system evolving." },
  ],

  cb_eyebrow: "A little ABN personality",
  cb_heading_before: "Campaigns don’t improve by staring at",
  cb_heading_switch: "dashboards, spreadsheets",
  cb_description:
    "They improve when people understand why the numbers moved, test the right thing and connect the result back to the customer journey.",
  cb_cta_label: "Talk Through Your Growth Problem →",
  cb_cta_url: `${SITE}/contact-us/`,
  cb_badges: [{ text: "CPA ↑ 😬" }, { text: "Creative test →" }, { text: "ROAS ↑ 😎" }],

  insights_eyebrow: "From the people doing the work",
  insights_heading_before: "What we’re learning from the",
  insights_heading_switch: "campaigns, experiments",

  faq_eyebrow: "Digital Marketing FAQs",
  faq_heading: "Questions worth answering before you spend.",
  faq_intro:
    "These are the practical questions businesses usually ask before choosing channels, budgets and an agency partner.",
  faq_items: [
    { question: "What does a digital marketing agency actually do?", answer: "A good agency connects acquisition, content, user journeys, measurement and optimisation around business outcomes instead of operating every channel in isolation." },
    { question: "Should I start with Google Ads, Meta Ads or SEO?", answer: "It depends on demand, buying cycle, margins, competition, speed required and the quality of your existing website and tracking. Channel choice should follow the business problem." },
    { question: "How do you measure marketing ROI?", answer: "We connect platform activity to meaningful actions such as qualified leads, sales, booked calls and revenue, then evaluate efficiency and quality rather than relying only on clicks or impressions." },
    { question: "Can ABN manage paid media and SEO together?", answer: "Yes. This first-level page is deliberately structured around connected services because paid search, organic search, creative, CRO and analytics can strengthen each other." },
    { question: "Do you work with international businesses?", answer: "Yes. Campaign structure, language, market demand, tracking and landing experience are adapted to the geography and commercial context." },
  ],

  final_eyebrow: "Ready to connect the pieces?",
  final_heading_before: "STOP MANAGING CHANNELS. START BUILDING A",
  final_heading_kinetic: "GROWTH SYSTEM.",
  final_description:
    "Tell us what you are trying to grow. We’ll help identify what should attract, convert, measure and improve it.",
  final_cta_primary_label: "Book a Strategy Call →",
  final_cta_primary_url: `${SITE}/contact-us/`,
  final_cta_secondary_label: "See Results",
  final_cta_secondary_url: "/case-studies",
};
