// Written content for /services/digital-marketing/performance-marketing/,
// from design-concepts/ABN_Junction_Performance_Marketing_V2_Campaign_Lab_Leadgen.html.
//
// The WordPress page does not exist yet. To publish:
//   1. WP Admin: create a page "Performance Marketing", slug
//      performance-marketing, parent "Digital Marketing" (page 4399).
//   2. Import acf/subservice-page-fields.json (ACF -> Tools).
//   3. Put the new page's ID in PAGE_ID below, then:
//        node acf/seed.mjs digital-marketing/performance-marketing --dry-run
//        node acf/seed.mjs digital-marketing/performance-marketing
//   4. hero_image and diff_image are the Digital Marketing page's art for now.
//      Seeding again overwrites anything picked by hand in WP Admin.
//   5. List this page's path in SUBSERVICE_PATHS in cloudflare/router-worker.js.
//
// Until then `next dev` previews the page from this file (see
// loadPreviewAcf in src/lib/wp-subservice.js).
//
// Colours are the concept's own. Blank would inherit the Digital Marketing
// page's palette, but in WP (2026-10-26) all three of its pickers are
// #db3f32, so the light shade vanishes on this page's dark sections.
//
// Repeater rows are plain arrays of objects; the subfield names must match
// acf/subservice-page-fields.json exactly.

const SITE = "https://abnjunction.com";

export const PAGE_ID = 13406;

