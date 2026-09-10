"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Boucle vidéo de fond du hero.
 *
 * L'image de poster est rendue côté serveur et reste seule visible tant que
 * la vidéo n'est pas prête : c'est elle qui sert de LCP, la vidéo ne fait que
 * s'y superposer en fondu. On ne charge rien du tout si le visiteur a demandé
 * moins d'animation, s'il est en connexion mesurée, ou sur petit écran, où le
 * poids ne se justifie pas.
 *
 * Le plan est un 2,28:1. Dans le bandeau 4/3 du mobile, un cadrage centré
 * couperait Julien sur le plan de la plage, où il est à gauche : le cadrage
 * est donc décalé, et ne revient au centre qu'en plein cadre, à partir de `md`.
 */
export function HeroVideo({
  poster,
  posterAlt,
}: {
  poster: string;
  posterAlt: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [charger, setCharger] = useState(false);
  const [visible, setVisible] = useState(false);
  /** Fichier retenu, choisi sur la largeur réelle en pixels de l'écran. */
  const [taille, setTaille] = useState<"1280" | "1920" | "2560">("1920");

  useEffect(() => {
    const calme = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calme) return;

    // Connexion mesurée ou lente : on s'en tient à la photo.
    const co = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (co?.saveData) return;
    if (co?.effectiveType && ["slow-2g", "2g", "3g"].includes(co.effectiveType)) return;

    // Chrome ignore l'attribut `media` sur les <source> d'une vidéo : on
    // choisit donc le fichier nous-mêmes. Le critère est la largeur réelle
    // en pixels, densité comprise : un portable Retina de 1440 points en
    // demande 2880, et lui servir du 1920 revient à l'agrandir d'une fois et
    // demie dans le navigateur, ce qui se voit.
    const px = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
    setTaille(px >= 2200 ? "2560" : px >= 1300 ? "1920" : "1280");
    setCharger(true);
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!charger || !el) return;

    const onReady = () => setVisible(true);
    el.addEventListener("canplay", onReady, { once: true });

    // Certains navigateurs refusent la lecture automatique : on reste sur la photo.
    el.play().catch(() => setVisible(false));

    return () => el.removeEventListener("canplay", onReady);
  }, [charger]);

  return (
    <>
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[28%_50%] md:object-center"
      />

      {charger && (
        <video
          ref={video}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster={poster}
          aria-hidden
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover object-[28%_50%] transition-opacity duration-[1200ms] md:object-center ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={`/videos/hero-${taille}.webm`} type="video/webm" />
          <source src={`/videos/hero-${taille}.mp4`} type="video/mp4" />
        </video>
      )}
    </>
  );
}
