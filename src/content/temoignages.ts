/**
 * Avis clients.
 *
 * Relevés sur la fiche Google de Julien (« Julien LAMBERT Magicien »,
 * 5,0 sur 27 avis, relevé le 12 septembre 2026). Les textes sont repris mot
 * pour mot, ponctuation et émoticônes comprises : ce sont les mots de
 * clients, pas une reformulation.
 *
 * Vingt-sept avis sur la fiche, dix-huit affichés ici. Deux ne portent
 * qu'une note sans une ligne de texte, et rien ne sert de montrer une carte
 * vide. Sept autres redisent, en moins précis, ce que ceux-ci disent déjà :
 * la page vaut mieux courte et forte que longue et répétitive.
 *
 * Google tronque les avis les plus longs au-delà d'un certain nombre de
 * caractères et n'en livre la fin qu'après un clic. Ceux-là sont marqués
 * `extrait` : ils sont présentés comme tels, sans que la suite soit
 * inventée, et le lien renvoie vers la fiche pour les lire en entier.
 *
 * L'ordre est celui de l'affichage. Il alterne les contextes, entreprise,
 * mariage, anniversaire, salon, pour qu'un visiteur reconnaisse vite le
 * sien plutôt que de lire dix fois la même situation.
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
    auteur: "Juliette Raulet",
    texte:
      "Je recommande Julien pour vos évènements. Julien nous a suivi sur notre Roadshow 2025 de Lyon à Nantes en passant par Paris, il a su divertir avec succès tous nos invités, environ 250 personnes par ville. Nous n'hésiterons pas à refaire appel à lui pour d'autres évents commerciaux :)",
    note: 5,
    quand: "il y a un an",
    contexte: "Roadshow d'entreprise, Lyon, Paris, Nantes",
  },
  {
    auteur: "Paul Dussart",
    texte:
      "Nous avons fait appel à Julien pour notre mariage et nous ne le regrettons pas une seconde. Il est passé de table en table pendant le cocktail, les tours",
    note: 5,
    quand: "il y a trois jours",
    contexte: "Mariage, en septembre",
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
    auteur: "Ségolène Le Roux",
    texte:
      "Julien a merveilleusement animé notre dîner lors d'un anniversaire. Nous avons tous été bluffés par ses tours de magie stupéfiants et originaux pour certains. Merci nous avons adoré 🙌",
    note: 5,
    quand: "il y a cinq jours",
    contexte: "Anniversaire, en septembre",
  },
  {
    auteur: "Indy Hazan",
    texte:
      "J'ai eu le plaisir d'assister au “show” de Julien, car oui s'en est un. Lors d'un mariage à Saint Malo, il nous a stupéfait de part ses talents de magicien mais",
    note: 5,
    quand: "il y a trois jours",
    contexte: "Mariage, Saint-Malo",
    extrait: true,
  },
  {
    auteur: "Cam Edrd",
    texte:
      "Un spectacle époustouflant ! Julien est doté d'un talent incroyable pour la magie, agrémenté d'une touche d'humour fort appréciable. Merci pour cette prestation spectaculaire 🤩",
    note: 5,
    quand: "il y a cinq jours",
    contexte: "Prestation en septembre",
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
    auteur: "FAHD MIKE AHMED-MERDOUKH",
    texte:
      "Un super moment du début à la fin ! Des tours bluffants, beaucoup d'humour et une très belle énergie. On a passé un excellent moment, je recommande à 100 % ! ✨",
    note: 5,
    quand: "il y a trois jours",
    contexte: "Prestation en septembre",
  },
  {
    auteur: "Paco Lopez",
    texte:
      "Fantastique pour les plus grands, et les enfants. J'ai eu la chance d'assister à deux reprises à des représentations de Julien à des mariages, et toujours la",
    note: 5,
    quand: "il y a trois jours",
    contexte: "Mariages, en septembre",
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
    auteur: "Adri",
    texte:
      "Ce gars est vraiment impressionnant et très sympathique (même s'il refuse de donner des explications sur ses numéros 😄). Hâte de voir ce que donneront ses prochains tours ! ✨",
    note: 5,
    quand: "il y a trois jours",
    contexte: "Prestation en septembre",
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
    auteur: "Louis de Coudenhove",
    texte:
      "Magicien très talentueux ! On sent immédiatement la passion et l'expérience derrière chaque tour, avec une dextérité et une maîtrise bluffantes. Julien propose",
    note: 5,
    quand: "il y a trois jours",
    contexte: "Prestation en septembre",
    extrait: true,
  },
  {
    auteur: "Breizhtouch",
    texte:
      "Trop fort ! Julien est doué, drôle et sait mettre à l'aise et divertir l'audience, je recommande ☺️",
    note: 5,
    quand: "il y a trois jours",
    contexte: "Prestation en septembre",
  },
  {
    auteur: "Numa Phileas",
    texte:
      "Inspirant. L'impression de redevenir un enfant devant ses prestations. Mais je ne comprends toujours pas comment il fait. Trop fort.",
    note: 5,
    quand: "il y a trois jours",
    contexte: "Prestation en septembre",
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
    auteur: "Stéphane FAIVRE-RAMPANT",
    texte:
      "Un spectacle magique et généreux ! Des cartes, de pièces, des cordes, du mentalisme 🤩",
    note: 5,
    quand: "il y a un an",
    contexte: "Magie de salon",
    extrait: true,
  },
  {
    auteur: "Maxime Guillois",
    texte:
      "Pour avoir travaillé avec Julien de nombreuses fois, je ne peux que vous conseillez ses services ! Expert en mentalisme et close-up, il saura vous éblouir et",
    note: 5,
    quand: "il y a un an",
    contexte: "Magicien, confrère",
    extrait: true,
  },
];

/** Conservé pour les liens « voir tous les avis ». */
export const googleReviewsUrl = noteGoogle.url;
