// Written content for /services/digital-marketing/email-whatsapp-marketing/.
import { subservice } from "../_shared.mjs";

export const PAGE_ID = 2261;

export const acf = subservice({
  service: "digital-marketing",
  crumb: "Email & WhatsApp Marketing",
  rail: "EMAIL & WHATSAPP",
  meta: "Email and WhatsApp marketing by ABN Junction: campaign design, audience segmentation, automation, A/B testing, analytics and compliance management.",
  hero: {
    eyebrow: "Email & WhatsApp Marketing",
    before: "FROM",
    highlight: "BROADCAST",
    after: "TO CONVERSATION.",
    description:
      "The people on your list asked to hear from you. We plan segmented, automated email and WhatsApp campaigns that reach them at the right moment with something worth opening.",
    cta: "Plan My Campaign",
    tags: [["✳", "Automation"], ["◎", "Segmentation"], ["↗", "A/B Testing"]],
    highlights: "Campaign Design, Audience Segmentation, Automation, Compliance",
  },
  marquee: [
    "EMAIL CAMPAIGNS, WHATSAPP MARKETING, AUTOMATION, SEGMENTATION, A/B TESTING, PERSONALIZATION",
    "OPEN RATES, CLICK-THROUGH, WELCOME FLOWS, BROADCASTS, MOBILE-FIRST, OPT-IN COMPLIANCE",
  ],
  problems: {
    heading: "MESSAGES ARE GOING OUT.\nIS ANYONE RESPONDING?",
    description: "Sending the same message to everyone wears out your list. Good campaigns respect the audience and earn the next open.",
    items: [
      ["ONE MESSAGE FOR ALL", "⇄", "Everyone gets the same thing.", "Without segmentation, messages feel irrelevant and people tune out."],
      ["MANUAL FOLLOW-UP", "↘", "Leads go cold.", "Without automation, timely replies depend on someone remembering."],
      ["CONSENT RISK", "⚠", "Rules are easy to miss.", "Poor opt-in handling can damage trust and your ability to send."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nTWO CHANNELS. ONE VOICE.",
    description: "We plan email and WhatsApp together. Select a capability to see what the work includes.",
    items: [
      ["✎", "Campaign Design", "Create messages that fit your brand.", "Email and WhatsApp message design, copy and mobile-friendly layouts."],
      ["◎", "Audience Segmentation", "Send the right message to the right people.", "Grouping contacts by demographics, behavior and interests."],
      ["⟳", "Automation Setup", "Reply on time, every time.", "Automated workflows from welcome messages to follow-ups."],
      ["⇄", "A/B Testing", "Let your audience show you what works.", "Testing subject lines, content and send times."],
      ["▥", "Analytics & Reporting", "See what happens after you hit send.", "Open rates, click-through rates and conversions, with clear insights."],
      ["✓", "Compliance Management", "Protect your brand and your list.", "Opt-in and opt-out handling, list hygiene and good sending practice."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM LIST TO LOYALTY.",
    description: "Scroll through how an email and WhatsApp programme comes together.",
    slides: [
      ["LIST", "Start with permission.", "We review your contacts and how they were collected, so you're building on consent.", "✓", "LIST HEALTH", ["Opt-ins reviewed", "Duplicates cleaned", "Opt-out path added"]],
      ["SEGMENT", "Group people sensibly.", "Contacts are grouped by interests and behavior, so each message feels relevant.", "◎", "SEGMENTS", ["New contacts", "Active customers", "Inactive subscribers"]],
      ["DESIGN", "Make it worth opening.", "Clear copy and mobile-friendly design make every message easy to act on.", "✎", "MESSAGE DESIGN", ["Mobile layout checked", "One clear action", "On-brand copy"]],
      ["AUTOMATE", "Reach people at the right time.", "Workflows handle welcomes, follow-ups and reminders automatically.", "⟳", "WORKFLOWS", ["Welcome flow live", "Follow-ups triggered", "Reminders scheduled"]],
      ["TEST", "Try, compare, keep the best.", "A/B tests on subject lines, content and timing show what your audience prefers.", "⇄", "A/B TESTS", ["Subject lines tested", "Timing compared", "Winners rolled out"]],
      ["IMPROVE", "Report and refine.", "Regular reports connect opens and clicks to real conversions.", "▥", "REPORTING", ["Opens and clicks tracked", "Conversions reviewed", "Next tests planned"]],
    ],
  },
  lab: {
    name: "Messaging Lab",
    brief: "Campaign",
    preview: "MESSAGING",
    heading: "YOUR LIST.\nYOUR MESSAGE.",
    highlight: "YOUR CAMPAIGN PLAN.",
    description: "Pick your goal, channel and list size to shape a sample campaign, then send it to us for a personalized discussion.",
    goal: {
      question: "What should your messages achieve?",
      options: [
        ["Nurture leads", "🌱", "Your lead nurturing plan", "LEAD"],
        ["Drive sales", "🛒", "Your sales campaign plan", "SALE"],
        ["Retain customers", "🤝", "Your customer retention plan", "REPEAT"],
      ],
    },
    scope: {
      name: "THE CHANNEL",
      question: "Which channel would you like to use?",
      kpi: "Channel",
      options: [
        ["Email", "✉", "Email", "Lead with segmented email campaigns and automated flows"],
        ["WhatsApp", "◎", "WhatsApp", "Lead with opt-in WhatsApp broadcasts and timely follow-ups"],
        ["Both", "✦", "Both", "Use email for detail and WhatsApp for timely, short messages"],
        ["Help me decide", "?", "TBD", "Begin by reviewing your audience and how they prefer to hear from you"],
      ],
    },
    range: {
      name: "THE AUDIENCE",
      question: "Roughly how many contacts do you have?",
      kpi: "Contacts",
      min: 500,
      max: 100000,
      step: 500,
      value: 5000,
      caption: "Opted-in contacts",
      minLabel: "500",
      maxLabel: "1,00,000+",
      note: "A rough number is fine. Only contacts who agreed to hear from you should be included.",
      planText: "With about {value} contacts, we would begin by checking consent and segmenting the list.",
    },
    stage: {
      question: "Where are you with messaging today?",
      options: [
        ["Just starting", "set up your tools, consent and a welcome flow first"],
        ["Sending broadcasts", "add segmentation and test what gets opened"],
        ["Ready to automate", "build triggered journeys around customer behavior"],
      ],
    },
    funnel: "SEND, OPEN, CLICK, LEAD",
    planTitle: "Your messaging campaign plan",
    planText: "Start with a clean opted-in list, a clear segment and one automated flow before scaling up.",
  },
  difference: {
    heading: "NOT MORE MESSAGES.\nMORE RELEVANT ONES.",
    description: "Inboxes are personal spaces. We plan campaigns that respect that, because trust is what makes people keep opening.",
    imageLabel: "MESSAGING, WITH A PLAN ✳",
    points: [
      ["Consent comes first.", "Opt-in and opt-out handling are part of the plan from day one."],
      ["Personal, not just personalized.", "Segmentation makes messages feel relevant, beyond adding a first name."],
      ["Designed for phones.", "Most messages get read on mobile, so we design for that."],
      ["Decisions from data.", "A/B tests and reports show what to send next."],
    ],
  },
  related: {
    heading: "MESSAGES WORK BETTER\nWITH A STRONG FUNNEL.",
    description: "Email and WhatsApp carry on the work your ads, social media and website begin.",
    items: ["performance", "smm", "content", "cms"],
  },
  insights: "AUTOMATION, OPEN RATES, SEGMENTS, RETENTION, TESTING",
  faq: {
    heading: "EMAIL AND WHATSAPP,\nDONE PROPERLY.",
    intro: "What businesses usually ask about email and WhatsApp marketing.",
    items: [
      ["Should I use email or WhatsApp?", "They work well together. Email suits longer content, while WhatsApp suits short, timely messages. Your audience and goals decide the mix."],
      ["Can I message contacts I bought or scraped?", "We don't recommend it. Messaging people without consent harms trust and can break platform rules, so we focus on opted-in contacts."],
      ["What can be automated?", "Common flows include welcome messages, follow-ups, reminders and re-engagement messages, depending on your tools and customer journey."],
      ["What is A/B testing?", "It means sending variations to parts of your audience, such as different subject lines, and using the better performer more widely."],
      ["Which metrics matter most?", "Open and click-through rates are useful signals, but conversions are usually the better measure of whether a campaign worked."],
      ["Do you handle compliance?", "We build in opt-in and opt-out handling and good sending practice. You should still confirm legal requirements for your business and region."],
    ],
  },
  final: {
    heading: "THEY ASKED TO HEAR FROM YOU.\nSEND SOMETHING WORTH OPENING.",
    description: "Let's plan email and WhatsApp campaigns your audience will welcome.",
    cta: "Plan My Campaign",
  },
});
