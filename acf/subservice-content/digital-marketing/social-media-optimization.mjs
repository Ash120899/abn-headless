// Written content for /services/digital-marketing/social-media-optimization/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2257;

export const acf = subservice({
  service: "digital-marketing",
  crumb: "Social Media Optimization",
  rail: "SMO",
  meta: "Social media optimization by ABN Junction: profile audits, content scheduling, audience engagement, hashtag research, social listening and performance analysis.",
  hero: {
    eyebrow: "Social Media Optimization",
    before: "FROM",
    highlight: "SCATTERED",
    after: "TO CONSISTENT.",
    description:
      "Your profiles are often the first thing people check. We tidy them up, keep your brand consistent and make your content easier to discover across every platform.",
    cta: "Plan My SMO",
    tags: [["✳", "Brand Consistency"], ["⌕", "Discoverability"], ["◎", "Engagement"]],
    highlights: "Profile Audits, Content Scheduling, Hashtag Research, Social Listening",
  },
  marquee: [
    "PROFILE AUDITS, CONTENT SCHEDULING, HASHTAG RESEARCH, SOCIAL SEO, BRAND CONSISTENCY, ENGAGEMENT",
    "VISUAL CONTENT, SOCIAL LISTENING, COMMUNITY BUILDING, ANALYTICS, DISCOVERABILITY, POSTING RHYTHM",
  ],
  problems: {
    heading: "YOUR PROFILES EXIST.\nDO THEY WORK FOR YOU?",
    description: "Incomplete profiles and irregular posting quietly cost trust. Small, steady improvements can change how your brand comes across.",
    items: [
      ["INCONSISTENT BRAND", "⇄", "Every profile looks different.", "Mixed visuals, bios and messages make your brand harder to recognize."],
      ["HARD TO FIND", "⌕", "People can't discover you.", "Weak keywords, hashtags and profile details limit how far content travels."],
      ["IRREGULAR POSTING", "↘", "The feed goes quiet.", "Without a schedule, posting stops whenever the team gets busy."],
    ],
  },
  offers: {
    heading: "SIX IMPROVEMENTS.\nONE CONSISTENT BRAND.",
    description: "SMO is steady, practical work. Select a capability to see what it includes.",
    items: [
      ["☰", "Content Scheduling", "Keep posting consistent and on time.", "Planning and scheduling content across platforms so your presence stays active."],
      ["◎", "Audience Engagement", "Build connections through real conversation.", "Interactive posts, replies and discussions that build a loyal community."],
      ["✎", "Visual Content Creation", "Make your brand instantly recognizable.", "Graphics and videos designed for each platform and your brand style."],
      ["▥", "Performance Analysis", "Know what your audience responds to.", "Reviewing metrics and trends to refine content and improve reach."],
      ["#", "Hashtag Research", "Help the right people find your posts.", "Finding relevant hashtags that improve discoverability."],
      ["⌕", "Social Listening", "Stay aware of what people are saying.", "Monitoring conversations and mentions about your brand, industry and competitors."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM SCATTERED TO SHARP.",
    description: "Scroll through how we bring your social presence into line, one improvement at a time.",
    slides: [
      ["AUDIT", "Check every profile.", "We review each platform for gaps in branding, details, content and activity.", "◎", "PROFILE AUDIT", ["Bios and links checked", "Visuals compared", "Activity reviewed"]],
      ["ALIGN", "Bring the brand together.", "Names, visuals, bios and messaging are made consistent everywhere.", "⇄", "BRAND CONSISTENCY", ["Visuals aligned", "Bios rewritten", "Voice agreed"]],
      ["DISCOVER", "Make content easier to find.", "Keywords and hashtags help your content reach beyond your existing followers.", "⌕", "SOCIAL SEO", ["Keywords added", "Hashtags researched", "Profile details filled"]],
      ["SCHEDULE", "Set a rhythm you can keep.", "A realistic calendar keeps your profiles active, even in busy weeks.", "☰", "CONTENT CALENDAR", ["Posting rhythm agreed", "Content scheduled", "Formats varied"]],
      ["ENGAGE", "Join the conversation.", "Replies, discussions and user content make your brand feel more human.", "✦", "ENGAGEMENT", ["Comments answered", "Discussions started", "Mentions tracked"]],
      ["REFINE", "Measure and adjust.", "Regular reporting shows what is working and where to focus next.", "⟳", "ANALYTICS", ["Performance reported", "Top content identified", "Next steps agreed"]],
    ],
  },
  lab: {
    name: "SMO Lab",
    brief: "SMO",
    preview: "SMO",
    heading: "YOUR PROFILES.\nYOUR BRAND.",
    highlight: "YOUR SMO PLAN.",
    description: "Tell us where you stand to shape a sample SMO plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What should improve first?",
      options: [
        ["Brand consistency", "✨", "Your brand consistency plan", "RECOGNITION"],
        ["Discoverability", "🔍", "Your discoverability plan", "REACH"],
        ["Engagement", "💬", "Your engagement plan", "COMMUNITY"],
      ],
    },
    scope: {
      name: "THE FOCUS",
      question: "Which platforms matter most?",
      kpi: "Platforms",
      options: [
        ["Instagram & Facebook", "◎", "Meta", "Start with profile clean-up and visual consistency on Instagram and Facebook"],
        ["LinkedIn", "▣", "LinkedIn", "Start with your company page and a professional content rhythm"],
        ["YouTube", "▶", "YouTube", "Start with your channel, titles and descriptions"],
        ["All of them", "✦", "All", "Start with one audit across every platform and fix the biggest gaps first"],
      ],
    },
    range: {
      name: "THE RHYTHM",
      question: "How many posts a month feels realistic?",
      kpi: "Posts a month",
      min: 4,
      max: 60,
      step: 2,
      value: 12,
      caption: "Posts each month",
      minLabel: "4",
      maxLabel: "60+",
      note: "A rough number is fine. A rhythm you can keep beats an ambitious one you can't.",
      planText: "A rhythm of {value} posts a month gives us a starting point for your calendar.",
    },
    stage: {
      question: "Where are your profiles today?",
      options: [
        ["Just set up", "complete every profile before scheduling content"],
        ["Active but messy", "audit and align what you already have"],
        ["Strong, want more", "focus on discoverability and engagement"],
      ],
    },
    funnel: "PROFILE, DISCOVERY, ENGAGEMENT, TRUST",
    planTitle: "Your SMO plan",
    planText: "Audit your profiles, align the brand, then keep a steady rhythm of useful content.",
  },
  difference: {
    heading: "NOT MORE NOISE.\nA CLEARER BRAND.",
    description: "SMO works through consistency. We focus on practical improvements your audience will notice, then keep them up.",
    imageLabel: "SMO, WITH A PLAN ✳",
    points: [
      ["Audit before acting.", "We start from what your profiles actually show today."],
      ["Keep every platform aligned.", "Your brand should be recognizable wherever people find it."],
      ["Connect social to your website.", "We guide social integration so interest can turn into visits."],
      ["Let data guide content.", "Regular analytics help us decide what to make next."],
    ],
  },
  related: {
    heading: "GOOD PROFILES\nNEED GOOD CAMPAIGNS.",
    description: "A sharp social presence supports everything else your marketing does.",
    items: ["smm", "seo", "graphic", "content"],
  },
  insights: "PROFILES, HASHTAGS, CONSISTENCY, REACH, CONTENT",
  faq: {
    heading: "SMO,\nEXPLAINED SIMPLY.",
    intro: "What businesses usually ask about social media optimization.",
    items: [
      ["What is social media optimization?", "It is the work of improving your profiles, content and posting habits so your brand is more consistent and easier to find on social platforms."],
      ["How is SMO different from SMM?", "SMO improves your presence and discoverability. Social media marketing adds campaigns, wider content work and paid activity."],
      ["Does SMO include paid ads?", "No. SMO focuses on organic improvements. Paid campaigns sit under social media marketing, and the two work well together."],
      ["How often should we post?", "As often as you can keep up with useful content. We help you find a realistic rhythm rather than chasing a fixed number."],
      ["Does SMO help SEO?", "Indirectly, it can. Consistent profiles and shared content can support discovery, and it is useful alongside an SEO programme."],
      ["What do you need from us?", "Access to your profiles, your brand guidelines if you have them, and a short conversation about your goals."],
    ],
  },
  final: {
    heading: "PEOPLE CHECK YOUR PROFILES.\nMAKE THEM COUNT.",
    description: "Let's give your brand a presence that is clear and consistent.",
    cta: "Plan My SMO",
  },
});
