import type { NomIcone } from "@/components/ui/magic-icon";

/**
 * Contenu des deux prestations : repris intégralement de l'ancien site.
 */

export type Prestation = {
  slug: "close-up" | "magie-de-salon";
  nom: string;
  accroche: string;
  duree: string;
  resume: string;
  hero: { src: string; alt: string; position?: string };
  /**
   * Photo du panneau d'accueil. Le hero est cadré pour un plein écran :
   * dans un panneau vertical de moitié d'écran, il ne raconte plus la meme
   * chose. Chaque prestation a donc sa vignette.
   */
  vignette: { src: string; alt: string; position?: string };
  /**
   * Photo du renvoi « L'autre prestation », en bas de la page voisine.
   * C'est un bandeau très large : le hero, cadré pour un plein écran,
   * y perdrait le visage de Julien. On choisit donc une photo et un
   * point d'ancrage faits pour ce format.
   */
  carte: { src: string; alt: string; position: string };
  intro: string[];
  citation: string;
  chiffres: { value: string; label: string }[];
  piliers: { titre: string; texte: string; icone: NomIcone }[];
  contextes: { titre: string; texte: string; icone: NomIcone }[];
  pratique: { titre: string; texte: string; icone: NomIcone }[];
  photos: { src: string; alt: string; position?: string }[];
};

