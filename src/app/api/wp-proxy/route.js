export const runtime = "edge";

import { wpEdgeCache } from "@/lib/wp-edge-cache";

const WP_API_URL = "https://abnjunction.com/wp-json/wp/v2";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return new Response(JSON.stringify({ error: "Missing 'path' query parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const forwardedParams = new URLSearchParams(searchParams);
  forwardedParams.delete("path");

  const query = forwardedParams.toString();
  const targetUrl = `${WP_API_URL}/${path}${query ? `?${query}` : ""}`;

  try {
    // Edge-cached rather than no-store: every client slider and "load more"
    // goes through here, and uncached they pushed WP into rate-limiting the
    // app (see src/lib/wp-edge-cache.js). Content can lag WP by up to 5 min.
    const res = await fetch(targetUrl, wpEdgeCache);
    const body = await res.text();

    const headers = {
      "Content-Type": res.headers.get("Content-Type") || "application/json",
    };
    // WP's pagination headers — client components (e.g. the case-studies
    // "load more" grid) need these to know hasMore/totalPages without an
    // extra request, same as server components already get from a direct fetch.
    const total = res.headers.get("X-WP-Total");
    const totalPages = res.headers.get("X-WP-TotalPages");
    if (total !== null) headers["X-WP-Total"] = total;
    if (totalPages !== null) headers["X-WP-TotalPages"] = totalPages;

    // Diagnostics for failed upstream responses: shows which layer produced
    // an error (e.g. a 429 with `server: LiteSpeed` came from the Hostinger
    // origin; `server: cloudflare` with no origin headers came from
    // Cloudflare). Only on non-2xx, so normal responses are unchanged.
    if (!res.ok) {
      for (const name of ["server", "retry-after", "platform", "x-litespeed-cache", "cf-mitigated", "cf-ray", "x-powered-by"]) {
        const value = res.headers.get(name);
        if (value !== null) headers[`X-Upstream-${name}`] = value;
      }
    }

    return new Response(body, { status: res.status, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to reach WordPress API", details: String(err) }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
