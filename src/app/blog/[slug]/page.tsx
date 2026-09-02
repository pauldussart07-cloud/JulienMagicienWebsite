import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { articles, articlesLies, getArticle, type Block } from "@/content/blog";
import { site } from "@/content/site";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/jsonld";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.titre,
    description: article.chapo,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.titre,
      description: article.chapo,
      publishedTime: article.date,
      images: [{ url: article.cover.src }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const lies = articlesLies(slug, 2);

  return (
    <>
      <JsonLd
        data={[
          articleSchema(article),
          breadcrumbSchema([
            { name: "Accueil", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: article.titre, href: `/blog/${article.slug}` },
          ]),
        ]}
      />

      <PageHero
        label={`${article.categorie}, ${article.dateLabel}`}
        titre={article.titre}
        image={article.cover.src}
        alt={article.cover.alt}
      />

      {/* Corps de l'article, sur le registre clair : c'est fait pour être lu */}
      <article className="register-carton bg-carton text-encre">
        <div className="gutter py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[0.8125rem] text-encre/50">Publié par</p>
              <p className="mt-1 text-[0.95rem] text-encre">{site.name}</p>
              <div className="rule my-5" />
              <p className="text-[0.8125rem] text-encre/50">
                {article.dateLabel}
                <br />
                {article.lecture} de lecture
              </p>
            </aside>

            <div className="max-w-prose">
              {article.blocks.map((b, i) => (
                <BlockRenderer key={i} block={b} />
              ))}

              <div className="rule mt-14" />
              <p className="pt-8 text-[0.95rem] text-encre/70">
                Un événement en préparation ?{" "}
                <Link href="/contact" className="link text-encre">
                  Parlons-en avec Julien
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Suite de lecture */}
      <section className="border-t border-carton/12 py-16 lg:py-20">
        <div className="gutter">
          <h2 className="t-h3 font-display text-carton">À lire ensuite</h2>
          <ul className="mt-10 grid gap-10 sm:grid-cols-2">
            {lies.map((a) => (
              <li key={a.slug}>
                <Link href={`/blog/${a.slug}`} className="group flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={a.cover.src}
                      alt={a.cover.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mark mt-5 text-carton/55">
                    <span>{a.categorie}</span>
                  </p>
                  <h3 className="mt-3 text-balance font-display text-[1.5rem] leading-tight tracking-tight text-carton">
                    {a.titre}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

/** Rendu des blocs de contenu — aucun parseur Markdown côté client. */
function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "lead":
      return (
        <p className="mb-9 font-display text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-[1.35] text-encre">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 className="mb-5 mt-14 font-display text-[clamp(1.625rem,1.2rem+1.4vw,2.25rem)] leading-tight tracking-tight text-encre">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mb-4 mt-10 font-display text-[1.375rem] leading-snug text-encre">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="mb-6 text-[1.0625rem] leading-relaxed text-encre/78">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="mb-8 mt-2 space-y-4 border-l border-encre/15 pl-6">
          {block.items.map((item, i) => (
            <li key={i} className="text-[1.0625rem] leading-relaxed text-encre/78">
              {item.strong && (
                <span className="font-medium text-encre">{item.strong} : </span>
              )}
              {item.text}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-12 border-l-2 border-laiton-600 pl-7">
          <p className="font-display text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] leading-[1.25] text-encre">
            {block.text}
          </p>
        </blockquote>
      );
  }
}
