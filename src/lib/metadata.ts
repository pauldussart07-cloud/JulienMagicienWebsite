import type { Metadata } from "next";

import { site } from "@/content/site";
import { baseUrl } from "@/lib/base-url";

/**
 * Métadonnées d'une page.
 *
 * Next ne fusionne pas le bloc `openGraph` d'une page avec celui de la
 * racine : il le remplace. Une page qui déclarait seulement son adresse
 * perdait donc l'image de partage, et une page qui ne déclarait rien
 * héritait de l'adresse de la racine. Résultat, avant ce fichier : chaque
 * page du site annonçait `og:url` = accueil, et les cinq pages locales
 * partaient sans aucune image.
 *
 * Le bloc est donc construit ici, en entier, à chaque fois. Une page fournit
 * ce qui la distingue, le reste est identique partout et n'a plus à être
 * recopié.
 */
export function pageMetadata({
  title,
  titleAbsolu,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  publishedTime,
  robots,
}: {
  /** Titre de la page, complété par le gabarit « … | Julien Lambert ». */
  title?: string;
  /** Titre complet, quand le gabarit ne doit pas s'appliquer. */
  titleAbsolu?: string;
  description: string;
  /** Chemin depuis la racine, barre oblique comprise : « /close-up ». */
  path: string;
  /** Visuel de partage. L'image par défaut du site sinon. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  robots?: Metadata["robots"];
}): Metadata {
  // Le site n'a pas de barre oblique finale, canonique de l'accueil comprise :
  // `og:url` doit annoncer exactement la même adresse, sans quoi les deux
  // formes circulent en parallèle sur les réseaux.
  const url = path === "/" ? baseUrl : `${baseUrl}${path}`;
  const visuel = image ?? "/og.png";
  const titreSocial = titleAbsolu ?? title ?? site.name;

  return {
    ...(titleAbsolu ? { title: { absolute: titleAbsolu } } : title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "fr_FR",
      siteName: `${site.name}, ${site.role}`,
      url,
      title: titreSocial,
      description,
      images: [{ url: visuel, alt: imageAlt ?? `${site.name}, ${site.role}` }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: titreSocial,
      description,
      images: [visuel],
    },
    ...(robots ? { robots } : {}),
  };
}
