export const runtime = "edge";

import { notFound } from "next/navigation";
import { getServiceContent } from "@/lib/service-content";
import { getServicePage } from "@/lib/wp-service";
import { getCaseStudies, getInsightsPosts } from "@/lib/wp-case-studies";

import ServicePageStyles from "@/components/service-page/ServicePageStyles";
import ScrollProgress from "@/components/service-page/ScrollProgress";
import HeroZone from "@/components/service-page/HeroZone";
import JourneyStory from "@/components/service-page/JourneyStory";
import ServiceMarquee from "@/components/service-page/ServiceMarquee";
import SystemMap from "@/components/service-page/SystemMap";
import CinemaJourney from "@/components/service-page/CinemaJourney";
import ProofCounters from "@/components/service-page/ProofCounters";
import CaseCards from "@/components/service-page/CaseCards";
import MethodTrack from "@/components/service-page/MethodTrack";
import CharacterBreak from "@/components/service-page/CharacterBreak";
import InsightCards from "@/components/service-page/InsightCards";
import ServiceFaq from "@/components/service-page/ServiceFaq";
import FinalCta from "@/components/service-page/FinalCta";

const SITE_URL = "https://abnjunction.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  // Same fetch as the page body — Next dedupes it, so the SEO copy can be
  // ACF-driven without a second round trip.
  const service = await getServicePage(slug);

  if (!service) {
    return { title: "Services - ABN Junction", description: "Explore ABN Junction's services" };
  }

  const title = `${service.title} - ABN Junction`;
  const url = `${SITE_URL}/services/${slug}`;

  return {
    title,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: service.metaDescription,
      url,
      siteName: "ABN Junction",
      images: [{ url: `${SITE_URL}/wp-content/uploads/2026/08/favicon-mark.png` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: service.metaDescription,
      images: [`${SITE_URL}/wp-content/uploads/2026/08/favicon-mark.png`],
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  // Built-in content from service-content.js with this page's ACF folded
  // over the top, per field. Editing a field in WP changes the page; leaving
  // it blank keeps the authored default, so the page is never half-empty.
  const service = await getServicePage(slug);

  // Any slug that isn't one of the five services (plus the alternate
  // spelling of the security one) 404s rather than rendering an empty
  // shell — see SERVICE_SLUGS in src/lib/service-content.js.
  if (!service) notFound();

  // Real WP content for the case-study and insight bands, matching how the
  // listing pages source theirs. Case studies are filtered to this service's
  // own category so the Digital Marketing page shows digital-marketing work
  // and Web Development shows web-development work.
  //
  // Two services have no categorised case studies yet (video production,
  // security), so those fall back to the most recent from any category
  // rather than rendering an empty band. Everything also falls back again
  // inside the components to the authored copy in service-content.js.
  const categoryId = service.cases.categoryId;
  const [studies, posts] = await Promise.all([
    getCaseStudies({ page: 1, perPage: 3, categoryId: categoryId ?? "all" })
      .then((r) => r.items)
      .catch(() => [])
      // An empty category (or a term with fewer than 3) still shows a full row.
      .then(async (items) =>
        items.length
          ? items
          : await getCaseStudies({ page: 1, perPage: 3, categoryId: "all" })
              .then((r) => r.items)
              .catch(() => [])
      ),
    getInsightsPosts().catch(() => []),
  ]);

  const t = service.theme;

  return (
    // The theme's three variable colours are set inline so each service can
    // recolour the whole page without touching CSS; everything else lives
    // in the scoped stylesheet. When these move to ACF, this is the only
    // place that changes.
    <main
      className="svc-page"
      style={{
        "--coral": t.primary,
        "--coral2": t.primaryLight,
        "--red": t.accent,
        "--cyan": t.secondary,
        "--ink": t.ink,
        "--cream": t.cream,
        "--paper": t.paper,
      }}
    >
      <ServicePageStyles theme={t} />
      <ScrollProgress />

      <HeroZone hero={service.hero} />
      {/* The concept runs the marquee after the story scroller
          (hero → story → marquee → system). Moved up to directly after the
          hero on request: it now fills the dark seam between the coral hero
          and the coral story panel, which the concept left as an empty
          black strip at the top of .journey. That strip is removed in
          ServicePageStyles.js so the two don't stack. */}
      <ServiceMarquee marquee={service.marquee} />
      <JourneyStory journey={service.journey} />
      <SystemMap system={service.system} />
      <CinemaJourney cinema={service.cinema} />
      <ProofCounters proof={service.proof} />
      <CaseCards cases={service.cases} studies={studies} />
      <MethodTrack method={service.method} />
      <CharacterBreak characterBreak={service.characterBreak} />
      <InsightCards insights={service.insights} posts={posts} />
      <ServiceFaq faq={service.faq} />
      <FinalCta finalCta={service.finalCta} />
    </main>
  );
}
