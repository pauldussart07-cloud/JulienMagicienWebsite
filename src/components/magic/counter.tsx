"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Compteur animé. Accepte des valeurs non numériques (« ∞ », « 100% »,
 * « 10+ ») : la partie chiffrée est animée, le reste est conservé tel quel.
 */
export function Counter({
  value,
  className,
  duration = 1.6,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const match = value.match(/^(\D*)(\d[\d\s]*)(.*)$/);

  useEffect(() => {
    if (!inView || reduce || !match || !ref.current) return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/\s/g, ""));
    const node = ref.current;

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        node.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, reduce, match, duration]);

  // Pas de chiffre à animer (« ∞ ») : on affiche simplement la valeur.
  if (!match || reduce) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {match[1]}0{match[3]}
    </span>
  );
}
