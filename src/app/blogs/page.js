export const runtime = "edge";

import { getCategories, getTotalCount, getPosts } from "@/lib/wp-blog";
import { getCaseStudies } from "@/lib/wp-case-studies";

import ScrollFX from "@/components/blog-listing/ScrollFX";
import HeroScene from "@/components/blog-listing/HeroScene";
import Marquee from "@/components/blog-listing/Marquee";
import FeaturedGrid from "@/components/blog-listing/FeaturedGrid";
import WhyAbnSection from "@/components/blog-listing/WhyAbnSection";
import BlogGrid from "@/components/blog-listing/BlogGrid";
import CaseBridge from "@/components/blog-listing/CaseBridge";
import ToolsRail from "@/components/blog-listing/ToolsRail";
import CTASection from "@/components/blog-listing/CTASection";
import FinalCTA from "@/components/blog-listing/FinalCTA";

const SITE_URL = "https://abnjunction.com";

export async function generateMetadata() {
  try {
    const title = "Blogs - ABN Junction";
    const description =
      "What we're testing, learning and seeing across paid media, SEO, design, development, video and digital infrastructure — written by the people actually doing the work.";
    const url = `${SITE_URL}/blogs`;

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
    console.error("Error generating blogs listing metadata:", err);
    return {
      title: "Blogs - ABN Junction",
      description: "Explore our blog",
    };
  }
}

export default async function BlogsPage() {
  const totalCount = await getTotalCount();
  const [categories, firstPage, caseStudies] = await Promise.all([
    getCategories(),
    // If this throws, the whole page fails to render rather than silently
    // showing fake posts to a real visitor — see BlogGrid.js for the
    // client-side retry/error UI that covers subsequent filter/load-more
    // failures once the page is already interactive.
    getPosts({ page: 1, perPage: 9, categoryId: "all" }),
    getCaseStudies({ page: 1, perPage: 3, categoryId: "all" }).catch(() => ({ items: [] })),
  ]);

  // "Read a random blog" tile in FeaturedGrid — picked fresh each request
  // from data already fetched above (no extra WP round-trip just for this).
  const featuredSlugs = new Set(firstPage.items.slice(0, 2).map((item) => item.slug));
  const randomPool = firstPage.items.filter((item) => !featuredSlugs.has(item.slug));
  const randomPick = (randomPool.length ? randomPool : firstPage.items)[
    Math.floor(Math.random() * (randomPool.length ? randomPool.length : firstPage.items.length))
  ];
  const randomHref = randomPick ? `/blog/${randomPick.slug}` : "/blogs#articles";

  return (
    <main className="bg-background text-foreground">
      <ScrollFX />

      <HeroScene totalCount={totalCount} categoryCount={categories.length} />

      <Marquee />

      <FeaturedGrid items={firstPage.items} categories={categories} randomHref={randomHref} />

      <WhyAbnSection />

      <BlogGrid
        categories={categories}
        totalCount={totalCount}
        initialItems={firstPage.items}
        initialTotalPages={firstPage.totalPages}
      />

      <CaseBridge items={caseStudies.items} />

      <ToolsRail />

      <CTASection />

      <FinalCTA />
    </main>
  );
}
