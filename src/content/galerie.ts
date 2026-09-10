/**
 * Galerie photo.
 *
 * Les images viennent des fichiers pleine définition fournis par Julien,
 * ré-encodées en WebP (voir scripts/optimize-images.mjs). Deux règles
 * tiennent cette liste :
 *
 *   - aucun doublon : deux prises du même instant ne figurent pas toutes
 *     les deux, et une photo retenue pour une page du site (dossier
 *     `/images/site`) n'est pas reprise ici ;
 *   - les dimensions réelles sont déclarées, parce que la mosaïque répartit
 *     les images d'après leur hauteur et qu'aucun bloc ne doit se décaler
 *     après le chargement (CLS).
 *
 * L'ordre ci-dessous est celui de lecture, pas celui de l'affichage : la
 * mosaïque répartit ensuite les photos colonne par colonne pour que toutes
 * se terminent à la même hauteur (voir `repartirEnColonnes`).
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const photos: Photo[] = [
  {
    src: "/images/galerie/gal-04.webp",
    width: 1800,
    height: 2705,
    alt: "Une mariée observe un tour de cartes pendant le vin d'honneur",
  },
  {
    src: "/images/galerie/gal-09.webp",
    width: 1800,
    height: 1202,
    alt: "Julien Lambert présente un tour à des invités pendant un cocktail d'entreprise",
  },
  {
    src: "/images/galerie/gal-20.webp",
    width: 1800,
    height: 958,
    alt: "Un groupe d'invités réagit à la révélation d'un tour, en extérieur",
  },
  {
    src: "/images/galerie/gal-01.webp",
    width: 1800,
    height: 1199,
    alt: "Prestation de close-up dans un parc, autour d'une table de magicien",
  },
  {
    src: "/images/galerie/gal-19.webp",
    width: 1636,
    height: 852,
    alt: "Une pièce en équilibre au bout des doigts, en gros plan",
  },
  {
    src: "/images/galerie/gal-07.webp",
    width: 1800,
    height: 2705,
    alt: "Julien Lambert en pleine manipulation, au milieu des invités",
  },
  {
    src: "/images/galerie/gal-02.webp",
    width: 1800,
    height: 1199,
    alt: "Magie rapprochée sous un chapiteau, pendant une réception de mariage",
  },
  {
    src: "/images/galerie/gal-16.webp",
    width: 1800,
    height: 861,
    alt: "Deux invités n'en croient pas leurs yeux pendant un tour",
  },
  {
    src: "/images/galerie/gal-05.webp",
    width: 1800,
    height: 1200,
    alt: "Une mariée éclate de rire pendant une prestation de close-up",
  },
  {
    src: "/images/galerie/gal-12.webp",
    width: 1800,
    height: 785,
    alt: "Un jeu de cartes en main, en noir et blanc",
  },
  {
    src: "/images/galerie/gal-21.webp",
    width: 1800,
    height: 1199,
    alt: "Julien Lambert présente un tour de cartes à un jeune invité",
  },
  {
    src: "/images/galerie/gal-10.webp",
    width: 1800,
    height: 1202,
    alt: "Julien Lambert à contre-jour pendant un événement d'entreprise",
  },
  {
    src: "/images/galerie/gal-08.webp",
    width: 1800,
    height: 785,
    alt: "Une invitée en pleine réaction pendant un tour de close-up",
  },
  {
    src: "/images/galerie/gal-06.webp",
    width: 1800,
    height: 1200,
    alt: "Un tour se joue au milieu d'un groupe d'invités, devant un château",
  },
  {
    src: "/images/galerie/gal-14.webp",
    width: 1800,
    height: 785,
    alt: "Une balle en mousse apparaît au creux de la main, en gros plan",
  },
  {
    src: "/images/galerie/gal-03.webp",
    width: 1800,
    height: 1199,
    alt: "Julien Lambert désigne une carte, les invités attablés le suivent du regard",
  },
  {
    src: "/images/galerie/gal-18.webp",
    width: 1800,
    height: 789,
    alt: "Des mariés stupéfaits juste après la révélation d'un tour",
  },
  {
    src: "/images/galerie/gal-11.webp",
    width: 1800,
    height: 1202,
    alt: "Manipulation de cartes à contre-jour, en noir et blanc",
  },
  {
    src: "/images/galerie/gal-13.webp",
    width: 1800,
    height: 785,
    alt: "Un anneau apparaît au milieu d'un cordon, en gros plan",
  },
  {
    src: "/images/galerie/gal-15.webp",
    width: 1800,
    height: 785,
    alt: "Un dé sous un gobelet, l'instant avant la révélation",
  },
  {
    src: "/images/galerie/gal-17.webp",
    width: 1800,
    height: 786,
    alt: "Deux enfants suivent de très près un tour de magie",
  },
];

/**
 * Répartit les photos en colonnes de hauteurs équivalentes.
 *
 * Une mise en page en colonnes CSS laisse au navigateur le soin d'équilibrer,
 * et il s'y prend mal dès que les rapports d'image varient beaucoup : la
 * dernière colonne s'arrête bien plus haut que les autres, et un grand vide
 * s'installe au-dessus du pied de page. On fait donc la répartition
 * nous-mêmes, en donnant chaque photo à la colonne la plus courte du moment.
 *
 * Le calcul est fait au rendu côté serveur, à partir des dimensions déclarées :
 * l'ordre est stable, identique pour tout le monde, et l'équilibre est acquis
 * avant même que la première image soit chargée.
 */
export function repartirEnColonnes(liste: Photo[], nombre: number): Photo[][] {
  const colonnes: Photo[][] = Array.from({ length: nombre }, () => []);
  const hauteurs = new Array(nombre).fill(0);

  for (const photo of liste) {
    // Hauteur relative à une largeur de colonne de 1.
    const h = photo.height / photo.width;
    let cible = 0;
    for (let i = 1; i < nombre; i++) {
      if (hauteurs[i] < hauteurs[cible]) cible = i;
    }
    colonnes[cible].push(photo);
    hauteurs[cible] += h;
  }

  return colonnes;
}
