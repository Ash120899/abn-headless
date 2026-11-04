// Written content for /services/web-development/app-development/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2311;

export const acf = subservice({
  service: "web-development",
  crumb: "App Development",
  rail: "APPS",
  meta: "App development by ABN Junction: native iOS and Android apps, cross-platform development, UI/UX design, testing and QA, app store optimization and support.",
  hero: {
    eyebrow: "App Development",
    before: "FROM",
    highlight: "IDEA",
    after: "TO HOME SCREEN.",
    description:
      "A good app earns its place on someone's phone. We plan, design, build and support iOS and Android apps around what your users actually need to do.",
    cta: "Plan My App",
    tags: [["◎", "iOS & Android"], ["⇄", "Cross-Platform"], ["✓", "Testing & QA"]],
    highlights: "Native Apps, Cross-Platform Apps, Testing & QA, App Store Optimization",
  },
  marquee: [
    "IOS APPS, ANDROID APPS, REACT NATIVE, FLUTTER, UI/UX DESIGN, APP TESTING",
    "APP STORE OPTIMIZATION, MAINTENANCE, SECURITY, SCALABLE BUILDS, DEPLOYMENT, USER EXPERIENCE",
  ],
  problems: {
    heading: "GREAT APP IDEA.\nWHAT COULD GO WRONG?",
    description: "Most app projects don't struggle because of the idea. They struggle because of scope, testing and what happens after launch.",
    items: [
      ["TOO MUCH SCOPE", "⇄", "Trying to build everything.", "A bloated first version takes longer, costs more and confuses users."],
      ["POOR EXPERIENCE", "↘", "Installed, then deleted.", "Bugs and confusing flows lose users quickly."],
      ["LAUNCH AND LEAVE", "⚠", "No plan after release.", "Operating system changes and user feedback need ongoing attention."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE COMPLETE APP.",
    description: "We cover the app lifecycle, from concept to support. Select a capability to see what it includes.",
    items: [
      ["◎", "Native App Development", "Build specifically for iOS and Android.", "High-performance apps tailored to each operating system."],
      ["⇄", "Cross-Platform Development", "Reach both platforms from one codebase.", "Apps built with frameworks such as React Native and Flutter."],
      ["✦", "App UI/UX Design", "Make your app intuitive to use.", "Interfaces and flows designed for small screens."],
      ["✓", "App Testing & QA", "Catch problems before your users do.", "Testing across devices for stability and performance."],
      ["⌕", "App Store Optimization", "Help people discover your app.", "Keywords, descriptions and visuals for store listings."],
      ["⟳", "Maintenance & Support", "Keep your app current and reliable.", "Updates, troubleshooting and new features after launch."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM IDEA TO APP STORE.",
    description: "Scroll through how an app gets planned, built, tested and launched.",
    slides: [
      ["DISCOVER", "Start with the user's problem.", "We analyse your business model, audience and what the app needs to do.", "◎", "DISCOVERY", ["Goals agreed", "Users understood", "Must-haves listed"]],
      ["SCOPE", "Choose the right first version.", "We separate what is essential from what can come later.", "☰", "PRODUCT SCOPE", ["First release defined", "Roadmap drafted", "Platform chosen"]],
      ["DESIGN", "Make it easy to use.", "Wireframes and designs shape the main flows before development begins.", "✎", "APP DESIGN", ["Flows mapped", "Screens designed", "Prototype reviewed"]],
      ["BUILD", "Develop in visible steps.", "We build features in stages, so you can see progress and give feedback.", "⚙", "DEVELOPMENT", ["Features developed", "Integrations added", "Builds shared"]],
      ["TEST", "Try to break it.", "We check stability and behavior across devices before release.", "✓", "TESTING & QA", ["Devices tested", "Bugs fixed", "Security reviewed"]],
      ["LAUNCH", "Release and keep improving.", "We help you publish to the stores, then support updates and improvements.", "⟳", "RELEASE", ["Store listing ready", "App submitted", "Updates planned"]],
    ],
  },
  lab: {
    name: "App Lab",
    brief: "App",
    preview: "APP",
    heading: "YOUR IDEA.\nYOUR USERS.",
    highlight: "YOUR APP PLAN.",
    description: "Answer a few questions to shape a sample app plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What is the main purpose of your app?",
      options: [
        ["Serve my customers", "📱", "Your customer app plan", "ACTIVE USER"],
        ["Sell products", "🛒", "Your commerce app plan", "PURCHASE"],
        ["Run my operations", "⚙️", "Your internal app plan", "WORKFLOW"],
      ],
    },
    scope: {
      name: "THE PLATFORM",
      question: "Which platforms do you need?",
      kpi: "Platform",
      options: [
        ["iOS", "◎", "iOS", "Plan a native iOS app designed for Apple devices"],
        ["Android", "▣", "Android", "Plan a native Android app tested across common devices"],
        ["Both", "⇄", "Both", "Consider a cross-platform build to reach both from one codebase"],
        ["Help me decide", "?", "TBD", "Begin by looking at your users and their devices"],
      ],
    },
    range: {
      name: "THE SIZE",
      question: "Roughly how many core features are in your first release?",
      kpi: "Core features",
      min: 1,
      max: 30,
      step: 1,
      value: 6,
      caption: "First-release features",
      minLabel: "1",
      maxLabel: "30+",
      note: "A rough number is fine. A smaller first release usually means faster learning.",
      planText: "With about {value} core features, we would check which are essential for the first release.",
    },
    stage: {
      question: "Where is your app today?",
      options: [
        ["Just an idea", "validate the idea and define a focused first release"],
        ["Designs ready", "review them and plan the development stages"],
        ["Already live", "audit the app and prioritize improvements"],
      ],
    },
    funnel: "IDEA, DESIGN, BUILD, LAUNCH",
    planTitle: "Your app development plan",
    planText: "Define a focused first release, prototype the main flows, and test on real devices before launch.",
  },
  difference: {
    heading: "NOT MORE FEATURES.\nA BETTER FIRST RELEASE.",
    description: "We help you decide what to build first, then keep you informed as the app takes shape, so there are no surprises at launch.",
    imageLabel: "APPS, WITH A PLAN ✳",
    points: [
      ["Start focused.", "A clear first release gets you to real user feedback sooner."],
      ["Choose the right build.", "We'll explain the trade-offs between native and cross-platform."],
      ["Test on real devices.", "Stability and performance checks are part of the process."],
      ["Stay after launch.", "Ongoing maintenance keeps your app working and improving."],
    ],
  },
  related: {
    heading: "GREAT APPS\nNEED GREAT SUPPORT.",
    description: "Design, custom software and security all play a part in an app's success.",
    items: ["uiux", "software", "website", "web-data-security"],
  },
  insights: "APPS, IOS, ANDROID, USERS, RELEASES",
  faq: {
    heading: "APP DEVELOPMENT,\nHONEST ANSWERS.",
    intro: "What businesses usually ask before building an app.",
    items: [
      ["Should I choose native or cross-platform?", "Native can suit apps that need top performance or deep device features. Cross-platform can reach both platforms from one codebase. We'll help you weigh it up."],
      ["How much does an app cost?", "It depends on features, platforms, integrations and design. We can give a clearer estimate once we understand your scope."],
      ["How long does it take to build an app?", "It varies with scope. A focused first release is usually quicker, so we help you decide what is truly essential."],
      ["Will you publish it to the app stores?", "Yes. We can prepare your listing and support submission, though final approval rests with the stores."],
      ["What happens after launch?", "Apps need updates for new operating systems, bug fixes and improvements. We offer ongoing maintenance and support."],
      ["Will I own the app and code?", "Ownership terms are covered in the project agreement, so you can confirm this clearly before work starts."],
    ],
  },
  final: {
    heading: "EARN YOUR PLACE\nON THEIR HOME SCREEN.",
    description: "Let's turn your idea into an app people keep using.",
    cta: "Plan My App",
  },
});
