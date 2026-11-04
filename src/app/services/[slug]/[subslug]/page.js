export const runtime = "edge";

// Sub-service pages: /services/<service>/<sub-service>/. One layout shared by
// every child page of a service page, ported from
// design-concepts/ABN_Junction_Performance_Marketing_V2_Campaign_Lab_Leadgen.html.
// Content comes from each page's ACF fields (acf/subservice-page-fields.json).
//
// Live only for the paths listed in SUBSERVICE_PATHS in
// cloudflare/router-worker.js. WordPress serves any other nested URL.
import { notFound } from "next/navigation";
import { getSubservicePage } from "@/lib/wp-subservice";
import { getCaseStudies, getInsightsPosts } from "@/lib/wp-case-studies";
import { SERVICE_PILLARS } from "@/data/navigation";

import SubservicePageStyles from "@/components/subservice-page/SubservicePageStyles";
import SubserviceFx from "@/components/subservice-page/SubserviceFx";
import SubHero from "@/components/subservice-page/SubHero";
import SubMarquee from "@/components/subservice-page/SubMarquee";
import SectionRail from "@/components/subservice-page/SectionRail";
import ProblemGrid from "@/components/subservice-page/ProblemGrid";
import OfferGrid from "@/components/subservice-page/OfferGrid";
import StoryScroll from "@/components/subservice-page/StoryScroll";
import CampaignLab from "@/components/subservice-page/CampaignLab";
import DifferenceBlock from "@/components/subservice-page/DifferenceBlock";
import SubCaseCards from "@/components/subservice-page/SubCaseCards";
import RelatedServices from "@/components/subservice-page/RelatedServices";
import SubInsights from "@/components/subservice-page/SubInsights";
import SubFaq from "@/components/subservice-page/SubFaq";
import SubFinalCta from "@/components/subservice-page/SubFinalCta";

const SITE_URL = "https://abnjunction.com";

export async function generateMetadata({ params }) {
  const { slug, subslug } = await params;
  const page = await getSubservicePage(slug, subslug);

  if (!page) return {};

  const title = page.seo.title || `${page.title} - ABN Junction`;
  const description = page.seo.description;
  const url = page.seo.canonical || `${SITE_URL}/services/${slug}/${subslug}/`;
  const images = page.seo.image ? [page.seo.image] : [];

  return {
    title,
    description,
    alternates: { canonical: url },
    // A local seed-file preview must never look indexable.
    robots: page.preview ? { index: false, follow: false } : undefined,
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

export default async function SubservicePage({ params }) {
  const { slug, subslug } = await params;
  const page = await getSubservicePage(slug, subslug);

  if (!page) notFound();

  const [studies, posts] = await Promise.all([
    page.cases.heading.length
      ? getCaseStudies({ page: 1, perPage: 2, categoryId: page.cases.categoryId ?? "all" })
          .then((r) => r.items)
          .catch(() => [])
          // An empty category still shows a full row.
          .then(async (items) =>
            items.length
              ? items
              : await getCaseStudies({ page: 1, perPage: 2, categoryId: "all" })
                  .then((r) => r.items)
                  .catch(() => [])
          )
      : [],
    page.insights.heading.length
      ? getInsightsPosts({ categoryId: page.insights.categoryId }).catch(() => [])
      : [],
  ]);

  const t = page.theme;
  // Service names follow navigation.js (the naming source of truth); the
  // parent's WP title is an SEO headline ("Proven Digital Marketing
  // Solutions for Businesses"), too long for a breadcrumb.
  const parentHref = `${SITE_URL}/services/${page.parent.slug}/`;
  const parentLabel = SERVICE_PILLARS.find((p) => p.href === parentHref)?.label || page.parent.title;
  const crumbs = [
    { label: "Services", href: `${SITE_URL}/services/` },
    { label: parentLabel, href: parentHref },
    { label: page.crumbLabel || page.title },
  ];

  // Rail links only for sections that render AND have a label in ACF.
  const L = page.rail.labels;
  const railLinks = [
    { id: "problems", label: L.problems, on: page.problems.items.length > 0 },
    { id: "offers", label: L.offers, on: page.offers.items.length > 0 },
    { id: "journey", label: L.journey, on: page.journey.slides.length > 0 },
    { id: "campaign-lab", label: L.lab, on: page.lab.steps.length > 0 },
    { id: "difference", label: L.difference, on: page.difference.points.length > 0 || Boolean(page.difference.heading.length) },
    { id: "work", label: L.cases, on: studies.length > 0 },
    { id: "connected", label: L.related, on: page.related.items.length > 0 },
    { id: "insights", label: L.insights, on: posts.length > 0 },
    { id: "faq", label: L.faq, on: page.faq.items.length > 0 },
  ].filter((l) => l.on && l.label);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href || `${SITE_URL}/services/${slug}/${subslug}/`,
    })),
  };

  return (
    // Accent colours: this page's ACF pickers, else its parent service's.
    // Set inline so one stylesheet recolours per page; it has no fallback.
    <main
      className="ssp-page"
      style={{
        "--coral": t.primary,
        "--coral2": t.primaryLight,
        "--red": t.accent,
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SubservicePageStyles theme={t} />
      <SubserviceFx />
      {page.preview ? (
        <div className="ssp-preview-badge" role="status">
          Local preview: acf/subservice-content/{slug}/{subslug}.mjs (not WordPress)
        </div>
      ) : null}

      <SubHero hero={page.hero} crumbs={crumbs} />
      <SubMarquee marquee={page.marquee} />
      <SectionRail location={page.rail.location} links={railLinks} />
      <ProblemGrid problems={page.problems} />
      <OfferGrid offers={page.offers} />
      <StoryScroll journey={page.journey} />
      <CampaignLab lab={page.lab} pageTitle={page.crumbLabel || page.title} serviceTitle={parentLabel} />
      <DifferenceBlock difference={page.difference} />
      <SubCaseCards cases={page.cases} studies={studies} />
      <RelatedServices related={page.related} />
      <SubInsights insights={page.insights} posts={posts} />
      <SubFaq faq={page.faq} />
      <SubFinalCta finalCta={page.finalCta} />
    </main>
  );
}
