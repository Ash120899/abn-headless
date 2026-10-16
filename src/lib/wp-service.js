// Server-only data layer for the service pages: fetches the WP page for a
// slug and builds the page content from its ACF fields.
//
// WordPress is the only source of content, artwork and colour — there is no
// built-in copy behind it. The ACF-to-content mapping lives in
// service-acf.js.
import { buildServiceContent, collectAttachmentIds } from "./service-acf";

const WP_API_URL = "https://abnjunction.com/wp-json/wp/v2";

// The "Services" page. Every service page is a child of it, and the ACF
// field group's location rule is `page_parent == 1023`.
const SERVICES_PARENT_ID = 1023;

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
 * Returns {} on failure, so the page still renders its copy with the images
 * left out rather than going down.
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

/**
 * Content for one service page, built entirely from WordPress. Returns null
 * when no service page (a child of the Services page with the ACF field
 * group filled in) exists for the slug.
 *
 * A WP failure throws rather than returning null, so an API outage shows
 * the error page instead of being cached as a 404.
 */
export async function getServicePage(slug) {
  const pages = await fetchWithRetry(
    `${WP_API_URL}/pages?slug=${encodeURIComponent(slug)}&parent=${SERVICES_PARENT_ID}&_fields=id,slug,title,acf,aioseo_head_json`
  );
  const page = Array.isArray(pages) ? pages.find((p) => p.slug === slug) : null;
  // An empty ACF payload comes back as [], not {}.
  if (!page?.acf || Array.isArray(page.acf)) return null;

  const media = await resolveAttachments(collectAttachmentIds(page.acf));
  const content = buildServiceContent(page.acf, media);
  const seo = page.aioseo_head_json || {};

  return {
    slug: page.slug,
    title: decodeTitle(page.title?.rendered),
    seo: {
      title: seo.title || "",
      description: seo.description || content.metaDescription,
      canonical: seo.canonical_url || "",
      image: seo["og:image"] || content.hero.character,
    },
    ...content,
  };
}
