import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center">
      <div className="gutter py-32">
        <p className="mark text-carton/60">
          <span>Erreur 404</span>
        </p>

        <h1 className="t-h1 mt-6 max-w-3xl text-balance font-display italic text-carton">
          Cette page a disparu.
        </h1>

        <p className="lede mt-8 text-carton/70">
          Ça arrive, dans ce métier. Celle-ci ne reviendra pas — mais tout le
          reste du site est bien là.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Retour à l&apos;accueil
          </ButtonLink>
          <ButtonLink href="/contact" variant="hairline" size="lg">
            Contacter Julien
          </ButtonLink>
        </div>

        <div className="rule mt-16" />
        <nav aria-label="Pages principales" className="flex flex-wrap gap-x-8 gap-y-3 pt-6">
          {[
            { href: "/close-up", label: "Magie close-up" },
            { href: "/magie-de-salon", label: "Magie de salon" },
            { href: "/galerie", label: "Galerie" },
            { href: "/faq", label: "Questions fréquentes" },
            { href: "/blog", label: "Blog" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link-hover text-[0.95rem] text-carton/60 hover:text-carton"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
