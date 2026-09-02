import Image from "next/image";

import { Counter } from "@/components/magic/counter";
import { Reveal, RevealImage, RevealLines } from "@/components/magic/reveal";
import { TextLink } from "@/components/ui/button";
import { site, stats } from "@/content/site";

/**
 * Bascule vers le registre clair : le carton d'une carte à jouer.
 * C'est là que le site se lit posément, après le noir du spectacle.
 */
export function AproposTeaser() {
  return (
    <section className="register-carton bg-carton text-encre">
      <div className="grid items-stretch lg:grid-cols-[0.9fr_1.1fr]">
        <RevealImage className="relative min-h-[24rem] lg:min-h-[40rem]">
          <Image
            src="/images/apropos/apropos-hero.webp"
            alt="Julien Lambert présentant un tour à un groupe d'invités"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </RevealImage>

        <div className="flex flex-col justify-center px-5 py-16 sm:px-10 lg:py-24 xl:px-16">
          <RevealLines
            lines={["Basé en Bretagne,", "il intervient partout", "en France."]}
            className="t-h2 font-display"
          />

          <Reveal delay={0.12}>
            <div className="prose-fr mt-9 text-[1.0625rem] leading-relaxed text-encre/75">
              <p>
                Depuis {site.since}, Julien accompagne mariages, soirées
                d&apos;entreprise et réceptions privées. Sa spécialité :
                le détournement d&apos;attention, l&apos;alliance du geste
                précis et de la psychologie.
              </p>
              <p>
                Sa philosophie tient en une phrase : la magie comme prétexte
                pour passer un bon moment ensemble.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-10">
              <TextLink href="/a-propos" className="text-encre">
                Découvrir son parcours
              </TextLink>
            </p>
          </Reveal>
        </div>
      </div>

      {/* Les trois chiffres, séparés par des filets : pas de cartes */}
      <div className="border-t border-encre/15">
        <div className="gutter grid divide-y divide-encre/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="py-10 sm:px-8 sm:py-14 sm:first:pl-0 sm:last:pr-0">
              <p className="t-numeral font-display text-encre">
                <Counter value={s.value} />
              </p>
              <p className="mt-4 text-[0.875rem] text-encre/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
