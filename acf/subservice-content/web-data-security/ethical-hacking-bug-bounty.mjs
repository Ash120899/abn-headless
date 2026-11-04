// Written content for /services/web-data-security/ethical-hacking-bug-bounty/.
import { subservice, SECURITY_DISCLAIMER } from "../_shared.mjs";

export const PAGE_ID = 2328;

export const acf = subservice({
  service: "web-data-security",
  crumb: "Ethical Bug Bounty",
  rail: "BUG BOUNTY",
  meta: "Ethical bug bounty services by ABN Junction: programme consultation, responsible disclosure, vulnerability discovery and verification, and researcher collaboration.",
  hero: {
    eyebrow: "Ethical Bug Bounty",
    before: "INVITE",
    highlight: "THE HUNT.",
    after: "ON YOUR TERMS.",
    description:
      "Skilled researchers can find issues internal teams miss. We help you set clear rules, handle reports responsibly and turn each valid finding into a fix.",
    cta: "Plan My Programme",
    tags: [["◎", "Responsible Disclosure"], ["✓", "Vulnerability Verification"], ["✦", "Researcher Collaboration"]],
    highlights: "Programme Consultation, Responsible Disclosure, Report Verification, Remediation Guidance",
  },
  marquee: [
    "BUG BOUNTY, RESPONSIBLE DISCLOSURE, VULNERABILITY DISCOVERY, REPORT TRIAGE, RESEARCHER COLLABORATION, REMEDIATION",
    "PROGRAMME SCOPE, REWARD STRUCTURES, SEVERITY ASSESSMENT, SAFE HARBOUR, VERIFICATION, CONTINUOUS TESTING",
  ],
  problems: {
    heading: "SOMEONE MAY FIND A BUG.\nWILL THEY TELL YOU?",
    description: "Without a clear way to report issues, helpful researchers don't know how to reach you, and real risks can stay open.",
    items: [
      ["NO REPORTING PATH", "?", "Good intentions go nowhere.", "Researchers don't know who to contact or what is allowed."],
      ["REPORT OVERLOAD", "⚠", "Noise hides the real risks.", "Duplicates and low-quality reports consume your team's time."],
      ["UNCLEAR RULES", "⇄", "Scope and rewards are vague.", "Unclear limits lead to confusion, disputes and missed issues."],
    ],
  },
  offers: {
    heading: "SIX CAPABILITIES.\nONE RESPONSIBLE PROGRAMME.",
    description: "We help you get value from outside researchers, safely. Select a capability to see what's included.",
    items: [
      ["✦", "Bounty Programme Consultation", "Set up a programme that fits your risk.", "Defining scope, reward structures and best practice for working with researchers."],
      ["☰", "Responsible Disclosure Management", "Give every report a clear path.", "Coordinating reports, communication and careful handling of sensitive details."],
      ["⌕", "Vulnerability Discovery", "Find flaws in agreed systems.", "Exploring in-scope applications to uncover previously unknown issues."],
      ["✓", "Vulnerability Verification", "Separate real risks from noise.", "Validating reports and assessing their severity and potential impact."],
      ["⚠", "Proof-of-Concept Review", "Understand the real impact.", "Safe demonstrations within scope, helping teams prioritize remediation."],
      ["◎", "Researcher Collaboration", "Build good relationships with researchers.", "Facilitating knowledge sharing between researchers and your team."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM REPORT TO RESOLVED.",
    description: "Scroll through how a responsible bug bounty programme runs, from its rules to the fixes.",
    slides: [
      ["RULES", "Set clear boundaries.", "We define what is in scope, what isn't and how researchers should behave.", "◎", "PROGRAMME POLICY", ["Scope defined", "Rules published", "Rewards agreed"]],
      ["LAUNCH", "Open the door carefully.", "Programmes can begin small, then widen as your team gains confidence.", "↗", "PROGRAMME LAUNCH", ["Reporting channel live", "Internal contacts set", "Start kept controlled"]],
      ["RECEIVE", "Capture each report.", "Findings arrive through one consistent channel, with sensitive details protected.", "☰", "REPORT INTAKE", ["Reports logged", "Duplicates filtered", "Researchers acknowledged"]],
      ["VERIFY", "Confirm what's real.", "Reports get reproduced and assessed for severity and business impact.", "✓", "VERIFICATION", ["Issue reproduced", "Severity assessed", "Impact explained"]],
      ["FIX", "Guide remediation.", "Clear instructions help your team resolve issues in priority order.", "⚙", "REMEDIATION", ["Fix guidance shared", "Priorities agreed", "Progress tracked"]],
      ["REWARD", "Close the loop.", "Verified fixes are confirmed, researchers are credited, and the programme improves.", "⟳", "PROGRAMME REVIEW", ["Fix verified", "Reward processed", "Policy improved"]],
    ],
  },
  lab: {
    name: "Programme Lab",
    brief: "Programme",
    preview: "BOUNTY",
    heading: "YOUR ASSETS.\nYOUR RULES.",
    highlight: "YOUR BOUNTY PLAN.",
    description: "Answer a few questions to shape a sample programme plan, then send it to us for a personalized discussion.",
    goal: {
      question: "What are you trying to set up?",
      options: [
        ["A disclosure policy", "📬", "Your responsible disclosure plan", "SAFE REPORT"],
        ["A private programme", "🔒", "Your private bounty plan", "VERIFIED BUG"],
        ["A public programme", "🌐", "Your public bounty plan", "VERIFIED BUG"],
      ],
    },
    scope: {
      name: "THE SCOPE",
      question: "What should the programme cover first?",
      kpi: "First scope",
      options: [
        ["Web applications", "▣", "Web apps", "Begin with your main web applications and clear exclusions"],
        ["APIs", "⇄", "APIs", "Begin with your APIs and agreed test accounts"],
        ["Mobile apps", "◎", "Mobile", "Begin with your mobile apps and their connected services"],
        ["Help me decide", "?", "TBD", "Begin with a short review of your assets and risk"],
      ],
    },
    range: {
      name: "THE SIZE",
      question: "Roughly how many assets could be in scope?",
      kpi: "Assets",
      min: 1,
      max: 50,
      step: 1,
      value: 3,
      caption: "Apps, APIs or domains",
      minLabel: "1",
      maxLabel: "50+",
      note: "A rough number is fine. Please don't share sensitive details at this stage.",
      planText: "With about {value} assets, we would start with a small scope and widen it over time.",
    },
    stage: {
      question: "Where are you with vulnerability reports today?",
      options: [
        ["No process yet", "publish a simple disclosure policy first"],
        ["Handling them ad hoc", "create a clear triage and communication process"],
        ["Running a programme", "review your scope, quality and rewards"],
      ],
    },
    funnel: "REPORT, TRIAGE, VERIFY, FIX",
    planTitle: "Your bug bounty plan",
    planText: "Set clear rules, start with a small scope, and verify every report before prioritizing fixes.",
    disclaimer: SECURITY_DISCLAIMER,
  },
  difference: {
    heading: "NOT JUST PAYING FOR BUGS.\nA PROCESS THAT WORKS.",
    description: "Rewards are only one part of a bug bounty. What makes it useful is clear scope, careful verification and fixes that really get done.",
    imageLabel: "BOUNTY, WITH A PLAN ✳",
    points: [
      ["Clear rules first.", "Good scope protects your business and helps researchers focus."],
      ["Responsible handling.", "Sensitive reports are coordinated with care from start to finish."],
      ["Verified before prioritized.", "Your team gets confirmed issues, explained in practical terms."],
      ["Guidance through to the fix.", "Detailed steps help your team deal with what is found."],
    ],
  },
  related: {
    heading: "BUG BOUNTIES WORK BEST\nAFTER THE BASICS.",
    description: "Combine outside researchers with focused testing and strong data protection.",
    items: ["hacking", "network", "server", "firewall"],
  },
  insights: "BOUNTIES, DISCLOSURE, RESEARCH, TRIAGE, SECURITY",
  faq: {
    heading: "BUG BOUNTIES,\nCLEARLY EXPLAINED.",
    intro: "What businesses usually ask before starting a bug bounty programme.",
    items: [
      ["What is a bug bounty programme?", "It invites security researchers to look for vulnerabilities in agreed systems and report them responsibly, usually in exchange for recognition or a reward."],
      ["Is my business ready for one?", "It helps to have basic security testing and a team who can fix issues first. If you aren't there yet, a disclosure policy is often a good start."],
      ["What is responsible disclosure?", "It is a process for privately reporting vulnerabilities, giving the organization a reasonable chance to fix them before any public discussion."],
      ["Should my programme be public or private?", "Many organizations start with a private programme and a limited scope, then widen it as their processes mature."],
      ["How do you handle invalid reports?", "We verify reports by reproducing them, assessing severity and filtering out duplicates, so your team can focus on real issues."],
      ["Does a bounty replace penetration testing?", "No. They complement each other. Testing gives planned coverage, while a bounty adds ongoing outside perspective."],
    ],
  },
  final: {
    heading: "MAKE IT EASY\nTO TELL YOU WHAT'S WRONG.",
    description: "Let's plan a responsible bug bounty or disclosure programme.",
    cta: "Plan My Programme",
  },
});
