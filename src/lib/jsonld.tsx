import { faqFlat } from "@/content/faq";
import { site, zones } from "@/content/site";
import { baseUrl } from "@/lib/base-url";

/** Fiche entreprise locale : sert aussi de nœud parent aux autres schémas. */
export function performerSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Person"],
    "@id": `${baseUrl}/#julien-lambert`,
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: baseUrl,
    telephone: "+33632786119",
    email: site.email,
    image: `${baseUrl}/og.png`,
    priceRange: "€€",
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
    sameAs: [site.socials.instagram, site.socials.youtube],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      ratingCount: "2",
    },
  };
}

export function faqSchema(items = faqFlat) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceSchema(p: {
  nom: string;
  resume: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.nom,
    description: p.resume,
    url: `${baseUrl}/${p.slug}`,
    serviceType: "Animation magie",
    provider: { "@id": `${baseUrl}/#julien-lambert` },
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
  cover: { src: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.titre,
    description: a.chapo,
    url: `${baseUrl}/blog/${a.slug}`,
    datePublished: a.date,
    image: `${baseUrl}${a.cover.src}`,
    author: { "@id": `${baseUrl}/#julien-lambert` },
    publisher: { "@id": `${baseUrl}/#julien-lambert` },
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
