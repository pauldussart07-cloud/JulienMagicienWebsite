/**
 * Optimise les visuels bruts (_assets_raw) vers public/images :
 * redimensionnement + WebP haute qualité. Les logos et le tirage d'enfance
 * gardent leur canal alpha ou leur grain en PNG.
 *
 *   npm run images
 *
 * Les sources sont les fichiers pleine définition fournis par Julien
 * (dossier « Meilleures photos et vidéo site internet »). Le partage des
 * photos entre le site et la galerie suit une règle simple : une photo
 * retenue pour une page (`site-*`) ne reparaît pas dans la galerie
 * (`gal-*`), et réciproquement. Aucun doublon d'un côté ou de l'autre.
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAW = path.resolve("_assets_raw");
const OUT = path.resolve("public/images");

/** name (sans extension) -> { dir, width, keepPng? } */
const PLAN = {
  "logo-blanc": { dir: "brand", width: 1200, keepPng: true },
  "logo-original": { dir: "brand", width: 1200, keepPng: true },
  "apropos-enfant": { dir: "apropos", width: 1000, keepPng: true },

  "client-to": { dir: "clients", width: 400 },
  "client-hq": { dir: "clients", width: 400 },
  "client-beaumanoir": { dir: "clients", width: 400, keepPng: true },
  "client-innerwheel": { dir: "clients", width: 400 },
  "client-sncf": { dir: "clients", width: 400 },
};

/**
 * Largeurs des visuels de page. La photo des cartes en vol sert de fond
 * plein écran, y compris sur les grands moniteurs : elle est la seule à
 * monter à 3000 px.
 */
const SITE = {
  "site-cartes-envol": 3000,
  "site-hero-poster": 2560,
  "site-video-poster": 1920,
  "site-apropos": 2400,
  "site-apropos-cta": 1800,
  "site-closeup-hero": 2400,
  "site-closeup-large": 2000,
  "site-closeup-cta": 1800,
  "site-salon-hero": 2400,
  "site-salon-large": 2000,
  "site-salon-cta": 1800,
  "site-portrait": 1600,
  "site-galerie-hero": 2400,
  "site-flamme": 1600,
  // Bande de réactions : jamais affichée au-delà de 24rem de large.
  "site-rail-01": 1200,
  "site-rail-02": 1200,
  "site-rail-03": 1200,
  "site-rail-04": 1200,
  "site-rail-05": 1200,
  "site-rail-06": 1200,
};

/** Qualité WebP par famille de visuels. */
const QUALITE = {
  site: 88,
  galerie: 82,
  clients: 86,
  apropos: 88,
};

function planPour(name) {
  if (PLAN[name]) return PLAN[name];
  if (name in SITE) return { dir: "site", width: SITE[name] };
  if (name.startsWith("gal-")) return { dir: "galerie", width: 1800 };
  return null;
}

async function main() {
  const files = await readdir(RAW).catch(() => []);
  if (!files.length) {
    console.error(`Aucun fichier dans ${RAW}`);
    process.exit(1);
  }

  let done = 0;
  let bytesIn = 0;
  let bytesOut = 0;
  const dims = [];

  for (const file of files.sort()) {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const name = path.basename(file, ext);
    const plan = planPour(name);
    if (!plan) {
      console.warn(`~ ignoré (pas de plan) : ${file}`);
      continue;
    }

    const srcPath = path.join(RAW, file);
    const destDir = path.join(OUT, plan.dir);
    await mkdir(destDir, { recursive: true });

    const image = sharp(srcPath).rotate();
    const meta = await image.metadata();
    const width = Math.min(plan.width, meta.width ?? plan.width);

    const outExt = plan.keepPng ? ".png" : ".webp";
    const destPath = path.join(destDir, name + outExt);

    const pipeline = image.resize({ width, withoutEnlargement: true });
    if (plan.keepPng) {
      await pipeline.png({ compressionLevel: 9, palette: true }).toFile(destPath);
    } else {
      // Les sources sont volontairement douces (24 Mpx redescendus à 1800) :
      // une légère accentuation rend le piqué perdu au redimensionnement.
      //
      // La qualité ne suit plus la largeur. Elle suivait, et les visuels
      // plein écran, qui sont les plus larges, recevaient la qualité la plus
      // basse : exactement ceux que l'on regarde en grand. Les fonds et les
      // posters gardent donc une qualité haute, la galerie une qualité
      // courante, puisqu'on l'y voit en vignette.
      await pipeline
        .sharpen({ sigma: 0.6, m1: 0.5, m2: 2 })
        .webp({ quality: QUALITE[plan.dir] ?? 82, effort: 6 })
        .toFile(destPath);
    }

    const [a, b] = await Promise.all([stat(srcPath), stat(destPath)]);
    bytesIn += a.size;
    bytesOut += b.size;
    done += 1;

    const outMeta = await sharp(destPath).metadata();
    dims.push(`${plan.dir}/${name}${outExt} ${outMeta.width}x${outMeta.height}`);
    console.log(
      `✓ ${plan.dir}/${name}${outExt}  ${outMeta.width}x${outMeta.height}  ` +
        `${(a.size / 1e6).toFixed(2)}Mo → ${(b.size / 1e6).toFixed(2)}Mo`
    );
  }

  console.log(
    `\n${done} image(s) : ${(bytesIn / 1e6).toFixed(1)}Mo → ${(bytesOut / 1e6).toFixed(1)}Mo ` +
      `(${Math.round((1 - bytesOut / bytesIn) * 100)}% de gain)`
  );
}

main();
