import type { Metadata } from "next";

import { GalerieGrille } from "@/components/magic/lightbox";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { photos } from "@/content/galerie";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Regards émerveillés, moments suspendus et souvenirs inoubliables : les photographies des prestations de Julien Lambert, magicien close-up.",
  alternates: { canonical: "/galerie" },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", href: "/" },
          { name: "Galerie", href: "/galerie" },
        ])}
      />

      <PageHero
        label="En images"
        titre="Des regards émerveillés, des moments suspendus"
        intro="La magie se vit, elle ne se regarde pas. Ces images en donnent un aperçu : la vraie expérience commence quand elle se déroule sous vos yeux."
        image="/images/galerie/gal-20.webp"
        alt="Ambiance de soirée pendant une prestation de magie"
      />

      <section className="py-14 lg:py-20">
        <div className="gutter">
          <GalerieGrille photos={photos} />
        </div>
      </section>

      <CtaBand
        lignes={["Vivez la magie", "en vrai."]}
        image="/images/galerie/gal-14.webp"
        alt="Effet de magie rapprochée devant des invités attentifs"
      />
    </>
  );
}
