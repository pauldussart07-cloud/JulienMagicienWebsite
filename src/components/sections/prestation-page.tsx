import Image from "next/image";
import Link from "next/link";

import { Reveal, RevealImage, RevealLines } from "@/components/magic/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqListe } from "@/components/sections/faq-section";
import { PageHero } from "@/components/sections/page-hero";
import { TemoignageUnique } from "@/components/sections/temoignages-section";
import { faqPour } from "@/content/faq";
import { getAutrePrestation, type Prestation } from "@/content/prestations";

/** Gabarit commun aux deux pages prestation. */
export function PrestationPage({ p }: { p: Prestation }) {
  const autre = getAutrePrestation(p.slug);
  const questions = faqPour(p.slug, 7);

  return (
    <>
      <PageHero
        label={p.accroche}
        titre={p.nom}
        image={p.hero.src}
        alt={p.hero.alt}
        hauteur="haute"
      />

      {/* Chiffres clés : une ligne de filets, pas des cartes */}
      <section className="border-b border-carton/12">
        <div className="gutter grid divide-y divide-carton/12 sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
          {p.chiffres.map((c) => (
            <div
              key={c.label}
              className="py-8 sm:px-7 sm:py-10 lg:first:pl-0 lg:last:pr-0"
            >
              <p className="font-display text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] leading-none text-carton">
                {c.value}
              </p>
              <p className="mt-3 text-[0.8125rem] leading-snug text-carton/55">
                {c.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Présentation + citation */}
      <section className="py-20 lg:py-28">
        <div className="gutter grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <div className="prose-fr text-[1.0625rem] leading-relaxed text-carton/75">
              {p.intro.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:pt-4">
            <p className="font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-[1.1] tracking-tight text-carton">
              «&nbsp;{p.citation}&nbsp;»
            </p>
          </Reveal>
        </div>
      </section>

      {/* Les piliers */}
      <section className="register-carton bg-carton py-20 text-encre lg:py-28">
        <div className="gutter">
          <RevealLines
            lines={
              p.slug === "close-up"
                ? ["Trop proche", "pour être une illusion"]
                : ["Un spectacle,", "plusieurs magies"]
            }
            className="t-h2 font-display"
          />

          <dl className="mt-16 grid border-t border-encre/15 md:grid-cols-2 xl:grid-cols-3">
            {p.piliers.map((pilier, i) => (
              <Reveal
                key={pilier.titre}
                delay={(i % 3) * 0.06}
                className="border-b border-encre/15 py-9 md:pr-10"
              >
                <dt className="t-h3 font-display">{pilier.titre}</dt>
                <dd className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-encre/65">
                  {pilier.texte}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Photo pleine largeur */}
      <RevealImage className="relative h-[55svh] min-h-[22rem]">
        <Image
          src={p.photos[0].src}
          alt={p.photos[0].alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </RevealImage>

      {/* Contextes */}
      <section className="border-y border-carton/12 py-20 lg:py-28">
        <div className="gutter">
          <h2 className="t-h2 max-w-3xl text-balance font-display text-carton">
            {p.slug === "close-up"
              ? "Le close-up au cœur de votre événement"
              : "La magie de salon au cœur de votre événement"}
          </h2>

          <dl className="mt-14 border-t border-carton/12">
            {p.contextes.map((c, i) => (
              <Reveal
                key={c.titre}
                delay={i * 0.04}
                className="grid gap-4 border-b border-carton/12 py-8 lg:grid-cols-[18rem_1fr] lg:gap-12"
              >
                <dt className="t-h3 font-display text-carton">{c.titre}</dt>
                <dd className="max-w-3xl text-[0.95rem] leading-relaxed text-carton/65">
                  {c.texte}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <TemoignageUnique {...p.temoignage} />

      {/* En pratique */}
      <section className="register-carton bg-carton-200 py-20 text-encre lg:py-28">
        <div className="gutter">
          <h2 className="t-h2 max-w-2xl font-display">En pratique</h2>

          <dl className="mt-14 grid border-t border-encre/15 sm:grid-cols-2 lg:grid-cols-3">
            {p.pratique.map((item) => (
              <div
                key={item.titre}
                className="border-b border-encre/15 py-9 sm:pr-10"
              >
                <dt className="font-display text-[1.375rem] leading-snug">
                  {item.titre}
                </dt>
                <dd className="mt-3 max-w-xs text-[0.9rem] leading-relaxed text-encre/65">
                  {item.texte}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Questions fréquentes */}
      <section className="py-20 lg:py-28">
        <div className="gutter grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-20">
          <div>
            <h2 className="t-h2 font-display text-carton">Questions fréquentes</h2>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-carton/60">
              Une question qui n&apos;est pas là ?{" "}
              <Link href="/contact" className="link text-carton">
                Écrivez à Julien
              </Link>
              , il répond vite.
            </p>
          </div>
          <FaqListe items={questions} />
        </div>
      </section>

      {/* L'autre prestation */}
      <section className="border-t border-carton/12">
        <Link
          href={`/${autre.slug}`}
          className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden lg:min-h-[32rem]"
        >
          <Image
            src={autre.hero.src}
            alt={autre.hero.alt}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
          <div className="veil-panel absolute inset-0" />
          <div className="gutter relative pb-12">
            <p className="mark text-carton/70">
              <span>L&apos;autre prestation</span>
            </p>
            <h2 className="t-h2 mt-4 font-display text-carton">{autre.nom}</h2>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-carton/70">
              {autre.resume}
            </p>
            <p className="link-hover mt-7 inline-block text-[0.95rem] text-carton">
              Découvrir
            </p>
          </div>
        </Link>
      </section>

      <CtaBand
        lignes={["Réserver votre", `animation ${p.slug === "close-up" ? "close-up" : "de salon"}.`]}
        image={p.photos[1].src}
        alt={p.photos[1].alt}
      />
    </>
  );
}
