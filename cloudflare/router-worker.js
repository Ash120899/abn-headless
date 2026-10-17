/**
 * Cloudflare Worker for ABN Headless (deployed as `falling-flower-b107`,
 * route abnjunction.com/*). Paste into the dashboard: Workers & Pages ->
 * falling-flower-b107 -> Edit code -> Deploy. Not deployed by the Pages
 * build; this file is the version-controlled copy.
 *
 * - Routes the migrated Next.js pages to Cloudflare Pages
 * - Routes everything else to the WordPress backend (Hostinger)
 * - Caches public WordPress REST GETs (/wp-json/...) at the edge
 *
 * Why the cache: Hostinger throttles each client IP at roughly 30 requests
 * per 30 seconds, before PHP runs (429, empty body, `platform: hostinger`).
 * Every server-side request from the Next.js app reaches WordPress from the
 * same Cloudflare IP (2a06:98c0:3600::103), so a few page views in a row
 * exhausted that budget and the pages 500'd. With this cache each REST URL
 * reaches Hostinger at most once per FRESH_SECONDS, and if Hostinger does
 * throttle or fail, the last good copy is served instead (stale-if-error).
 */

const PAGES_ORIGIN = "https://abn-headless.pages.dev";

// How long a cached REST response is served without asking WordPress.
// WP edits show on the site within this window.
const FRESH_SECONDS = 300;
// How long a stale copy is kept as a fallback for when WordPress is
// throttling or down.
const STALE_SECONDS = 86400;

// Paths served by the Next.js app on Cloudflare Pages.
function isPagesPath(pathname) {
  return (
    /^\/case-studies\/[^\/]+\/?$/.test(pathname) || // /case-studies/[slug]
    /^\/blog\/[^\/]+\/?$/.test(pathname) || // /blog/[slug]
    /^\/services\/[^\/]+\/?$/.test(pathname) || // /services/[slug], first-level only
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
function isCacheableRest(request, url) {
  if (request.method !== "GET") return false;
  if (!url.pathname.startsWith("/wp-json/")) return false;
  if (request.headers.has("Authorization") || request.headers.has("X-WP-Nonce")) return false;
  const cookie = request.headers.get("Cookie") || "";
  if (/wordpress_logged_in|wp-postpass|wordpress_sec/.test(cookie)) return false;
  return true;
}

async function cachedRest(request, url, ctx) {
  const cache = caches.default;
  // Keyed on the URL alone, so differing request headers don't fragment it.
  const key = new Request(url.toString(), { method: "GET" });
  const cached = await cache.match(key);
  const cachedAt = cached ? Number(cached.headers.get("X-Cached-At")) || 0 : 0;
  const ageSeconds = (Date.now() - cachedAt) / 1000;

  if (cached && ageSeconds < FRESH_SECONDS) {
    return withStatus(cached, "HIT");
  }

  let origin;
  try {
    origin = await fetch(request);
  } catch (err) {
    if (cached) return withStatus(cached, "STALE");
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
    return withStatus(origin, "MISS");
  }

  // Throttled (429) or failing: the last good copy beats an error page.
  if (cached && (origin.status === 429 || origin.status >= 500)) {
    return withStatus(cached, "STALE");
  }
  return origin;
}

function withStatus(response, status) {
  const res = new Response(response.body, response);
  res.headers.set("X-Edge-Cache", status);
  res.headers.delete("X-Cached-At");
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
      return fetch(
        new Request(`${PAGES_ORIGIN}${url.pathname}${url.search}`, {
          method: request.method,
          headers: request.headers,
          body: request.body,
        })
      );
    }

    if (isCacheableRest(request, url)) {
      return cachedRest(request, url, ctx);
    }

    // Everything else -> pass through (WordPress)
    return fetch(request);
  },
};
