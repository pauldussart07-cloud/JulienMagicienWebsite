import type { Metadata } from "next";

import { AproposTeaser } from "@/components/sections/apropos-teaser";
import { CtaBand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { Misdirection } from "@/components/sections/misdirection";
import { PrestationsSplit } from "@/components/sections/prestations-split";
import { ReactionsRail } from "@/components/sections/reactions-rail";
import { TemoignagesSection } from "@/components/sections/temoignages-section";
import { JsonLd, performerSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Julien Lambert | Magicien close-up, Bretagne et toute la France",
  description:
    "Magicien professionnel basé à Saint-Malo et en région parisienne. Close-up et magie de salon pour mariages, soirées d'entreprise et réceptions privées.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={performerSchema()} />

      <Hero />
      <Misdirection />
      <PrestationsSplit />
      <ReactionsRail />
      <AproposTeaser />
      <TemoignagesSection />
      <CtaBand />
    </>
  );
}
