"use client";

import { useEffect, useRef, useState } from "react";

import { Stars } from "@/components/ui/stars";
import { noteGoogle, temoignages } from "@/content/temoignages";
import { cn } from "@/lib/utils";

/** Le G de Google, tracé au lieu d'être chargé depuis leurs serveurs. */
function LogoGoogle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.5 7l-.1.3 6.5 5 .5.1c4.1-3.8 6.6-9.4 6.6-15.7"
      />
      <path
        fill="#34A853"
        d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.8 1.3-4.3 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-.3v.1l-6.7 5.2-.1.3C7.5 41 15.1 46 24 46"
      />
      <path
        fill="#FBBC05"
        d="M11.5 28.4c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4v-.3l-6.8-5.3-.2.1C3 16.9 2.2 20.3 2.2 24s.8 7.1 2.3 10l7-5.6"
      />
      <path
        fill="#EA4335"
        d="M24 9.9c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 3.7 29.9 1.5 24 1.5 15.1 1.5 7.5 6.5 4.5 14l7 5.6C13.3 14.3 18.2 9.9 24 9.9"
      />
    </svg>
  );
}

/**
 * Les avis Google en bande défilante.
 *
 * Les textes sont recopiés depuis la fiche : rien n'est chargé chez Google,
 * donc aucun script tiers, aucun cookie, et rien qui ralentisse la page.
 */
export function AvisGalerie({ titre }: { titre?: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const [progression, setProgression] = useState(0);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgression(max > 0 ? el.scrollLeft / max : 1);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="border-y border-carton/12 py-16 lg:py-20">
      <div className="gutter">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="t-h2 max-w-xl text-balance font-display text-carton">
            {titre ?? "Leurs mots, leur expérience"}
          </h2>

          {/* La note, présentée comme sur la fiche */}
          <a
            href={noteGoogle.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex shrink-0 items-center gap-4 border border-carton/15 px-5 py-4 transition-colors hover:border-carton/35"
          >
            <LogoGoogle className="h-7 w-7" />
            <span>
              <span className="flex items-baseline gap-2">
                <span className="font-display text-[1.75rem] leading-none text-carton">
                  {noteGoogle.valeur}
                </span>
                <Stars />
              </span>
              <span className="mt-1 block text-[0.8125rem] text-carton/55">
                {noteGoogle.nombre} avis sur Google
              </span>
            </span>
          </a>
        </div>
      </div>

      <div
        ref={rail}
        className="rail mt-12 flex gap-px overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Avis clients, défilement horizontal"
      >
        <div className="w-5 shrink-0 sm:w-8 lg:w-12" aria-hidden />

        {temoignages.map((t) => (
          <figure
            key={t.auteur}
            className="flex w-[85vw] shrink-0 flex-col justify-between border border-carton/12 bg-carton/[0.02] p-7 sm:w-[24rem] lg:w-[27rem]"
          >
            <div>
              <div className="flex items-center justify-between">
                <Stars />
                <LogoGoogle className="h-4 w-4 opacity-70" />
              </div>

              <blockquote className="mt-6">
                <p className="font-display text-[1.375rem] leading-[1.3] text-carton">
                  «&nbsp;{t.texte}
                  {t.extrait ? "…" : ""}&nbsp;»
                </p>
              </blockquote>
            </div>

            <figcaption className="mt-8 border-t border-carton/12 pt-4 text-[0.8125rem] text-carton/55">
              <span className="text-carton/80">{t.auteur}</span>
              <br />
              {t.contexte ? `${t.contexte}, ` : ""}
              {t.quand}
              {t.extrait && (
                <>
                  <br />
                  <a
                    href={noteGoogle.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-hover text-carton/45 hover:text-carton"
                  >
                    Lire l&apos;avis en entier sur Google
                  </a>
                </>
              )}
            </figcaption>
          </figure>
        ))}

        <div className="w-5 shrink-0 sm:w-8 lg:w-12" aria-hidden />
      </div>

      <div className="gutter mt-8">
        <div className="flex items-center gap-5">
          <div className="relative h-px w-40 bg-carton/15">
            <div
              className="absolute inset-y-0 left-0 bg-laiton transition-[width] duration-150"
              style={{ width: `${Math.max(progression * 100, 8)}%` }}
            />
          </div>
          <p
            className={cn(
              "text-[0.8125rem] text-carton/45 transition-opacity duration-500",
              progression > 0.02 && "opacity-0"
            )}
          >
            Faites défiler
          </p>
        </div>
      </div>
    </section>
  );
}
