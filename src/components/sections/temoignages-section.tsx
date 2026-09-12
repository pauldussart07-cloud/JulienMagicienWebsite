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
        <ul className="flex flex-1 flex-wrap items-center justify-between gap-x-10 gap-y-7">
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

