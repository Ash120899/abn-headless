// Pure, isomorphic helpers + constants for the /blogs listing page. Mirrors
// src/lib/case-study-shared.js's shape (normalize/category helpers + a
// clearly-flagged mock fallback), kept self-contained rather than importing
// from case-study-shared so this listing doesn't depend on another
// feature's internals.

export function normalizeBlogPost(item) {
  const excerpt = (item.excerpt?.rendered || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&hellip;|\[&hellip;\]/g, "…")
    .trim();
  const term = item._embedded?.["wp:term"]?.[0]?.[0];
  return {
    slug: item.slug,
    title: (item.title?.rendered || "").replace(/&amp;/g, "&").replace(/&#8217;/g, "’"),
    desc: excerpt,
    image: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    categories: item.categories || [],
    categoryLabel: term ? term.name.replace(/&amp;/g, "&") : null,
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
export const TOOLS_LIST = [
  { label: "Google Ads", badge: "G", color: "#5bb8ff" },
  { label: "Meta Ads", badge: "∞", color: "#5ba6ff" },
  { label: "GA4 / GTM", badge: "A", color: "#f0ad54" },
  { label: "WordPress", badge: "W", color: "#1e2f3d" },
  { label: "Shopify", badge: "S", color: "#86c268" },
  { label: "Search Console", badge: "G", color: "#6abcf7" },
  { label: "Merchant Center", badge: "M", color: "#f5d3a6" },
  { label: "Next.js", badge: "N", color: "#111111" },
  { label: "Figma", badge: "F", color: "#7d6bff" },
  { label: "Analytics", badge: "A", color: "#8ec8b6" },
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
