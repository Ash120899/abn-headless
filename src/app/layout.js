import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "Astra Ortho Hospital Case Study",
  description: "Astra Ortho Hospital case study page replicated from ABN Junction.",
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
