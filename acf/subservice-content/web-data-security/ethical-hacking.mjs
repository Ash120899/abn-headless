// Written content for /services/web-data-security/ethical-hacking/.
import { subservice, SECURITY_DISCLAIMER } from "../_shared.mjs";

export const PAGE_ID = 2327;

export const acf = subservice({
  service: "web-data-security",
  crumb: "Ethical Hacking",
  rail: "ETHICAL HACKING",
  meta: "Ethical hacking by ABN Junction: authorised network and web application testing, social engineering simulation, wireless audits, mobile app and IoT security analysis.",
  hero: {
    eyebrow: "Ethical Hacking",
    before: "THINK LIKE",
    highlight: "AN ATTACKER.",
    after: "ACT WITH PERMISSION.",
    description:
      "The best way to understand your defenses is to challenge them. With written authorisation, we test your systems using the same thinking as real attackers, then help you close the gaps.",
    cta: "Scope My Assessment",
    tags: [["⚠", "Authorised Testing"], ["◎", "Real-World Scenarios"], ["✓", "Actionable Insights"]],
    highlights: "Network Testing, Web App Security, Social Engineering, Mobile & IoT Testing",
  },
  marquee: [
    "ETHICAL HACKING, PENETRATION TESTING, WEB APP SECURITY, SOCIAL ENGINEERING, WIRELESS AUDITS, MOBILE TESTING",
    "IOT SECURITY, SECURITY AUDITS, REAL-WORLD SCENARIOS, AWARENESS TESTING, RISK REPORTS, REMEDIATION",
  ],
  problems: {
    heading: "DEFENSES LOOK STRONG.\nWHO HAS TESTED THEM?",
    description: "Security can feel solid until someone tries to get past it. Attackers look across people, applications and devices, so testing should too.",
    items: [
      ["BLIND SPOTS", "?", "You can't fix what you can't see.", "Teams can overlook weaknesses in systems they use every day."],
      ["HUMAN RISK", "◎", "People get targeted too.", "Convincing phishing can bypass even strong technical controls."],
      ["GROWING SURFACE", "⇄", "More apps, more devices.", "Mobile apps, Wi-Fi and connected devices all add possible ways in."],
    ],
  },
  offers: {
    heading: "SIX ASSESSMENTS.\nONE ATTACKER'S VIEW.",
    description: "We test across your technology and your people, within an agreed scope. Select an assessment to see what's included.",
    items: [
      ["⇄", "Network Penetration Testing", "Simulate attacks on your infrastructure.", "Finding vulnerabilities in your network, with actionable recommendations."],
      ["▣", "Web Application Assessment", "Test the apps your customers use.", "Checks for SQL injection, cross-site scripting and authentication flaws."],
      ["◎", "Social Engineering Simulation", "Find out how people respond.", "Agreed phishing exercises that help raise employee awareness."],
      ["⌘", "Wireless Network Auditing", "Check your Wi-Fi is doing its job.", "Reviewing wireless weaknesses, rogue access points and misconfigured devices."],
      ["✦", "Mobile Application Testing", "Check what your app may be exposing.", "Looking for security flaws, data leakage and insecure communication."],
      ["⚙", "IoT Device Security Analysis", "Don't forget connected devices.", "Assessing vulnerabilities, weak encryption and insecure protocols."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM PERMISSION TO PROTECTION.",
    description: "Scroll through how an ethical hacking engagement works, from written permission to clear next steps.",
    slides: [
      ["AUTHORISE", "Permission comes first.", "We agree scope, rules and contacts in writing before any testing begins.", "◎", "RULES OF ENGAGEMENT", ["Written authorisation", "Scope agreed", "Contacts confirmed"]],
      ["RECON", "Learn what's visible.", "We review what is publicly and technically visible about the systems in scope.", "⌕", "RECONNAISSANCE", ["Assets identified", "Exposure reviewed", "Targets confirmed"]],
      ["ASSESS", "Look for weak points.", "Automated and manual checks highlight likely issues.", "⚙", "ASSESSMENT", ["Scans completed", "Manual checks done", "Findings shortlisted"]],
      ["SIMULATE", "Test real-world scenarios.", "Controlled exercises show how issues could be used, without unnecessary disruption.", "⚠", "CONTROLLED TESTING", ["Scenarios tested", "Impact assessed", "Limits respected"]],
      ["REPORT", "Make it actionable.", "You get prioritized findings and practical guidance for your team.", "☰", "SECURITY REPORT", ["Risks prioritized", "Evidence included", "Fixes recommended"]],
      ["STRENGTHEN", "Close the gaps.", "We support your team with consultation and can retest fixes.", "✓", "NEXT STEPS", ["Questions answered", "Fixes retested", "Roadmap agreed"]],
    ],
  },
  lab: {
    name: "Test Scoping Lab",
    brief: "Assessment",
    preview: "SECURITY",
    heading: "YOUR SYSTEMS.\nYOUR PEOPLE.",
    highlight: "YOUR TEST PLAN.",
    description: "Answer a few questions to shape a sample assessment plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What do you want to find out?",
      options: [
        ["Where we're vulnerable", "🔍", "Your risk discovery plan", "RISKS FOUND"],
        ["How our team responds", "👥", "Your awareness testing plan", "AWARENESS"],
        ["If a new product is safe", "🚀", "Your pre-launch testing plan", "LAUNCH READY"],
      ],
    },
    scope: {
      name: "THE SCOPE",
      question: "What should we focus on first?",
      kpi: "First focus",
      options: [
        ["Web applications", "▣", "Web apps", "Start with the web applications your customers rely on"],
        ["Network", "⇄", "Network", "Start with network exposure and access paths"],
        ["People", "◎", "People", "Start with agreed phishing and awareness exercises"],
        ["Help me decide", "?", "TBD", "Begin with a short scoping discussion about your priorities"],
      ],
    },
    range: {
      name: "THE SIZE",
      question: "Roughly how many applications or systems are in scope?",
      kpi: "Systems",
      min: 1,
      max: 50,
      step: 1,
      value: 5,
      caption: "Approximate systems",
      minLabel: "1",
      maxLabel: "50+",
      note: "A rough number is fine. Please don't share sensitive details at this stage.",
      planText: "With about {value} systems in scope, we would begin with those that matter most to your business.",
    },
    stage: {
      question: "How mature is your security testing?",
      options: [
        ["This is our first", "begin with a broad assessment to establish a baseline"],
        ["Some past testing", "review earlier findings and look for what has changed"],
        ["Regular programme", "focus on realistic scenarios and new attack paths"],
      ],
    },
    funnel: "AUTHORISE, ASSESS, SIMULATE, REPORT",
    planTitle: "Your ethical hacking plan",
    planText: "Agree scope and authorisation, test realistic scenarios, then prioritize fixes with your team.",
    disclaimer: SECURITY_DISCLAIMER,
  },
  difference: {
    heading: "NOT JUST FINDING FLAWS.\nHELPING YOU FIX THEM.",
    description: "Finding a weakness is only useful if your team can act on it. We pair careful testing with clear, practical guidance.",
    imageLabel: "SECURITY, WITH A PLAN ✳",
    points: [
      ["Ethics and permission.", "We only test what you have authorised, within agreed limits."],
      ["Real-world thinking.", "Scenarios reflect how attackers actually approach a business."],
      ["Transparent communication.", "You'll get timely updates, including anything urgent."],
      ["Support after the report.", "We help your team understand and implement our recommendations."],
    ],
  },
  related: {
    heading: "SECURITY NEEDS\nMORE THAN ONE TEST.",
    description: "Connect ethical hacking with focused testing, bug bounty and data protection.",
    items: ["network", "server", "bounty", "firewall"],
  },
  insights: "THREATS, TESTING, PHISHING, DEFENSES, RISK",
  faq: {
    heading: "ETHICAL HACKING,\nCLEARLY EXPLAINED.",
    intro: "What businesses usually ask before commissioning ethical hacking.",
    items: [
      ["What is ethical hacking?", "It is authorised security testing that uses attacker-style thinking to find weaknesses, so organizations can fix them before they are misused."],
      ["Is ethical hacking legal?", "It requires permission. We only test systems covered by written authorisation from someone entitled to give it, and within an agreed scope."],
      ["How is it different from penetration testing?", "Ethical hacking is the wider practice. Penetration testing is a structured assessment within it, usually focused on specific systems."],
      ["Do you test employees as well?", "With your agreement, we can run phishing simulations and similar exercises. Their aim is to improve awareness, not to single people out."],
      ["What if you find something serious?", "We agree on an urgent contact before testing begins, so critical issues can be shared right away."],
      ["Can you guarantee we won't be hacked?", "No one can honestly promise that. Ethical hacking lowers risk by finding and helping you fix weaknesses, but security needs ongoing attention."],
    ],
  },
  final: {
    heading: "TEST YOUR DEFENSES\nBEFORE SOMEONE ELSE DOES.",
    description: "Let's scope an authorised ethical hacking assessment.",
    cta: "Scope My Assessment",
  },
});
