// Pure, isomorphic helpers + constants for the /blogs listing page. Mirrors
// src/lib/case-study-shared.js's shape (normalize/category helpers + a
// clearly-flagged mock fallback), kept self-contained rather than importing
// from case-study-shared so this listing doesn't depend on another
// feature's internals.

// WP's excerpt field isn't reliably short — some posts return an
// auto-generated ~55-word trim, but others (custom excerpt set, or no
// excerpt support in the block) return the full first paragraph(s) of
// content, which was overflowing the cards. Trimmed to a real "card"
// length here rather than relying on WP to have done it.
const CARD_DESC_MAX = 140;

export function normalizeBlogPost(item) {
  let excerpt = (item.excerpt?.rendered || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&hellip;|\[&hellip;\]/g, "…")
    .trim();
  if (excerpt.length > CARD_DESC_MAX) {
    excerpt = excerpt.slice(0, CARD_DESC_MAX).replace(/\s+\S*$/, "") + "…";
  }
  // Some real posts only carry WP's default "Uncategorized" term — showing
  // that verbatim on a card badge reads as a bug, not a real category, so
  // it's treated the same as having no category (falls back to "Blog").
  const term = item._embedded?.["wp:term"]?.[0]?.[0];
  const categoryLabel = term && term.name !== "Uncategorized" ? term.name.replace(/&amp;/g, "&") : null;
  return {
    slug: item.slug,
    title: (item.title?.rendered || "").replace(/&amp;/g, "&").replace(/&#8217;/g, "’"),
    desc: excerpt,
    image: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    categories: item.categories || [],
    categoryLabel,
    date: item.date,
  };
}

export function buildCategoryNameMap(categories) {
  return categories.reduce((map, c) => {
    map[c.id] = c.name;
    return map;
  }, {});
}

export function categoryNames(ids, categoriesMap) {
  return (ids || []).map((id) => categoriesMap[id]).filter(Boolean);
}

export function formatPostDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "";
  }
}

// "Why ABN Insights" horizontal story cards — content from
// design-concepts/ABN_Blogs_V4_Magnetic_Interactive_Concept.html's
// story-track (verbatim copy, this is real editorial content, not placeholder).
export const WHY_ABN_ITEMS = [
  { num: "01 · Real Practitioners", title: "Not theory. Practice.", desc: "Articles are written by people handling campaigns, SEO decisions, content systems and client growth work." },
  { num: "02 · Backed by Real Data", title: "Learn from what actually moved.", desc: "We publish ideas shaped by click data, search demand, user behaviour and implementation realities." },
  { num: "03 · Across One Junction", title: "Connected expertise.", desc: "Marketing, design, development, video and tracking do not live in silos here — and neither do the insights." },
  { num: "04 · Practical Usefulness", title: "Take something away.", desc: "Each article should leave readers with something they can test, fix, improve or think differently about." },
  { num: "05 · Brand-Led Thinking", title: "Results with context.", desc: "ABN's content is not just tactical — it is meant to show how business, content and growth connect together." },
];

// Tool rail — static, not fetched. Content ported from the concept's tool-rail.
// icon keys match BrandIcon.js, which ports the concept's own .tool-logo.*
// hand-drawn pseudo-element icons — not generic single-letter badges.
export const TOOLS_LIST = [
  { label: "Google Ads", icon: "ads" },
  { label: "Meta Ads", icon: "meta" },
  { label: "GA4 / GTM", icon: "ga4" },
  { label: "WordPress", icon: "wp" },
  { label: "Shopify", icon: "shop" },
  { label: "Search Console", icon: "search" },
  { label: "Merchant Center", icon: "merchant" },
  { label: "Next.js", icon: "next" },
  { label: "Figma", icon: "figma" },
  { label: "Analytics", icon: "analytics" },
];

// PLACEHOLDER fallback data, only used if the live /posts fetch fails.
// Real ABN Junction posts/images/slugs (pulled from the concept file's baked
// data), not fabricated content.
export const MOCK_CATEGORIES = [
  { id: 1, name: "Marketing Insights and Updates", count: 22 },
  { id: 2, name: "AI Tools & Trends", count: 13 },
  { id: 3, name: "The World of WordPress", count: 9 },
  { id: 4, name: "Brand Stories", count: 7 },
  { id: 5, name: "eCommerce & Marketplace SEO", count: 7 },
];

export const MOCK_POSTS = [
  { slug: "local-seo-for-small-businesses-in-2026", title: "Local SEO for Small Businesses in 2026: Turn Local Searches Into Real Customers", desc: "For a small business, being visible online is important. Reaching the right local customers is even more valuable when they're ready to contact you.", image: "https://abnjunction.com/wp-content/uploads/2026/08/ChatGPT-5.webp", categories: [1], categoryLabel: "eCommerce & Marketplace SEO", date: "2026-08-20" },
  { slug: "digital-marketing-for-hospitals", title: "Digital Marketing for Hospitals: Powerful Plan to Get More Patients", desc: "A focused digital marketing strategy for hospitals can turn website visitors into scheduled appointments within three months.", image: "https://abnjunction.com/wp-content/uploads/2026/08/digital-marketing-for-hospitals-in-chennai-banner.png", categories: [1], categoryLabel: "Marketing Insights and Updates", date: "2026-08-19" },
  { slug: "find-the-best-digital-marketing-agency", title: "Best Digital Marketing Agency: How to Choose the Right Partner for Your Business", desc: "Every growing business reaches a turning point. Marketing efforts begin to slow. Leads become inconsistent.", image: "https://abnjunction.com/wp-content/uploads/2026/07/Best.webp", categories: [1], categoryLabel: "Marketing Insights and Updates", date: "2026-08-17" },
  { slug: "search-generative-ai-performance-reports", title: "Why Generative AI Visibility Now Matters in SEO", desc: "What if your website appears inside Google's AI answers, but you never know it?", image: "https://abnjunction.com/wp-content/uploads/2026/08/ChatGPT-17-scaled.webp", categories: [1], categoryLabel: "Marketing Insights and Updates", date: "2026-08-16" },
  { slug: "how-to-get-more-customers-online", title: "The Real Data: A Chill Look at How to Get More Customers Online", desc: "At first glance, getting more customers online might appear simple enough.", image: "https://abnjunction.com/wp-content/uploads/2026/08/ChatGPT-4-scaled.webp", categories: [5], categoryLabel: "eCommerce & Marketplace SEO", date: "2026-08-15" },
  { slug: "ecommerce-seo-strategies", title: "10 Ultimate eCommerce SEO Strategies to Skyrocket your online sales", desc: "eCommerce SEO is the process of optimizing a store so it ranks higher and attracts genuine buyers.", image: "https://abnjunction.com/wp-content/uploads/2026/08/e-commerce-1.webp", categories: [5], categoryLabel: "eCommerce & Marketplace SEO", date: "2026-08-14" },
];
