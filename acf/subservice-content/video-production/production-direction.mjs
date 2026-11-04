// Written content for /services/video-production/production-direction/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 13416;

export const acf = subservice({
  service: "video-production",
  crumb: "Production & Direction",
  rail: "PRODUCTION",
  meta: "Video production and direction by ABN Junction: shot planning, direction, lighting and on-set capture, with decisions made with the final cut in mind.",
  hero: {
    eyebrow: "Production & Direction",
    before: "GET THE FOOTAGE",
    highlight: "THE EDIT",
    after: "WILL NEED.",
    description:
      "Shot planning, direction, lighting and on-set decisions are made with the final cut in mind, so the story is built on set instead of being rescued afterwards.",
    cta: "Plan My Shoot",
    tags: [["▤", "Shot Planning"], ["✦", "Direction"], ["☀", "Lighting"]],
    highlights: "Shot Planning, Direction, Lighting, On-set Capture",
  },
  marquee: [
    "SHOT PLANNING, DIRECTION, LIGHTING, ON-SET CAPTURE, SHOT LISTS, STORYBOARDS, CALL SHEETS",
    "BRAND FILMS, PRODUCT VIDEOS, INTERVIEWS, SOCIAL CONTENT, CAMPAIGN SHOOTS, PLANNED FOR THE EDIT",
  ],
  problems: {
    heading: "SHOOT DAY IS OVER.\nTHE SHOT YOU NEEDED ISN'T THERE.",
    description: "An edit can only work with what was captured. Decisions made before and during the shoot shape the final film.",
    items: [
      ["NO PLAN", "⌛", "The day runs out early.", "Without a clear shot plan, time goes on setup while important moments get rushed."],
      ["THIN COVERAGE", "↘", "The editor has few options.", "Too few angles and details make it hard to shape the story or fix pacing later."],
      ["FIX IT LATER", "⚠", "Problems travel to the edit.", "Poor light or sound is costly to repair, and some problems can't be repaired at all."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE SHOOT THAT DELIVERS.",
    description: "We plan the shoot around the final film. Select a capability to see what the work includes.",
    items: [
      ["✎", "Pre-Production", "Decide the important things early.", "Creative approach, script support and planning before shoot day."],
      ["▤", "Shot Planning", "Know what you need to capture.", "Shot lists and storyboards built around the story and the edit."],
      ["✦", "Direction", "Keep the story on track.", "On-set direction for performance, framing and the intended message."],
      ["☀", "Lighting", "Set the mood deliberately.", "Lighting plans that suit the brand, location and subject."],
      ["▶", "On-set Capture", "Record what the edit will need.", "Camera work and coverage, planned so the editor has real choices."],
      ["⇄", "Handover to Edit", "Keep the story moving.", "Organised footage and shoot notes, passed cleanly to post-production."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM IDEA TO FINAL FOOTAGE.",
    description: "Scroll through how a shoot gets planned and captured.",
    slides: [
      ["BRIEF", "Decide what it's for.", "We begin with the audience, the platform, the message and the action you want.", "◎", "CREATIVE BRIEF", ["Goal agreed", "Audience defined", "Platforms listed"]],
      ["PLAN", "Work backwards from the edit.", "The story turns into a script, a shot list and a realistic schedule.", "▤", "SHOT PLAN", ["Script reviewed", "Shots listed", "Schedule drafted"]],
      ["PREPARE", "Sort the details early.", "Locations, people, props and equipment are confirmed before anyone arrives.", "✓", "LOGISTICS", ["Location confirmed", "Crew and cast set", "Kit prepared"]],
      ["LIGHT", "Set the scene.", "Lighting and framing are shaped around the subject and the mood you want.", "☀", "ON-SET SETUP", ["Lighting set", "Framing checked", "Sound tested"]],
      ["CAPTURE", "Direct with the cut in mind.", "We direct for performance and capture the coverage that the edit will rely on.", "▶", "SHOOT DAY", ["Key shots captured", "Coverage reviewed", "Details collected"]],
      ["HAND OVER", "Pass it cleanly to the edit.", "Footage is backed up and organised, with notes for the post-production team.", "⇄", "HANDOVER", ["Footage backed up", "Files organised", "Notes shared"]],
    ],
  },
  lab: {
    name: "Shoot Lab",
    brief: "Shoot",
    preview: "SHOOT",
    heading: "YOUR STORY.\nYOUR SHOOT.",
    highlight: "YOUR PRODUCTION PLAN.",
    description: "Pick your goal, format and rough output to shape a sample plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What should this video do?",
      options: [
        ["Build the brand", "🎬", "Your brand film plan", "BRAND"],
        ["Show the product", "📦", "Your product video plan", "PRODUCT"],
        ["Support a campaign", "📣", "Your campaign shoot plan", "CAMPAIGN"],
      ],
    },
    scope: {
      name: "THE FORMAT",
      question: "What kind of shoot do you have in mind?",
      kpi: "Format",
      options: [
        ["Brand film", "✦", "Brand film", "Plan a story-led film around what makes the brand different"],
        ["Product video", "▣", "Product video", "Plan detail shots and demonstrations that show the product clearly"],
        ["Interviews", "◎", "Interviews", "Plan questions, framing and supporting shots around real voices"],
        ["Help me decide", "?", "TBD", "Begin by reviewing your goal, audience and where the video will run"],
      ],
    },
    range: {
      name: "THE OUTPUT",
      question: "Roughly how many finished videos do you need from the shoot?",
      kpi: "Finished videos",
      min: 1,
      max: 50,
      step: 1,
      value: 5,
      caption: "Videos from this shoot",
      minLabel: "1",
      maxLabel: "50+",
      note: "A rough number is fine. Short versions and platform cuts can be counted too.",
      planText: "With about {value} finished videos in mind, we would plan the shoot so each one has the coverage it needs.",
    },
    stage: {
      question: "How far along are you?",
      options: [
        ["Just an idea", "start with the goal, the story and a simple creative approach"],
        ["Have a script", "turn it into a shot list, schedule and production plan"],
        ["Ready to shoot", "confirm logistics and move into shoot-day preparation"],
      ],
    },
    funnel: "BRIEF, PLAN, SHOOT, EDIT",
    planTitle: "Your production and direction plan",
    planText: "Start with what the video needs to achieve, then plan each shot around the final edit.",
  },
  difference: {
    heading: "NOT JUST A CAMERA CREW.\nA SHOOT PLANNED FOR THE CUT.",
    description: "We think about the final film from the first conversation, so the shoot serves the story rather than filling a day.",
    imageLabel: "PRODUCTION, WITH A PLAN ✳",
    points: [
      ["Edit-first thinking.", "Decisions on set are made with the final cut in mind."],
      ["Prepared days.", "Clear shot plans protect your time on set."],
      ["Purpose before polish.", "Everything starts from the audience and the action you want."],
      ["One team, one story.", "Production and post-production stay connected from start to finish."],
    ],
  },
  related: {
    heading: "GREAT FOOTAGE\nNEEDS A GREAT FINISH.",
    description: "Production connects to the edit, the sound and how the final film reaches people.",
    items: ["editing", "audio", "delivery", "content"],
  },
  insights: "DIRECTION, SHOT PLANNING, LIGHTING, STORYTELLING, PRODUCTION",
  faq: {
    heading: "VIDEO PRODUCTION,\nIN PLAIN LANGUAGE.",
    intro: "What businesses usually ask about production and direction.",
    items: [
      ["What happens before the shoot?", "We agree the goal and story, then prepare the script, shot list, schedule and logistics."],
      ["Do we need a script?", "It depends on the video. Some formats need a full script, while interviews and documentary styles may use questions and a story outline."],
      ["How long does a shoot take?", "It depends on the number of shots, locations and people involved. We estimate it once there's a clear plan."],
      ["Do you handle the edit as well?", "Yes. Our team also covers video editing, sound and motion, which keeps the whole project connected."],
      ["Can one shoot produce several videos?", "Often, yes, if it's planned that way from the start. It's far easier to capture the right coverage on the day than to stretch footage afterwards."],
      ["Where can you shoot?", "It depends on the project and location. Share what you have in mind and we'll confirm what's practical."],
    ],
  },
  final: {
    heading: "PLAN THE SHOOT\nAROUND THE FINAL CUT.",
    description: "Let's capture the footage your story will actually need.",
    cta: "Plan My Shoot",
  },
});
