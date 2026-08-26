"use client";

// Browser-side counterpart to src/lib/wp-blog.js — used only by BlogGrid
// after the initial SSR (filter change / load-more). Routes through
// /api/wp-proxy since the browser can't hit abnjunction.com directly.
import { normalizeBlogPost } from "./blog-shared";

const PROXY_URL = "/api/wp-proxy";

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
 * @param {{page?:number, perPage?:number, categoryId?:string|number, search?:string}} opts
 * @returns {Promise<{items: Array, totalPages: number}>}
 */
export async function fetchPostsClient({ page = 1, perPage = 9, categoryId = "all", search = "" } = {}) {
  const params = new URLSearchParams({ path: "posts", per_page: perPage, page, _embed: 1, orderby: "date", order: "desc" });
  if (categoryId && categoryId !== "all") params.set("categories", categoryId);
  if (search) params.set("search", search);

  const { data, headers } = await fetchWithRetry(`${PROXY_URL}?${params}`);
  return {
    items: data.map(normalizeBlogPost),
    totalPages: +headers.get("X-WP-TotalPages") || 1,
  };
}
