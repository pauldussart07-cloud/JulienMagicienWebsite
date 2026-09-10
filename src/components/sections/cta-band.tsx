import Image from "next/image";

import { Reveal, RevealLines } from "@/components/magic/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Note } from "@/components/ui/stars";
import { site } from "@/content/site";

/**
 * Bandeau de conversion en pied de chaque page.
 * Photo plein bord à gauche, appel à l'action à droite : le regard finit
 * toujours sur la même chose.
 */
export function CtaBand({
  lignes = ["Prêt pour", "l'impossible ?"],
  image = "/images/site/site-cta-accueil.webp",
  alt = "Julien Lambert manipule au milieu des invités, pendant un vin d'honneur",
  position = "50% 25%",
}: {
  lignes?: string[];
  image?: string;
  alt?: string;
  /** Cadrage de la photo, quand le sujet n'est pas au centre. */
  position?: string;
}) {
  return (
    <section className="relative border-t border-carton/12 bg-encre-900">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[22rem] lg:min-h-[38rem]">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectPosition: position }}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-5 py-16 sm:px-10 lg:py-20 xl:px-16">
          <RevealLines
            lines={lignes}
            className="t-h2 font-display text-carton"
          />

          <Reveal delay={0.1}>
            <p className="lede mt-8 text-carton/70">
              Mariages, cocktails, soirées d&apos;entreprise, anniversaires.
              Écrivez à Julien pour parler de votre projet : il répond
              rapidement, avec un devis adapté à votre événement.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact" size="lg">
                Demander un devis
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="hairline" size="lg">
                {site.phone}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="rule mt-12" />
            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 text-[0.8125rem] text-carton/55">
              <Note />
              <a href={site.emailHref} className="link-hover">
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
