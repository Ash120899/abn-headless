// Written content for /services/digital-marketing/analytics-conversion-tracking/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 13410;

export const acf = subservice({
  service: "digital-marketing",
  crumb: "Analytics & Conversion Tracking",
  rail: "ANALYTICS & TRACKING",
  meta: "Analytics and conversion tracking by ABN Junction: GA4, Google Tag Manager, enhanced conversions, e-commerce tracking, event architecture and attribution.",
  hero: {
    eyebrow: "Analytics & Conversion Tracking",
    before: "FROM",
    highlight: "GUESSWORK",
    after: "TO EVIDENCE.",
    description:
      "Know what actually worked. We set up GA4, Tag Manager, enhanced conversions and clean event tracking, so your marketing decisions rest on numbers you can trust.",
    cta: "Plan My Tracking",
    tags: [["▥", "GA4"], ["⟳", "Tag Manager"], ["◎", "Enhanced Conversions"]],
    highlights: "GA4, Google Tag Manager, Enhanced Conversions, Attribution",
  },
  marquee: [
    "GA4, GOOGLE TAG MANAGER, ENHANCED CONVERSIONS, E-COMMERCE TRACKING, EVENT ARCHITECTURE, ATTRIBUTION",
    "KEY EVENTS, LEAD TRACKING, PURCHASE DATA, TRACKING AUDITS, CLEAN REPORTING, BETTER DECISIONS",
  ],
  problems: {
    heading: "THE DASHBOARD HAS NUMBERS.\nCAN YOU TRUST THEM?",
    description: "When tracking is incomplete, every platform tells a different story and optimisation turns into opinion.",
    items: [
      ["MISSING EVENTS", "⚠", "The important actions aren't recorded.", "Forms, calls and purchases go uncounted, so the channels behind them get no credit."],
      ["DUPLICATE DATA", "⇄", "One sale gets counted twice.", "Tags added over the years overlap, and the totals stop matching the real business."],
      ["NO CLEAR ANSWER", "↘", "Nobody knows what worked.", "Without clean attribution, budget decisions come down to whoever argues best."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE VERSION OF THE TRUTH.",
    description: "We connect the tools so they describe the same reality. Select a capability to see what the work includes.",
    items: [
      ["▥", "GA4 Setup", "Build analytics around your business.", "GA4 property setup or review, key events and sensible configuration."],
      ["⟳", "Google Tag Manager", "Keep every tag in one managed place.", "Container setup, tags, triggers and a tidy structure your team can follow."],
      ["✓", "Enhanced Conversions", "Send more complete conversion data.", "Enhanced conversions set up for your ad platforms, with a check that the data arrives."],
      ["🛒", "E-commerce Tracking", "See the path from product to purchase.", "Product views, cart activity, checkout steps and purchase data."],
      ["⌘", "Event Architecture", "Name and structure what you measure.", "A clean event plan, so reports stay readable as the site and campaigns grow."],
      ["◎", "Attribution & Reporting", "Connect results to the work behind them.", "Attribution review and reporting built around the numbers you act on."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM NOISE TO CLARITY.",
    description: "Scroll through how a tracking setup goes from unreliable to useful.",
    slides: [
      ["AUDIT", "See what's really firing.", "We review your current tags, events and accounts to find what's missing, duplicated or broken.", "⌕", "TRACKING AUDIT", ["Tags reviewed", "Gaps listed", "Duplicates flagged"]],
      ["DEFINE", "Agree what counts.", "We decide which actions matter to the business and how each one should be measured.", "◎", "MEASUREMENT PLAN", ["Key actions agreed", "Events named", "Goals documented"]],
      ["BUILD", "Set it up cleanly.", "GA4 and Tag Manager are configured around the plan, instead of piling more tags on top.", "⟳", "IMPLEMENTATION", ["GA4 configured", "Tags organised", "Triggers set"]],
      ["CONNECT", "Link the platforms.", "Conversion data is connected to your ad platforms, so campaigns can learn from real outcomes.", "⇄", "CONNECTIONS", ["Ad accounts linked", "Enhanced conversions set", "Purchase data sent"]],
      ["VERIFY", "Test before you trust.", "We check that each event fires once, at the right moment, with the right details.", "✓", "QUALITY CHECKS", ["Events tested", "Values checked", "Totals compared"]],
      ["REPORT", "Turn data into decisions.", "Reports focus on the numbers you can act on, so the next step is clearer.", "▥", "REPORTING", ["Key numbers tracked", "Channels compared", "Next steps agreed"]],
    ],
  },
  lab: {
    name: "Tracking Lab",
    brief: "Tracking",
    preview: "TRACKING",
    heading: "YOUR SITE.\nYOUR DATA.",
    highlight: "YOUR TRACKING PLAN.",
    description: "Pick your goal, what you need to track and your traffic to shape a sample plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What do you need your data to tell you?",
      options: [
        ["Which leads are real", "🎯", "Your lead tracking plan", "LEAD"],
        ["What drives sales", "🛒", "Your e-commerce tracking plan", "SALE"],
        ["Which channels work", "📊", "Your attribution plan", "REPORT"],
      ],
    },
    scope: {
      name: "THE SETUP",
      question: "What should we focus on first?",
      kpi: "Focus",
      options: [
        ["GA4", "▥", "GA4", "Set up GA4 around the key events your business depends on"],
        ["Tag Manager", "⟳", "Tag Manager", "Bring your tags together in one clean Tag Manager container"],
        ["Ad conversions", "✓", "Ad conversions", "Connect accurate conversion data to your ad platforms"],
        ["Help me decide", "?", "TBD", "Begin with a tracking audit to find the most important gaps"],
      ],
    },
    range: {
      name: "THE TRAFFIC",
      question: "Roughly how many visits does your site get each month?",
      kpi: "Monthly visits",
      min: 1000,
      max: 500000,
      step: 1000,
      value: 20000,
      caption: "Monthly website visits",
      minLabel: "1,000",
      maxLabel: "5,00,000+",
      note: "A rough number is fine. It only helps us think about the scale of the setup.",
      planText: "With about {value} monthly visits, we would begin by checking that your most important actions are recorded correctly.",
    },
    stage: {
      question: "Where is your tracking today?",
      options: [
        ["Nothing set up", "start with GA4, Tag Manager and your most important events"],
        ["Set up, not trusted", "audit what exists and fix what is missing or duplicated"],
        ["Working, needs depth", "add enhanced conversions, e-commerce detail and clearer reporting"],
      ],
    },
    funnel: "VISIT, EVENT, CONVERSION, REPORT",
    planTitle: "Your analytics and tracking plan",
    planText: "Start by agreeing what counts as a result, then make sure each one is recorded once and correctly.",
  },
  difference: {
    heading: "NOT MORE DASHBOARDS.\nBETTER ANSWERS.",
    description: "Data only helps if people believe it and can act on it. We keep the setup clean and the reporting useful.",
    imageLabel: "TRACKING, WITH A PLAN ✳",
    points: [
      ["Business goals first.", "We start with what you need to know, then decide what to track."],
      ["Clean over clever.", "A simple, well-named setup is easier to trust and maintain."],
      ["Tested, not assumed.", "Events are checked before anyone makes decisions from them."],
      ["Yours to keep.", "The setup is documented, so it doesn't depend on one person's memory."],
    ],
  },
  related: {
    heading: "TRACKING MAKES\nEVERY CHANNEL SMARTER.",
    description: "Clean data helps your paid media, search and website decide what to do next.",
    items: ["performance", "sem", "seo", "website"],
  },
  insights: "GA4, TAG MANAGER, ATTRIBUTION, CONVERSIONS, REPORTING",
  faq: {
    heading: "TRACKING,\nIN PLAIN LANGUAGE.",
    intro: "What businesses usually ask about analytics and conversion tracking.",
    items: [
      ["What is conversion tracking?", "It records the actions that matter to your business, such as a form submission, a call or a purchase, so you can see which marketing led to them."],
      ["What is the difference between GA4 and Google Tag Manager?", "GA4 is where you read and analyse the data. Tag Manager is the tool that manages the tags and sends data to GA4 and other platforms."],
      ["What are enhanced conversions?", "They add first-party details to your conversion data in a hashed form, which can help ad platforms match conversions more completely."],
      ["Why don't my numbers match across platforms?", "Platforms count and credit conversions differently, so some difference is normal. Large gaps can point to missing or duplicate tracking, which an audit can reveal."],
      ["Do I need to rebuild my tracking from scratch?", "Not always. We review what you have first, then keep what works and fix or replace what doesn't."],
      ["Does tracking raise privacy concerns?", "It can, so consent and data handling should be part of the setup. You should still confirm the legal requirements for your business and region."],
    ],
  },
  final: {
    heading: "STOP GUESSING WHAT WORKED.\nSTART KNOWING.",
    description: "Let's build tracking your team can trust and act on.",
    cta: "Plan My Tracking",
  },
});
