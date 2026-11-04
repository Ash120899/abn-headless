// Written content for /services/video-production/campaign-platform-delivery/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 13417;

export const acf = subservice({
  service: "video-production",
  crumb: "Campaign & Platform Delivery",
  rail: "VIDEO DELIVERY",
  meta: "Campaign and platform video delivery by ABN Junction: cutdowns, aspect ratios, captions and ad variants that let one production work across every channel.",
  hero: {
    eyebrow: "Campaign & Platform Delivery",
    before: "ONE SHOOT",
    highlight: "SHOULD NOT BECOME",
    after: "ONE VIDEO.",
    description:
      "Aspect ratios, cutdowns, captions and platform-native versions let a single production work across ads, social, your site and sales.",
    cta: "Plan My Delivery",
    tags: [["✂", "Cutdowns"], ["▯", "Aspect Ratios"], ["Aa", "Captions"]],
    highlights: "Cutdowns, Aspect Ratios, Captions, Ad Variants",
  },
  marquee: [
    "CUTDOWNS, ASPECT RATIOS, CAPTIONS, AD VARIANTS, REELS, SHORTS, PLATFORM-NATIVE VERSIONS",
    "ADS, SOCIAL, WEBSITE, SALES, HOOK TESTING, EXPORT SPECS, ORGANISED DELIVERY",
  ],
  problems: {
    heading: "YOU MADE A GREAT VIDEO.\nIT ONLY FITS ONE PLACE.",
    description: "A film made for one screen rarely works everywhere. Without planned versions, most of its value stays unused.",
    items: [
      ["WRONG SHAPE", "▯", "It doesn't fit the screen.", "A wide video on a vertical feed loses impact, with faces and text at risk of being cropped."],
      ["SOUND-OFF VIEWS", "⚠", "The message gets missed.", "Without captions, people watching on mute may never get the point."],
      ["ONE ROUND ONLY", "↘", "A single version does all the work.", "With no alternative openings or lengths, there's nothing to test or refresh."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE PRODUCTION, EVERYWHERE.",
    description: "We turn a finished production into the versions each channel needs. Select a capability to see what the work includes.",
    items: [
      ["◎", "Delivery Planning", "Decide where it needs to go.", "Mapping the channels, formats and lengths the campaign requires."],
      ["✂", "Cutdowns", "Find the shorter stories inside.", "Shorter edits for reels, shorts, ads and social posts."],
      ["▯", "Aspect Ratios", "Fit every screen properly.", "Vertical, square and wide versions, reframed around the subject."],
      ["Aa", "Captions", "Keep the message when sound is off.", "Readable, on-brand captions and on-screen text."],
      ["⇄", "Ad Variants", "Give campaigns something to test.", "Versions with different openings, messages and calls to action."],
      ["✓", "Final Delivery", "Hand over the right files.", "Platform-ready exports, clearly named and organised for your team."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM ONE FILM TO EVERY FEED.",
    description: "Scroll through how a single production becomes a full set of versions.",
    slides: [
      ["MAP", "List where it will run.", "We list the ads, social channels, website placements and sales uses that need a version.", "◎", "DELIVERY MAP", ["Channels listed", "Formats noted", "Lengths agreed"]],
      ["SELECT", "Find the strongest moments.", "We go through the footage for the moments that can stand alone as shorter stories.", "⌕", "SELECTS", ["Key moments chosen", "Hooks marked", "Messages matched"]],
      ["CUT", "Build the shorter versions.", "Each cutdown gets its own pacing, opening and ending, so it feels complete.", "✂", "CUTDOWNS", ["Short edits built", "Openings refined", "Endings set"]],
      ["REFRAME", "Fit each screen.", "Vertical, square and wide versions are reframed so the subject stays in view.", "▯", "ASPECT RATIOS", ["Vertical reframed", "Square reframed", "Safe zones checked"]],
      ["LABEL", "Make it readable on mute.", "Captions and on-screen text carry the message for people watching without sound.", "Aa", "CAPTIONS", ["Captions added", "Text styled", "Spelling checked"]],
      ["DELIVER", "Hand over ready files.", "Versions are exported to platform requirements and organised for easy uploading.", "✓", "DELIVERY", ["Exports checked", "Files named", "Folder shared"]],
    ],
  },
  lab: {
    name: "Delivery Lab",
    brief: "Delivery",
    preview: "DELIVERY",
    heading: "YOUR FILM.\nYOUR CHANNELS.",
    highlight: "YOUR DELIVERY PLAN.",
    description: "Pick your goal, main channel and number of versions to shape a sample plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What should these versions help you do?",
      options: [
        ["Run paid ads", "🎯", "Your ad delivery plan", "ADS"],
        ["Grow on social", "📱", "Your social delivery plan", "SOCIAL"],
        ["Support sales", "🤝", "Your sales delivery plan", "SALES"],
      ],
    },
    scope: {
      name: "THE CHANNEL",
      question: "Where will most of these run?",
      kpi: "Main channel",
      options: [
        ["Instagram & Facebook", "◎", "Instagram & Facebook", "Prioritise vertical cutdowns with strong openings and captions"],
        ["YouTube", "▶", "YouTube", "Plan a main version alongside shorter cuts and Shorts"],
        ["Website & sales", "▣", "Website & sales", "Create clear versions for landing pages and sales conversations"],
        ["Help me decide", "?", "TBD", "Begin by reviewing your campaign and where your audience watches"],
      ],
    },
    range: {
      name: "THE VERSIONS",
      question: "Roughly how many versions do you need?",
      kpi: "Versions",
      min: 3,
      max: 100,
      step: 1,
      value: 12,
      caption: "Cutdowns and format versions",
      minLabel: "3",
      maxLabel: "100+",
      note: "A rough number is fine. Each length and shape counts as a version.",
      planText: "With about {value} versions, we would map every channel first so each cut has a clear job.",
    },
    stage: {
      question: "Where is your footage today?",
      options: [
        ["Not shot yet", "plan the versions now so the shoot captures what each one needs"],
        ["Shot, not edited", "edit the main film and the cutdowns together"],
        ["Finished film", "pull cutdowns and reframed versions from the final edit"],
      ],
    },
    funnel: "MAP, CUT, CAPTION, DELIVER",
    planTitle: "Your campaign delivery plan",
    planText: "Start by mapping where the video will run, then build a version with a clear job for each place.",
  },
  difference: {
    heading: "NOT JUST RESIZED.\nRE-EDITED FOR THE PLATFORM.",
    description: "Each platform has its own habits. We adjust pacing, framing and openings so each version feels like it belongs.",
    imageLabel: "DELIVERY, WITH A PLAN ✳",
    points: [
      ["More from one shoot.", "Planned versions make a single production go further."],
      ["Native to each feed.", "Framing, length and openings suit where the video will run."],
      ["Ready for testing.", "Ad variants give your campaign something real to compare."],
      ["Simple handover.", "Files are clearly named, so the right version goes to the right place."],
    ],
  },
  related: {
    heading: "DELIVERY GIVES\nEVERY VIDEO MORE REACH.",
    description: "Delivery connects your production to your ads, social channels and content plan.",
    items: ["production", "editing", "meta", "smm"],
  },
  insights: "REELS, CUTDOWNS, CAPTIONS, AD VARIANTS, DISTRIBUTION",
  faq: {
    heading: "VIDEO DELIVERY,\nIN PLAIN LANGUAGE.",
    intro: "What businesses usually ask about campaign and platform delivery.",
    items: [
      ["What is a cutdown?", "It's a shorter edit taken from a longer video, reworked so that it tells a complete story on its own."],
      ["Which aspect ratios do I need?", "It depends on your channels. Vertical suits reels and shorts, square can suit feeds, and wide suits YouTube and websites."],
      ["Can you do this with footage you didn't shoot?", "Often, yes. Results depend on the footage quality and framing, so we review it first."],
      ["Why do captions matter?", "Many people watch social video with the sound off, and captions help them follow along. They also make your video more accessible."],
      ["What are ad variants?", "They are versions of a video with different openings, messages or calls to action, so your campaign can compare what works better."],
      ["Is it better to plan this before the shoot?", "Yes. Planning early means capturing framing and coverage that work for every format, which gives better results than adapting afterwards."],
    ],
  },
  final: {
    heading: "MAKE ONE SHOOT\nWORK EVERYWHERE.",
    description: "Let's turn your production into versions built for every channel.",
    cta: "Plan My Delivery",
  },
});
