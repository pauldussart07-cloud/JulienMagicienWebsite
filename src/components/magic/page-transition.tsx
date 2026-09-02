"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Transition de page « carte distribuée ».
 *
 * À chaque changement de route, un panneau couleur carton traverse l'écran
 * de gauche à droite, exactement comme une carte que l'on fait glisser sur
 * un tapis. Ne joue pas au premier chargement : le rendu serveur doit rester
 * visible immédiatement.
 */
export function PageTransition() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const first = useRef(true);
  const [dealing, setDealing] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce) return;

    setDealing(true);
    const t = setTimeout(() => setDealing(false), 780);
    return () => clearTimeout(t);
  }, [pathname, reduce]);

  return (
    <AnimatePresence>
      {dealing && (
        <motion.div
          key={pathname}
          className="pointer-events-none fixed inset-0 z-[90]"
          aria-hidden
          initial={{ x: "-102%" }}
          animate={{ x: "0%" }}
          exit={{ x: "102%" }}
          transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="h-full w-full bg-carton" />
          {/* Tranche sombre sur le bord d'attaque : l'épaisseur de la carte */}
          <div className="absolute inset-y-0 right-0 w-px bg-encre-600" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
