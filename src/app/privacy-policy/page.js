export const runtime = "edge";

import { PRIVACY_CONTENT, TOC } from "@/lib/privacy-content";

import PrivacyPageStyles from "@/components/privacy-page/PrivacyPageStyles";
import PrivacyMasthead from "@/components/privacy-page/PrivacyMasthead";
import PrivacyShortVersion from "@/components/privacy-page/PrivacyShortVersion";
import PrivacyDocument from "@/components/privacy-page/PrivacyDocument";
import PrivacyContactCta from "@/components/privacy-page/PrivacyContactCta";
import PrivacyScrollFx from "@/components/privacy-page/PrivacyScrollFx";

const SITE_URL = "https://abnjunction.com";
const URL = `${SITE_URL}/privacy-policy`;

export const metadata = {
  title: `${PRIVACY_CONTENT.metaTitle} - ABN Junction`,
  description: PRIVACY_CONTENT.metaDescription,
  alternates: { canonical: URL },
  openGraph: {
    title: `${PRIVACY_CONTENT.metaTitle} - ABN Junction`,
    description: PRIVACY_CONTENT.metaDescription,
    url: URL,
    siteName: "ABN Junction",
    images: [{ url: `${SITE_URL}/wp-content/uploads/2026/08/favicon-mark.png` }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRIVACY_CONTENT.metaTitle} - ABN Junction`,
    description: PRIVACY_CONTENT.metaDescription,
    images: [`${SITE_URL}/wp-content/uploads/2026/08/favicon-mark.png`],
  },
};

export default function PrivacyPolicyPage() {
  const c = PRIVACY_CONTENT;

  return (
    <main className="privacy-page">
      <PrivacyPageStyles />
      <PrivacyScrollFx />

      {/* Targets #policyBody directly rather than relying on SiteHeader's own
          skip link (which cannot know this page has a long document body). */}
      <a className="skip" href="#policyBody">
        Skip to the policy
      </a>
      <div className="progress" id="progress" role="presentation" />

      <PrivacyMasthead content={c.masthead} />
      <PrivacyShortVersion content={c.shortVersion} />
      <PrivacyDocument toc={TOC} sections={c.sections} />
      <PrivacyContactCta content={c.contactCta} />

      <button className="totop" id="totop" type="button" aria-label="Back to top">
        ↑
      </button>
    </main>
  );
}
