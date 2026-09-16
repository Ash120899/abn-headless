// Copy for the privacy policy page, ported from
// design-concepts/verified-working/ABN_Privacy_V1_Concept.html.
//
// The legal wording itself is verbatim from the live WordPress page and must
// not be rewritten here — only its structure, presentation and the
// short-version summary are new. See the "Sections not yet published" entry:
// eight WordPress headings ship with no body text on the live site, and
// inventing wording for a legal document is not an option, so they are
// surfaced honestly rather than papered over.
//
// Shaped as one plain data object, matching src/lib/contact-content.js and
// src/lib/service-content.js.

const SITE = "https://abnjunction.com";

// The live page publishes no last-updated date at all (the concept used a
// placeholder). Set to the date this page actually went live; update this
// by hand whenever the policy text changes.
export const LAST_UPDATED = "16 September 2026";

// TOC entries double as the scrollspy's section list — both the desktop rail
// and the mobile <details> list are generated from this so they cannot drift
// out of sync with each other or with the section ids in `sections` below.
export const TOC = [
  { id: "who", label: "Who we are" },
  {
    id: "collect",
    label: "What personal data we collect",
    sub: [
      { id: "comments", label: "Comments" },
      { id: "media", label: "Media" },
    ],
  },
  {
    id: "forms",
    label: "Contact forms",
    sub: [
      { id: "cookies", label: "Cookies" },
      { id: "embedded", label: "Embedded content" },
    ],
  },
  { id: "sharing", label: "Who we share your data with" },
  { id: "retention", label: "How long we retain your data" },
  { id: "rights", label: "What rights you have" },
  { id: "where", label: "Where we send your data" },
  { id: "pending", label: "Sections not yet published" },
  { id: "contact", label: "Contact & data requests" },
];

// Flat id order for the scrollspy's geometry pass — includes sub-ids inline,
// which the nested TOC array does not give you directly.
export const SPY_IDS = TOC.flatMap((item) =>
  item.sub ? [item.id, ...item.sub.map((s) => s.id)] : [item.id]
);

