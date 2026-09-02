/**
 * Données de marque et coordonnées — source unique de vérité.
 * Tout le contenu provient du site existant de Julien Lambert.
 */

export const site = {
  name: "Julien Lambert",
  role: "Magicien Close-up",
  tagline: "Magicien close-up & magie de salon",
  url: "https://www.julienlambertmagicien.fr",
  description:
    "Close-up ou magie de salon, une expérience sur mesure pour chaque événement. Mariages, soirées d'entreprise, anniversaires — en Bretagne et dans toute la France.",
  phone: "06 32 78 61 19",
  phoneHref: "tel:+33632786119",
  email: "julienlambertmagicien@gmail.com",
  emailHref: "mailto:julienlambertmagicien@gmail.com",
  zone: "Bretagne & toute la France",
  bases: "Saint-Malo & Région Parisienne",
  since: 2019,
  socials: {
    instagram: "https://www.instagram.com/julienlambertmagicien/",
    instagramHandle: "@julienlambertmagicien",
    youtube: "https://www.youtube.com/@julienlambertmagicien",
  },
} as const;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  {
    href: "/prestations",
    label: "Prestations",
    children: [
      { href: "/close-up", label: "Magie close-up", hint: "Magie rapprochée" },
      { href: "/magie-de-salon", label: "Magie de salon", hint: "50 min de show" },
    ],
  },
  { href: "/galerie", label: "Galerie" },
  { href: "/avis", label: "Avis" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
] as const;

export const stats = [
  { value: "10+", label: "ans sur le terrain" },
  { value: "100%", label: "d'avis 5★ Google" },
  { value: "∞", label: "émotions partagées" },
] as const;

/** Logos clients affichés en bandeau sur l'accueil */
export const clients = [
  { src: "/images/clients/client-sncf.webp", alt: "SNCF", width: 400, height: 225 },
  {
    src: "/images/clients/client-beaumanoir.png",
    alt: "Groupe Beaumanoir",
    width: 400,
    height: 155,
  },
  { src: "/images/clients/client-to.webp", alt: "TO", width: 400, height: 283 },
  {
    src: "/images/clients/client-innerwheel.webp",
    alt: "Inner Wheel",
    width: 400,
    height: 400,
  },
  { src: "/images/clients/client-hq.webp", alt: "Client", width: 345, height: 165 },
] as const;

/** Zones d'intervention — reprises telles quelles de l'ancien site (maillage SEO). */
export const zones = [
  {
    region: "Bretagne",
    slug: "bretagne",
    villes: [
      "Saint-Malo",
      "Rennes",
      "Dinard",
      "Dinan",
      "Cancale",
      "Saint-Briac-sur-Mer",
      "Saint-Méloir-des-Ondes",
      "Saint-Brieuc",
      "Combourg",
      "Fougères",
    ],
  },
  {
    region: "Île-de-France",
    slug: "ile-de-france",
    villes: [
      "Paris",
      "Neuilly-sur-Seine",
      "Versailles",
      "Boulogne-Billancourt",
      "Saint-Germain-en-Laye",
      "Rueil-Malmaison",
      "Saint-Cloud",
      "Levallois-Perret",
    ],
  },
] as const;
