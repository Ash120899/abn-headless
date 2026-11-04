// Written content for /services/web-development/performance-infrastructure/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 13414;

export const acf = subservice({
  service: "web-development",
  crumb: "Performance & Infrastructure",
  rail: "PERFORMANCE",
  meta: "Website performance and infrastructure by ABN Junction: caching, image strategy, hosting, CDN and monitoring that keep your platform fast under real traffic.",
  hero: {
    eyebrow: "Performance & Infrastructure",
    before: "FAST IN TESTS.",
    highlight: "FAST FOR REAL",
    after: "VISITORS.",
    description:
      "A build is only as good as how it runs. We work on caching, image strategy, hosting, CDN and monitoring to keep your platform fast under real traffic, not only in a test environment.",
    cta: "Plan My Speed Fix",
    tags: [["⚡", "Caching"], ["◎", "CDN"], ["▥", "Monitoring"]],
    highlights: "Caching, CDN, Hosting, Monitoring",
  },
  marquee: [
    "CORE WEB VITALS, CACHING, IMAGE STRATEGY, CDN, HOSTING, MONITORING, PAGE SPEED",
    "REAL TRAFFIC, SERVER RESPONSE, CODE CLEAN-UP, UPTIME CHECKS, SCALABILITY, RELIABILITY",
  ],
  problems: {
    heading: "THE SITE LOOKS FINE.\nIT JUST TAKES TOO LONG.",
    description: "Slow pages lose people before they read a word. And problems under real traffic rarely show up in a quick test.",
    items: [
      ["SLOW PAGES", "⌛", "Visitors leave before it loads.", "Heavy images, scripts and slow servers add up to a frustrating first impression."],
      ["TRAFFIC SPIKES", "⚠", "It struggles when it matters.", "A campaign or busy day can expose hosting and caching problems at the worst time."],
      ["NO VISIBILITY", "↘", "Nobody knows until customers do.", "Without monitoring, outages and slowdowns are found by the people affected."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE FASTER PLATFORM.",
    description: "We look at the whole path from server to screen. Select a capability to see what the work includes.",
    items: [
      ["⌕", "Performance Audit", "Find what's really slowing you down.", "A review of Core Web Vitals, page weight, scripts and server response."],
      ["⚡", "Caching Strategy", "Stop rebuilding what hasn't changed.", "Page, browser and object caching set up to suit how your site works."],
      ["▣", "Image Strategy", "Keep images sharp and light.", "Modern formats, sizing and lazy loading that suit your templates."],
      ["◎", "CDN Setup", "Serve content closer to your visitors.", "CDN configuration, including rules for your assets and pages."],
      ["▤", "Hosting Review", "Match hosting to real demand.", "Assessing your current setup and recommending or managing changes."],
      ["▥", "Monitoring", "Know before your customers tell you.", "Uptime and performance checks with alerts for your team."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM SLOW TO STEADY.",
    description: "Scroll through how we make a platform faster and keep it that way.",
    slides: [
      ["MEASURE", "Start with real numbers.", "We measure your key pages using both lab tests and real-visitor data where available.", "▥", "BASELINE", ["Key pages chosen", "Core Web Vitals reviewed", "Baseline recorded"]],
      ["DIAGNOSE", "Find the true causes.", "We trace the slowdown to its source, from images and scripts to the server.", "⌕", "DIAGNOSIS", ["Heavy assets found", "Scripts reviewed", "Server checked"]],
      ["PRIORITISE", "Fix what matters first.", "Changes are ordered by likely impact and effort, so the biggest wins come early.", "◎", "FIX LIST", ["Issues ranked", "Risks noted", "Plan agreed"]],
      ["OPTIMISE", "Make the changes.", "We tune caching, images, code and delivery, and test as we go so nothing breaks.", "⚡", "OPTIMISATION", ["Caching tuned", "Images optimised", "Code cleaned up"]],
      ["STRENGTHEN", "Prepare for real traffic.", "Hosting and CDN settings are checked against the demand you actually expect.", "▤", "INFRASTRUCTURE", ["Hosting reviewed", "CDN configured", "Busy periods planned"]],
      ["WATCH", "Keep it fast.", "Monitoring flags slowdowns and outages, so new problems get caught early.", "▥", "MONITORING", ["Uptime checks live", "Alerts routed", "Reviews scheduled"]],
    ],
  },
  lab: {
    name: "Speed Lab",
    brief: "Performance",
    preview: "PERFORMANCE",
    heading: "YOUR SITE.\nYOUR TRAFFIC.",
    highlight: "YOUR SPEED PLAN.",
    description: "Pick your goal, focus and traffic level to shape a sample plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What's the main problem you want solved?",
      options: [
        ["Pages load slowly", "🐢", "Your page speed plan", "SPEED"],
        ["It fails under traffic", "📈", "Your scaling plan", "STABILITY"],
        ["We need early warnings", "🔔", "Your monitoring plan", "VISIBILITY"],
      ],
    },
    scope: {
      name: "THE FOCUS",
      question: "Where should we look first?",
      kpi: "Focus",
      options: [
        ["Front end", "▣", "Front end", "Reduce page weight from images, scripts and fonts"],
        ["Server & hosting", "▤", "Server & hosting", "Review hosting, server response and caching"],
        ["CDN & delivery", "◎", "CDN & delivery", "Set up delivery so content reaches visitors faster"],
        ["Help me decide", "?", "TBD", "Begin with a performance audit of your most important pages"],
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
      note: "A rough number is fine. It helps us think about the demand your setup has to handle.",
      planText: "With about {value} monthly visits, we would check how your setup handles your busiest pages first.",
    },
    stage: {
      question: "What platform is your site on?",
      options: [
        ["WordPress or WooCommerce", "review plugins, theme weight, caching and hosting together"],
        ["Shopify", "focus on apps, theme code, images and third-party scripts"],
        ["Custom or headless", "review rendering, caching rules and delivery across the stack"],
      ],
    },
    funnel: "MEASURE, DIAGNOSE, OPTIMISE, MONITOR",
    planTitle: "Your performance and infrastructure plan",
    planText: "Start by measuring your most important pages, then fix the causes in order of likely impact.",
  },
  difference: {
    heading: "NOT JUST A BETTER SCORE.\nA FASTER EXPERIENCE.",
    description: "A test score is only a signal. What matters is how the platform feels to real visitors on real connections.",
    imageLabel: "SPEED, WITH A PLAN ✳",
    points: [
      ["Causes, not cosmetics.", "We fix what's making pages slow instead of chasing a number."],
      ["The whole path.", "Code, images, caching, hosting and CDN get looked at together."],
      ["Careful changes.", "Optimisations are tested so your forms, checkout and tracking keep working."],
      ["Ongoing visibility.", "Monitoring makes sure a fast site stays fast."],
    ],
  },
  related: {
    heading: "SPEED SUPPORTS\nEVERYTHING ELSE.",
    description: "A fast, reliable platform helps your website, search visibility and campaigns do their jobs.",
    items: ["website", "maintenance", "seo", "web-data-security"],
  },
  insights: "CORE WEB VITALS, CACHING, HOSTING, CDN, MONITORING",
  faq: {
    heading: "SPEED AND HOSTING,\nIN PLAIN LANGUAGE.",
    intro: "What businesses usually ask about website performance and infrastructure.",
    items: [
      ["What are Core Web Vitals?", "They are Google's measures of real-user experience, covering loading, responsiveness and visual stability."],
      ["Why is my site slow if my hosting is good?", "Hosting is only one part. Large images, heavy scripts, too many plugins and poor caching can slow a site on any server."],
      ["Do I need to change my hosting?", "Not necessarily. We review how your current setup performs first and only recommend moving if it's truly the limit."],
      ["What does a CDN do?", "A content delivery network stores copies of your content in locations closer to your visitors, which can reduce load times."],
      ["Will optimisation break anything?", "Any change carries some risk, so we test important features like forms, checkout and tracking as we work."],
      ["Can you guarantee a specific score?", "No. Scores vary with your platform and third-party tools. We focus on measurable improvements on the pages that matter most."],
    ],
  },
  final: {
    heading: "MAKE IT FAST\nWHERE IT COUNTS.",
    description: "Let's keep your platform quick and reliable under real traffic.",
    cta: "Plan My Speed Fix",
  },
});
