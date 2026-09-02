"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/** Les photos où l'on voit la réaction, pas le tour. C'est le vrai produit. */
const CLICHES = [
  {
    src: "/images/galerie/gal-15.webp",
    alt: "Une invitée porte les mains à son visage pendant un tour",
    legende: "Le moment où le groupe cesse de chercher le truc",
  },
  {
    src: "/images/home/home-reaction.webp",
    alt: "Une spectatrice réagit à un tour de magie en extérieur",
    legende: "Vin d'honneur, Bretagne",
  },
  {
    src: "/images/galerie/gal-09.webp",
    alt: "Les mariés regardent un tour de cartes de très près",
    legende: "À vingt centimètres des mains",
  },
  {
    src: "/images/galerie/gal-12.webp",
    alt: "Un cercle d'invités entoure le magicien",
    legende: "Chaque table devient un théâtre",
  },
  {
    src: "/images/galerie/gal-11.webp",
    alt: "Un tour se déroule dans les mains d'une spectatrice",
    legende: "Les objets sont dans vos mains",
  },
  {
    src: "/images/galerie/gal-17.webp",
    alt: "Une salle entière regarde dans la même direction",
    legende: "Cinquante paires d'yeux, une seule direction",
  },
];

export function ReactionsRail() {
  const rail = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Barre de progression du défilement horizontal
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
        {/* Amorce à gauche pour aligner la première image sur la gouttière */}
        <div className="w-5 shrink-0 sm:w-8 lg:w-12" aria-hidden />

        {CLICHES.map((c) => (
          <figure
            key={c.src}
            className="relative h-[26rem] w-[80vw] shrink-0 overflow-hidden sm:w-[26rem] lg:h-[34rem] lg:w-[32rem]"
          >
            <Image
              src={c.src}
              alt={c.alt}
              fill
              sizes="(max-width: 640px) 80vw, 32rem"
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
