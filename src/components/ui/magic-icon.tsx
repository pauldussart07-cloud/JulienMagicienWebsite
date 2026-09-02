import { cn } from "@/lib/utils";

/**
 * Petits repères dessinés au trait, propres au vocabulaire de Julien :
 * le regard, la main, les cartes, la table, le temps. Un seul poids de trait,
 * aucun aplat, aucune icône générique de bibliothèque — ils se lisent comme
 * des annotations tracées à la plume à côté du texte.
 */
export type NomIcone =
  | "oeil"
  | "main"
  | "cartes"
  | "bulle"
  | "etoile"
  | "table"
  | "regards"
  | "sablier"
  | "pensee"
  | "cercle";

const CHEMINS: Record<NomIcone, React.ReactNode> = {
  // Un œil ouvert : ce que l'on croit voir
  oeil: (
    <>
      <path d="M1.5 12S5 5.5 12 5.5 22.5 12 22.5 12 19 18.5 12 18.5 1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  // Une main ouverte, paume vers le haut
  main: (
    <>
      <path d="M8 13V4.6a1.6 1.6 0 0 1 3.2 0V11" />
      <path d="M11.2 10.4V3.4a1.6 1.6 0 0 1 3.2 0v7.4" />
      <path d="M14.4 11V5.4a1.6 1.6 0 0 1 3.2 0V14" />
      <path d="M8 13 6.2 10.2a1.6 1.6 0 0 0-2.7 1.7l3.4 6.4A6 6 0 0 0 12.2 21h1.6a3.8 3.8 0 0 0 3.8-3.8V14" />
    </>
  ),
  // Trois cartes en éventail
  cartes: (
    <>
      <rect x="9.5" y="4" width="9" height="13" rx="1" transform="rotate(14 14 10.5)" />
      <rect x="7.5" y="5" width="9" height="13" rx="1" />
      <rect x="3" y="6.5" width="9" height="13" rx="1" transform="rotate(-14 7.5 13)" />
    </>
  ),
  // Une bulle : ce dont on parle après
  bulle: (
    <path d="M20.5 12.4c0 3.9-3.8 7-8.5 7a10 10 0 0 1-2.6-.34L4 21l1.2-3.5a6.4 6.4 0 0 1-1.7-4.2c0-3.9 3.8-7 8.5-7s8.5 3.1 8.5 7Z" />
  ),
  // Une étoile, tracée d'un trait
  etoile: (
    <path d="M12 3.2l2.7 6 6.5.7-4.9 4.4 1.4 6.4L12 17.4 6.3 20.7l1.4-6.4L2.8 9.9l6.5-.7 2.7-6Z" />
  ),
  // Une table ronde vue de dessus, avec les places autour
  table: (
    <>
      <circle cx="12" cy="12" r="5.2" />
      <circle cx="12" cy="3.6" r="1.4" />
      <circle cx="20.4" cy="12" r="1.4" />
      <circle cx="12" cy="20.4" r="1.4" />
      <circle cx="3.6" cy="12" r="1.4" />
    </>
  ),
  // Des regards qui convergent vers un même point
  regards: (
    <>
      <circle cx="12" cy="13.5" r="2.4" />
      <path d="M3 4.5 9.6 11.6" />
      <path d="M21 4.5 14.4 11.6" />
      <path d="M12 2.5v6.4" />
    </>
  ),
  // Un sablier : la durée calibrée
  sablier: (
    <>
      <path d="M6.5 3h11" />
      <path d="M6.5 21h11" />
      <path d="M7.5 3v3.2c0 2.2 4.5 3.8 4.5 5.8s-4.5 3.6-4.5 5.8V21" />
      <path d="M16.5 3v3.2c0 2.2-4.5 3.8-4.5 5.8s4.5 3.6 4.5 5.8V21" />
    </>
  ),
  // Une pensée devinée
  pensee: (
    <>
      <path d="M15.5 19.5a4 4 0 0 0 3.6-5.8 4.2 4.2 0 0 0-.9-5.2A4 4 0 0 0 12 4.6a4 4 0 0 0-6.2 3.9 4.2 4.2 0 0 0-.9 5.2 4 4 0 0 0 3.6 5.8Z" />
      <path d="M12 4.6v14.9" />
    </>
  ),
  // Un cercle de personnes
  cercle: (
    <>
      <circle cx="12" cy="4.2" r="1.7" />
      <circle cx="19.1" cy="8.6" r="1.7" />
      <circle cx="19.1" cy="16.4" r="1.7" />
      <circle cx="12" cy="20.8" r="1.7" />
      <circle cx="4.9" cy="16.4" r="1.7" />
      <circle cx="4.9" cy="8.6" r="1.7" />
    </>
  ),
};

export function MagicIcon({
  nom,
  className,
}: {
  nom: NomIcone;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("h-7 w-7 text-laiton", className)}
    >
      {CHEMINS[nom]}
    </svg>
  );
}
