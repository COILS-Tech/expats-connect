import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteSettings } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: `${siteSettings.siteName} | ${siteSettings.tagline}`,
    template: `%s | ${siteSettings.siteName}`,
  },
  description: siteSettings.description,
  keywords: ["expats", "netherlands", "community", "amsterdam", "internationals", "events"],
  openGraph: {
    title: siteSettings.siteName,
    description: siteSettings.description,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
