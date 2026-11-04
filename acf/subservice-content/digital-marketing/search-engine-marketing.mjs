// Written content for /services/digital-marketing/search-engine-marketing/.
import { subservice, adBudget } from "../_shared.mjs";

export const PAGE_ID = 2255;

export const acf = subservice({
  service: "digital-marketing",
  crumb: "Search Engine Marketing",
  rail: "SEM",
  meta: "Search engine marketing by ABN Junction: PPC campaign management, keyword research, ad copy, landing page optimization, tracking and budget management.",
  hero: {
    eyebrow: "Search Engine Marketing",
    before: "BE THERE",
    highlight: "WHEN THEY",
    after: "SEARCH.",
    description:
      "Search ads reach people at the moment they are looking for what you offer. We plan, write and manage campaigns that turn that intent into visits and enquiries.",
    cta: "Plan My Search Campaign",
    tags: [["⌕", "Google Ads"], ["↗", "PPC Management"], ["◎", "High Intent"]],
    highlights: "PPC Management, Keyword Research, Ad Copywriting, Landing Pages",
  },
  marquee: [
    "GOOGLE ADS, PPC CAMPAIGNS, KEYWORD RESEARCH, AD COPY, REMARKETING, DISPLAY ADS",
    "SEARCH INTENT, QUALITY LEADS, LANDING PAGES, BUDGET CONTROL, ANALYTICS, CONVERSIONS",
  ],
  problems: {
    heading: "THEY'RE SEARCHING.\nDO THEY FIND YOU?",
    description: "Search ads can bring in ready buyers, but poorly set up campaigns can also burn through budget quickly.",
    items: [
      ["WRONG SEARCHES", "⌕", "Paying for the wrong clicks.", "Broad or irrelevant keywords spend budget on people who will never buy."],
      ["WEAK ADS", "✎", "Ads that blend in.", "Generic copy gets ignored, while competitors take the clicks."],
      ["LEAKY PAGES", "↘", "Clicks that go nowhere.", "If the landing page doesn't match the ad, interested visitors leave."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE SEARCH STRATEGY.",
    description: "We manage the full path from search to enquiry. Select a capability to see what it includes.",
    items: [
      ["↗", "PPC Campaign Management", "Drive targeted traffic with well-run campaigns.", "Campaign structure, bidding, ad placement and continuous adjustments."],
      ["⌕", "Keyword Research & Selection", "Target the searches worth paying for.", "High-intent keyword discovery, negative keywords and grouping."],
      ["✎", "Ad Copywriting & Design", "Write ads people want to click.", "Compelling ad copy and display visuals that match each audience."],
      ["▣", "Landing Page Optimization", "Keep the promise your ad made.", "Page design and content improvements that support conversions."],
      ["▥", "Performance Tracking", "See what your budget is actually doing.", "Conversion tracking, detailed reports and insights for each campaign."],
      ["◎", "Budget Management", "Spend where it does the most good.", "Allocating and adjusting budgets within your limits."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM SEARCH TO ENQUIRY.",
    description: "Scroll through how a search campaign takes shape, from first keyword to ongoing optimization.",
    slides: [
      ["GOAL", "Agree what success means.", "We start with your goals, your customers and a budget we can responsibly test.", "◎", "CAMPAIGN GOAL", ["Target action agreed", "Budget agreed", "Locations confirmed"]],
      ["KEYWORDS", "Find the right searches.", "We look for terms with real buying intent and filter out what wastes money.", "⌕", "KEYWORD PLAN", ["Intent grouped", "Negatives added", "Match types chosen"]],
      ["ADS", "Write ads that earn the click.", "Clear, relevant copy connects each search to your offer.", "✎", "AD COPY", ["Headlines tested", "Offer made clear", "Assets added"]],
      ["LANDING", "Make the next step obvious.", "The page should answer the search and make enquiring easy.", "▣", "LANDING PAGE", ["Message matched", "Page reviewed", "Form simplified"]],
      ["TRACK", "Measure what matters.", "Conversion tracking shows which searches and ads produce real enquiries.", "✓", "TRACKING", ["Conversions set up", "Calls and forms tracked", "Reports shared"]],
      ["OPTIMIZE", "Improve week after week.", "We refine bids, keywords and ads, and bring back past visitors with remarketing.", "⟳", "OPTIMIZATION", ["Search terms reviewed", "Bids adjusted", "Remarketing live"]],
    ],
  },
  lab: {
    name: "Search Lab",
    brief: "Search",
    preview: "SEARCH",
    heading: "YOUR CUSTOMERS.\nYOUR SEARCHES.",
    highlight: "YOUR SEARCH PLAN.",
    description: "Choose your goal, channel and budget to shape a sample search campaign, then send it to us for a personalized discussion.",
    goal: {
      question: "What should your search ads achieve?",
      options: [
        ["Qualified leads", "🎯", "Your lead generation search plan", "LEAD"],
        ["Online sales", "🛒", "Your e-commerce search plan", "SALE"],
        ["Phone calls", "📞", "Your call generation search plan", "CALL"],
      ],
    },
    scope: {
      name: "THE CAMPAIGN",
      question: "What kind of campaign do you need?",
      kpi: "Campaign",
      options: [
        ["Search ads", "⌕", "Search", "Start with focused search ads around high-intent keywords"],
        ["Search + display", "▣", "Display", "Combine search ads with display to extend your reach"],
        ["Remarketing", "⟳", "Remarketing", "Start by bringing back people who already visited your site"],
        ["Help me decide", "?", "TBD", "Begin with a review of your market and search demand"],
      ],
    },
    range: adBudget("What monthly advertising budget are you considering?"),
    stage: {
      question: "Where are you with search ads?",
      options: [
        ["Starting fresh", "set up tracking and account structure first"],
        ["Running ads already", "audit search terms, wasted spend and conversion tracking"],
        ["Ready to scale", "expand what is profitable and test new keywords carefully"],
      ],
    },
    funnel: "SEARCH, AD, LANDING PAGE, LEAD",
    planTitle: "Your search campaign plan",
    planText: "Start with high-intent keywords, clear ads and a matching landing page before raising spend.",
  },
  difference: {
    heading: "NOT MORE CLICKS.\nBETTER SEARCHES.",
    description: "Paid search rewards relevance. We keep keywords, ads and pages closely aligned, and we are transparent about where your budget goes.",
    imageLabel: "SEARCH, WITH A PLAN ✳",
    points: [
      ["Built around your goals.", "Campaigns are structured around your business, not a template."],
      ["Keywords kept clean.", "We regularly review search terms and remove what doesn't convert."],
      ["Ads and pages aligned.", "The ad's promise continues on the page people land on."],
      ["Transparent reporting.", "Regular updates show what is happening and what we'll change next."],
    ],
  },
  related: {
    heading: "SEARCH ADS\nNEED A GOOD DESTINATION.",
    description: "Paid search gets stronger when SEO, your website and design support it.",
    items: ["performance", "seo", "website", "webdesign"],
  },
  insights: "KEYWORDS, GOOGLE ADS, BIDDING, LANDING PAGES, INTENT",
  faq: {
    heading: "SEARCH ADS,\nWITHOUT THE GUESSWORK.",
    intro: "What businesses usually ask before investing in search engine marketing.",
    items: [
      ["What is search engine marketing?", "It usually means paid advertising on search engines, where your ads appear for relevant searches and you typically pay when someone clicks."],
      ["How is SEM different from performance marketing?", "SEM focuses on search engines. Performance marketing is broader, covering outcomes across several paid channels, landing pages and tracking."],
      ["How much should I spend on Google Ads?", "It depends on your market, competition and goals. We look at feasibility first rather than promising one budget suits every business."],
      ["How soon will ads start running?", "Ads can start after set-up and approval. Reliable insights take longer, because optimization needs enough data."],
      ["Do I need a new landing page?", "Not always. We review what you have and recommend changes only where they should help conversions."],
      ["Do you offer remarketing and display ads?", "Yes. Both can be part of the plan, helping you stay visible to people who have shown interest."],
    ],
  },
  final: {
    heading: "SOMEONE IS SEARCHING\nFOR YOU RIGHT NOW.",
    description: "Let's make sure your business is there when they do.",
    cta: "Plan My Search Campaign",
  },
});
