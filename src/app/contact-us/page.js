export const runtime = "edge";

import { CONTACT_CONTENT } from "@/lib/contact-content";

import ContactPageStyles from "@/components/contact-page/ContactPageStyles";
import ContactHero from "@/components/contact-page/ContactHero";
import ContactMarquee from "@/components/contact-page/ContactMarquee";
import ContactForm from "@/components/contact-page/ContactForm";
import ContactChannels from "@/components/contact-page/ContactChannels";
import ContactFinalCta from "@/components/contact-page/ContactFinalCta";

const SITE_URL = "https://abnjunction.com";
const URL = `${SITE_URL}/contact-us`;

export const metadata = {
  title: `${CONTACT_CONTENT.metaTitle} - ABN Junction`,
  description: CONTACT_CONTENT.metaDescription,
  alternates: { canonical: URL },
  openGraph: {
    title: `${CONTACT_CONTENT.metaTitle} - ABN Junction`,
    description: CONTACT_CONTENT.metaDescription,
    url: URL,
    siteName: "ABN Junction",
    images: [{ url: `${SITE_URL}/wp-content/uploads/2026/08/favicon-mark.png` }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${CONTACT_CONTENT.metaTitle} - ABN Junction`,
    description: CONTACT_CONTENT.metaDescription,
    images: [`${SITE_URL}/wp-content/uploads/2026/08/favicon-mark.png`],
  },
};

export default function ContactPage() {
  const c = CONTACT_CONTENT;

  return (
    <main className="contact-page">
      <ContactPageStyles />
      <ContactHero hero={c.hero} />
      <ContactMarquee items={c.marquee} />
      <ContactForm content={c.form} />
      <ContactChannels content={c.channels} />
      <ContactFinalCta content={c.finalCta} />
    </main>
  );
}
