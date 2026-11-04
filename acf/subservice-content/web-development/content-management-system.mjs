// Written content for /services/web-development/content-management-system/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2310;

export const acf = subservice({
  service: "web-development",
  crumb: "Content Management Systems",
  rail: "CMS",
  meta: "CMS development by ABN Junction: custom CMS solutions, WordPress and platform integration, themes, plugins, CMS migration, security and maintenance.",
  hero: {
    eyebrow: "Content Management Systems",
    before: "UPDATE",
    highlight: "YOUR SITE",
    after: "WITHOUT THE WAIT.",
    description:
      "Your team shouldn't need a developer to change a headline. We build and customize content management systems that make publishing simple while keeping the site stable.",
    cta: "Plan My CMS",
    tags: [["☰", "WordPress"], ["⚙", "Custom Plugins"], ["⇄", "CMS Migration"]],
    highlights: "Custom CMS, WordPress Development, Themes & Plugins, CMS Migration",
  },
  marquee: [
    "WORDPRESS, CUSTOM CMS, THEMES, PLUGINS, CMS MIGRATION, SECURITY UPDATES",
    "DRUPAL, JOOMLA, SHOPIFY, CONTENT WORKFLOWS, EDITOR TRAINING, ONGOING SUPPORT",
  ],
  problems: {
    heading: "NEED A SMALL CHANGE?\nWAIT FOR THE DEVELOPER.",
    description: "A difficult CMS slows down everyone who touches your website, and small updates pile up until they become big ones.",
    items: [
      ["EDITING BOTTLENECK", "↘", "Simple edits take days.", "Your team depends on developers for everyday content changes."],
      ["PLUGIN CLUTTER", "⚠", "One update breaks three things.", "Too many outdated plugins make the site fragile and harder to secure."],
      ["WRONG PLATFORM", "⇄", "You have outgrown your CMS.", "Your current system no longer fits how your team and content work."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE EASIER WORKFLOW.",
    description: "We shape the CMS around how your team works. Select a capability to see what it includes.",
    items: [
      ["⚙", "Custom CMS Solutions", "A system built around your content.", "Bespoke content structures and workflows for your business."],
      ["☰", "CMS Integration", "Start from a platform that fits.", "Setting up platforms such as WordPress, Drupal and Joomla."],
      ["✦", "Theme & Template Customization", "Keep your brand consistent on every page.", "Custom themes and templates that match your identity."],
      ["▣", "Plugin & Module Development", "Add exactly the features you need.", "Custom plugins and modules that extend your CMS."],
      ["⇄", "CMS Migration", "Move platforms without losing your content.", "Carefully planned content and data migration with minimal downtime."],
      ["✓", "Security & Maintenance", "Keep your CMS stable and up to date.", "Regular updates and security measures to protect your site."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM BOTTLENECK TO PUBLISH.",
    description: "Scroll through how we plan and build a CMS your team can use with confidence.",
    slides: [
      ["REVIEW", "See how your team works.", "We look at who edits what, how often and where things get stuck.", "◎", "WORKFLOW REVIEW", ["Editors consulted", "Content reviewed", "Pain points listed"]],
      ["CHOOSE", "Pick the right platform.", "We recommend a platform based on your content, team and future plans.", "⇄", "PLATFORM CHOICE", ["Needs compared", "Platform chosen", "Risks discussed"]],
      ["MODEL", "Structure your content.", "Clear content types and fields make publishing consistent and easier.", "☰", "CONTENT MODEL", ["Content types defined", "Fields planned", "Templates mapped"]],
      ["BUILD", "Customize it properly.", "Themes, templates and plugins are built to suit your site and brand.", "⚙", "DEVELOPMENT", ["Theme customized", "Plugins configured", "Features added"]],
      ["MIGRATE", "Move what matters.", "Your existing content moves across carefully, with checks before launch.", "▣", "MIGRATION", ["Content transferred", "Links checked", "Downtime minimized"]],
      ["SUPPORT", "Keep your team confident.", "We provide guidance and maintenance so the CMS stays useful and safe.", "⟳", "ONGOING SUPPORT", ["Team trained", "Updates applied", "Help available"]],
    ],
  },
  lab: {
    name: "CMS Lab",
    brief: "CMS",
    preview: "CMS",
    heading: "YOUR CONTENT.\nYOUR TEAM.",
    highlight: "YOUR CMS PLAN.",
    description: "Tell us about your content and team to shape a sample CMS plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What do you need from your CMS?",
      options: [
        ["Easier editing", "✏️", "Your easier editing plan", "PUBLISH"],
        ["More functionality", "🧩", "Your CMS feature plan", "FEATURES"],
        ["A new platform", "🚚", "Your CMS migration plan", "MIGRATED"],
      ],
    },
    scope: {
      name: "THE PLATFORM",
      question: "Which platform are you considering?",
      kpi: "Platform",
      options: [
        ["WordPress", "☰", "WordPress", "Build on WordPress with custom templates and fields"],
        ["Shopify", "↗", "Shopify", "Customize Shopify around your products and content"],
        ["Custom CMS", "⚙", "Custom", "Plan a custom system around your specific workflows"],
        ["Help me decide", "?", "TBD", "Begin by comparing platforms against how your team works"],
      ],
    },
    range: {
      name: "THE TEAM",
      question: "How many people will edit the site?",
      kpi: "Editors",
      min: 1,
      max: 30,
      step: 1,
      value: 3,
      caption: "People editing",
      minLabel: "1",
      maxLabel: "30+",
      note: "A rough number is fine. It helps us plan roles and workflows.",
      planText: "With about {value} editors, we would plan roles and a simple publishing workflow.",
    },
    stage: {
      question: "Where is your CMS today?",
      options: [
        ["No CMS yet", "define your content structure before choosing templates"],
        ["Have one, it's painful", "audit plugins and editing workflows first"],
        ["Ready to migrate", "map your content and plan the move carefully"],
      ],
    },
    funnel: "DRAFT, REVIEW, APPROVE, PUBLISH",
    planTitle: "Your CMS plan",
    planText: "Review how your team works, structure your content, then choose or customize the right platform.",
  },
  difference: {
    heading: "NOT JUST INSTALLED.\nBUILT FOR YOUR TEAM.",
    description: "A CMS is a daily tool for your team. We focus on what they need to do in it, as well as on how the website looks and performs.",
    imageLabel: "CMS, WITH A PLAN ✳",
    points: [
      ["Designed around editors.", "We plan fields and templates that make sense to the people using them."],
      ["Only what you need.", "Keeping plugins lean makes the site easier to maintain."],
      ["Careful migrations.", "Content and links are checked before and after the move."],
      ["Maintained over time.", "Regular updates help keep your CMS stable and secure."],
    ],
  },
  related: {
    heading: "A GOOD CMS\nNEEDS GOOD CONTENT.",
    description: "An easy publishing system supports your website, SEO and content marketing.",
    items: ["website", "content", "seo", "web-data-security"],
  },
  insights: "WORDPRESS, PLUGINS, WORKFLOWS, SECURITY, CONTENT",
  faq: {
    heading: "CMS QUESTIONS,\nCLEAR ANSWERS.",
    intro: "What businesses usually ask about content management systems.",
    items: [
      ["Which CMS is right for me?", "It depends on your content, team and functionality. WordPress suits many businesses, but we'll recommend what fits your situation."],
      ["Can I move from one CMS to another?", "Yes. We plan migrations carefully to protect your content and links and to minimize downtime."],
      ["Can you customize my existing WordPress site?", "Yes. We can work on themes, templates and plugins without necessarily rebuilding everything."],
      ["Will my team need training?", "We can walk your team through the system so they're comfortable making everyday updates."],
      ["Do I need custom plugins?", "Sometimes. If an existing plugin does the job well, we may use it. We build custom plugins when your needs are specific."],
      ["How do you keep a CMS secure?", "Through regular updates, careful plugin choices, access controls and ongoing maintenance. No system is risk-free, so it needs continued attention."],
    ],
  },
  final: {
    heading: "GIVE YOUR TEAM\nA SITE THEY CAN RUN.",
    description: "Let's build a CMS that makes publishing simple.",
    cta: "Plan My CMS",
  },
});
