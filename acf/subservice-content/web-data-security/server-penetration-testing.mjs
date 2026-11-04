// Written content for /services/web-data-security/server-penetration-testing/.
import { subservice, SECURITY_DISCLAIMER } from "../_shared.mjs";

export const PAGE_ID = 2326;

export const acf = subservice({
  service: "web-data-security",
  crumb: "Server Penetration Testing",
  rail: "SERVER TESTING",
  meta: "Server penetration testing by ABN Junction: OS vulnerability assessment, service evaluation, access control analysis, database testing and patch management audits.",
  hero: {
    eyebrow: "Server Penetration Testing",
    before: "YOUR DATA",
    highlight: "LIVES HERE.",
    after: "TEST IT PROPERLY.",
    description:
      "Servers hold your applications, databases and customer data. With your written permission, we test their configuration and access controls, then show you what to fix first.",
    cta: "Scope My Test",
    tags: [["⚙", "OS Assessment"], ["◎", "Access Controls"], ["✓", "Patch Audit"]],
    highlights: "OS Assessment, Service Evaluation, Database Testing, Patch Management Audit",
  },
  marquee: [
    "SERVER PENTESTING, OS VULNERABILITIES, OPEN PORTS, ACCESS CONTROLS, DATABASE SECURITY, PATCH AUDITS",
    "WEB SERVER REVIEW, WINDOWS SERVERS, LINUX SERVERS, PRIVILEGE ESCALATION, MISCONFIGURATION, REMEDIATION",
  ],
  problems: {
    heading: "THE SERVER IS UP.\nIS IT LOCKED DOWN?",
    description: "A running server isn't always a secure one. Small misconfigurations and missed updates can quietly build up over time.",
    items: [
      ["MISSED PATCHES", "⚠", "Known issues stay open.", "Outdated software can leave published vulnerabilities on your servers."],
      ["OPEN SERVICES", "⇄", "More exposed than you think.", "Unneeded ports and services create more ways in."],
      ["TOO MUCH ACCESS", "◎", "Privileges have grown.", "Old accounts and broad permissions raise the impact of one mistake."],
    ],
  },
  offers: {
    heading: "SIX ASSESSMENTS.\nONE HARDENED SERVER.",
    description: "We review your servers layer by layer. Select an assessment to see what the work includes.",
    items: [
      ["⚙", "OS Vulnerability Assessment", "Find weaknesses in the operating system.", "Checks for known vulnerabilities, misconfigurations and outdated software."],
      ["⇄", "Network Service Evaluation", "See which services are exposed.", "Probing open ports, running services and weak authentication."],
      ["◎", "Access Control Analysis", "Check who can do what.", "Reviewing privileges, password policies and escalation paths."],
      ["▣", "Database Security Testing", "Protect the data your business depends on.", "Reviewing configuration, injection risks and improper access controls."],
      ["☰", "Web Server Configuration Review", "Close common web server gaps.", "Looking for insecure settings, outdated modules and information disclosure."],
      ["✓", "Patch Management Audit", "Check your updates are really happening.", "Finding missing updates and reviewing your patching process."],
    ],
  },
  journey: {
    heading: "THE JOURNEY\nFROM EXPOSED TO HARDENED.",
    description: "Scroll through how an authorised server test works, from agreed scope to verified fixes.",
    slides: [
      ["SCOPE", "Agree the rules first.", "We confirm servers, timing and limits, with written authorisation.", "◎", "RULES OF ENGAGEMENT", ["Written authorisation", "Servers confirmed", "Backups checked"]],
      ["ENUMERATE", "See what's running.", "We identify operating systems, services and versions within scope.", "⌕", "ENUMERATION", ["OS identified", "Services listed", "Versions noted"]],
      ["REVIEW", "Check the configuration.", "We compare settings and patch levels against sensible security practice.", "⚙", "CONFIGURATION", ["Settings reviewed", "Patches checked", "Logs considered"]],
      ["TEST", "Verify the real risks.", "Controlled testing shows what could really be reached or changed.", "⚠", "CONTROLLED TESTING", ["Risks verified", "Access paths tested", "Disruption avoided"]],
      ["REPORT", "Explain what matters.", "Findings are prioritized with clear steps your team can act on.", "☰", "SECURITY REPORT", ["Risks prioritized", "Evidence included", "Fixes recommended"]],
      ["RETEST", "Confirm the fixes.", "After remediation, we can check that the gaps are really closed.", "✓", "RETEST", ["Fixes reviewed", "Issues rechecked", "Hardening advice"]],
    ],
  },
  lab: {
    name: "Test Scoping Lab",
    brief: "Testing",
    preview: "SECURITY",
    heading: "YOUR SERVERS.\nYOUR DATA.",
    highlight: "YOUR TEST PLAN.",
    description: "Answer a few questions to shape a sample test plan, then send it to us for a personalized discussion.",
    goal: {
      question: "Why do you want your servers tested?",
      options: [
        ["Find unknown risks", "🔍", "Your risk discovery test plan", "RISKS FOUND"],
        ["Before a launch", "🚀", "Your pre-launch test plan", "LAUNCH READY"],
        ["Meet a requirement", "📋", "Your requirement-driven test plan", "EVIDENCE"],
      ],
    },
    scope: {
      name: "THE SERVERS",
      question: "What kind of server is the priority?",
      kpi: "Server type",
      options: [
        ["Web server", "▣", "Web", "Start with web server configuration and exposed services"],
        ["Windows server", "◎", "Windows", "Start with patching, access and Windows-specific settings"],
        ["Database server", "☰", "Database", "Start with database access and configuration"],
        ["Help me decide", "?", "TBD", "Begin with a short scoping discussion about your environment"],
      ],
    },
    range: {
      name: "THE SIZE",
      question: "Roughly how many servers are in scope?",
      kpi: "Servers",
      min: 1,
      max: 100,
      step: 1,
      value: 5,
      caption: "Approximate servers",
      minLabel: "1",
      maxLabel: "100+",
      note: "A rough number is fine. Please don't share sensitive details at this stage.",
      planText: "With about {value} servers in scope, we would start with those holding your most important data.",
    },
    stage: {
      question: "Have these servers been tested before?",
      options: [
        ["Never tested", "begin with a full review to establish a baseline"],
        ["Tested a while ago", "review earlier findings and what has changed since"],
        ["Test regularly", "focus on new services and verifying past fixes"],
      ],
    },
    funnel: "SCOPE, REVIEW, VERIFY, REPORT",
    planTitle: "Your server test plan",
    planText: "Agree scope and authorisation, review configuration, verify risks, then fix and retest.",
    disclaimer: SECURITY_DISCLAIMER,
  },
  difference: {
    heading: "NOT JUST A CHECKLIST.\nREAL-WORLD TESTING.",
    description: "Compliance checklists can miss how weaknesses combine. We look at how real issues could affect your data and services.",
    imageLabel: "SECURITY, WITH A PLAN ✳",
    points: [
      ["Authorised and scoped.", "Written permission and limits come before any testing."],
      ["Careful around production.", "Timing and methods are planned to reduce the risk of disruption."],
      ["Findings in plain language.", "Your technical and business teams can both understand the report."],
      ["Practical remediation.", "Clear steps help your team harden servers with confidence."],
    ],
  },
  related: {
    heading: "A SECURE SERVER\nIS ONE PART OF THE PICTURE.",
    description: "Connect server security with network testing, ethical hacking and data protection.",
    items: ["network", "hacking", "firewall", "website"],
  },
  insights: "SERVERS, PATCHING, ACCESS, DATABASES, HARDENING",
  faq: {
    heading: "SERVER TESTING,\nSTRAIGHT ANSWERS.",
    intro: "What businesses usually ask before commissioning server penetration testing.",
    items: [
      ["What does server penetration testing cover?", "It can include the operating system, exposed services, access controls, databases, web server configuration and patch management, within an agreed scope."],
      ["Can testing take my server down?", "We plan carefully to reduce the risk, including agreed test windows and methods. Any test carries some risk, so backups and contacts should be confirmed first."],
      ["Do you test Windows and Linux servers?", "Yes. Our assessments can cover different server types, and we'll confirm the approach during scoping."],
      ["What do you need from us?", "Written authorisation, an agreed list of servers, test windows and an emergency contact."],
      ["Will you fix the problems you find?", "Our report provides practical recommendations. We can also discuss remediation support and retesting."],
      ["How often should servers be tested?", "It depends on your risk and how often things change. Consider testing periodically and after significant updates or changes."],
    ],
  },
  final: {
    heading: "KNOW YOUR SERVERS\nARE AS SAFE AS THEY LOOK.",
    description: "Let's scope a controlled test of your server environment.",
    cta: "Scope My Test",
  },
});
