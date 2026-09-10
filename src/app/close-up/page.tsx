import type { Metadata } from "next";

import { PrestationPage } from "@/components/sections/prestation-page";
import { faqPour } from "@/content/faq";
import { closeUp } from "@/content/prestations";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Magicien close-up",
  description:
    "Magie close-up à quelques centimètres des yeux de vos invités. Mariages, cocktails et soirées d'entreprise en Bretagne et dans toute la France.",
  path: "/close-up",
  image: "/images/site/site-closeup-hero.webp",
  imageAlt: "Julien Lambert en prestation de magie close-up",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema(closeUp),
          faqSchema(faqPour("close-up", 7)),
          breadcrumbSchema([
            { name: "Accueil", href: "/" },
            { name: "Magie close-up", href: "/close-up" },
          ]),
        ]}
      />
      <PrestationPage p={closeUp} />
    </>
  );
}
