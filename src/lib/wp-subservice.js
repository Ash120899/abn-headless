// Server-only data layer for the sub-service pages
// (/services/<service>/<sub-service>/): fetches the WP page and its parent
// service page, and builds the page content from the page's ACF fields.
//
// WordPress is the only source of content in production. The ACF-to-content
// mapping lives in subservice-acf.js.
import { cache } from "react";
import { buildSubserviceContent, collectAttachmentIds } from "./subservice-acf";
import { wpEdgeCache } from "./wp-edge-cache";

const WP_API_URL = "https://abnjunction.com/wp-json/wp/v2";

// The "Services" page. Every service page is a child of it; every
// sub-service page is a child of a service page.
const SERVICES_PARENT_ID = 1023;

async function fetchWithRetry(url, { tries = 2, timeoutMs = 5000, backoffMs = 400, revalidate = 300 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      const res = await fetch(url, { ...wpEdgeCache, next: { revalidate }, signal: AbortSignal.timeout(timeoutMs) });
      if (!res.ok) throw Object.assign(new Error(`status ${res.status}`), { status: res.status });
      const text = await res.text();
      if (!text) throw new Error("empty body");
      return JSON.parse(text);
    } catch (err) {
      lastErr = err;
      // Retrying a rate limit only adds to it.
      if (err.status === 429) break;
      if (attempt < tries - 1) await new Promise((r) => setTimeout(r, backoffMs));
    }
  }
  throw lastErr;
}

/**
 * Turns attachment IDs into {url, alt}, in one request for the whole page.
 * Returns {} on failure, so the page still renders its copy with the images
 * left out rather than going down.
 */
async function resolveAttachments(ids) {
  if (!ids.length) return {};
  try {
    const media = await fetchWithRetry(
      `${WP_API_URL}/media?include=${ids.join(",")}&per_page=${Math.min(ids.length, 100)}&_fields=id,source_url,alt_text`
    );
    if (!Array.isArray(media)) return {};
    return Object.fromEntries(
      media
        .filter((m) => m?.id && m?.source_url)
        .map((m) => [m.id, { url: m.source_url, alt: typeof m.alt_text === "string" ? m.alt_text.trim() : "" }])
    );
  } catch (err) {
    console.warn("resolveAttachments: rendering without artwork", err);
    return {};
  }
}

// WP titles arrive HTML-escaped ("Web &amp; Data Security").
function decodeTitle(value) {
  return (value || "")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/&#8211;/g, "–")
    .replace(/&#038;/g, "&");
}

// An empty ACF payload comes back as [] (or is missing entirely on pages
// no field group applies to).
function hasAcf(acf) {
  return Boolean(acf) && typeof acf === "object" && !Array.isArray(acf);
}

// Once the field group is imported, every child page returns an object of
// empty fields, so only a filled-in hero counts as having content.
function hasContent(acf) {
  return hasAcf(acf) && Boolean(acf.hero_heading_before || acf.hero_heading_highlight || acf.hero_heading_after);
}

/**
 * LOCAL PREVIEW ONLY. In `next dev`, a sub-service whose WP page has no ACF
 * yet (field group not imported, or the page not created) renders from its
 * seed file in acf/subservice-content/<service>/<sub-service>.mjs instead
 * of 404ing, so the layout can be checked before anything is pushed to
 * WordPress. The NODE_ENV check is replaced at build time, so production
 * builds drop this branch and never read those files.
 */
async function loadPreviewAcf(serviceSlug, slug) {
  if (process.env.NODE_ENV !== "development") return null;
  try {
    const mod = await import(`../../acf/subservice-content/${serviceSlug}/${slug}.mjs`);
    return hasAcf(mod.acf) ? mod.acf : null;
  } catch {
    return null;
  }
}

/**
 * Content for one sub-service page, built entirely from WordPress. Returns
 * null when the service doesn't exist, or the sub-service isn't one of its
 * child pages with the ACF field group filled in.
 *
 * A WP failure throws rather than returning null, so an API outage shows
 * the error page instead of being cached as a 404.
 *
 * Wrapped in React `cache()` so generateMetadata and the page body share
 * one result per request.
 */
export const getSubservicePage = cache(async function getSubservicePage(serviceSlug, slug) {
  // Both lookups at once: the child is matched to the parent by ID
  // afterwards, rather than waiting for the parent's ID to filter on.
  const [parents, pages] = await Promise.all([
    fetchWithRetry(
      `${WP_API_URL}/pages?slug=${encodeURIComponent(serviceSlug)}&parent=${SERVICES_PARENT_ID}` +
        `&_fields=id,slug,title,acf.color_primary,acf.color_primary_light,acf.color_accent,acf.cases_category`
    ),
    fetchWithRetry(
      `${WP_API_URL}/pages?slug=${encodeURIComponent(slug)}&_fields=id,slug,parent,title,acf,aioseo_head_json`
    ),
  ]);

  const parent = Array.isArray(parents) ? parents.find((p) => p.slug === serviceSlug) : null;
  if (!parent) return null;

  const page = Array.isArray(pages) ? pages.find((p) => p.slug === slug && p.parent === parent.id) : null;

  let acf = hasContent(page?.acf) ? page.acf : null;
  let preview = false;
  if (!acf) {
    acf = await loadPreviewAcf(serviceSlug, slug);
    preview = Boolean(acf);
  }
  if (!acf) return null;

  const media = await resolveAttachments(collectAttachmentIds(acf));
  const content = buildSubserviceContent(acf, media, { acf: hasAcf(parent.acf) ? parent.acf : {} });
  const seo = page?.aioseo_head_json || {};
  const title = decodeTitle(page?.title?.rendered) || content.crumbLabel;

  return {
    slug,
    title,
    preview,
    parent: {
      slug: parent.slug,
      title: decodeTitle(parent.title?.rendered),
    },
    seo: {
      title: seo.title || "",
      description: seo.description || content.metaDescription,
      canonical: seo.canonical_url || "",
      image: seo["og:image"] || content.hero.image?.url || null,
    },
    ...content,
  };
});
