import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal, RevealLines } from "@/components/magic/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { PrestationsSplit } from "@/components/sections/prestations-split";
import { site } from "@/content/site";
import {
  autresZones,
  communs,
  getZonePage,
  zonesPages,
  type ZonePage,
} from "@/content/zones-pages";
import { ID, JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { baseUrl } from "@/lib/base-url";

/** Seules les cinq pages locales existent : tout autre segment est un 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return zonesPages.map((z) => ({ zone: z.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ zone: string }>;
}): Promise<Metadata> {
  const { zone } = await params;
  const p = getZonePage(zone);
  if (!p) return {};

  return pageMetadata({
    title: p.metaTitle,
    description: p.metaDescription,
    path: `/${p.slug}`,
    image: p.image.src,
    imageAlt: p.image.alt,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ zone: string }>;
}) {
  const { zone } = await params;
  const p = getZonePage(zone);
  if (!p) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceLocalSchema(p),
          breadcrumbSchema([
            { name: "Accueil", href: "/" },
            { name: p.titre, href: `/${p.slug}` },
          ]),
        ]}
      />

      <PageHero
        label="Zone d'intervention"
        titre={p.titre}
        intro="Une magie qui se vit à quelques centimètres de vous."
        image={p.image.src}
        alt={p.image.alt}
        position={p.image.cadrage}
      />

      {/* Présentation, sur le registre de lecture.

          Les deux paragraphes ne se valent pas : le premier répond à la
          question posée par le titre, le second explique la manière. Ils
          sont donc posés en chapô et en texte courant, côte à côte, et non
          l’un sous l’autre dans une colonne unique qui laissait la moitié
          droite de la page vide sur les pages de ville. */}
      <section className="register-carton bg-carton py-16 text-encre lg:py-24">
        <div className="gutter">
          <p className="mark text-encre/55">
            <span>La prestation</span>
          </p>
          <div className="rule mt-5" />

          <div className="mt-10 grid gap-x-16 gap-y-8 lg:grid-cols-12 lg:gap-x-24 lg:gap-y-0">
            <p className="text-pretty font-display text-[clamp(1.375rem,1rem+1.3vw,2.125rem)] leading-[1.24] text-encre lg:col-span-7">
              {p.intro[0]}
            </p>

            <div className="prose-fr text-[1rem] leading-relaxed text-encre/70 lg:col-span-5 lg:pt-[0.4rem]">
              {p.intro.slice(1).map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>

          {p.territoires && (
            <div className="mt-16 border-t border-encre/15 pt-10 lg:mt-20">
              <h2 className="font-display text-[1.5rem] leading-snug">
                Là où j&apos;interviens {p.ou}
              </h2>
              {/* La liste passe en grille : en colonne unique elle dépassait
                  la hauteur du texte qu’elle accompagnait. Les filets entre
                  lignes sont remplacés par les repères de laiton du site : une
                  dernière rangée incomplète laissait sinon un trait qui
                  s’arrêtait au tiers de la page. */}
              <div className="rule mt-8" />
              <ul className="mt-6 grid gap-x-10 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                {p.territoires.map((t) => (
                  <li
                    key={t}
                    className="flex items-baseline gap-3 py-2 text-[0.95rem] text-encre/75"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.5em] h-[5px] w-[5px] shrink-0 self-start bg-laiton-600"
                    />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="rule mt-6" />
              <p className="mt-8 max-w-2xl text-[0.9rem] leading-relaxed text-encre/60">
                Vous ne trouvez pas votre ville ?{" "}
                <Link href="/contact" className="link text-encre">
                  Écrivez-moi
                </Link>{" "}
                : je me déplace volontiers au-delà de cette liste.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Mariage */}
      <section className="border-y border-carton/12 py-16 lg:py-24">
        <div className="gutter">
          <RevealLines
            lines={[`Magicien pour votre`, `mariage ${p.ou}`]}
            className="t-h2 font-display text-carton"
          />

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <div>
              <p className="text-[1.0625rem] leading-relaxed text-carton/75">
                {p.mariageIntro}
              </p>
              <ul className="mt-8 border-t border-carton/12">
                {communs.experiences.map((e) => (
                  <li
                    key={e}
                    className="border-b border-carton/12 py-3.5 text-[0.95rem] text-carton/70"
                  >
                    {e}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[0.95rem] leading-relaxed text-carton/65">
                {communs.liant}
              </p>
            </div>

            <div>
              <h3 className="t-h3 font-display text-carton">
                {communs.momentsTitre}
              </h3>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-carton/70">
                {communs.momentsIntro}
              </p>
              <ul className="mt-6 border-t border-carton/12">
                {communs.moments.map((m) => (
                  <li
                    key={m}
                    className="border-b border-carton/12 py-3 text-[0.95rem] text-carton/70"
                  >
                    {m}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.95rem] leading-relaxed text-carton/65">
                {communs.momentsChute}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lieux de mariage */}
      <ListeLieux
        titre={`Les plus beaux lieux ${p.ou.startsWith("en") ? p.ou : `autour de ${p.nom}`}`}
        chapo={p.lieuxMariage.chapo}
        items={p.lieuxMariage.items}
        chute={p.lieuxMariage.chute}
        clair
      />

      {/* Entreprise */}
      <section className="border-b border-carton/12 py-16 lg:py-24">
        <div className="gutter">
          <h2 className="t-h2 max-w-3xl text-balance font-display text-carton">
            Magicien pour événement d&apos;entreprise {p.ou}
          </h2>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <div>
              <p className="text-[1.0625rem] leading-relaxed text-carton/75">
                {p.entrepriseIntro}
              </p>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-carton/65">
                J&apos;interviens directement auprès des collaborateurs, clients
                ou invités sous la forme d&apos;une déambulation : je vais à leur
                rencontre et propose des expériences courtes, visuelles et
                participatives. C&apos;est une animation particulièrement
                efficace pour :
              </p>
              <ul className="mt-6 border-t border-carton/12">
                {communs.entrepriseUsages.map((u) => (
                  <li
                    key={u}
                    className="border-b border-carton/12 py-3 text-[0.95rem] text-carton/70"
                  >
                    {u}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="t-h3 font-display text-carton">
                {communs.formesTitre}
              </h3>
              <dl className="mt-8 border-t border-carton/12">
                {communs.formes.map((f) => (
                  <div key={f.nom} className="border-b border-carton/12 py-5">
                    <dt className="text-[1rem] text-carton">{f.nom}</dt>
                    <dd className="mt-1.5 text-[0.9rem] leading-relaxed text-carton/60">
                      {f.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Lieux professionnels */}
      <ListeLieux
        titre={`Des lieux événementiels ${p.ou}`}
        chapo={p.lieuxPro.chapo}
        items={p.lieuxPro.items}
        chute={communs.lieuReserve}
      />

      {/* Pourquoi.

          La question d’un côté, la réponse de l’autre, séparées par un filet :
          les trois blocs s’empilaient jusque-là dans la moitié gauche, chacun
          sur une largeur différente, et la réponse passait avant d’être lue
          comme une réponse. */}
      <section className="border-y border-carton/12 py-20 lg:py-28">
        <div className="gutter">
          <div className="grid gap-y-10 lg:grid-cols-[minmax(0,5fr)_1px_minmax(0,7fr)] lg:gap-x-16 xl:gap-x-24">
            <h2 className="t-h3 max-w-[22ch] text-balance font-display text-carton">
              Pourquoi choisir un magicien {p.ou} pour votre événement ?
            </h2>

            <div className="rule-v hidden lg:block" />

            <div>
              <p className="text-pretty font-display text-[clamp(1.5rem,1.1rem+1.5vw,2.375rem)] leading-[1.2] text-carton">
                {communs.pourquoi[0]}
              </p>
              <div className="rule mt-9" />
              <p className="mt-7 max-w-[56ch] text-[0.95rem] leading-relaxed text-carton/65">
                {communs.pourquoi[1]}
              </p>
            </div>
          </div>
        </div>
      </section>

      <PrestationsSplit />

      {/* Maillage vers les autres pages locales */}
      <section className="border-b border-carton/12 py-14">
        <div className="gutter">
          <h2 className="text-[0.8125rem] text-carton/45">
            Julien intervient aussi
          </h2>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {autresZones(p.slug).map((z) => (
              <li key={z.slug}>
                <Link
                  href={`/${z.slug}`}
                  className="link-hover text-[0.95rem] text-carton/70 hover:text-carton"
                >
                  {z.titre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        lignes={[`Un magicien`, `${p.ou} ?`]}
        image="/images/site/site-apropos-cta.webp"
        alt="Invités stupéfaits pendant un tour de magie"
      />
    </>
  );
}

function ListeLieux({
  titre,
  chapo,
  items,
  chute,
  clair = false,
}: {
  titre: string;
  chapo: string;
  items: { nom: string; detail: string }[];
  chute: string;
  clair?: boolean;
}) {
  return (
    <section
      className={
        clair
          ? "register-carton bg-carton-200 py-16 text-encre lg:py-24"
          : "border-b border-carton/12 py-16 lg:py-24"
      }
    >
      <div className="gutter">
        <h2
          className={`t-h2 max-w-3xl text-balance font-display ${clair ? "" : "text-carton"}`}
        >
          {titre}
        </h2>
        <p
          className={`mt-8 max-w-2xl text-[1.0625rem] leading-relaxed ${clair ? "text-encre/75" : "text-carton/75"}`}
        >
          {chapo}
        </p>

        <dl
          className={`mt-12 border-t ${clair ? "border-encre/15" : "border-carton/12"} sm:grid sm:grid-cols-2 lg:grid-cols-3`}
        >
          {items.map((l, i) => (
            <Reveal
              key={l.nom}
              delay={(i % 3) * 0.05}
              className={`border-b py-7 sm:pr-10 ${clair ? "border-encre/15" : "border-carton/12"}`}
            >
              <dt className={`font-display text-[1.25rem] leading-snug ${clair ? "" : "text-carton"}`}>
                {l.nom}
              </dt>
              <dd
                className={`mt-2 max-w-xs text-[0.9rem] leading-relaxed ${clair ? "text-encre/65" : "text-carton/60"}`}
              >
                {l.detail}
              </dd>
            </Reveal>
          ))}
        </dl>

        <p
          className={`mt-10 max-w-3xl text-[0.95rem] leading-relaxed ${clair ? "text-encre/65" : "text-carton/65"}`}
        >
          {chute}
        </p>
      </div>
    </section>
  );
}

/** Prestation rattachée à une aire géographique précise. */
function serviceLocalSchema(p: ZonePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/${p.slug}#service`,
    name: p.titre,
    description: p.metaDescription,
    url: `${baseUrl}/${p.slug}`,
    serviceType: "Magicien close-up et magie de salon",
    provider: { "@id": ID.personne },
    areaServed: [
      { "@type": p.territoires ? "AdministrativeArea" : "City", name: p.nom },
      { "@type": "AdministrativeArea", name: p.region },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${baseUrl}/contact`,
      servicePhone: site.phone,
    },
  };
}
