// Written content for /services/web-data-security/firewall-datasecuity/.
// The slug's typo is the real WordPress slug, so this filename has to match it.
import { subservice, SECURITY_DISCLAIMER } from "../_shared.mjs";

export const PAGE_ID = 2329;

export const acf = subservice({
  service: "web-data-security",
  crumb: "Data & Firewall Protection",
  rail: "DATA & FIREWALL",
  meta: "Data and firewall protection by ABN Junction: firewall optimization, encryption, access control, intrusion detection, data loss prevention and network segmentation.",
  hero: {
    eyebrow: "Data & Firewall Protection",
    before: "PROTECT",
    highlight: "WHAT MATTERS",
    after: "AT EVERY LAYER.",
    description:
      "Customer records, finances and business plans all live on your network. We strengthen firewalls, access and encryption so sensitive data stays better protected.",
    cta: "Plan My Protection",
    tags: [["⚙", "Firewall Optimization"], ["◎", "Access Control"], ["✓", "Data Loss Prevention"]],
    highlights: "Firewall Configuration, Data Encryption, Intrusion Detection, Network Segmentation",
  },
  marquee: [
    "FIREWALL CONFIGURATION, DATA ENCRYPTION, ACCESS CONTROL, INTRUSION DETECTION, DATA LOSS PREVENTION, SEGMENTATION",
    "CYBER RISK MANAGEMENT, GDPR SUPPORT, NETWORK SECURITY, MONITORING, SECURITY POLICIES, RISK ASSESSMENT",
  ],
  problems: {
    heading: "THE FIREWALL IS ON.\nIS YOUR DATA PROTECTED?",
    description: "Security tools only help when they are configured well. Old rules, open access and untracked data can leave real gaps.",
    items: [
      ["OLD FIREWALL RULES", "⚠", "Rules pile up over time.", "Outdated exceptions and broad permissions can weaken your defenses."],
      ["TOO MUCH ACCESS", "◎", "Everyone can see everything.", "Without clear access controls, a single account can expose too much."],
      ["UNPROTECTED DATA", "↘", "Sensitive data travels unseen.", "Without encryption and clear policies, data can be exposed or lost."],
    ],
  },
  offers: {
    heading: "SIX LAYERS.\nONE STRONGER DEFENSE.",
    description: "We focus on the controls that protect your data most. Select a layer to see what the work includes.",
    items: [
      ["⚙", "Firewall Configuration", "Make your firewall work harder.", "Fine-tuning rules and policies to manage traffic and block unauthorized access."],
      ["✦", "Data Encryption", "Protect data at rest and in transit.", "Deploying encryption for sensitive information across your systems."],
      ["◎", "Access Control Management", "Give people only the access they need.", "Granular policies, authentication and privilege management."],
      ["⌕", "Intrusion Detection Setup", "Spot suspicious activity sooner.", "Configuring detection tools with alerts and logging for faster response."],
      ["✓", "Data Loss Prevention", "Stop sensitive data from leaking.", "Policies and tools to identify, monitor and protect sensitive data."],
      ["⇄", "Network Segmentation Design", "Limit how far a breach can spread.", "Secure zones and virtual LANs that isolate critical assets."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM EXPOSED TO PROTECTED.",
    description: "Scroll through how we assess and strengthen your defenses, one layer at a time.",
    slides: [
      ["ASSESS", "See where you stand.", "We review your network, firewall setup and how sensitive data is handled.", "◎", "SECURITY ASSESSMENT", ["Network reviewed", "Firewall rules checked", "Risks identified"]],
      ["CLASSIFY", "Find what needs protecting.", "We identify your sensitive data, where it lives and who can access it.", "☰", "DATA MAPPING", ["Sensitive data located", "Data flows mapped", "Owners identified"]],
      ["HARDEN", "Tighten the perimeter.", "Firewall rules are cleaned up and aligned with what your business actually needs.", "⚙", "FIREWALL", ["Old rules removed", "Policies tightened", "Changes documented"]],
      ["RESTRICT", "Control access and data.", "Encryption, access policies and DLP measures protect sensitive information.", "✦", "DATA PROTECTION", ["Encryption applied", "Access reduced", "DLP policies set"]],
      ["SEGMENT", "Contain the damage.", "Network zones and monitoring help limit spread and detect suspicious behavior.", "⇄", "SEGMENTATION", ["Zones designed", "Critical assets isolated", "Detection configured"]],
      ["MAINTAIN", "Keep it effective.", "Reviews and documentation help your protection keep pace with your business.", "⟳", "ONGOING REVIEW", ["Findings documented", "Roadmap agreed", "Regular reviews set"]],
    ],
  },
  lab: {
    name: "Protection Lab",
    brief: "Protection",
    preview: "SECURITY",
    heading: "YOUR DATA.\nYOUR NETWORK.",
    highlight: "YOUR PROTECTION PLAN.",
    description: "Answer a few questions to shape a sample protection plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What do you most want to improve?",
      options: [
        ["Protect customer data", "🔒", "Your data protection plan", "PROTECTED"],
        ["Harden my network", "🛡️", "Your network hardening plan", "HARDENED"],
        ["Prepare for compliance", "📋", "Your compliance readiness plan", "READY"],
      ],
    },
    scope: {
      name: "THE PRIORITY",
      question: "Where should we start?",
      kpi: "First priority",
      options: [
        ["Firewall review", "⚙", "Firewall", "Start with a review of your firewall rules and policies"],
        ["Encryption & access", "✦", "Data", "Start with encryption and access to your sensitive data"],
        ["Detection & monitoring", "⌕", "Detection", "Start with intrusion detection and alerts"],
        ["Help me decide", "?", "TBD", "Begin with a short assessment of your environment"],
      ],
    },
    range: {
      name: "THE SIZE",
      question: "Roughly how many people use your network?",
      kpi: "Users",
      min: 5,
      max: 1000,
      step: 5,
      value: 50,
      caption: "Approximate users",
      minLabel: "5",
      maxLabel: "1,000+",
      note: "A rough number is fine. Please don't share sensitive details at this stage.",
      planText: "With about {value} users, we would review access first, since it often has the widest effect.",
    },
    stage: {
      question: "How would you describe your protection today?",
      options: [
        ["Basic or unknown", "begin with an assessment to understand your risks"],
        ["Some controls in place", "review how well your existing controls are working"],
        ["Mature but growing", "focus on segmentation, monitoring and new risks"],
      ],
    },
    funnel: "ASSESS, HARDEN, MONITOR, PROTECT",
    planTitle: "Your data protection plan",
    planText: "Assess your current setup, protect your most sensitive data first, then review regularly.",
    disclaimer: SECURITY_DISCLAIMER,
  },
  difference: {
    heading: "NOT JUST MORE TOOLS.\nBETTER PROTECTION.",
    description: "Buying security products doesn't always make a business safer. We focus on how your controls fit together and fit how you work.",
    imageLabel: "PROTECTION, WITH A PLAN ✳",
    points: [
      ["Designed around your risk.", "Plans are shaped by your business goals and your most sensitive data."],
      ["Least access by default.", "People and systems should only reach what they really need."],
      ["Clear documentation.", "Our findings and changes are written so your team can follow them."],
      ["Step-by-step roadmap.", "You get a practical order for improving protection over time."],
    ],
  },
  related: {
    heading: "PROTECTION WORKS BEST\nWHEN IT'S TESTED.",
    description: "Check your controls with penetration testing and ethical hacking.",
    items: ["network", "server", "hacking", "cms"],
  },
  insights: "FIREWALLS, ENCRYPTION, ACCESS, DATA, RISK",
  faq: {
    heading: "DATA PROTECTION,\nPLAIN ANSWERS.",
    intro: "What businesses usually ask about firewall and data protection.",
    items: [
      ["We already have a firewall. Isn't that enough?", "A firewall is important, but it's only one layer. Its rules need regular review, and data also needs access controls, encryption and monitoring."],
      ["What is data loss prevention?", "It combines policies and tools that help identify, monitor and protect sensitive data from accidental exposure or deliberate misuse."],
      ["What is network segmentation?", "It divides a network into separate zones, so a problem in one area is less likely to spread to critical systems."],
      ["Can you help with GDPR?", "We can help with technical measures that support compliance, such as protecting personal data. Please confirm legal obligations with a qualified adviser."],
      ["Will changes interrupt my business?", "We plan and document changes to reduce the risk, with suitable timings for anything that could affect your systems."],
      ["How often should controls be reviewed?", "Regularly, and whenever your systems or team change significantly. We can help you plan a schedule that suits your risk."],
    ],
  },
  final: {
    heading: "PROTECT THE DATA\nYOUR BUSINESS RUNS ON.",
    description: "Let's review your defenses and plan what comes next.",
    cta: "Plan My Protection",
  },
});
