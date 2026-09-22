/**
 * Pages locales (« magicien à … »).
 *
 * Ces cinq URL existaient déjà sur l'ancien site et portent du référencement :
 * elles sont conservées telles quelles. Le contenu est repris du site
 * d'origine, à trois corrections près :
 *   - la page Bretagne parlait de Paris à trois endroits (copier-coller) ;
 *   - la page Île-de-France reprenait intégralement le texte de la Bretagne
 *     et ses listes de lieux étaient vides ; elle a été réécrite ;
 *   - les listes de lieux manquantes ont été complétées.
 */

export type Lieu = { nom: string; detail: string };

export type ZonePage = {
  slug: string;
  /** Nom affiché : « Saint-Malo », « la Bretagne »… */
  nom: string;
  /** Forme prépositionnelle : « à Saint-Malo », « en Bretagne »… */
  ou: string;
  titre: string;
  metaTitle: string;
  metaDescription: string;
  /** Région administrative, pour le balisage areaServed */
  region: string;
  intro: string[];
  /** Territoires couverts — uniquement sur les pages régionales */
  territoires?: string[];
  mariageIntro: string;
  lieuxMariage: { chapo: string; items: Lieu[]; chute: string };
  entrepriseIntro: string;
  lieuxPro: { chapo: string; items: Lieu[] };
  /**
   * Photo d'ouverture, et son cadrage.
   *
   * Le bandeau du haut de page est beaucoup plus large que les originaux :
   * un cadrage centré coupe les visages, qui sont dans le tiers haut de
   * chaque photo. Chaque page donne donc son propre point d'ancrage, choisi
   * pour qu'on y voie à la fois Julien et les spectateurs.
   */
  image: { src: string; alt: string; cadrage: string };
};

/** Blocs identiques d'une page à l'autre : ils décrivent la prestation
 *  elle-même, qui ne change pas d'une ville à l'autre. */
export const communs = {
  experiences: [
    "Un objet emprunté disparaît.",
    "Une pensée est devinée.",
    "Une carte choisie librement se retrouve là où personne ne l'attendait.",
    "Et surtout, vos invités vivent l'expérience ensemble.",
  ],
  liant:
    "La magie devient alors un véritable outil pour créer du lien entre les différentes générations et les groupes d'amis ou de famille, tout en apportant une animation élégante et originale à votre réception.",
  momentsTitre: "Une animation qui s'adapte à votre journée",
  momentsIntro:
    "Chaque mariage est différent. Je m'adapte donc au rythme de votre réception et à l'ambiance que vous souhaitez créer. Je peux intervenir :",
  moments: [
    "pendant le vin d'honneur",
    "durant le cocktail",
    "entre les différents temps forts de la réception",
    "pendant le repas, entre certains plats",
    "lors d'une soirée privée ou d'un événement organisé autour du mariage",
  ],
  momentsChute:
    "L'intervention est pensée pour être fluide et discrète, sans imposer de scène ni interrompre le déroulement de votre journée.",
  entrepriseUsages: [
    "créer du lien entre les participants",
    "faciliter les échanges lors d'un cocktail",
    "surprendre vos collaborateurs",
    "dynamiser une soirée d'entreprise",
    "marquer un lancement de produit",
    "offrir une expérience originale à vos clients ou partenaires",
    "créer un moment fort lors d'un séminaire ou d'un team-building",
  ],
  formesTitre: "Une magie pensée pour votre événement professionnel",
  formes: [
    {
      nom: "Pendant un cocktail",
      detail:
        "je circule parmi les invités et crée des petits groupes autour d'expériences de magie et de mentalisme.",
    },
    {
      nom: "Entre deux temps forts",
      detail:
        "la magie permet de maintenir l'énergie de l'événement sans monopoliser l'attention de toute la salle.",
    },
    {
      nom: "Pendant une soirée d'entreprise",
      detail:
        "l'intervention peut être plus scénarisée afin de créer un véritable moment fort.",
    },
    {
      nom: "Pour un lancement de produit",
      detail:
        "la magie et le mentalisme peuvent également être personnalisés autour de votre marque, de votre message ou de votre produit.",
    },
  ],
  lieuReserve:
    "Vous avez déjà réservé votre lieu ? Aucun problème : je peux échanger directement avec vous ou avec votre équipe événementielle afin d'intégrer mon intervention au déroulement de la journée ou de la soirée.",
  pourquoi: [
    "À quelques mètres d'un spectacle, on peut être impressionné. À quelques centimètres, lorsque tout se joue directement entre vos mains, l'expérience devient personnelle, et c'est elle qu'on raconte encore des mois après.",
    "Mon rôle n'est pas de « faire des tours ». Je viens créer des rencontres, provoquer des émotions, et offrir à vos invités un souvenir qui leur appartient.",
  ],
  demande:
    "Indiquez-moi simplement la date, le lieu, le nombre d'invités et le type d'événement que vous préparez. Je pourrai vous proposer une formule adaptée à votre réception.",
} as const;

