import type { MetadataRoute } from "next";

import { articles } from "@/content/blog";
import { photos } from "@/content/galerie";
import { teaser } from "@/content/media";
import { site } from "@/content/site";
import { zonesPages } from "@/content/zones-pages";
import { baseUrl } from "@/lib/base-url";

/**
 * Plan du site.
 *
 * Deux choix méritent d'être expliqués.
 *
 * La date. `lastModified` portait celle du build : chaque déploiement
 * annonçait donc que les vingt-trois pages venaient d'être modifiées, y
 * compris les mentions légales inchangées depuis la mise en ligne. Un robot
 * qui constate que la date ne prédit jamais un vrai changement cesse de s'y
 * fier, et la seule information utile du fichier est perdue. Elle est donc
 * écrite à la main, par page, et n'est touchée que lorsque la page l'est.
 *
 * Les médias. Le site vit de ses photos et de sa vidéo, et cette dernière
 * n'est plus hébergée par YouTube : personne ne la signale à notre place.
 * Les images de la galerie et le teaser sont donc déclarés ici, seul endroit
 * où Google ira les chercher sans avoir à deviner.
 */

/** Dernière retouche réelle de chaque page. Format AAAA-MM-JJ. */
const PAGES: {
  url: string;
  maj: string;
  priority: number;
  freq: "weekly" | "monthly" | "yearly";
  images?: string[];
}[] = [
  { url: "/", maj: "2026-09-10", priority: 1, freq: "monthly" },
  { url: "/close-up", maj: "2026-09-10", priority: 0.9, freq: "monthly" },
  { url: "/magie-de-salon", maj: "2026-09-10", priority: 0.9, freq: "monthly" },
  { url: "/prestations", maj: "2026-09-02", priority: 0.7, freq: "yearly" },
  { url: "/a-propos", maj: "2026-09-10", priority: 0.8, freq: "yearly" },
  { url: "/galerie", maj: "2026-09-10", priority: 0.7, freq: "monthly" },
  { url: "/avis", maj: "2026-09-10", priority: 0.7, freq: "monthly" },
  { url: "/faq", maj: "2026-09-10", priority: 0.7, freq: "monthly" },
  { url: "/blog", maj: "2026-09-02", priority: 0.7, freq: "monthly" },
  { url: "/contact", maj: "2026-09-10", priority: 0.9, freq: "yearly" },
  // Mentions légales et politique de confidentialité sont volontairement
  // absentes : elles portent une balise noindex, et soumettre au plan du
  // site une adresse qu'on interdit d'indexer est signalé en erreur par la
  // Search Console.
];

/** Retouche des cinq pages locales : elles ont bougé en même temps. */
const MAJ_ZONES = "2026-09-10";

const absolu = (chemin: string) => `${baseUrl}${chemin}`;

/** Le teaser, au format attendu par un plan de site vidéo. */
const VIDEO_TEASER = {
  title: teaser.titre,
  description: teaser.description,
  thumbnail_loc: absolu(teaser.poster),
  content_loc: absolu(teaser.src),
  duration: 85,
  publication_date: teaser.publieLe,
  family_friendly: "yes" as const,
  uploader: { info: baseUrl, content: site.name },
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({
      url: absolu(p.url),
      lastModified: new Date(p.maj),
      changeFrequency: p.freq,
      priority: p.priority,
      // La galerie porte les vingt et une photos, l'accueil le teaser.
      ...(p.url === "/galerie"
        ? { images: photos.map((photo) => absolu(photo.src)), videos: [VIDEO_TEASER] }
        : {}),
      ...(p.url === "/" ? { videos: [VIDEO_TEASER] } : {}),
    })),
    ...zonesPages.map((z) => ({
      url: absolu(`/${z.slug}`),
      lastModified: new Date(MAJ_ZONES),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [absolu(z.image.src)],
    })),
    ...articles.map((a) => ({
      url: absolu(`/blog/${a.slug}`),
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: [absolu(a.cover.src)],
    })),
  ];
}
