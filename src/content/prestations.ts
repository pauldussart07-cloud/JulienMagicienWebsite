/**
 * Contenu des deux prestations : repris intégralement de l'ancien site.
 */

export type Prestation = {
  slug: "close-up" | "magie-de-salon";
  nom: string;
  accroche: string;
  duree: string;
  resume: string;
  hero: { src: string; alt: string };
  intro: string[];
  citation: string;
  chiffres: { value: string; label: string }[];
  piliers: { titre: string; texte: string }[];
  contextes: { titre: string; texte: string }[];
  temoignage: { auteur: string; ville: string; texte: string };
  pratique: { titre: string; texte: string }[];
  photos: { src: string; alt: string }[];
};

export const closeUp: Prestation = {
  slug: "close-up",
  nom: "Magie close-up",
  accroche: "Magie rapprochée",
  duree: "1h30 à 2h",
  resume:
    "Pas d'écran, pas de distance : juste vos yeux, mes mains, et l'incroyable qui s'invite. Une expérience unique pour vos mariages, cocktails et soirées d'entreprise.",
  hero: {
    src: "/images/closeup/closeup-hero.webp",
    alt: "Julien Lambert en pleine prestation de magie close-up devant des invités",
  },
  intro: [
    "Le close-up est une forme de magie qui se vit à quelques centimètres des yeux des spectateurs, sans scène ni artifices visibles.",
    "Chaque effet se déroule dans leurs mains ou sous leur regard direct, rendant l'expérience particulièrement immersive.",
    "La spécialité de Julien repose sur le détournement d'attention : une combinaison subtile de gestes précis et de mécanismes psychologiques.",
    "Il ne cherche pas à cacher, mais à guider le regard et la pensée pour créer l'impossible là où tout semblait observable.",
    "Car la magie la plus marquante est souvent celle que l'on ne voit pas venir, même lorsqu'on la cherche activement.",
  ],
  citation:
    "Vous ne vous demanderez pas comment c'est arrivé, mais comment vous avez pu passer à côté.",
  chiffres: [
    { value: "Sous vos yeux", label: "À quelques centimètres" },
    { value: "6-12", label: "personnes par groupe" },
    { value: "100%", label: "d'interactions en direct" },
    { value: "2h00", label: "de prestation" },
  ],
  piliers: [
    {
      titre: "Vous regardiez au bon endroit",
      texte:
        "Pendant que vos yeux suivaient ce que Julien voulait bien leur montrer, l'impossible se construisait juste à côté. Le close-up n'est pas une question de vitesse, c'est une question de direction du regard.",
    },
    {
      titre: "La scène, c'est partout",
      texte:
        "Julien n'a pas besoin d'estrade ni de rideau. Il opère entre les verres, les mains, les conversations. Chaque table devient un théâtre, chaque invité un protagoniste.",
    },
    {
      titre: "Adapté à votre événement",
      texte:
        "Mariage, soirée d'entreprise, anniversaire : Julien adapte son approche, son rythme, son registre.",
    },
    {
      titre: "Le moment dont tout le monde parlera",
      texte:
        "Ce n'est pas un tour que vos invités ont « vu ». C'est quelque chose qu'ils ont vécu, et qu'ils ne savent toujours pas expliquer.",
    },
    {
      titre: "Pas un souvenir de magie",
      texte:
        "Un souvenir à vous. Vos invités ne repartiront pas en disant « il était habile ». Ils repartiront en se demandant comment c'est possible.",
    },
    {
      titre: "L'art de mener l'attention",
      texte:
        "À 30 cm de vos yeux, il n'y a pas de marge d'erreur. Julien maîtrise les mécanismes de perception et d'attention.",
    },
  ],
  contextes: [
    {
      titre: "Événement d'entreprise",
      texte:
        "Cocktail de fin d'année, lancement de produit, séminaire, team building. La magie en close-up s'intègre naturellement à tous vos formats professionnels. Julien circule parmi vos collaborateurs et clients, crée des moments de surprise partagée et brise la glace sans effort.",
    },
    {
      titre: "Vin d'honneur de mariage",
      texte:
        "Le vin d'honneur, c'est souvent le moment où les invités attendent, verre en main, sans vraiment savoir quoi faire. Julien transforme ce temps suspendu en expérience.",
    },
    {
      titre: "Anniversaire",
      texte:
        "Qu'il s'agisse d'un 30 ans entre amis ou d'un 60 ans en famille, la magie en close-up s'adapte à l'ambiance et au public.",
    },
    {
      titre: "Soirée privée",
      texte:
        "Dîner entre amis, réception à domicile, soirée dans un lieu privatisé : le close-up est dans son élément quand l'espace est intime.",
    },
    {
      titre: "Foires et salons",
      texte:
        "Stand automobile, salon professionnel, foire commerciale : attirer l'attention dans un espace bruyant et chargé est un défi en soi.",
    },
  ],
  temoignage: {
    auteur: "Jörn H.",
    ville: "Saint-Malo",
    texte:
      "Autant j'ai vu beaucoup de magiciens, autant là c'est du haut niveau. Impressionnant et à recommander.",
  },
  pratique: [
    {
      titre: "1h30-2h à vos côtés",
      texte:
        "Julien s'intègre à votre programme sans le bousculer. Pendant le cocktail, l'apéritif, ou entre les plats, la magie arrive au bon moment, au bon endroit.",
    },
    {
      titre: "Interactif et convivial",
      texte:
        "Chaque effet magique se vit à quelques centimètres des yeux des invités. Ils participent, touchent les objets… et repartent avec un souvenir unique.",
    },
    {
      titre: "20-100 personnes",
      texte:
        "Du dîner intime au cocktail d'entreprise, Julien s'adapte à la taille de votre groupe.",
    },
    {
      titre: "Intérieur ou extérieur",
      texte:
        "Terrasse, jardin, salle de réception, restaurant, rooftop : aucune contrainte technique, aucun aménagement préalable.",
    },
    {
      titre: "Aucune installation requise",
      texte:
        "Pas de scène, pas de sono, pas de câbles. Julien arrive, salue vos invités, et c'est parti.",
    },
    {
      titre: "Modulable",
      texte:
        "Close-up en déambulation pendant le cocktail, close-up de tables en tables pendant le dîner, ou magie de salon : trois ambiances, un seul artiste, une soirée complète.",
    },
  ],
  photos: [
    {
      src: "/images/closeup/closeup-02.webp",
      alt: "Réactions du public pendant un tour de close-up",
    },
    {
      src: "/images/home/home-reaction.webp",
      alt: "Spectatrice stupéfaite par un tour de magie",
    },
  ],
};

