import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHeroTexte } from "@/components/sections/page-hero";
import { PrestationsSplit } from "@/components/sections/prestations-split";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Les prestations",
  description:
    "Magie close-up en déambulation ou spectacle de salon de 50 minutes : deux formats, une seule exigence de proximité.",
  path: "/prestations",
  image: "/images/site/site-salon-large.webp",
  imageAlt: "Julien Lambert pendant un spectacle de magie de salon",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", href: "/" },
          { name: "Prestations", href: "/prestations" },
        ])}
      />

      <PageHeroTexte
        titre="Deux formats, une même proximité"
        intro="Le close-up circule entre vos invités, la magie de salon les rassemble. Les deux se combinent très bien sur une même soirée."
      />

      <PrestationsSplit />

      <CtaBand
        lignes={["Quel format", "pour votre soirée ?"]}
        image="/images/site/site-salon-large.webp"
        alt="Julien Lambert présente un effet à un petit groupe"
      />
    </>
  );
}
