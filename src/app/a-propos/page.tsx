import type { Metadata } from "next";
import Image from "next/image";

import { Counter } from "@/components/magic/counter";
import { Reveal, RevealLines } from "@/components/magic/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { site, stats } from "@/content/site";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "À propos de Julien Lambert",
  description:
    "De la boîte de magie reçue à 5 ans au métier de magicien professionnel depuis 2019. Le parcours de Julien Lambert, spécialiste du détournement d'attention.",
  alternates: { canonical: "/a-propos" },
};

/** Les quatre valeurs affichées sur l'ancien site, reprises telles quelles. */
const valeurs = [
  {
    titre: "L'élégance du geste",
    texte:
      "Une magie qui se regarde autant qu'elle se subit. Rien de brusque, rien de démonstratif : la technique disparaît derrière le moment.",
  },
  {
    titre: "Un prétexte pour se retrouver",
    texte:
      "La magie n'est pas le but. Elle est ce qui rassemble des gens autour d'une même table, et leur donne quelque chose à se raconter.",
  },
  {
    titre: "Une magie qui s'adapte",
    texte:
      "Mariage, séminaire, anniversaire : le rythme, le registre et le répertoire changent selon les personnes en face.",
  },
  {
    titre: "La maîtrise au service de l'inattendu",
    texte:
      "À trente centimètres des yeux, il n'y a pas de marge d'erreur. C'est cette précision qui rend la surprise possible.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", href: "/" },
          { name: "À propos", href: "/a-propos" },
        ])}
      />

      <PageHero
        label="Le magicien"
        titre="Une obsession devenue un métier"
        intro={`Basé en Bretagne, Julien intervient partout en France depuis ${site.since}. Sa spécialité ? Le détournement d'attention. Sa philosophie ? La magie comme prétexte pour passer un bon moment ensemble.`}
        image="/images/apropos/apropos-hero.webp"
        alt="Julien Lambert présentant un tour à un groupe d'invités attablés"
        hauteur="haute"
      />

      {/* Là où tout a commencé */}
      <section className="register-carton bg-carton text-encre">
        <div className="grid lg:grid-cols-[1fr_0.85fr]">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-10 lg:py-28 xl:px-16">
            <RevealLines
              lines={["Là où tout", "a commencé."]}
              className="t-h2 font-display"
            />

            <Reveal delay={0.12}>
              <div className="prose-fr mt-10 text-[1.0625rem] leading-relaxed text-encre/75">
                <p>
                  Tout part d&apos;une boîte de magie trouvée au pied du sapin,
                  à cinq ans. Ce qui n&apos;aurait dû être qu&apos;un cadeau de
                  Noël de plus est devenu une obsession : comprendre pourquoi
                  un adulte attentif peut regarder une chose et ne pas la voir.
                </p>
                <p>
                  Des années de pratique plus tard, en {site.since}, Julien
                  en fait son métier. Depuis, il joue en close-up et en magie
                  de salon pour des mariages, des soirées d&apos;entreprise et
                  des réceptions privées, de Saint-Malo à la région
                  parisienne.
                </p>
                <p>
                  Sa spécialité tient en une idée : le détournement
                  d&apos;attention, l&apos;alliance du geste précis et de la
                  psychologie. Il ne cherche pas à cacher, mais à guider le
                  regard et la pensée pour créer l&apos;impossible là où tout
                  semblait observable.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Le tirage d'époque est présenté comme un objet posé sur la page,
              pas comme un fond : c'est une pièce d'archive. */}
          <div className="flex items-center justify-center border-t border-encre/15 bg-carton-200 px-8 py-16 lg:border-l lg:border-t-0 lg:px-14">
            <Reveal className="w-full max-w-md">
              <figure>
                <Image
                  src="/images/apropos/apropos-enfant.png"
                  alt="Julien enfant, chapeau haut de forme et cape, sur un tirage d'époque"
                  width={1000}
                  height={712}
                  sizes="(max-width: 1024px) 90vw, 28rem"
                  className="w-full"
                />
                <figcaption className="mark mt-6 text-encre/60">
                  <span>La boîte de magie de Noël, et tout ce qui a suivi</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* Chiffres */}
        <div className="border-t border-encre/15">
          <div className="gutter grid divide-y divide-encre/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((s) => (
              <div
                key={s.label}
                className="py-10 sm:px-8 sm:py-14 sm:first:pl-0 sm:last:pr-0"
              >
                <p className="t-numeral font-display">
                  <Counter value={s.value} />
                </p>
                <p className="mt-4 text-[0.875rem] text-encre/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citation pleine largeur */}
      <section className="border-y border-carton/12">
        <div className="gutter py-24 lg:py-32">
          <p className="t-h2 max-w-5xl text-balance font-display italic text-carton">
            Le détournement d&apos;attention, c&apos;est l&apos;alliance du
            geste précis et de la psychologie.
          </p>
        </div>
      </section>

      {/* Valeurs — quatre convictions, pas une séquence */}
      <section className="py-20 lg:py-28">
        <div className="gutter">
          <h2 className="t-h3 max-w-xl font-display text-carton">
            Ce qui guide chaque prestation
          </h2>

          <dl className="mt-14 grid border-t border-carton/12 sm:grid-cols-2">
            {valeurs.map((v, i) => (
              <Reveal
                key={v.titre}
                delay={(i % 2) * 0.08}
                className={[
                  "border-b border-carton/12 py-10",
                  i % 2 === 0 ? "sm:border-r sm:border-carton/12 sm:pr-12" : "sm:pl-12",
                ].join(" ")}
              >
                <dt className="t-h3 font-display text-carton">{v.titre}</dt>
                <dd className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-carton/65">
                  {v.texte}
                </dd>
              </Reveal>
            ))}
          </dl>

          <p className="mt-16 max-w-3xl text-balance font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-tight text-carton">
            Transformons ensemble un moment ordinaire en un souvenir
            extraordinaire.
          </p>
        </div>
      </section>

      <CtaBand
        lignes={["Parlons de", "votre événement."]}
        image="/images/galerie/gal-12.webp"
        alt="Julien Lambert entouré d'invités pendant une soirée"
      />
    </>
  );
}
