import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function Stars({
  count = 5,
  className,
  size = "sm",
}: {
  count?: number;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${count} étoiles sur 5`}
      role="img"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            "fill-gold-300 text-gold-300",
            size === "sm" ? "h-3.5 w-3.5" : "h-4.5 w-4.5"
          )}
        />
      ))}
    </span>
  );
}

/** Pastille « 5★ sur Google » utilisée dans les hero et les bandeaux CTA. */
export function GoogleBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "surface inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs text-ivory-muted",
        className
      )}
    >
      <Stars />
      <span className="text-ivory">5,0</span>
      <span className="h-3 w-px bg-white/15" aria-hidden />
      <span>sur Google</span>
    </span>
  );
}
