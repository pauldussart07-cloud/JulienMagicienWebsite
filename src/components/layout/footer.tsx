import Image from "next/image";
import Link from "next/link";

import { site, zones } from "@/content/site";

const colonnes = [
  {
    titre: "Prestations",
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
      <div className="gutter py-16 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
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
            <p className="mt-6 max-w-xs text-[0.9rem] leading-relaxed text-carton/55">
              Magie close-up et magie de salon pour mariages, soirées
              d&apos;entreprise et réceptions privées.
            </p>
          </div>

          {colonnes.map((col) => (
            <nav key={col.titre} aria-label={col.titre}>
              <h2 className="text-[0.8125rem] text-carton/45">{col.titre}</h2>
              <ul className="mt-5 space-y-3">
                {col.liens.map((lien) => (
                  <li key={lien.href}>
                    <Link
                      href={lien.href}
                      className="link-hover text-[0.95rem] text-carton/80 transition-colors hover:text-carton"
                    >
                      {lien.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-[0.8125rem] text-carton/45">Contact</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              <li>
                <a href={site.phoneHref} className="link-hover text-carton/80 hover:text-carton">
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="link-hover break-all text-carton/80 hover:text-carton"
                >
                  {site.email}
                </a>
              </li>
              <li className="pt-1 text-carton/55">
                {site.bases}
                <br />
                {site.zone}
              </li>
              <li className="flex gap-5 pt-2">
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
              </li>
            </ul>
          </div>
        </div>

        {/* Zones desservies — maillage local */}
        <div className="mt-16 border-t border-carton/12 pt-8">
          <dl className="grid gap-6 sm:grid-cols-2">
            {zones.map((z) => (
              <div key={z.slug}>
                <dt className="text-[0.8125rem] text-carton/45">{z.region}</dt>
                <dd className="mt-2 text-[0.8125rem] leading-relaxed text-carton/60">
                  {z.villes.map((v) => `Magicien ${v}`).join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-carton/12 pt-8 text-[0.8125rem] text-carton/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}, {site.role}
          </p>
          <div className="flex gap-7">
            <Link href="/politique-de-confidentialite" className="link-hover hover:text-carton">
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
