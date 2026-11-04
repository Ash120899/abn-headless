// Written content for /services/web-and-graphic-design/illustrations-3d-designs/.
// The live WP page also mentions model agency services. Those are left out here
// as they don't belong to an illustration and 3D offer.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2301;

export const acf = subservice({
  service: "web-and-graphic-design",
  crumb: "Illustrations & 3D Models",
  rail: "ILLUSTRATION & 3D",
  meta: "Illustration and 3D design by ABN Junction: custom illustrations, character design, storyboarding, concept art, 3D modeling and illustrative branding.",
  hero: {
    eyebrow: "Illustrations & 3D Models",
    before: "ART THAT",
    highlight: "ONLY YOU",
    after: "CAN OWN.",
    description:
      "Stock images can make any brand look like every other. We create custom illustrations, characters and 3D models that give your brand a visual world of its own.",
    cta: "Plan My Artwork",
    tags: [["✎", "Custom Illustration"], ["✦", "Character Design"], ["◇", "3D Modeling"]],
    highlights: "Custom Illustrations, Character Design, Storyboarding, 3D Modeling",
  },
  marquee: [
    "CUSTOM ILLUSTRATION, CHARACTER DESIGN, STORYBOARDS, CONCEPT ART, 3D MODELS, ILLUSTRATIVE BRANDING",
    "VECTOR ART, EDITORIAL ILLUSTRATION, PRODUCT VISUALS, BRAND MASCOTS, WEB ILLUSTRATION, VISUAL STORYTELLING",
  ],
  problems: {
    heading: "STOCK ART IS EVERYWHERE.\nWHERE IS YOUR BRAND?",
    description: "When visuals could belong to anyone, your brand becomes harder to recognize and your story harder to tell.",
    items: [
      ["GENERIC VISUALS", "◇", "You look like everyone else.", "Familiar stock images make your brand easy to scroll past."],
      ["FLAT STORYTELLING", "↘", "Your story doesn't land.", "Complex ideas stay abstract when there is nothing visual to anchor them."],
      ["HARD TO VISUALIZE", "?", "Products are hard to show.", "Some products and ideas can't easily be photographed."],
    ],
  },
  offers: {
    heading: "SIX CRAFTS.\nONE VISUAL WORLD.",
    description: "We create artwork for your brand, products and stories. Select a craft to see what the work includes.",
    items: [
      ["✎", "Custom Illustrations", "Art made for your brand and nobody else.", "Hand-drawn or digital illustrations in a style tailored to you."],
      ["✦", "Character Design", "Give your brand a recognizable personality.", "Original characters that carry your brand's message."],
      ["▣", "Storyboarding", "Plan your story before production.", "Detailed boards that map the flow of animations, videos or presentations."],
      ["◎", "Concept Art", "Find the look of an idea.", "Visuals that guide the artistic direction of games, films and campaigns."],
      ["◇", "3D Modeling", "Show things in depth and detail.", "3D models for product visualization, animation and immersive media."],
      ["⇄", "Illustrative Branding", "Build art into your identity.", "Bringing custom illustrations into your brand materials consistently."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM IDEA TO ARTWORK.",
    description: "Scroll through how an illustration or 3D project develops, from first idea to final files.",
    slides: [
      ["BRIEF", "Start with your story.", "We learn what the artwork needs to say, who will see it and where it will live.", "◎", "CREATIVE BRIEF", ["Message defined", "Audience discussed", "Uses listed"]],
      ["STYLE", "Find the right look.", "We explore styles and references until the direction feels right for your brand.", "◇", "STYLE EXPLORATION", ["References gathered", "Styles compared", "Direction chosen"]],
      ["SKETCH", "Rough it out.", "Early sketches or block-outs let us shape the idea before investing in detail.", "✎", "ROUGH SKETCHES", ["Ideas sketched", "Compositions tested", "Feedback gathered"]],
      ["CRAFT", "Add the detail.", "We build the final artwork or 3D model with care for form, colour and character.", "✦", "FINAL ARTWORK", ["Details drawn", "Colour applied", "Models refined"]],
      ["REVIEW", "Refine it together.", "We make revisions with you until the artwork says what it should.", "⟳", "REVISIONS", ["Feedback reviewed", "Details adjusted", "Final approved"]],
      ["DELIVER", "Ready for every use.", "Files are prepared for your website, print, video or wherever they're headed.", "✓", "FINAL FILES", ["Formats exported", "Scalable where needed", "Ready for use"]],
    ],
  },
  lab: {
    name: "Art Lab",
    brief: "Artwork",
    preview: "ARTWORK",
    heading: "YOUR IDEA.\nYOUR STYLE.",
    highlight: "YOUR ARTWORK PLAN.",
    description: "Tell us what you have in mind to shape a sample artwork plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What will the artwork be used for?",
      options: [
        ["My website or app", "🌐", "Your web and app artwork plan", "WEBSITE"],
        ["Marketing campaign", "📣", "Your campaign artwork plan", "CAMPAIGN"],
        ["Product visuals", "📦", "Your product visuals plan", "PRODUCT"],
      ],
    },
    scope: {
      name: "THE CRAFT",
      question: "What kind of artwork do you need?",
      kpi: "Artwork",
      options: [
        ["Illustrations", "✎", "Illustration", "Start by defining a custom illustration style for your brand"],
        ["Characters", "✦", "Characters", "Start with character concepts that embody your brand"],
        ["3D models", "◇", "3D", "Start with reference gathering and a clear model brief"],
        ["Storyboards", "▣", "Storyboard", "Start by mapping the story scene by scene"],
      ],
    },
    range: {
      name: "THE SIZE",
      question: "Roughly how many pieces do you need?",
      kpi: "Pieces",
      min: 1,
      max: 50,
      step: 1,
      value: 5,
      caption: "Approximate pieces",
      minLabel: "1",
      maxLabel: "50+",
      note: "A rough number is fine. Style and detail affect scope too.",
      planText: "With about {value} pieces, we would establish a clear style before producing the full set.",
    },
    stage: {
      question: "How clear is your idea today?",
      options: [
        ["Just a feeling", "begin with style exploration and references"],
        ["A rough concept", "develop it through sketches and feedback"],
        ["A detailed brief", "move quickly into sketches and final artwork"],
      ],
    },
    funnel: "BRIEF, STYLE, SKETCH, ARTWORK",
    planTitle: "Your artwork plan",
    planText: "Agree the brief, settle on a style through sketches, then craft the final artwork.",
  },
  difference: {
    heading: "NOT JUST PRETTY PICTURES.\nA STORY THAT'S YOURS.",
    description: "Custom art works when it means something. We connect every character, scene and model to what your brand needs to say.",
    imageLabel: "ART, WITH A PLAN ✳",
    points: [
      ["Start with meaning.", "We understand your message before we pick a style."],
      ["Sketch before finishing.", "Early rough work saves time and keeps you in the process."],
      ["A style you can reuse.", "We aim for a visual language that can grow with your brand."],
      ["Files for real use.", "Artwork is prepared for the places you'll actually use it."],
    ],
  },
  related: {
    heading: "GOOD ART\nDESERVES A BIGGER STAGE.",
    description: "Illustration and 3D work come alive through motion, websites and your wider brand.",
    items: ["vfx", "graphic", "webdesign", "uiux"],
  },
  insights: "ILLUSTRATION, CHARACTERS, 3D, STYLE, STORY",
  faq: {
    heading: "ILLUSTRATION AND 3D,\nANSWERED.",
    intro: "What businesses usually ask before commissioning artwork.",
    items: [
      ["What styles can you work in?", "We can explore a range, from editorial and vector illustration to characters and 3D. The right choice depends on your brand and where the work will be used."],
      ["Can you create a brand mascot?", "Yes. Character design can give your brand a recognizable personality across marketing and your website."],
      ["What are 3D models used for?", "They are useful for product visualization, animation, virtual experiences and web projects, particularly where photography is difficult."],
      ["What is a storyboard?", "It is a sequence of drawings that plans how a video or animation will unfold before production begins."],
      ["Can I reuse the artwork in different places?", "Usually, yes. We discuss your intended uses upfront so files and rights arrangements suit them."],
      ["How many revisions are included?", "We agree on this in the project scope, so expectations are clear before work begins."],
    ],
  },
  final: {
    heading: "GIVE YOUR BRAND\nA WORLD OF ITS OWN.",
    description: "Let's create artwork nobody else can use.",
    cta: "Plan My Artwork",
  },
});