export const magieDeSalon: Prestation = {
  slug: "magie-de-salon",
  nom: "Magie de salon",
  accroche: "50 min de show",
  duree: "50 minutes",
  resume:
    "L'entre-deux parfait entre la scène et le close-up. Assez de mise en scène pour un vrai spectacle, assez de proximité pour que rien ne triche. Idéal pour captiver un groupe entier, dans un moment suspendu entre spectacle et confidence.",
  hero: {
    src: "/images/salon/salon-hero.webp",
    alt: "Julien Lambert pendant un spectacle de magie de salon",
  },
  intro: [
    "La magie de salon constitue un format intermédiaire entre le spectacle distant et l'intimité du close-up.",
    "Elle s'adresse à des groupes restreints où chacun observe et ressent les effets.",
    "La mise en scène gagne en ampleur tout en conservant la proximité avec le public.",
  ],
  citation:
    "Assez de mise en scène pour un vrai spectacle, assez de proximité pour que rien ne triche.",
  chiffres: [
    { value: "Sous vos yeux", label: "À quelques centimètres" },
    { value: "50", label: "spectateurs confortablement installés" },
    { value: "100%", label: "d'interactions avec le public" },
    { value: "50 min", label: "de spectacle" },
  ],
  piliers: [
    {
      titre: "Toute la salle regarde au même endroit",
      texte:
        "Cinquante paires d'yeux dirigées vers une même direction, créant une attention collective où chacun vit une expérience unique.",
    },
    {
      titre: "Un spectacle, plusieurs magies",
      texte:
        "Détournement d'attention, manipulation et mentalisme s'enchaînent au fil des 50 minutes.",
    },
    {
      titre: "Lit-il dans les pensées ?",
      texte:
        "Le mentalisme repose sur l'observation et la logique plutôt que sur des artifices.",
    },
    {
      titre: "50 minutes, aucun temps mort",
      texte:
        "Durée calibrée pour maintenir l'énergie auprès d'une cinquantaine de personnes.",
    },
    {
      titre: "Ce dont on parlera encore au dessert",
      texte: "Le spectacle génère des conversations durables entre invités.",
    },
    {
      titre: "La manipulation, à visage découvert",
      texte: "Manipulation visible sous les yeux du public, sans trucage caché.",
    },
  ],
  contextes: [
    {
      titre: "Événement d'entreprise",
      texte:
        "Cocktails de fin d'année, lancements de produit, séminaires, team-building.",
    },
    {
      titre: "Vin d'honneur de mariage",
      texte:
        "Rassemblement des invités autour d'un moment fédérateur pendant l'attente.",
    },
    {
      titre: "Anniversaire",
      texte: "Spectacle rassemblant plusieurs générations pour un moment mémorable.",
    },
    {
      titre: "Soirée privée",
      texte:
        "Dîner entre amis ou réception à domicile transformés en souvenir collectif.",
    },
    {
      titre: "Foires et salons",
      texte:
        "Stand automobile, salon professionnel, foire commerciale devenant destination.",
    },
  ],
  temoignage: {
    auteur: "Gérald M.",
    ville: "Saint-Malo",
    texte:
      "Nous sommes ravis de la prestation de Julien. Nous et nos invités sommes restés subjugués par les divers tours de magie aussi impressionnants les uns que les autres.",
  },
  pratique: [
    {
      titre: "50 min de magie",
      texte: "Format calibré pour construire une histoire complète.",
    },
    {
      titre: "50 personnes",
      texte: "Spectacle rassemblant tout le monde simultanément.",
    },
    {
      titre: "Aucune installation requise",
      texte: "Pas de scène surélevée ni matériel encombrant.",
    },
    {
      titre: "Interactif sans être intrusif",
      texte: "Participation du public sans malaise.",
    },
    {
      titre: "Intérieur comme extérieur",
      texte: "Adaptable à tous les espaces.",
    },
    {
      titre: "Modulable",
      texte: "Combinable avec d'autres formats sur une même soirée.",
    },
  ],
  photos: [
    {
      src: "/images/salon/salon-02.webp",
      alt: "Julien Lambert pendant un spectacle de salon",
    },
    {
      src: "/images/salon/salon-03.webp",
      alt: "Public captivé pendant la magie de salon",
    },
  ],
};

export const prestations: Prestation[] = [closeUp, magieDeSalon];

export function getPrestation(slug: string) {
  return prestations.find((p) => p.slug === slug);
}

/** L'autre prestation, pour le bloc « Les autres prestations proposées ». */
export function getAutrePrestation(slug: string) {
  return prestations.find((p) => p.slug !== slug)!;
}
