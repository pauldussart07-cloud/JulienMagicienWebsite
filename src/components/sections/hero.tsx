"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { HeroVideo } from "@/components/magic/hero-video";
import { ButtonLink } from "@/components/ui/button";
import { Note } from "@/components/ui/stars";
import { site } from "@/content/site";

const LIGNES = [
  "Close-up ou magie de salon,",
  "une expérience sur mesure",
  "pour chaque événement.",
];

/**
 * Ouverture du site.
 *
 * Le plan source est très large (2,76:1). Étiré en plein cadre sur un écran
 * de téléphone, il faudrait l'agrandir plus de trois fois : l'image devient
 * floue. Sur mobile, la vidéo est donc présentée en bandeau 4/3, recadrée
 * horizontalement — elle reste nette — et le titre se pose dessous, sur
 * l'encre. À partir de `md`, où l'écran est assez large, elle reprend toute
 * la surface.
 *
 * Le titre monte ligne par ligne : c'est le seul enchaînement animé non
 * déclenché par l'utilisateur. L'animation est en CSS, le titre est donc
 * rendu, et mesuré comme LCP, sans attendre l'hydratation.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-20 md:justify-end md:pt-0"
    >
      <motion.div
        className="relative aspect-[4/3] w-full shrink-0 md:absolute md:inset-0 md:aspect-auto md:h-full"
        style={reduce ? undefined : { y }}
      >
        <HeroVideo
          poster="/images/site/site-hero-poster.webp"
          posterAlt="Julien Lambert fait apparaître une flamme entre ses mains, face à la mer"
        />
        {/* Le voile ne sert que là où le texte passe par-dessus l'image */}
        <div className="veil-b absolute inset-0 hidden md:block" />
        <div className="absolute inset-0 hidden bg-encre-900/25 md:block" />
        {/* Sur mobile, un fondu relie le bas du bandeau à l'encre de la page */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-encre-900 to-transparent md:hidden" />
      </motion.div>

      <div className="gutter relative flex flex-1 flex-col justify-end pb-8 pt-10 sm:pb-10 md:flex-none md:pt-0">
        <h1 className="t-display font-display text-carton" aria-label={LIGNES.join(" ")}>
          {LIGNES.map((ligne, i) => (
            <span key={i} className="block text-balance overflow-hidden pb-[0.04em]" aria-hidden>
              <span className="rise" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                {ligne}
              </span>
            </span>
          ))}
        </h1>

        <div className="rule mt-9" />

        <div className="flex flex-col gap-6 pt-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <p className="mark text-carton/70">
              <span>{site.bases}</span>
            </p>
            <p className="mark text-carton/70">
              <span>Depuis {site.since}, partout en France</span>
            </p>
            <Note />
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg">
              Prendre contact
            </ButtonLink>
            <ButtonLink href="#reactions" variant="hairline" size="lg">
              Voir les réactions
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
