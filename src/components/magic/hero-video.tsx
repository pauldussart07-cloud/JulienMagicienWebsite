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
  /** Fichier retenu : le petit en dessous de 900 px de large. */
  const [taille, setTaille] = useState<"1280" | "1920">("1920");

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

    // Chrome ignore l'attribut `media` sur les <source> d'une vidéo :
    // on choisit donc le fichier nous-mêmes.
    setTaille(window.innerWidth < 900 ? "1280" : "1920");
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
        className="object-cover object-center"
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
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1200ms] ${
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
