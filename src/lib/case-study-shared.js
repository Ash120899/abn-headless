// Pure, isomorphic helpers + constants for the case-studies listing page.
// Safe to import from both server components (src/app/case-studies/page.js,
// src/lib/wp-case-studies.js) and 'use client' components — no fetch, no
// browser/Node-only globals here.

// metric: the first headline number from the case_details_section (e.g.
// "730% ROAS"), used for card pills that only show one number. metrics: the
// full label+value list from the same section, for callers (FeaturedGrid)
// that want to pick a specific metric TYPE per card rather than always the
// first one. Falls back to null/[], which callers should cover with a
// generic label — no fabricated numbers.
export function normalizeCaseStudy(item) {
  let desc = "";
  let metrics = [];
  const sections = item.acf && item.acf.content_sections;
  const hero = sections ? sections.find((s) => s.acf_fc_layout === "hero_section") : null;
  if (hero && hero.client_description) {
    desc = hero.client_description.replace(/<[^>]+>/g, "").trim().slice(0, 180);
  }
  const details = sections ? sections.find((s) => s.acf_fc_layout === "case_details_section") : null;
  if (details && Array.isArray(details.metrics)) {
    metrics = details.metrics
      .filter((m) => m && m.value)
      .map((m) => ({ label: String(m.label || "").trim(), value: String(m.value).trim() }));
  }
  const image =
    item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
  return {
    slug: item.slug,
    title: item.title.rendered.replace(/&amp;/g, "&"),
    categories: item.case_study_category || [],
    image,
    desc,
    metric: metrics.length ? metrics[0].value : null,
    metrics,
    date: item.date,
  };
}

// Finds a metric on a normalized case study whose label contains one of the
// given substrings (case-insensitive), in priority order. Used by
// FeaturedGrid to show a different metric TYPE per featured card (leads /
// reach / CPL) instead of always the first metric regardless of what it is.
export function findMetric(item, labelSubstrings) {
  if (!item?.metrics?.length) return null;
  for (const needle of labelSubstrings) {
    const found = item.metrics.find((m) => m.label.toLowerCase().includes(needle));
    if (found) return found;
  }
  return null;
}

export function parseMetricValue(str) {
  if (!str) return null;
  const s = String(str).replace(/₹|,|\+/g, "").trim();
  const m = s.match(/([\d.]+)\s*(K|L|M|Cr)?/i);
  if (!m) return null;
  let num = parseFloat(m[1]);
  if (Number.isNaN(num)) return null;
  const suf = (m[2] || "").toUpperCase();
  if (suf === "K") num *= 1e3;
  else if (suf === "L") num *= 1e5;
  else if (suf === "M") num *= 1e6;
  else if (suf === "CR") num *= 1e7;
  return num;
}

