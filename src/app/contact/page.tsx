import type { Metadata } from "next";
import Image from "next/image";

import { ContactForm } from "@/components/sections/contact-form";
import { Note } from "@/components/ui/stars";
import { site } from "@/content/site";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact et devis",
  description:
    "Parlez de votre événement à Julien Lambert. Réponse rapide et devis personnalisé pour mariages, soirées d'entreprise et réceptions privées.",
  alternates: { canonical: "/contact" },
};

/** Ce que le client obtient en écrivant, repris de l'ancien site. */
const promesses = [
  {
    titre: "Réponse rapide",
    texte: "Julien consulte ses messages tous les jours.",
  },
  {
    titre: "Devis personnalisé",
    texte:
      "Pas de tarif générique : une proposition construite pour votre événement.",
  },
  {
    titre: "Sans engagement",
    texte: "Vous décidez librement, à votre rythme.",
  },
  {
    titre: "Saint-Malo et région parisienne",
    texte:
      "Interventions dans toute la Bretagne et partout en France.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", href: "/" },
          { name: "Contact", href: "/contact" },
        ])}
      />

      <section className="grid lg:min-h-screen lg:grid-cols-[1fr_0.85fr]">
        {/* Formulaire */}
        <div className="px-5 pb-20 pt-32 sm:px-10 lg:pt-40 xl:px-16">
          <h1 className="t-h1 max-w-2xl text-balance font-display text-carton">
            Et si on parlait de votre événement&nbsp;?
          </h1>

          <p className="lede mt-8 text-carton/70">
            Remplissez ce formulaire en deux minutes. Julien vous répond
            personnellement avec une proposition adaptée à votre événement et à
            votre budget.
          </p>

          <div className="rule my-12" />

          <ContactForm />
        </div>

        {/* Colonne d'informations */}
        <aside className="relative flex flex-col justify-between border-t border-carton/12 lg:border-l lg:border-t-0">
          <div className="relative h-64 shrink-0 overflow-hidden lg:h-[28rem]">
            <Image
              src="/images/galerie/gal-01.webp"
              alt="Julien Lambert présente un tour de cartes à des invités"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="veil-b absolute inset-0" />
            {/* La photo affleure le haut de page : on protège le header */}
            <div className="veil-t absolute inset-x-0 top-0 h-32" />
            <div className="absolute inset-x-6 bottom-5">
              <Note />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center px-5 py-14 sm:px-10 xl:px-14">
            <h2 className="t-h3 font-display text-carton">Ce que vous obtenez</h2>

            <dl className="mt-10 border-t border-carton/12">
              {promesses.map((p) => (
                <div key={p.titre} className="border-b border-carton/12 py-6">
                  <dt className="text-[1.0625rem] text-carton">{p.titre}</dt>
                  <dd className="mt-1.5 max-w-sm text-[0.9rem] leading-relaxed text-carton/60">
                    {p.texte}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 space-y-3">
              <p className="text-[0.8125rem] text-carton/45">Ou directement</p>
              <p>
                <a
                  href={site.phoneHref}
                  className="link-hover font-display text-[1.75rem] text-carton"
                >
                  {site.phone}
                </a>
              </p>
              <p>
                <a
                  href={site.emailHref}
                  className="link-hover break-all text-[0.95rem] text-carton/70"
                >
                  {site.email}
                </a>
              </p>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
