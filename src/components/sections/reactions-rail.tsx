"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Les photos où l'on voit la réaction, pas le tour.
 *
 * Toutes sont verticales : la carte de la bande l'est aussi, il n'y a donc
 * presque rien à recadrer et l'image reste nette, y compris sur téléphone.
 * `position` remonte le cadrage quand le sujet est haut dans l'image.
 */
const CLICHES = [
  {
    src: "/images/galerie/gal-09.webp",
    alt: "Une mariée suit de très près un tour de cartes",
    legende: "À vingt centimètres des mains",
    position: "50% 45%",
  },
  {
    src: "/images/galerie/gal-10.webp",
    alt: "Une invitée n'en revient pas pendant un tour de close-up",
    legende: "Le moment où plus personne ne cherche le truc",
    position: "50% 32%",
  },
  {
    src: "/images/galerie/gal-14.webp",
    alt: "Julien Lambert entouré d'invités pendant un tour",
    legende: "Chaque table devient un théâtre",
    position: "50% 30%",
  },
  {
    src: "/images/galerie/gal-11.webp",
    alt: "Un tour de magie se déroule dans les mains d'une spectatrice",
    legende: "Les objets sont dans vos mains",
    position: "50% 38%",
  },
  {
    src: "/images/galerie/gal-13.webp",
    alt: "Petit groupe d'invités réuni autour d'un tour de close-up",
    legende: "Rien ne se passe à distance",
    position: "50% 35%",
  },
  {
    src: "/images/galerie/gal-19.webp",
    alt: "Manipulation de cartes en gros plan",
    legende: "Pas d'écran, pas de coulisses",
    position: "50% 40%",
  },
];

export function ReactionsRail() {
  const rail = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="reactions" className="border-b border-carton/12 py-20 lg:py-28">
      <div className="gutter">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="t-h2 max-w-3xl text-balance font-display text-carton">
            Des visages, des sourires, et des instants que l&apos;on n&apos;oublie
            pas
          </h2>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-carton/65">
            Vos invités ne repartiront pas en disant «&nbsp;il était
            habile&nbsp;». Ils repartiront en se demandant comment c&apos;est
            possible.
          </p>
        </div>
      </div>

      <div
        ref={rail}
        className="rail mt-12 flex gap-px overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Photographies de réactions du public, défilement horizontal"
      >
        <div className="w-5 shrink-0 sm:w-8 lg:w-12" aria-hidden />

        {CLICHES.map((c) => (
          <figure
            key={c.src}
            className="relative aspect-[3/4] w-[68vw] shrink-0 overflow-hidden sm:w-[20rem] lg:w-[24rem]"
          >
            <Image
              src={c.src}
              alt={c.alt}
              fill
              sizes="(max-width: 640px) 68vw, (max-width: 1024px) 20rem, 24rem"
              style={{ objectPosition: c.position }}
              className="object-cover"
            />
            <div className="veil-b absolute inset-0" />
            <figcaption className="mark absolute inset-x-5 bottom-5 text-carton">
              <span>{c.legende}</span>
            </figcaption>
          </figure>
        ))}

        <div className="w-5 shrink-0 sm:w-8 lg:w-12" aria-hidden />
      </div>

      <div className="gutter mt-8">
        <div className="flex items-center gap-5">
          <div className="relative h-px w-40 bg-carton/15">
            <div
              className="absolute inset-y-0 left-0 bg-laiton transition-[width] duration-150"
              style={{ width: `${Math.max(progress * 100, 8)}%` }}
            />
          </div>
          <p
            className={cn(
              "text-[0.8125rem] text-carton/45 transition-opacity duration-500",
              progress > 0.02 && "opacity-0"
            )}
          >
            Faites défiler
          </p>
        </div>
      </div>
    </section>
  );
}
