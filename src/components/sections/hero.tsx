"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import { useRef } from "react";

import { FloatingCards } from "@/components/magic/floating-cards";
import { ButtonLink } from "@/components/ui/button";
import { GoogleBadge } from "@/components/ui/stars";
import { site } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

/** Titre découpé en mots, révélés un à un depuis le bas. */
function Titre({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <h1
      className="t-hero font-display font-light text-ivory"
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em]">
          <motion.span
            aria-hidden
            className="inline-block"
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.95, delay: 0.25 + i * 0.055, ease }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Parallaxe : la photo remonte plus lentement que le texte
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 lg:pt-32"
    >
      {/* Photo de fond */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduce ? undefined : { y: imageY }}
      >
        <Image
          src="/images/home/hero-cartes.webp"
          alt="Julien Lambert, magicien, au milieu d'une envolée de cartes lors d'un mariage"
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover object-[50%_38%]"
        />
        <div className="photo-veil absolute inset-0" />
        <div className="bg-aurora absolute inset-0 opacity-85" />
        <div className="bg-starfield absolute inset-0 opacity-45" />
      </motion.div>

      {/* Cartes en lévitation */}
      <FloatingCards className="-z-[5]" />

      <motion.div
        className="container relative"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-4xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <GoogleBadge />
          </motion.div>

          <div className="mt-7">
            <Titre text="Close-up ou magie de salon, une expérience sur mesure pour chaque événement." />
          </div>

          <motion.p
            className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-ivory-muted sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease }}
          >
            Basé en Bretagne, Julien intervient partout en France depuis{" "}
            {site.since}. Sa spécialité ? Le détournement d&apos;attention.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
          >
            <ButtonLink href="/contact" size="lg">
              Prendre contact
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="#reactions" variant="outline" size="lg">
              <Eye className="h-4 w-4" />
              Voir les réactions du public
            </ButtonLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Invitation à faire défiler */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[0.62rem] uppercase tracking-[0.3em] text-ivory-dim">
            Découvrir
          </span>
          <span className="relative h-12 w-px overflow-hidden bg-white/15">
            <motion.span
              className="absolute inset-x-0 top-0 h-4 bg-gold-300"
              animate={reduce ? undefined : { y: ["-100%", "300%"] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
