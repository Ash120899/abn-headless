// Copy for the contact page, ported verbatim from
// C:\Users\ashuu\Downloads\ABN_Contact_2026_V3.html.
//
// Shaped as one plain data object rather than being inlined into the
// components, matching src/lib/service-content.js — so if this page ever
// becomes ACF-driven, only a merge layer is needed and no component changes.

const SITE = "https://abnjunction.com";

// Real contact details, taken from the live /contact-us/ page rather than the
// concept's placeholders. The email is Cloudflare-obfuscated in the WP markup;
// this is the decoded value, and it matches the concept.
export const CONTACT_DETAILS = {
  email: "abnjunction@gmail.com",
  whatsapp: "+919429690898",
  phone: "+918807556154",
};

const waDigits = CONTACT_DETAILS.whatsapp.replace(/\D/g, "");

export const CONTACT_CONTENT = {
  metaTitle: "Contact ABN Junction",
  metaDescription:
    "Contact ABN Junction for digital marketing, web and graphic design, web development, video production, and data & web security.",

  hero: {
    eyebrow: "Contact ABN Junction",
    heading: "BRING THE PROBLEM. WE’LL CONNECT THE DOTS.",
    description:
      "One conversation can connect strategy, creative, technology, content and protection. Tell us what you’re building — or what isn’t working yet.",
    ctaPrimary: { label: "Start a Conversation ↗", href: "#contact" },
    ctaSecondary: { label: "Book a Strategy Call", href: "#channels" },
    characterNote: "This way ↓",
    scrollHint: "Scroll to connect",
  },

  marquee: [
    "DIGITAL MARKETING",
    "WEB & GRAPHIC DESIGN",
    "WEB DEVELOPMENT",
    "VIDEO PRODUCTION",
    "DATA & WEB SECURITY",
    "SEO",
    "GOOGLE ADS",
    "UI/UX",
  ],

  form: {
    kicker: "Start at the junction",
    heading: "WHAT CAN WE HELP WITH?",
    lead:
      "Choose one service, several, or leave it open. Keep the rest simple — we only need enough to start the right conversation.",
    formHeading: "Your project, in a few lines.",
    formSub: "Select any services that feel relevant. You can choose more than one.",
    micro:
      "No long questionnaire here. Detailed project briefing and onboarding happen separately after the first conversation.",
    submitLabel: "Send Enquiry →",
    // Shown when CF7 accepts the submission, if it returns no message of its own.
    successMessage:
      "Thanks — your enquiry is with us. We'll be in touch shortly.",
    errorMessage:
      "Something went wrong sending that. Please try again, or email abnjunction@gmail.com directly.",
    // CF7 answers "spam" when reCAPTCHA scores the submission too low. Its
    // stock wording sounds like a server fault and offers no alternative, so
    // this gives the visitor a route that always works.
    spamMessage:
      "We couldn't verify that submission automatically. Please email abnjunction@gmail.com or message us on WhatsApp and we'll pick it up right away.",

    why: {
      kicker: "Why ABN Junction",
      heading: "One problem. One connected team.",
      sub:
        "We bring the right disciplines together instead of pushing your problem into a single service box.",
      points: [
        {
          title: "Strategy before execution.",
          detail: "We understand what needs to move before deciding what needs to be built.",
        },
        {
          title: "Connected by design.",
          detail:
            "Marketing, creative, development, video and security can work as one system.",
        },
        {
          title: "Human judgment. AI acceleration.",
          detail:
            "AI adds leverage to research, production and optimisation — people still own the decisions.",
          highlight: true,
        },
      ],
    },
  },

  channels: {
    kicker: "Choose how you want to talk",
    heading: "CONTACT ABN JUNCTION YOUR WAY.",
    description:
      "Use the form when you have a project in mind, book a focused strategy conversation, or reach us directly through WhatsApp or email.",
    bubble: "Pick your route ↓",
    tabs: [
      {
        id: "book",
        label: "Book a Strategy Call",
        heading: "Pick a time that works.",
        description:
          "A short strategy call to understand the situation, see whether ABN Junction is the right fit, and decide what the next step should be.",
        // Placeholder until a booking tool is chosen — swap this pane for the
        // real embed then.
        embedTitle: "Calendar embed area",
        embedNote: "Embed TidyCal / Calendly / your booking tool here.",
      },
      {
        id: "wa",
        label: "WhatsApp",
        heading: "Prefer WhatsApp?",
        description:
          "Use it for a quick first message, a simple question or to continue a conversation with the ABN Junction team.",
        action: {
          label: "Open WhatsApp →",
          href: `https://wa.me/${waDigits}`,
          external: true,
        },
      },
      {
        id: "mail",
        label: "Email",
        heading: "Send us the brief.",
        description:
          "Email works best when you already have requirements, documents, screenshots or attachments you want us to review.",
        action: {
          label: "Email ABN Junction →",
          href: `mailto:${CONTACT_DETAILS.email}`,
        },
      },
    ],
  },

  finalCta: {
    kicker: "Not sure what service you need?",
    heading: "GOOD. START WITH THE PROBLEM.",
    description:
      "You don’t need the perfect brief before talking to us. Tell us where you are, and we’ll help map the route.",
    cta: { label: "Talk to ABN Junction →", href: "#contact" },
  },
};

export { SITE as CONTACT_SITE_URL };
