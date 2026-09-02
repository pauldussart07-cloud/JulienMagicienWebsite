"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  // Le header devient opaque dès qu'on quitte le haut de page
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque navigation, et bloque le scroll quand il est ouvert
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const prestationActive =
    pathname.startsWith("/close-up") || pathname.startsWith("/magie-de-salon");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 bg-night-950/80 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-5"
        )}
      >
        <div className="container flex items-center justify-between gap-6">
          <Link
            href="/"
            className="relative z-10 shrink-0"
            aria-label={`${site.name}, magicien — accueil`}
          >
            <Image
              src="/images/brand/logo-blanc.png"
              alt={`${site.name} — ${site.role}`}
              width={1200}
              height={322}
              priority
              className={cn(
                "w-auto transition-all duration-500",
                scrolled ? "h-9 sm:h-10" : "h-11 sm:h-14"
              )}
            />
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {nav.map((item) =>
              "children" in item ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setSubOpen(true)}
                  onMouseLeave={() => setSubOpen(false)}
                >
                  <button
                    type="button"
                    aria-expanded={subOpen}
                    onClick={() => setSubOpen((v) => !v)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors",
                      prestationActive
                        ? "text-gold-300"
                        : "text-ivory-muted hover:text-ivory"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        subOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {subOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3"
                      >
                        <div className="surface overflow-hidden rounded-2xl p-1.5 shadow-lift">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="group block rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.06]"
                            >
                              <span className="block text-sm text-ivory transition-colors group-hover:text-gold-200">
                                {child.label}
                              </span>
                              <span className="mt-0.5 block text-xs text-ivory-dim">
                                {child.hint}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    isActive(item.href)
                      ? "text-gold-300"
                      : "text-ivory-muted hover:text-ivory"
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-4 -bottom-0.5 h-px bg-gold-300"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 text-sm text-ivory-muted transition-colors hover:text-gold-200 xl:flex"
            >
              <Phone className="h-3.5 w-3.5" />
              {site.phone}
            </a>

            <ButtonLink href="/contact" size="md" className="hidden sm:inline-flex">
              Demander un devis
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="rounded-full border border-white/12 bg-white/[0.04] p-2.5 text-ivory transition-colors hover:border-gold-300/40 hover:text-gold-200 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-night-950/97 backdrop-blur-xl lg:hidden"
          >
            <div className="bg-starfield absolute inset-0 opacity-40" aria-hidden />

            <div className="relative flex h-full flex-col">
              <div className="container flex items-center justify-between py-5">
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
                  className="rounded-full border border-white/12 bg-white/[0.04] p-2.5 text-ivory"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="container flex flex-1 flex-col justify-center gap-1 pb-24">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.045, duration: 0.4 }}
                  >
                    {"children" in item ? (
                      <div className="py-2">
                        <span className="eyebrow">{item.label}</span>
                        <div className="mt-2 flex flex-col gap-1 pl-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="font-display text-3xl text-ivory transition-colors hover:text-gold-200"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-2 font-display text-4xl transition-colors hover:text-gold-200",
                          isActive(item.href) ? "text-gold-300" : "text-ivory"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="container space-y-3 border-t border-white/10 py-6">
                <ButtonLink href="/contact" size="lg" className="w-full">
                  Demander un devis gratuit
                </ButtonLink>
                <a
                  href={site.phoneHref}
                  className="flex items-center justify-center gap-2 py-2 text-sm text-ivory-muted"
                >
                  <Phone className="h-4 w-4" />
                  {site.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
