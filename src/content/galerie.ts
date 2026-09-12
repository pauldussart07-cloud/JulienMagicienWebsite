/**
 * Galerie photo.
 *
 * Les images viennent des fichiers pleine définition fournis par Julien,
 * ré-encodées en WebP (voir scripts/optimize-images.mjs). Deux règles
 * tiennent cette liste :
 *
 *   - aucun doublon : deux prises du même instant ne figurent pas toutes
 *     les deux, et une photo retenue pour une page du site (dossier
 *     `/images/site`) n'est pas reprise ici ;
 *   - les dimensions réelles sont déclarées, parce que la mosaïque répartit
 *     les images d'après leur hauteur et qu'aucun bloc ne doit se décaler
 *     après le chargement (CLS).
 *
 * L'ordre ci-dessous est celui de lecture, pas celui de l'affichage : la
 * mosaïque répartit ensuite les photos colonne par colonne pour que toutes
 * se terminent à la même hauteur (voir `repartirEnColonnes`).
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const photos: Photo[] = [
  {
    src: "/images/galerie/gal-04.webp",
    width: 1800,
    height: 2705,
    alt: "Une mariée observe un tour de cartes pendant le vin d'honneur",
  },
  {
    src: "/images/galerie/gal-09.webp",
    width: 1800,
    height: 1202,
    alt: "Julien Lambert présente un tour à des invités pendant un cocktail d'entreprise",
  },
  {
    src: "/images/galerie/gal-20.webp",
    width: 1800,
    height: 958,
    alt: "Un groupe d'invités réagit à la révélation d'un tour, en extérieur",
  },
  {
    src: "/images/galerie/gal-01.webp",
    width: 1800,
    height: 1199,
    alt: "Prestation de close-up dans un parc, autour d'une table de magicien",
  },
  {
    src: "/images/galerie/gal-19.webp",
    width: 1636,
    height: 852,
    alt: "Une pièce en équilibre au bout des doigts, en gros plan",
  },
  {
    src: "/images/galerie/gal-07.webp",
    width: 1800,
    height: 2705,
    alt: "Julien Lambert en pleine manipulation, au milieu des invités",
  },
  {
    src: "/images/galerie/gal-02.webp",
    width: 1800,
    height: 1199,
    alt: "Magie rapprochée sous un chapiteau, pendant une réception de mariage",
  },
  {
    src: "/images/galerie/gal-16.webp",
    width: 1800,
    height: 861,
    alt: "Deux invités n'en croient pas leurs yeux pendant un tour",
  },
  {
    src: "/images/galerie/gal-12.webp",
    width: 1800,
    height: 785,
    alt: "Un jeu de cartes en main, en noir et blanc",
  },
  {
    src: "/images/galerie/gal-21.webp",
    width: 1800,
    height: 1199,
    alt: "Julien Lambert présente un tour de cartes à un jeune invité",
  },
  {
    src: "/images/galerie/gal-10.webp",
    width: 1800,
    height: 1202,
    alt: "Julien Lambert à contre-jour pendant un événement d'entreprise",
  },
  {
    src: "/images/galerie/gal-08.webp",
    width: 1800,
    height: 785,
    alt: "Une invitée en pleine réaction pendant un tour de close-up",
  },
  {
    src: "/images/galerie/gal-06.webp",
    width: 1800,
    height: 1200,
    alt: "Un tour se joue au milieu d'un groupe d'invités, devant un château",
  },
  {
    src: "/images/galerie/gal-14.webp",
    width: 1800,
    height: 785,
    alt: "Une balle en mousse apparaît au creux de la main, en gros plan",
  },
  {
    src: "/images/galerie/gal-03.webp",
    width: 1800,
    height: 1199,
    alt: "Julien Lambert désigne une carte, les invités attablés le suivent du regard",
  },
  {
    src: "/images/galerie/gal-18.webp",
    width: 1800,
    height: 789,
    alt: "Des mariés stupéfaits juste après la révélation d'un tour",
  },
  {
    src: "/images/galerie/gal-11.webp",
    width: 1800,
    height: 1202,
    alt: "Manipulation de cartes à contre-jour, en noir et blanc",
  },
  {
    src: "/images/galerie/gal-13.webp",
    width: 1800,
    height: 785,
    alt: "Un anneau apparaît au milieu d'un cordon, en gros plan",
  },
  {
    src: "/images/galerie/gal-15.webp",
    width: 1800,
    height: 785,
    alt: "Un dé sous un gobelet, l'instant avant la révélation",
  },
  {
    src: "/images/galerie/gal-17.webp",
    width: 1800,
    height: 786,
    alt: "Deux enfants suivent de très près un tour de magie",
  },
];

/**
 * Répartit les photos en colonnes de hauteurs égales.
 *
 * Une mise en page en colonnes CSS laisse au navigateur le soin d'équilibrer,
 * et il s'y prend mal dès que les rapports d'image varient beaucoup : la
 * dernière colonne s'arrête bien plus haut que les autres, et un grand vide
 * s'installe au-dessus du pied de page.
 *
 * Deux approches plus simples ont été essayées et écartées. Donner chaque
 * photo à la colonne la plus courte du moment laisse 136 pixels d'écart.
 * Partir des plus hautes puis corriger par déplacements et échanges tombe à
 * une trentaine : la correction se bloque dans un arrangement dont aucun
 * échange isolé ne permet de sortir.
 *
 * Ce qui fonctionne : reprendre la même correction depuis trois cents
 * mélanges différents et garder le meilleur. Le hasard vient d'un générateur
 * à graine fixe, donc le résultat est identique à chaque rendu, pour tout le
 * monde, et calculable côté serveur. L'écart tombe à zéro pixel, à deux
 * comme à trois colonnes.
 *
 * Le calcul part des dimensions déclarées, pas des images chargées : la
 * répartition est acquise avant que la première photo arrive.
 */

