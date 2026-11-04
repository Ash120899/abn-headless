/**
 * Cloudflare Worker for ABN Headless (deployed as `falling-flower-b107`,
 * route abnjunction.com/*). Paste into the dashboard: Workers & Pages ->
 * falling-flower-b107 -> Edit code -> Deploy. Not deployed by the Pages
 * build; this file is the version-controlled copy.
 *
 * - Routes the migrated Next.js pages to Cloudflare Pages
 * - Routes everything else to the WordPress backend (Hostinger)
 * - Caches public WordPress REST GETs (/wp-json/...) at the edge
 * - Keeps the last good copy of each Next.js page, for when a render fails
 *
 * Why the cache: Hostinger throttles each client IP at roughly 30 requests
 * per 30 seconds, before PHP runs (429, empty body, `platform: hostinger`).
 * Every server-side request from the Next.js app reaches WordPress from the
 * same Cloudflare IP (2a06:98c0:3600::103), so a few page views in a row
 * exhausted that budget and the pages 500'd. With this cache each REST URL
 * reaches Hostinger at most once per FRESH_SECONDS, and if Hostinger does
 * throttle or fail, the last good copy is served instead (stale-if-error).
 *
 * The REST cache can't help a URL that isn't cached yet: while Hostinger is
 * throttling, one such URL still 500s the whole page (seen on /blogs and the
 * sub-service pages, 2026-11-04). So pages keep a last good copy as well.
 */

const PAGES_ORIGIN = "https://abn-headless.pages.dev";

// How long a cached REST response is served without asking WordPress.
// WP edits show on the site within this window.
const FRESH_SECONDS = 300;
// How long a stale copy is kept as a fallback for when WordPress is
// throttling or down.
const STALE_SECONDS = 86400;
// How long a cached page is served without re-rendering it. Short on purpose:
// a re-render reads from the REST cache above, so it costs WordPress little,
// and the stale copy is what keeps a page up. A WP edit shows on a page within
// FRESH_SECONDS + PAGE_FRESH_SECONDS.
const PAGE_FRESH_SECONDS = 60;

// Sub-service pages whose ACF content is filled in. Listed one by one, not as
// /services/*/*: the Next.js route 404s a page without content, and WordPress
// should keep serving any nested URL that isn't ready.
const SUBSERVICE_PATHS = new Set([
  "/services/digital-marketing/performance-marketing",
  "/services/digital-marketing/analytics-conversion-tracking",
  "/services/digital-marketing/meta-ads",
  "/services/web-and-graphic-design/branding-visual-identity",
  "/services/web-and-graphic-design/campaign-content-design",
  "/services/web-development/performance-infrastructure",
  "/services/web-development/maintenance-iteration",
  "/services/video-production/production-direction",
  "/services/video-production/campaign-platform-delivery",
  "/services/digital-marketing/seo",
  "/services/digital-marketing/social-media-marketing",
  "/services/digital-marketing/social-media-optimization",
  "/services/digital-marketing/search-engine-marketing",
  "/services/digital-marketing/programmatic-advertising",
  "/services/digital-marketing/email-whatsapp-marketing",
  "/services/web-and-graphic-design/ui-ux-design",
  "/services/web-and-graphic-design/web-design",
  "/services/web-and-graphic-design/graphic-design",
  "/services/web-and-graphic-design/illustrations-3d-designs",
  "/services/web-development/website-development",
  "/services/web-development/content-management-system",
  "/services/web-development/app-development",
  "/services/web-development/adaptive-software-development",
  "/services/video-production/content-marketing",
  "/services/video-production/video-editing",
  "/services/video-production/vfx-animation",
  "/services/video-production/audio-editing-sfx",
  "/services/web-data-security/network-penetration-testing",
  "/services/web-data-security/server-penetration-testing",
  "/services/web-data-security/ethical-hacking",
  "/services/web-data-security/ethical-hacking-bug-bounty",
  "/services/web-data-security/firewall-datasecuity",
]);

// Paths served by the Next.js app on Cloudflare Pages.
function isPagesPath(pathname) {
  return (
    /^\/case-studies\/[^\/]+\/?$/.test(pathname) || // /case-studies/[slug]
    /^\/blog\/[^\/]+\/?$/.test(pathname) || // /blog/[slug]
    /^\/services\/[^\/]+\/?$/.test(pathname) || // /services/[slug], first-level only
    SUBSERVICE_PATHS.has(pathname.replace(/\/$/, "")) ||
    pathname === "/contact-us" ||
    pathname === "/contact-us/" ||
    pathname.startsWith("/contact/") || // contact page artwork
    pathname === "/privacy-policy" ||
    pathname === "/privacy-policy/" ||
    pathname === "/case-studies" ||
    pathname === "/case-studies/" ||
    pathname === "/blogs" ||
    pathname === "/blogs/" ||
    pathname === "/blog" ||
    pathname === "/blog/" ||
    pathname.startsWith("/api/") || // wp-proxy REST bridge and other API routes
    pathname.startsWith("/_next/") // Next.js assets
  );
}

