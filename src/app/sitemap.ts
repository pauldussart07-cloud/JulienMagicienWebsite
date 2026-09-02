import type { MetadataRoute } from "next";

import { articles } from "@/content/blog";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date();

  const pages: { url: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] =
    [
      { url: "/", priority: 1, freq: "weekly" },
      { url: "/close-up", priority: 0.9, freq: "monthly" },
      { url: "/magie-de-salon", priority: 0.9, freq: "monthly" },
      { url: "/prestations", priority: 0.7, freq: "monthly" },
      { url: "/a-propos", priority: 0.8, freq: "monthly" },
      { url: "/galerie", priority: 0.7, freq: "monthly" },
      { url: "/avis", priority: 0.7, freq: "monthly" },
      { url: "/faq", priority: 0.7, freq: "monthly" },
      { url: "/blog", priority: 0.7, freq: "weekly" },
      { url: "/contact", priority: 0.9, freq: "monthly" },
      { url: "/mentions-legales", priority: 0.2, freq: "yearly" },
      { url: "/politique-de-confidentialite", priority: 0.2, freq: "yearly" },
    ];

  return [
    ...pages.map((p) => ({
      url: `${site.url}${p.url}`,
      lastModified: maintenant,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/blog/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
