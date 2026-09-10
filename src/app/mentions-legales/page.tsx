import type { Metadata } from "next";

import { pageMetadata } from "@/lib/metadata";

import { PageLegale } from "@/components/sections/page-legale";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description:
    "Éditeur, hébergeur, propriété intellectuelle et responsabilité : les mentions légales du site de Julien Lambert, magicien close-up.",
  path: "/mentions-legales",
  robots: { index: false, follow: true },
});

export default function Page() {
  return (
    <PageLegale
      titre="Mentions légales"
      maj="Septembre 2026"
      sections={[
        {
          titre: "Éditeur du site",
          paragraphes: [
            `${site.name}, magicien professionnel, entrepreneur individuel.`,
            "Siège social : 2 rue Georges Didier, 91320 Wissous, France.",
            "SIRET : 879 483 907 00058, immatriculé au registre du commerce et des sociétés de Saint-Brieuc.",
            "TVA non applicable, article 293 B du code général des impôts.",
            `Téléphone : ${site.phone}. Courriel : ${site.email}.`,
          ],
        },
        {
          titre: "Directeur de la publication",
          paragraphes: [site.name],
        },
        {
          titre: "Hébergement",
          paragraphes: [
            "Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.",
          ],
        },
        {
          titre: "Propriété intellectuelle",
          paragraphes: [
            "L'ensemble des contenus de ce site (textes, photographies, vidéos, logo et éléments graphiques) est protégé par le droit d'auteur. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite.",
            "Les photographies présentées ont été réalisées lors de prestations réelles. Les personnes qui y figurent ont donné leur accord pour cette diffusion.",
          ],
        },
        {
          titre: "Responsabilité",
          paragraphes: [
            "Les informations publiées sur ce site sont fournies à titre indicatif et peuvent évoluer. L'éditeur met tout en œuvre pour en assurer l'exactitude, sans pouvoir garantir qu'elles sont exemptes d'erreur.",
            "Les liens vers des sites tiers n'engagent pas la responsabilité de l'éditeur quant à leur contenu.",
          ],
        },
        {
          titre: "Signaler un contenu",
          paragraphes: [
            `Pour toute demande relative au contenu du site, écrivez à ${site.email}.`,
          ],
        },
      ]}
    />
  );
}