// Only anonymous, public REST reads are cached. Anything carrying a login
// (editor sessions, block editor, previews, application passwords) goes
// straight to WordPress so nobody ever sees someone else's private data.
function isAnonymousGet(request) {
  if (request.method !== "GET") return false;
  if (request.headers.has("Authorization") || request.headers.has("X-WP-Nonce")) return false;
  const cookie = request.headers.get("Cookie") || "";
  if (/wordpress_logged_in|wp-postpass|wordpress_sec/.test(cookie)) return false;
  return true;
}

function isCacheableRest(request, url) {
  return url.pathname.startsWith("/wp-json/") && isAnonymousGet(request);
}

// Rendered pages only. Next's client-side navigation asks for the same path
// with an RSC header and gets a data payload back, which must never be stored
// as, or served in place of, the HTML.
function isCacheablePage(request, url) {
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_next/")) return false;
  if (url.pathname.startsWith("/contact/")) return false; // artwork files
  if (request.headers.has("RSC") || url.searchParams.has("_rsc")) return false;
  return isAnonymousGet(request);
}

// `browserCacheControl` replaces the stored copy's long max-age on the way out.
// That max-age is for this cache: a browser holding a page for a day would
// never see an update.
async function cachedRead(url, ctx, freshSeconds, fetchOrigin, browserCacheControl) {
  const cache = caches.default;
  // Keyed on the URL alone, so differing request headers don't fragment it.
  const key = new Request(url.toString(), { method: "GET" });
  const cached = await cache.match(key);
  const cachedAt = cached ? Number(cached.headers.get("X-Cached-At")) || 0 : 0;
  const ageSeconds = (Date.now() - cachedAt) / 1000;

  if (cached && ageSeconds < freshSeconds) {
    return withStatus(cached, "HIT", browserCacheControl);
  }

  let origin;
  try {
    origin = await fetchOrigin();
  } catch (err) {
    if (cached) return withStatus(cached, "STALE", browserCacheControl);
    throw err;
  }

  if (origin.ok) {
    // Stored copy: kept for STALE_SECONDS, stamped with when it was fetched,
    // and without Set-Cookie (a cookie must never be replayed to others).
    const stored = new Response(origin.clone().body, origin);
    stored.headers.set("Cache-Control", `public, max-age=${STALE_SECONDS}`);
    stored.headers.set("X-Cached-At", String(Date.now()));
    stored.headers.delete("Set-Cookie");
    ctx.waitUntil(cache.put(key, stored));
    return withStatus(origin, "MISS", browserCacheControl);
  }

  // Throttled (429) or failing: the last good copy beats an error page.
  if (cached && (origin.status === 429 || origin.status >= 500)) {
    return withStatus(cached, "STALE", browserCacheControl);
  }
  return origin;
}

function withStatus(response, status, browserCacheControl) {
  const res = new Response(response.body, response);
  res.headers.set("X-Edge-Cache", status);
  res.headers.delete("X-Cached-At");
  if (browserCacheControl) res.headers.set("Cache-Control", browserCacheControl);
  return res;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (isPagesPath(url.pathname)) {
      // An explicit init, NOT `new Request(url, request)`: copying the
      // incoming request also copies its `redirect: "manual"`, which hands
      // Next's trailing-slash 308 (/blog/ -> /blog) back to the browser.
      // The default "follow" resolves it here and serves the page at the
      // slash URL, which is what the WordPress canonicals use.
      const fetchPages = () =>
        fetch(
          new Request(`${PAGES_ORIGIN}${url.pathname}${url.search}`, {
            method: request.method,
            headers: request.headers,
            body: request.body,
          })
        );

      return isCacheablePage(request, url)
        ? cachedRead(url, ctx, PAGE_FRESH_SECONDS, fetchPages, "public, max-age=0, must-revalidate")
        : fetchPages();
    }

    if (isCacheableRest(request, url)) {
      return cachedRead(url, ctx, FRESH_SECONDS, () => fetch(request));
    }

    // Everything else -> pass through (WordPress)
    return fetch(request);
  },
};
