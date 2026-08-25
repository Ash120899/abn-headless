// Server-only data layer for the case-studies listing page
// (src/app/case-studies/page.js). Mirrors the fetch/retry/metadata pattern
// already established in src/app/case-studies/[slug]/page.js.
import {
  normalizeCaseStudy,
  extractExtras,
  MOCK_CATEGORIES,
  MOCK_CASE_STUDIES,
  MOCK_TESTIMONIALS,
  MOCK_LOGOS,
  MOCK_AGGREGATES,
  FALLBACK_INSIGHTS,
} from "./case-study-shared";

export const WP_API_URL = "https://abnjunction.com/wp-json/wp/v2";

// The case_study REST endpoint silently returns an empty 200 body once the
// serialized (_embed'd, ACF-heavy) response exceeds ~900KB — reproducible at
// per_page=7+, reliable at per_page<=6. Every call below respects this.
const MAX_CASE_STUDY_PER_PAGE = 6;

async function fetchWithRetry(url, { tries = 2, timeoutMs = 5000, backoffMs = 500, revalidate = 300 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      const res = await fetch(url, { next: { revalidate }, signal: AbortSignal.timeout(timeoutMs) });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const text = await res.text();
      if (!text) throw new Error("empty body"); // exactly the ~900KB-cap failure mode
      return { data: JSON.parse(text), headers: res.headers };
    } catch (err) {
      lastErr = err;
      if (attempt < tries - 1) await new Promise((r) => setTimeout(r, backoffMs));
    }
  }
  throw lastErr;
}

export async function getCategories() {
  try {
    const { data } = await fetchWithRetry(`${WP_API_URL}/case_study_category?per_page=50`);
    return data
      .filter((c) => c.count > 0)
      .map((c) => ({
        id: c.id,
        count: c.count,
        name: c.name
          .replace(/&amp;/g, "&")
          .replace("DEISGN", "DESIGN")
          .toLowerCase()
          .replace(/\b\w/g, (m) => m.toUpperCase()),
      }));
  } catch (err) {
    console.warn("getCategories: falling back to mock", err);
    return MOCK_CATEGORIES;
  }
}

export async function getTotalCount() {
  try {
    const { headers } = await fetchWithRetry(`${WP_API_URL}/case_study?per_page=1`);
    return +headers.get("X-WP-Total") || MOCK_CASE_STUDIES.length;
  } catch {
    return MOCK_CASE_STUDIES.length;
  }
}

/**
 * @param {{page?:number, perPage?:number, categoryId?:string|number}} opts
 * @returns {Promise<{items: Array, totalPages: number}>}
 */
export async function getCaseStudies({ page = 1, perPage = MAX_CASE_STUDY_PER_PAGE, categoryId = "all" } = {}) {
  if (perPage > MAX_CASE_STUDY_PER_PAGE) {
    throw new Error(
      `getCaseStudies: perPage=${perPage} exceeds the case_study endpoint's ~900KB response cap (max ${MAX_CASE_STUDY_PER_PAGE}). Paginate instead of raising this.`
    );
  }
  const params = new URLSearchParams({ per_page: perPage, page, _embed: 1, orderby: "date", order: "desc" });
  if (categoryId && categoryId !== "all") params.set("case_study_category", categoryId);

  try {
    const { data, headers } = await fetchWithRetry(`${WP_API_URL}/case_study?${params}`);
    return {
      items: data.map(normalizeCaseStudy),
      totalPages: +headers.get("X-WP-TotalPages") || 1,
    };
  } catch (err) {
    console.warn("getCaseStudies: live fetch failed", err);
    throw err; // no silent mock swap for the real grid — caller renders an error+retry state
  }
}

export async function getFeaturedCaseStudies() {
  try {
    const { items } = await getCaseStudies({ perPage: 3, categoryId: "all" });
    return items;
  } catch (err) {
    console.warn("getFeaturedCaseStudies: falling back to mock", err);
    return MOCK_CASE_STUDIES.slice(0, 3);
  }
}

// Fetches every case study's full ACF content (testimonials, client logos,
// results metrics live inside content_sections, not just the hero) across
// however many pages are needed to stay under the per-request cap above.
async function loadFullCaseStudyData(totalCount) {
  const pages = Math.max(1, Math.ceil(totalCount / MAX_CASE_STUDY_PER_PAGE));
  const results = await Promise.all(
    Array.from({ length: pages }, (_, i) =>
      fetchWithRetry(`${WP_API_URL}/case_study?per_page=${MAX_CASE_STUDY_PER_PAGE}&_embed&page=${i + 1}`)
    )
  );
  return results.flatMap(({ data }) => data);
}

// Single batched request instead of one round-trip per logo — WP's media
// endpoint accepts `include` for exactly this.
async function resolveLogoUrls(ids) {
  if (!ids.length) return [];
  try {
    const { data } = await fetchWithRetry(`${WP_API_URL}/media?include=${ids.join(",")}&per_page=${ids.length}`);
    const byId = new Map(data.map((m) => [m.id, m.source_url]));
    return ids.map((id) => byId.get(id)).filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Aggregate stats + testimonials + client logos for the numbers bar and
 * testimonial carousel. This is the "expensive" full-ACF fetch, deliberately
 * done server-side (unlike the concept's client-only two-phase load) so the
 * numbers/testimonials section is fully SSR'd and crawlable.
 */
export async function getAggregateData(totalCount) {
  try {
    const fullData = await loadFullCaseStudyData(totalCount);
    const extras = extractExtras(fullData);
    const logoUrls = await resolveLogoUrls(extras.logoIds);
    return {
      testimonials: extras.testimonials,
      logoUrls,
      leadsSum: extras.leadsSum,
      reachSum: extras.reachSum,
      lowestCpl: extras.lowestCpl,
    };
  } catch (err) {
    console.warn("getAggregateData: falling back to mock", err);
    return {
      testimonials: MOCK_TESTIMONIALS,
      logoUrls: MOCK_LOGOS,
      leadsSum: MOCK_AGGREGATES.leads,
      reachSum: MOCK_AGGREGATES.reachM * 1e6,
      lowestCpl: MOCK_AGGREGATES.lowestCpl,
    };
  }
}

export async function getInsightsPosts() {
  try {
    const { data } = await fetchWithRetry(`${WP_API_URL}/posts?per_page=3&_embed`, { tries: 2 });
    if (!data.length) throw new Error("no posts");
    return data.map((p) => {
      const term = p._embedded?.["wp:term"]?.[0]?.[0];
      return {
        label: term ? term.name : "Blog",
        title: p.title.rendered.replace(/&amp;/g, "&"),
        desc: p.excerpt.rendered.replace(/<[^>]+>/g, "").trim().slice(0, 120),
        image: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        href: `/blog/${p.slug}`, // internal route — this app already serves it
      };
    });
  } catch (err) {
    console.warn("getInsightsPosts: falling back to generic blog links", err);
    return FALLBACK_INSIGHTS.map((item) => ({ ...item, href: "/blog" }));
  }
}
