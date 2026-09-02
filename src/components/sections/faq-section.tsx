"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/content/faq";
import { cn } from "@/lib/utils";

/** FAQ complète avec filtres par catégorie (page /faq). */
export function FaqTabs() {
  const [active, setActive] = useState(faq[0].id);
  const categorie = faq.find((c) => c.id === active)!;

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Catégories de questions"
      >
        {faq.map((cat) => {
          const on = cat.id === active;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(cat.id)}
              className={cn(
                "relative rounded-full px-5 py-2.5 text-sm transition-colors duration-300",
                on ? "text-night-950" : "text-ivory-muted hover:text-ivory"
              )}
            >
              {on && (
                <motion.span
                  layoutId="faq-pill"
                  className="absolute inset-0 rounded-full bg-gold-300"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
              <span
                className={cn(
                  "relative z-10 ml-2 text-[0.7rem]",
                  on ? "text-night-950/55" : "text-ivory-dim"
                )}
              >
                {cat.items.length}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="surface mt-10 rounded-3xl px-6 sm:px-9"
      >
        <Accordion type="single" collapsible>
          {categorie.items.map((item, i) => (
            <AccordionItem key={item.q} value={`${active}-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}

/** Extrait de FAQ, utilisé en bas des pages prestation. */
export function FaqListe({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="surface rounded-3xl px-6 sm:px-9">
      <Accordion type="single" collapsible>
        {items.map((item, i) => (
          <AccordionItem key={item.q} value={`q-${i}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
