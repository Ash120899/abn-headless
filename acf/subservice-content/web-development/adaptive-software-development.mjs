// Written content for /services/web-development/adaptive-software-development/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2312;

export const acf = subservice({
  service: "web-development",
  crumb: "Adaptive Software Development",
  rail: "SOFTWARE",
  meta: "Adaptive software development by ABN Junction: custom software, web and mobile applications, system integration, maintenance, support and technical consulting.",
  hero: {
    eyebrow: "Adaptive Software Development",
    before: "SOFTWARE",
    highlight: "THAT ADAPTS",
    after: "AS YOU DO.",
    description:
      "Business needs rarely stand still while software gets built. We develop custom software in short, reviewable cycles, so the product can change as you learn what works.",
    cta: "Plan My Software",
    tags: [["⟳", "Iterative Delivery"], ["⚙", "Custom Software"], ["⇄", "Integrations"]],
    highlights: "Custom Software, Web Applications, System Integration, Ongoing Support",
  },
  marquee: [
    "CUSTOM SOFTWARE, WEB APPLICATIONS, MOBILE APPS, SYSTEM INTEGRATION, ITERATIVE DELIVERY, SUPPORT",
    "SPECULATE, COLLABORATE, LEARN, SCALABLE ARCHITECTURE, AUTOMATION, TECHNICAL CONSULTING",
  ],
  problems: {
    heading: "THE PLAN CHANGED.\nCAN YOUR SOFTWARE?",
    description: "Off-the-shelf tools and rigid projects often leave teams working around their software, rather than with it.",
    items: [
      ["DISCONNECTED TOOLS", "⇄", "Data lives in too many places.", "Staff copy information between systems that don't talk to each other."],
      ["RIGID PROJECTS", "↘", "Built for last year's needs.", "Long fixed plans can deliver software that no longer fits."],
      ["SLOW FEEDBACK", "?", "You see it too late.", "When reviews happen only at the end, problems are costly to fix."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE ADAPTIVE PARTNER.",
    description: "We build around your workflows and your existing systems. Select a capability to see what it includes.",
    items: [
      ["⚙", "Custom Software Development", "Tools built around how you work.", "Tailored solutions designed for your specific business needs."],
      ["▣", "Web Application Development", "Reliable applications that run in the browser.", "Responsive web apps with scalable architecture."],
      ["◎", "Mobile App Development", "Take your software into the field.", "iOS and Android apps connected to your systems."],
      ["⇄", "Software Integration", "Make your systems work together.", "Connecting applications to improve data flow and streamline processes."],
      ["⟳", "Maintenance & Support", "Keep your software dependable.", "Ongoing support, fixes and updates after release."],
      ["✦", "Consulting & Strategy", "Get clear advice before you commit.", "Technical guidance from initial concept to deployment and beyond."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM PLAN TO PROGRESS.",
    description: "Scroll through how adaptive development works, with learning built into every cycle.",
    slides: [
      ["SPECULATE", "Plan what you know.", "We set direction and priorities, accepting that some will change as we learn.", "◎", "PROJECT MISSION", ["Goals agreed", "Priorities ranked", "Risks surfaced"]],
      ["MODEL", "Understand your processes.", "We map how work and data move through your business today.", "☰", "PROCESS MAP", ["Workflows mapped", "Systems reviewed", "Requirements drafted"]],
      ["COLLABORATE", "Build together in cycles.", "Short development cycles keep your team close to the work.", "⚙", "DEVELOPMENT CYCLE", ["Features built", "Team involved", "Progress visible"]],
      ["REVIEW", "See it working early.", "Regular demos let you respond to real software, not documents.", "✓", "REVIEW", ["Working demo shared", "Feedback collected", "Quality checked"]],
      ["LEARN", "Adjust with evidence.", "What we learn in each cycle shapes the priorities for the next.", "⟳", "LEARNING LOOP", ["Findings reviewed", "Plan updated", "Next cycle agreed"]],
      ["RELEASE", "Launch and keep adapting.", "We deploy, support and continue improving the software as your needs change.", "↗", "RELEASE", ["Software deployed", "Team supported", "Roadmap continues"]],
    ],
  },
  lab: {
    name: "Software Lab",
    brief: "Software",
    preview: "SOFTWARE",
    heading: "YOUR PROCESS.\nYOUR PEOPLE.",
    highlight: "YOUR SOFTWARE PLAN.",
    description: "Tell us what you need to shape a sample software plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What should this software do for you?",
      options: [
        ["Automate manual work", "⚙️", "Your process automation plan", "AUTOMATED"],
        ["Launch a product", "🚀", "Your software product plan", "LAUNCH"],
        ["Connect my systems", "🔗", "Your system integration plan", "CONNECTED"],
      ],
    },
    scope: {
      name: "THE PRODUCT",
      question: "What form should it take?",
      kpi: "Format",
      options: [
        ["Web application", "▣", "Web app", "Plan a browser-based application your team can reach anywhere"],
        ["Mobile app", "◎", "Mobile", "Plan a mobile app connected to your existing systems"],
        ["Integration", "⇄", "Integration", "Start by mapping the systems and data that need connecting"],
        ["Help me decide", "?", "TBD", "Begin with a short consultation on your options"],
      ],
    },
    range: {
      name: "THE USERS",
      question: "Roughly how many people will use it?",
      kpi: "Users",
      min: 5,
      max: 1000,
      step: 5,
      value: 50,
      caption: "Approximate users",
      minLabel: "5",
      maxLabel: "1,000+",
      note: "A rough number is fine. It helps us think about scale and access.",
      planText: "With about {value} users, we would think through roles, permissions and scale early.",
    },
    stage: {
      question: "Where are you with this today?",
      options: [
        ["Just an idea", "start with a short discovery and a clear first cycle"],
        ["Using spreadsheets", "map your current process before replacing it"],
        ["Replacing a system", "review what exists and plan a careful transition"],
      ],
    },
    funnel: "PLAN, BUILD, REVIEW, RELEASE",
    planTitle: "Your software development plan",
    planText: "Agree priorities, build in short cycles, and review working software with your team regularly.",
  },
  difference: {
    heading: "NOT A FIXED PLAN.\nA WAY OF LEARNING.",
    description: "Adaptive development accepts that requirements change. You see working software early and your priorities shape every cycle.",
    imageLabel: "SOFTWARE, WITH A PLAN ✳",
    points: [
      ["Clear priorities.", "We focus on what brings value first, instead of trying to specify everything upfront."],
      ["Working software early.", "Regular reviews show real progress, not only reports."],
      ["Transparent communication.", "You always know what is happening and what comes next."],
      ["Fits what you have.", "We design new software to work with your existing systems."],
    ],
  },
  related: {
    heading: "GOOD SOFTWARE\nNEEDS A STRONG TEAM.",
    description: "Great products connect design, apps and security from the start.",
    items: ["app", "uiux", "website", "web-data-security"],
  },
  insights: "SOFTWARE, AUTOMATION, INTEGRATION, DELIVERY, SCALING",
  faq: {
    heading: "ADAPTIVE SOFTWARE,\nEXPLAINED.",
    intro: "What businesses usually ask about adaptive software development.",
    items: [
      ["What is adaptive software development?", "It is an iterative approach built around speculating, collaborating and learning. Software is delivered in cycles, and plans adapt based on what each one teaches you."],
      ["How is it different from a fixed-scope project?", "A fixed-scope project tries to define everything upfront. An adaptive one sets a direction and adjusts priorities as you see working software."],
      ["Won't changing priorities raise costs?", "Change has to be managed. Regular reviews mean you can make informed trade-offs early, when they are usually less costly."],
      ["Can you connect to our current systems?", "In most cases, yes, depending on what those systems allow. We review them early and flag any limitations."],
      ["Will my team need to be involved?", "Yes. Regular input from your team is a big part of why this approach works, though we keep the time commitment sensible."],
      ["Do you support software after launch?", "Yes. We offer maintenance and support so your software stays dependable as your business changes."],
    ],
  },
  final: {
    heading: "BUILD SOFTWARE\nTHAT KEEPS UP WITH YOU.",
    description: "Let's plan your first cycle together.",
    cta: "Plan My Software",
  },
});
