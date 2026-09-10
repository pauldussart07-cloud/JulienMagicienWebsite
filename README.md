# Site de Julien Lambert, magicien

Refonte du site `julienlambertmagicien.fr`. Les photographies et la vidéo
sont les fichiers pleine définition fournis par Julien ; le contenu éditorial
vient du site existant, la FAQ a été reprise en septembre 2026.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` | build de production |
| `npm run start` | sert le build |
| `npm run lint` | ESLint |
| `npm run images` | ré-encode `_assets_raw/` vers `public/images/` |

## Design system : « Encre & Carton »

Toute la palette vient de l'objet que Julien tient en main, une carte à jouer.

| Rôle | Valeur |
|---|---|
| Encre (fond) | `#0C0722` |
| Encre vive (couleur du logo) | `#130949` |
| Carton (registre clair) | `#EFEAE0` |
| Laiton (filets, repères) | `#C79A4B` |
| Carmin (accent rare) | `#B3122E` |

Typographies : **Instrument Serif** en display, **Inter Tight** pour la
lecture. Les tokens sont dans `tailwind.config.ts`, les classes de composition
dans `src/app/globals.css`.

Deux registres alternent : l'encre pour les sections spectacle, le carton
ivoire pour les sections de lecture. Le header détecte le registre sous lui et
inverse ses couleurs.

## Contenu

Le contenu est centralisé dans `src/content/` :

- `site.ts` : coordonnées, navigation, zones d'intervention
- `prestations.ts` : close-up et magie de salon
- `faq.ts` : 41 questions/réponses, six catégories
- `blog.ts` : six articles, en blocs typés
- `galerie.ts` : 21 photographies, plus la répartition en colonnes
- `temoignages.ts` : avis Google, recopiés depuis la fiche

## Images

Les originaux vivent dans `_assets_raw/` (non versionné). `npm run images` les
redimensionne et les convertit en WebP vers `public/images/`. Dernier passage :
236,9 Mo → 10,8 Mo.

Deux familles, et la règle qui les sépare :

- `public/images/site/` : les photos retenues pour une page précise (héros,
  bandeaux, bande de réactions, appels à l'action) ;
- `public/images/galerie/` : tout le reste.

Une photo ne peut appartenir qu'à une seule des deux. La galerie ne reprend
donc jamais une image déjà vue ailleurs sur le site, et ne contient pas deux
prises du même instant. Le plan de nommage est en tête de
`scripts/optimize-images.mjs`.

La galerie ne s'appuie pas sur les colonnes CSS, qui équilibrent mal des
rapports d'image très différents et laissent un vide avant le pied de page.
`repartirEnColonnes` (dans `src/content/galerie.ts`) donne chaque photo à la
colonne la plus courte : les colonnes finissent à la même hauteur.

## Vidéo

`public/videos/` contient deux choses, toutes deux tirées du montage d'origine
à 27 Mbit/s, et non d'une copie récupérée sur YouTube :

- `hero-1920` et `hero-1280` (mp4 + webm) : la boucle muette de fond du hero,
  six secondes, deux plans raccordés par un fondu, avec un second fondu au
  point de bouclage pour que le raccord ne se voie pas ;
- `teaser-1080.mp4` et `teaser-720.mp4` : le teaser complet, 1 min 25 avec le
  son, chargé seulement au clic. Le 720p est servi sous 900 px de large.

L'image fixe `site-hero-poster` est la première image exacte de la boucle : le
passage de la photo à la vidéo est invisible.

## Formulaire de contact

`POST /api/contact` valide avec Zod, limite à 5 envois par IP toutes les
10 minutes, filtre les robots via un champ piège, puis transmet par Resend.
Copier `.env.example` vers `.env.local` et renseigner les clés.

Sans clé configurée, le formulaire renvoie un message invitant à écrire
directement à Julien : le site reste utilisable.

## À compléter avant mise en ligne

- SIRET et adresse dans `src/app/mentions-legales/page.tsx`
- Variables d'environnement Resend
- Vérifier le lien de la fiche Google dans `src/content/temoignages.ts`
- Relever les avis Google restants : la fiche en compte 27, dix sont repris ici
