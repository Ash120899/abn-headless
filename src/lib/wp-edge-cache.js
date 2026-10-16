// Cloudflare edge-cache settings for WordPress REST subrequests.
//
// The WP origin rate-limits the Pages app: every SSR page makes several
// /wp-json calls from a handful of shared Cloudflare IPs, and a few page
// views in quick succession get 429s, which surface as 500s. `next.revalidate`
// alone doesn't cache on the Pages runtime, so this caches the WP responses
// in Cloudflare itself instead. Repeat views within the TTL never reach WP.
//
// Only 2xx responses are cached, so a 429 or 5xx is never pinned for the
// TTL. Outside the Workers runtime (local `next dev` / `next start` on Node)
// the `cf` key is ignored.
export const WP_EDGE_TTL = 300;

export const wpEdgeCache = {
  cf: {
    cacheEverything: true,
    cacheTtlByStatus: { "200-299": WP_EDGE_TTL },
  },
};
