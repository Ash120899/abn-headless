// Written content for /services/video-production/audio-editing-sfx/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2322;

export const acf = subservice({
  service: "video-production",
  crumb: "Audio Editing & SFX",
  rail: "AUDIO & SFX",
  meta: "Audio editing and SFX by ABN Junction: audio clean-up and restoration, sound design, dialogue editing, music scoring, Foley, mixing and mastering.",
  hero: {
    eyebrow: "Audio Editing & SFX",
    before: "PEOPLE",
    highlight: "FORGIVE",
    after: "BAD VIDEO. NOT BAD SOUND.",
    description:
      "Muddy dialogue and harsh levels make people click away, however good the picture. We clean, design, mix and master audio so your project sounds right on any device.",
    cta: "Plan My Audio",
    tags: [["♪", "Sound Design"], ["✓", "Audio Clean-up"], ["▥", "Mixing & Mastering"]],
    highlights: "Audio Clean-up, Sound Design, Dialogue Editing, Mixing & Mastering",
  },
  marquee: [
    "AUDIO CLEAN-UP, SOUND DESIGN, DIALOGUE EDITING, MUSIC SCORING, FOLEY, MIXING AND MASTERING",
    "CUSTOM SFX, NOISE REMOVAL, VOICE CLARITY, AUDIO RESTORATION, VIDEO SYNC, IMMERSIVE SOUND",
  ],
  problems: {
    heading: "IT LOOKS GOOD.\nHOW DOES IT SOUND?",
    description: "Audio is often treated as an afterthought, yet it shapes how professional your content feels within seconds.",
    items: [
      ["NOISY RECORDINGS", "⚠", "Background noise distracts.", "Hums, clicks and room echo make it harder to listen."],
      ["UNEVEN LEVELS", "⇄", "Viewers keep adjusting the volume.", "Voices, music and effects compete instead of working together."],
      ["FLAT SOUND", "↘", "Nothing feels real.", "Without sound design, scenes lack the depth and emotion they could have."],
    ],
  },
  offers: {
    heading: "SIX CRAFTS.\nONE CLEAR SOUND.",
    description: "We handle the details people feel more than notice. Select a craft to see what the work includes.",
    items: [
      ["✓", "Audio Cleanup & Restoration", "Remove what shouldn't be there.", "Reducing noise, clicks and distortion for a cleaner recording."],
      ["♪", "Sound Design & Creation", "Build a world people can hear.", "Custom sound effects and audio elements tailored to your project."],
      ["✎", "Dialogue Editing", "Make every word clear.", "Editing and syncing dialogue for clarity, consistency and flow."],
      ["▶", "Music Scoring & Integration", "Set the right mood.", "Original or selected music that supports your visual content."],
      ["◎", "Foley Artistry", "Add the small sounds that sell a scene.", "Recorded footsteps, cloth movement and ambient detail."],
      ["▥", "Mixing & Mastering", "Make it sound right everywhere.", "Balancing levels and frequencies for a polished final mix."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM RAW TRACK TO FINAL MIX.",
    description: "Scroll through how a project's sound gets cleaned, shaped and finished.",
    slides: [
      ["LISTEN", "Hear what needs work.", "We review your audio and video, noting problems and opportunities.", "◎", "AUDIO REVIEW", ["Tracks reviewed", "Issues noted", "Tone discussed"]],
      ["CLEAN", "Remove the distractions.", "Noise, clicks and distortion are reduced without hurting the voice.", "✓", "CLEAN-UP", ["Noise reduced", "Clicks removed", "Levels checked"]],
      ["EDIT", "Make dialogue clear.", "We tidy and sync speech, so the message comes through.", "✎", "DIALOGUE", ["Speech tightened", "Sync checked", "Gaps smoothed"]],
      ["DESIGN", "Add depth and detail.", "Sound effects, Foley and ambience help scenes feel real.", "♪", "SOUND DESIGN", ["Effects created", "Foley added", "Ambience layered"]],
      ["SCORE", "Set the emotion.", "Music supports the tone of the project, without getting in the way.", "▶", "MUSIC", ["Tone agreed", "Music placed", "Transitions smoothed"]],
      ["MASTER", "Finish for every device.", "A final mix and master prepares your audio for each platform.", "▥", "FINAL MIX", ["Levels balanced", "Master completed", "Formats delivered"]],
    ],
  },
  lab: {
    name: "Sound Lab",
    brief: "Audio",
    preview: "AUDIO",
    heading: "YOUR PROJECT.\nYOUR SOUND.",
    highlight: "YOUR AUDIO PLAN.",
    description: "Tell us about your project to shape a sample audio plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What do you need help with?",
      options: [
        ["Fix poor audio", "🔧", "Your audio clean-up plan", "CLEAR SOUND"],
        ["Add sound design", "🎧", "Your sound design plan", "IMMERSION"],
        ["Finish my mix", "🎚️", "Your mixing and mastering plan", "FINAL MIX"],
      ],
    },
    scope: {
      name: "THE PROJECT",
      question: "What kind of project is it?",
      kpi: "Project",
      options: [
        ["Video content", "▶", "Video", "Sync and balance audio for your video content"],
        ["Podcast", "◎", "Podcast", "Focus on voice clarity, editing and consistent levels"],
        ["Film or animation", "◇", "Film", "Build a full soundscape with effects, Foley and music"],
        ["Help me decide", "?", "TBD", "Begin by listening to what you have"],
      ],
    },
    range: {
      name: "THE LENGTH",
      question: "Roughly how many minutes of audio are involved?",
      kpi: "Minutes",
      min: 1,
      max: 180,
      step: 1,
      value: 10,
      caption: "Finished minutes",
      minLabel: "1 min",
      maxLabel: "3 hrs+",
      note: "A rough number is fine. Recording quality matters as much as length.",
      planText: "With about {value} minutes of audio, we would review a sample before finalizing the plan.",
    },
    stage: {
      question: "Where is your audio today?",
      options: [
        ["Not recorded yet", "plan the recording to avoid problems later"],
        ["Recorded, needs fixing", "assess the recording and clean it up first"],
        ["Edited, needs finishing", "move straight to sound design and the final mix"],
      ],
    },
    funnel: "RAW AUDIO, CLEAN-UP, MIX, MASTER",
    planTitle: "Your audio plan",
    planText: "Review your recordings, clean what needs fixing, then mix and master for your platforms.",
  },
  difference: {
    heading: "NOT JUST LOUDER.\nCLEARER AND RICHER.",
    description: "Good audio is often invisible. We use it to support your story and emotion, not to draw attention to itself.",
    imageLabel: "SOUND, WITH A PLAN ✳",
    points: [
      ["Clarity comes first.", "If people can't understand the words, nothing else matters."],
      ["Fits your tone.", "Sound effects and music match the project's style."],
      ["Checked across devices.", "We aim for a mix that translates from phones to speakers."],
      ["In sync with the picture.", "Audio and video are edited to work as one."],
    ],
  },
  related: {
    heading: "GOOD SOUND\nDESERVES GOOD PICTURES.",
    description: "Audio works hand in hand with video editing, animation and content.",
    items: ["editing", "vfx", "content", "video-production"],
  },
  insights: "SOUND, MIXING, DIALOGUE, MUSIC, FOLEY",
  faq: {
    heading: "AUDIO AND SFX,\nCOMMON QUESTIONS.",
    intro: "What businesses usually ask before sending us their audio.",
    items: [
      ["Can you fix a bad recording?", "We can often improve it a lot, including noise, clicks and levels. Results depend on the original recording, so we'll review a sample first."],
      ["What is Foley?", "It is the recording of everyday sounds, such as footsteps or clothing movement, to add realism to a scene."],
      ["What's the difference between mixing and mastering?", "Mixing balances the individual sounds together. Mastering is the final polish that prepares the finished audio for release."],
      ["Do you edit podcasts?", "Yes. We can clean up, edit and master podcast episodes for clear, consistent speech."],
      ["Can you compose original music?", "Music scoring can be part of the project. We'll discuss your needs and the most suitable option."],
      ["What audio files should I send?", "Send the highest-quality original files you have, ideally separate tracks if they are available."],
    ],
  },
  final: {
    heading: "MAKE YOUR NEXT PROJECT\nWORTH LISTENING TO.",
    description: "Let's give your content the sound it deserves.",
    cta: "Plan My Audio",
  },
});
