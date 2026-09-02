import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { IntroSignature } from "@/components/magic/intro-signature";
import { site } from "@/content/site";
import { baseUrl } from "@/lib/base-url";

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
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name}, magicien close-up en Bretagne et à Paris`,
    template: `%s | ${site.name}`,
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
    url: baseUrl,
    siteName: `${site.name}, ${site.role}`,
    title: `${site.name} | Magicien close-up et magie de salon`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, magicien close-up` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Magicien close-up`,
    description: site.description,
    images: ["/og.png"],
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

        <IntroSignature />

        <Header />
        <main id="contenu">{children}</main>
        <Footer />

        {/* Grain posé au-dessus de tout, sauf du header et des panneaux */}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
