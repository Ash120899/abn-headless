// Written content for /services/web-development/website-development/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2306;

export const acf = subservice({
  service: "web-development",
  crumb: "Website Development",
  rail: "WEBSITES",
  meta: "Website development by ABN Junction: custom websites, e-commerce solutions, WordPress and CMS builds, web applications, responsive development and SEO foundations.",
  hero: {
    eyebrow: "Website Development",
    before: "BUILT",
    highlight: "TO PERFORM",
    after: "NOT JUST TO LAUNCH.",
    description:
      "A website should be fast, stable and easy to grow. Whether you need a new build or a rebuild, we develop sites around your business needs and keep them running afterwards.",
    cta: "Plan My Build",
    tags: [["⚙", "Custom Development"], ["✓", "Mobile-Friendly"], ["↗", "E-commerce"]],
    highlights: "Custom Websites, E-commerce, WordPress & CMS, Website Maintenance",
  },
  marquee: [
    "CUSTOM WEBSITES, E-COMMERCE, WORDPRESS, WEB APPLICATIONS, RESPONSIVE BUILDS, WEBSITE MAINTENANCE",
    "SITE SPEED, SEO FOUNDATIONS, PAYMENT INTEGRATION, CMS SETUP, MOBILE-FRIENDLY, SCALABLE CODE",
  ],
  problems: {
    heading: "YOUR WEBSITE IS LIVE.\nIS IT HOLDING YOU BACK?",
    description: "Slow, fragile or hard-to-edit websites cost you enquiries and team time, long after launch.",
    items: [
      ["SLOW PAGES", "↘", "Visitors don't wait.", "Heavy, slow pages frustrate users and hurt your search visibility."],
      ["HARD TO CHANGE", "⚙", "Small edits become big jobs.", "Fragile builds make simple updates depend on a developer."],
      ["NO ONE LOOKING AFTER IT", "⚠", "It quietly falls behind.", "Without maintenance, sites become outdated and harder to keep secure."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE DEPENDABLE WEBSITE.",
    description: "We build for today's launch and next year's changes. Select a capability to see what it includes.",
    items: [
      ["⚙", "Custom Website Development", "A site built for your specific needs.", "Tailor-made websites planned around your business and users."],
      ["↗", "E-commerce Solutions", "Sell online with confidence.", "Secure online stores with payment integrations and smooth checkout."],
      ["☰", "Content Management Systems", "Update content without technical help.", "User-friendly platforms such as WordPress, set up for your team."],
      ["▣", "Web Application Development", "Add custom functionality to your business.", "Dynamic web applications that support your operations."],
      ["✓", "Responsive Development", "Work properly on every device.", "Consistent behavior across desktops, tablets and smartphones."],
      ["⌕", "SEO Foundations", "Give your site a head start in search.", "Clean structure and technical best practice for organic visibility."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM PLAN TO PRODUCTION.",
    description: "Scroll through how a website goes from first conversation to a stable live site.",
    slides: [
      ["PLAN", "Agree what to build.", "We turn your goals into a clear scope, so everyone knows what is being delivered.", "◎", "PROJECT SCOPE", ["Goals agreed", "Features listed", "Timeline set"]],
      ["ARCHITECT", "Choose the right foundation.", "The platform and structure should fit your content, traffic and future plans.", "☰", "ARCHITECTURE", ["Platform chosen", "Structure planned", "Integrations mapped"]],
      ["BUILD", "Turn designs into code.", "We develop pages and features carefully, with regular progress you can see.", "⚙", "DEVELOPMENT", ["Templates built", "Features developed", "Progress shared"]],
      ["CONNECT", "Wire up the essentials.", "Forms, payments, analytics and third-party tools are connected and checked.", "⇄", "INTEGRATIONS", ["Forms connected", "Payments tested", "Analytics set up"]],
      ["TEST", "Check before going live.", "We test across devices and browsers, looking at speed and functionality.", "✓", "QUALITY CHECKS", ["Devices tested", "Speed reviewed", "Bugs resolved"]],
      ["MAINTAIN", "Keep it healthy.", "After launch, maintenance keeps your site updated, secure and running well.", "⟳", "MAINTENANCE", ["Updates applied", "Backups in place", "Support available"]],
    ],
  },
  lab: {
    name: "Build Lab",
    brief: "Build",
    preview: "BUILD",
    heading: "YOUR BUSINESS.\nYOUR WEBSITE.",
    highlight: "YOUR BUILD PLAN.",
    description: "Answer a few questions to shape a sample build plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What is this website for?",
      options: [
        ["Generate leads", "🎯", "Your lead generation website plan", "LEAD"],
        ["Sell products", "🛒", "Your e-commerce build plan", "SALE"],
        ["Run a process", "⚙️", "Your web application plan", "WORKFLOW"],
      ],
    },
    scope: {
      name: "THE PLATFORM",
      question: "What should it be built on?",
      kpi: "Platform",
      options: [
        ["WordPress", "☰", "WordPress", "Build on WordPress so your team can manage content easily"],
        ["E-commerce platform", "↗", "E-commerce", "Build around a store platform with secure payments"],
        ["Custom code", "⚙", "Custom", "Build a custom solution around your specific requirements"],
        ["Help me decide", "?", "TBD", "Begin by comparing platforms against your needs"],
      ],
    },
    range: {
      name: "THE SIZE",
      question: "Roughly how many pages do you need?",
      kpi: "Pages",
      min: 5,
      max: 200,
      step: 5,
      value: 20,
      caption: "Approximate pages",
      minLabel: "5",
      maxLabel: "200+",
      note: "A rough number is fine. Reusable templates can make larger sites efficient.",
      planText: "With about {value} pages, we would plan reusable templates before building.",
    },
    stage: {
      question: "Where are you starting from?",
      options: [
        ["Starting from scratch", "agree scope and design before development begins"],
        ["Rebuilding a site", "audit what exists and plan a careful migration"],
        ["Adding features", "review the current codebase and extend it safely"],
      ],
    },
    funnel: "PLAN, BUILD, TEST, LAUNCH",
    planTitle: "Your website build plan",
    planText: "Agree a clear scope, choose the right platform, and test across devices before launch.",
  },
  difference: {
    heading: "NOT JUST A LAUNCH.\nA SITE THAT LASTS.",
    description: "We think about what happens after go-live, including who will edit the site, how it will grow and how it will be maintained.",
    imageLabel: "BUILDS, WITH A PLAN ✳",
    points: [
      ["Clear scope first.", "We agree on what is being built before the build begins."],
      ["Built for your team.", "We make content easy for your team to manage where possible."],
      ["Tested on real devices.", "Mobile behavior and speed are part of the quality checks."],
      ["Support after launch.", "Maintenance keeps your site useful long after go-live."],
    ],
  },
  related: {
    heading: "A STRONG SITE\nNEEDS STRONG PARTNERS.",
    description: "Great builds work best with thoughtful design, a good CMS and solid security.",
    items: ["webdesign", "cms", "seo", "web-data-security"],
  },
  insights: "PERFORMANCE, CODE, WORDPRESS, SPEED, SCALING",
  faq: {
    heading: "WEBSITE DEVELOPMENT,\nSTRAIGHT ANSWERS.",
    intro: "What businesses usually ask before starting a website build.",
    items: [
      ["Should I use WordPress or custom code?", "WordPress often suits content-led sites your team needs to edit. Custom development suits specific functionality. We help you choose based on your needs."],
      ["How long does a website build take?", "It depends on scope, integrations and how quickly content and feedback arrive. We set a timeline after agreeing on the scope."],
      ["Can you rebuild my existing website?", "Yes. We review the current site, plan a careful migration and keep useful content where it makes sense."],
      ["Will the site be mobile-friendly?", "Yes. We build responsively and check behavior across common devices and browsers."],
      ["Do you provide maintenance?", "Yes. Website maintenance can include updates, backups and support, depending on the agreed plan."],
      ["Will my website be SEO-ready?", "We build in technical SEO foundations such as clean structure and good performance. Ongoing SEO is a separate, longer-term service."],
    ],
  },
  final: {
    heading: "BUILD A WEBSITE\nYOUR BUSINESS CAN GROW INTO.",
    description: "Let's plan a build that works now and keeps working later.",
    cta: "Plan My Build",
  },
});