export const acf = {
  meta_description:
    "Performance marketing and search engine marketing by ABN Junction. Google Ads, PPC, creative testing, landing pages and conversion measurement.",

  color_primary: "#d95c51",
  color_primary_light: "#f07e73",
  color_accent: "#a93930",

  hero_image: 12825,
  diff_image: 12835,

  crumb_label: "Performance Marketing",
  hero_eyebrow: "Performance Marketing & Search Engine Marketing · ABN Junction",
  hero_heading_before: "FROM",
  hero_heading_highlight: "AD SPEND",
  hero_heading_after: "TO REAL GROWTH.",
  hero_description:
    "Clicks are only the beginning. We connect paid search, audience strategy, compelling creatives, landing pages and conversion tracking to make every advertising decision count.",
  hero_cta_primary_label: "Plan My Campaign ↗",
  hero_cta_primary_url: "#campaign-lab",
  hero_cta_secondary_label: "Explore What We Do ↓",
  hero_cta_secondary_url: "#offers",
  hero_tags: [
    { icon: "✳", text: "Paid Search" },
    { icon: "↗", text: "Better ROAS" },
    { icon: "◎", text: "Qualified Leads" },
  ],
  hero_highlights: "Google Ads & PPC, Campaign Strategy, Landing Page CRO, Conversion Measurement",

  marquee_row_one: "GOOGLE ADS, META ADS, LEAD GENERATION, CONVERSION TRACKING, CRO, PERFORMANCE MARKETING",
  marquee_row_two: "CAMPAIGN STRATEGY, AUDIENCE TARGETING, CREATIVE TESTING, ANALYTICS, RETARGETING, OPTIMIZATION",

  rail_location: "DIGITAL MARKETING / PERFORMANCE",
  rail_problems: "The Challenge",
  rail_offers: "What We Offer",
  rail_journey: "The Journey",
  rail_lab: "Campaign Lab",
  rail_difference: "Why ABN Junction",
  rail_cases: "Case Studies",
  rail_related: "Related Services",
  rail_insights: "Insights",
  rail_faq: "FAQs",

  problems_eyebrow: "01 / The challenge",
  problems_heading: "CLICKS ARE COMING.\nIS BUSINESS GROWING?",
  problems_description:
    "More traffic does not automatically mean more customers. Performance marketing needs the right audience, clear offers, dependable tracking and ongoing decisions.",
  problems_items: [
    {
      label: "01 / WASTED SPEND",
      symbol: "↘",
      title: "Budget goes nowhere.",
      description: "Campaigns spend money on weak search intent, poor targeting or traffic unlikely to convert.",
    },
    {
      label: "02 / BROKEN JOURNEY",
      symbol: "⇄",
      title: "Clicks don't convert.",
      description: "The message, creative and landing page don't work together, so interested visitors drop off.",
    },
    {
      label: "03 / UNCLEAR RESULTS",
      symbol: "◎",
      title: "What actually worked?",
      description:
        "Without reliable measurement, it is difficult to know which campaigns drive qualified leads and sales.",
    },
  ],

  offers_eyebrow: "02 / What we offer",
  offers_heading: "SIX CAPABILITIES.\nONE CONNECTED CAMPAIGN.",
  offers_description:
    "We bring targeting, creative, experience and measurement together. Select a capability to see what the work includes.",
  offers_more_label: "What's included",
  offers_less_label: "Show less",
  offers_items: [
    {
      icon: "⌕",
      title: "Paid Search & PPC Management",
      description: "Reach high-intent customers with well-structured search campaigns.",
      detail:
        "Google Ads and Microsoft Ads account structure, search themes, ad groups, search terms, bidding and campaign maintenance.",
    },
    {
      icon: "◎",
      title: "Audience & Keyword Strategy",
      description: "Connect your offer with the right searches and customer segments.",
      detail: "Intent research, audience signals, exclusions, geographic targeting, segmentation and opportunity mapping.",
    },
    {
      icon: "✎",
      title: "Ad Creative & Copy Testing",
      description: "Develop messaging and creative variations that earn attention.",
      detail: "Responsive search ad copy, creative briefs, offer testing, ad asset iteration and relevant policy checks.",
    },
    {
      icon: "▣",
      title: "Landing Pages & CRO",
      description: "Turn paid clicks into clearer, more persuasive experiences.",
      detail: "Landing page audits, message match, UX improvements, form analysis and conversion experiments.",
    },
    {
      icon: "▥",
      title: "Tracking & Attribution",
      description: "Understand the actions that matter beyond impressions and clicks.",
      detail:
        "GA4, Google Tag Manager, Google Ads conversions, enhanced conversions and lead-quality measurement where feasible.",
    },
    {
      icon: "↗",
      title: "Budget & Bid Optimization",
      description: "Make decisions around results, not vanity metrics.",
      detail:
        "Budget allocation, bidding strategy reviews, search-term hygiene, experiment planning and efficiency reporting.",
    },
  ],

  journey_eyebrow: "03 / The signature experience",
  journey_heading: "THE JOURNEY\nFROM SPEND TO SALES.",
  journey_description: "Scroll through the anatomy of a performance campaign, from investment to measurable action.",
  journey_scroll_hint: "SCROLL TO ADVANCE THE STORY →",
  journey_slides: [
    {
      step: "01 / BUDGET",
      title: "Start with a real objective.",
      description:
        "We agree what success means, what a qualified result looks like, and how much we can responsibly test.",
      icon: "◎",
      panel_title: "BUDGET ALLOCATION",
      panel_items: "Campaign goal: qualified leads\nMonthly spend: planned\nGuardrails: agreed",
    },
    {
      step: "02 / TARGET",
      title: "Reach the right intent.",
      description:
        "Keywords, audience signals, location and exclusions focus investment on people most likely to need the offer.",
      icon: "↗",
      panel_title: "TARGETING",
      panel_items: "High-intent searches ✓\nLocation relevance ✓\nNegative keywords ✓",
    },
    {
      step: "03 / CREATE",
      title: "Make the message matter.",
      description:
        "Useful ad copy, compelling offers and thoughtful creative make the campaign relevant before the click.",
      icon: "✎",
      panel_title: "AD CREATIVE",
      panel_items: "Offer matched to intent\nMultiple ad variations\nCreative testing live",
    },
    {
      step: "04 / LAND",
      title: "Connect the click to the page.",
      description:
        "A focused landing page answers the search, builds confidence and makes the next action obvious.",
      icon: "▣",
      panel_title: "LANDING PAGE",
      panel_items: "Fast loading experience\nMessage match ✓\nClear conversion action",
    },
    {
      step: "05 / CONVERT",
      title: "Measure what counts.",
      description:
        "Calls, enquiries and sales are tracked as reliably as possible, with lead quality informing the next decisions.",
      icon: "✓",
      panel_title: "CONVERSIONS",
      panel_items: "Qualified lead captured\nTracking verified ✓\nOffline feedback loop",
    },
    {
      step: "06 / IMPROVE",
      title: "Learn, optimize, repeat.",
      description:
        "We review performance, test assumptions, reallocate budget and improve the full journey over time.",
      icon: "⟳",
      panel_title: "OPTIMIZATION",
      panel_items: "Waste reduced\nWinning tests expanded\nDecisions based on evidence",
    },
  ],

  lab_eyebrow: "04 / The interactive campaign lab",
  lab_heading: "YOUR BUSINESS.\nYOUR CAMPAIGN.",
  lab_heading_highlight: "YOUR GAME PLAN.",
  lab_description:
    "You've seen how paid growth works. Now build a sample campaign around your own goals. Adjust the inputs, explore the strategy and request a personalized discussion with ABN Junction.",
  lab_steps: [
    {
      label: "STEP 01 / THE MISSION",
      question: "What do you want your campaigns to achieve?",
      type: "choices",
      kpi_label: "",
      options: [
        { label: "Qualified leads", icon: "🎯", kpi: "", plan_title: "Your lead generation game plan", plan_text: "", outcome: "LEAD" },
        { label: "Online sales", icon: "🛒", kpi: "", plan_title: "Your e-commerce growth game plan", plan_text: "", outcome: "PURCHASE" },
        { label: "Brand awareness", icon: "📣", kpi: "", plan_title: "Your brand discovery game plan", plan_text: "", outcome: "RECALL" },
      ],
    },
    {
      label: "STEP 02 / THE CHANNEL",
      question: "Where would you like to reach customers?",
      type: "choices",
      kpi_label: "Channels",
      options: [
        {
          label: "Google Ads",
          icon: "⌕",
          kpi: "Google",
          plan_title: "",
          plan_text: "Start with intent-led search campaigns and relevant landing pages",
          outcome: "",
        },
        {
          label: "Meta Ads",
          icon: "◎",
          kpi: "Meta",
          plan_title: "",
          plan_text: "Test audience-led creatives and focused lead or sales journeys",
          outcome: "",
        },
        {
          label: "Both channels",
          icon: "✦",
          kpi: "Both",
          plan_title: "",
          plan_text: "Connect high-intent search with paid social testing",
          outcome: "",
        },
        {
          label: "Help me decide",
          icon: "?",
          kpi: "TBD",
          plan_title: "",
          plan_text: "Begin with channel selection based on customer intent and available creative",
          outcome: "",
        },
      ],
    },
    {
      label: "STEP 03 / THE INVESTMENT",
      question: "What monthly advertising budget are you considering?",
      type: "range",
      kpi_label: "Monthly ad budget",
      range_min: 10000,
      range_max: 300000,
      range_step: 5000,
      range_default: 50000,
      range_prefix: "₹",
      range_caption: "Monthly ad spend",
      range_min_label: "₹10,000",
      range_max_label: "₹3,00,000+",
      range_note: "Illustrative INR budget selector. This is ad spend only, not an ABN Junction management fee.",
      range_per_day_label: "Daily average",
      range_plan_text: "Your {value} monthly budget is an input for planning, not a prediction of leads or revenue.",
    },
    {
      label: "STEP 04 / YOUR STAGE",
      question: "Where are you in your advertising journey?",
      type: "choices",
      kpi_label: "",
      options: [
        {
          label: "Starting fresh",
          icon: "",
          kpi: "",
          plan_title: "",
          plan_text: "establish conversion tracking and baseline data first",
          outcome: "",
        },
        {
          label: "Already running ads",
          icon: "",
          kpi: "",
          plan_title: "",
          plan_text: "audit existing conversion quality, spend allocation and creative fatigue",
          outcome: "",
        },
        {
          label: "Ready to scale",
          icon: "",
          kpi: "",
          plan_title: "",
          plan_text: "prioritize profitable segments and scale carefully against business outcomes",
          outcome: "",
        },
      ],
    },
  ],
  lab_preview_title: "✦ ABN CAMPAIGN CONTROL ROOM",
  lab_preview_badge: "LIVE PREVIEW",
  lab_chart_label: "CAMPAIGN JOURNEY / ILLUSTRATION",
  lab_funnel: "AD IMPRESSION, CLICK, LANDING PAGE, LEAD",
  lab_plan_title: "Your campaign game plan",
  lab_plan_text:
    "Start with a focused search campaign, a clear landing page and verified conversion tracking before scaling spend.",
  lab_cta_label: "Get My Campaign Plan ↗",
  lab_replay_label: "Replay the story ↑",
  lab_disclaimer:
    "This is an educational strategy preview, not a performance forecast. We don't predict leads, revenue, ROAS or CPL from budget alone. No data is submitted until you explicitly choose to send an enquiry.",

  lead_form_id: null,
  lead_services_label: "Performance Marketing",
  lead_eyebrow: "Your campaign brief is ready",
  lead_heading: "Let's turn your plan into a conversation.",
  lead_description:
    "Your campaign selections are included with your enquiry, so we can come back with a plan that fits your goals.",
  lead_consent:
    "I agree to include these details in an enquiry to ABN Junction and be contacted about my request.",
  lead_submit_label: "Send My Campaign Brief ↗",
  lead_success_message: "Thanks! Your campaign brief is with us. We'll be in touch within one working day.",
  lead_error_message:
    "We couldn't send that just now. Please try again, or email abnjunction@gmail.com and we'll pick it up right away.",

  diff_eyebrow: "05 / The ABN Junction approach",
  diff_heading: "NOT MORE ADS.\nBETTER DECISIONS.",
  diff_description:
    "Performance marketing is a connected system. We consider the offer, audience, creative, landing experience and measurement together instead of optimizing isolated campaign metrics.",
  diff_image_label: "PERFORMANCE, WITH A PLAN ✳",
  diff_points: [
    {
      title: "Understand the economics.",
      description: "We discuss business objectives, budgets, lead quality and realistic performance expectations.",
    },
    {
      title: "Build for intent and experience.",
      description: "Campaign targeting, ad messaging and landing pages need to tell the same story.",
    },
    {
      title: "Track outcomes, not only clicks.",
      description: "Where possible, qualified leads and sales inform ongoing decisions.",
    },
    {
      title: "Test, learn and improve.",
      description: "AI-assisted tools can speed up analysis and execution; people own strategy and accountability.",
    },
  ],

  // Digital marketing (term 14). Matches the parent's own pick, set here
  // so it holds even if the parent changes.
  cases_category: 14,
  cases_eyebrow: "06 / Proof in action",
  cases_heading: "REAL CAMPAIGNS.\nREAL BUSINESS CHALLENGES.",
  cases_description:
    "How campaign structure, creative, targeting and measurement came together for real clients with real acquisition challenges.",
  cases_card_label: "SELECTED CASE STUDY",
  cases_link_label: "Explore this case study ↗",

  related_eyebrow: "07 / The connected growth system",
  related_heading: "ADS DON'T WORK\nIN ISOLATION.",
  related_description:
    "Paid campaigns become more useful when search visibility, design, development and tracking work together.",
  related_items: [
    {
      title: "Search Engine Optimization",
      description: "Build longer-term visibility alongside immediate paid demand.",
      url: `${SITE}/services/digital-marketing/seo/`,
      link_label: "EXPLORE SERVICE →",
    },
    {
      title: "Web Development",
      description: "Support faster, more reliable landing pages and integrations.",
      url: `${SITE}/services/web-development/`,
      link_label: "EXPLORE SERVICE →",
    },
    {
      title: "Creative & Design",
      description: "Strengthen ad messaging and the experience after the click.",
      url: `${SITE}/services/web-and-graphic-design/`,
      link_label: "EXPLORE SERVICE →",
    },
    {
      // The concept's 4th card was "Analytics & Tracking", which has no page
      // yet. Swap back once one exists.
      title: "Social Media Marketing",
      description: "Pair paid campaigns with organic social content and community.",
      url: `${SITE}/services/digital-marketing/social-media-marketing/`,
      link_label: "EXPLORE SERVICE →",
    },
  ],

  insights_eyebrow: "08 / From the people doing the work",
  insights_heading: "WHAT WE'RE TESTING\nIN THE",
  insights_heading_switch: "SEARCH, AD AUCTION, FUNNEL, DATA, GROWTH",
  insights_description: "Insights from campaign experiments, tracking and conversion work.",
  insights_link_label: "Read article →",

  faq_eyebrow: "09 / Real questions, useful answers",
  faq_heading: "PAID ADS,\nWITHOUT THE GUESSWORK.",
  faq_intro: "What businesses usually want to know before investing in performance marketing.",
  faq_items: [
    {
      question: "What is the difference between SEM and performance marketing?",
      answer:
        "Search engine marketing commonly refers to paid search advertising. Performance marketing is a broader approach focused on measurable outcomes across paid channels, landing pages and conversion tracking.",
    },
    {
      question: "Do you manage Google Ads and PPC campaigns?",
      answer:
        "Our paid search work can include account structure, keyword strategy, ad assets, bidding, budgets, testing and ongoing optimization, depending on the agreed scope.",
    },
    {
      question: "How much advertising budget do I need?",
      answer:
        "Appropriate budgets depend on your market, competition, goals and likely cost per result. We assess feasibility rather than promising one budget will work for every business.",
    },
    {
      question: "How quickly can campaigns generate results?",
      answer:
        "Ads can start delivering traffic after approval, but reliable performance insights and optimization usually require enough conversion data and testing time.",
    },
    {
      question: "How do you measure leads and sales?",
      answer:
        "We define important actions, verify available tracking and assess lead quality where possible. Measurement may include GA4, Google Ads conversions and offline feedback.",
    },
    {
      question: "Can paid ads and SEO work together?",
      answer:
        "Yes. Paid ads can capture demand and test messaging while SEO builds organic discovery. Insights from each channel can inform the other.",
    },
  ],

  final_eyebrow: "10 / Let's build what comes next",
  final_heading: "YOUR NEXT CUSTOMER\nIS ONE GOOD DECISION AWAY.",
  final_description: "Let's connect your advertising investment to meaningful business outcomes.",
  final_cta_label: "Plan a Performance Campaign ↗",
  final_cta_url: `${SITE}/contact-us/`,
};
