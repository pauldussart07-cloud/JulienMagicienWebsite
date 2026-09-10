import type { Metadata } from "next";

import { GalerieGrille } from "@/components/magic/lightbox";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { VideoSection } from "@/components/sections/video-section";
import { photos } from "@/content/galerie";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Regards émerveillés, moments suspendus et souvenirs inoubliables : les photographies des prestations de Julien Lambert, magicien close-up.",
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
        intro="La magie se vit, elle ne se regarde pas. Ces images en donnent un aperçu : la vraie expérience commence quand elle se déroule sous vos yeux."
        image="/images/site/site-galerie-hero.webp"
        alt="Julien Lambert présente un tour à des invités, dans le parc d'un domaine"
        position="50% 45%"
      />

      <section className="py-14 lg:py-20">
        <div className="gutter">
          <GalerieGrille photos={photos} />
        </div>
      </section>

      <VideoSection />

      <CtaBand
        lignes={["Vivez la magie", "en vrai."]}
        image="/images/site/site-salon-cta.webp"
        alt="Public captivé pendant un spectacle de magie de salon"
      />
    </>
  );
}
