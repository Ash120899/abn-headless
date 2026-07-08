export const runtime = "edge";

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
    const res = await fetch(targetUrl, { cache: "no-store" });
    const body = await res.text();

    return new Response(body, {
      status: res.status,
      headers: { "Content-Type": res.headers.get("Content-Type") || "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to reach WordPress API", details: String(err) }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
