import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Ouverture commune aux pages intérieures : une photo plein bord, le titre
 * posé en bas à gauche. Même dispositif que l'accueil, à une échelle moindre.
 */
export function PageHero({
  titre,
  label,
  intro,
  image,
  alt,
  hauteur = "moyenne",
  position = "50% 50%",
  children,
}: {
  titre: string;
  label?: string;
  intro?: string;
  image: string;
  alt: string;
  hauteur?: "moyenne" | "haute";
  /** Cadrage de la photo, quand le sujet n'est pas au centre. */
  position?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative flex flex-col justify-end overflow-hidden",
        hauteur === "haute"
          ? "min-h-[88svh] sm:min-h-[34rem]"
          : "min-h-[68svh] sm:min-h-[28rem]"
      )}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        style={{ objectPosition: position }}
        className="object-cover"
      />
      <div className="veil-b absolute inset-0" />
      <div className="absolute inset-0 bg-encre-900/20" />

      {/* Le contenu est calé en bas, mais sur une fenêtre courte un titre long
          le fait déborder par le haut, où il passe sous le header fixe. La
          réserve haute vaut la hauteur du header : le bloc s'arrête dessous
          au lieu de glisser derrière. */}
      <div className="gutter relative pb-10 pt-28 sm:pb-14 sm:pt-32">
        {label && (
          <p className="mark mb-5 text-carton/70">
            <span>{label}</span>
          </p>
        )}

        <h1 className="t-h1 max-w-5xl text-balance font-display text-carton">
          {titre}
        </h1>

        {intro && (
          <>
            <div className="rule mt-9" />
            <p className="lede max-w-2xl pt-6 text-carton/75">{intro}</p>
          </>
        )}

        {children}
      </div>
    </section>
  );
}

/** Ouverture sans photo, pour les pages de texte (mentions, confidentialité). */
export function PageHeroTexte({
  titre,
  intro,
}: {
  titre: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-carton/12 pb-14 pt-36 sm:pt-44">
      <div className="gutter">
        <h1 className="t-h1 max-w-4xl text-balance font-display text-carton">
          {titre}
        </h1>
        {intro && <p className="lede mt-8 text-carton/70">{intro}</p>}
      </div>
    </section>
  );
}
