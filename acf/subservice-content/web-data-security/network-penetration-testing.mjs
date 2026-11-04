// Written content for /services/web-data-security/network-penetration-testing/.
import { subservice, SECURITY_DISCLAIMER } from "../_shared.mjs";

export const PAGE_ID = 2325;

export const acf = subservice({
  service: "web-data-security",
  crumb: "Network Penetration Testing",
  rail: "NETWORK TESTING",
  meta: "Network penetration testing by ABN Junction: vulnerability scanning, exploit testing, wireless analysis, internal network evaluation and clear remediation reports.",
  hero: {
    eyebrow: "Network Penetration Testing",
    before: "FIND",
    highlight: "THE GAPS",
    after: "BEFORE ATTACKERS DO.",
    description:
      "A network can look secure until someone tests it properly. With your written permission, we simulate real attack paths, then show you what we found and how to fix it.",
    cta: "Scope My Test",
    tags: [["⌕", "Vulnerability Scanning"], ["⚠", "Attack Simulation"], ["✓", "Clear Remediation"]],
    highlights: "Vulnerability Scanning, Exploit Testing, Wireless Analysis, Internal Network Review",
  },
  marquee: [
    "PENETRATION TESTING, VULNERABILITY SCANNING, EXPLOIT TESTING, WIRELESS ANALYSIS, INTERNAL NETWORKS, REMEDIATION",
    "ACCESS CONTROLS, NETWORK SEGMENTATION, SOCIAL ENGINEERING, RISK REPORTS, SECURITY ASSESSMENT, RETESTING",
  ],
  problems: {
    heading: "YOUR NETWORK RUNS FINE.\nIS IT ACTUALLY SECURE?",
    description: "Everyday operations won't reveal weak points. A controlled test shows how far someone could get, and what to fix first.",
    items: [
      ["UNKNOWN WEAKNESSES", "?", "You don't know what's exposed.", "Open services and old configurations can stay unnoticed for years."],
      ["TOO FLAT", "⇄", "One way in reaches everything.", "Weak segmentation can let a small issue spread across your network."],
      ["UNTESTED DEFENSES", "⚠", "Controls that look good on paper.", "Tools and policies haven't been challenged in realistic conditions."],
    ],
  },
  offers: {
    heading: "SIX ASSESSMENTS.\nONE CLEAR PICTURE.",
    description: "We test what matters within an agreed scope. Select an assessment to see what the work includes.",
    items: [
      ["⌕", "Vulnerability Scanning", "Map potential weaknesses and entry points.", "Scans across network infrastructure, applications and systems."],
      ["⚠", "Exploit Testing", "Find out which risks are real.", "Controlled attempts to verify whether vulnerabilities can be exploited."],
      ["◎", "Social Engineering Assessment", "Test the human side of security.", "Agreed phishing simulations and awareness checks."],
      ["⌘", "Wireless Network Analysis", "Check your Wi-Fi is not a side door.", "Looking for weak settings, rogue access points and misconfigured devices."],
      ["▣", "Web Application Testing", "Probe the applications on your network.", "Checks for issues such as SQL injection, XSS and authentication flaws."],
      ["⇄", "Internal Network Evaluation", "See what an insider could reach.", "Reviewing segmentation, access controls and privilege escalation paths."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM SCOPE TO SECURED.",
    description: "Scroll through how an authorised penetration test works, from agreed scope to verified fixes.",
    slides: [
      ["SCOPE", "Agree the rules first.", "We define what will be tested, when, and who to contact, with written authorisation.", "◎", "RULES OF ENGAGEMENT", ["Written authorisation", "Targets confirmed", "Test window agreed"]],
      ["DISCOVER", "Map the network.", "We identify hosts, services and possible entry points within scope.", "⌕", "DISCOVERY", ["Hosts identified", "Services listed", "Entry points mapped"]],
      ["ASSESS", "Look for weaknesses.", "Scans and manual checks reveal issues to investigate further.", "⚙", "ASSESSMENT", ["Scans completed", "Manual review done", "Findings shortlisted"]],
      ["VERIFY", "Test what is real.", "Controlled testing confirms which issues pose genuine risk, without unnecessary disruption.", "⚠", "CONTROLLED TESTING", ["Risks verified", "Impact assessed", "Disruption avoided"]],
      ["REPORT", "Explain it clearly.", "You get prioritized findings and practical remediation steps.", "☰", "SECURITY REPORT", ["Risks prioritized", "Evidence included", "Fixes recommended"]],
      ["RETEST", "Confirm the fixes.", "Once fixes are applied, we can check that the issues have been resolved.", "✓", "RETEST", ["Fixes reviewed", "Issues rechecked", "Next steps agreed"]],
    ],
  },
  lab: {
    name: "Test Scoping Lab",
    brief: "Testing",
    preview: "SECURITY",
    heading: "YOUR NETWORK.\nYOUR RISKS.",
    highlight: "YOUR TEST PLAN.",
    description: "Answer a few questions to shape a sample test plan, then send it to us for a personalized discussion.",
    goal: {
      question: "Why do you want a network test?",
      options: [
        ["Find unknown risks", "🔍", "Your risk discovery test plan", "RISKS FOUND"],
        ["Meet a requirement", "📋", "Your requirement-driven test plan", "EVIDENCE"],
        ["After a change or incident", "🛠️", "Your post-change test plan", "ASSURANCE"],
      ],
    },
    scope: {
      name: "THE SCOPE",
      question: "What should be tested?",
      kpi: "Scope",
      options: [
        ["External network", "◎", "External", "Start with what is reachable from the internet"],
        ["Internal network", "⇄", "Internal", "Start with segmentation and access from inside the network"],
        ["Wireless", "⌘", "Wireless", "Start with your Wi-Fi configuration and access points"],
        ["Help me decide", "?", "TBD", "Begin with a short scoping discussion about your environment"],
      ],
    },
    range: {
      name: "THE SIZE",
      question: "Roughly how many IP addresses are in scope?",
      kpi: "IP addresses",
      min: 5,
      max: 1000,
      step: 5,
      value: 50,
      caption: "Approximate IPs",
      minLabel: "5",
      maxLabel: "1,000+",
      note: "A rough number is fine. Please don't share sensitive details at this stage.",
      planText: "With about {value} IP addresses in scope, we would confirm priorities and test windows first.",
    },
    stage: {
      question: "Have you tested this network before?",
      options: [
        ["Never tested", "begin with a broad assessment to establish a baseline"],
        ["Tested a while ago", "review earlier findings and test what has changed"],
        ["Test regularly", "focus on new attack paths and verifying past fixes"],
      ],
    },
    funnel: "SCOPE, DISCOVER, VERIFY, REPORT",
    planTitle: "Your network test plan",
    planText: "Agree scope and authorisation, test in a controlled way, then fix and verify what matters most.",
    disclaimer: SECURITY_DISCLAIMER,
  },
  difference: {
    heading: "NOT JUST A SCAN.\nA REPORT YOU CAN USE.",
    description: "An automated scan can list possibilities. We focus on which risks are real, what they could affect and what your team should do next.",
    imageLabel: "SECURITY, WITH A PLAN ✳",
    points: [
      ["Authorised and scoped.", "Testing only starts once permission and limits are in writing."],
      ["Careful by design.", "We plan test windows and methods to avoid unnecessary disruption."],
      ["Prioritized findings.", "You'll know what to fix first, and why."],
      ["Clear next steps.", "Practical guidance helps your team act on the results."],
    ],
  },
  related: {
    heading: "NETWORK SECURITY\nIS ONLY ONE LAYER.",
    description: "Strong security connects networks, servers, applications and data protection.",
    items: ["server", "hacking", "firewall", "bounty"],
  },
  insights: "NETWORKS, RISK, TESTING, ACCESS, SECURITY",
  faq: {
    heading: "NETWORK TESTING,\nSTRAIGHT ANSWERS.",
    intro: "What businesses usually ask before commissioning a penetration test.",
    items: [
      ["What is a network penetration test?", "It is an authorised, controlled attempt to find and verify security weaknesses in your network, so you can fix them before a real attacker finds them."],
      ["Will testing disrupt my business?", "We plan scope, timing and methods to reduce risk. Any test carries some possibility of impact, so we agree safeguards and contacts in advance."],
      ["How is this different from a vulnerability scan?", "A scan identifies possible issues automatically. A penetration test adds manual work to verify what is genuinely exploitable and what it could mean."],
      ["What do you need before starting?", "Written authorisation from someone entitled to give it, an agreed scope and clear points of contact."],
      ["What will the report include?", "Prioritized findings, supporting evidence, an explanation of risk and practical recommendations for fixing each issue."],
      ["Does a test mean we're completely secure?", "No test can promise that. It gives you a clear picture at a point in time, so regular testing is sensible as systems change."],
    ],
  },
  final: {
    heading: "FIND OUT WHAT'S EXPOSED\nBEFORE SOMEONE ELSE DOES.",
    description: "Let's scope a controlled test of your network.",
    cta: "Scope My Test",
  },
});
