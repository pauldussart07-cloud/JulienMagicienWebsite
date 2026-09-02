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
 * Ouverture du site : la photo occupe tout l'écran, le titre monte ligne par
 * ligne. C'est le seul enchaînement animé non déclenché par l'utilisateur.
 * L'animation est en CSS : le titre est donc rendu, et mesuré comme LCP,
 * sans attendre l'hydratation.
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
      className="relative flex h-[100svh] min-h-[36rem] flex-col justify-end overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
        <HeroVideo
          poster="/images/home/hero-poster.webp"
          posterAlt="Julien Lambert fait apparaître une flamme entre ses mains, face à la mer"
        />
        {/* Assez sombre pour le texte, assez clair pour qu'on le voie, lui */}
        <div className="veil-b absolute inset-0" />
        <div className="absolute inset-0 bg-encre-900/25" />
      </motion.div>

      <div className="gutter relative pb-8 sm:pb-10">
        <h1 className="t-display font-display text-carton" aria-label={LIGNES.join(" ")}>
          {LIGNES.map((ligne, i) => (
            <span key={i} className="block overflow-hidden pb-[0.04em]" aria-hidden>
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
