// Written content for /services/digital-marketing/programmatic-advertising/.
import { subservice, adBudget } from "../_shared.mjs";

export const PAGE_ID = 2259;

export const acf = subservice({
  service: "digital-marketing",
  crumb: "Programmatic Advertising",
  rail: "PROGRAMMATIC",
  meta: "Programmatic advertising by ABN Junction: real-time bidding, audience segmentation, creative optimization, ad fraud prevention, cross-device targeting and analytics.",
  hero: {
    eyebrow: "Programmatic Advertising",
    before: "SMARTER",
    highlight: "AD BUYING",
    after: "AT SCALE.",
    description:
      "Programmatic buys ad space automatically, in the moment, against the audiences you choose. We plan the targeting, creative and safeguards so more of your budget reaches real, relevant people.",
    cta: "Plan My Programmatic",
    tags: [["✳", "Real-Time Bidding"], ["◎", "Audience Targeting"], ["↗", "Retargeting"]],
    highlights: "Real-Time Bidding, Audience Segmentation, Cross-Device Reach, Fraud Prevention",
  },
  marquee: [
    "REAL-TIME BIDDING, DISPLAY ADS, AUDIENCE SEGMENTS, RETARGETING, CONTEXTUAL TARGETING, VIEWABILITY",
    "BEHAVIORAL TARGETING, CROSS-DEVICE, CREATIVE TESTING, AD FRAUD PREVENTION, ANALYTICS, REACH",
  ],
  problems: {
    heading: "PLENTY OF IMPRESSIONS.\nWHO ACTUALLY SAW THEM?",
    description: "Automated buying offers huge reach, but without careful targeting and checks, budget can disappear into low-quality placements.",
    items: [
      ["WRONG AUDIENCE", "◎", "Reach without relevance.", "Ads get seen by plenty of people, but not by those likely to care."],
      ["LOW QUALITY", "↘", "Impressions that don't count.", "Poor placements and invalid traffic quietly eat into your budget."],
      ["ONE-SIZE CREATIVE", "✎", "Same ad, every screen.", "Creative that isn't tested or adapted gets ignored."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE PROGRAMMATIC PLAN.",
    description: "We connect the technology to clear business goals. Select a capability to see what it includes.",
    items: [
      ["⚡", "Real-Time Bidding", "Buy ad space automatically, impression by impression.", "Automated auctions set up for precise targeting and good ad placements."],
      ["◎", "Audience Segmentation", "Reach people by interest and behavior.", "Demographic, interest and behavior-based segments, plus contextual targeting."],
      ["✎", "Creative Optimization", "Keep testing what catches attention.", "Testing and refining ad creatives using performance data."],
      ["⚠", "Ad Fraud Prevention", "Protect your budget from invalid activity.", "Checks that help detect fraud and keep ads in front of real users."],
      ["⇄", "Cross-Device Targeting", "Stay consistent across every screen.", "Coordinated delivery and messaging across desktop and mobile."],
      ["▥", "Performance Analytics", "Measure quality, not only volume.", "Tracking viewability, engagement and conversions, with regular reports."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM AUCTION TO ACTION.",
    description: "Scroll through how a programmatic campaign works, from audience planning to ongoing optimization.",
    slides: [
      ["DEFINE", "Decide who matters.", "We agree your goals and turn your ideal customers into clear audience segments.", "◎", "AUDIENCE PLAN", ["Goal agreed", "Segments defined", "Exclusions listed"]],
      ["CREATE", "Prepare ads worth seeing.", "Creative is prepared for the formats and devices your audience uses.", "✎", "AD CREATIVE", ["Formats prepared", "Messages matched", "Variations ready"]],
      ["BID", "Buy in real time.", "Automated bidding competes for placements in milliseconds, within your limits.", "⚡", "REAL-TIME BIDDING", ["Bids within limits", "Placements filtered", "Frequency capped"]],
      ["PROTECT", "Keep quality high.", "We use checks to help reduce invalid traffic and poor placements.", "⚠", "QUALITY CHECKS", ["Fraud checks active", "Viewability monitored", "Placements reviewed"]],
      ["RETARGET", "Bring back interested people.", "Retargeting reconnects with people who showed interest in your product or service.", "⟳", "RETARGETING", ["Past visitors segmented", "Messages adapted", "Cross-device reach"]],
      ["IMPROVE", "Learn and adjust.", "Regular reports show what is working, so budget can follow the evidence.", "▥", "REPORTING", ["Results reported", "Creative refreshed", "Budget rebalanced"]],
    ],
  },
  lab: {
    name: "Programmatic Lab",
    brief: "Programmatic",
    preview: "PROGRAMMATIC",
    heading: "YOUR AUDIENCE.\nYOUR BUDGET.",
    highlight: "YOUR MEDIA PLAN.",
    description: "Set your goal, targeting and budget to shape a sample media plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What should your campaign achieve?",
      options: [
        ["Brand awareness", "📣", "Your awareness media plan", "RECALL"],
        ["Website traffic", "🌐", "Your traffic media plan", "VISIT"],
        ["Leads and sales", "🎯", "Your conversion media plan", "LEAD"],
      ],
    },
    scope: {
      name: "THE TARGETING",
      question: "How would you like to find your audience?",
      kpi: "Targeting",
      options: [
        ["Behavior", "◎", "Behavioral", "Start with behavioral segments built around interests and actions"],
        ["Context", "▣", "Contextual", "Start with contextual placements near relevant content"],
        ["Retargeting", "⟳", "Retargeting", "Start by reconnecting with people who already know you"],
        ["Help me decide", "?", "TBD", "Begin with an audience review to choose the right mix"],
      ],
    },
    range: adBudget("What monthly media budget are you considering?"),
    stage: {
      question: "Where are you with programmatic?",
      options: [
        ["Completely new", "start small and establish tracking and quality checks first"],
        ["Tried display ads", "review placement quality and creative performance"],
        ["Ready to scale", "expand into new segments while watching quality closely"],
      ],
    },
    funnel: "IMPRESSION, VIEW, ENGAGEMENT, LEAD",
    planTitle: "Your programmatic media plan",
    planText: "Start with well-defined audiences, strong creative and quality checks before expanding reach.",
  },
  difference: {
    heading: "NOT MORE IMPRESSIONS.\nBETTER ONES.",
    description: "Programmatic is powerful, but it needs a human plan. We focus on who sees your ads and where, not just how many.",
    imageLabel: "PROGRAMMATIC, WITH A PLAN ✳",
    points: [
      ["Audience first.", "We start with who you need to reach, then choose the tactics."],
      ["Quality over volume.", "Viewability and placement quality are part of every review."],
      ["Clear reporting.", "You get regular reports written to support real decisions."],
      ["Connected to your funnel.", "Retargeting and landing pages keep the journey moving."],
    ],
  },
  related: {
    heading: "GOOD MEDIA\nNEEDS GOOD CREATIVE.",
    description: "Programmatic works harder alongside strong creative, video and performance marketing.",
    items: ["performance", "sem", "graphic", "vfx"],
  },
  insights: "AUDIENCES, BIDDING, CREATIVE, MEDIA, REACH",
  faq: {
    heading: "PROGRAMMATIC,\nIN PLAIN LANGUAGE.",
    intro: "What businesses usually ask about programmatic advertising.",
    items: [
      ["What is programmatic advertising?", "It is the automated buying of digital ad space. Auctions happen in milliseconds, so ads can be targeted to specific audiences as a page loads."],
      ["How is it different from Google Ads?", "Search ads respond to what someone is searching for. Programmatic display typically reaches audiences based on interests, behavior or context across many sites."],
      ["Is programmatic only for big brands?", "It tends to suit businesses with enough budget to test audiences and creative. We'll tell you if another channel is a better starting point."],
      ["How do you deal with ad fraud?", "We use checks to help detect invalid activity and review placements regularly. No method removes the risk completely, so we keep monitoring it."],
      ["What is viewability?", "It indicates whether an ad actually had the chance to be seen on screen. We track it because a served ad isn't always a seen ad."],
      ["What will I see in reports?", "Impressions, viewability, engagement and conversions, with notes on what we plan to change next."],
    ],
  },
  final: {
    heading: "PUT YOUR BUDGET\nIN FRONT OF THE RIGHT PEOPLE.",
    description: "Let's plan programmatic advertising around your audience and goals.",
    cta: "Plan My Programmatic",
  },
});
