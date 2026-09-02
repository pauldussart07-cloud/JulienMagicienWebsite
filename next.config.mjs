/**
 * Redirections de migration.
 *
 * L'ancien site Wix exposait 31 pages et 6 articles. Toutes les URL qui
 * portaient du référencement sont conservées à l'identique (accueil, à propos,
 * close-up, magie de salon, contact, avis, galerie, faq, blog, et les cinq
 * pages « magicien à … »). Les autres sont redirigées en 301 :
 *
 *   - les deux pages légales, dont l'URL Wix contenait des accents ;
 *   - les articles, qui passent de /post/<slug accentué> à /blog/<slug> ;
 *   - les treize pages « copie-de-… », brouillons Wix laissés indexés,
 *     renvoyées vers la page la plus proche.
 */

/** Articles : ancien slug Wix -> nouveau slug. */
const ARTICLES = [
  [
    "pourquoi-la-magie-transforme-un-séminaire-d-entreprise-en-moment-que-personne-n-oublie",
    "magie-seminaire-entreprise-moment-inoubliable",
  ],
  [
    "la-magie-en-close-up-un-atout-pour-animer-votre-soirée-et-briser-la-glace-entre-invités",
    "magie-close-up-briser-la-glace",
  ],
  [
    "10-raisons-de-choisir-un-magicien-expérimenté-pour-votre-soirée",
    "10-raisons-de-choisir-un-magicien-experimente",
  ],
  [
    "l-importance-de-choisir-un-magicien-aux-effets-et-techniques-variés-pour-vos-événements",
    "magicien-effets-et-techniques-varies",
  ],
  [
    "pourquoi-vous-oubliez-90-des-tours-de-magie-que-vous-voyez-sur-instagram-et-jamais-ceux-vécus-en-v",
    "pourquoi-vous-oubliez-les-tours-de-magie-sur-instagram",
  ],
  [
    "le-détournement-d-attention-comment-notre-cerveau-filtre-les-signaux-forts-et-faibles",
    "detournement-attention-signaux-forts-et-faibles",
  ],
];

/** Brouillons Wix -> page la plus pertinente. */
const BROUILLONS = [
  ["copie-de-magicien-paris", "/magicien-paris"],
  ["copie-de-copie-de-magicien-paris", "/magicien-paris"],
  ["copie-de-magicien-rennes", "/magicien-rennes"],
  ["copie-de-copie-de-magicien-rennes", "/magicien-rennes"],
  ["copie-de-copie-de-copie-de-magicien-r", "/magicien-rennes"],
  ["copie-de-saint-brieuc", "/magicien-bretagne"],
  ["copie-de-saint-brieuc-1", "/magicien-bretagne"],
  ["copie-de-copie-de-saint-brieuc", "/magicien-bretagne"],
  ["copie-de-saint-cloud", "/magicien-ile-de-france"],
];

/**
 * 301 plutôt que le 308 par défaut de Next : les deux sont équivalents pour
 * Google, mais le 301 est compris par tous les outils d'analyse de liens.
 *
 * Les URL accentuées arrivent tantôt décodées, tantôt percent-encodées selon
 * le client : on déclare les deux formes.
 */
function versionsAccentuees(chemin, destination) {
  const encode = encodeURI(chemin);
  const sources = encode === chemin ? [chemin] : [chemin, encode];
  return sources.map((source) => ({ source, destination, statusCode: 301 }));
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Plusieurs lockfiles existent sur la machine : on fige la racine du projet.
  outputFileTracingRoot: import.meta.dirname,
  // Une seule forme d'URL fait foi, sans barre oblique finale.
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },

  async redirects() {
    return [
      // Pages légales : les accents disparaissent de l'URL
      ...versionsAccentuees(
        "/politique-de-confidentialité",
        "/politique-de-confidentialite"
      ),
      ...versionsAccentuees("/mentions-légales", "/mentions-legales"),

      // Articles
      ...ARTICLES.flatMap(([ancien, nouveau]) =>
        versionsAccentuees(`/post/${ancien}`, `/blog/${nouveau}`)
      ),
      // Tout autre article de l'ancien blog atterrit sur l'index
      { source: "/post/:slug*", destination: "/blog", statusCode: 301 },

      // Brouillons Wix
      ...BROUILLONS.map(([slug, destination]) => ({
        source: `/${slug}`,
        destination,
        statusCode: 301,
      })),
      { source: "/copie-de-:reste", destination: "/", statusCode: 301 },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/:all*(webp|png|jpg|jpeg|svg|mp4|webm|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
