// Shared navigation content for the desktop mega menus and the mobile
// drill-down drawer (SiteHeader.js) so both read from one source instead
// of maintaining separate, potentially-diverging link lists.

export const PRIMARY_LINKS = {
  aboutUs: { label: "About Us", href: "https://abnjunction.com/about-us/" },
  contact: { label: "Contact", href: "https://abnjunction.com/contact-us/" },
};

export const CTA_LINK = {
  label: "Book a Strategy Call →",
  href: "https://abnjunction.com/contact-us/",
};

export const SEE_RESULTS_LINK = {
  label: "See Results",
  href: "https://abnjunction.com/case-studies/",
};

export const SERVICE_PILLARS = [
  {
    key: "digital-marketing",
    num: "01",
    label: "Digital Marketing",
    blurb: "Paid, organic, social, CRM and analytics",
    href: "https://abnjunction.com/services/digital-marketing/",
  },
  {
    key: "web-design",
    num: "02",
    label: "Graphics & Web Design",
    blurb: "Branding, UX/UI, landing pages and creatives",
    href: "https://abnjunction.com/services/web-and-graphic-design/",
  },
  {
    key: "web-development",
    num: "03",
    label: "Web Development",
    blurb: "Next.js, WordPress, Shopify and custom builds",
    href: "https://abnjunction.com/services/web-development/",
  },
  {
    key: "video-production",
    num: "04",
    label: "Video Production",
    blurb: "Campaign films, social video and motion",
    href: "https://abnjunction.com/services/video-production/",
  },
  {
    key: "data-security",
    num: "05",
    label: "Data & Web Security",
    blurb: "Tracking, privacy, hardening and monitoring",
    href: "https://abnjunction.com/services/web-data-security/",
  },
];

// Per-pillar drill-down content for the mobile drawer (and, for Digital
// Marketing, the desktop mega menu's column 2). Digital Marketing's
// sub-services each have their own real URL; the other four pillars are
// single long-scroll pages on the live site with no distinct sub-service
// URLs, so their sub-service links point back to the parent service page's
// relevant section — same "#" placeholder pattern already used above for
// links that don't have a confirmed destination yet.
export const SERVICE_DETAILS = {
  "digital-marketing": {
    eyebrow: "The growth engine",
    description: "Choose the discipline that matches the current growth constraint.",
    links: [
      { label: "Performance Marketing", href: "#" },
      { label: "Google Ads", href: "#" },
      { label: "Meta Ads", href: "#" },
      { label: "SEO", href: "https://abnjunction.com/services/digital-marketing/seo/" },
      { label: "Social Media", href: "https://abnjunction.com/services/digital-marketing/social-media-marketing/" },
      { label: "Email, WhatsApp & CRM", href: "https://abnjunction.com/services/digital-marketing/email-whatsapp-marketing/" },
      { label: "Analytics & Conversion Tracking", href: "#" },
    ],
  },
  "web-design": {
    eyebrow: "Design & experience",
    description: "Branding, UX/UI and creative work that makes the brand tangible.",
    links: [
      { label: "UI/UX Design", href: "https://abnjunction.com/services/web-and-graphic-design/" },
      { label: "Creative Web Design", href: "https://abnjunction.com/services/web-and-graphic-design/" },
      { label: "Graphic Design", href: "https://abnjunction.com/services/web-and-graphic-design/" },
      { label: "Illustrations & 3D Models", href: "https://abnjunction.com/services/web-and-graphic-design/" },
    ],
  },
  "web-development": {
    eyebrow: "Build & engineering",
    description: "Websites, apps and platforms built to scale.",
    links: [
      { label: "Website Development", href: "https://abnjunction.com/services/web-development/" },
      { label: "Content Management System", href: "https://abnjunction.com/services/web-development/" },
      { label: "App Development", href: "https://abnjunction.com/services/web-development/" },
      { label: "Adaptive Software Development", href: "https://abnjunction.com/services/web-development/" },
    ],
  },
  "video-production": {
    eyebrow: "Story & motion",
    description: "Video and content that moves an audience to act.",
    links: [
      { label: "Content Marketing", href: "https://abnjunction.com/services/video-production/" },
      { label: "Video Editing", href: "https://abnjunction.com/services/video-production/" },
      { label: "VFX & Animation", href: "https://abnjunction.com/services/video-production/" },
      { label: "Audio Editing & SFX", href: "https://abnjunction.com/services/video-production/" },
    ],
  },
  "data-security": {
    eyebrow: "Protection & trust",
    description: "Testing, hardening and monitoring that keeps the system safe.",
    links: [
      { label: "Network Penetration Testing", href: "https://abnjunction.com/services/web-data-security/" },
      { label: "Server Penetration Testing", href: "https://abnjunction.com/services/web-data-security/" },
      { label: "Data & Firewall Protection", href: "https://abnjunction.com/services/web-data-security/" },
      { label: "Ethical Hacking", href: "https://abnjunction.com/services/web-data-security/" },
      { label: "Ethical Hacking Bug Bounty", href: "https://abnjunction.com/services/web-data-security/" },
    ],
  },
};

export const DIGITAL_MARKETING_LINKS = SERVICE_DETAILS["digital-marketing"].links;

export const SERVICES_EXPLORE_LINKS = [
  { label: "View All Services", href: "https://abnjunction.com/services/" },
  { label: "How Services Connect", href: "/#junction" },
  { label: "How We Work", href: "/#process" },
  SEE_RESULTS_LINK,
  { label: "Discuss Your Project", href: "https://abnjunction.com/contact-us/" },
];

export const CASE_STUDY_FEATURED = {
  multiplier: "9×",
  title: "ROAS Growth System",
  blurb: "Paid media, shopping and SEO working as one commercial system.",
  href: "https://abnjunction.com/case-studies/",
};

export const CASE_STUDY_LINKS = [
  { label: "Performance Marketing Cases", href: "#" },
  { label: "SEO Growth Cases", href: "#" },
  { label: "Web & Conversion Cases", href: "#" },
  { label: "Creative & Video Cases", href: "#" },
  { label: "View All Case Studies", href: "https://abnjunction.com/case-studies/" },
];

export const RESOURCE_LEARN_LINKS = [
  { label: "Blog", href: "https://abnjunction.com/blogs/" },
  { label: "Guides", href: "#" },
  { label: "Marketing Glossary", href: "#" },
  { label: "FAQs", href: "#" },
];

export const RESOURCE_USE_LINKS = [
  { label: "Tools & Applications", href: "#" },
  { label: "Calculators", href: "#" },
  { label: "Templates", href: "#" },
  { label: "ABN Updates", href: "#" },
];
