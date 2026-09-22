"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PHOTO = {
  src: "/images/site/site-cartes-envol.webp",
  alt: "Julien Lambert au milieu d'une envolée de cartes, le regard fixe",
};

/**
 * Le moment signature du site.
 *
 * La photo reste fixe pendant deux hauteurs d'écran. Les deux phrases se
 * remplacent par un fondu enchaîné, au même endroit : la première se dissout
 * vers le haut pendant que la seconde monte à sa place. Elles se recouvrent au
 * milieu du passage : il n'y a donc jamais deux phrases installées, ni le long
 * moment sans aucune que laissait le défilement précédent.
 *
 * L'image occupe tout le cadre, y compris sur téléphone : le texte posé
 * dessus fait toute la force de la séquence. Le recadrage vertical d'un
 * écran de téléphone est compensé en servant la photo à sa résolution
 * maximale (3000 px de large).
 *
 * Le zoom de parallaxe reste très faible et l'image est ancrée haut : au-delà,
 * il rogne le front de Julien.
 */
export function Misdirection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  // Fondu enchaîné : les deux phrases occupent le même espace et se
  // recouvrent entre 0,34 et 0,46. La première s'efface vers le haut, la
  // seconde monte pour prendre sa place. L'une n'attend plus que l'autre ait
  // fini de sortir : il n'y a plus de vide entre les deux.
  //
  // Opacité et déplacement seulement : un flou animé sur un titre de cette
  // taille se paie en images perdues sur téléphone, pour un gain qu'on ne
  // voit pas passer.
  const opacite1 = useTransform(scrollYProgress, [0.3, 0.46], [1, 0]);
  const y1 = useTransform(scrollYProgress, [0.3, 0.46], ["0rem", "-1.4rem"]);

  const opacite2 = useTransform(scrollYProgress, [0.34, 0.5], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.34, 0.5], ["1.4rem", "0rem"]);

  if (reduce) {
    return (
      <section className="relative flex min-h-[80svh] items-end overflow-hidden border-y border-carton/12">
        <Image
          src={PHOTO.src}
          alt={PHOTO.alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_18%]"
        />
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
            priority={false}
            sizes="100vw"
            className="object-cover object-[50%_18%]"
          />
        </motion.div>

        {/* Le voile porte le texte sans effacer la photo */}
        <div className="veil-b absolute inset-0" />
        <div className="absolute inset-0 bg-encre-900/20" />

        <div className="gutter relative w-full pb-14 lg:pb-20">
          {/* Les deux phrases sont calées sur le même bas de bloc : la hauteur
              réservée est celle de la plus longue, et rien ne bouge sous elles
              pendant l'échange. */}
          <div className="relative h-[9rem] sm:h-[10.5rem] lg:h-[12rem]">
            <motion.p
              className="t-h2 absolute inset-x-0 bottom-0 font-display italic text-carton"
              style={{ opacity: opacite1, y: y1 }}
            >
              Vous regardiez au bon endroit.
            </motion.p>
            <motion.p
              className="t-h2 absolute inset-x-0 bottom-0 max-w-5xl font-display text-carton"
              style={{ opacity: opacite2, y: y2 }}
            >
              L&apos;impossible se construisait juste à côté.
            </motion.p>
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
