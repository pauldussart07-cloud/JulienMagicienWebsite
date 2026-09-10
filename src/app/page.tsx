import type { Metadata } from "next";

import { Etincelles } from "@/components/magic/etincelles";
import { AproposTeaser } from "@/components/sections/apropos-teaser";
import { CtaBand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { Misdirection } from "@/components/sections/misdirection";
import { PrestationsSplit } from "@/components/sections/prestations-split";
import { ReactionsRail } from "@/components/sections/reactions-rail";
import { AvisGalerie } from "@/components/sections/avis-galerie";
import { ClientsBand } from "@/components/sections/temoignages-section";
import { VideoSection } from "@/components/sections/video-section";
import { JsonLd, performerSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: {
    absolute: "Julien Lambert, magicien close-up en Bretagne et à Paris",
  },
  description:
    "Magicien professionnel basé en Bretagne et en région parisienne. Close-up et magie de salon pour mariages, soirées d'entreprise et réceptions privées.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={performerSchema()} />

      <Hero />

      {/* De « Vous regardiez au bon endroit » jusqu'aux visages : le seul
          passage où quelque chose scintille au bord du regard. */}
      <Etincelles>
        <Misdirection />
        <PrestationsSplit />
        <ReactionsRail />
      </Etincelles>

      <VideoSection />
      <AproposTeaser />
      <AvisGalerie />
      <ClientsBand />
      <CtaBand />
    </>
  );
}
