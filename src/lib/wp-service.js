// Server-only data layer for the service pages: fetches the WP page for a
// slug and folds its ACF values over the code defaults in
// service-content.js.
//
// The merge itself lives in acf-merge.js, shared with service-content.js.
import { getServiceContent } from "./service-content";
import { mergeServiceContent, collectAttachmentIds } from "./acf-merge";

const WP_API_URL = "https://abnjunction.com/wp-json/wp/v2";

async function fetchWithRetry(url, { tries = 2, timeoutMs = 5000, backoffMs = 400, revalidate = 300 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      const res = await fetch(url, { next: { revalidate }, signal: AbortSignal.timeout(timeoutMs) });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const text = await res.text();
      if (!text) throw new Error("empty body");
      return JSON.parse(text);
    } catch (err) {
      lastErr = err;
      if (attempt < tries - 1) await new Promise((r) => setTimeout(r, backoffMs));
    }
  }
  throw lastErr;
}
/**
 * Turns attachment IDs into URLs, in one request for the whole page.
 *
 * ACF image fields return a bare ID when the field's Return Format is set to
 * "Image ID" rather than "Image URL" — which is how the live field group is
 * configured. Resolving here means the page renders uploaded artwork either
 * way, without depending on a setting in the WP admin staying put.
 *
 * Returns {} on failure so images fall back to the built-in art rather than
 * taking the page down.
 */
async function resolveAttachments(ids) {
  if (!ids.length) return {};
  try {
    const media = await fetchWithRetry(
      `${WP_API_URL}/media?include=${ids.join(",")}&per_page=${Math.min(ids.length, 100)}&_fields=id,source_url`
    );
    if (!Array.isArray(media)) return {};
    return Object.fromEntries(
      media.filter((m) => m?.id && m?.source_url).map((m) => [m.id, m.source_url])
    );
  } catch (err) {
    console.warn("resolveAttachments: falling back to built-in artwork", err);
    return {};
  }
}

/**
 * Content for one service page: code defaults, with this page's ACF folded
 * over the top. Returns null for a slug that isn't a known service.
 *
 * A WP failure is not fatal — the defaults render on their own, which keeps
 * the page up if the API is slow or down.
 */
export async function getServicePage(slug) {
  const base = getServiceContent(slug);
  if (!base) return null;

  try {
    const pages = await fetchWithRetry(
      `${WP_API_URL}/pages?slug=${encodeURIComponent(slug)}&_fields=id,slug,acf`
    );
    const page = Array.isArray(pages) ? pages.find((p) => p.slug === slug) : null;
    if (!page?.acf) return base;
    const media = await resolveAttachments(collectAttachmentIds(page.acf));
    return mergeServiceContent(base, page.acf, media);
  } catch (err) {
    console.warn(`getServicePage(${slug}): falling back to built-in content`, err);
    return base;
  }
}
