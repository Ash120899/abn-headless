// Written content for /services/video-production/video-editing/.
// The live WP page's service grid also repeats software development items.
// Those are left out here as a copy-and-paste slip.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2318;

export const acf = subservice({
  service: "video-production",
  crumb: "Video Editing",
  rail: "VIDEO EDITING",
  meta: "Video editing by ABN Junction for ads, reels and business content: montages, colour grading, audio enhancement, motion graphics, subtitles and format optimization.",
  hero: {
    eyebrow: "Video Editing",
    before: "RAW FOOTAGE",
    highlight: "IN.",
    after: "REAL STORIES OUT.",
    description:
      "Good editing is the difference between a clip people skip and a story they finish. We shape your footage into clear, polished videos for ads, reels and business content.",
    cta: "Plan My Edit",
    tags: [["✂", "Story Editing"], ["✦", "Colour Grading"], ["▶", "Reels & Ads"]],
    highlights: "Story Editing, Colour Grading, Motion Graphics, Subtitles & Captions",
  },
  marquee: [
    "VIDEO EDITING, COLOUR GRADING, MOTION GRAPHICS, SUBTITLES, REELS, BRAND FILMS",
    "AUDIO CLEAN-UP, MONTAGES, PRODUCT DEMOS, CORPORATE VIDEOS, FORMAT OPTIMIZATION, SOCIAL CUTS",
  ],
  problems: {
    heading: "PLENTY OF FOOTAGE.\nWHERE IS THE STORY?",
    description: "Raw video rarely speaks for itself. Without careful editing, a good message can get lost before viewers reach it.",
    items: [
      ["SLOW OPENING", "↘", "Viewers leave early.", "Long introductions and weak pacing lose attention in the first seconds."],
      ["UNPOLISHED LOOK", "◇", "It doesn't feel professional.", "Uneven colour, abrupt cuts and muddy audio can weaken trust."],
      ["WRONG FORMAT", "⇄", "One cut for every platform.", "A wide video doesn't automatically work as a reel or a story."],
    ],
  },
  offers: {
    heading: "SIX CRAFTS.\nONE FINISHED FILM.",
    description: "Every part of the edit supports the story. Select a craft to see what the work includes.",
    items: [
      ["✂", "Video Montage Creation", "Turn clips into one clear narrative.", "Blending footage, transitions and effects into a cohesive edit."],
      ["✦", "Colour Correction & Grading", "Give your footage a polished look.", "Colour adjustments that match your brand's visual style."],
      ["♪", "Audio Editing & Enhancement", "Make it sound as good as it looks.", "Removing background noise, balancing levels and adding music or effects."],
      ["▣", "Motion Graphics & Animation", "Explain key points on screen.", "Animated text and visuals that help convey your message."],
      ["☰", "Subtitles & Captions", "Reach more viewers, with or without sound.", "Accurate subtitles and captions that improve accessibility."],
      ["⇄", "Format Conversion & Optimization", "Fit every platform.", "Videos prepared for different platforms, devices and resolutions."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM FOOTAGE TO FINAL CUT.",
    description: "Scroll through how raw material becomes a finished video.",
    slides: [
      ["BRIEF", "Agree on the goal.", "We learn who the video is for, where it will run and what it should achieve.", "◎", "EDIT BRIEF", ["Audience defined", "Platform agreed", "Length discussed"]],
      ["REVIEW", "Find the best material.", "We go through your footage and identify the moments worth keeping.", "⌕", "FOOTAGE REVIEW", ["Footage sorted", "Best takes marked", "Gaps flagged"]],
      ["CUT", "Shape the story.", "A first cut sets the structure and pacing that hold attention.", "✂", "ROUGH CUT", ["Hook established", "Story structured", "Pacing set"]],
      ["POLISH", "Refine the look and sound.", "Colour, audio and motion graphics bring everything together.", "✦", "FINISHING", ["Colour graded", "Audio balanced", "Graphics added"]],
      ["REVIEW", "Make it right together.", "You share feedback, and we refine the edit until it is approved.", "⟳", "FEEDBACK ROUND", ["Notes collected", "Changes applied", "Final approved"]],
      ["DELIVER", "Ready for every screen.", "We export the formats, captions and versions you need for each platform.", "✓", "FINAL DELIVERY", ["Formats exported", "Captions added", "Files delivered"]],
    ],
  },
  lab: {
    name: "Edit Lab",
    brief: "Edit",
    preview: "EDIT",
    heading: "YOUR FOOTAGE.\nYOUR STORY.",
    highlight: "YOUR EDIT PLAN.",
    description: "Tell us about your video to shape a sample edit plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What is this video for?",
      options: [
        ["Advertising", "📣", "Your ad edit plan", "ACTION"],
        ["Social media", "📱", "Your social video plan", "ENGAGEMENT"],
        ["Business content", "💼", "Your business video plan", "TRUST"],
      ],
    },
    scope: {
      name: "THE FORMAT",
      question: "What format do you need?",
      kpi: "Format",
      options: [
        ["Reels & shorts", "▶", "Short", "Edit for vertical screens with a strong opening"],
        ["Product demo", "▣", "Demo", "Edit around clear steps and on-screen explanation"],
        ["Corporate film", "◇", "Corporate", "Edit around your company's story with a polished finish"],
        ["Help me decide", "?", "TBD", "Begin by reviewing your footage and where it will run"],
      ],
    },
    range: {
      name: "THE VOLUME",
      question: "Roughly how many finished videos do you need each month?",
      kpi: "Videos a month",
      min: 1,
      max: 60,
      step: 1,
      value: 8,
      caption: "Finished videos",
      minLabel: "1",
      maxLabel: "60+",
      note: "A rough number is fine. Length and complexity matter too.",
      planText: "With about {value} videos a month, we would create a repeatable style and workflow.",
    },
    stage: {
      question: "Where is your footage today?",
      options: [
        ["Not shot yet", "plan the story and shot list before filming"],
        ["Footage ready", "review the material and agree on the edit approach"],
        ["Editing regularly", "build templates and a faster review process"],
      ],
    },
    funnel: "FOOTAGE, ROUGH CUT, POLISH, FINAL CUT",
    planTitle: "Your video edit plan",
    planText: "Agree the goal, shape the story in a rough cut, then polish and format for each platform.",
  },
  difference: {
    heading: "NOT JUST CUTS.\nA REASON TO KEEP WATCHING.",
    description: "Editing is storytelling. We focus on what your viewers need to understand and feel, then use the craft to get them there.",
    imageLabel: "EDITS, WITH A PLAN ✳",
    points: [
      ["Story before effects.", "Effects should support the message, never replace it."],
      ["Details that matter.", "Clean transitions, crisp audio and consistent colour add up."],
      ["Made for each platform.", "We prepare formats and captions for where it will be watched."],
      ["Clear communication.", "You'll know where your project stands, with timely reviews."],
    ],
  },
  related: {
    heading: "A GREAT EDIT\nNEEDS GREAT COMPANY.",
    description: "Editing connects naturally with audio, animation and the content plan around it.",
    items: ["audio", "vfx", "content", "smm"],
  },
  insights: "EDITING, STORYTELLING, REELS, COLOUR, PACING",
  faq: {
    heading: "VIDEO EDITING,\nCOMMON QUESTIONS.",
    intro: "What businesses usually ask before sending us their footage.",
    items: [
      ["What do you need to start editing?", "Your footage, any logos or music you want to use, examples you like, and a short note on the goal and audience."],
      ["How long does editing take?", "It depends on the length, complexity and number of review rounds. We share a timeline once we have seen the material."],
      ["Do you edit reels and short videos?", "Yes. We edit short-form videos with vertical formats, captions and a strong opening."],
      ["Can you improve poor audio?", "We can often clean up and balance recorded audio, though results depend on the original recording."],
      ["Can you make one video work for several platforms?", "Yes. We can create different aspect ratios and lengths from the same footage."],
      ["How many revisions do I get?", "This is agreed in the project scope, so expectations are clear before we begin."],
    ],
  },
  final: {
    heading: "GIVE PEOPLE A REASON\nTO KEEP WATCHING.",
    description: "Let's turn your footage into something worth finishing.",
    cta: "Plan My Edit",
  },
});
