import type { Metadata } from "next";
import Link from "next/link";

import { FaqTabs } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeroTexte } from "@/components/sections/page-hero";
import { faqFlat } from "@/content/faq";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Déroulé, durée, nombre d'invités, extérieur, réservation, tarifs : toutes les réponses aux questions posées à Julien Lambert, magicien close-up.",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(),
          breadcrumbSchema([
            { name: "Accueil", href: "/" },
            { name: "Questions fréquentes", href: "/faq" },
          ]),
        ]}
      />

      <PageHeroTexte
        titre="Questions fréquentes"
        intro={`Les ${faqFlat.length} questions que l'on pose le plus souvent à Julien, et ses réponses.`}
      />

      <section className="py-14 lg:py-20">
        <div className="gutter">
          <FaqTabs />

          <p className="mt-14 text-[0.95rem] text-carton/60">
            Votre question n&apos;est pas là ?{" "}
            <Link href="/contact" className="link text-carton">
              Écrivez à Julien
            </Link>
            , il répond rapidement.
          </p>
        </div>
      </section>

      <CtaBand
        lignes={["Une dernière", "question ?"]}
        image="/images/galerie/gal-06.webp"
        alt="Sourires et étonnement autour d'un tour de cartes"
      />
    </>
  );
}
