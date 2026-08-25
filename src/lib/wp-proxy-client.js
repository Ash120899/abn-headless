"use client";

// Browser-side counterpart to src/lib/wp-case-studies.js — used only by
// client components that need to refetch after the initial SSR (filter
// change / load-more on the case-studies grid). Routes through
// /api/wp-proxy since the browser can't hit abnjunction.com directly
// (same CORS workaround OtherCasesSlider.js/OtherBlogsSlider.js already use).
import { normalizeCaseStudy } from "./case-study-shared";

const PROXY_URL = "/api/wp-proxy";
const MAX_CASE_STUDY_PER_PAGE = 6;

async function fetchWithRetry(url, { tries = 2, backoffMs = 500 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const text = await res.text();
      if (!text) throw new Error("empty body");
      return { data: JSON.parse(text), headers: res.headers };
    } catch (err) {
      lastErr = err;
      if (attempt < tries - 1) await new Promise((r) => setTimeout(r, backoffMs));
    }
  }
  throw lastErr;
}

/**
 * Client-side case-study page fetch for filter changes / "Load more".
 * @param {{page?:number, perPage?:number, categoryId?:string|number}} opts
 * @returns {Promise<{items: Array, totalPages: number}>}
 */
export async function fetchCaseStudiesClient({ page = 1, perPage = MAX_CASE_STUDY_PER_PAGE, categoryId = "all" } = {}) {
  if (perPage > MAX_CASE_STUDY_PER_PAGE) {
    throw new Error(`fetchCaseStudiesClient: perPage=${perPage} exceeds the case_study endpoint's response cap.`);
  }
  const params = new URLSearchParams({ path: "case_study", per_page: perPage, page, _embed: 1, orderby: "date", order: "desc" });
  if (categoryId && categoryId !== "all") params.set("case_study_category", categoryId);

  const { data, headers } = await fetchWithRetry(`${PROXY_URL}?${params}`);
  return {
    items: data.map(normalizeCaseStudy),
    totalPages: +headers.get("X-WP-TotalPages") || 1,
  };
}
