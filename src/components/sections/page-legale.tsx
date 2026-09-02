import { PageHeroTexte } from "@/components/sections/page-hero";

export type SectionLegale = { titre: string; paragraphes: string[] };

/** Gabarit des pages de texte réglementaire. */
export function PageLegale({
  titre,
  intro,
  maj,
  sections,
}: {
  titre: string;
  intro?: string;
  maj: string;
  sections: SectionLegale[];
}) {
  return (
    <>
      <PageHeroTexte titre={titre} intro={intro} />

      <section className="py-16 lg:py-24">
        <div className="gutter grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.8125rem] text-carton/45">
              Dernière mise à jour
            </p>
            <p className="mt-1 text-[0.95rem] text-carton/75">{maj}</p>
          </aside>

          <div className="max-w-prose">
            {sections.map((s) => (
              <section key={s.titre} className="mb-12 last:mb-0">
                <h2 className="font-display text-[1.5rem] leading-snug text-carton">
                  {s.titre}
                </h2>
                {s.paragraphes.map((p, i) => (
                  <p
                    key={i}
                    className="mt-4 text-[1rem] leading-relaxed text-carton/70"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
