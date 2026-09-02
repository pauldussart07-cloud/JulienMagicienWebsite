"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Apparition discrète au scroll. Volontairement sobre : un léger décalage
 * vertical, pas de flou ni d'échelle. Réservé aux blocs de tête de section.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Titre dont chaque ligne monte depuis sous un masque — le texte se
 * « matérialise » ligne par ligne. Passer le titre déjà découpé en lignes
 * pour garder la main sur les césures.
 */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
  once = true,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const label = lines.join(" ");

  if (reduce) {
    return <Tag className={className}>{label}</Tag>;
  }

  const MotionTag = motion[Tag] as typeof motion.h2;

  return (
    <MotionTag
      className={cn("block", className)}
      aria-label={label}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.35 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.085, delayChildren: delay } },
      }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]" aria-hidden>
          <motion.span
            className="block"
            variants={{
              hidden: { y: "108%" },
              show: { y: "0%", transition: { duration: 0.9, ease } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Photo révélée par un volet qui se retire — comme une carte retournée. */
export function RevealImage({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="h-full w-full"
        variants={{
          hidden: { scale: 1.12 },
          show: { scale: 1, transition: { duration: 1.4, delay, ease } },
        }}
      >
        {children}
      </motion.div>
      <motion.span
        className="absolute inset-0 z-10 origin-right bg-encre-900"
        variants={{
          hidden: { scaleX: 1 },
          show: { scaleX: 0, transition: { duration: 1.05, delay, ease } },
        }}
      />
    </motion.div>
  );
}
