import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "Astra Ortho Hospital Case Study",
  description: "Astra Ortho Hospital case study page replicated from ABN Junction.",
  icons: {
    // Served via an API route, not a /public file directly — abnjunction.com's
    // proxy only forwards specific path prefixes (/blog, /case-studies, /_next,
    // /api, etc.) to this app, so a root-level static file here 404s. The WP
    // media logo isn't square either, so it stretches when squeezed into a
    // favicon slot; this route serves a properly cropped, padded square version.
    icon: "/api/site-icon",
    shortcut: "/api/site-icon",
    apple: "/api/site-icon",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">

        <SiteHeader />
        {/* Offsets the fixed header so page content doesn't start underneath it */}
        <div className="site-header-spacer" />

        {children}

        <SiteFooter />
      </body>
    </html>
  );
}
