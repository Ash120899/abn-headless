export const runtime = "edge";

import {
  getCategories,
  getTotalCount,
  getFeaturedCaseStudies,
  getCaseStudies,
  getAggregateData,
  getInsightsPosts,
} from "@/lib/wp-case-studies";
import { buildCategoryNameMap } from "@/lib/case-study-shared";

import ScrollFX from "@/components/case-studies-listing/ScrollFX";
import HeroScene from "@/components/case-studies-listing/HeroScene";
import Marquee from "@/components/case-studies-listing/Marquee";
import FeaturedGrid from "@/components/case-studies-listing/FeaturedGrid";
import NumbersBar from "@/components/case-studies-listing/NumbersBar";
import TrustedLogos from "@/components/case-studies-listing/TrustedLogos";
import ExploreGrid from "@/components/case-studies-listing/ExploreGrid";
import TestimonialCarousel from "@/components/case-studies-listing/TestimonialCarousel";
import InsightsSection from "@/components/case-studies-listing/InsightsSection";
import CharacterCard from "@/components/case-studies-listing/CharacterCard";
import ProcessSection from "@/components/case-studies-listing/ProcessSection";
import FinalCTA from "@/components/case-studies-listing/FinalCTA";

const SITE_URL = "https://abnjunction.com";

export async function generateMetadata() {
  try {
    const title = "Case Studies - ABN Junction";
    const description =
      "Real campaigns, real numbers. See how ABN Junction has driven measurable growth for clients across healthcare, education, eCommerce and more.";
    const url = `${SITE_URL}/case-studies`;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        siteName: "ABN Junction",
        images: [{ url: `${SITE_URL}/wp-content/uploads/2026/08/favicon-mark.png` }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [`${SITE_URL}/wp-content/uploads/2026/08/favicon-mark.png`],
      },
    };
  } catch (err) {
    console.error("Error generating case-studies listing metadata:", err);
    return {
      title: "Case Studies - ABN Junction",
      description: "Explore our case studies",
    };
  }
}

export default async function CaseStudiesPage() {
  // totalCount is a prerequisite for getAggregateData (which paginates
  // through that many case studies), so it's resolved first rather than
  // fetched a second time from inside getAggregateData. Everything else that
  // can be server-rendered resolves in parallel.
  const totalCount = await getTotalCount();
  const [categories, featured, firstPage, aggregate, insights] = await Promise.all([
    getCategories(),
    getFeaturedCaseStudies(),
    // If this throws, the whole page fails to render rather than silently
    // showing fake case studies to a real visitor — see ExploreGrid.js for
    // the client-side retry/error UI that covers subsequent filter/load-more
    // failures once the page is already interactive.
    getCaseStudies({ page: 1, perPage: 6, categoryId: "all" }),
    getAggregateData(totalCount),
    getInsightsPosts(),
  ]);

  const categoriesMap = buildCategoryNameMap(categories);

  // "Surprise me" tile in FeaturedGrid — picked fresh each request from data
  // already fetched above (no extra WP round-trip just for this), preferring
  // a case study not already shown as one of the 3 featured cards.
  const featuredSlugs = new Set(featured.map((item) => item.slug));
  const randomPool = firstPage.items.filter((item) => !featuredSlugs.has(item.slug));
  const randomPick = (randomPool.length ? randomPool : firstPage.items)[
    Math.floor(Math.random() * (randomPool.length ? randomPool.length : firstPage.items.length))
  ];
  const randomHref = randomPick ? `/case-studies/${randomPick.slug}` : "/case-studies#explore";

  return (
    <main className="bg-background text-foreground">
      <ScrollFX />

      <HeroScene totalCount={totalCount} />

      <Marquee />

      <FeaturedGrid items={featured} categoriesMap={categoriesMap} randomHref={randomHref} />

      <NumbersBar totalCount={totalCount} />

      <TrustedLogos logoUrls={aggregate.logoUrls} />

      <ExploreGrid
        categories={categories}
        categoriesMap={categoriesMap}
        totalCount={totalCount}
        initialItems={firstPage.items}
        initialTotalPages={firstPage.totalPages}
      />

      <TestimonialCarousel testimonials={aggregate.testimonials} />

      <InsightsSection posts={insights}>
        <CharacterCard />
      </InsightsSection>

      <ProcessSection />

      <FinalCTA />
    </main>
  );
}
