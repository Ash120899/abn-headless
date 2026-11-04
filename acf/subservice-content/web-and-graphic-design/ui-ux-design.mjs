// Written content for /services/web-and-graphic-design/ui-ux-design/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2297;

export const acf = subservice({
  service: "web-and-graphic-design",
  crumb: "UI/UX Design",
  rail: "UI/UX",
  meta: "UI/UX design by ABN Junction: user research, wireframing, prototyping, visual design, usability testing, information architecture and interaction design.",
  hero: {
    eyebrow: "UI/UX Design",
    before: "FROM",
    highlight: "CONFUSING",
    after: "TO EFFORTLESS.",
    description:
      "People leave products they can't figure out. We research how your users think, then design interfaces that make the next step feel obvious on every screen.",
    cta: "Plan My UX Project",
    tags: [["◎", "User Research"], ["▣", "Prototyping"], ["✓", "Usability Testing"]],
    highlights: "User Research, Wireframes & Prototypes, Visual Design, Usability Testing",
  },
  marquee: [
    "USER RESEARCH, WIREFRAMES, PROTOTYPES, VISUAL DESIGN, USABILITY TESTING, INTERACTION DESIGN",
    "INFORMATION ARCHITECTURE, MOBILE UX, USER JOURNEYS, UX CONSULTING, RESPONSIVE LAYOUTS, DESIGN SYSTEMS",
  ],
  problems: {
    heading: "IT LOOKS FINE.\nDOES IT WORK FOR USERS?",
    description: "A good-looking interface can still lose people. The problems usually show up where design assumptions meet real behavior.",
    items: [
      ["GUESSWORK", "?", "Designed on assumptions.", "Decisions rest on internal opinions, not on what users need."],
      ["HIDDEN PATHS", "⇄", "People can't find things.", "Confusing structure and navigation make simple tasks harder than they should be."],
      ["LATE SURPRISES", "↘", "Problems appear after launch.", "Without early testing, fixing issues later costs more time and money."],
    ],
  },
  offers: {
    heading: "SIX DISCIPLINES.\nONE SEAMLESS EXPERIENCE.",
    description: "Good UX connects research, structure and craft. Select a discipline to see what the work includes.",
    items: [
      ["◎", "User Research", "Understand behaviors, needs and motivations.", "Stakeholder input, user interviews and insights that guide design decisions."],
      ["▣", "Wireframing & Prototyping", "See the product before it is built.", "Wireframes and interactive prototypes for early testing and feedback."],
      ["✦", "Visual Design", "Align the interface with your brand.", "Cohesive layouts, type and colour that support engagement."],
      ["✓", "Usability Testing", "Watch real users try the design.", "Testing prototypes to find pain points and improvement areas."],
      ["☰", "Information Architecture", "Make content easy to find.", "Structuring navigation and content in a logical, user-friendly way."],
      ["⇄", "Interaction Design", "Make every tap and click feel right.", "Buttons, animations and navigation that respond clearly."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM ASSUMPTION TO EVIDENCE.",
    description: "Scroll through how a UX project moves from understanding to a tested design.",
    slides: [
      ["DISCOVER", "Start with your users.", "We learn about your business, your users and what is getting in their way.", "◎", "RESEARCH", ["Goals agreed", "Users understood", "Pain points listed"]],
      ["STRUCTURE", "Organize what matters.", "We map journeys and content so people can find what they came for.", "☰", "INFORMATION ARCHITECTURE", ["Journeys mapped", "Navigation planned", "Content structured"]],
      ["SKETCH", "Try ideas cheaply.", "Wireframes let us explore layouts before anyone invests in polish.", "✎", "WIREFRAMES", ["Key screens drafted", "Layouts compared", "Feedback gathered"]],
      ["PROTOTYPE", "Make it clickable.", "Interactive prototypes show how the product will really feel.", "▣", "PROTOTYPE", ["Key flows clickable", "Interactions defined", "Ready for testing"]],
      ["TEST", "Watch real people use it.", "Usability testing shows where users get stuck, before development begins.", "✓", "USABILITY TEST", ["Real users observed", "Issues prioritized", "Design refined"]],
      ["HANDOVER", "Build it as designed.", "Final visuals and specifications give developers what they need to build with confidence.", "⟳", "DESIGN HANDOVER", ["Responsive screens ready", "Components documented", "Developer support"]],
    ],
  },
  lab: {
    name: "UX Lab",
    brief: "UX",
    preview: "UX",
    heading: "YOUR PRODUCT.\nYOUR USERS.",
    highlight: "YOUR UX PLAN.",
    description: "Tell us about your product to shape a sample UX plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What are you trying to improve?",
      options: [
        ["More conversions", "🎯", "Your conversion-focused UX plan", "CONVERT"],
        ["Better retention", "🔁", "Your retention-focused UX plan", "RETURN"],
        ["A brand-new product", "🚀", "Your new product UX plan", "LAUNCH"],
      ],
    },
    scope: {
      name: "THE PRODUCT",
      question: "What are we designing for?",
      kpi: "Platform",
      options: [
        ["Website", "▣", "Website", "Start with key page journeys and responsive layouts"],
        ["Mobile app", "◎", "App", "Start with core app flows designed for small screens"],
        ["Web application", "⚙", "Web app", "Start with the main user tasks and information structure"],
        ["Help me decide", "?", "TBD", "Begin with a UX review of what you have and what users need"],
      ],
    },
    range: {
      name: "THE SIZE",
      question: "Roughly how many unique screens are involved?",
      kpi: "Screens",
      min: 5,
      max: 100,
      step: 5,
      value: 20,
      caption: "Unique screens",
      minLabel: "5",
      maxLabel: "100+",
      note: "A rough number is fine. It helps us think about scope.",
      planText: "With about {value} screens, we would map the main journeys before designing the details.",
    },
    stage: {
      question: "Where is the product today?",
      options: [
        ["Just an idea", "begin with research and a clickable prototype"],
        ["Designs exist", "test what you have and refine it"],
        ["Already live", "use real usage insights to prioritize improvements"],
      ],
    },
    funnel: "RESEARCH, WIREFRAME, PROTOTYPE, TEST",
    planTitle: "Your UX design plan",
    planText: "Start with user research, map the core journeys, then test a prototype before building.",
  },
  difference: {
    heading: "NOT JUST PRETTY SCREENS.\nBETTER DECISIONS.",
    description: "We design around evidence and business goals, and we keep you involved so the result feels right for your users and your brand.",
    imageLabel: "UX, WITH A PLAN ✳",
    points: [
      ["Research over opinion.", "We ground decisions in what users actually do and need."],
      ["Test before you build.", "Prototypes catch problems when they are still cheap to change."],
      ["Mobile from the start.", "Layouts are designed for small screens, not squeezed onto them."],
      ["Ready for development.", "Handover details help your developers build what was designed."],
    ],
  },
  related: {
    heading: "GOOD DESIGN\nNEEDS A GOOD BUILD.",
    description: "A UX plan delivers when your website, app and brand all follow through.",
    items: ["webdesign", "app", "website", "graphic"],
  },
  insights: "USABILITY, RESEARCH, INTERFACES, JOURNEYS, DESIGN",
  faq: {
    heading: "UI/UX,\nWITHOUT THE JARGON.",
    intro: "What businesses usually ask before starting a UI/UX project.",
    items: [
      ["What is the difference between UI and UX?", "UX is how the experience works and feels overall. UI is the visual and interactive layer people see and touch. Good products need both."],
      ["Do I need UX if I already have designs?", "Often it still helps. Testing existing designs with real users can reveal issues before you spend on development."],
      ["What will I receive at the end?", "Depending on scope, this can include research findings, wireframes, prototypes, final screens and developer handover files."],
      ["Do you test with real users?", "Yes, usability testing can be part of the project. We agree on the right level of testing for your budget and timeline."],
      ["Can you improve a live product?", "Yes. We can review your current experience and prioritize improvements rather than starting from scratch."],
      ["Do you also build the design?", "Yes. Our web and app development teams can take the project forward, or we can hand it to your developers."],
    ],
  },
  final: {
    heading: "MAKE THE NEXT STEP\nFEEL OBVIOUS.",
    description: "Let's design an experience your users can understand straight away.",
    cta: "Plan My UX Project",
  },
});
