// Written content for /services/web-development/maintenance-iteration/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 13415;

export const acf = subservice({
  service: "web-development",
  crumb: "Maintenance & Iteration",
  rail: "MAINTENANCE",
  meta: "Website maintenance and iteration by ABN Junction: updates, security patches, QA, analytics review and incremental releases that keep your platform improving.",
  hero: {
    eyebrow: "Maintenance & Iteration",
    before: "LAUNCH IS",
    highlight: "THE START,",
    after: "NOT THE FINISH.",
    description:
      "Updates, security patches, analytics review and incremental releases keep your platform healthy and improving after go-live, instead of slowly falling behind.",
    cta: "Plan My Care Plan",
    tags: [["⟳", "Updates"], ["✓", "QA"], ["↗", "Incremental Releases"]],
    highlights: "Updates, Security Patches, QA, Incremental Releases",
  },
  marquee: [
    "PLATFORM UPDATES, SECURITY PATCHES, QA TESTING, BUG FIXES, BACKUP CHECKS, INCREMENTAL RELEASES",
    "ANALYTICS REVIEW, SMALL IMPROVEMENTS, PLUGIN UPDATES, RELEASE NOTES, ONGOING SUPPORT, ROADMAPS",
  ],
  problems: {
    heading: "THE SITE LAUNCHED.\nTHEN NOBODY LOOKED AFTER IT.",
    description: "Software keeps changing after launch. Without regular care, small problems quietly become expensive ones.",
    items: [
      ["PATCHES WAITING", "⚠", "Updates keep getting postponed.", "Outdated software and plugins can create security and compatibility problems."],
      ["BROKEN QUIETLY", "↘", "Things fail without anyone noticing.", "A form or checkout step can stop working long before someone reports it."],
      ["STUCK AT LAUNCH", "⌛", "The site never gets better.", "Without a release rhythm, good ideas sit on a list and the site slowly ages."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE HEALTHY PLATFORM.",
    description: "We look after what's live and keep improving it. Select a capability to see what the work includes.",
    items: [
      ["⟳", "Platform Updates", "Keep the software current.", "Planned core, plugin, theme and dependency updates, tested before going live."],
      ["⛨", "Security Patches", "Close known gaps promptly.", "Applying security updates and reviewing your platform's update status."],
      ["✓", "QA Testing", "Check what matters still works.", "Regular checks of forms, checkout, key journeys and main templates."],
      ["✎", "Fixes & Small Changes", "Handle the everyday list.", "Bug fixes, content changes and small improvements your team needs."],
      ["▥", "Analytics Review", "Let usage guide the next step.", "Reviewing how people use the site, to spot friction and opportunities."],
      ["↗", "Incremental Releases", "Improve in small, safe steps.", "A planned backlog and regular releases instead of waiting for a rebuild."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM LAUNCHED TO LOOKED AFTER.",
    description: "Scroll through how ongoing care and improvement work in practice.",
    slides: [
      ["REVIEW", "Understand what's running.", "We review your platform, its software versions, integrations and any known issues.", "⌕", "HEALTH CHECK", ["Versions listed", "Integrations mapped", "Known issues noted"]],
      ["PROTECT", "Put the safety net in place.", "Before changing anything, we confirm backups and a safe way to test updates.", "⛨", "SAFETY NET", ["Backups confirmed", "Testing route agreed", "Rollback planned"]],
      ["UPDATE", "Keep things current.", "Updates and security patches are applied on a planned schedule, then checked.", "⟳", "UPDATES", ["Patches applied", "Plugins updated", "Changes logged"]],
      ["TEST", "Check what matters.", "Key journeys like forms and checkout are tested, so problems get caught early.", "✓", "QA", ["Forms tested", "Key journeys checked", "Issues raised"]],
      ["LEARN", "See how people use it.", "Analytics and feedback show where the site could work harder.", "▥", "INSIGHTS", ["Usage reviewed", "Friction spotted", "Ideas collected"]],
      ["RELEASE", "Ship small improvements.", "Priorities become small releases, so the platform keeps moving forward.", "↗", "RELEASES", ["Backlog prioritised", "Changes shipped", "Next cycle planned"]],
    ],
  },
  lab: {
    name: "Care Lab",
    brief: "Care",
    preview: "CARE",
    heading: "YOUR PLATFORM.\nYOUR PRIORITIES.",
    highlight: "YOUR CARE PLAN.",
    description: "Pick your goal, platform and rough scale to shape a sample plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What do you need most after launch?",
      options: [
        ["Keep it safe", "🛡", "Your platform care plan", "SECURE"],
        ["Fix what's broken", "🔧", "Your stabilisation plan", "STABLE"],
        ["Keep improving", "📈", "Your iteration plan", "IMPROVE"],
      ],
    },
    scope: {
      name: "THE PLATFORM",
      question: "What are we looking after?",
      kpi: "Platform",
      options: [
        ["WordPress", "▣", "WordPress", "Plan core, theme and plugin updates with testing"],
        ["Shopify", "▤", "Shopify", "Review theme changes, apps and key store journeys"],
        ["Custom build", "⌘", "Custom build", "Plan dependency updates, QA and a release rhythm"],
        ["Help me decide", "?", "TBD", "Begin with a health check of what's running today"],
      ],
    },
    range: {
      name: "THE SCALE",
      question: "Roughly how many pages does your site have?",
      kpi: "Pages",
      min: 5,
      max: 1000,
      step: 5,
      value: 50,
      caption: "Pages and main templates",
      minLabel: "5",
      maxLabel: "1,000+",
      note: "A rough number is fine. It helps us think about the amount of testing involved.",
      planText: "With about {value} pages, we would focus regular testing on your main templates and key journeys.",
    },
    stage: {
      question: "How is the site looked after today?",
      options: [
        ["Nobody owns it", "start with a health check, backups and urgent updates"],
        ["Fixed when it breaks", "move to planned updates and regular testing"],
        ["Maintained, not improving", "add analytics review and a release rhythm"],
      ],
    },
    funnel: "REVIEW, UPDATE, TEST, RELEASE",
    planTitle: "Your maintenance and iteration plan",
    planText: "Start with a health check and a safety net, then move to planned updates and small, regular releases.",
  },
  difference: {
    heading: "NOT JUST KEEPING THE LIGHTS ON.\nMAKING IT BETTER.",
    description: "Good maintenance prevents problems. Good iteration keeps moving the platform forward. You need both.",
    imageLabel: "CARE, WITH A PLAN ✳",
    points: [
      ["Planned, not panicked.", "Regular updates are calmer than emergency fixes."],
      ["Tested before trusted.", "Changes are checked, especially on the journeys that earn money."],
      ["Small steps.", "Incremental releases are easier to test, and to undo if needed."],
      ["Clear records.", "You can see what changed, when and why."],
    ],
  },
  related: {
    heading: "HEALTHY PLATFORMS\nGROW FURTHER.",
    description: "Ongoing care connects to speed, security and the next phase of your build.",
    items: ["infrastructure", "website", "cms", "web-data-security"],
  },
  insights: "UPDATES, QA, RELEASES, SITE HEALTH, ITERATION",
  faq: {
    heading: "AFTER LAUNCH,\nEXPLAINED SIMPLY.",
    intro: "What businesses usually ask about website maintenance and iteration.",
    items: [
      ["Why does a finished website need maintenance?", "Software, browsers and plugins keep changing, and security issues get found over time. Regular care keeps the site working and reduces risk."],
      ["How often should updates happen?", "It depends on your platform and how much it changes. Security updates should move quickly, and routine ones can follow a planned schedule."],
      ["What does iteration mean?", "It means improving the site in small, regular releases, guided by how people actually use it."],
      ["Can you maintain a site you didn't build?", "Usually, yes. We begin with a health check, so we understand what's there before changing anything."],
      ["Do you test updates before they go live?", "Where your setup allows, we use a staging copy. We also check key journeys, like forms and checkout, afterwards."],
      ["Is this the same as a security service?", "It includes keeping software patched, which helps. Deeper security testing is a separate piece of work we can also help with."],
    ],
  },
  final: {
    heading: "DON'T LET LAUNCH DAY\nBE ITS BEST DAY.",
    description: "Let's keep your platform healthy and improving after go-live.",
    cta: "Plan My Care Plan",
  },
});
