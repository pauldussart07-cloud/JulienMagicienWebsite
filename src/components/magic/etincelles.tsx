"use client";

import { useEffect, useRef } from "react";

/**
 * Les étincelles.
 *
 * Elles n'accompagnent qu'un seul passage de l'accueil : de « Vous regardiez
 * au bon endroit » jusqu'à « des visages, des sourires, et des instants que
 * l'on n'oublie pas ». C'est le moment où la page parle de ce qui se passe
 * hors du champ de vision : quelques points de laiton dérivent lentement au
 * bord du regard, sans jamais devenir un décor.
 *
 * Le composant enveloppe la portion concernée et pose un calque fixe par
 * dessus. L'opacité du calque suit la position de ce bloc dans la fenêtre :
 * nulle avant, pleine au milieu, nulle après. Rien n'est dessiné tant que
 * l'on n'est pas dans la plage, et tout s'arrête si le visiteur a demandé
 * moins d'animation.
 */

/** Peu de particules, volontairement : c'est un frémissement, pas une neige. */
const NOMBRE = 26;

type Etincelle = {
  x: number;
  y: number;
  r: number;
  /** Vitesse verticale, en pixels par seconde. Toujours vers le haut. */
  vy: number;
  vx: number;
  /** Phase du scintillement, pour que deux points ne clignotent jamais ensemble. */
  phase: number;
  vitesseScintillement: number;
};

export function Etincelles({ children }: { children: React.ReactNode }) {
  const bloc = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const zone = bloc.current;
    const c = canvas.current;
    if (!zone || !c) return;

    const ctx = c.getContext("2d");
    if (!ctx) return;

    let largeur = 0;
    let hauteur = 0;
    let dpr = 1;

    const dimensionner = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      largeur = window.innerWidth;
      hauteur = window.innerHeight;
      c.width = Math.round(largeur * dpr);
      c.height = Math.round(hauteur * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    dimensionner();

    const naitre = (enBas: boolean): Etincelle => ({
      x: Math.random() * largeur,
      y: enBas ? hauteur + Math.random() * 40 : Math.random() * hauteur,
      r: 0.7 + Math.random() * 1.5,
      vy: 8 + Math.random() * 16,
      vx: (Math.random() - 0.5) * 6,
      phase: Math.random() * Math.PI * 2,
      vitesseScintillement: 0.6 + Math.random() * 1.1,
    });

    const etincelles = Array.from({ length: NOMBRE }, () => naitre(false));

    /**
     * Part de 0 hors de la plage, monte à 1 quand le bloc traverse l'écran.
     * Les deux fondus durent une hauteur de fenêtre chacun : l'apparition et
     * la disparition passent inaperçues.
     */
    const intensite = () => {
      const r = zone.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom <= 0 || r.top >= vh) return 0;
      const entree = Math.min(1, (vh - r.top) / vh);
      const sortie = Math.min(1, r.bottom / vh);
      return Math.max(0, Math.min(entree, sortie));
    };

    let brut = 0;
    let lisse = 0;
    let precedent = performance.now();
    let image = 0;

    const dessiner = (maintenant: number) => {
      image = requestAnimationFrame(dessiner);

      const ecoule = (maintenant - precedent) / 1000;
      // Le déplacement des points est plafonné : un onglet revenu au premier
      // plan après une minute ne doit pas les projeter d'un bord à l'autre.
      const dt = Math.min(ecoule, 0.05);
      precedent = maintenant;

      brut = intensite();
      // Le calque suit le défilement de loin : aucun à-coup au changement de
      // sens. Le lissage est calculé sur le temps réellement écoulé, et non
      // sur le nombre d'images : après un défilement rapide, ou une image
      // sautée, l'opacité rattrape le retard au lieu de traîner.
      lisse += (brut - lisse) * (1 - Math.exp(-ecoule * 5));

      if (lisse < 0.01) {
        if (c.style.opacity !== "0") c.style.opacity = "0";
        return;
      }
      c.style.opacity = String(lisse);

      ctx.clearRect(0, 0, largeur, hauteur);

      for (const e of etincelles) {
        e.y -= e.vy * dt;
        e.x += e.vx * dt;
        e.phase += e.vitesseScintillement * dt * Math.PI;

        if (e.y < -20) Object.assign(e, naitre(true));
        if (e.x < -20) e.x = largeur + 20;
        if (e.x > largeur + 20) e.x = -20;

        // Le scintillement ne descend jamais à zéro : les points respirent.
        const eclat = 0.28 + 0.42 * (0.5 + 0.5 * Math.sin(e.phase));

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(223, 190, 126, ${eclat})`;
        ctx.fill();

        // Un halo très large, très faible : c'est lui qui donne la lueur.
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(199, 154, 75, ${eclat * 0.09})`;
        ctx.fill();
      }
    };

    image = requestAnimationFrame(dessiner);
    window.addEventListener("resize", dimensionner);

    return () => {
      cancelAnimationFrame(image);
      window.removeEventListener("resize", dimensionner);
    };
  }, []);

  return (
    <div ref={bloc} className="relative">
      <canvas
        ref={canvas}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[40] h-full w-full opacity-0 mix-blend-screen transition-opacity duration-300"
      />
      {children}
    </div>
  );
}
