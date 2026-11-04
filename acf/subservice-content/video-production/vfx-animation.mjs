// Written content for /services/video-production/vfx-animation/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2707;

export const acf = subservice({
  service: "video-production",
  crumb: "VFX & Animation",
  rail: "VFX & ANIMATION",
  meta: "VFX and animation by ABN Junction: 3D animation, visual effects integration, motion graphics, character animation, AR experiences and VFX compositing.",
  hero: {
    eyebrow: "VFX & Animation",
    before: "IF YOU",
    highlight: "CAN'T SHOOT IT",
    after: "WE CAN MAKE IT.",
    description:
      "Some ideas are impossible, expensive or simply too complex to film. We use animation, motion graphics and visual effects to show what a camera can't.",
    cta: "Plan My Project",
    tags: [["◇", "3D Animation"], ["✦", "Visual Effects"], ["▶", "Motion Graphics"]],
    highlights: "3D Animation, 2D & Motion Graphics, VFX Compositing, Character Animation",
  },
  marquee: [
    "3D ANIMATION, 2D ANIMATION, VISUAL EFFECTS, MOTION GRAPHICS, CHARACTER ANIMATION, COMPOSITING",
    "AR EXPERIENCES, PRODUCT VISUALS, EXPLAINER VIDEOS, BRAND FILMS, CGI, ANIMATED STORYTELLING",
  ],
  problems: {
    heading: "SOME STORIES\nARE HARD TO FILM.",
    description: "Complex products, abstract ideas and ambitious scenes often can't be captured well with a camera alone.",
    items: [
      ["HARD TO EXPLAIN", "?", "Complex ideas stay abstract.", "Live footage can't always show how something works on the inside."],
      ["COSTLY TO SHOOT", "↘", "Filming isn't practical.", "Locations, props and scale can put a concept out of reach."],
      ["LOOKS LIKE THE REST", "◇", "Your video blends in.", "Without a distinct style, your message is easy to scroll past."],
    ],
  },
  offers: {
    heading: "SIX CRAFTS.\nENDLESS POSSIBILITIES.",
    description: "We choose the technique that best suits the idea. Select a craft to see what the work includes.",
    items: [
      ["◇", "3D Animation Production", "Bring objects and worlds to life.", "3D animations of characters, objects and environments."],
      ["✦", "Visual Effects Integration", "Add what wasn't on set.", "Effects and simulations integrated with live-action footage."],
      ["▶", "Motion Graphics Design", "Explain ideas in motion.", "Animated elements, typography and visuals for complex messages."],
      ["◎", "Character Animation", "Give your story a personality.", "Fluid movement and expressive characters for your project."],
      ["⌘", "AR Experiences", "Blend digital with the real world.", "Interactive augmented reality experiences for your brand."],
      ["⇄", "VFX Compositing", "Make every layer look like one shot.", "Combining live footage and CGI into seamless shots."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM SCRIPT TO SCREEN.",
    description: "Scroll through how an animation or VFX project develops, from first idea to final render.",
    slides: [
      ["BRIEF", "Find the core idea.", "We learn what you want to say, who needs to see it and where it will play.", "◎", "CREATIVE BRIEF", ["Goal agreed", "Audience defined", "Platform confirmed"]],
      ["STORY", "Plan it frame by frame.", "A script and storyboard let us shape the story before production begins.", "✎", "STORYBOARD", ["Script drafted", "Scenes boarded", "Timing planned"]],
      ["STYLE", "Choose the look.", "Style frames show how the finished piece will look and feel.", "✦", "STYLE FRAMES", ["References reviewed", "Look defined", "Frames approved"]],
      ["BUILD", "Create the assets.", "Characters, models and environments are designed and prepared.", "◇", "ASSET CREATION", ["Models built", "Characters prepared", "Scenes set up"]],
      ["ANIMATE", "Bring it to life.", "Movement, effects and timing turn still assets into a living story.", "▶", "ANIMATION", ["Motion added", "Effects layered", "Feedback gathered"]],
      ["FINISH", "Composite and deliver.", "Final compositing and sound bring everything together for delivery.", "✓", "FINAL RENDER", ["Layers composited", "Sound added", "Formats delivered"]],
    ],
  },
  lab: {
    name: "Motion Lab",
    brief: "Motion",
    preview: "MOTION",
    heading: "YOUR IDEA.\nYOUR WORLD.",
    highlight: "YOUR MOTION PLAN.",
    description: "Tell us about your idea to shape a sample production plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What should this video do?",
      options: [
        ["Explain something", "💡", "Your explainer animation plan", "UNDERSTOOD"],
        ["Showcase a product", "📦", "Your product animation plan", "DESIRE"],
        ["Build my brand", "✨", "Your brand film plan", "RECALL"],
      ],
    },
    scope: {
      name: "THE STYLE",
      question: "What style are you imagining?",
      kpi: "Style",
      options: [
        ["2D animation", "✎", "2D", "Plan a 2D style with clear design and expressive movement"],
        ["3D animation", "◇", "3D", "Plan 3D assets, environments and realistic lighting"],
        ["VFX on footage", "✦", "VFX", "Plan the shoot and effects together for seamless results"],
        ["Help me decide", "?", "TBD", "Begin by matching styles to your message and budget"],
      ],
    },
    range: {
      name: "THE LENGTH",
      question: "Roughly how long should the finished video be?",
      kpi: "Length in seconds",
      min: 15,
      max: 300,
      step: 15,
      value: 60,
      caption: "Seconds",
      minLabel: "15 sec",
      maxLabel: "5 min+",
      note: "A rough number is fine. Style and detail affect scope as much as length.",
      planText: "At about {value} seconds, we would plan the storyboard carefully, since every shot needs creating.",
    },
    stage: {
      question: "Where is your idea today?",
      options: [
        ["Just an idea", "develop the concept and script first"],
        ["Script ready", "move into storyboards and style frames"],
        ["Have footage", "review it and plan the effects shot by shot"],
      ],
    },
    funnel: "SCRIPT, STORYBOARD, ANIMATION, RENDER",
    planTitle: "Your animation plan",
    planText: "Shape the story in a script and storyboard, agree the look, then move into production.",
  },
  difference: {
    heading: "NOT JUST EFFECTS.\nIDEAS YOU CAN SEE.",
    description: "Visual effects are only impressive if they serve the story. We start with your message and let it decide the technique.",
    imageLabel: "MOTION, WITH A PLAN ✳",
    points: [
      ["Story first.", "A clear script and storyboard come before any render."],
      ["The right technique.", "We recommend 2D, 3D or VFX based on your goal and budget."],
      ["Approve as you go.", "Storyboards and style frames reduce surprises later on."],
      ["Ready for each platform.", "We deliver the formats you need for wherever it will play."],
    ],
  },
  related: {
    heading: "GREAT MOTION\nNEEDS GREAT SUPPORT.",
    description: "Animation comes alive with careful editing, strong sound and good illustration.",
    items: ["editing", "audio", "illustration", "content"],
  },
  insights: "ANIMATION, EFFECTS, MOTION, STORY, CGI",
  faq: {
    heading: "VFX AND ANIMATION,\nEXPLAINED.",
    intro: "What businesses usually ask before starting an animation or VFX project.",
    items: [
      ["Should I choose 2D or 3D animation?", "2D often suits explainers and graphic styles. 3D suits products and realistic worlds. We'll recommend what fits your message and budget."],
      ["How long does an animation take?", "It depends on length, style and detail. We can provide a timeline after the script and scope are agreed."],
      ["What is VFX compositing?", "It is the process of combining layers such as live footage and CGI into a single shot that looks natural."],
      ["Do you write the script too?", "Yes. We can help develop the concept and script, or work from one you already have."],
      ["Can VFX be added to footage I already have?", "Often, yes. We'll need to review the footage, as how it was shot affects what is possible."],
      ["Can you create AR experiences?", "Yes. We can develop augmented reality experiences that bring digital elements into the real world."],
    ],
  },
  final: {
    heading: "SHOW THEM\nWHAT A CAMERA CAN'T.",
    description: "Let's bring your idea to life.",
    cta: "Plan My Project",
  },
});
