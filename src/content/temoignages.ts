/**
 * Avis clients repris du site existant.
 * Julien affiche 100 % d'avis 5★ sur Google ; seuls les témoignages
 * effectivement publiés sur l'ancien site sont repris ici.
 */

export type Temoignage = {
  auteur: string;
  ville: string;
  texte: string;
  note: 5;
  contexte?: string;
};

export const temoignages: Temoignage[] = [
  {
    auteur: "Jörn H.",
    ville: "Saint-Malo",
    texte:
      "Autant j'ai vu beaucoup de magiciens, autant là c'est du haut niveau. Impressionnant et à recommander.",
    note: 5,
    contexte: "Magie close-up",
  },
  {
    auteur: "Gérald M.",
    ville: "Saint-Malo",
    texte:
      "Nous sommes ravis de la prestation de Julien. Nous et nos invités sommes restés subjugués par les divers tours de magie aussi impressionnants les uns que les autres.",
    note: 5,
    contexte: "Magie de salon",
  },
];

/** Lien vers la fiche Google, où l'intégralité des avis est consultable. */
export const googleReviewsUrl =
  "https://www.google.com/search?q=Julien+Lambert+Magicien+Saint-Malo";
