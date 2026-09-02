"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { PageTransition } from "@/components/magic/page-transition";
import { ButtonLink } from "@/components/ui/button";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  /** Vrai quand une section du registre clair passe sous le header. */
  const [surCarton, setSurCarton] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;

    const mesurer = () => {
      raf = 0;
      setScrolled(window.scrollY > 40);

      // Si une section du registre ivoire croise la barre, le header passe
      // en encre pour rester lisible.
      const ligne = 34;
      const clair = [...document.querySelectorAll(".register-carton")].some(
        (el) => {
          const r = el.getBoundingClientRect();
          return r.top <= ligne && r.bottom >= ligne;
        }
      );
      setSurCarton(clair);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(mesurer);
    };

    mesurer();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Aplatit le sous-menu Prestations : la navigation reste sur une seule ligne
  const liens = nav.flatMap((item) =>
    item.children
      ? item.children.map((c) => ({ href: c.href, label: c.label }))
      : [{ href: item.href, label: item.label }]
  );

  return (
    <>
      <PageTransition />

      <header
        data-register={surCarton ? "carton" : "encre"}
        className={cn(
          "group/header fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500",
          scrolled ? "py-3.5" : "py-6",
          scrolled && !surCarton && "border-b border-carton/12 bg-encre-900/95 backdrop-blur-md",
          scrolled && surCarton && "border-b border-encre/12 bg-carton/95 backdrop-blur-md",
          !scrolled && "border-b border-transparent"
        )}
      >
        <div className="gutter flex items-center justify-between gap-8">
          <Link href="/" aria-label={`${site.name}, magicien, accueil`}>
            <Image
              src={
                surCarton
                  ? "/images/brand/logo-original.png"
                  : "/images/brand/logo-blanc.png"
              }
              alt={`${site.name}, ${site.role}`}
              width={1200}
              height={322}
              priority
              className={cn(
                "w-auto transition-all duration-500",
                scrolled ? "h-8" : "h-10 sm:h-12"
              )}
            />
          </Link>

          <nav
            className="hidden items-center gap-7 xl:flex"
            aria-label="Navigation principale"
          >
            {liens.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "link-hover text-[0.9rem] transition-colors duration-300",
                  surCarton
                    ? isActive(item.href)
                      ? "text-encre"
                      : "text-encre/55 hover:text-encre"
                    : isActive(item.href)
                      ? "text-carton"
                      : "text-carton/55 hover:text-carton"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <a
              href={site.phoneHref}
              className={cn(
                "link-hover hidden text-[0.9rem] transition-colors lg:block",
                surCarton
                  ? "text-encre/55 hover:text-encre"
                  : "text-carton/55 hover:text-carton"
              )}
            >
              {site.phone}
            </a>

            <ButtonLink
              href="/contact"
              className={cn(
                "hidden sm:inline-flex",
                surCarton && "bg-encre text-carton hover:bg-encre-600"
              )}
            >
              Réserver une date
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="flex h-10 w-10 items-center justify-center xl:hidden"
            >
              <span className="relative block h-3 w-6">
                <span className={cn("absolute inset-x-0 top-0 h-px", surCarton ? "bg-encre" : "bg-carton")} />
                <span className={cn("absolute inset-x-0 bottom-0 h-px", surCarton ? "bg-encre" : "bg-carton")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[80] bg-encre-900 xl:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="gutter flex items-center justify-between py-6">
                <Image
                  src="/images/brand/logo-blanc.png"
                  alt=""
                  width={1200}
                  height={322}
                  className="h-10 w-auto"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="flex h-10 w-10 items-center justify-center"
                >
                  <span className="relative block h-6 w-6">
                    <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-carton" />
                    <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-carton" />
                  </span>
                </button>
              </div>

              <div className="rule" />

              <nav className="gutter flex flex-1 flex-col justify-center">
                {liens.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-1.5 font-display text-[clamp(2.25rem,9vw,3.5rem)] leading-[1.05] transition-colors",
                        isActive(item.href) ? "text-carton" : "text-carton/50"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="rule" />

              <div className="gutter space-y-4 py-8">
                <ButtonLink href="/contact" size="lg" className="w-full">
                  Réserver une date
                </ButtonLink>
                <div className="flex items-center justify-between text-[0.9rem] text-carton/55">
                  <a href={site.phoneHref} className="link-hover">
                    {site.phone}
                  </a>
                  <a href={site.emailHref} className="link-hover">
                    Écrire un message
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
