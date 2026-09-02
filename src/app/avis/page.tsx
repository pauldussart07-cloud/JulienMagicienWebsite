import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/magic/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeroTexte } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Note, Stars } from "@/components/ui/stars";
import { clients } from "@/content/site";
import { googleReviewsUrl, temoignages } from "@/content/temoignages";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Avis clients",
  description:
    "100 % d'avis 5 étoiles sur Google. Ce que disent les clients de Julien Lambert après un mariage, une soirée d'entreprise ou une réception privée.",
  alternates: { canonical: "/avis" },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", href: "/" },
          { name: "Avis", href: "/avis" },
        ])}
      />

      <PageHeroTexte
        titre="Ils témoignent"
        intro="Julien affiche 100 % d'avis 5 étoiles sur Google. Voici quelques mots de ceux qui l'ont fait venir chez eux."
      />

      <section className="py-16 lg:py-24">
        <div className="gutter">
          <Note className="mb-14" />

          <div className="border-t border-carton/12">
            {temoignages.map((t, i) => (
              <Reveal
                key={t.auteur}
                delay={i * 0.08}
                className="border-b border-carton/12 py-12 lg:py-16"
              >
                <figure className="grid gap-6 lg:grid-cols-[14rem_1fr] lg:gap-16">
                  <div>
                    <Stars />
                    <figcaption className="mt-4 text-[0.875rem] text-carton/60">
                      {t.auteur}
                      <br />
                      <span className="text-carton/40">{t.ville}</span>
                      {t.contexte && (
                        <>
                          <br />
                          <span className="text-carton/40">{t.contexte}</span>
                        </>
                      )}
                    </figcaption>
                  </div>
                  <blockquote>
                    <p className="max-w-3xl font-display text-[clamp(1.625rem,1.1rem+2vw,2.75rem)] leading-[1.15] tracking-tight text-carton">
                      «&nbsp;{t.texte}&nbsp;»
                    </p>
                  </blockquote>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-[0.95rem] leading-relaxed text-carton/60">
              L&apos;ensemble des avis est consultable sur la fiche Google de
              Julien, où ils sont vérifiés et publiés par les clients
              eux-mêmes.
            </p>
            <ButtonLink
              href={googleReviewsUrl}
              variant="hairline"
              size="lg"
              target="_blank"
              rel="noreferrer noopener"
            >
              Lire les avis sur Google
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Ils ont fait appel à Julien */}
      <section className="register-carton border-t border-encre/10 bg-carton py-14 text-encre">
        <div className="gutter flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
          <p className="shrink-0 text-[0.8125rem] text-encre/55">
            Ils ont fait appel à Julien
          </p>
          <ul className="flex flex-wrap items-center gap-x-12 gap-y-7">
            {clients.map((c) => (
              <li key={c.src}>
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={c.width}
                  height={c.height}
                  className="h-9 w-auto opacity-45 mix-blend-multiply grayscale transition-opacity duration-500 hover:opacity-80"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        lignes={["À votre tour", "d'y assister."]}
        image="/images/galerie/gal-10.webp"
        alt="Magie de proximité pendant un cocktail de mariage"
      />
    </>
  );
}
