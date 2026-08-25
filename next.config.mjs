/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // The case-studies listing page is unusually image-heavy (grid cards,
    // client logos, blog teasers, avatars) — next/image's lazy loading and
    // layout-shift-free sizing is worth the config here, even though the
    // rest of the app still uses plain <img> for WP-hosted images.
    remotePatterns: [{ protocol: "https", hostname: "abnjunction.com" }],
  },
};

export default nextConfig;
