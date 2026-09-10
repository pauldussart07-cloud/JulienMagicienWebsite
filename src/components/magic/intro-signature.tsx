"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const CLE = "jl-intro-vue";

/**
 * Ouverture : la signature de Julien s'écrit.
 *
 * Le logo est une écriture manuscrite, tracée de gauche à droite. On révèle
 * l'image par la gauche : l'œil lit une main qui écrit. Le rideau se lève
 * ensuite sur la page, déjà rendue derrière lui.
 *
 * Ne joue qu'une fois par session, jamais si le visiteur a demandé moins
 * d'animation, et jamais en connexion mesurée : c'est un ornement, il ne doit
 * retarder personne qui n'en veut pas.
 */
export function IntroSignature() {
  const [etat, setEtat] = useState<"inconnu" | "joue" | "fini">("inconnu");

  useEffect(() => {
    const calme = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const co = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;

    let dejaVu = false;
    try {
      dejaVu = sessionStorage.getItem(CLE) === "1";
    } catch {
      // Navigation privée ou stockage refusé : on considère que c'est la
      // première fois, l'intro reste inoffensive.
    }

    if (calme || co?.saveData || dejaVu) {
      setEtat("fini");
      return;
    }

    setEtat("joue");
    try {
      sessionStorage.setItem(CLE, "1");
    } catch {
      /* sans conséquence */
    }

    const t = setTimeout(() => setEtat("fini"), 1750);
    return () => clearTimeout(t);
  }, []);

  if (etat === "fini") return null;

  return (
    <div
      aria-hidden
      className={[
        "fixed inset-0 z-[95] flex items-center justify-center bg-encre-900",
        "transition-[opacity,visibility] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
        etat === "joue" ? "opacity-100" : "invisible opacity-0",
      ].join(" ")}
      style={{ transitionDelay: etat === "joue" ? "1050ms" : "0ms" }}
    >
      {/* Le conteneur s'élargit, l'image garde sa largeur : le tracé se dévoile */}
      <div
        className="overflow-hidden"
        style={{
          animation:
            etat === "joue"
              ? "ecrire 1.15s cubic-bezier(0.55, 0, 0.2, 1) both"
              : undefined,
        }}
      >
        <Image
          src="/images/brand/logo-blanc.png"
          alt=""
          width={1200}
          height={322}
          // Préchargé, donc en concurrence directe avec l'image du hero :
          // `sizes` ramène ce préchargement à la taille réellement affichée.
          sizes="(min-width: 640px) 300px, 240px"
          priority
          className="h-16 w-auto max-w-none sm:h-20"
        />
      </div>
    </div>
  );
}
