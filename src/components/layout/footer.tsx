import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/site";
import { zonesPages } from "@/content/zones-pages";

const colonnes: {
  titre: string;
  href?: string;
  liens: { href: string; label: string }[];
}[] = [
  {
    titre: "Prestations",
    // La page qui chapeaute les deux prestations : sans ce lien, elle
    // n'est atteignable par aucun chemin interne.
    href: "/prestations",
    liens: [
      { href: "/close-up", label: "Magie close-up" },
      { href: "/magie-de-salon", label: "Magie de salon" },
      { href: "/galerie", label: "Galerie" },
      { href: "/avis", label: "Avis" },
    ],
  },
  {
    titre: "En savoir plus",
    liens: [
      { href: "/a-propos", label: "À propos" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "Questions fréquentes" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-carton/12 bg-encre-900">
      <div className="gutter py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label={`${site.name}, accueil`}>
              <Image
                src="/images/brand/logo-blanc.png"
                alt={`${site.name}, ${site.role}`}
                width={1200}
                height={322}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-[17rem] text-[0.875rem] leading-relaxed text-carton/50">
              Magie close-up et magie de salon, pour mariages et événements
              d&apos;entreprise.
            </p>
          </div>

          {colonnes.map((col) => (
            <nav key={col.titre} aria-label={col.titre}>
              <h2 className="text-[0.8125rem] text-carton/40">
                {col.href ? (
                  <Link href={col.href} className="link-hover hover:text-carton/70">
                    {col.titre}
                  </Link>
                ) : (
                  col.titre
                )}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.liens.map((lien) => (
                  <li key={lien.href}>
                    <Link
                      href={lien.href}
                      className="link-hover text-[0.9rem] text-carton/75 transition-colors hover:text-carton"
                    >
                      {lien.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-[0.8125rem] text-carton/40">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9rem]">
              <li>
                <a
                  href={site.phoneHref}
                  className="link-hover text-carton/75 hover:text-carton"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="link-hover break-all text-carton/75 hover:text-carton"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex gap-5 pt-1.5">
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-hover text-carton/75 hover:text-carton"
                >
                  Instagram
                </a>
                <a
                  href={site.socials.youtube}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-hover text-carton/75 hover:text-carton"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Les cinq pages locales, sur une seule ligne. La longue énumération
            « Magicien <ville> » qui figurait ici a été retirée : elle ne
            servait qu'au bourrage de mots-clés, et ces pages la remplacent. */}
        <nav
          aria-label="Zones d'intervention"
          className="mt-12 border-t border-carton/12 pt-6"
        >
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

        <div className="mt-8 flex flex-col gap-3 border-t border-carton/12 pt-6 text-[0.8125rem] text-carton/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}, {site.role}. {site.zone}.
          </p>
          <div className="flex gap-7">
            <Link
              href="/politique-de-confidentialite"
              className="link-hover hover:text-carton"
            >
              Confidentialité
            </Link>
            <Link href="/mentions-legales" className="link-hover hover:text-carton">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
