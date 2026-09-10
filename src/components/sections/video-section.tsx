"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { teaser } from "@/content/media";

/**
 * Le teaser, servi depuis le site.
 *
 * Le fichier vient du montage d'origine, pas d'une copie récupérée sur
 * YouTube : c'est ce qui fait la netteté. Rien n'est chargé tant que
 * personne ne clique, ni script, ni cookie, ni le moindre octet de vidéo.
 * On n'affiche qu'une image et un bouton.
 *
 * Deux fichiers sont préparés. Le 720p est servi aux écrans étroits, où le
 * 1080p ne se verrait pas mais se paierait en attente.
 */
export function VideoSection() {
  const [lance, setLance] = useState(false);
  const [source, setSource] = useState<string>(teaser.src);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.innerWidth < 900) setSource(teaser.srcMobile);
  }, []);

  useEffect(() => {
    if (lance) video.current?.play().catch(() => {});
  }, [lance]);

  return (
    <section className="border-y border-carton/12">
      <div className="gutter py-16 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="t-h2 max-w-2xl text-balance font-display text-carton">
            Oubliez les descriptions, regardez
          </h2>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-carton/60">
            Une soirée entière condensée en une minute trente : les mains, les
            regards, et ce qu&apos;il en reste.
          </p>
        </div>
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden bg-encre-900 lg:aspect-[2.2/1]">
        {lance ? (
          <video
            ref={video}
            controls
            playsInline
            preload="auto"
            poster={teaser.poster}
            className="absolute inset-0 h-full w-full bg-encre-900 object-cover"
          >
            <source src={source} type="video/mp4" />
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setLance(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label="Lire la vidéo de présentation de Julien Lambert"
          >
            <Image
              src={teaser.poster}
              alt="Julien Lambert fait apparaître une flamme entre ses mains, face à la mer"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-encre-900/35 transition-colors duration-500 group-hover:bg-encre-900/20" />

            {/* Anneau et triangle : le seul geste laiton de la page */}
            <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-laiton/60 backdrop-blur-[2px] transition-[transform,border-color,background-color] duration-500 group-hover:scale-110 group-hover:border-laiton group-hover:bg-laiton/10 sm:h-24 sm:w-24">
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="ml-1 h-7 w-7 fill-laiton transition-colors duration-500 group-hover:fill-laiton-300"
              >
                <path d="M6 3.5v17l15-8.5z" />
              </svg>
            </span>

            <span className="mark absolute bottom-5 left-5 text-carton/85 sm:bottom-7 sm:left-7">
              <span>{teaser.dureeTexte}, sans commentaire</span>
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
