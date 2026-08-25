import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "Astra Ortho Hospital Case Study",
  description: "Astra Ortho Hospital case study page replicated from ABN Junction.",
  icons: {
    // Hosted on WordPress rather than /public — abnjunction.com's proxy only
    // forwards specific path prefixes (/blog, /case-studies, /_next, etc.) to
    // this app, so a root-level static file here (e.g. /siteicon.png) 404s.
    // This is the square-cropped mark (256x256), not the wide wordmark, so it
    // doesn't stretch when squeezed into a favicon slot.
    icon: "https://abnjunction.com/wp-content/uploads/2026/08/favicon-mark.png",
    shortcut: "https://abnjunction.com/wp-content/uploads/2026/08/favicon-mark.png",
    apple: "https://abnjunction.com/wp-content/uploads/2026/08/favicon-mark.png",
  },
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: browser extensions (e.g. focus-visible
    // polyfills) commonly inject attributes/classes onto <html> before React
    // hydrates, which otherwise logs a false-positive mismatch warning on
    // every page — see https://nextjs.org/docs/messages/react-hydration-error.
    // Only suppresses this element's own attributes, not its children.
    <html lang="en" data-theme="dark" className="h-full antialiased" suppressHydrationWarning>
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
