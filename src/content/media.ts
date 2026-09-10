/**
 * Le teaser, décrit une seule fois.
 *
 * Le fichier est servi depuis le site et non par un lecteur tiers : c'est
 * donc à nous de le déclarer à Google, qui ne peut pas deviner sa durée ni
 * son sujet. Ces valeurs alimentent à la fois le lecteur et le schéma
 * VideoObject ; elles ne doivent exister qu'à un seul endroit.
 */
export const teaser = {
  /** Fichier 1080p, servi au-delà de 900 px de large. */
  src: "/videos/teaser-1080.mp4",
  /** Fichier 720p, servi en dessous : le 1080p ne s'y verrait pas. */
  srcMobile: "/videos/teaser-720.mp4",
  poster: "/images/site/site-video-poster.webp",
  titre: "Julien Lambert, magicien close-up : le teaser",
  description:
    "Une minute vingt-cinq de prestations réelles : mariages, soirées d'entreprise et réceptions privées, en Bretagne et en région parisienne. Les mains, les regards, et les réactions du public.",
  /** Durée exacte du fichier, au format ISO 8601 attendu par schema.org. */
  duree: "PT1M25S",
  /** Lisible par un humain, affiché sous le bouton de lecture. */
  dureeTexte: "1 min 25",
  /** Mise en ligne sur le site. Sert de `uploadDate`. */
  publieLe: "2026-09-10",
  // Dimensions de l'image réelle. Le montage d'origine est livré dans un
  // cadre 1920x1080 avec des bandes noires incrustées : elles sont retirées
  // à l'encodage, il reste un 2,28:1 de 1920 sur 842.
  largeur: 1920,
  hauteur: 842,
} as const;
