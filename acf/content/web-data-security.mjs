// Written content for /services/web-data-security/ (WP page 4700).
//
// Structure mirrors acf/content/digital-marketing.mjs exactly — same section
// order, same row counts, same heading shapes. Only the palette, the copy and
// the case-study category differ.
//
// Scene titles use the sub-service names from the site navigation
// (src/data/navigation.js). This service has five real sub-pages rather than
// four, so scenes 01-05 all map to one, and only scene 06 covers adjacent
// work that links back to this page.
//
// Edit the copy here, then push it up with:
//   node acf/seed.mjs web-data-security --dry-run
//   node acf/seed.mjs web-data-security
//
// Image fields are intentionally absent — the page falls back to the Digital
// Marketing artwork in /public until real art is uploaded to WP.

const SITE = "https://abnjunction.com";

export const PAGE_ID = 4700;

export const acf = {
  meta_description:
    "Penetration testing, firewall and data protection, ethical hacking and monitoring working together as one security programme — not a one-off audit.",

  // Derived from the same rule as the other services: base unchanged, light
  // tint ~10-12% toward white, darker shade for contrast on cream panels.
  color_primary: "#2fbf9f",
  color_primary_light: "#5fd6bb",
  color_accent: "#1d8a72",

  hero_eyebrow: "Data & Web Security · ABN Junction",
  hero_heading_before: "WE TURN",
  hero_heading_highlight: "WEAK POINTS",
  hero_heading_after: "INTO",
  hero_heading_kinetic: "DEFENCES.",
  hero_description:
    "Penetration testing, firewall and data protection, ethical hacking and monitoring working together as one security programme — not a one-off audit that ages badly.",
  hero_cta_primary_label: "Assess My Security →",
  hero_cta_primary_url: `${SITE}/contact-us/`,
  hero_cta_secondary_label: "See Security Work",
  hero_cta_secondary_url: "/case-studies",
  hero_stats: [
    { prefix: "", value: "5", suffix: "", label: "Security disciplines" },
    { prefix: "", value: "1", suffix: "", label: "Continuous programme" },
    { prefix: "", value: "360", suffix: "°", label: "Network to application" },
  ],
  hero_tools: [
    { glyph: "⌗", label: "Nmap" },
    { glyph: "◈", label: "Burp Suite" },
    { glyph: "M", label: "Metasploit" },
    { glyph: "▤", label: "Wireshark" },
    { glyph: "⛨", label: "Firewall" },
    { glyph: "◉", label: "Monitoring" },
  ],

  journey_eyebrow: "One programme · multiple security disciplines",
  journey_heading_before: "Scroll through the security",
  journey_heading_switch: "system, layers",
  journey_description:
    "Each discipline closes a different gap. The advantage comes from how network, server, data and application testing connect into one programme that keeps finding problems before attackers do.",
  journey_scenes: [
    {
      num: "01 · NETWORK LAYER",
      title: "Network Penetration Testing",
      description:
        "Find the way in before someone else does. Simulated attacks against the network surface expose misconfigurations, exposed services and weak segmentation while they are still cheap to fix.",
      chips: "External Testing, Internal Testing, Segmentation, Exposed Services",
      link_label: "Explore Network Testing →",
      link_url: `${SITE}/services/web-data-security/network-penetration-testing/`,
    },
    {
      num: "02 · SERVER LAYER",
      title: "Server Penetration Testing",
      description:
        "Harden what everything else runs on. Server configuration, patch levels, permissions and privilege escalation paths are tested the way a real attacker would probe them.",
      chips: "Configuration Review, Patch Gaps, Privilege Escalation, Hardening",
      link_label: "Explore Server Testing →",
      link_url: `${SITE}/services/web-data-security/server-penetration-testing/`,
    },
    {
      num: "03 · DATA PROTECTION",
      title: "Data & Firewall Protection",
      description:
        "Control what gets in and what can leave. Firewall rules, access control, encryption and backup strategy protect the data itself rather than only the perimeter around it.",
      chips: "Firewall Rules, Access Control, Encryption, Backups",
      link_label: "Explore Data Protection →",
      link_url: `${SITE}/services/web-data-security/firewall-datasecuity/`,
    },
    {
      num: "04 · OFFENSIVE TESTING",
      title: "Ethical Hacking",
      description:
        "Think like the attacker on purpose. Authorised offensive testing across applications and infrastructure shows how far a real intrusion could actually get, not just which ports are open.",
      chips: "Application Testing, Exploit Validation, Attack Paths, Reporting",
      link_label: "Explore Ethical Hacking →",
      link_url: `${SITE}/services/web-data-security/ethical-hacking/`,
    },
    {
      num: "05 · CONTINUOUS DISCOVERY",
      title: "Ethical Hacking Bug Bounty",
      description:
        "Keep looking after the report is filed. A structured bug bounty approach turns security from a once-a-year exercise into continuous discovery as the platform changes.",
      chips: "Ongoing Discovery, Responsible Disclosure, Triage, Remediation",
      link_label: "Explore Bug Bounty →",
      link_url: `${SITE}/services/web-data-security/ethical-hacking-bug-bounty/`,
    },
    {
      num: "06 · MONITORING & RESPONSE",
      title: "Monitoring & Incident Readiness",
      description:
        "Know quickly when something changes. Logging, alerting, uptime monitoring and a rehearsed response plan decide whether an incident is an inconvenience or a crisis.",
      chips: "Logging, Alerting, Uptime, Incident Response",
      link_label: "Explore Monitoring →",
      link_url: `${SITE}/services/web-data-security/`,
    },
  ],

  marquee_row_one:
    "PENETRATION TESTING ✦ NETWORK SECURITY ✦ SERVER HARDENING ✦ FIREWALL ✦ DATA PROTECTION ✦ ETHICAL HACKING ✦ BUG BOUNTY ✦ MONITORING ✦",
  marquee_row_two:
    "VULNERABILITY SCANNING ✦ ACCESS CONTROL ✦ ENCRYPTION ✦ BACKUPS ✦ PATCHING ✦ ATTACK PATHS ✦ INCIDENT RESPONSE ✦ COMPLIANCE ✦",

  system_eyebrow: "Connected security",
  system_heading_before: "Security is not a one-time audit. It’s",
  system_heading_kinetic: "one programme.",
  system_description:
    "Network, server, data, application and monitoring work should not sit in five unrelated reports. We connect them around one view of where the real risk is and what to fix first.",
  system_nodes: [
    { num: "01 · MAP", title: "Know the surface", description: "Systems, data, access and third-party exposure are mapped before anything is tested." },
    { num: "02 · TEST", title: "Find the gaps", description: "Network, server and application testing surface the weaknesses that actually matter." },
    { num: "03 · PRIORITISE", title: "Rank real risk", description: "Findings are ordered by exploitability and business impact, not by scanner severity alone." },
    { num: "04 · FIX", title: "Close the holes", description: "Hardening, patching, firewall rules and access changes are applied and then re-tested." },
    { num: "05 · WATCH", title: "Stay covered", description: "Monitoring, alerting and ongoing discovery keep the programme current as the platform changes." },
  ],

  cinema_eyebrow: "FROM EXPOSURE TO ASSURANCE · ONE CONNECTED PROGRAMME",
  cinema_words: "EXPOSURE, TESTING, HARDENING, ASSURANCE",
  cinema_description:
    "Scroll through the journey. Mapping reveals the surface, testing proves what is exploitable, hardening closes it and monitoring keeps it closed.",
  cinema_scroll_hint: "SCROLL · WATCH THE DEFENCES COME TOGETHER",
  cinema_depth_cards: [
    { label: "SURFACE", title: "systems + access", note: "what is actually exposed?" },
    { label: "TESTING", title: "simulated attack", note: "theory becomes evidence" },
    { label: "HARDENING", title: "gaps closed", note: "patched · configured · verified" },
    { label: "ASSURANCE", title: "watched continuously", note: "logs · alerts · response" },
  ],
  cinema_handoff: [
    { role_fx: "SCAN · MAP · ENUMERATE", caption: "DISCOVERY · SURFACE · EXPOSURE" },
    { role_fx: "EXPLOIT · VALIDATE · PROVE", caption: "TESTING · ETHICAL HACKING" },
    { role_fx: "PATCH · HARDEN · MONITOR", caption: "REMEDIATION · MONITORING · RESPONSE" },
  ],

  proof_eyebrow: "Selected security signals",
  proof_heading_before: "Protection that",
  proof_heading_kinetic: "actually holds.",
  proof_items: [
    { prefix: "", value: "5", suffix: "", label: "Security disciplines" },
    { prefix: "", value: "1", suffix: "", label: "Continuous programme" },
    { prefix: "", value: "100", suffix: "%", label: "Authorised testing" },
    { prefix: "", value: "360", suffix: "°", label: "Network to application" },
  ],

  // No case_study_category term exists for security yet. Left unset, so the
  // page falls back to the most recent studies from any category.
  // cases_category: 0,
  cases_eyebrow: "Data & Web Security case studies",
  cases_heading_before: "See the risks behind the",
  cases_heading_switch: "reports, results",
  cases_description:
    "Security case studies should show the exposure, the testing approach and what changed afterwards — not a screenshot of a scanner dashboard.",

  method_eyebrow: "How ABN secures",
  method_heading_before: "Map. Test. Prioritise. Fix.",
  method_heading_switch: "Monitor, Maintain",
  method_steps: [
    { num: "01 · MAP", title: "Start with the surface.", description: "Systems, data flows, access, hosting and third-party integrations are documented before testing begins." },
    { num: "02 · TEST", title: "Attack it on purpose.", description: "Authorised network, server and application testing shows what an intruder could genuinely reach." },
    { num: "03 · PRIORITISE", title: "Separate risk from noise.", description: "Findings are ranked by exploitability and business impact so effort goes where it matters first." },
    { num: "04 · FIX", title: "Close and verify.", description: "Patches, configuration changes, firewall rules and access controls are applied, then re-tested to confirm." },
    { num: "05 · MONITOR", title: "Keep watching.", description: "Logging, alerting and ongoing discovery catch new exposure as the platform and the threats change." },
  ],

  cb_eyebrow: "A little ABN personality",
  cb_heading_before: "Security is not solved by installing another",
  cb_heading_switch: "plugin, checkbox",
  cb_description:
    "It improves when someone has actually tried to break in, written down what worked, fixed the things that mattered and then checked again a few months later.",
  cb_cta_label: "Talk Through Your Security Risk →",
  cb_cta_url: `${SITE}/contact-us/`,
  cb_badges: [{ text: "Open port 😬" }, { text: "Pen test →" }, { text: "Locked down 😎" }],

  insights_eyebrow: "From the people doing the security work",
  insights_heading_before: "What we’re learning from the",
  insights_heading_switch: "tests, incidents",

  faq_eyebrow: "Data & Web Security FAQs",
  faq_heading: "Questions worth answering before an incident",
  faq_intro:
    "These are the practical questions businesses usually ask before commissioning a penetration test, hardening a platform or setting up ongoing monitoring.",
  faq_items: [
    { question: "What is included in ABN Junction’s data and web security services?", answer: "The first-level service covers network and server penetration testing, firewall and data protection, ethical hacking and ongoing bug bounty discovery, plus the monitoring that keeps it current. The mix depends on the platform and the risk." },
    { question: "What is the difference between a vulnerability scan and a penetration test?", answer: "A scan lists possible weaknesses automatically. A penetration test has a human attempt to exploit them, which shows what is genuinely reachable rather than what merely looks alarming in a report." },
    { question: "Will testing disrupt our live website or systems?", answer: "Testing is scoped and scheduled with you in advance. Higher-risk activity can be run against staging or in agreed windows so normal operations are not affected." },
    { question: "How often should security testing be repeated?", answer: "At minimum after significant changes to the platform, and otherwise on a regular cycle. Code, dependencies and infrastructure change constantly, so a single annual test leaves long blind spots." },
    { question: "Do you help fix the issues, or only report them?", answer: "Both. Findings come with prioritised, practical remediation guidance, and the fixes can be implemented and re-tested rather than handed over as a PDF." },
  ],

  final_eyebrow: "Ready to find the gaps first?",
  final_heading_before: "STOP HOPING NOTHING BREAKS. START BUILDING A",
  final_heading_kinetic: "SECURITY PROGRAMME.",
  final_description:
    "Tell us what you need to protect. We’ll help map the exposure, test it properly and keep watching after the report is delivered.",
  final_cta_primary_label: "Book a Security Assessment →",
  final_cta_primary_url: `${SITE}/contact-us/`,
  final_cta_secondary_label: "See Security Work",
  final_cta_secondary_url: "/case-studies",
};