export const zonesPages: ZonePage[] = [
  {
    slug: "magicien-saint-malo",
    nom: "Saint-Malo",
    ou: "à Saint-Malo",
    titre: "Magicien à Saint-Malo",
    metaTitle: "Magicien à Saint-Malo",
    metaDescription:
      "Magicien close-up installé à Saint-Malo. Mariages, séminaires et réceptions privées dans la Cité corsaire et sur toute la Côte d'Émeraude.",
    region: "Bretagne",
    intro: [
      "Vous recherchez un magicien à Saint-Malo pour créer de la surprise, faire rire vos invités et apporter une touche vraiment originale à votre événement ? Installé à Saint-Malo, j'interviens dans la Cité corsaire et ses environs pour des mariages, événements d'entreprise et réceptions privées.",
      "Ma spécialité : la magie de proximité (close-up) et le mentalisme, réalisés directement au milieu de vos invités. Pas de scène, pas de distance : les cartes, les objets et les expériences se déroulent entre leurs mains, à quelques centimètres de leurs yeux. L'objectif est simple : créer des moments inattendus que vos invités auront envie de raconter longtemps après votre événement.",
    ],
    mariageIntro:
      "Le cocktail et le vin d'honneur sont souvent des moments où les invités se retrouvent, discutent… et parfois attendent simplement la suite de la journée. C'est précisément là que la magie prend tout son sens. En tant que magicien pour mariage à Saint-Malo, je circule parmi vos invités et propose des expériences directement dans les petits groupes.",
    lieuxMariage: {
      chapo:
        "Saint-Malo et ses environs offrent de nombreux cadres exceptionnels pour célébrer un mariage : châteaux, malouinières, domaines et lieux de réception entre remparts et campagne bretonne.",
      items: [
        {
          nom: "Domaine de la Barbinais",
          detail: "à cinq minutes de la plage, parc paysager de 7 000 m².",
        },
        {
          nom: "Malouinière de la Bardoulais",
          detail: "à Saint-Méloir-des-Ondes, malouinière typique.",
        },
        {
          nom: "Château de Miniac",
          detail: "malouinière de 1749, à quelques kilomètres de Saint-Malo.",
        },
        {
          nom: "Château Hôtel du Colombier",
          detail: "bâtisse Renaissance du XVIIe siècle, cadre patrimonial.",
        },
        {
          nom: "Domaine de Richebois",
          detail: "à Pleurtuit, à quelques minutes de Saint-Malo et de Dinard.",
        },
      ],
      chute:
        "Que votre mariage ait lieu dans un château, une malouinière, un domaine privé ou chez vous, la magie s'adapte au lieu et à la circulation de vos invités.",
    },
    entrepriseIntro:
      "Vous organisez un séminaire, une soirée d'entreprise, un lancement de produit ou un événement professionnel à Saint-Malo ? La magie de proximité permet de créer une animation originale sans bouleverser le programme de votre événement.",
    lieuxPro: {
      chapo:
        "J'interviens dans différents types de lieux professionnels et événementiels autour de Saint-Malo, notamment :",
      items: [
        {
          nom: "Le Grand Large, palais des congrès",
          detail: "en cœur de ville, vue mer.",
        },
        {
          nom: "Le Quai Saint-Malo, parc des expositions",
          detail: "espaces modulables, décor contemporain.",
        },
        {
          nom: "Grand Hôtel des Thermes",
          detail: "face à la mer, style Belle Époque.",
        },
        {
          nom: "La Demeure à Fleur de Rance",
          detail: "à Saint-Servan-sur-Mer, cadre reposant pour séminaires.",
        },
        {
          nom: "L'Amérance",
          detail:
            "ambiance conviviale, salles pour réunions d'équipe et ateliers.",
        },
        {
          nom: "Les hôtels et espaces de réception du centre-ville",
          detail: "et des remparts de Saint-Malo.",
        },
      ],
    },
    image: {
      src: "/images/site/site-apropos.webp",
      alt: "Invités stupéfaits pendant une prestation de magie près de Saint-Malo",
      cadrage: "70% 20%",
    },
  },

  {
    slug: "magicien-rennes",
    nom: "Rennes",
    ou: "à Rennes",
    titre: "Magicien à Rennes",
    metaTitle: "Magicien à Rennes",
    metaDescription:
      "Magicien close-up à Rennes et en Ille-et-Vilaine. Vins d'honneur, séminaires et soirées d'entreprise, en déambulation parmi vos invités.",
    region: "Bretagne",
    intro: [
      "Vous recherchez un magicien à Rennes pour créer de la surprise, faire rire vos invités et apporter une touche vraiment originale à votre événement ? Basé à Saint-Malo, j'interviens régulièrement à Rennes et en Ille-et-Vilaine pour des mariages, événements d'entreprise et réceptions privées.",
      "Ma spécialité : la magie de proximité (close-up) et le mentalisme, réalisés directement au milieu de vos invités. Pas de scène, pas de distance : les cartes, les objets et les expériences se déroulent entre leurs mains, à quelques centimètres de leurs yeux. L'objectif est simple : créer des moments inattendus que vos invités auront envie de raconter longtemps après votre événement.",
    ],
    mariageIntro:
      "Le cocktail et le vin d'honneur sont souvent des moments où les invités se retrouvent, discutent… et parfois attendent simplement la suite de la journée. C'est précisément là que la magie prend tout son sens. En tant que magicien pour mariage à Rennes, je circule parmi vos invités et propose des expériences directement dans les petits groupes.",
    lieuxMariage: {
      chapo:
        "Rennes et ses environs offrent de nombreux cadres exceptionnels pour célébrer un mariage : châteaux, manoirs, domaines et lieux de réception au cœur de la campagne bretonne.",
      items: [
        {
          nom: "Château d'Apigné, au Rheu",
          detail: "un cadre élégant et historique aux portes de Rennes.",
        },
        {
          nom: "Manoir de la Haute Pilais, à Chantepie",
          detail: "un environnement chaleureux et champêtre.",
        },
        {
          nom: "Manoir du Petit Corcé, à Nouvoitou",
          detail: "un lieu de réception entouré de verdure et de vergers.",
        },
        {
          nom: "Domaine La Providence",
          detail: "un cadre naturel pour une réception sur mesure.",
        },
        {
          nom: "Haras du Reuzel",
          detail: "un domaine de caractère idéal pour un mariage champêtre.",
        },
        {
          nom: "Château du Rocher Portail, à Maen Roch",
          detail: "domaine et jardins classés, ambiance de conte.",
        },
      ],
      chute:
        "Que votre mariage ait lieu dans un château, un domaine privé, une salle de réception ou chez vous, la magie s'adapte au lieu et à la circulation de vos invités.",
    },
    entrepriseIntro:
      "Vous organisez un séminaire, une soirée d'entreprise, un lancement de produit ou un événement professionnel à Rennes ? La magie de proximité permet de créer une animation originale sans bouleverser le programme de votre événement.",
    lieuxPro: {
      chapo:
        "J'interviens dans différents types de lieux professionnels et événementiels autour de Rennes, notamment :",
      items: [
        { nom: "Glaz Arena", detail: "un lieu événementiel moderne et modulable." },
        {
          nom: "La Fabrique Rennes",
          detail: "un espace adapté aux événements professionnels.",
        },
        {
          nom: "Halle de la Brasserie",
          detail: "un lieu atypique au cœur de Rennes.",
        },
        {
          nom: "Maison Marbeuf",
          detail: "un cadre élégant pour des événements plus intimistes.",
        },
        {
          nom: "Roazhon Park",
          detail:
            "espaces de réception modulables pour séminaires et soirées d'entreprise.",
        },
        {
          nom: "Les hôtels et espaces de réception du centre-ville",
          detail:
            "ainsi que les domaines et châteaux de la périphérie rennaise.",
        },
      ],
    },
    image: {
      src: "/images/site/site-apropos-cta.webp",
      alt: "Julien Lambert entouré d'invités pendant une réception en Ille-et-Vilaine",
      cadrage: "55% 10%",
    },
  },

  {
    slug: "magicien-bretagne",
    nom: "la Bretagne",
    ou: "en Bretagne",
    titre: "Magicien en Bretagne",
    metaTitle: "Magicien en Bretagne",
    metaDescription:
      "Magicien close-up basé à Saint-Malo, en déplacement dans toute la Bretagne : Côte d'Émeraude, Ille-et-Vilaine, Côtes-d'Armor et au-delà.",
    region: "Bretagne",
    intro: [
      "Vous recherchez un magicien en Bretagne pour créer de la surprise, faire rire vos invités et apporter une touche vraiment originale à votre événement ? Basé à Saint-Malo, j'interviens dans toute la Bretagne pour des mariages, événements d'entreprise et réceptions privées : Côte d'Émeraude, Ille-et-Vilaine, Côtes-d'Armor, et au-delà.",
      "Ma spécialité : la magie de proximité (close-up) et le mentalisme, réalisés directement au milieu de vos invités. Pas de scène, pas de distance : les cartes, les objets et les expériences se déroulent entre leurs mains, à quelques centimètres de leurs yeux.",
    ],
    territoires: [
      "Saint-Malo et la Cité corsaire",
      "Rennes et l'Ille-et-Vilaine",
      "Dinard et la Côte d'Émeraude",
      "Dinan et son pays d'art et d'histoire",
      "Cancale et la baie du Mont-Saint-Michel",
      "Saint-Briac-sur-Mer",
      "Saint-Méloir-des-Ondes",
      "Saint-Brieuc et les Côtes-d'Armor",
      "Combourg",
      "Fougères",
    ],
    mariageIntro:
      "Le cocktail et le vin d'honneur sont souvent des moments où les invités se retrouvent, discutent… et parfois attendent simplement la suite de la journée. C'est précisément là que la magie prend tout son sens. En tant que magicien pour mariage en Bretagne, je circule parmi vos invités et propose des expériences directement dans les petits groupes.",
    lieuxMariage: {
      chapo:
        "La Bretagne offre de nombreux cadres exceptionnels pour célébrer un mariage : châteaux, malouinières, manoirs et domaines au cœur de la campagne comme en bord de mer.",
      items: [
        {
          nom: "Les malouinières de la Côte d'Émeraude",
          detail:
            "demeures d'armateurs du XVIIIe siècle, entre Saint-Malo et Cancale.",
        },
        {
          nom: "Les châteaux et manoirs d'Ille-et-Vilaine",
          detail: "du pays de Rennes à celui de Fougères.",
        },
        {
          nom: "Les domaines de la baie du Mont-Saint-Michel",
          detail: "avec la mer et les polders pour horizon.",
        },
        {
          nom: "Les lieux de réception des Côtes-d'Armor",
          detail: "de Dinan à Saint-Brieuc.",
        },
      ],
      chute:
        "Que votre mariage ait lieu dans l'un de ces lieux ou dans un cadre plus intimiste, la magie s'adapte à votre journée et à la circulation de vos invités.",
    },
    entrepriseIntro:
      "Vous organisez un séminaire, une soirée d'entreprise, un lancement de produit ou un événement professionnel en Bretagne ? La magie de proximité permet de créer une animation originale sans bouleverser le programme de votre événement.",
    lieuxPro: {
      chapo:
        "J'interviens dans les lieux professionnels et événementiels de toute la région, notamment :",
      items: [
        {
          nom: "Les palais des congrès et parcs d'exposition",
          detail: "de Rennes, Saint-Malo et Saint-Brieuc.",
        },
        {
          nom: "Les hôtels de bord de mer",
          detail: "de la Côte d'Émeraude, pour les séminaires au vert.",
        },
        {
          nom: "Les lieux atypiques et friches réhabilitées",
          detail: "des centres-villes bretons.",
        },
        {
          nom: "Les domaines et châteaux privatisables",
          detail: "pour les séminaires résidentiels.",
        },
      ],
    },
    image: {
      src: "/images/site/site-video-poster.webp",
      alt: "Julien Lambert en prestation face à la mer, sur la côte bretonne",
      cadrage: "50% 4%",
    },
  },

  {
    slug: "magicien-paris",
    nom: "Paris",
    ou: "à Paris",
    titre: "Magicien à Paris",
    metaTitle: "Magicien à Paris",
    metaDescription:
      "Magicien close-up et mentaliste à Paris. Cocktails, séminaires, lancements de produit et mariages, en déambulation parmi vos invités.",
    region: "Île-de-France",
    intro: [
      "Vous recherchez un magicien à Paris pour créer de la surprise, faire rire vos invités et apporter une touche vraiment originale à votre événement ? Je me déplace régulièrement à Paris et en Île-de-France pour des mariages, événements d'entreprise et réceptions privées.",
      "Ma spécialité : la magie de proximité (close-up) et le mentalisme, réalisés directement au milieu de vos invités. Pas de scène, pas de distance : les cartes, les objets et les expériences se déroulent entre leurs mains, à quelques centimètres de leurs yeux. L'objectif est simple : créer des moments inattendus que vos invités auront envie de raconter longtemps après votre événement.",
    ],
    mariageIntro:
      "Le cocktail et le vin d'honneur sont souvent des moments où les invités se retrouvent, discutent… et parfois attendent simplement la suite de la journée. C'est précisément là que la magie prend tout son sens. En tant que magicien pour mariage à Paris, je circule parmi vos invités et propose des expériences directement dans les petits groupes.",
    lieuxMariage: {
      chapo:
        "Paris et l'Île-de-France offrent des cadres exceptionnels pour célébrer un mariage : châteaux, domaines et lieux de réception aux portes de la capitale.",
      items: [
        {
          nom: "Château de Janvry",
          detail:
            "domaine privatisable à 35 minutes de Paris, cadre authentique et convivial.",
        },
        {
          nom: "Domaine de la Butte Ronde",
          detail: "42 hectares, étangs, verrière, ambiance nature.",
        },
        {
          nom: "Château Barthélemy",
          detail: "demeure de caractère, réceptions à taille humaine.",
        },
        {
          nom: "Le Clocher de la Duchesse",
          detail: "un écrin intimiste pour un mariage.",
        },
        {
          nom: "Château de Bouffémont",
          detail: "un mariage raffiné, mais sans démesure.",
        },
      ],
      chute:
        "Que votre mariage ait lieu dans un château, un domaine privé ou une salle de réception parisienne, la magie s'adapte au lieu et à la circulation de vos invités.",
    },
    entrepriseIntro:
      "Vous organisez un séminaire, une soirée d'entreprise, un lancement de produit ou un événement professionnel à Paris ? La magie de proximité permet de créer une animation originale sans bouleverser le programme de votre événement.",
    lieuxPro: {
      chapo:
        "J'interviens dans différents types de lieux professionnels et événementiels à Paris, notamment :",
      items: [
        {
          nom: "L'Espace la Rochefoucauld",
          detail:
            "près de la gare Saint-Lazare, format classique séminaire et réception.",
        },
        {
          nom: "Electric Paris",
          detail:
            "bâtiment industriel chic de 800 m², pour cocktails et soirées d'entreprise.",
        },
        {
          nom: "Château Éphémère",
          detail:
            "cadre historique et contemporain, bien situé pour les événements professionnels.",
        },
        {
          nom: "Les espaces modulables du centre de Paris",
          detail:
            "format plus formel, adapté aux réunions et séminaires en petit comité.",
        },
      ],
    },
    image: {
      src: "/images/site/site-closeup-large.webp",
      alt: "Public captivé pendant une prestation de magie lors d'une soirée d'entreprise",
      cadrage: "48% 20%",
    },
  },

  {
    slug: "magicien-ile-de-france",
    nom: "l'Île-de-France",
    ou: "en Île-de-France",
    titre: "Magicien en Île-de-France",
    metaTitle: "Magicien en Île-de-France",
    metaDescription:
      "Magicien close-up en Île-de-France : Neuilly, Versailles, Boulogne, Saint-Germain-en-Laye. Mariages, cocktails et événements d'entreprise.",
    region: "Île-de-France",
    intro: [
      "Vous recherchez un magicien en Île-de-France pour créer de la surprise, faire rire vos invités et apporter une touche vraiment originale à votre événement ? Je me déplace régulièrement dans toute la région pour des mariages, événements d'entreprise et réceptions privées, de la capitale aux domaines de grande couronne.",
      "Ma spécialité : la magie de proximité (close-up) et le mentalisme, réalisés directement au milieu de vos invités. Pas de scène, pas de distance : les cartes, les objets et les expériences se déroulent entre leurs mains, à quelques centimètres de leurs yeux.",
    ],
    territoires: [
      "Paris et ses vingt arrondissements",
      "Neuilly-sur-Seine",
      "Versailles et les Yvelines",
      "Boulogne-Billancourt",
      "Saint-Germain-en-Laye",
      "Rueil-Malmaison",
      "Saint-Cloud",
      "Levallois-Perret",
    ],
    mariageIntro:
      "Le cocktail et le vin d'honneur sont souvent des moments où les invités se retrouvent, discutent… et parfois attendent simplement la suite de la journée. C'est précisément là que la magie prend tout son sens. En tant que magicien pour mariage en Île-de-France, je circule parmi vos invités et propose des expériences directement dans les petits groupes.",
    lieuxMariage: {
      chapo:
        "La région offre une densité rare de lieux de réception : châteaux de grande couronne, orangeries, domaines forestiers et hôtels particuliers en cœur de ville.",
      items: [
        {
          nom: "Les châteaux et domaines des Yvelines",
          detail: "à moins d'une heure de Paris, dans un cadre boisé.",
        },
        {
          nom: "Les orangeries et parcs de l'Essonne",
          detail: "pour un vin d'honneur en extérieur.",
        },
        {
          nom: "Les hôtels particuliers parisiens",
          detail: "pour une réception en cœur de ville.",
        },
        {
          nom: "Les domaines de Seine-et-Marne",
          detail: "pour les mariages sur deux jours, avec hébergement sur place.",
        },
      ],
      chute:
        "Que votre mariage ait lieu dans un château de grande couronne ou dans une salle parisienne, la magie s'adapte au lieu et à la circulation de vos invités.",
    },
    entrepriseIntro:
      "Vous organisez un séminaire, une convention, un lancement de produit ou une soirée d'entreprise en Île-de-France ? La magie de proximité s'intègre à votre programme sans le bousculer, et fonctionne aussi bien auprès d'un comité restreint que d'un plateau de plusieurs centaines de personnes.",
    lieuxPro: {
      chapo:
        "J'interviens dans les lieux professionnels et événementiels de toute la région, notamment :",
      items: [
        {
          nom: "Les sièges sociaux de La Défense et des Hauts-de-Seine",
          detail: "pour les cocktails et les soirées de fin d'année.",
        },
        {
          nom: "Les centres de congrès et parcs d'exposition",
          detail: "pour les conventions et les salons professionnels.",
        },
        {
          nom: "Les lieux atypiques du nord-est parisien",
          detail: "friches réhabilitées, ateliers, rooftops.",
        },
        {
          nom: "Les domaines séminaires de grande couronne",
          detail: "pour les séminaires résidentiels au vert.",
        },
      ],
    },
    image: {
      src: "/images/site/site-salon-large.webp",
      alt: "Ambiance de soirée d'entreprise pendant une prestation de magie",
      cadrage: "46% 4%",
    },
  },
];

export function getZonePage(slug: string) {
  return zonesPages.find((z) => z.slug === slug);
}

/** Les autres pages locales, pour le maillage interne en bas de page. */
export function autresZones(slug: string) {
  return zonesPages.filter((z) => z.slug !== slug);
}
