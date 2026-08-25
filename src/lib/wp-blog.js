// Server-only data layer for the /blogs listing page (src/app/blogs/page.js).
// Mirrors the fetch/retry/pagination pattern established in
// src/lib/wp-case-studies.js. Standard WP `posts` are much lighter than
// case_study's ACF-heavy payload, so there's no per-request size cap to
// respect here.
import { normalizeBlogPost, MOCK_CATEGORIES, MOCK_POSTS } from "./blog-shared";

export const WP_API_URL = "https://abnjunction.com/wp-json/wp/v2";

async function fetchWithRetry(url, { tries = 2, timeoutMs = 5000, backoffMs = 500, revalidate = 300 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      const res = await fetch(url, { next: { revalidate }, signal: AbortSignal.timeout(timeoutMs) });
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

export async function getCategories() {
  try {
    const { data } = await fetchWithRetry(`${WP_API_URL}/categories?per_page=50&orderby=count&order=desc`);
    return data
      .filter((c) => c.count > 0 && c.slug !== "uncategorized")
      .map((c) => ({ id: c.id, count: c.count, name: c.name.replace(/&amp;/g, "&") }));
  } catch (err) {
    console.warn("getCategories: falling back to mock", err);
    return MOCK_CATEGORIES;
  }
}

export async function getTotalCount() {
  try {
    const { headers } = await fetchWithRetry(`${WP_API_URL}/posts?per_page=1`);
    return +headers.get("X-WP-Total") || MOCK_POSTS.length;
  } catch {
    return MOCK_POSTS.length;
  }
}

/**
 * @param {{page?:number, perPage?:number, categoryId?:string|number}} opts
 * @returns {Promise<{items: Array, totalPages: number}>}
 */
export async function getPosts({ page = 1, perPage = 9, categoryId = "all" } = {}) {
  const params = new URLSearchParams({ per_page: perPage, page, _embed: 1, orderby: "date", order: "desc" });
  if (categoryId && categoryId !== "all") params.set("categories", categoryId);

  try {
    const { data, headers } = await fetchWithRetry(`${WP_API_URL}/posts?${params}`);
    return {
      items: data.map(normalizeBlogPost),
      totalPages: +headers.get("X-WP-TotalPages") || 1,
    };
  } catch (err) {
    console.warn("getPosts: live fetch failed", err);
    throw err; // no silent mock swap for the real grid — caller renders an error+retry state
  }
}
