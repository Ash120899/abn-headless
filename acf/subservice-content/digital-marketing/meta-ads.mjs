// Written content for /services/digital-marketing/meta-ads/.
import { adBudget, subservice } from "../_shared.mjs";

export const PAGE_ID = 13418;

export const acf = subservice({
  service: "digital-marketing",
  crumb: "Meta Ads",
  rail: "META ADS",
  meta: "Meta Ads by ABN Junction: Facebook and Instagram campaigns with audience strategy, lead generation, creative testing, retargeting and conversion tracking.",
  hero: {
    eyebrow: "Meta Ads",
    before: "FROM",
    highlight: "SCROLLING",
    after: "TO STOPPING.",
    description:
      "We plan and run Facebook and Instagram campaigns around commercial outcomes, not vanity numbers. Audience strategy, creative testing, retargeting and measurement all work together.",
    cta: "Plan My Meta Ads",
    tags: [["◎", "Lead Generation"], ["⇄", "Creative Testing"], ["↺", "Retargeting"]],
    highlights: "Facebook Ads, Instagram Ads, Lead Generation, Retargeting",
  },
  marquee: [
    "FACEBOOK ADS, INSTAGRAM ADS, META LEAD GEN, RETARGETING, CREATIVE TESTING, AUDIENCE STRATEGY",
    "REELS ADS, LOOKALIKE AUDIENCES, PIXEL SETUP, CONVERSIONS API, LANDING PAGES, REPORTING",
  ],
  problems: {
    heading: "THE ADS ARE GETTING CLICKS.\nWHERE ARE THE CUSTOMERS?",
    description: "Meta makes it easy to spend money and easy to feel busy. Results depend on what happens around the ad as well.",
    items: [
      ["CREATIVE FATIGUE", "↘", "The same ad runs too long.", "As people keep seeing the same creative, its performance can drop off."],
      ["WEAK LEADS", "⚠", "Forms fill up, sales stay flat.", "Without qualification and follow-up, a cheap lead may never become a customer."],
      ["BLIND SPOTS", "⇄", "Nobody trusts the numbers.", "Without proper tracking, it's hard to know which campaign actually worked."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE META ADS PROGRAMME.",
    description: "We connect strategy, creative and measurement. Select a capability to see what the work includes.",
    items: [
      ["◎", "Audience Strategy", "Reach the right people.", "Planning audiences around your customers, offers and funnel stages."],
      ["▤", "Campaign Setup", "Build a clean account structure.", "Campaign structure, objectives, budgets and placements on Facebook and Instagram."],
      ["✎", "Lead Generation", "Turn interest into enquiries.", "Lead forms or landing page campaigns with attention to lead quality."],
      ["⇄", "Creative Testing", "Learn what makes people stop.", "Testing messages, visuals and formats in a structured way."],
      ["↺", "Retargeting", "Stay in front of warm audiences.", "Campaigns for people who visited, engaged or started to enquire."],
      ["▥", "Tracking & Reporting", "See what's driving results.", "Pixel and conversion tracking setup, plus reporting around business outcomes."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM FIRST AD TO REAL RESULTS.",
    description: "Scroll through how a Meta Ads campaign is planned, launched and improved.",
    slides: [
      ["GOAL", "Agree what counts.", "We start with the outcome you need, whether it's leads, sales or awareness.", "◎", "CAMPAIGN GOAL", ["Outcome agreed", "Offer reviewed", "Budget discussed"]],
      ["TRACK", "Measure before you spend.", "Tracking is checked first, so results can be read properly from day one.", "▥", "TRACKING", ["Pixel checked", "Events confirmed", "Reporting planned"]],
      ["AUDIENCE", "Choose who to reach.", "Audiences are planned for people discovering you and those who already know you.", "⌕", "AUDIENCES", ["New audiences planned", "Retargeting planned", "Exclusions set"]],
      ["CREATIVE", "Give people a reason to stop.", "Creative is prepared for each placement, with distinct ideas ready to test.", "✎", "CREATIVE", ["Messages drafted", "Formats prepared", "Variations ready"]],
      ["LAUNCH", "Go live with structure.", "Campaigns launch with clear objectives, sensible budgets and tidy naming.", "▶", "LAUNCH", ["Campaigns live", "Budgets set", "Naming organised"]],
      ["IMPROVE", "Keep what works.", "We review the results regularly, refresh creative and adjust where it's needed.", "↗", "OPTIMISATION", ["Results reviewed", "Creative refreshed", "Budget adjusted"]],
    ],
  },
  lab: {
    name: "Meta Ads Lab",
    brief: "Meta Ads",
    preview: "META ADS",
    heading: "YOUR AUDIENCE.\nYOUR BUDGET.",
    highlight: "YOUR META ADS PLAN.",
    description: "Pick your goal, focus and budget to shape a sample plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What should your Meta Ads achieve?",
      options: [
        ["Generate leads", "🎯", "Your lead generation plan", "LEAD"],
        ["Drive online sales", "🛒", "Your sales campaign plan", "SALE"],
        ["Build awareness", "📣", "Your awareness plan", "REACH"],
      ],
    },
    scope: {
      name: "THE FOCUS",
      question: "What needs the most attention?",
      kpi: "Focus",
      options: [
        ["New campaigns", "▶", "New campaigns", "Build a clean account structure and launch your first tests"],
        ["Better creative", "✎", "Better creative", "Plan structured tests of messages, visuals and formats"],
        ["Retargeting", "↺", "Retargeting", "Set up campaigns for people who have already shown interest"],
        ["Help me decide", "?", "TBD", "Begin with an account review to find the most useful next step"],
      ],
    },
    range: adBudget("Roughly how much would you like to spend on ads each month?"),
    stage: {
      question: "Where are you with Meta Ads today?",
      options: [
        ["Haven't started", "set up tracking and account structure before launching"],
        ["Boosting posts", "move to structured campaigns with clear objectives"],
        ["Running, not scaling", "review tracking, creative and audiences to find the bottleneck"],
      ],
    },
    funnel: "REACH, ENGAGE, CLICK, LEAD",
    planTitle: "Your Meta Ads plan",
    planText: "Start with reliable tracking and a clear offer, then test distinct creative ideas before scaling budget.",
  },
  difference: {
    heading: "NOT JUST BOOSTED POSTS.\nA PROPER SYSTEM.",
    description: "Meta campaigns work best when audience, creative, landing page and follow-up are planned as one journey.",
    imageLabel: "META ADS, WITH A PLAN ✳",
    points: [
      ["Outcomes over vanity.", "We focus on enquiries and sales, not only likes and clicks."],
      ["Creative as a system.", "Structured tests show which ideas are worth more budget."],
      ["Tracking first.", "Measurement is checked before money goes in."],
      ["Joined-up funnel.", "Ads connect with your landing pages, CRM and follow-up."],
    ],
  },
  related: {
    heading: "META ADS WORK BETTER\nAS PART OF THE SYSTEM.",
    description: "Connect your campaigns to tracking, search, creative and follow-up.",
    items: ["performance", "analytics", "campaigndesign", "email"],
  },
  insights: "META ADS, CREATIVE TESTING, RETARGETING, LEAD GENERATION, AUDIENCES",
  faq: {
    heading: "META ADS,\nEXPLAINED SIMPLY.",
    intro: "What businesses usually ask about Facebook and Instagram advertising.",
    items: [
      ["Are Meta Ads the same as Facebook Ads?", "Meta Ads covers advertising across Meta's platforms, mainly Facebook and Instagram, all managed from one ad account."],
      ["How much should I spend?", "It depends on your goals, market and offer. We help you choose a budget that allows meaningful testing. That is separate from any management fee."],
      ["How soon will I see results?", "Campaigns can start delivering quickly, but they usually need time to test and learn. We can't promise a specific result or timeline."],
      ["Should I use lead forms or a landing page?", "Both can work. Lead forms reduce friction, while landing pages give more room to explain and qualify. Your offer helps decide."],
      ["What is retargeting?", "It means showing ads to people who have already interacted with your business, such as website visitors or people who engaged with your content."],
      ["Do you create the ad creatives too?", "Yes. Our design and video teams can create ads, or we can work with assets you already have."],
    ],
  },
  final: {
    heading: "MAKE EVERY SCROLL\nCOUNT FOR MORE.",
    description: "Let's plan Meta Ads campaigns built around real business outcomes.",
    cta: "Plan My Meta Ads",
  },
});
