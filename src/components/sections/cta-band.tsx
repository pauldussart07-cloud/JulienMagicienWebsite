import Image from "next/image";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { Reveal, RevealWords } from "@/components/magic/reveal";
import { ButtonLink } from "@/components/ui/button";
import { GoogleBadge } from "@/components/ui/stars";
import { site } from "@/content/site";

/**
 * Bandeau de conversion repris en pied de chaque page.
 * Le texte est celui de l'ancien site.
 */
export function CtaBand({
  titre = "Prêt pour l'impossible ?",
  image = "/images/home/home-04.webp",
}: {
  titre?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="scale-105 object-cover object-center"
        />
        <div className="absolute inset-0 bg-night-950/85" />
        <div className="bg-aurora absolute inset-0 opacity-90" />
      </div>

      <div className="container relative py-24 text-center lg:py-32">
        <Reveal>
          <GoogleBadge />
        </Reveal>

        <RevealWords
          text={titre}
          as="h2"
          className="t-h2 mx-auto mt-7 max-w-3xl font-display font-light text-ivory"
        />

        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ivory-muted sm:text-lg">
            Mariages, cocktails, soirées d&apos;entreprise, anniversaires —
            contactez Julien pour échanger sur votre projet. Il vous répond
            rapidement avec un devis personnalisé.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Demander un devis gratuit
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="outline" size="lg">
              <Phone className="h-4 w-4" />
              {site.phone}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-ivory-dim">
            <Mail className="h-3.5 w-3.5" />
            <a href={site.emailHref} className="underline-sweep hover:text-gold-200">
              {site.email}
            </a>
            <span className="text-gold-700" aria-hidden>
              ·
            </span>
            <span>{site.zone}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
