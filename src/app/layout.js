import "./globals.css";

export const metadata = {
  title: "Astra Ortho Hospital Case Study",
  description: "Astra Ortho Hospital case study page replicated from ABN Junction.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
