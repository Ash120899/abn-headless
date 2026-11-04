// Written content for /services/video-production/content-marketing/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2317;

export const acf = subservice({
  service: "video-production",
  crumb: "Content Marketing",
  rail: "CONTENT",
  meta: "Content marketing by ABN Junction: content strategy, blogs and articles, social media content, email campaigns, SEO optimization and performance analytics.",
  hero: {
    eyebrow: "Content Marketing",
    before: "CONTENT",
    highlight: "WITH A JOB",
    after: "TO DO.",
    description:
      "Publishing more isn't a strategy. We plan articles, videos, social content and email around what your audience needs, so each piece has a purpose and can be measured.",
    cta: "Plan My Content",
    tags: [["✎", "Content Strategy"], ["▶", "Video & Social"], ["▥", "Analytics"]],
    highlights: "Content Strategy, Blogs & Articles, Social Media Content, SEO Optimization",
  },
  marquee: [
    "CONTENT STRATEGY, BLOG WRITING, VIDEO CONTENT, SOCIAL MEDIA, EMAIL CAMPAIGNS, INFOGRAPHICS",
    "SEO CONTENT, BRAND STORYTELLING, EDITORIAL CALENDAR, ANALYTICS, DISTRIBUTION, AUDIENCE RESEARCH",
  ],
  problems: {
    heading: "YOU'RE PUBLISHING.\nWHO IS IT HELPING?",
    description: "Content made without a plan takes time and rarely builds momentum. Useful content starts with what your audience wants to know.",
    items: [
      ["NO STRATEGY", "⇄", "Content without direction.", "Ideas are picked week by week, so nothing builds toward a goal."],
      ["LOW REACH", "↘", "Good work goes unseen.", "Without SEO and distribution, even strong content can struggle to be found."],
      ["NO MEASUREMENT", "◎", "Hard to prove value.", "Without clear metrics, it is difficult to know what deserves more investment."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE CONTENT ENGINE.",
    description: "We connect strategy, creation and measurement. Select a capability to see what the work includes.",
    items: [
      ["☰", "Content Strategy", "Know what to make and why.", "A plan aligned with your business goals, audience needs and industry trends."],
      ["✎", "Blog & Article Writing", "Answer the questions your audience asks.", "Informative articles that build authority and support search visibility."],
      ["◎", "Social Media Content", "Make content people want to share.", "Posts and short-form content that build visibility and community."],
      ["✉", "Email Campaigns", "Stay close to interested people.", "Targeted email content that nurtures leads and promotes your offers."],
      ["⌕", "SEO Content Optimization", "Help your content get found.", "Using search insights and SEO practices to attract organic traffic."],
      ["▥", "Content Analytics", "See what is earning attention.", "Tracking performance so future decisions rest on evidence."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM IDEA TO INFLUENCE.",
    description: "Scroll through how a content programme works, from research to continuous improvement.",
    slides: [
      ["RESEARCH", "Learn what people want.", "We look at your audience, competitors and existing content to find real opportunities.", "⌕", "CONTENT AUDIT", ["Audience reviewed", "Competitors compared", "Gaps found"]],
      ["PLAN", "Build the calendar.", "Topics and formats are chosen around your goals and laid out in a realistic plan.", "☰", "EDITORIAL CALENDAR", ["Topics agreed", "Formats selected", "Schedule set"]],
      ["CREATE", "Make it genuinely useful.", "Articles, videos and graphics are created in your brand's voice.", "✎", "PRODUCTION", ["Drafts written", "Video produced", "Graphics designed"]],
      ["OPTIMIZE", "Prepare it to be found.", "Each piece is reviewed for search, readability and the next action.", "✓", "OPTIMIZATION", ["Keywords reviewed", "Links added", "Action made clear"]],
      ["DISTRIBUTE", "Take it to your audience.", "We share content through social media, email and other relevant channels.", "↗", "DISTRIBUTION", ["Social posts scheduled", "Email sent", "Content repurposed"]],
      ["LEARN", "Measure and adjust.", "Performance data shows what to make more of, and what to change.", "⟳", "ANALYTICS", ["Performance reported", "Winners expanded", "Plan updated"]],
    ],
  },
  lab: {
    name: "Content Lab",
    brief: "Content",
    preview: "CONTENT",
    heading: "YOUR AUDIENCE.\nYOUR STORY.",
    highlight: "YOUR CONTENT PLAN.",
    description: "Pick your goal and formats to shape a sample content plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What should your content achieve?",
      options: [
        ["Generate leads", "🎯", "Your lead generation content plan", "LEAD"],
        ["Grow organic traffic", "🔍", "Your organic growth content plan", "TRAFFIC"],
        ["Build authority", "🏆", "Your thought leadership plan", "TRUST"],
      ],
    },
    scope: {
      name: "THE FORMAT",
      question: "Which format should lead?",
      kpi: "Lead format",
      options: [
        ["Articles", "✎", "Articles", "Lead with useful articles built around search intent"],
        ["Video", "▶", "Video", "Lead with video stories and repurpose them for other channels"],
        ["Social", "◎", "Social", "Lead with short social content that builds attention"],
        ["Help me decide", "?", "TBD", "Begin with a content audit and audience research"],
      ],
    },
    range: {
      name: "THE RHYTHM",
      question: "How many pieces of content a month feels realistic?",
      kpi: "Pieces a month",
      min: 2,
      max: 40,
      step: 1,
      value: 8,
      caption: "Pieces each month",
      minLabel: "2",
      maxLabel: "40+",
      note: "A rough number is fine. Consistency usually matters more than volume.",
      planText: "A rhythm of about {value} pieces a month gives us a starting point for your calendar.",
    },
    stage: {
      question: "Where is your content today?",
      options: [
        ["Starting fresh", "define your audience, topics and voice first"],
        ["Publishing without a plan", "audit what exists and focus on what has potential"],
        ["Ready to scale", "expand into new formats while watching performance"],
      ],
    },
    funnel: "DISCOVER, READ, TRUST, LEAD",
    planTitle: "Your content marketing plan",
    planText: "Research what your audience needs, keep a realistic calendar, and measure what each piece does.",
  },
  difference: {
    heading: "NOT MORE CONTENT.\nMORE USEFUL CONTENT.",
    description: "We treat content as a business investment. Every piece should have an audience, a purpose and a way of being measured.",
    imageLabel: "CONTENT, WITH A PLAN ✳",
    points: [
      ["Research comes first.", "Topics come from what your audience actually wants to know."],
      ["One idea, many formats.", "A good story can work across articles, video and social media."],
      ["Built to be found.", "SEO and distribution are part of the plan from the start."],
      ["Measured properly.", "Regular reports connect content to outcomes that matter."],
    ],
  },
  related: {
    heading: "GOOD CONTENT\nNEEDS GOOD COMPANY.",
    description: "Content reaches further with strong video, SEO and social media behind it.",
    items: ["editing", "seo", "smm", "email"],
  },
  insights: "STORYTELLING, SEO, VIDEO, AUDIENCES, STRATEGY",
  faq: {
    heading: "CONTENT MARKETING,\nHONESTLY ANSWERED.",
    intro: "What businesses usually ask before investing in content marketing.",
    items: [
      ["What is content marketing?", "It means creating useful content that attracts and helps your audience, so they get to know your business before they are ready to buy."],
      ["How long until content shows results?", "Content tends to build over time. Some formats get attention quickly, while search visibility usually takes longer."],
      ["What types of content do you create?", "Depending on the plan, we can create blog posts, social media content, videos, email campaigns and infographics."],
      ["Do you need our input?", "Yes. Your knowledge of your customers and products is valuable, and we keep the process practical for your team."],
      ["How is this linked with SEO?", "They support each other. SEO helps content reach people searching for it, and useful content gives search engines something worth ranking."],
      ["How do you measure content marketing?", "We agree on metrics that match your goal, such as organic traffic, engagement, leads or conversions."],
    ],
  },
  final: {
    heading: "SAY SOMETHING\nYOUR AUDIENCE NEEDS TO HEAR.",
    description: "Let's plan content that earns attention and supports your business.",
    cta: "Plan My Content",
  },
});
