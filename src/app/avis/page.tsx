import type { Metadata } from "next";

import { AvisGalerie } from "@/components/sections/avis-galerie";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeroTexte } from "@/components/sections/page-hero";
import { ClientsBand } from "@/components/sections/temoignages-section";
import { ButtonLink } from "@/components/ui/button";
import { noteGoogle } from "@/content/temoignages";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Avis clients",
  description:
    "5,0 sur 27 avis Google. Ce que disent les clients de Julien Lambert après un mariage, une soirée d'entreprise ou une réception privée.",
  alternates: { canonical: "/avis" },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", href: "/" },
          { name: "Avis", href: "/avis" },
        ])}
      />

      <PageHeroTexte
        titre="Ils témoignent"
        intro={`${noteGoogle.valeur} sur ${noteGoogle.nombre} avis Google. Voici les mots de ceux qui ont fait venir Julien chez eux.`}
      />

      <AvisGalerie titre="Ce qu'ils en ont dit" />

      <section className="py-16 lg:py-20">
        <div className="gutter flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-[0.95rem] leading-relaxed text-carton/60">
            Ces avis sont publiés par les clients eux-mêmes sur la fiche Google
            de Julien, où ils sont datés et vérifiables. Les textes sont repris
            ici tels quels.
          </p>
          <ButtonLink
            href={noteGoogle.url}
            variant="hairline"
            size="lg"
            target="_blank"
            rel="noreferrer noopener"
          >
            Voir la fiche Google
          </ButtonLink>
        </div>
      </section>

      <ClientsBand />

      <CtaBand
        lignes={["À votre tour", "d'y assister."]}
        image="/images/site/site-portrait.webp"
        alt="Julien Lambert, une pièce entre les doigts, pendant un vin d'honneur"
        position="50% 15%"
      />
    </>
  );
}
