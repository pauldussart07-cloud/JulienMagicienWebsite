/**
 * Optimise les visuels bruts téléchargés depuis l'ancien site (_assets_raw)
 * vers public/images : redimensionnement + WebP haute qualité.
 * Les logos gardent leur canal alpha en PNG.
 *
 *   npm run images
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

  "hero-cartes": { dir: "home", width: 2400 },
  "home-reaction": { dir: "home", width: 2000 },
  "home-feu": { dir: "home", width: 1400 },
  "home-04": { dir: "home", width: 2000 },

  "client-to": { dir: "clients", width: 400 },
  "client-hq": { dir: "clients", width: 400 },
  "client-beaumanoir": { dir: "clients", width: 400, keepPng: true },
  "client-innerwheel": { dir: "clients", width: 400 },
  "client-sncf": { dir: "clients", width: 400 },

  "apropos-hero": { dir: "apropos", width: 2000 },
  "apropos-enfant": { dir: "apropos", width: 1000, keepPng: true },

  "closeup-hero": { dir: "closeup", width: 2400 },
  "closeup-02": { dir: "closeup", width: 1400 },

  "salon-hero": { dir: "salon", width: 2400 },
  "salon-02": { dir: "salon", width: 1200 },
  "salon-03": { dir: "salon", width: 2000 },
};

const galleryPlan = (name) => ({ dir: "galerie", width: 1800 });

async function main() {
  const files = await readdir(RAW).catch(() => []);
  if (!files.length) {
    console.error(`Aucun fichier dans ${RAW}`);
    process.exit(1);
  }

  let done = 0;
  let bytesIn = 0;
  let bytesOut = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const name = path.basename(file, ext);
    const plan = PLAN[name] ?? (name.startsWith("gal-") ? galleryPlan(name) : null);
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

    // Les logos restent en PNG (transparence), le reste passe en WebP.
    const outExt = plan.keepPng ? ".png" : ".webp";
    const destPath = path.join(destDir, name + outExt);

    const pipeline = image.resize({ width, withoutEnlargement: true });
    if (plan.keepPng) {
      await pipeline.png({ compressionLevel: 9, palette: true }).toFile(destPath);
    } else {
      await pipeline.webp({ quality: 82, effort: 5 }).toFile(destPath);
    }

    const [a, b] = await Promise.all([stat(srcPath), stat(destPath)]);
    bytesIn += a.size;
    bytesOut += b.size;
    done += 1;

    const outMeta = await sharp(destPath).metadata();
    console.log(
      `✓ ${plan.dir}/${name}${outExt}  ${outMeta.width}x${outMeta.height}  ` +
        `${(a.size / 1e6).toFixed(2)}Mo → ${(b.size / 1e6).toFixed(2)}Mo`
    );
  }

  console.log(
    `\n${done} image(s) — ${(bytesIn / 1e6).toFixed(1)}Mo → ${(bytesOut / 1e6).toFixed(1)}Mo ` +
      `(${Math.round((1 - bytesOut / bytesIn) * 100)}% de gain)`
  );
}

main();
