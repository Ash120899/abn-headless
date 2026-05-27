import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";

export const metadata = {
  title: "Astra Ortho Hospital Case Study",
  description: "Astra Ortho Hospital case study page replicated from ABN Junction.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">

        <header className="w-full border-b border-theme bg-transparent">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
            <div className="text-foreground font-semibold">ABN Junction</div>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
