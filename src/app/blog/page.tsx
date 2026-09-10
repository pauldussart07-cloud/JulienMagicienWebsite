import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/magic/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeroTexte } from "@/components/sections/page-hero";
import { articles } from "@/content/blog";
import { JsonLd, blogSchema, breadcrumbSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Le blog",
  description:
    "Coulisses, conseils et réflexions sur la magie close-up, le détournement d'attention et l'animation d'événements, par Julien Lambert.",
  path: "/blog",
});

export default function Page() {
  const [une, ...suite] = articles;

  return (
    <>
      <JsonLd
        data={[
          blogSchema(articles),
          breadcrumbSchema([
            { name: "Accueil", href: "/" },
            { name: "Blog", href: "/blog" },
          ]),
        ]}
      />

      <PageHeroTexte
        titre="Coulisses et réflexions"
        intro="Ce que la magie apprend sur l'attention, et ce qu'elle change à un événement."
      />

      {/* Article à la une */}
      <section className="border-b border-carton/12">
        <Link
          href={`/blog/${une.slug}`}
          className="group grid lg:grid-cols-2"
          aria-label={une.titre}
        >
          <div className="relative min-h-[20rem] overflow-hidden lg:min-h-[30rem]">
            <Image
              src={une.cover.src}
              alt={une.cover.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          </div>

          <div className="flex flex-col justify-center px-5 py-12 sm:px-10 lg:px-14">
            <p className="mark text-carton/60">
              <span>
                {une.categorie}, {une.dateLabel}
              </span>
            </p>
            <h2 className="mt-5 max-w-2xl text-balance font-display text-[clamp(1.875rem,1.2rem+2.4vw,3.25rem)] leading-[1.05] tracking-tight text-carton">
              {une.titre}
            </h2>
            <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-carton/65">
              {une.chapo}
            </p>
            <p className="link-hover mt-8 inline-block self-start text-[0.95rem] text-carton">
              Lire l&apos;article
            </p>
          </div>
        </Link>
      </section>

      {/* Les autres articles */}
      <section className="py-16 lg:py-20">
        <div className="gutter">
          <ul className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {suite.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.07} className="h-full">
                <li className="h-full">
                  <Link href={`/blog/${a.slug}`} className="group flex h-full flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={a.cover.src}
                        alt={a.cover.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </div>

                    <p className="mark mt-6 text-carton/55">
                      <span>
                        {a.categorie}, {a.lecture} de lecture
                      </span>
                    </p>

                    <h2 className="mt-3 text-balance font-display text-[1.5rem] leading-tight tracking-tight text-carton transition-colors group-hover:text-white">
                      {a.titre}
                    </h2>

                    <p className="mt-4 text-[0.9rem] leading-relaxed text-carton/60">
                      {a.chapo}
                    </p>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        lignes={["Envie de le voir", "à l'œuvre ?"]}
        image="/images/site/site-closeup-large.webp"
        alt="Réactions d'un groupe pendant une prestation de close-up"
      />
    </>
  );
}