export const PRIVACY_CONTENT = {
  metaTitle: "Privacy Policy",
  metaDescription:
    "How ABN Junction collects, uses, retains and shares your data — in plain English first, then in full.",

  masthead: {
    eyebrow: "Legal",
    heading: "Privacy Policy",
    lede:
      "What we collect, why we collect it, how long we keep it, and exactly how to get it back or have it erased. The plain-English summary is first; the full policy follows.",
    lastUpdated: LAST_UPDATED,
    appliesTo: "abnjunction.com",
  },

  // The single highest-value block on the page: plain-English answers to
  // what people actually arrive asking, each anchored to the clause that
  // proves it.
  shortVersion: {
    eyebrow: "The short version",
    heading: "Four answers, before the legal text",
    note:
      "This summary is written in plain English to help you find what you need. It is a guide, not a substitute — the full policy below is the binding version, and each answer links to the clause it comes from.",
    items: [
      {
        q: "Do you sell my data?",
        a: "No. The policy sets out only two places your data goes outward: Gravatar, which may receive a hashed version of your email address to look up your profile picture, and an automated spam-detection service that checks visitor comments. There is no sale of personal data described anywhere in this policy.",
        bold: ["Gravatar", "automated spam-detection service"],
        jumpTo: "sharing",
      },
      {
        q: "How do I delete my data?",
        a: "Ask us. If you have an account or have left a comment, you can request an exported file of the personal data we hold, and you can request that we erase it. The exception is data we are obliged to keep for administrative, legal or security purposes.",
        bold: ["exported file", "erase"],
        jumpTo: "rights",
      },
      {
        q: "What do you actually collect?",
        a: "If you leave a comment: the fields in the comment form, plus your IP address and browser user agent, used for spam detection. If you upload an image, any EXIF location data left in that file travels with it and is downloadable by visitors.",
        bold: ["IP address", "browser user agent", "EXIF location data"],
        jumpTo: "collect",
      },
      {
        q: "How long do you keep it?",
        a: "Comments and their metadata are kept indefinitely, so follow-up comments can be approved automatically. Registered users' profile data is stored until changed or deleted, and you can see, edit or delete it yourself at any time.",
        bold: ["indefinitely"],
        jumpTo: "retention",
      },
    ],
  },

  // The document body. Legal wording verbatim from the live page.
  sections: [
    {
      id: "who",
      number: "01",
      heading: "Who we are",
      body: [
        {
          type: "p",
          html: 'Our website address is: <a href="https://www.abnjunction.com">https://www.abnjunction.com</a>',
        },
      ],
    },
    {
      id: "collect",
      number: "02",
      heading: "What personal data we collect and why we collect it",
      body: [],
      children: [
        {
          id: "comments",
          heading: "Comments",
          body: [
            {
              type: "p",
              text: "When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.",
            },
            {
              type: "p",
              html: 'An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: <a href="https://automattic.com/privacy/">https://automattic.com/privacy/</a>. After approval of your comment, your profile picture is visible to the public in the context of your comment.',
            },
          ],
        },
        {
          id: "media",
          heading: "Media",
          body: [
            {
              type: "p",
              text: "If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.",
            },
          ],
        },
      ],
    },
    {
      id: "forms",
      number: "03",
      heading: "Contact forms",
      body: [],
      children: [
        {
          id: "cookies",
          heading: "Cookies",
          body: [
            {
              type: "p",
              text: "If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.",
            },
            {
              type: "p",
              text: "If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.",
            },
            {
              type: "p",
              text: "When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.",
            },
            {
              type: "p",
              text: "If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.",
            },
          ],
        },
        {
          id: "embedded",
          heading: "Embedded content from other websites",
          body: [
            {
              type: "p",
              text: "Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website. These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.",
            },
          ],
        },
      ],
    },
    {
      id: "sharing",
      number: "04",
      heading: "Who we share your data with",
      body: [
        {
          type: "callout",
          label: "The only outward flows named in this policy",
          text: "A hashed form of your email address may be sent to the Gravatar service to look up your profile picture, and visitor comments may be checked through an automated spam detection service. No other recipient of your personal data is described in this policy.",
        },
        {
          type: "p",
          html: 'See <a href="#comments">Comments</a> for the Gravatar hash, and <a href="#where">Where we send your data</a> for the spam detection service.',
        },
      ],
    },
    {
      id: "retention",
      number: "05",
      heading: "How long we retain your data",
      body: [
        {
          type: "p",
          text: "If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.",
        },
        {
          type: "p",
          text: "For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.",
        },
      ],
    },
    {
      id: "rights",
      number: "06",
      heading: "What rights you have over your data",
      body: [
        {
          type: "p",
          text: "If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.",
        },
        {
          type: "callout",
          label: "How to exercise this",
          html: `Send an export or erasure request through <a href="${SITE}/contact-us/">our contact page</a>. Include the email address you used on the site so we can locate your records.`,
        },
      ],
    },
    {
      id: "where",
      number: "07",
      heading: "Where we send your data",
      body: [
        { type: "p", text: "Visitor comments may be checked through an automated spam detection service." },
      ],
    },
    {
      id: "pending",
      number: "08",
      heading: "Sections not yet published",
      body: [
        {
          type: "pending",
          html: `The following headings appear in this policy but do not yet carry published detail. We have not written placeholder wording for them, because a privacy policy should only state what is actually true. If you need an answer on any of these before we publish it, <a href="${SITE}/contact-us/">ask us directly</a> and we will answer in writing.`,
          items: [
            "Analytics",
            "Your contact information",
            "Additional information",
            "How we protect your data",
            "What data breach procedures we have in place",
            "What third parties we receive data from",
            "What automated decision making and/or profiling we do with user data",
            "Industry regulatory disclosure requirements",
          ],
        },
      ],
    },
  ],

  contactCta: {
    eyebrow: "Data requests",
    heading: "Need your data exported, corrected or erased?",
    description:
      "Tell us the email address you used on the site and what you would like done. We will confirm receipt and tell you what we hold, what we can remove, and what we are legally required to retain.",
    primary: { label: "Make a data request", href: `${SITE}/contact-us/` },
    secondary: { label: "Back to the policy", href: "#policy" },
  },
};

export { SITE as PRIVACY_SITE_URL };
