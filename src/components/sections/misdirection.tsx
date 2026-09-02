"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PHOTO = {
  src: "/images/galerie/gal-15.webp",
  alt: "Un groupe d'invités suit des yeux les mains du magicien",
};

/**
 * Le moment signature du site.
 *
 * La photo reste fixe pendant deux hauteurs d'écran. Les deux phrases
 * défilent dans une fenêtre découpée : la première sort par le haut au moment
 * exact où la seconde entre par le bas. Il y a donc toujours une phrase et une
 * seule à l'écran — le regard est déplacé sans jamais être perdu.
 *
 * C'est la mise en scène du détournement d'attention, la spécialité de Julien,
 * et la seule séquence de ce type sur le site.
 */
export function Misdirection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  // La fenêtre glisse d'un cran : phrase 1 sort, phrase 2 entre.
  const trackY = useTransform(scrollYProgress, [0.28, 0.58], ["0%", "-50%"]);

  if (reduce) {
    return (
      <section className="relative flex min-h-[75svh] items-end overflow-hidden border-y border-carton/12">
        <Image src={PHOTO.src} alt={PHOTO.alt} fill sizes="100vw" className="object-cover" />
        <div className="veil-b absolute inset-0" />
        <div className="gutter relative space-y-6 pb-14">
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
      <section className="sticky top-0 flex h-[100svh] items-end overflow-hidden border-y border-carton/12">
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image
            src={PHOTO.src}
            alt={PHOTO.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="veil-b absolute inset-0" />
        <div className="absolute inset-0 bg-encre-900/20" />

        <div className="gutter relative w-full pb-14 lg:pb-20">
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
