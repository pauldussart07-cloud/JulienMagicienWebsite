import Image from "next/image";
import Link from "next/link";

import { prestations } from "@/content/prestations";

/**
 * Les deux prestations en deux panneaux plein bord.
 * Survoler l'un efface l'autre : la page dirige le regard exactement comme
 * Julien le fait pendant un tour.
 */
export function PrestationsSplit() {
  return (
    <section
      id="prestations"
      aria-label="Les prestations"
      className="attention-group grid border-y border-carton/12 lg:grid-cols-2"
    >
      {prestations.map((p, i) => (
        <Link
          key={p.slug}
          href={`/${p.slug}`}
          className={[
            "attention-item group relative flex min-h-[30rem] flex-col justify-end overflow-hidden lg:min-h-[44rem]",
            i === 0 ? "lg:border-r lg:border-carton/12" : "",
          ].join(" ")}
        >
          <Image
            src={p.vignette.src}
            alt={p.vignette.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectPosition: p.vignette.position ?? "50% 50%" }}
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <div className="veil-panel absolute inset-0" />

          <div className="relative p-6 sm:p-10 xl:p-14">
            <p className="mark text-carton/70">
              <span>{p.accroche}</span>
            </p>

            <h2 className="t-h2 mt-4 font-display text-carton">{p.nom}</h2>

            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-carton/75">
              {p.resume}
            </p>

            <div className="rule mt-9" />

            <div className="flex items-center justify-between pt-5">
              <p className="text-[0.8125rem] text-carton/60">
                {p.duree}, jusqu&apos;à {p.slug === "close-up" ? "100" : "50"}{" "}
                personnes
              </p>
              <span className="link-hover text-[0.9rem] text-carton">
                Découvrir
              </span>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
