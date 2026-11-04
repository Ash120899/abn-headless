// Written content for /services/web-and-graphic-design/campaign-content-design/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 13413;

export const acf = subservice({
  service: "web-and-graphic-design",
  crumb: "Campaign & Content Design",
  rail: "CAMPAIGN DESIGN",
  meta: "Campaign and content design by ABN Junction: ad creatives, content assets, presentations and motion-ready designs that stay recognisable on every platform.",
  hero: {
    eyebrow: "Campaign & Content Design",
    before: "ONE CAMPAIGN.",
    highlight: "EVERY FORMAT.",
    after: "STILL YOU.",
    description:
      "We scale your visual system across real campaigns. Ad creatives, content assets, presentations and motion-ready designs stay recognisable while adapting to each platform.",
    cta: "Plan My Creatives",
    tags: [["◎", "Ad Creatives"], ["✎", "Content Design"], ["▶", "Motion Assets"]],
    highlights: "Ad Creatives, Content Design, Presentations, Motion Assets",
  },
  marquee: [
    "AD CREATIVES, SOCIAL GRAPHICS, CONTENT DESIGN, PRESENTATIONS, MOTION-READY ASSETS, TEMPLATES",
    "CAMPAIGN KEY VISUALS, PLATFORM SIZES, CREATIVE VARIATIONS, BRAND CONSISTENCY, FAST TURNAROUNDS",
  ],
  problems: {
    heading: "THE CAMPAIGN NEEDS TWENTY FORMATS.\nTHE TEAM HAS ONE DESIGN.",
    description: "Campaigns need many sizes, versions and channels. Without a system, quality and consistency are the first things to slip.",
    items: [
      ["RESIZE RUSH", "⌛", "Every format is a scramble.", "Adapting assets at the last minute leads to awkward crops and unreadable text."],
      ["BRAND DRIFT", "⇄", "Versions stop matching.", "As assets multiply, the campaign starts to look like several different brands."],
      ["SAME CREATIVE", "↘", "Nothing new to test.", "With too few variations, it's hard to learn which message or visual works better."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE RECOGNISABLE CAMPAIGN.",
    description: "We design the campaign idea and every version it needs. Select a capability to see what the work includes.",
    items: [
      ["✦", "Campaign Key Visuals", "Set the look of the campaign.", "A central visual idea that the rest of the campaign can grow from."],
      ["◎", "Ad Creatives", "Design for the channels you run.", "Static ad creatives sized and adapted for your advertising platforms."],
      ["✎", "Content Design", "Make content easy to take in.", "Social posts, carousels and content assets designed around the message."],
      ["▣", "Presentations", "Help your story land in the room.", "Sales and pitch decks that stay on brand and stay readable."],
      ["▶", "Motion-Ready Assets", "Prepare designs that can move.", "Layered files and design elements ready for your motion or video team."],
      ["⇄", "Variations & Templates", "Make more without starting over.", "Creative variations for testing and reusable templates for your team."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM BRIEF TO EVERY SCREEN.",
    description: "Scroll through how a campaign's design comes together.",
    slides: [
      ["BRIEF", "Agree the job.", "We start with the campaign goal, audience, message and channels.", "◎", "CAMPAIGN BRIEF", ["Goal agreed", "Audience confirmed", "Channels listed"]],
      ["CONCEPT", "Find the central idea.", "A key visual gives the whole campaign something to stay consistent with.", "✦", "KEY VISUAL", ["Concepts explored", "Direction chosen", "Message refined"]],
      ["DESIGN", "Build the main assets.", "The core creatives are designed with your brand system and the message in mind.", "✎", "CORE ASSETS", ["Hero creative built", "Headlines tested", "Brand checked"]],
      ["ADAPT", "Fit every placement.", "Assets are adapted thoughtfully for each size, not just resized.", "⇄", "FORMATS", ["Sizes listed", "Layouts adapted", "Text kept readable"]],
      ["VARY", "Give yourself options.", "Variations in message and visual let your team test what works.", "◐", "VARIATIONS", ["Messages varied", "Visuals varied", "Files labelled"]],
      ["DELIVER", "Hand over clean files.", "Everything is organised and named, so launching is simple and later updates are quick.", "✓", "DELIVERY", ["Files exported", "Folders organised", "Templates shared"]],
    ],
  },
  lab: {
    name: "Creative Lab",
    brief: "Creative",
    preview: "CREATIVE",
    heading: "YOUR CAMPAIGN.\nYOUR FORMATS.",
    highlight: "YOUR CREATIVE PLAN.",
    description: "Pick your goal, focus and rough volume to shape a sample plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What should this design work support?",
      options: [
        ["A paid campaign", "🎯", "Your ad creative plan", "CAMPAIGN"],
        ["Ongoing content", "🗓", "Your content design plan", "CONTENT"],
        ["A sales pitch", "🤝", "Your presentation plan", "PITCH"],
      ],
    },
    scope: {
      name: "THE FOCUS",
      question: "What do you need most?",
      kpi: "Focus",
      options: [
        ["Ad creatives", "◎", "Ad creatives", "Design a core creative and adapt it for your ad placements"],
        ["Social content", "✎", "Social content", "Create a content design system your calendar can rely on"],
        ["Presentations", "▣", "Presentations", "Build a clear, on-brand deck around your main story"],
        ["Help me decide", "?", "TBD", "Begin by reviewing your campaign plan and where design is holding it back"],
      ],
    },
    range: {
      name: "THE VOLUME",
      question: "Roughly how many assets do you need each month?",
      kpi: "Monthly assets",
      min: 5,
      max: 200,
      step: 5,
      value: 30,
      caption: "Design assets per month",
      minLabel: "5",
      maxLabel: "200+",
      note: "A rough number is fine. Variations and sizes can be counted together.",
      planText: "With about {value} assets a month, we would set up templates early so quality stays consistent.",
    },
    stage: {
      question: "Where are you with campaign design today?",
      options: [
        ["No brand system yet", "set up the basic visual rules before producing at volume"],
        ["Brand set, need output", "build key visuals and templates around your existing brand"],
        ["Running, need variety", "add structured variations so your team can test more ideas"],
      ],
    },
    funnel: "BRIEF, DESIGN, ADAPT, LAUNCH",
    planTitle: "Your campaign design plan",
    planText: "Start with one strong campaign idea, then adapt it carefully for each channel you run.",
  },
  difference: {
    heading: "NOT JUST RESIZED.\nDESIGNED FOR EACH PLACE.",
    description: "A creative that works on one screen can fail on another. We adapt the idea so it still lands everywhere.",
    imageLabel: "CAMPAIGNS, WITH A PLAN ✳",
    points: [
      ["One idea, many versions.", "A central concept keeps the whole campaign recognisable."],
      ["Made for the platform.", "Layouts account for how each channel crops and displays work."],
      ["Ready to test.", "Clear variations help your team learn what connects."],
      ["Organised handover.", "Files and templates are labelled so nobody hunts for the right version."],
    ],
  },
  related: {
    heading: "GOOD CREATIVE NEEDS\nA GOOD CAMPAIGN AROUND IT.",
    description: "Design works best alongside a clear brand, paid media plan and video.",
    items: ["branding", "meta", "performance", "delivery"],
  },
  insights: "AD CREATIVES, CONTENT DESIGN, TEMPLATES, CONSISTENCY, TESTING",
  faq: {
    heading: "CAMPAIGN DESIGN,\nIN PLAIN LANGUAGE.",
    intro: "What businesses usually ask about campaign and content design.",
    items: [
      ["What is a key visual?", "It's the central image or layout idea of a campaign. Other assets adapt from it, which keeps everything recognisably connected."],
      ["Do you design for specific ad platforms?", "Yes. We check the formats you plan to run and design with each placement's sizes and limits in mind."],
      ["Can you work with our existing brand?", "Yes. We follow your guidelines. If you don't have any yet, we can help define the basics first."],
      ["Do you make animated versions?", "We prepare motion-ready designs, and our video team can help with animation when a campaign needs it."],
      ["Can our team reuse the designs?", "Yes. We can provide templates for repeatable formats, so your team can produce simple updates in-house."],
      ["How many variations should we test?", "It depends on your budget and channels. We usually suggest a small number of clearly different ideas instead of many small changes."],
    ],
  },
  final: {
    heading: "ONE CAMPAIGN.\nEVERY SCREEN. STILL YOU.",
    description: "Let's design campaign assets that stay recognisable wherever they run.",
    cta: "Plan My Creatives",
  },
});
