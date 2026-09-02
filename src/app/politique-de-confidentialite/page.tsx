import type { Metadata } from "next";

import { PageLegale } from "@/components/sections/page-legale";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Quelles données sont collectées sur ce site, pourquoi, combien de temps, et comment exercer vos droits.",
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <PageLegale
      titre="Politique de confidentialité"
      intro="Ce site collecte le strict nécessaire pour répondre à vos demandes de devis. Rien de plus."
      maj="Septembre 2026"
      sections={[
        {
          titre: "Responsable du traitement",
          paragraphes: [
            `${site.name}, magicien professionnel. Pour toute question sur vos données : ${site.email}.`,
          ],
        },
        {
          titre: "Données collectées",
          paragraphes: [
            "Lorsque vous remplissez le formulaire de contact, sont collectés : vos nom et prénom, votre adresse e-mail, votre numéro de téléphone, le type et la ville de votre événement, la prestation souhaitée, le nombre d'invités, la date envisagée et le message que vous rédigez.",
            "Aucun autre traitement n'est réalisé : le site ne dépose ni cookie publicitaire, ni traceur de mesure d'audience.",
          ],
        },
        {
          titre: "Finalité et base légale",
          paragraphes: [
            "Ces informations servent uniquement à répondre à votre demande et à établir un devis. La base légale est votre consentement, matérialisé par l'envoi du formulaire, ainsi que l'exécution de mesures précontractuelles.",
          ],
        },
        {
          titre: "Destinataires",
          paragraphes: [
            `Les messages sont transmis à ${site.name} par courriel, via le service d'acheminement Resend. Aucune donnée n'est vendue, louée ou transmise à des tiers à des fins commerciales.`,
          ],
        },
        {
          titre: "Durée de conservation",
          paragraphes: [
            "Les demandes sont conservées trois ans à compter du dernier échange, puis supprimées. Les données liées à une prestation effectivement réalisée sont conservées pendant la durée légale applicable aux documents comptables.",
          ],
        },
        {
          titre: "Vos droits",
          paragraphes: [
            "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition sur vos données, ainsi que d'un droit à la portabilité.",
            `Pour exercer ces droits, écrivez à ${site.email}. Une réponse vous sera apportée dans un délai d'un mois.`,
            "Si la réponse ne vous convient pas, vous pouvez saisir la CNIL (www.cnil.fr).",
          ],
        },
        {
          titre: "Sécurité",
          paragraphes: [
            "Le site est servi exclusivement en HTTPS. Les données transmises via le formulaire ne sont pas stockées sur le site : elles sont acheminées directement par courriel.",
          ],
        },
      ]}
    />
  );
}
