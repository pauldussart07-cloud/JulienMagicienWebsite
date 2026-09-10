import type { Metadata } from "next";

import { PrestationPage } from "@/components/sections/prestation-page";
import { faqPour } from "@/content/faq";
import { magieDeSalon } from "@/content/prestations";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Magie de salon",
  description:
    "Un spectacle de magie de salon de 50 minutes pour jusqu'à 50 personnes. L'entre-deux parfait entre la scène et le close-up.",
  path: "/magie-de-salon",
  image: "/images/site/site-salon-hero.webp",
  imageAlt: "Julien Lambert pendant un spectacle de magie de salon",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema(magieDeSalon),
          faqSchema(faqPour("magie-de-salon", 7)),
          breadcrumbSchema([
            { name: "Accueil", href: "/" },
            { name: "Magie de salon", href: "/magie-de-salon" },
          ]),
        ]}
      />
      <PrestationPage p={magieDeSalon} />
    </>
  );
}
