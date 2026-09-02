import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Deux traitements seulement, à angles vifs :
 * — `solid` : bloc plein, l'action principale de la page ;
 * — `hairline` : simple filet, tout le reste.
 * Le fond se remplit depuis le bas au survol : rien ne bouge, seul le
 * contraste change.
 */
type Variant = "solid" | "hairline";
type Size = "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center overflow-hidden font-medium leading-none tracking-tight transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-[0.9rem]",
  lg: "px-8 py-4.5 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  solid: "bg-carton text-encre-900 hover:bg-white",
  hairline:
    "border border-carton/25 text-carton hover:border-carton/60 hover:text-encre-900",
};

/** Volet qui monte pour remplir le bouton à filet. */
function Fill({ variant }: { variant: Variant }) {
  if (variant !== "hairline") return null;
  return (
    <span
      aria-hidden
      className="absolute inset-0 origin-bottom scale-y-0 bg-carton transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
      style={{ transitionDuration: "420ms" }}
    />
  );
}

export function ButtonLink({
  variant = "solid",
  size = "md",
  className,
  children,
  ...props
}: { variant?: Variant; size?: Size } & ComponentProps<typeof Link>) {
  return (
    <Link {...props} className={cn(base, variants[variant], sizes[size], className)}>
      <Fill variant={variant} />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </Link>
  );
}

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  ...props
}: { variant?: Variant; size?: Size } & ComponentProps<"button">) {
  return (
    <button {...props} className={cn(base, variants[variant], sizes[size], className)}>
      <Fill variant={variant} />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </button>
  );
}

/**
 * Lien-texte éditorial : le filet sous le mot se rétracte puis se redessine
 * depuis la gauche. Utilisé pour toute la navigation secondaire.
 */
export function TextLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "link-hover inline-block text-[0.95rem] transition-colors duration-300",
        className
      )}
    >
      {children}
    </Link>
  );
}
