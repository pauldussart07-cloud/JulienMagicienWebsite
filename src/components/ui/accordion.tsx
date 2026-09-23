"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "group border-b border-white/[0.08] transition-colors last:border-b-0 data-[state=open]:border-gold-300/25",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-start justify-between gap-6 py-6 text-left font-display text-lg font-normal leading-snug text-ivory transition-colors hover:text-gold-200 sm:text-xl",
        "data-[state=open]:text-gold-200",
        className
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden
        className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/12 text-gold-300 transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-gold-300/50 group-data-[state=open]:bg-gold-300/10"
      >
        <Plus className="h-3.5 w-3.5" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  // Monté en permanence : Radix retire sinon la réponse du DOM tant que la
  // question est fermée, et le HTML livré aux moteurs ne contient que les
  // questions. Fermée, elle porte l'attribut `hidden`.
  <AccordionPrimitive.Content
    ref={ref}
    forceMount
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("max-w-2xl pb-7 pr-10 text-[0.95rem] leading-relaxed text-ivory-muted", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
