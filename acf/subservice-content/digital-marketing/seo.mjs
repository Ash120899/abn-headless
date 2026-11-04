// Written content for /services/digital-marketing/seo/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 1194;

export const acf = subservice({
  service: "digital-marketing",
  crumb: "Search Engine Optimization",
  rail: "SEO",
  meta: "SEO services by ABN Junction: keyword strategy, on-page optimization, technical audits, content, link building and local SEO for long-term organic growth.",
  hero: {
    eyebrow: "Search Engine Optimization",
    before: "FROM",
    highlight: "HIDDEN",
    after: "TO EASILY FOUND.",
    description:
      "People are already searching for what you offer. We connect keyword strategy, technical health, useful content and authority so your website can show up for the searches that matter.",
    cta: "Plan My SEO",
    tags: [["⌕", "Keyword Strategy"], ["↗", "Organic Growth"], ["◎", "Local Visibility"]],
    highlights: "Technical SEO, On-Page Optimization, Content SEO, Local SEO",
  },
  marquee: [
    "KEYWORD RESEARCH, ON-PAGE SEO, TECHNICAL AUDITS, LOCAL SEO, LINK BUILDING, CONTENT SEO",
    "SEARCH INTENT, CRAWL HEALTH, MOBILE SEO, SITE SPEED, TOPIC CLUSTERS, ORGANIC GROWTH",
  ],
  problems: {
    heading: "YOU HAVE A WEBSITE.\nDOES ANYONE FIND IT?",
    description:
      "Good businesses stay invisible when search engines cannot crawl, understand or trust their websites. SEO fixes the causes, not just the symptoms.",
    items: [
      ["WRONG KEYWORDS", "⌕", "Ranking for nothing useful.", "Pages target terms with little intent, or miss the searches real customers use."],
      ["TECHNICAL DRAG", "↘", "Search engines struggle.", "Broken links, slow pages and crawl errors hold back otherwise good content."],
      ["NO AUTHORITY", "◎", "Competitors look stronger.", "Thin content and few quality backlinks make it hard to earn visibility."],
    ],
  },
  offers: {
    heading: "SIX SEO DISCIPLINES.\nONE ORGANIC STRATEGY.",
    description: "Rankings rarely come from one fix. Select a discipline to see what the work includes.",
    items: [
      ["⌕", "Keyword Research & Strategy", "Find the high-value searches worth targeting.", "Intent research, competitor gaps, keyword mapping and a prioritized plan for each page."],
      ["✎", "On-Page Optimization", "Make each page clear to people and search engines.", "Titles, meta tags, headings, internal links and copy aligned with search intent."],
      ["⚙", "Technical SEO Audits", "Find and fix what holds your site back.", "Broken links, slow loading, crawl errors, indexing issues and mobile experience."],
      ["▣", "Content SEO & Creation", "Publish content your audience finds useful.", "Topic planning, optimized articles and improvements to existing pages."],
      ["↗", "Link Building & Outreach", "Earn the authority that supports rankings.", "Strategic outreach and partnerships focused on relevant, quality backlinks."],
      ["◎", "Local SEO", "Get found by customers near you.", "Local listings, local keywords and location-focused pages."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM UNSEEN TO FOUND.",
    description: "Scroll through how an SEO programme builds, from first audit to steady improvement.",
    slides: [
      ["AUDIT", "See where you stand.", "We review your site, your rankings and your competitors to find what is helping and what is holding you back.", "◎", "SITE AUDIT", ["Crawl and indexing checked", "Speed and mobile reviewed", "Competitors compared"]],
      ["RESEARCH", "Find the searches that matter.", "We look for terms with real intent, then map them to the pages that should answer them.", "⌕", "KEYWORD MAP", ["Search intent grouped", "Pages mapped to terms", "Priorities agreed"]],
      ["FIX", "Clear the technical path.", "We resolve the issues that stop search engines from crawling and understanding your site.", "⚙", "TECHNICAL FIXES", ["Broken links resolved", "Page speed improved", "Crawl errors cleared"]],
      ["OPTIMIZE", "Make every page clearer.", "Titles, headings, copy and internal links are improved so each page has one obvious job.", "✎", "ON-PAGE", ["Titles and meta updated", "Headings structured", "Internal links added"]],
      ["BUILD", "Earn content and authority.", "Useful content and relevant backlinks give search engines more reason to trust your site.", "↗", "AUTHORITY", ["Content calendar live", "Outreach underway", "Quality over volume"]],
      ["IMPROVE", "Measure, learn, repeat.", "We report on visibility, traffic and conversions, then choose the next priorities together.", "⟳", "REPORTING", ["Rankings tracked", "Traffic and leads reviewed", "Next priorities set"]],
    ],
  },
  lab: {
    name: "SEO Lab",
    brief: "SEO",
    preview: "SEO",
    heading: "YOUR WEBSITE.\nYOUR SEARCHES.",
    highlight: "YOUR SEO PLAN.",
    description: "Answer a few questions to shape a sample SEO plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What do you want search to do for your business?",
      options: [
        ["More qualified leads", "🎯", "Your lead-focused SEO plan", "LEAD"],
        ["More online sales", "🛒", "Your e-commerce SEO plan", "SALE"],
        ["More local customers", "📍", "Your local SEO plan", "VISIT"],
      ],
    },
    scope: {
      name: "THE FOCUS",
      question: "What should we look at first?",
      kpi: "First focus",
      options: [
        ["Technical health", "⚙", "Technical", "Start with a technical audit and fix what blocks crawling and speed"],
        ["Content and keywords", "✎", "Content", "Start with keyword research and a content plan built around intent"],
        ["Local visibility", "◎", "Local", "Start with local listings, local keywords and location pages"],
        ["Help me decide", "?", "TBD", "Start with a full audit and let the findings set the priorities"],
      ],
    },
    range: {
      name: "THE SIZE",
      question: "Roughly how many pages does your website have?",
      kpi: "Website pages",
      min: 10,
      max: 500,
      step: 10,
      value: 50,
      caption: "Approximate pages",
      minLabel: "10",
      maxLabel: "500+",
      note: "A rough number is fine. It helps us scope the audit.",
      planText: "With about {value} pages, we would prioritize the ones closest to your customers first.",
    },
    stage: {
      question: "Where is your SEO today?",
      options: [
        ["Never done SEO", "set up tracking and baseline rankings first"],
        ["Tried it before", "review past work and find what still holds value"],
        ["Already ranking", "defend what works and expand into new topics"],
      ],
    },
    funnel: "SEARCH, RANKING, CLICK, LEAD",
    planTitle: "Your SEO plan",
    planText: "Start with an audit, fix what blocks search engines, then build content around real intent.",
  },
  difference: {
    heading: "NOT MORE KEYWORDS.\nBETTER VISIBILITY.",
    description: "SEO works when strategy, technical health and content support each other. We plan them together and explain every decision in plain language.",
    imageLabel: "SEO, WITH A PLAN ✳",
    points: [
      ["Start from your business.", "We look at your goals and customers before choosing a single keyword."],
      ["Fix the foundations first.", "Great content cannot perform on a site search engines struggle to read."],
      ["Earn authority honestly.", "We focus on relevant links and useful content, not shortcuts that risk penalties."],
      ["Report what matters.", "A dedicated point of contact keeps you updated on visibility, traffic and leads."],
    ],
  },
  related: {
    heading: "SEARCH DOESN'T WORK\nIN ISOLATION.",
    description: "Organic visibility grows faster when content, paid search and your website work together.",
    items: ["sem", "content", "website", "smm"],
  },
  insights: "RANKINGS, KEYWORDS, BACKLINKS, CONTENT, SEARCH",
  faq: {
    heading: "SEO,\nWITHOUT THE MYSTERY.",
    intro: "What businesses usually ask before investing in SEO.",
    items: [
      ["How long does SEO take to show results?", "It depends on your competition, your site and your starting point. SEO is a long-term investment, and early work usually focuses on foundations before visibility builds."],
      ["Can you guarantee a number one ranking?", "No, and we would be cautious of anyone who does. Search engines decide rankings. We focus on the work that improves your chances and report honestly on progress."],
      ["What is technical SEO?", "It is the work that helps search engines crawl and understand your site, such as fixing broken links, slow pages, crawl errors and mobile issues."],
      ["Do small businesses need SEO?", "Often, yes. Local SEO in particular can help smaller businesses reach nearby customers who are already searching."],
      ["Do you write the content too?", "Yes. Content creation and optimization can be part of the agreed scope, alongside improving pages you already have."],
      ["Should I choose SEO or paid ads?", "They do different jobs. Ads can bring traffic quickly while SEO builds long-term visibility. Many businesses benefit from both."],
    ],
  },
  final: {
    heading: "YOUR NEXT CUSTOMER\nIS ALREADY SEARCHING.",
    description: "Let's make sure they can find you.",
    cta: "Plan My SEO",
  },
});
