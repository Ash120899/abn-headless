// Written content for /services/web-and-graphic-design/ (WP page 4681).
//
// Copy taken from the reference concept
// C:\Users\ashuu\Downloads\ABN_Web_Graphic_Design_V1.html — text only.
// That file's artwork is not used: image fields stay unset here and the page
// falls back to the Next.js /public files until real art is uploaded to the
// WP media library.
//
// Edit the copy here, then push it up with:
//   node acf/seed.mjs web-and-graphic-design --dry-run
//   node acf/seed.mjs web-and-graphic-design
//
// Repeater rows are plain arrays of objects; the subfield names must match
// acf/service-page-fields.json exactly.

const SITE = "https://abnjunction.com";

export const PAGE_ID = 4681;

export const acf = {
  meta_description:
    "Web design, UI/UX, graphic design, branding and illustration working together as one connected visual system — not disconnected creative pieces.",

  // Derived from the brand colour #F3C521, following the same rule as
  // Digital Marketing: base unchanged, light tint ~10-12% toward white, and
  // a darker shade for contrast on the cream/white panels.
  color_primary: "#f4c928",
  color_primary_light: "#ffdc55",
  color_accent: "#c79a0d",

  hero_eyebrow: "Web & Graphic Design · ABN Junction",
  hero_heading_before: "WE TURN",
  hero_heading_highlight: "IDEAS",
  hero_heading_after: "INTO",
  hero_heading_kinetic: "EXPERIENCES.",
  hero_description:
    "Web design, UI/UX, graphic design, branding and illustration working together as one connected visual system — not disconnected creative pieces.",
  hero_cta_primary_label: "Build My Design System →",
  hero_cta_primary_url: `${SITE}/contact-us/`,
  hero_cta_secondary_label: "See Creative Work",
  hero_cta_secondary_url: "/case-studies",
  hero_stats: [
    { prefix: "", value: "5", suffix: "", label: "Creative disciplines" },
    { prefix: "", value: "1", suffix: "", label: "Connected design system" },
    // Not a number, so the counter has nothing to animate — it renders as-is.
    { prefix: "", value: "∞", suffix: "", label: "Ways to express the brand" },
  ],
  hero_tools: [
    { glyph: "◈", label: "Figma" },
    { glyph: "C", label: "Canva" },
    { glyph: "Ps", label: "Photoshop" },
    { glyph: "Ai", label: "Illustrator" },
    { glyph: "✦", label: "Gemini" },
    { glyph: "Ae", label: "After Effects" },
  ],

  journey_eyebrow: "One visual language · multiple design disciplines",
  journey_heading_before: "Scroll through the design",
  journey_heading_switch: "system, language",
  journey_description:
    "Each discipline solves a different design problem. The advantage comes from how UX, interface, brand, graphics and visual storytelling connect into one recognisable experience.",
  journey_scenes: [
    {
      num: "01 · EXPERIENCE DESIGN",
      title: "UI / UX Design",
      description:
        "Turn complex ideas into intuitive journeys. Research, hierarchy, wireframes and interaction design work together so every screen feels clear, purposeful and easy to use.",
      chips: "User Journeys, Wireframes, Prototypes, UX Systems",
      link_label: "Explore UI / UX →",
      link_url: `${SITE}/services/web-and-graphic-design/ui-ux-design/`,
    },
    {
      num: "02 · DIGITAL EXPERIENCE",
      title: "Creative Web Design",
      description:
        "Build websites people remember. Layout, typography, interaction and storytelling combine to create digital experiences that feel premium before a visitor reads every word.",
      chips: "Web Design, Landing Pages, Interaction, Responsive Design",
      link_label: "Explore Web Design →",
      link_url: `${SITE}/services/web-and-graphic-design/web-design/`,
    },
    {
      num: "03 · VISUAL COMMUNICATION",
      title: "Graphic Design",
      description:
        "Translate ideas into visual communication that is instantly understood. Campaign graphics, social creatives and branded assets stay consistent without becoming repetitive.",
      chips: "Campaign Creative, Social Graphics, Print Design, Digital Assets",
      link_label: "Explore Graphic Design →",
      link_url: `${SITE}/services/web-and-graphic-design/graphic-design/`,
    },
    {
      num: "04 · BRAND SYSTEM",
      title: "Branding & Visual Identity",
      description:
        "Create a visual identity that holds together across websites, campaigns, decks and social channels. Colour, typography, imagery and design rules become one reusable brand language.",
      chips: "Identity, Typography, Colour Systems, Brand Guidelines",
      link_label: "Explore Branding →",
      link_url: `${SITE}/services/web-and-graphic-design/`,
    },
    {
      num: "05 · VISUAL STORYTELLING",
      title: "Illustrations & 3D Models",
      description:
        "Give the brand a visual voice of its own. Illustration, 3D concepts and custom icon systems make the design distinctive instead of interchangeable with every competitor.",
      chips: "Illustration, 3D Concepts, Icon Systems, Visual Direction",
      link_label: "Explore Illustrations & 3D →",
      link_url: `${SITE}/services/web-and-graphic-design/illustrations-3d-designs/`,
    },
    {
      num: "06 · VISUAL LANGUAGE PRODUCTION",
      title: "Campaign & Content Design",
      description:
        "Scale the visual system across real campaigns. Ad creatives, content assets, presentations and motion-ready designs stay recognisable while adapting to each platform.",
      chips: "Ad Creatives, Content Design, Presentations, Motion Assets",
      link_label: "Explore Creative Production →",
      link_url: `${SITE}/services/web-and-graphic-design/`,
    },
  ],

  marquee_row_one:
    "FIGMA ✦ CANVA ✦ PHOTOSHOP ✦ ILLUSTRATOR ✦ UI/UX ✦ WEB DESIGN ✦ GRAPHIC DESIGN ✦ BRANDING ✦ ILLUSTRATION ✦ 3D VISUALS ✦",
  marquee_row_two:
    "WIREFRAMES ✦ PROTOTYPES ✦ DESIGN SYSTEMS ✦ TYPOGRAPHY ✦ COLOUR ✦ LANDING PAGES ✦ SOCIAL CREATIVE ✦ PRESENTATIONS ✦ MOTION ASSETS ✦ GEMINI ✦",

  system_eyebrow: "Connected design",
  system_heading_before: "Design is not decoration. It’s",
  system_heading_kinetic: "one visual system.",
  system_description:
    "A website, ad, social post, presentation and brand asset should not look like five different companies made them. We connect UX, interface design, brand identity and visual communication around one coherent design language.",
  system_nodes: [
    {
      num: "01 · DISCOVER",
      title: "Understand the idea",
      description:
        "Audience, business context, content and brand intent define what the design needs to communicate.",
    },
    {
      num: "02 · STRUCTURE",
      title: "Shape the experience",
      description:
        "UX, hierarchy, wireframes and content flow create the logic before visual styling takes over.",
    },
    {
      num: "03 · CREATE",
      title: "Build the visual language",
      description:
        "Typography, colour, imagery, illustration and interface components give the idea a recognisable identity.",
    },
    {
      num: "04 · REFINE",
      title: "Test every detail",
      description:
        "Responsive behaviour, readability, interaction and consistency are refined until the experience feels effortless.",
    },
    {
      num: "05 · SCALE",
      title: "Keep it consistent",
      description:
        "Reusable systems let websites, campaigns, content and future assets grow without losing the brand.",
    },
  ],

  cinema_eyebrow: "FROM IDEA TO EXPERIENCE · ONE CONNECTED CREATIVE JOURNEY",
  cinema_words: "IDEA, STRUCTURE, VISUAL, EXPERIENCE",
  cinema_description:
    "Scroll through the journey. Strategy gives the idea direction, UX gives it structure, visual design gives it personality and interaction turns the whole thing into an experience.",
  cinema_scroll_hint: "SCROLL · WATCH THE DESIGN SYSTEM COME TOGETHER",
  cinema_depth_cards: [
    { label: "BRIEF", title: "brand + user need", note: "what should this communicate?" },
    { label: "VISUAL LANGUAGE", title: "type + colour + imagery", note: "identity becomes recognisable" },
    { label: "UX / INTERFACE", title: "structure made intuitive", note: "clarity ↑ interaction ↑" },
    { label: "DESIGN SYSTEM", title: "consistency scaled", note: "components · guidelines · assets" },
  ],
  cinema_handoff: [
    { role_fx: "WIREFRAMES · FLOWS · UX", caption: "UX · STRUCTURE · USER JOURNEYS" },
    { role_fx: "TYPE · COLOUR · VISUALS", caption: "BRAND · GRAPHICS · VISUAL LANGUAGE" },
    { role_fx: "WEB · INTERACTION · EXPERIENCE", caption: "WEB DESIGN · INTERACTION · POLISH" },
  ],

  proof_eyebrow: "Selected design signals",
  proof_heading_before: "Design that",
  proof_heading_kinetic: "feels connected.",
  proof_items: [
    { prefix: "", value: "5", suffix: "", label: "Creative disciplines" },
    { prefix: "", value: "1", suffix: "", label: "Connected visual system" },
    { prefix: "", value: "100", suffix: "%", label: "Responsive-first thinking" },
    { prefix: "", value: "360", suffix: "°", label: "Brand consistency" },
  ],

  // Term 15 (web-graphics-deisgn — the typo is in WP, not here).
  cases_category: 15,
  cases_eyebrow: "Design case studies",
  cases_heading_before: "See how the visual system works in",
  cases_heading_switch: "practice, public",
  cases_description:
    "Design case studies should show the brief, the thinking, the visual decisions and the resulting experience — not simply a gallery of final screens.",

  method_eyebrow: "How ABN designs",
  method_heading_before: "Understand. Structure. Create. Refine.",
  method_heading_switch: "Scale, Sustain",
  method_steps: [
    {
      num: "01 · UNDERSTAND",
      title: "Start with the idea.",
      description:
        "Business goals, audience, content and the feeling the brand needs to create come before visual styling.",
    },
    {
      num: "02 · STRUCTURE",
      title: "Give it logic.",
      description:
        "Information architecture, UX flows and hierarchy turn raw content into a clear experience.",
    },
    {
      num: "03 · CREATE",
      title: "Build the visual world.",
      description:
        "Typography, colour, imagery, illustration and UI components give the concept a distinctive personality.",
    },
    {
      num: "04 · REFINE",
      title: "Polish the experience.",
      description:
        "Responsive behaviour, interaction, accessibility and consistency are tested across real screens and use cases.",
    },
    {
      num: "05 · SCALE",
      title: "Turn it into a system.",
      description:
        "Reusable components and visual rules keep future pages, campaigns and assets recognisably connected.",
    },
  ],

  cb_eyebrow: "A little ABN personality",
  cb_heading_before: "Good design is not about making everything look",
  cb_heading_switch: "fancy, flashy",
  cb_description:
    "It is about making the message easier to understand, the experience easier to use and the brand easier to remember — then giving the system enough flexibility to keep evolving.",
  cb_cta_label: "Talk Through Your Design Problem →",
  cb_cta_url: `${SITE}/contact-us/`,
  cb_badges: [
    { text: "Too many ideas 😵" },
    { text: "Design system →" },
    { text: "Everything clicks 😎" },
  ],

  insights_eyebrow: "From the people doing the design work",
  insights_heading_before: "What we’re learning from interfaces, brands and creative",
  insights_heading_switch: "systems, projects",

  faq_eyebrow: "Web & Graphic Design FAQs",
  faq_heading: "Questions worth answering before the first pixel",
  faq_intro:
    "These are the practical questions businesses usually ask before redesigning a website, refreshing a brand or building a more consistent visual system.",
  faq_items: [
    {
      question: "What is included in ABN Junction’s web and graphic design services?",
      answer:
        "The first-level service combines UI/UX, web design, graphic design, branding, illustration and scalable creative production. The exact mix depends on the business and the experience being built.",
    },
    {
      question: "What is the difference between UI/UX design and web design?",
      answer:
        "UX focuses on how information and actions are structured, while UI and web design shape how that experience looks and feels. Strong websites need both working together.",
    },
    {
      question: "Can you redesign an existing website without changing the whole brand?",
      answer:
        "Yes. A redesign can modernise hierarchy, interface and user experience while preserving the strongest parts of the existing brand identity.",
    },
    {
      question: "Do you create graphics for campaigns and social media too?",
      answer:
        "Yes. Campaign and social assets can be built from the same visual system so advertising, organic content and the website feel recognisably connected.",
    },
    {
      question: "Can the design system be handed to our developers or internal team?",
      answer:
        "Yes. The goal is to create reusable components, visual rules and design direction that can scale beyond a single page or one-off asset.",
    },
  ],

  final_eyebrow: "Ready to turn the idea into an experience?",
  final_heading_before: "STOP COLLECTING RANDOM VISUALS. START BUILDING A",
  final_heading_kinetic: "DESIGN SYSTEM.",
  final_description:
    "Tell us what you are trying to communicate. We’ll help structure the experience, define the visual language and turn it into something your audience can recognise and use.",
  final_cta_primary_label: "Book a Design Strategy Call →",
  final_cta_primary_url: `${SITE}/contact-us/`,
  final_cta_secondary_label: "See Creative Work",
  final_cta_secondary_url: "/case-studies",
};
