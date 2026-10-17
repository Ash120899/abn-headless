// Cloudflare edge-cache settings for WordPress REST subrequests.
//
// The WP origin (Hostinger) rate-limits the Pages app: every Worker
// subrequest reaches it from the same Cloudflare source IP, and a few page
// views in quick succession get 429s, which surface as 500s.
// `next.revalidate` alone doesn't cache on the Pages runtime.
//
// Caveat (found 2026-10-17): abnjunction.com/* is routed through the
// falling-flower-b107 router Worker, which runs before Cloudflare's cache,
// so these options may have no effect until that Worker caches /wp-json
// itself. Kept because they're harmless and take effect if the route ever
// stops covering /wp-json.
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
