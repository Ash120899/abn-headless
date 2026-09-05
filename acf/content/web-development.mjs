// Written content for /services/web-development/ (WP page 4692).
//
// Structure mirrors acf/content/digital-marketing.mjs exactly — same section
// order, same row counts, same heading shapes. Only the palette, the copy and
// the case-study category differ.
//
// Scene titles and links follow the real sub-service pages that live under
// this page in WordPress (website-development, content-management-system,
// app-development, adaptive-software-development). Scenes 05 and 06 cover
// adjacent delivery work that has no child page of its own yet, so they link
// back to this page — the same pattern Digital Marketing uses for its
// analytics and advanced-media scenes.
//
// Edit the copy here, then push it up with:
//   node acf/seed.mjs web-development --dry-run
//   node acf/seed.mjs web-development
//
// Image fields are intentionally absent — the page falls back to the Digital
// Marketing artwork in /public until real art is uploaded to WP.

const SITE = "https://abnjunction.com";

export const PAGE_ID = 4692;

export const acf = {
  meta_description:
    "Websites, CMS platforms, web apps and adaptive software built as one engineered system — fast, maintainable and ready to scale with the business.",

  // Derived from the same rule as the other services: base unchanged, light
  // tint ~10-12% toward white, darker shade for contrast on cream panels.
  color_primary: "#4c8dff",
  color_primary_light: "#7aa9ff",
  color_accent: "#2f63c9",

  hero_eyebrow: "Web Development · ABN Junction",
  hero_heading_before: "WE TURN",
  hero_heading_highlight: "IDEAS",
  hero_heading_after: "INTO",
  hero_heading_kinetic: "PLATFORMS.",
  hero_description:
    "Websites, CMS platforms, web apps and adaptive software working together as one engineered system — not a collection of disconnected builds.",
  hero_cta_primary_label: "Build My Web Platform →",
  hero_cta_primary_url: `${SITE}/contact-us/`,
  hero_cta_secondary_label: "See Development Work",
  hero_cta_secondary_url: "/case-studies",
  hero_stats: [
    { prefix: "", value: "4", suffix: "", label: "Build disciplines" },
    { prefix: "", value: "100", suffix: "%", label: "Responsive by default" },
    { prefix: "", value: "1", suffix: "", label: "Maintainable codebase" },
  ],
  hero_tools: [
    { glyph: "W", label: "WordPress" },
    { glyph: "S", label: "Shopify" },
    { glyph: "◈", label: "React" },
    { glyph: "N", label: "Next.js" },
    { glyph: "▦", label: "Node" },
    { glyph: "☁", label: "Cloud" },
  ],

  journey_eyebrow: "One platform · multiple build disciplines",
  journey_heading_before: "Scroll through the build",
  journey_heading_switch: "system, stack",
  journey_description:
    "Each discipline solves a different engineering problem. The advantage comes from how front-end, CMS, applications and infrastructure connect into one platform that keeps working as it grows.",
  journey_scenes: [
    {
      num: "01 · DIGITAL FOUNDATION",
      title: "Website Development",
      description:
        "Build the foundation properly the first time. Semantic structure, performance budgets, responsive behaviour and clean templates make a site fast to load and cheap to maintain.",
      chips: "Responsive Build, Core Web Vitals, Accessibility, Clean Templates",
      link_label: "Explore Website Development →",
      link_url: `${SITE}/services/web-development/website-development/`,
    },
    {
      num: "02 · CONTENT CONTROL",
      title: "Content Management System",
      description:
        "Turn a static site into something the team can actually run. Structured content models, editor-friendly fields and safe publishing workflows put control back with the people who own the message.",
      chips: "WordPress, Shopify, Headless CMS, Custom Fields",
      link_label: "Explore CMS Development →",
      link_url: `${SITE}/services/web-development/content-management-system/`,
    },
    {
      num: "03 · PRODUCT ENGINEERING",
      title: "App Development",
      description:
        "Build the parts a website alone cannot do. Portals, dashboards, booking flows and customer tools are engineered around real user tasks rather than bolted on as plugins.",
      chips: "Web Apps, iOS / Android, Dashboards, Integrations",
      link_label: "Explore App Development →",
      link_url: `${SITE}/services/web-development/app-development/`,
    },
    {
      num: "04 · SCALABLE SOFTWARE",
      title: "Adaptive Software Development",
      description:
        "Ship software that can change its mind. Modular architecture, iterative delivery and automation let the platform absorb new requirements without a rebuild every year.",
      chips: "Modular Architecture, APIs, Automation, Iterative Delivery",
      link_label: "Explore Adaptive Software →",
      link_url: `${SITE}/services/web-development/adaptive-software-development/`,
    },
    {
      num: "05 · SPEED & RELIABILITY",
      title: "Performance & Infrastructure",
      description:
        "A build is only as good as how it runs. Caching, image strategy, hosting, CDN and monitoring keep the platform fast under real traffic instead of only in a test environment.",
      chips: "Caching, CDN, Hosting, Monitoring",
      link_label: "Explore Performance Engineering →",
      link_url: `${SITE}/services/web-development/`,
    },
    {
      num: "06 · CONTINUOUS DELIVERY",
      title: "Maintenance & Iteration",
      description:
        "Launch is the start, not the finish. Updates, security patches, analytics review and incremental releases keep the platform healthy and improving after go-live.",
      chips: "Updates, Security Patches, QA, Incremental Releases",
      link_label: "Explore Maintenance →",
      link_url: `${SITE}/services/web-development/`,
    },
  ],

  marquee_row_one:
    "WORDPRESS ✦ SHOPIFY ✦ REACT ✦ NEXT.JS ✦ NODE ✦ WEB APPS ✦ CMS ✦ APP DEVELOPMENT ✦ APIS ✦ CLOUD ✦",
  marquee_row_two:
    "CORE WEB VITALS ✦ RESPONSIVE ✦ ACCESSIBILITY ✦ INTEGRATIONS ✦ AUTOMATION ✦ CACHING ✦ CDN ✦ QA ✦ RELEASES ✦ MONITORING ✦",

  system_eyebrow: "Connected engineering",
  system_heading_before: "A website is not a one-off project. It’s",
  system_heading_kinetic: "one platform.",
  system_description:
    "Front-end, CMS, applications, integrations and infrastructure should not be built by five teams who never speak. We connect them around one architecture the business can keep using.",
  system_nodes: [
    { num: "01 · SCOPE", title: "Define the problem", description: "Business goals, users, content and technical constraints decide what actually needs building." },
    { num: "02 · ARCHITECT", title: "Design the structure", description: "Data models, templates, integrations and hosting are planned before the first component is written." },
    { num: "03 · BUILD", title: "Engineer the platform", description: "Front-end, CMS and application logic are built as reusable parts rather than one-off pages." },
    { num: "04 · TEST", title: "Prove it holds", description: "Performance, responsiveness, accessibility and edge cases are checked on real devices and real data." },
    { num: "05 · SCALE", title: "Keep it healthy", description: "Monitoring, updates and iterative releases let the platform grow without accumulating debt." },
  ],

  cinema_eyebrow: "FROM BRIEF TO BUILD · ONE CONNECTED PLATFORM",
  cinema_words: "IDEA, ARCHITECTURE, BUILD, PLATFORM",
  cinema_description:
    "Scroll through the journey. Scope defines the problem, architecture gives it structure, engineering makes it real and iteration keeps the platform improving after launch.",
  cinema_scroll_hint: "SCROLL · WATCH THE PLATFORM COME TOGETHER",
  cinema_depth_cards: [
    { label: "BRIEF", title: "goal + constraints", note: "what must this actually do?" },
    { label: "ARCHITECTURE", title: "models + templates", note: "structure before styling" },
    { label: "ENGINEERING", title: "components + logic", note: "reusable · testable" },
    { label: "OPERATION", title: "shipped and monitored", note: "speed · uptime · releases" },
  ],
  cinema_handoff: [
    { role_fx: "STRUCTURE · MODELS · APIS", caption: "ARCHITECTURE · DATA · INTEGRATIONS" },
    { role_fx: "COMPONENTS · UI · FRONT-END", caption: "BUILD · INTERFACE · RESPONSIVE" },
    { role_fx: "SPEED · UPTIME · RELEASES", caption: "PERFORMANCE · INFRA · MAINTENANCE" },
  ],

  proof_eyebrow: "Selected engineering signals",
  proof_heading_before: "Builds that",
  proof_heading_kinetic: "keep working.",
  proof_items: [
    { prefix: "", value: "4", suffix: "", label: "Build disciplines" },
    { prefix: "", value: "100", suffix: "%", label: "Responsive by default" },
    { prefix: "", value: "1", suffix: "", label: "Connected architecture" },
    { prefix: "", value: "360", suffix: "°", label: "Tested before launch" },
  ],

  cases_category: 16, // case_study_category: web-development
  cases_eyebrow: "Web Development case studies",
  cases_heading_before: "See the platforms behind the",
  cases_heading_switch: "builds, brands",
  cases_description:
    "Development case studies should show the constraint, the architectural decisions and how the platform performs in production — not just a screenshot of the homepage.",

  method_eyebrow: "How ABN builds",
  method_heading_before: "Scope. Architect. Build. Test.",
  method_heading_switch: "Iterate, Maintain",
  method_steps: [
    { num: "01 · SCOPE", title: "Start with the problem.", description: "Business goals, users, content, integrations and existing systems come before any technology choice." },
    { num: "02 · ARCHITECT", title: "Plan the structure.", description: "Content models, templates, data flow and hosting are decided up front so the build stays coherent." },
    { num: "03 · BUILD", title: "Engineer it properly.", description: "Reusable components, clean code and sensible defaults make the platform quick to extend later." },
    { num: "04 · TEST", title: "Break it on purpose.", description: "Performance, responsiveness, accessibility and edge cases are tested on real devices and real content." },
    { num: "05 · ITERATE", title: "Keep shipping.", description: "Monitoring, updates and incremental releases turn launch into an ongoing improvement cycle." },
  ],

  cb_eyebrow: "A little ABN personality",
  cb_heading_before: "Websites don’t get faster by adding more",
  cb_heading_switch: "plugins, patches",
  cb_description:
    "They get faster when the architecture is right, the code is doing less work and someone has actually measured what is slow instead of guessing.",
  cb_cta_label: "Talk Through Your Build Problem →",
  cb_cta_url: `${SITE}/contact-us/`,
  cb_badges: [{ text: "Page load 8s 😩" }, { text: "Rebuild →" }, { text: "0.9s 😎" }],

  insights_eyebrow: "From the people doing the build work",
  insights_heading_before: "What we’re learning from the",
  insights_heading_switch: "platforms, codebases",

  faq_eyebrow: "Web Development FAQs",
  faq_heading: "Questions worth answering before you build",
  faq_intro:
    "These are the practical questions businesses usually ask before commissioning a website, replatforming a CMS or building a custom application.",
  faq_items: [
    { question: "What is included in ABN Junction’s web development services?", answer: "The first-level service covers website development, CMS development, app development and adaptive software, plus the performance and maintenance work that keeps a platform healthy after launch. The exact mix depends on what the business needs to run." },
    { question: "Should we use WordPress, Shopify or a custom build?", answer: "It depends on who edits the content, how the site earns money, what it has to integrate with and how much it needs to change. The platform should follow the requirement, not the other way round." },
    { question: "Can you rebuild our site without losing SEO?", answer: "Yes. URL structure, redirects, metadata, internal linking and page speed are planned as part of the migration so existing rankings carry across rather than being rediscovered from scratch." },
    { question: "Do you build web applications as well as websites?", answer: "Yes. Portals, dashboards, booking systems and customer tools can be built alongside the marketing site so both share one design system and one set of data." },
    { question: "What happens after the site launches?", answer: "Updates, security patches, monitoring and incremental improvements can continue as an ongoing engagement, or the codebase can be handed to your internal team with documentation." },
  ],

  final_eyebrow: "Ready to build it properly?",
  final_heading_before: "STOP PATCHING WEBSITES. START BUILDING A",
  final_heading_kinetic: "REAL PLATFORM.",
  final_description:
    "Tell us what the platform needs to do. We’ll help define the architecture, build it as one system and keep it fast after launch.",
  final_cta_primary_label: "Book a Build Consultation →",
  final_cta_primary_url: `${SITE}/contact-us/`,
  final_cta_secondary_label: "See Development Work",
  final_cta_secondary_url: "/case-studies",
};
