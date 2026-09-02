import Image from "next/image";

import { TextLink } from "@/components/ui/button";
import { Stars } from "@/components/ui/stars";
import { clients } from "@/content/site";

/** Bandeau des logos clients, sur le registre clair. */
export function ClientsBand() {
  return (
    <section className="register-carton border-y border-encre/10 bg-carton py-12 text-encre">
      <div className="gutter flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
        <p className="shrink-0 text-[0.8125rem] text-encre/55">
          Ils ont fait appel à Julien
        </p>
        <ul className="flex flex-wrap items-center gap-x-12 gap-y-7">
          {clients.map((c) => (
            <li key={c.src}>
              <Image
                src={c.src}
                alt={c.alt}
                width={c.width}
                height={c.height}
                className="h-8 w-auto opacity-45 mix-blend-multiply grayscale transition-opacity duration-500 hover:opacity-80 lg:h-9"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Avis unique mis en avant en bas des pages prestation. */
export function TemoignageUnique({
  auteur,
  ville,
  texte,
}: {
  auteur: string;
  ville: string;
  texte: string;
}) {
  return (
    <section className="border-y border-carton/12">
      <div className="gutter py-20 lg:py-28">
        <figure className="max-w-4xl">
          <Stars />
          <blockquote className="mt-7">
            <p className="t-h3 font-display italic text-carton">
              «&nbsp;{texte}&nbsp;»
            </p>
          </blockquote>
          <figcaption className="mt-8 text-[0.875rem] text-carton/55">
            {auteur}, {ville}
          </figcaption>
        </figure>
        <p className="mt-10">
          <TextLink href="/avis" className="text-carton">
            Voir tous les avis
          </TextLink>
        </p>
      </div>
    </section>
  );
}
