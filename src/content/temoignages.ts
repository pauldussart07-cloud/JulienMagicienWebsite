/**
 * Avis clients.
 *
 * Relevés sur la fiche Google de Julien (« Julien LAMBERT Magicien »,
 * 5,0 sur 10 avis) et sur l'ancien site. Les textes sont repris mot pour mot.
 * L'avis de Maxime Guillois est tronqué par Google au-delà d'un certain
 * nombre de caractères : il est présenté comme extrait, sans que la fin soit
 * reconstituée, et le lien renvoie vers la fiche pour le lire en entier.
 *
 * Pour ajouter un avis : le recopier depuis la fiche Google sans le retoucher,
 * et tenir `noteGoogle` à jour.
 */

export type Temoignage = {
  auteur: string;
  texte: string;
  note: 5;
  /** Ancienneté telle qu'affichée par Google au moment du relevé. */
  quand: string;
  /** Contexte : ville ou type de prestation, quand il est connu. */
  contexte?: string;
  /** Vrai si Google tronque le texte : on affiche alors un extrait. */
  extrait?: boolean;
};

export const noteGoogle = {
  valeur: "5,0",
  nombre: 10,
  /** Lien direct vers la fiche, construit sur l'identifiant Google du lieu. */
  url: "https://maps.google.com/?cid=6025511969983754558",
} as const;

export const temoignages: Temoignage[] = [
  {
    auteur: "MARSTEAU Gérald",
    texte:
      "Nous sommes ravis de la prestation de Julien. Nous et nos invités sommes restés subjugués par les divers tours de magie aussi impressionnants les uns que les autres. Un délicieux moment passé avec Julien qui en plus est très sympathique. Un grand merci Julien !",
    note: 5,
    quand: "il y a un mois",
    contexte: "Réception en juillet",
  },
  {
    auteur: "David MARTINEZ",
    texte:
      "Des tours maîtrisés à la perfection ! Je suis retourné en enfance quand j'étais épaté de ne rien comprendre ! La magie était au rendez-vous, je vous le recommande chaudement.",
    note: 5,
    quand: "il y a trois mois",
    contexte: "Soirée en mai",
  },
  {
    auteur: "Jörn H.",
    texte:
      "Autant j'ai vu beaucoup de magiciens, autant là c'est du haut niveau. Impressionnant et à recommander.",
    note: 5,
    quand: "Saint-Malo",
    contexte: "Magie close-up",
  },
  {
    auteur: "Maxime Guillois",
    texte:
      "Pour avoir travaillé avec Julien de nombreuses fois, je ne peux que vous conseiller ses services ! Expert en mentalisme et close-up, il saura vous éblouir et vous agacer ! Son style élégant et sympathique vous fera encore plus apprécier sa",
    note: 5,
    quand: "il y a un an",
    contexte: "Magicien, confrère",
    extrait: true,
  },
];

/** Conservé pour les liens « voir tous les avis ». */
export const googleReviewsUrl = noteGoogle.url;
