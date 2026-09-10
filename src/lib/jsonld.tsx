import { faqFlat } from "@/content/faq";
import { teaser } from "@/content/media";
import { site, zones } from "@/content/site";
import { noteGoogle, temoignages } from "@/content/temoignages";
import { baseUrl } from "@/lib/base-url";

/**
 * Données structurées.
 *
 * Un principe gouverne ce fichier : un nœud désigné par `@id` doit exister
 * sur la page qui le désigne. Les schémas Service, BlogPosting et VideoObject
 * renvoient tous à `#julien-lambert` pour dire qui rend le service, qui
 * signe l'article, qui publie la vidéo. Si ce nœud n'est décrit que sur
 * l'accueil, la référence ne mène nulle part partout ailleurs, et Google
 * abandonne la propriété au lieu de la résoudre.
 *
 * `identiteSchema` est donc posé par la mise en page racine, sur toutes les
 * pages. Les schémas de page se contentent ensuite d'y renvoyer.
 */

/** Identifiants stables : ils ne changent jamais, tout le reste y renvoie. */
export const ID = {
  personne: `${baseUrl}/#julien-lambert`,
  site: `${baseUrl}/#site`,
  logo: `${baseUrl}/#logo`,
} as const;

/**
 * Le socle, présent sur chaque page : qui édite le site, et qui est Julien.
 *
 * Volontairement sans les avis. Ils n'ont de sens que sur l'accueil et la
 * page Avis, où `avisSchema` les rattache au même `@id` : les deux nœuds
 * portant le même identifiant sont fusionnés à la lecture.
 */
export function identiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ID.site,
        url: `${baseUrl}/`,
        name: `${site.name}, ${site.role}`,
        description: site.description,
        inLanguage: "fr-FR",
        publisher: { "@id": ID.personne },
      },
      {
        "@type": "ImageObject",
        "@id": ID.logo,
        url: `${baseUrl}/images/brand/logo-original.png`,
        contentUrl: `${baseUrl}/images/brand/logo-original.png`,
        width: 1200,
        height: 322,
        caption: `${site.name}, ${site.role}`,
      },
      {
        "@type": ["LocalBusiness", "Person"],
        "@id": ID.personne,
        name: site.name,
        alternateName: `${site.name}, ${site.role}`,
        jobTitle: site.role,
        description: site.description,
        url: `${baseUrl}/`,
        mainEntityOfPage: { "@id": ID.site },
        telephone: "+33632786119",
        email: site.email,
        image: { "@id": ID.logo },
        logo: { "@id": ID.logo },
        priceRange: "€€",
        currenciesAccepted: "EUR",
        knowsLanguage: ["fr-FR", "en"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Saint-Malo",
          addressRegion: "Bretagne",
          addressCountry: "FR",
        },
        areaServed: zones.flatMap((z) => [
          { "@type": "AdministrativeArea", name: z.region },
          ...z.villes.map((v) => ({ "@type": "City", name: v })),
        ]),
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Magie close-up",
              url: `${baseUrl}/close-up`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Magie de salon",
              url: `${baseUrl}/magie-de-salon`,
            },
          },
        ],
        sameAs: [site.socials.instagram, site.socials.youtube],
      },
    ],
  };
}

/**
 * Les avis, rattachés au nœud d'identité.
 *
 * Réservé à l'accueil et à la page Avis : les répéter sur toutes les pages
 * alourdirait chaque document sans rien apporter.
 */
export function avisSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Person"],
    "@id": ID.personne,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: noteGoogle.valeur.replace(",", "."),
      bestRating: "5",
      worstRating: "1",
      ratingCount: String(noteGoogle.nombre),
    },
    review: temoignages.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.auteur },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.note),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: t.texte,
    })),
  };
}

/**
 * Le teaser.
 *
 * Depuis qu'il est hébergé par le site et non par YouTube, plus personne ne
 * décrit la vidéo à notre place : durée, sujet, vignette et date de mise en
 * ligne doivent être déclarés ici pour qu'elle soit indexable.
 */
export function videoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${baseUrl}/#teaser`,
    name: teaser.titre,
    description: teaser.description,
    thumbnailUrl: [`${baseUrl}${teaser.poster}`],
    uploadDate: teaser.publieLe,
    duration: teaser.duree,
    contentUrl: `${baseUrl}${teaser.src}`,
    width: teaser.largeur,
    height: teaser.hauteur,
    inLanguage: "fr-FR",
    isFamilyFriendly: true,
    publisher: { "@id": ID.personne },
  };
}

export function faqSchema(items = faqFlat) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "fr-FR",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceSchema(p: { nom: string; resume: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/${p.slug}#service`,
    name: p.nom,
    description: p.resume,
    url: `${baseUrl}/${p.slug}`,
    serviceType: "Animation magie",
    category: "Magicien",
    provider: { "@id": ID.personne },
    areaServed: zones.map((z) => ({
      "@type": "AdministrativeArea",
      name: z.region,
    })),
  };
}

export function articleSchema(a: {
  titre: string;
  chapo: string;
  slug: string;
  date: string;
  cover: { src: string; alt?: string };
}) {
  const url = `${baseUrl}/blog/${a.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: a.titre,
    description: a.chapo,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: a.date,
    // Aucun article n'a été retouché depuis sa parution : la date de
    // modification est celle de publication, et le restera tant que le
    // contenu ne bouge pas.
    dateModified: a.date,
    inLanguage: "fr-FR",
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}${a.cover.src}`,
      ...(a.cover.alt ? { caption: a.cover.alt } : {}),
    },
    author: { "@id": ID.personne },
    publisher: { "@id": ID.personne },
    // Décrit sur place plutôt que simplement désigné : le nœud Blog n'existe
    // que sur l'index, et un renvoi seul ne mènerait à rien depuis ici.
    isPartOf: {
      "@type": "Blog",
      "@id": `${baseUrl}/blog#blog`,
      name: `Le blog de ${site.name}`,
      url: `${baseUrl}/blog`,
    },
  };
}

/** Index du blog : la liste des articles, dans l'ordre de parution. */
export function blogSchema(
  articles: { titre: string; slug: string; date: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}/blog#blog`,
    url: `${baseUrl}/blog`,
    name: `Le blog de ${site.name}`,
    inLanguage: "fr-FR",
    publisher: { "@id": ID.personne },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      "@id": `${baseUrl}/blog/${a.slug}#article`,
      headline: a.titre,
      url: `${baseUrl}/blog/${a.slug}`,
      datePublished: a.date,
      author: { "@id": ID.personne },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.href}`,
    })),
  };
}

/** Balise <script> JSON-LD prête à insérer. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
