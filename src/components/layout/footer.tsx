import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { site, zones } from "@/content/site";

const colonnes = [
  {
    titre: "Prestations",
    liens: [
      { href: "/close-up", label: "Magie close-up" },
      { href: "/magie-de-salon", label: "Magie de salon" },
      { href: "/galerie", label: "Galerie" },
      { href: "/avis", label: "Avis clients" },
    ],
  },
  {
    titre: "En savoir plus",
    liens: [
      { href: "/a-propos", label: "À propos de Julien" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact & devis" },
    ],
  },
];

export function Footer() {
  const villes = zones.flatMap((z) => z.villes);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-night-950">
      <div className="bg-starfield pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/40 to-transparent"
        aria-hidden
      />

      <div className="container relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Marque */}
          <div>
            <Link href="/" aria-label={`${site.name} — accueil`}>
              <Image
                src="/images/brand/logo-blanc.png"
                alt={`${site.name} — ${site.role}`}
                width={1200}
                height={322}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory-dim">
              Magie close-up et magie de salon pour mariages, soirées
              d&apos;entreprise et événements privés.
            </p>
            <div className="mt-6 flex gap-2.5">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="rounded-full border border-white/12 p-2.5 text-ivory-muted transition-colors hover:border-gold-300/50 hover:text-gold-200"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={site.socials.youtube}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="YouTube"
                className="rounded-full border border-white/12 p-2.5 text-ivory-muted transition-colors hover:border-gold-300/50 hover:text-gold-200"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Liens */}
          {colonnes.map((col) => (
            <nav key={col.titre} aria-label={col.titre}>
              <h2 className="eyebrow">{col.titre}</h2>
              <ul className="mt-5 space-y-3">
                {col.liens.map((lien) => (
                  <li key={lien.href}>
                    <Link
                      href={lien.href}
                      className="underline-sweep text-sm text-ivory-muted transition-colors hover:text-gold-200"
                    >
                      {lien.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 text-ivory-muted transition-colors hover:text-gold-200"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold-300/70" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="flex items-start gap-3 break-all text-ivory-muted transition-colors hover:text-gold-200"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-300/70" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-ivory-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300/70" />
                <span>
                  {site.bases}
                  <br />
                  <span className="text-ivory-dim">{site.zone}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Maillage des villes desservies */}
        <div className="mt-14 border-t border-white/[0.07] pt-8">
          <h2 className="eyebrow">Zones d&apos;intervention</h2>
          <ul className="mt-4 flex flex-wrap gap-x-1 gap-y-1.5 text-xs text-ivory-dim">
            {villes.map((ville, i) => (
              <li key={ville} className="flex items-center gap-1">
                <span>Magicien {ville}</span>
                {i < villes.length - 1 && (
                  <span className="text-gold-700" aria-hidden>
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 text-xs text-ivory-dim sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} — {site.role}. Tous droits
            réservés.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/politique-de-confidentialite"
              className="transition-colors hover:text-gold-200"
            >
              Confidentialité
            </Link>
            <Link href="/mentions-legales" className="transition-colors hover:text-gold-200">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
