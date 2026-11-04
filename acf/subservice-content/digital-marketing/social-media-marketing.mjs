// Written content for /services/digital-marketing/social-media-marketing/.
import { subservice, adBudget } from "../_shared.mjs";

export const PAGE_ID = 2253;

export const acf = subservice({
  service: "digital-marketing",
  crumb: "Social Media Marketing",
  rail: "SOCIAL MEDIA",
  meta: "Social media marketing by ABN Junction: content creation, community management, influencer partnerships, paid social, analytics and social listening.",
  hero: {
    eyebrow: "Social Media Marketing",
    before: "FROM",
    highlight: "POSTING",
    after: "TO REAL RESULTS.",
    description:
      "A busy feed is not the same as a growing business. We connect content, community, paid social and analytics so your social media earns attention and moves people to act.",
    cta: "Plan My Social Strategy",
    tags: [["✳", "Content Creation"], ["↗", "Paid Social"], ["◎", "Community"]],
    highlights: "Content Creation, Community Management, Paid Social, Social Analytics",
  },
  marquee: [
    "CONTENT CREATION, COMMUNITY MANAGEMENT, PAID SOCIAL, INFLUENCER PARTNERSHIPS, ANALYTICS, SOCIAL LISTENING",
    "BRAND VOICE, AUDIENCE TARGETING, REELS, CAMPAIGNS, ENGAGEMENT, PLATFORM STRATEGY",
  ],
  problems: {
    heading: "YOU'RE POSTING.\nIS ANYONE LISTENING?",
    description: "Consistent posting alone rarely builds a brand. Social works when content, audience and goals are planned together.",
    items: [
      ["NO STRATEGY", "⇄", "Posting without a plan.", "Content goes out because the calendar says so, not because it supports a goal."],
      ["LOW ENGAGEMENT", "↘", "The feed stays quiet.", "Generic content gets scrolled past, and questions from followers go unanswered."],
      ["UNCLEAR VALUE", "◎", "Likes, but then what?", "It is hard to tell which activity is bringing traffic, leads or sales."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE SOCIAL PRESENCE.",
    description: "We plan social media as a connected system. Select a capability to see what the work includes.",
    items: [
      ["✎", "Content Creation", "Make graphics, videos and posts worth stopping for.", "Content planning, visual design, short-form video and copy in your brand's voice."],
      ["◎", "Community Management", "Build real relationships with your followers.", "Engaging with followers, moderating discussions and answering questions."],
      ["✦", "Influencer Partnerships", "Borrow trust from voices your audience follows.", "Finding creators who match your brand values and coordinating collaborations."],
      ["↗", "Paid Social Advertising", "Reach precise audiences with campaigns built to convert.", "Targeted campaigns for traffic, leads and goals, with audience segmentation."],
      ["▥", "Social Media Analytics", "See what is working and why.", "Tracking performance, spotting trends and using insights to adjust the strategy."],
      ["⌕", "Social Listening", "Hear what people say about you and your market.", "Monitoring brand mentions, industry trends and competitor activity."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM FEED TO FOLLOWING.",
    description: "Scroll through how a social programme comes together, from first plan to ongoing growth.",
    slides: [
      ["LISTEN", "Understand the conversation.", "We look at your audience, your competitors and what people already say about your brand.", "⌕", "SOCIAL LISTENING", ["Audience reviewed", "Competitors compared", "Brand mentions checked"]],
      ["PLAN", "Choose where to show up.", "Not every platform suits every business. We agree goals, platforms and a clear brand voice.", "◎", "PLATFORM PLAN", ["Goals agreed", "Platforms selected", "Voice defined"]],
      ["CREATE", "Make content worth stopping for.", "Graphics, videos and posts are built around what your audience cares about.", "✎", "CONTENT CALENDAR", ["Formats planned", "Creative produced", "Approvals scheduled"]],
      ["ENGAGE", "Turn followers into a community.", "We reply, moderate and start conversations so your brand feels present.", "✦", "COMMUNITY", ["Comments answered", "Messages handled", "Conversations started"]],
      ["AMPLIFY", "Extend reach with paid social.", "Targeted campaigns and partnerships put your best work in front of more of the right people.", "↗", "PAID SOCIAL", ["Audiences segmented", "Creative tested", "Partners briefed"]],
      ["IMPROVE", "Learn, refine, repeat.", "We review the numbers each cycle, keep what works and change what doesn't.", "⟳", "ANALYTICS", ["Performance reported", "Trends reviewed", "Next plan refined"]],
    ],
  },
  lab: {
    name: "Social Lab",
    brief: "Social",
    preview: "SOCIAL",
    heading: "YOUR BRAND.\nYOUR AUDIENCE.",
    highlight: "YOUR SOCIAL PLAN.",
    description: "Pick your goals and platforms to shape a sample social plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What should social media do for your business?",
      options: [
        ["Generate leads", "🎯", "Your lead generation social plan", "LEAD"],
        ["Build awareness", "📣", "Your brand awareness social plan", "RECALL"],
        ["Grow a community", "🤝", "Your community growth plan", "COMMUNITY"],
      ],
    },
    scope: {
      name: "THE PLATFORMS",
      question: "Where is your audience most active?",
      kpi: "Platforms",
      options: [
        ["Instagram & Facebook", "◎", "Meta", "Lead with visual content and short video on Instagram and Facebook"],
        ["LinkedIn", "▣", "LinkedIn", "Lead with expert content and company voices on LinkedIn"],
        ["YouTube", "▶", "YouTube", "Lead with useful video that keeps working long after it is posted"],
        ["Help me decide", "?", "TBD", "Begin by finding where your audience actually spends time"],
      ],
    },
    range: adBudget("What monthly budget are you considering for paid social?"),
    stage: {
      question: "Where is your social media today?",
      options: [
        ["Just starting", "set up profiles, voice and a realistic content rhythm first"],
        ["Posting, little traction", "audit current content and refocus on what your audience responds to"],
        ["Ready to scale", "double down on proven content and add paid amplification"],
      ],
    },
    funnel: "REACH, ENGAGEMENT, CLICK, LEAD",
    planTitle: "Your social media plan",
    planText: "Choose the right platforms, build a consistent content rhythm, then amplify what performs.",
  },
  difference: {
    heading: "NOT MORE POSTS.\nA BETTER PRESENCE.",
    description: "We treat social media as part of your business, not a separate activity. Content, community and ads all point at the same goals.",
    imageLabel: "SOCIAL, WITH A PLAN ✳",
    points: [
      ["Pick platforms on purpose.", "We recommend the platforms and formats that fit your audience."],
      ["Keep one clear voice.", "Your content should sound and look like your brand everywhere."],
      ["Stay in the conversation.", "Community management and listening keep your brand responsive."],
      ["Follow the insights.", "Regular analytics shape what we make next."],
    ],
  },
  related: {
    heading: "SOCIAL DOESN'T WORK\nIN ISOLATION.",
    description: "Social media performs better with strong creative, video and paid campaigns behind it.",
    items: ["smo", "performance", "editing", "graphic"],
  },
  insights: "REELS, COMMUNITY, REACH, CONTENT, ENGAGEMENT",
  faq: {
    heading: "SOCIAL MEDIA,\nWITHOUT THE NOISE.",
    intro: "What businesses usually ask before investing in social media marketing.",
    items: [
      ["Which social platforms should my business be on?", "It depends on your audience and goals. We help you choose rather than recommending every platform by default."],
      ["Do you create the content as well?", "Yes. Content can include graphics, videos, posts and captions, depending on the agreed scope."],
      ["What is the difference between SMM and SMO?", "Social media marketing covers campaigns, content and paid activity. Social media optimization focuses on improving your profiles, visibility and consistency."],
      ["Do I need to run paid ads?", "Not always, but paid social can extend reach and reach precise audiences. We recommend it where it suits your goals."],
      ["Do you work with influencers?", "Yes. We can identify creators who match your brand values and help manage the collaboration."],
      ["How do you measure success?", "We agree goals first, then track the metrics connected to them, such as engagement, traffic, leads and conversions."],
    ],
  },
  final: {
    heading: "YOUR AUDIENCE IS SCROLLING.\nGIVE THEM A REASON TO STOP.",
    description: "Let's build a social presence that supports your business.",
    cta: "Plan My Social Strategy",
  },
});
