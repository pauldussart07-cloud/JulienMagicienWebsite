# Site de Julien Lambert, magicien

Refonte du site `julienlambertmagicien.fr`. Tout le contenu, les
photographies, le logo et la FAQ proviennent du site existant ; seuls la mise
en forme, l'architecture technique et les performances ont été refaits.

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
- `faq.ts` : 36 questions/réponses, six catégories
- `blog.ts` : six articles, en blocs typés
- `galerie.ts` : 24 photographies
- `temoignages.ts` : avis clients

## Images

Les originaux téléchargés depuis l'ancien site vivent dans `_assets_raw/`
(non versionné). `npm run images` les redimensionne et les convertit en WebP
vers `public/images/`. Le dernier passage : 100,3 Mo → 7,9 Mo.

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
