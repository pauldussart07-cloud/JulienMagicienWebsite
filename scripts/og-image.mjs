/**
 * Fabrique l'image de partage (Open Graph, 1200x630).
 *
 * C'est la vignette qui s'affiche quand quelqu'un envoie le lien dans une
 * conversation. Elle doit tenir toute seule : une photo, la signature, et
 * ce que fait Julien.
 *
 *   node scripts/og-image.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const L = 1200;
const H = 630;

const PHOTO = "public/images/home/hero-poster.webp";
const LOGO = "public/images/brand/logo-blanc.png";
const SORTIE = "public/og.png";

// Voile encre : la photo reste lisible en haut, le texte porte en bas.
const voile = Buffer.from(`
<svg width="${L}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="v" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%"   stop-color="#080418" stop-opacity="0.96"/>
      <stop offset="42%"  stop-color="#080418" stop-opacity="0.78"/>
      <stop offset="100%" stop-color="#080418" stop-opacity="0.30"/>
    </linearGradient>
  </defs>
  <rect width="${L}" height="${H}" fill="url(#v)"/>
</svg>`);

// Filet laiton + les deux lignes de texte.
const texte = Buffer.from(`
<svg width="${L}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="72" y="410" width="1056" height="1" fill="#C79A4B" fill-opacity="0.55"/>
  <text x="72" y="480" font-family="Georgia, 'Times New Roman', serif"
        font-size="54" fill="#EFEAE0">Magicien close-up et magie de salon</text>
  <text x="72" y="536" font-family="Segoe UI, Arial, sans-serif"
        font-size="26" fill="#EFEAE0" fill-opacity="0.68">Saint-Malo et Région Parisienne, interventions partout en France</text>
  <rect x="72" y="566" width="9" height="9" fill="#C79A4B"/>
  <text x="95" y="576" font-family="Segoe UI, Arial, sans-serif"
        font-size="24" fill="#EFEAE0" fill-opacity="0.68">5,0 sur Google</text>
</svg>`);

async function main() {
  await mkdir(path.dirname(SORTIE), { recursive: true });

  const fond = await sharp(PHOTO)
    .resize(L, H, { fit: "cover", position: "attention" })
    .toBuffer();

  const logo = await sharp(LOGO).resize({ width: 380 }).toBuffer();

  await sharp(fond)
    .composite([
      { input: voile, top: 0, left: 0 },
      { input: logo, top: 250, left: 72 },
      { input: texte, top: 0, left: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(SORTIE);

  const meta = await sharp(SORTIE).metadata();
  console.log(`✓ ${SORTIE}  ${meta.width}x${meta.height}  ${(meta.size / 1024).toFixed(0)} Ko`);
}

main();