/** Une photo et son rapport hauteur sur largeur, calculé une seule fois. */
type Bloc = { photo: Photo; r: number };

const ecart = (h: number[]) => Math.max(...h) - Math.min(...h);

/** Hauteur réelle de chaque colonne, relue depuis son contenu. */
const ecartDe = (colonnes: Bloc[][]) =>
  ecart(colonnes.map((c) => c.reduce((s, b) => s + b.r, 0)));

/**
 * Remplit les colonnes dans l'ordre reçu, puis corrige tant qu'un
 * déplacement ou un échange rapproche les hauteurs.
 */
function corriger(depart: Bloc[], nombre: number) {
  const c: Bloc[][] = Array.from({ length: nombre }, () => []);
  const h = new Array<number>(nombre).fill(0);

  for (const b of depart) {
    let a = 0;
    for (let j = 1; j < nombre; j++) if (h[j] < h[a]) a = j;
    c[a].push(b);
    h[a] += b.r;
  }

  let bouge = true;
  while (bouge) {
    bouge = false;

    for (let a = 0; a < nombre; a++) {
      for (let b = 0; b < nombre; b++) {
        if (a === b) continue;

        for (let x = 0; x < c[a].length; x++) {
          const ra = c[a][x].r;

          // Déplacer une photo de a vers b.
          const h2 = [...h];
          h2[a] -= ra;
          h2[b] += ra;
          if (ecart(h2) < ecart(h) - 1e-9) {
            c[b].push(c[a].splice(x, 1)[0]);
            h[a] = h2[a];
            h[b] = h2[b];
            bouge = true;
            x--;
            continue;
          }

          // Échanger une photo de a contre une de b.
          for (let y = 0; y < c[b].length; y++) {
            const rb = c[b][y].r;
            const h3 = [...h];
            h3[a] += rb - ra;
            h3[b] += ra - rb;
            if (ecart(h3) < ecart(h) - 1e-9) {
              const t = c[a][x];
              c[a][x] = c[b][y];
              c[b][y] = t;
              h[a] = h3[a];
              h[b] = h3[b];
              bouge = true;
            }
          }
        }
      }
    }
  }

  // L'écart est recalculé depuis les colonnes elles-mêmes, et non depuis le
  // compteur entretenu pendant la correction : c'est le seul chiffre dont on
  // soit sûr qu'il décrive l'arrangement effectivement renvoyé.
  return { colonnes: c, e: ecartDe(c) };
}

/** Générateur à graine fixe : les mélanges sont les mêmes à chaque rendu. */
function tirage(graine: number) {
  return () => {
    graine |= 0;
    graine = (graine + 0x6d2b79f5) | 0;
    let t = Math.imul(graine ^ (graine >>> 15), 1 | graine);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Trois cents reprises suffisent à tomber à zéro, pour une vingtaine de ms. */
const REPRISES = 300;

export function repartirEnColonnes(liste: Photo[], nombre: number): Photo[][] {
  if (nombre <= 1) return [liste];

  const rang = new Map(liste.map((p, i) => [p.src, i]));
  const blocs: Bloc[] = liste.map((photo) => ({
    photo,
    r: photo.height / photo.width,
  }));

  let meilleur = corriger([...blocs].sort((a, b) => b.r - a.r), nombre);
  const suivant = tirage(20260910);

  for (let n = 0; n < REPRISES; n++) {
    const melange = [...blocs];
    for (let i = melange.length - 1; i > 0; i--) {
      const j = Math.floor(suivant() * (i + 1));
      [melange[i], melange[j]] = [melange[j], melange[i]];
    }
    const essai = corriger(melange, nombre);
    if (essai.e < meilleur.e) meilleur = essai;
  }

  // Dans chaque colonne, on revient à l'ordre de la liste : la mosaïque se
  // lit comme elle a été composée, et non de la plus haute à la plus petite.
  return meilleur.colonnes.map((c) =>
    c.map((b) => b.photo).sort((a, b) => rang.get(a.src)! - rang.get(b.src)!)
  );
}
