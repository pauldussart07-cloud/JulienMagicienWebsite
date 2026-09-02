"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import type { Photo } from "@/content/galerie";

/**
 * Mosaïque de la galerie et sa visionneuse.
 *
 * Les images sont posées bord à bord, séparées par un filet d'un pixel :
 * la grille elle-même fait la mise en page, sans cadre ni ombre.
 */
export function GalerieGrille({ photos }: { photos: Photo[] }) {
  const [actif, setActif] = useState<number | null>(null);

  const fermer = useCallback(() => setActif(null), []);
  const suivant = useCallback(
    () => setActif((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );
  const precedent = useCallback(
    () => setActif((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (actif === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
      if (e.key === "ArrowRight") suivant();
      if (e.key === "ArrowLeft") precedent();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [actif, fermer, suivant, precedent]);

  return (
    <>
      <div className="columns-1 gap-px sm:columns-2 lg:columns-3 [&>*]:mb-px">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActif(i)}
            className="group relative block w-full overflow-hidden"
            aria-label={`Agrandir : ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            {/* Le voile se retire au survol : l'image se révèle */}
            <span className="absolute inset-0 bg-encre-900/25 transition-opacity duration-500 group-hover:opacity-0" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {actif !== null && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col bg-encre-900/98 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            role="dialog"
            aria-modal="true"
            aria-label="Visionneuse de la galerie"
          >
            <div className="flex items-center justify-between px-5 py-5 sm:px-8">
              <p className="text-[0.8125rem] text-carton/55">
                {actif + 1} sur {photos.length}
              </p>
              <button
                type="button"
                onClick={fermer}
                aria-label="Fermer la visionneuse"
                className="flex h-10 w-10 items-center justify-center"
              >
                <span className="relative block h-5 w-5">
                  <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-carton" />
                  <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-carton" />
                </span>
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
              <motion.div
                key={actif}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src={photos[actif].src}
                  alt={photos[actif].alt}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />
              </motion.div>

              <button
                type="button"
                onClick={precedent}
                aria-label="Photo précédente"
                className="absolute left-2 top-1/2 hidden h-14 w-10 -translate-y-1/2 items-center justify-center text-carton/60 transition-colors hover:text-carton sm:flex"
              >
                <Chevron direction="gauche" />
              </button>
              <button
                type="button"
                onClick={suivant}
                aria-label="Photo suivante"
                className="absolute right-2 top-1/2 hidden h-14 w-10 -translate-y-1/2 items-center justify-center text-carton/60 transition-colors hover:text-carton sm:flex"
              >
                <Chevron direction="droite" />
              </button>
            </div>

            <p className="mark px-5 pb-6 text-carton/70 sm:px-8">
              <span>{photos[actif].alt}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Chevron({ direction }: { direction: "gauche" | "droite" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      className="h-7 w-7"
      style={direction === "gauche" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M9 5l7 7-7 7" strokeLinecap="square" />
    </svg>
  );
}
