import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site } from "@/content/site";

import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Magicien close-up, ${site.zone}`,
    template: `%s — ${site.name}, magicien`,
  },
  description: site.description,
  keywords: [
    "magicien",
    "magicien close-up",
    "magie de salon",
    "magicien mariage",
    "magicien Saint-Malo",
    "magicien Rennes",
    "magicien Paris",
    "magicien Bretagne",
    "animation soirée entreprise",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: `${site.name} — ${site.role}`,
    title: `${site.name} — Magicien close-up et magie de salon`,
    description: site.description,
    images: [{ url: "/images/home/hero-cartes.webp", width: 2400, height: 1048 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Magicien close-up`,
    description: site.description,
    images: ["/images/home/hero-cartes.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0C0722",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-carton focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-encre"
        >
          Aller au contenu
        </a>

        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
