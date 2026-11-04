// Written content for /services/web-and-graphic-design/web-design/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2298;

export const acf = subservice({
  service: "web-and-graphic-design",
  crumb: "Web Design",
  rail: "WEB DESIGN",
  meta: "Web design by ABN Junction: responsive, custom and e-commerce website design, UI/UX, graphics and CMS integration for small businesses and corporate brands.",
  hero: {
    eyebrow: "Web Design",
    before: "A WEBSITE",
    highlight: "THAT WORKS",
    after: "AS WELL AS IT LOOKS.",
    description:
      "Your website often makes the first impression. We design custom, responsive sites that reflect your brand, guide visitors clearly and look right on every screen.",
    cta: "Plan My Website",
    tags: [["▣", "Custom Layouts"], ["✓", "Responsive Design"], ["↗", "E-commerce"]],
    highlights: "Custom Web Design, Responsive Design, E-commerce Design, CMS Integration",
  },
  marquee: [
    "CUSTOM WEB DESIGN, RESPONSIVE LAYOUTS, E-COMMERCE DESIGN, UI/UX, CMS INTEGRATION, WEBSITE GRAPHICS",
    "SMALL BUSINESS SITES, CORPORATE WEBSITES, LANDING PAGES, BRAND EXPERIENCE, MOBILE-FIRST, CONVERSION DESIGN",
  ],
  problems: {
    heading: "PEOPLE VISIT YOUR SITE.\nWHY DON'T THEY STAY?",
    description: "An outdated or generic website can quietly undo the work your marketing does to bring people in.",
    items: [
      ["GENERIC LOOK", "◇", "It could be anyone's site.", "A template feel makes it hard to stand out or show what is special about you."],
      ["BROKEN ON MOBILE", "↘", "Phones get a poor version.", "Layouts that don't adapt make visitors pinch, zoom and leave."],
      ["NO CLEAR PATH", "⇄", "Visitors don't know what to do.", "Without clear structure and actions, interest doesn't become enquiries."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE COMPLETE WEBSITE.",
    description: "We design for your brand, your visitors and your team. Select a capability to see what it includes.",
    items: [
      ["✓", "Responsive Design", "Look right on phones, tablets and desktops.", "Layouts that adapt smoothly to different screen sizes and devices."],
      ["▣", "Custom Layout Design", "Stand out with a site made for your brand.", "Unique, tailored layouts that reflect your personality."],
      ["✦", "Website Graphics", "Tell your story visually.", "Banners, icons and illustrations made to fit your site."],
      ["☰", "CMS Integration", "Update your site without technical help.", "Integrating and customizing platforms such as WordPress or Drupal."],
      ["↗", "E-commerce Design", "Make buying easy and appealing.", "Clear navigation, product displays and streamlined checkout."],
      ["◎", "UI/UX Design", "Make your site easy to use.", "Intuitive interfaces focused on usability and aesthetics."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM BRIEF TO LAUNCH.",
    description: "Scroll through how a website design project comes together, one stage at a time.",
    slides: [
      ["BRIEF", "Understand your business.", "We start with your goals, your audience and what your current site is doing well or badly.", "◎", "DISCOVERY", ["Goals agreed", "Audience defined", "Current site reviewed"]],
      ["PLAN", "Map the structure.", "We plan the pages and the path visitors should take through them.", "☰", "SITE STRUCTURE", ["Pages listed", "Navigation planned", "Key actions chosen"]],
      ["DESIGN", "Give it a personality.", "Visual direction, layouts and graphics bring your brand to life.", "✎", "VISUAL DESIGN", ["Direction agreed", "Layouts designed", "Graphics prepared"]],
      ["ADAPT", "Make it work everywhere.", "Every layout is checked for phones, tablets and desktops.", "✓", "RESPONSIVE CHECK", ["Mobile layouts done", "Tablet checked", "Desktop polished"]],
      ["CONNECT", "Prepare for real use.", "We plan the CMS and e-commerce elements your team needs to run the site.", "⚙", "CMS & STORE", ["Editing planned", "Products structured", "Forms connected"]],
      ["LAUNCH", "Go live, then improve.", "After launch, we review how people use the site and identify what to do next.", "⟳", "LAUNCH", ["Final checks complete", "Site launched", "Improvements listed"]],
    ],
  },
  lab: {
    name: "Website Lab",
    brief: "Website",
    preview: "WEBSITE",
    heading: "YOUR BRAND.\nYOUR VISITORS.",
    highlight: "YOUR WEBSITE PLAN.",
    description: "Answer a few questions to shape a sample website plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What should your new website do?",
      options: [
        ["Generate enquiries", "🎯", "Your lead generation website plan", "LEAD"],
        ["Sell online", "🛒", "Your online store plan", "SALE"],
        ["Build credibility", "✨", "Your brand website plan", "TRUST"],
      ],
    },
    scope: {
      name: "THE TYPE",
      question: "What kind of website do you need?",
      kpi: "Website",
      options: [
        ["Small business", "▣", "Business", "Plan a focused site with clear services and enquiry paths"],
        ["Corporate", "◇", "Corporate", "Plan a structured site for multiple audiences and teams"],
        ["E-commerce", "↗", "Store", "Plan catalog, product pages and checkout around easy buying"],
        ["Help me decide", "?", "TBD", "Begin with a discussion of your goals and existing site"],
      ],
    },
    range: {
      name: "THE SIZE",
      question: "Roughly how many pages do you need?",
      kpi: "Pages",
      min: 5,
      max: 100,
      step: 5,
      value: 15,
      caption: "Approximate pages",
      minLabel: "5",
      maxLabel: "100+",
      note: "A rough number is fine. We'll refine it during planning.",
      planText: "With about {value} pages, we would design key templates first and reuse them consistently.",
    },
    stage: {
      question: "Where are you starting from?",
      options: [
        ["No website yet", "define your brand direction and core pages first"],
        ["Outdated website", "keep what works and redesign around what doesn't"],
        ["Good site, needs more", "focus on the pages closest to conversion"],
      ],
    },
    funnel: "VISIT, EXPLORE, TRUST, ENQUIRY",
    planTitle: "Your website design plan",
    planText: "Plan the structure first, design core templates, then check everything on real screen sizes.",
  },
  difference: {
    heading: "NOT JUST A NEW LOOK.\nA CLEARER WEBSITE.",
    description: "We don't design pages in isolation. Every layout has a job, and it should support your brand, your visitors and your goals.",
    imageLabel: "DESIGN, WITH A PLAN ✳",
    points: [
      ["Designed for your brand.", "Custom layouts rather than a template with your logo on it."],
      ["Built for every screen.", "Responsive design is part of the work from the first layout."],
      ["Easy to keep updated.", "We plan for CMS editing, so your team stays in control."],
      ["Connected to your goals.", "Clear actions guide visitors toward enquiries or sales."],
    ],
  },
  related: {
    heading: "A GREAT DESIGN\nDESERVES A GREAT BUILD.",
    description: "Web design pays off when it is built well, found in search and backed by a strong brand.",
    items: ["website", "uiux", "seo", "graphic"],
  },
  insights: "LAYOUTS, MOBILE, CONVERSION, E-COMMERCE, DESIGN",
  faq: {
    heading: "WEB DESIGN,\nCLEARLY EXPLAINED.",
    intro: "What businesses usually ask before starting a web design project.",
    items: [
      ["How long does a website design project take?", "It depends on the number of pages, the features and how quickly feedback comes through. We give you a timeline once the scope is clear."],
      ["Will my site work on mobile?", "Yes. Responsive design is part of our standard approach, so layouts adapt to phones, tablets and desktops."],
      ["Can I update the website myself?", "Usually, yes. We can integrate a content management system such as WordPress so your team can make everyday updates."],
      ["Do you design online stores?", "Yes. We design e-commerce sites with clear product pages, easy navigation and a streamlined checkout."],
      ["Can you redesign my existing website?", "Yes. We review what is working now, keep what is useful and improve what isn't."],
      ["Do you also write the content?", "We can include content support where needed, or work with the content you already have."],
    ],
  },
  final: {
    heading: "MAKE YOUR FIRST\nIMPRESSION COUNT.",
    description: "Let's design a website your customers can trust and use.",
    cta: "Plan My Website",
  },
});
