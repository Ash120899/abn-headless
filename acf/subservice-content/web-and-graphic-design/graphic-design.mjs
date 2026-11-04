// Written content for /services/web-and-graphic-design/graphic-design/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2299;

export const acf = subservice({
  service: "web-and-graphic-design",
  crumb: "Graphic Design",
  rail: "GRAPHIC DESIGN",
  meta: "Graphic design by ABN Junction: logos, branding and identity, print design, packaging, infographics, digital illustrations and social media graphics.",
  hero: {
    eyebrow: "Graphic Design",
    before: "MAKE",
    highlight: "YOUR BRAND",
    after: "IMPOSSIBLE TO MISS.",
    description:
      "From your logo to your packaging, every visual says something about your business. We design brand assets that look consistent, feel considered and are easy to recognize.",
    cta: "Plan My Design Project",
    tags: [["✦", "Logo Design"], ["◇", "Brand Identity"], ["▣", "Print & Digital"]],
    highlights: "Logo Design, Brand Identity, Print & Packaging, Social Media Graphics",
  },
  marquee: [
    "LOGO DESIGN, BRAND IDENTITY, PACKAGING, BROCHURES, INFOGRAPHICS, SOCIAL MEDIA GRAPHICS",
    "VISUAL IDENTITY, POSTERS, BANNERS, BUSINESS CARDS, DIGITAL ILLUSTRATION, CREATIVE DIRECTION",
  ],
  problems: {
    heading: "PEOPLE SEE YOUR BRAND.\nDO THEY REMEMBER IT?",
    description: "Great products get overlooked when their visuals feel inconsistent or forgettable.",
    items: [
      ["WEAK IDENTITY", "◇", "Nothing stands out.", "A generic logo and style make it hard for people to remember you."],
      ["INCONSISTENT VISUALS", "⇄", "Every asset looks different.", "Mismatched colours, type and styles weaken your brand over time."],
      ["COMPLEX MESSAGE", "?", "Good ideas get lost.", "Complicated information stays ignored when it isn't made visual."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE RECOGNIZABLE BRAND.",
    description: "We keep every asset connected to the same identity. Select a capability to see what it includes.",
    items: [
      ["✦", "Logo Design", "Create a mark people recognize.", "Unique, memorable logos that represent your brand identity."],
      ["◇", "Branding & Identity", "Build one consistent visual language.", "Colour schemes, typography and visual styles that work together."],
      ["▣", "Print Design", "Make printed materials as strong as digital.", "Brochures, business cards, posters, banners and packaging."],
      ["✎", "Digital Illustrations", "Add a personal, artistic touch.", "Custom illustrations for digital and print marketing materials."],
      ["▥", "Infographic Design", "Make complex information easy to grasp.", "Turning data and processes into clear, engaging visuals."],
      ["◎", "Social Media Graphics", "Keep your feed on-brand and shareable.", "Designed posts and graphics that support your online presence."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM BRIEF TO BRAND.",
    description: "Scroll through how a design project moves from idea to finished assets.",
    slides: [
      ["BRIEF", "Understand your vision.", "We learn about your brand, your audience and where these designs will be used.", "◎", "CREATIVE BRIEF", ["Brand discussed", "Audience defined", "Uses listed"]],
      ["EXPLORE", "Look for the right direction.", "We research your market and explore visual ideas that could suit you.", "⌕", "RESEARCH", ["Market reviewed", "References collected", "Directions explored"]],
      ["CONCEPT", "Bring ideas to the table.", "Initial concepts show different ways your brand could look and feel.", "✎", "CONCEPTS", ["Options presented", "Reasoning explained", "Feedback gathered"]],
      ["REFINE", "Sharpen the winner.", "We develop the chosen direction with your feedback until it feels right.", "⟳", "REVISIONS", ["Direction chosen", "Details refined", "Approval reached"]],
      ["SYSTEM", "Extend it everywhere.", "Colours, type and layouts come together so future work stays consistent.", "◇", "BRAND SYSTEM", ["Colours defined", "Typography set", "Layouts prepared"]],
      ["DELIVER", "Get files ready to use.", "You receive the files you need for print, web and social media.", "✓", "FINAL FILES", ["Print files ready", "Web files exported", "Usage guidance shared"]],
    ],
  },
  lab: {
    name: "Design Lab",
    brief: "Design",
    preview: "DESIGN",
    heading: "YOUR BRAND.\nYOUR STORY.",
    highlight: "YOUR DESIGN PLAN.",
    description: "Choose what you need to shape a sample design plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What do you need design to do?",
      options: [
        ["Build a new brand", "✨", "Your new brand design plan", "IDENTITY"],
        ["Refresh my brand", "🔄", "Your brand refresh plan", "REFRESH"],
        ["Support a campaign", "📣", "Your campaign design plan", "CAMPAIGN"],
      ],
    },
    scope: {
      name: "THE ASSETS",
      question: "What should we design first?",
      kpi: "First priority",
      options: [
        ["Logo & identity", "✦", "Identity", "Start with your logo and a simple visual identity"],
        ["Print & packaging", "▣", "Print", "Start with print-ready materials and packaging"],
        ["Social media", "◎", "Social", "Start with a reusable set of social media templates"],
        ["Help me decide", "?", "TBD", "Begin by reviewing your current brand materials"],
      ],
    },
    range: {
      name: "THE SIZE",
      question: "Roughly how many design items do you need?",
      kpi: "Design items",
      min: 1,
      max: 50,
      step: 1,
      value: 5,
      caption: "Approximate items",
      minLabel: "1",
      maxLabel: "50+",
      note: "A rough number is fine. Larger needs may suit a reusable template system.",
      planText: "With about {value} items, we would establish the visual direction before producing the full set.",
    },
    stage: {
      question: "Where is your brand today?",
      options: [
        ["Brand new", "define your identity before designing individual pieces"],
        ["Have a logo", "extend it into a consistent visual system"],
        ["Established brand", "work within your guidelines and keep everything consistent"],
      ],
    },
    funnel: "BRIEF, CONCEPT, REFINE, IDENTITY",
    planTitle: "Your graphic design plan",
    planText: "Agree the brief, choose a clear visual direction, then extend it across your materials.",
  },
  difference: {
    heading: "NOT JUST NICE GRAPHICS.\nA BRAND PEOPLE KNOW.",
    description: "Good design supports your business message. We connect each item back to your brand, so every piece makes the next one stronger.",
    imageLabel: "DESIGN, WITH A PLAN ✳",
    points: [
      ["Start with your vision.", "We take time to understand your brand and your audience."],
      ["Design as a system.", "Every piece should look like it came from the same brand."],
      ["Ready for real use.", "Files are prepared properly for print, web and social media."],
      ["Keep you involved.", "You'll see the reasoning and shape the direction along the way."],
    ],
  },
  related: {
    heading: "A STRONG BRAND\nSHOWS UP EVERYWHERE.",
    description: "Your visual identity becomes stronger across your website, social media and video.",
    items: ["illustration", "webdesign", "smm", "vfx"],
  },
  insights: "BRANDING, LOGOS, COLOUR, PRINT, TYPOGRAPHY",
  faq: {
    heading: "GRAPHIC DESIGN,\nANSWERED.",
    intro: "What businesses usually ask before starting a design project.",
    items: [
      ["What do you need from me to start?", "A short brief about your business, audience and goals helps most. Any existing brand materials or references are useful too."],
      ["Do you offer logo design only?", "We can design a logo alone, though it works best as part of a wider identity with colours and type."],
      ["Can you work within our existing guidelines?", "Yes. If you already have a brand, we'll follow your guidelines so the new work fits."],
      ["Do you handle print design?", "Yes. We design brochures, posters, banners, business cards and packaging, and prepare files for printing."],
      ["What file formats will I get?", "It depends on the project, but you'll receive files suitable for your intended print and digital uses."],
      ["Can you design social media templates?", "Yes. Reusable templates can keep your social media consistent and save time on future posts."],
    ],
  },
  final: {
    heading: "GIVE PEOPLE\nA BRAND TO REMEMBER.",
    description: "Let's create visuals that clearly say who you are.",
    cta: "Plan My Design Project",
  },
});