// Pulls testimonials, client logo IDs, and lead/reach/CPL metrics out of the
// full ACF content_sections payload for every case study (used for the
// numbers bar + testimonial carousel aggregate stats).
export function extractExtras(fullItems) {
  const testimonials = [];
  const logoIds = [];
  let leadsSum = 0;
  let reachSum = 0;
  let revenueSum = 0;
  let roasMax = null;
  const cplValues = [];

  fullItems.forEach((item) => {
    const sections = item.acf?.content_sections;
    if (!Array.isArray(sections)) return;

    sections.forEach((s) => {
      if (s.acf_fc_layout === "testimonial" && Array.isArray(s.testimonials)) {
        s.testimonials.forEach((t) => {
          if (t.namename) {
            testimonials.push({ slug: item.slug, name: t.namename, role: t.role, image: t.images?.url });
          }
        });
      }
      if (s.acf_fc_layout === "clients_section" && Array.isArray(s.logos)) {
        s.logos.forEach((l) => {
          if (l.image) logoIds.push(l.image);
        });
      }
      if (s.acf_fc_layout === "case_details_section" && Array.isArray(s.metrics)) {
        s.metrics.forEach((m) => {
          const val = parseMetricValue(m.value);
          if (val === null) return;
          const label = (m.label || "").toLowerCase();
          if (label.includes("lead")) leadsSum += val;
          if (label.includes("reach")) reachSum += val;
          if (label.includes("cpl")) cplValues.push(val);
          if (label.includes("revenue")) revenueSum += val;
          if (label.includes("roas")) roasMax = roasMax === null ? val : Math.max(roasMax, val);
        });
      }
    });
  });

  return {
    testimonials,
    logoIds: [...new Set(logoIds)].slice(0, 16),
    leadsSum,
    reachSum,
    revenueSum,
    roasMax,
    lowestCpl: cplValues.length ? Math.min(...cplValues) : null,
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

// Cycles 3 accent colors across Featured cards so each reads distinctly
// without inventing a new brand token — plain hex rather than the concept's
// own --yellow/--coral/--blue vars, since those don't exist in this app's
// design-token system (src/app/globals.css) and shouldn't be added just for
// this. Deliberately NOT tied to --accent (which flips with the theme
// toggle) so featured cards don't change color when the reader switches theme.
export const STORY_ACCENTS = ["#F5C242", "#FF7A66", "#4EA1F7"];

export const PROCESS_STEPS = [
  { title: "Discovery", desc: "We audit your current digital presence, competitors, and audience — no assumptions, just data." },
  { title: "Strategy", desc: "A tailored roadmap across the channels that actually move the needle for your business." },
  { title: "Execution", desc: "Campaigns go live, tracked and optimized in real time — not set-and-forget." },
  { title: "Results", desc: "Transparent reporting on the numbers that matter: leads, cost per lead, and revenue." },
];

// ---------------------------------------------------------------------------
// PLACEHOLDER CONTENT — ships intentionally (per product decision), each
// flagged below. None of these can be fixed by writing better code; they
// need real content from the client. See the punch list handed over after
// this page ships.
// ---------------------------------------------------------------------------

// PLACEHOLDER: the live WP testimonial ACF field is literally the same
// paragraph copy-pasted across all 10 case studies (every one mentions
// "Astra Ortho Hospital" regardless of the actual client) — a content bug in
// WP admin, not something worth reproducing. Names/roles/logos are real; this
// quote text is hand-written filler so the carousel doesn't visibly repeat
// itself. Replace once the WP testimonial content is fixed per-client.
export const CURATED_QUOTES = {
  "arena-animation-t-nagar": "ABN Junction turned a saturated market into our strongest-performing franchise. The lead flow speaks for itself.",
  "arena-animation-salem": "We didn't expect a tier-2 city campaign to outperform our metro branches, but that's exactly what happened.",
  "arena-animation-vellore": "Every rupee of ad spend was accounted for. Precision targeting turned into real enrollments, fast.",
  "arena-animation-velachery": "1,270+ leads from one campaign — numbers we hadn't seen before working with ABN Junction.",
  "shopify-seo-indexing-fix-turbolader24": "Our product pages went from invisible to fully indexed. ABN Junction fixed what previous agencies couldn't.",
  "g3-media-works-video-production-lead-generation": "Twenty years in business, and this was the first time our digital presence actually matched our reputation.",
  "healthy-moonbakes-redefining-the-art-of-healthy-baking-online": "They understood our brand instantly and built a digital identity that finally felt like us.",
  "moonbakes-baking-up-digital-success-with-smarter-strategies": "Local love turned into a real growth engine — ABN Junction made that transition seamless.",
  "astra-multispeciality-hospital-case-study-by-abn-junction": "Patients trust us more because our digital presence finally reflects the quality of care we provide.",
  "astra-ortho-hospital-case-study": "A simple subdomain strategy transformed our lead quality overnight. Small change, massive impact.",
};

// PLACEHOLDER: static rating — not fetched from Google. Needs either a live
// Google Places/Business Profile integration or manual periodic updates.
export const GOOGLE_RATING = {
  score: "4.9",
  count: "Based on 68 reviews",
  reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJyRXk285nUjoRi2HyfYnBHgA",
};

// PLACEHOLDER fallback data, only used if the live case_study fetch fails.
export const MOCK_CATEGORIES = [
  { id: 14, name: "Digital Marketing", slug: "digital-marketing", count: 10 },
  { id: 15, name: "Web & Graphics Design", slug: "web-graphics-design", count: 10 },
  { id: 16, name: "Web Development", slug: "web-development", count: 3 },
];

export const MOCK_CASE_STUDIES = [
  { slug: "arena-animation-t-nagar", title: "Arena Animation T. Nagar – Scaling Admissions with Precision Meta Ads", categories: [14, 15], image: "https://abnjunction.com/wp-content/uploads/2025/07/Arena-TNagar_.png", desc: "Arena Animation is a leading force in multimedia and animation education across India. The T Nagar franchise wanted to stand out in one of Chennai's busiest, most competitive educational zones.", metric: null, date: "2026-05-26" },
  { slug: "arena-animation-salem", title: "Arena Animation Salem — Tier-2 City, Full-Scale Digital Breakthrough", categories: [14, 15], image: "https://abnjunction.com/wp-content/uploads/2025/07/Arena-Salem.png", desc: "A globally trusted leader in creative education needed a tier-2 city breakthrough. Their Salem franchise partnered with us to build a full-scale digital presence from the ground up.", metric: null, date: "2026-05-26" },
  { slug: "arena-animation-vellore", title: "Driving Admissions for Arena Animation Vellore with Precision-Targeted Meta Ads", categories: [14, 15], image: "https://abnjunction.com/wp-content/uploads/2025/07/Arena-Vellore.png", desc: "A globally renowned training institute needed to earn local credibility fast. Precision-targeted Meta Ads turned regional interest into enrolled students.", metric: null, date: "2026-05-26" },
  { slug: "arena-animation-velachery", title: "Arena Animation Velachery — 1270+ Leads with Meta & Google Ads", categories: [14, 15], image: "https://abnjunction.com/wp-content/uploads/2025/07/Arena-Velacherry.png", desc: "A new franchise launch in Velachery, Chennai needed rapid lead volume. Combined Meta and Google Ads strategy delivered over 1,270 qualified leads.", metric: "1,270+ Leads", date: "2026-05-26" },
  { slug: "shopify-seo-indexing-fix-turbolader24", title: "Fixing Shopify SEO & Indexing Issues — Scaling Turbolader24 to 10,000+ Indexed Pages", categories: [14, 15], image: "https://abnjunction.com/wp-content/uploads/2026/03/Turbolader-24-Logo.webp", desc: "A Germany-based auto-parts eCommerce store was invisible on search. We stabilized their Shopify SEO foundation and scaled to 10,000+ indexed product pages.", metric: "10,000+ Pages Indexed", date: "2026-03-01" },
  { slug: "g3-media-works-video-production-lead-generation", title: "Case Study of G3 Media Works Lead Generation", categories: [14, 15], image: "https://abnjunction.com/wp-content/uploads/2026/02/G3-1.webp", desc: "A 20-year video production house needed modern digital authority. We repositioned their brand and rebuilt their lead generation from scratch.", metric: null, date: "2026-02-15" },
  { slug: "healthy-moonbakes-redefining-the-art-of-healthy-baking-online", title: "Healthy Moonbakes: Redefining the Art of Healthy Baking Online", categories: [14, 15], image: "https://abnjunction.com/wp-content/uploads/2025/05/Healthy-Moonbakes-2.png", desc: "The healthier spin-off of the renowned Moonbakes bakery needed its own digital identity. We built a presence as distinctive as the product.", metric: null, date: "2025-05-20" },
  { slug: "moonbakes-baking-up-digital-success-with-smarter-strategies", title: "Moonbakes: Baking Up Digital Success with Smarter Strategies", categories: [14, 15, 16], image: "https://abnjunction.com/wp-content/uploads/2025/05/Moonbakes-2.png", desc: "A Tamil Nadu-based bakery with strong local love needed smarter digital strategy to match. We turned that local love into a scalable growth engine.", metric: "730% ROAS", date: "2025-05-18" },
  { slug: "astra-multispeciality-hospital-case-study-by-abn-junction", title: "Astra Multispeciality Hospital Case Study", categories: [14, 15, 16], image: "https://abnjunction.com/wp-content/uploads/2025/05/Astra-Speciality.png", desc: "One of Chennai's most reliable multispeciality hospitals needed a digital presence as trustworthy as its care. We delivered exactly that.", metric: null, date: "2025-05-15" },
  { slug: "astra-ortho-hospital-case-study", title: "Astra Ortho Hospital Case Study", categories: [14, 15, 16], image: "https://abnjunction.com/wp-content/uploads/2025/05/Astra-Ortho-1.png", desc: "Born from a founder's frustration with impersonal healthcare, Astra Ortho needed a digital presence that put patients first. A subdomain strategy transformed lead quality.", metric: "18.18% Conversion Rate", date: "2025-05-20" },
];

export const MOCK_TESTIMONIALS = [
  { slug: "arena-animation-t-nagar", name: "Iniyan", role: "Arena Animation T. Nagar", image: "https://abnjunction.com/wp-content/uploads/2025/07/Client-Logo.png" },
  { slug: "arena-animation-vellore", name: "Charu", role: "Arena Animation Vellore", image: "https://abnjunction.com/wp-content/uploads/2025/01/Arena-Vellore-Logo.png" },
  { slug: "shopify-seo-indexing-fix-turbolader24", name: "Dipen Parmar", role: "Turbolader24", image: "https://abnjunction.com/wp-content/uploads/2026/03/Turbolader-24-Logo.webp" },
  { slug: "g3-media-works-video-production-lead-generation", name: "Arun Gopal", role: "G3 Media Works", image: "https://abnjunction.com/wp-content/uploads/2026/02/G3-2.webp" },
  { slug: "moonbakes-baking-up-digital-success-with-smarter-strategies", name: "Surrabi", role: "Moonbakes", image: "https://abnjunction.com/wp-content/uploads/2025/01/Moonbakes-Logo.png" },
  { slug: "astra-ortho-hospital-case-study", name: "Sameer", role: "Astra Ortho Hospital", image: "https://abnjunction.com/wp-content/uploads/2025/01/Astra-Ortho-Logo.png" },
];

export const MOCK_LOGOS = [
  "https://abnjunction.com/wp-content/uploads/2025/07/JHR-Associates-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/Code-Green-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/OKS-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/Maruthi-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/Bike-Doctor-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/Daily-Drive-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/Nimis-Boutique-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/Aum-Yoga-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/Arena-Velachery-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/Arena-Vellore-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/Client-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/Arena-Salem-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/ST-Johns-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/Ascent-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/Astra-Ortho-Logo.png",
  "https://abnjunction.com/wp-content/uploads/2025/07/Vansun-Logo.png",
];

// Real aggregates computed once from live metrics data (see extractExtras) —
// used only as the fallback if the live fetch fails.
export const MOCK_AGGREGATES = { leads: 6516, reachM: 6.5, lowestCpl: "₹3.24", roas: 13, revenueL: 75 };

// Honest generic fallback (not fabricated post data) — used only if the live
// /posts fetch fails. All three intentionally point at the blog index rather
// than a specific (nonexistent) post.
export const FALLBACK_INSIGHTS = [
  { label: "Paid Media", title: "How to scale ROAS without losing profitability", desc: "Budget control, signal quality and testing structure for sustainable performance.", href: "https://abnjunction.com/blogs/" },
  { label: "SEO", title: "Why large product catalogues stay invisible on Google", desc: "Architecture, crawlability and indexing decisions behind scalable search growth.", href: "https://abnjunction.com/blogs/" },
  { label: "Conversion", title: "Traffic is not growth until the journey converts", desc: "How messaging, design, development and tracking connect to commercial outcomes.", href: "https://abnjunction.com/blogs/" },
];
