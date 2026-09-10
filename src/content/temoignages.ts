/**
 * Avis clients.
 *
 * Relevés sur la fiche Google de Julien (« Julien LAMBERT Magicien »,
 * 5,0 sur 27 avis, relevé le 10 septembre 2026). Les textes sont repris mot
 * pour mot, ponctuation comprise.
 *
 * Google tronque les avis les plus longs au-delà d'un certain nombre de
 * caractères et n'en livre la fin qu'après un clic. Ceux-là sont marqués
 * `extrait` : ils sont présentés comme tels, sans que la suite soit
 * inventée, et le lien renvoie vers la fiche pour les lire en entier.
 *
 * Pour ajouter un avis : le recopier depuis la fiche sans le retoucher, et
 * tenir `noteGoogle` à jour.
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
  nombre: 27,
  /** Lien direct vers la fiche, construit sur l'identifiant Google du lieu. */
  url: "https://maps.google.com/?cid=6025511969983754558",
} as const;

export const temoignages: Temoignage[] = [
  {
    auteur: "Léa Ponchart",
    texte:
      "Moment hors du temps ! Nous avons été émerveillés par la magie de Julien qui manie aussi bien les cartes que le mentalisme.",
    note: 5,
    quand: "il y a un jour",
    contexte: "Réception en août",
    extrait: true,
  },
  {
    auteur: "MARSTEAU Gérald",
    texte:
      "Nous sommes ravis de la prestation de Julien. Nous et nos invités sommes restés subjugués par les divers tours de magie aussi impressionnants les uns que les autres. Un délicieux moment passé avec Julien qui en plus est très sympathique. Un grand merci Julien !",
    note: 5,
    quand: "il y a deux mois",
    contexte: "Réception en juillet",
  },
  {
    auteur: "Juliette Raulet",
    texte:
      "Je recommande Julien pour vos évènements. Julien nous a suivi sur notre Roadshow 2025 de Lyon à Nantes en passant par Paris, il a su divertir avec succès tous nos invités, environ 250 personnes par ville. Nous n'hésiterons pas à refaire appel à lui pour d'autres évents commerciaux :)",
    note: 5,
    quand: "il y a un an",
    contexte: "Roadshow d'entreprise, Lyon, Paris, Nantes",
  },
  {
    auteur: "David MARTINEZ",
    texte:
      "Des tours maîtrisés à la perfection ! Je suis retourné en enfance quand j'étais épaté de ne rien comprendre ! La magie était au rendez-vous je vous le recommande chaudement",
    note: 5,
    quand: "il y a trois mois",
    contexte: "Soirée en mai",
  },
  {
    auteur: "jeanne aslnt",
    texte:
      "Merci Julien pour ces superbes prestations !! Je recommande vivement !! Impressionnant, j'en suis restée bouche bée !!",
    note: 5,
    quand: "il y a trois mois",
    contexte: "Soirée en mai",
  },
  {
    auteur: "Nicolas Dennielou",
    texte:
      "Spectacle de magie intimiste ce soir à St Malo avec Julien. Nous avons tous été bluffés !",
    note: 5,
    quand: "il y a un an",
    contexte: "Magie de salon, Saint-Malo",
  },
  {
    auteur: "Stéphane FAIVRE-RAMPANT",
    texte:
      "Un spectacle magique et généreux ! Des cartes, de pièces, des cordes, du mentalisme. C'était top !",
    note: 5,
    quand: "il y a un an",
    contexte: "Magie de salon",
    extrait: true,
  },
  {
    auteur: "Véronique Log",
    texte:
      "Une soirée mémorable, un magicien extraordinaire ! Des tours qui font retomber en enfance ! Super soirée !",
    note: 5,
    quand: "il y a un an",
    contexte: "Soirée privée",
    extrait: true,
  },
  {
    auteur: "Jörn Harms",
    texte:
      "Autant j'ai vu beaucoup de magiciens, autant là c'est du haut niveau. Impressionnant et à recommander",
    note: 5,
    quand: "il y a un an",
    contexte: "Magie close-up, Saint-Malo",
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
