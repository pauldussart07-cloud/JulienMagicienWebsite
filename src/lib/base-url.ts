import { site } from "@/content/site";

/**
 * URL de base des métadonnées : canoniques, Open Graph, JSON-LD, sitemap.
 *
 * À n'utiliser que dans du code serveur. `VERCEL_PROJECT_PRODUCTION_URL`
 * n'existe pas dans un bundle client, et Next remplace une variable
 * `NEXT_PUBLIC_*` absente par une chaîne vide : d'où le test de vérité plutôt
 * qu'un `??`, qui laisserait passer la chaîne vide et ferait échouer
 * `new URL()` au moment de la collecte des pages.
 *
 * Tant que le domaine définitif n'est pas branché sur le projet Vercel, la
 * variable renvoie l'adresse .vercel.app ; dès que le domaine y est ajouté,
 * elle renvoie julienlambertmagicien.fr. Rien à changer dans le code.
 */
function nettoyer(valeur: string | undefined): string | undefined {
  const v = valeur?.trim();
  return v ? v.replace(/\/+$/, "") : undefined;
}

const domaineVercel = nettoyer(process.env.VERCEL_PROJECT_PRODUCTION_URL);

export const baseUrl =
  nettoyer(process.env.NEXT_PUBLIC_SITE_URL) ??
  (domaineVercel ? `https://${domaineVercel}` : undefined) ??
  site.url;

/**
 * Le site n'est indexable que sur son domaine définitif.
 *
 * Tant que l'ancien site Wix occupe julienlambertmagicien.fr, la version
 * .vercel.app en est un double : si Google l'indexe, les deux se disputent
 * les mêmes requêtes, et c'est l'adresse provisoire qui risque de gagner.
 * Elle porte donc un noindex, qui tombe de lui-même le jour où le domaine
 * est branché sur le projet et que `baseUrl` devient ce domaine.
 */
export const indexable = new URL(baseUrl).host === new URL(site.url).host;
