import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/site";
import { zonesPages } from "@/content/zones-pages";

/**
 * Trois zones seulement : la marque, la navigation, le contact.
 *
 * « Prestations » et « En savoir plus » ne forment plus deux colonnes
 * titrées : les huit liens coulent dans un seul bloc réparti sur deux
 * colonnes. Deux intitulés en moins, un filet en moins, et le pied de page
 * se lit d'un seul regard.
 */
const NAVIGATION = [
  // La grille remplit ligne par ligne : chaque paire se lit de gauche à droite.
  { href: "/prestations", label: "Prestations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/close-up", label: "Magie close-up" },
  { href: "/blog", label: "Blog" },
  { href: "/magie-de-salon", label: "Magie de salon" },
  { href: "/faq", label: "Questions fréquentes" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
  { href: "/avis", label: "Avis" },
];

export function Footer() {
  return (
    <footer className="border-t border-carton/12 bg-encre-900">
      <div className="gutter py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1.4fr_1fr]">
          <div>
            <Link href="/" aria-label={`${site.name}, accueil`}>
              <Image
                src="/images/brand/logo-blanc.png"
                alt={`${site.name}, ${site.role}`}
                width={1200}
                height={322}
                sizes="180px"
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-[17rem] text-[0.875rem] leading-relaxed text-carton/55">
              Magie close-up et magie de salon, pour mariages et événements
              d&apos;entreprise.
            </p>
          </div>

          <nav aria-label="Navigation du site">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {NAVIGATION.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="link-hover text-[0.9rem] text-carton/80 transition-colors hover:text-carton"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-2.5 text-[0.9rem]">
            <p>
              <a
                href={site.phoneHref}
                className="link-hover text-carton/80 hover:text-carton"
              >
                {site.phone}
              </a>
            </p>
            <p>
              <a
                href={site.emailHref}
                className="link-hover break-all text-carton/80 hover:text-carton"
              >
                {site.email}
              </a>
            </p>
            <p className="flex gap-5 pt-1.5">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="link-hover text-carton/80 hover:text-carton"
              >
                Instagram
              </a>
              <a
                href={site.socials.youtube}
                target="_blank"
                rel="noreferrer noopener"
                className="link-hover text-carton/80 hover:text-carton"
              >
                YouTube
              </a>
            </p>
          </div>
        </div>

        {/* Les cinq pages locales, et la ligne légale : un seul filet */}
        <div className="mt-12 flex flex-col gap-5 border-t border-carton/12 pt-6">
          <nav aria-label="Zones d'intervention">
            <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
              {zonesPages.map((z) => (
                <li key={z.slug}>
                  <Link
                    href={`/${z.slug}`}
                    className="link-hover text-[0.875rem] text-carton/55 hover:text-carton"
                  >
                    {z.titre}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 text-[0.8125rem] text-carton/40 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}, {site.role}. {site.zone}.
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-3">
              <a
                href="https://www.tellao.com/"
                className="link-hover hover:text-carton"
              >
                Site proposé par Tellao
              </a>
              <Link
                href="/politique-de-confidentialite"
                className="link-hover hover:text-carton"
              >
                Confidentialité
              </Link>
              <Link
                href="/mentions-legales"
                className="link-hover hover:text-carton"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
