import { Reveal } from "@/components/magic/reveal";
import { TextLink } from "@/components/ui/button";
import { Stars } from "@/components/ui/stars";
import { googleReviewsUrl, temoignages } from "@/content/temoignages";
import { clients } from "@/content/site";

import Image from "next/image";

/**
 * Avis et logos clients sur le registre clair.
 * Les citations sont posées en grand serif : ce sont les mots des clients
 * qui portent la page, pas un habillage de carte.
 */
export function TemoignagesSection() {
  return (
    <section className="register-carton bg-carton-200 text-encre">
      <div className="gutter py-20 lg:py-28">
        <h2 className="t-h2 max-w-2xl font-display">Leurs mots, leur expérience</h2>

        <div className="mt-14 grid gap-px border-t border-encre/15 md:grid-cols-2">
          {temoignages.map((t, i) => (
            <Reveal
              key={t.auteur}
              delay={i * 0.1}
              className={[
                "py-10 md:py-14",
                i === 0 ? "md:border-r md:border-encre/15 md:pr-12" : "md:pl-12",
              ].join(" ")}
            >
              <figure>
                <Stars tone="dark" />
                <blockquote className="mt-6">
                  <p className="font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-[1.18] tracking-tight">
                    «&nbsp;{t.texte}&nbsp;»
                  </p>
                </blockquote>
                <figcaption className="mt-7 text-[0.875rem] text-encre/60">
                  {t.auteur}, {t.ville}
                  {t.contexte ? ` — ${t.contexte}` : ""}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 border-t border-encre/15 pt-8">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="link-hover text-[0.95rem] text-encre"
          >
            Lire tous les avis sur Google
          </a>
        </div>
      </div>

      {/* Ils ont fait appel à Julien */}
      <div className="border-t border-encre/15">
        <div className="gutter flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:gap-16">
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
                  className="h-8 w-auto opacity-45 mix-blend-multiply grayscale transition-opacity duration-500 hover:opacity-80 lg:h-9"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Version courte réutilisée en bas des pages prestation. */
export function TemoignageUnique({
  auteur,
  ville,
  texte,
}: {
  auteur: string;
  ville: string;
  texte: string;
}) {
  return (
    <section className="border-y border-carton/12">
      <div className="gutter py-20 lg:py-28">
        <figure className="max-w-4xl">
          <Stars />
          <blockquote className="mt-7">
            <p className="t-h3 font-display italic text-carton">
              «&nbsp;{texte}&nbsp;»
            </p>
          </blockquote>
          <figcaption className="mt-8 text-[0.875rem] text-carton/55">
            {auteur}, {ville}
          </figcaption>
        </figure>
        <p className="mt-10">
          <TextLink href="/avis" className="text-carton">
            Voir tous les avis
          </TextLink>
        </p>
      </div>
    </section>
  );
}
