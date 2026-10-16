export const runtime = "edge";

import { notFound } from "next/navigation";
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
  // Same fetch as the page body — Next dedupes it. SEO comes from the page's
  // AIOSEO data, as on the blog and case-study singles, with the WP title and
  // the ACF meta description behind it.
  const service = await getServicePage(slug);

  if (!service) return {};

  const title = service.seo.title || `${service.title} - ABN Junction`;
  const description = service.seo.description;
  const url = service.seo.canonical || `${SITE_URL}/services/${slug}/`;
  const images = service.seo.image ? [service.seo.image] : [];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "ABN Junction",
      images: images.map((src) => ({ url: src })),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  // Everything on the page comes from this WP page's ACF fields. A field
  // left blank in WP renders nothing; there is no built-in copy behind it.
  const service = await getServicePage(slug);

  // A slug with no matching child of the Services page 404s rather than
  // rendering an empty shell.
  if (!service) notFound();

  // Real WP content for the case-study and insight bands, matching how the
  // listing pages source theirs. Case studies are filtered to the category
  // picked in the page's "Show case studies from" field.
  //
  // Two services have no categorised case studies yet (video production,
  // security), so those show the most recent from any category rather than
  // an empty band.
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
    // The three accent colours come from the page's ACF colour pickers and
    // are set inline so each service recolours the whole page. The
    // stylesheet has no fallback for them. The shared neutrals (ink, cream,
    // paper, cyan) live in the scoped stylesheet.
    <main
      className="svc-page"
      style={{
        "--coral": t.primary,
        "--coral2": t.primaryLight,
        "--red": t.accent,
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
