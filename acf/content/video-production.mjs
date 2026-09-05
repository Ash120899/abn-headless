// Written content for /services/video-production/ (WP page 4698).
//
// Structure mirrors acf/content/digital-marketing.mjs exactly — same section
// order, same row counts, same heading shapes. Only the palette, the copy and
// the case-study category differ.
//
// Scene titles use the sub-service names from the site navigation
// (src/data/navigation.js): Content Marketing, Video Editing, VFX & Animation,
// Audio Editing & SFX. Scenes 05 and 06 cover adjacent production work with no
// sub-page of its own, so they link back to this page — the same pattern
// Digital Marketing uses for its analytics and advanced-media scenes.
//
// Edit the copy here, then push it up with:
//   node acf/seed.mjs video-production --dry-run
//   node acf/seed.mjs video-production
//
// Image fields are intentionally absent — the page falls back to the Digital
// Marketing artwork in /public until real art is uploaded to WP.

const SITE = "https://abnjunction.com";

export const PAGE_ID = 4698;

export const acf = {
  meta_description:
    "Content strategy, video editing, VFX, animation and sound working together as one storytelling system — not disconnected clips.",

  // Derived from the same rule as the other services: base unchanged, light
  // tint ~10-12% toward white, darker shade for contrast on cream panels.
  color_primary: "#a66bff",
  color_primary_light: "#c093ff",
  color_accent: "#7b3fd1",

  hero_eyebrow: "Video Production · ABN Junction",
  hero_heading_before: "WE TURN",
  hero_heading_highlight: "STORIES",
  hero_heading_after: "INTO",
  hero_heading_kinetic: "MOMENTUM.",
  hero_description:
    "Content strategy, editing, VFX, animation and sound working together as one storytelling system — not a folder of disconnected clips.",
  hero_cta_primary_label: "Build My Video Strategy →",
  hero_cta_primary_url: `${SITE}/contact-us/`,
  hero_cta_secondary_label: "See Video Work",
  hero_cta_secondary_url: "/case-studies",
  hero_stats: [
    { prefix: "", value: "4", suffix: "", label: "Production disciplines" },
    { prefix: "", value: "1", suffix: "", label: "Connected story system" },
    { prefix: "", value: "360", suffix: "°", label: "Concept to final cut" },
  ],
  hero_tools: [
    { glyph: "Pr", label: "Premiere Pro" },
    { glyph: "Ae", label: "After Effects" },
    { glyph: "◈", label: "DaVinci" },
    { glyph: "▶", label: "YouTube" },
    { glyph: "∞", label: "Meta / Reels" },
    { glyph: "♪", label: "Audition" },
  ],

  journey_eyebrow: "One story · multiple production disciplines",
  journey_heading_before: "Scroll through the story",
  journey_heading_switch: "engine, system",
  journey_description:
    "Each discipline solves a different storytelling problem. The advantage comes from how narrative, edit, motion and sound connect into one piece an audience actually finishes watching.",
  journey_scenes: [
    {
      num: "01 · NARRATIVE STRATEGY",
      title: "Content Marketing",
      description:
        "Decide what the video is actually for before anyone opens a camera. Audience, platform, message and the action you want come first, so production serves a purpose instead of filling a content calendar.",
      chips: "Content Strategy, Scripting, Platform Planning, Distribution",
      link_label: "Explore Content Marketing →",
      link_url: `${SITE}/services/video-production/content-marketing/`,
    },
    {
      num: "02 · THE EDIT",
      title: "Video Editing",
      description:
        "Turn raw footage into something with rhythm. Pacing, structure, cuts and colour decide whether a viewer stays past the first three seconds or scrolls straight past.",
      chips: "Story Edit, Pacing, Colour Grade, Platform Cutdowns",
      link_label: "Explore Video Editing →",
      link_url: `${SITE}/services/video-production/video-editing/`,
    },
    {
      num: "03 · MOTION & EFFECTS",
      title: "VFX & Animation",
      description:
        "Show what a camera cannot. Motion graphics, animated explainers and visual effects make abstract ideas concrete and give the brand a look that is hard to copy.",
      chips: "Motion Graphics, 2D / 3D Animation, VFX, Explainers",
      link_label: "Explore VFX & Animation →",
      link_url: `${SITE}/services/video-production/vfx-animation/`,
    },
    {
      num: "04 · SOUND DESIGN",
      title: "Audio Editing & SFX",
      description:
        "Sound is half the picture. Clean dialogue, mixed music, sound effects and consistent loudness are the difference between something that feels professional and something that feels homemade.",
      chips: "Dialogue Clean-up, Mixing, Sound Effects, Music",
      link_label: "Explore Audio & SFX →",
      link_url: `${SITE}/services/video-production/audio-editing-sfx/`,
    },
    {
      num: "05 · CAPTURE",
      title: "Production & Direction",
      description:
        "Get the footage the edit will need. Shot planning, direction, lighting and on-set decisions are made with the final cut in mind rather than fixed afterwards.",
      chips: "Shot Planning, Direction, Lighting, On-set Capture",
      link_label: "Explore Production →",
      link_url: `${SITE}/services/video-production/`,
    },
    {
      num: "06 · DISTRIBUTION",
      title: "Campaign & Platform Delivery",
      description:
        "One shoot should not become one video. Aspect ratios, cutdowns, captions and platform-native versions let a single production work across ads, social, site and sales.",
      chips: "Cutdowns, Aspect Ratios, Captions, Ad Variants",
      link_label: "Explore Campaign Delivery →",
      link_url: `${SITE}/services/video-production/`,
    },
  ],

  marquee_row_one:
    "PREMIERE PRO ✦ AFTER EFFECTS ✦ DAVINCI ✦ VIDEO EDITING ✦ VFX ✦ ANIMATION ✦ MOTION GRAPHICS ✦ SOUND DESIGN ✦ COLOUR ✦ STORYTELLING ✦",
  marquee_row_two:
    "SCRIPTING ✦ STORYBOARDS ✦ REELS ✦ YOUTUBE ✦ EXPLAINERS ✦ CUTDOWNS ✦ CAPTIONS ✦ MIXING ✦ SFX ✦ CAMPAIGN VIDEO ✦",

  system_eyebrow: "Connected storytelling",
  system_heading_before: "Video is not one deliverable. It’s",
  system_heading_kinetic: "one story system.",
  system_description:
    "Strategy, script, edit, motion and sound should not be handled by five people who never watch the same cut. We connect them around one narrative and one audience.",
  system_nodes: [
    { num: "01 · DEFINE", title: "Find the story", description: "Audience, message, platform and the action you want decide what the video needs to be." },
    { num: "02 · PLAN", title: "Shape the narrative", description: "Script, structure and storyboards give the idea a spine before anything is shot." },
    { num: "03 · CAPTURE", title: "Get the material", description: "Direction, framing, lighting and sound are captured with the final edit already in mind." },
    { num: "04 · CRAFT", title: "Build the cut", description: "Edit, motion, colour and audio turn raw material into something with pace and personality." },
    { num: "05 · DELIVER", title: "Fit every platform", description: "Cutdowns, ratios and captions let one production work across ads, social and the website." },
  ],

  cinema_eyebrow: "FROM IDEA TO AUDIENCE · ONE CONNECTED STORY",
  cinema_words: "IDEA, SCRIPT, MOTION, AUDIENCE",
  cinema_description:
    "Scroll through the journey. Strategy finds the story, the script gives it structure, the edit gives it rhythm and sound makes the whole thing land.",
  cinema_scroll_hint: "SCROLL · WATCH THE STORY COME TOGETHER",
  cinema_depth_cards: [
    { label: "BRIEF", title: "audience + message", note: "who is this for?" },
    { label: "SCRIPT", title: "structure + hook", note: "first 3 seconds earn the rest" },
    { label: "EDIT", title: "pace + motion", note: "rhythm ↑ drop-off ↓" },
    { label: "DELIVERY", title: "cut for every platform", note: "reels · ads · site · sales" },
  ],
  cinema_handoff: [
    { role_fx: "SCRIPT · STRUCTURE · HOOK", caption: "STRATEGY · NARRATIVE · PLANNING" },
    { role_fx: "CUT · COLOUR · MOTION", caption: "EDIT · VFX · ANIMATION" },
    { role_fx: "MIX · SFX · MASTER", caption: "SOUND · DELIVERY · DISTRIBUTION" },
  ],

  proof_eyebrow: "Selected production signals",
  proof_heading_before: "Video that",
  proof_heading_kinetic: "holds attention.",
  proof_items: [
    { prefix: "", value: "4", suffix: "", label: "Production disciplines" },
    { prefix: "", value: "1", suffix: "", label: "Connected story system" },
    { prefix: "", value: "100", suffix: "%", label: "Platform-native delivery" },
    { prefix: "", value: "360", suffix: "°", label: "Concept to final cut" },
  ],

  // No case_study_category term exists for video production yet. Left unset,
  // so the page falls back to the most recent studies from any category.
  // cases_category: 0,
  cases_eyebrow: "Video Production case studies",
  cases_heading_before: "See the stories behind the",
  cases_heading_switch: "footage, films",
  cases_description:
    "Video case studies should show the brief, the narrative decisions and how the finished piece performed — not just an embedded showreel.",

  method_eyebrow: "How ABN produces",
  method_heading_before: "Define. Plan. Capture. Craft.",
  method_heading_switch: "Deliver, Distribute",
  method_steps: [
    { num: "01 · DEFINE", title: "Start with the audience.", description: "Who is watching, where they see it and what they should do next come before any creative treatment." },
    { num: "02 · PLAN", title: "Write it down first.", description: "Script, structure, storyboards and shot lists prevent expensive decisions being made on the day." },
    { num: "03 · CAPTURE", title: "Shoot for the edit.", description: "Framing, coverage, lighting and clean audio are captured knowing exactly how the cut will use them." },
    { num: "04 · CRAFT", title: "Build the rhythm.", description: "Edit, motion, grade and sound design turn the material into something people finish watching." },
    { num: "05 · DELIVER", title: "Cut it for everywhere.", description: "Ratios, lengths, captions and platform variants get the most out of a single production." },
  ],

  cb_eyebrow: "A little ABN personality",
  cb_heading_before: "Great video is not about owning a better",
  cb_heading_switch: "camera, lens",
  cb_description:
    "It is about knowing what the story needs to say, cutting everything that gets in the way and making the first three seconds worth the next thirty.",
  cb_cta_label: "Talk Through Your Video Idea →",
  cb_cta_url: `${SITE}/contact-us/`,
  cb_badges: [{ text: "47 raw clips 😵" }, { text: "Story edit →" }, { text: "One film 😎" }],

  insights_eyebrow: "From the people doing the production work",
  insights_heading_before: "What we’re learning from the",
  insights_heading_switch: "edits, campaigns",

  faq_eyebrow: "Video Production FAQs",
  faq_heading: "Questions worth answering before you shoot",
  faq_intro:
    "These are the practical questions businesses usually ask before commissioning a video, planning a campaign shoot or building an ongoing content series.",
  faq_items: [
    { question: "What is included in ABN Junction’s video production services?", answer: "The first-level service covers content strategy, video editing, VFX and animation, and audio editing, plus the production and delivery work around them. The exact mix depends on what the video needs to achieve." },
    { question: "Do we need a full shoot, or can you work with existing footage?", answer: "Both work. Existing footage, stock, screen recordings and motion graphics can carry a strong video, and a shoot is worth it when the story genuinely needs original material." },
    { question: "How long should a marketing video be?", answer: "It depends on the platform and the job. A paid social cut earns attention in seconds, while a case-study film or explainer can run longer because the viewer already chose to watch." },
    { question: "Can one shoot be used across multiple platforms?", answer: "Yes, and it should be. Planning ratios, lengths and captions up front means one production becomes ads, social cutdowns, website content and sales material." },
    { question: "Do you handle animation as well as filmed video?", answer: "Yes. Motion graphics, 2D and 3D animation and VFX can stand alone as explainers or be combined with filmed footage in the same piece." },
  ],

  final_eyebrow: "Ready to tell it properly?",
  final_heading_before: "STOP POSTING RANDOM CLIPS. START BUILDING A",
  final_heading_kinetic: "STORY SYSTEM.",
  final_description:
    "Tell us what you need people to understand. We’ll help shape the narrative, produce it properly and cut it for every place it needs to live.",
  final_cta_primary_label: "Book a Video Strategy Call →",
  final_cta_primary_url: `${SITE}/contact-us/`,
  final_cta_secondary_label: "See Video Work",
  final_cta_secondary_url: "/case-studies",
};