export const closeUp: Prestation = {
  slug: "close-up",
  nom: "Magie close-up",
  accroche: "Magie rapprochée",
  duree: "1h30 à 2h",
  resume:
    "Pas d'écran, pas de distance : juste vos yeux, mes mains, et l'incroyable qui s'invite. Une expérience unique pour vos mariages, cocktails et soirées d'entreprise.",
  hero: {
    src: "/images/site/site-closeup-hero.webp",
    alt: "Julien Lambert en pleine prestation de magie close-up devant des invités attablés",
  },
  vignette: {
    src: "/images/site/site-closeup-hero.webp",
    alt: "Julien Lambert en pleine prestation de magie close-up devant des invités attablés",
  },
  carte: {
    src: "/images/site/site-closeup-large.webp",
    alt: "Julien Lambert présente un tour à des invités pendant un cocktail",
    position: "50% 18%",
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
      icone: "oeil",
      titre: "Vous regardiez au bon endroit",
      texte:
        "Pendant que vos yeux suivaient ce que Julien voulait bien leur montrer, l'impossible se construisait juste à côté. Le close-up n'est pas une question de vitesse, c'est une question de direction du regard.",
    },
    {
      icone: "table",
      titre: "La scène, c'est partout",
      texte:
        "Julien n'a pas besoin d'estrade ni de rideau. Il opère entre les verres, les mains, les conversations. Chaque table devient un théâtre, chaque invité un protagoniste.",
    },
    {
      icone: "cartes",
      titre: "Adapté à votre événement",
      texte:
        "Mariage, soirée d'entreprise, anniversaire : Julien adapte son approche, son rythme, son registre.",
    },
    {
      icone: "bulle",
      titre: "Le moment dont tout le monde parlera",
      texte:
        "Ce n'est pas un tour que vos invités ont « vu ». C'est quelque chose qu'ils ont vécu, et qu'ils ne savent toujours pas expliquer.",
    },
    {
      icone: "etoile",
      titre: "Pas un souvenir de magie",
      texte:
        "Un souvenir à vous. Vos invités ne repartiront pas en disant « il était habile ». Ils repartiront en se demandant comment c'est possible.",
    },
    {
      icone: "main",
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
      icone: "cercle",
    },
    {
      titre: "Vin d'honneur de mariage",
      texte:
        "Le vin d'honneur, c'est souvent le moment où les invités attendent, verre en main, sans vraiment savoir quoi faire. Julien transforme ce temps suspendu en expérience.",
      icone: "etoile",
    },
    {
      titre: "Anniversaire",
      texte:
        "Qu'il s'agisse d'un 30 ans entre amis ou d'un 60 ans en famille, la magie en close-up s'adapte à l'ambiance et au public.",
      icone: "bulle",
    },
    {
      titre: "Soirée privée",
      texte:
        "Dîner entre amis, réception à domicile, soirée dans un lieu privatisé : le close-up est dans son élément quand l'espace est intime.",
      icone: "table",
    },
    {
      titre: "Foires et salons",
      texte:
        "Stand automobile, salon professionnel, foire commerciale : attirer l'attention dans un espace bruyant et chargé est un défi en soi.",
      icone: "regards",
    },
  ],
  pratique: [
    {
      titre: "1h30-2h à vos côtés",
      texte:
        "Julien s'intègre à votre programme sans le bousculer. Pendant le cocktail, l'apéritif, ou entre les plats, la magie arrive au bon moment, au bon endroit.",
      icone: "sablier",
    },
    {
      titre: "Interactif et convivial",
      texte:
        "Chaque effet magique se vit à quelques centimètres des yeux des invités. Ils participent, touchent les objets… et repartent avec un souvenir unique.",
      icone: "main",
    },
    {
      titre: "20-100 personnes",
      texte:
        "Du dîner intime au cocktail d'entreprise, Julien s'adapte à la taille de votre groupe.",
      icone: "regards",
    },
    {
      titre: "Intérieur ou extérieur",
      texte:
        "Terrasse, jardin, salle de réception, restaurant, rooftop : aucune contrainte technique, aucun aménagement préalable.",
      icone: "table",
    },
    {
      titre: "Aucune installation requise",
      texte:
        "Pas de scène, pas de sono, pas de câbles. Julien arrive, salue vos invités, et c'est parti.",
      icone: "cartes",
    },
    {
      titre: "Modulable",
      texte:
        "Close-up en déambulation pendant le cocktail, close-up de tables en tables pendant le dîner, ou magie de salon : trois ambiances, un seul artiste, une soirée complète.",
      icone: "cercle",
    },
  ],
  photos: [
    {
      src: "/images/site/site-closeup-large.webp",
      alt: "Réactions du public pendant un tour de close-up",
      position: "50% 26%",
    },
    {
      src: "/images/site/site-closeup-cta.webp",
      alt: "Une invitée n'en revient pas pendant un tour de close-up",
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
    src: "/images/site/site-salon-hero.webp",
    alt: "Julien Lambert pendant un spectacle de magie de salon, une carte à la main",
    // Julien est haut dans le cadre : centre, le sommet du crâne touche le bord.
    position: "50% 22%",
  },
  vignette: {
    src: "/images/site/site-salon-cta.webp",
    alt: "Julien Lambert présente un effet devant un groupe réuni",
    position: "50% 30%",
  },
  carte: {
    src: "/images/site/site-salon-hero.webp",
    alt: "Julien Lambert pendant un spectacle de magie de salon, une carte à la main",
    position: "50% 22%",
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
      icone: "regards",
      titre: "Toute la salle regarde au même endroit",
      texte:
        "Cinquante paires d'yeux dirigées vers une même direction, créant une attention collective où chacun vit une expérience unique.",
    },
    {
      icone: "cartes",
      titre: "Un spectacle, plusieurs magies",
      texte:
        "Détournement d'attention, manipulation et mentalisme s'enchaînent au fil des 50 minutes.",
    },
    {
      icone: "pensee",
      titre: "Lit-il dans les pensées ?",
      texte:
        "Le mentalisme repose sur l'observation et la logique plutôt que sur des artifices.",
    },
    {
      icone: "sablier",
      titre: "50 minutes, aucun temps mort",
      texte:
        "Durée calibrée pour maintenir l'énergie auprès d'une cinquantaine de personnes.",
    },
    {
      icone: "bulle",
      titre: "Ce dont on parlera encore au dessert",
      texte: "Le spectacle génère des conversations durables entre invités.",
    },
    {
      icone: "main",
      titre: "La manipulation, à visage découvert",
      texte: "Manipulation visible sous les yeux du public, sans trucage caché.",
    },
  ],
  contextes: [
    {
      titre: "Événement d'entreprise",
      texte:
        "Cocktails de fin d'année, lancements de produit, séminaires, team-building.",
      icone: "cercle",
    },
    {
      titre: "Vin d'honneur de mariage",
      texte:
        "Rassemblement des invités autour d'un moment fédérateur pendant l'attente.",
      icone: "etoile",
    },
    {
      titre: "Anniversaire",
      texte: "Spectacle rassemblant plusieurs générations pour un moment mémorable.",
      icone: "bulle",
    },
    {
      titre: "Soirée privée",
      texte:
        "Dîner entre amis ou réception à domicile transformés en souvenir collectif.",
      icone: "table",
    },
    {
      titre: "Foires et salons",
      texte:
        "Stand automobile, salon professionnel, foire commerciale devenant destination.",
      icone: "regards",
    },
  ],
  pratique: [
    {
      titre: "50 min de magie",
      texte: "Format calibré pour construire une histoire complète.",
      icone: "sablier",
    },
    {
      titre: "50 personnes",
      texte: "Spectacle rassemblant tout le monde simultanément.",
      icone: "main",
    },
    {
      titre: "Aucune installation requise",
      texte: "Pas de scène surélevée ni matériel encombrant.",
      icone: "regards",
    },
    {
      titre: "Interactif sans être intrusif",
      texte: "Participation du public sans malaise.",
      icone: "table",
    },
    {
      titre: "Intérieur comme extérieur",
      texte: "Adaptable à tous les espaces.",
      icone: "cartes",
    },
    {
      titre: "Modulable",
      texte: "Combinable avec d'autres formats sur une même soirée.",
      icone: "cercle",
    },
  ],
  photos: [
    {
      src: "/images/site/site-salon-large.webp",
      alt: "Julien Lambert fait tenir deux cordes à des spectatrices",
      // Même raison : sans remonter le cadrage, la tête est coupée.
      position: "50% 5%",
    },
    {
      src: "/images/site/site-salon-cta.webp",
      alt: "Public captivé pendant un spectacle de magie de salon",
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
