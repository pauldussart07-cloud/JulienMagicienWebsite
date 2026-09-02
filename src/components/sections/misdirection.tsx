"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PHOTO = {
  src: "/images/home/hero-cartes.webp",
  alt: "Julien Lambert au milieu d'une envolée de cartes, le regard fixe",
};

/**
 * Le moment signature du site.
 *
 * La photo reste fixe pendant deux hauteurs d'écran. Les deux phrases
 * défilent dans une fenêtre découpée : la première sort par le haut au moment
 * exact où la seconde entre par le bas. Il y a donc toujours une phrase et une
 * seule à l'écran — le regard est déplacé sans jamais être perdu.
 *
 * Deux précautions de cadrage :
 * — le zoom de parallaxe reste très faible et l'image est ancrée haut, sinon
 *   il rogne le front de Julien ;
 * — sur téléphone, l'image est un bandeau et non un fond plein écran : à
 *   2,29:1 dans un écran vertical, le plein cadre ne montrerait qu'un
 *   cinquième de la largeur, très agrandi.
 */
export function Misdirection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  // La fenêtre glisse d'un cran : phrase 1 sort, phrase 2 entre.
  const trackY = useTransform(scrollYProgress, [0.28, 0.58], ["0%", "-50%"]);

  if (reduce) {
    return (
      <section className="relative flex flex-col justify-end overflow-hidden border-y border-carton/12 pt-16 md:min-h-[75svh] md:pt-0">
        <div className="relative aspect-[2400/1048] w-full shrink-0 md:absolute md:inset-0 md:aspect-auto md:h-full">
          <Image
            src={PHOTO.src}
            alt={PHOTO.alt}
            fill
            sizes="100vw"
            className="object-cover object-[50%_18%]"
          />
          <div className="veil-b absolute inset-0 hidden md:block" />
        </div>
        <div className="gutter relative space-y-6 py-12 md:pb-14">
          <p className="t-h2 font-display italic text-carton">
            Vous regardiez au bon endroit.
          </p>
          <p className="lede text-carton/80">
            Pendant que vos yeux suivaient ce que Julien voulait bien leur
            montrer, l&apos;impossible se construisait juste à côté.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} className="relative h-[230svh]">
      <section className="sticky top-0 flex h-[100svh] flex-col justify-center gap-10 overflow-hidden border-y border-carton/12 pt-16 md:justify-end md:gap-0 md:pt-0">
        <motion.div
          className="relative aspect-[2400/1048] w-full shrink-0 md:absolute md:inset-0 md:aspect-auto md:h-full"
          style={{ scale }}
        >
          <Image
            src={PHOTO.src}
            alt={PHOTO.alt}
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-[50%_18%]"
          />
          {/* Le voile ne sert que là où le texte passe sur l'image */}
          <div className="veil-b absolute inset-0 hidden md:block" />
          <div className="absolute inset-0 hidden bg-encre-900/20 md:block" />
          {/* Sur mobile, un fondu relie le bandeau à l'encre */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-encre-900 to-transparent md:hidden" />
        </motion.div>

        <div className="gutter relative w-full md:pb-14 lg:pb-20">
          {/* Fenêtre : une seule phrase visible à la fois */}
          <div className="h-[9.5rem] overflow-hidden sm:h-[11rem] lg:h-[13rem]">
            <motion.div className="h-[200%]" style={{ y: trackY }}>
              <div className="flex h-1/2 flex-col justify-end pb-2">
                <p className="t-h2 font-display italic text-carton">
                  Vous regardiez au bon endroit.
                </p>
              </div>
              <div className="flex h-1/2 flex-col justify-end pb-2">
                <p className="t-h2 max-w-5xl font-display text-carton">
                  L&apos;impossible se construisait juste à côté.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="rule mt-8" />
          <p className="lede pt-6 text-carton/75">
            Le close-up n&apos;est pas une question de vitesse. C&apos;est une
            question de direction du regard.
          </p>
        </div>
      </section>
    </div>
  );
}
