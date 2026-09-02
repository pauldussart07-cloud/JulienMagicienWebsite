import { cn } from "@/lib/utils";

/**
 * Note Google. Pas de pastille ni de fond : un chiffre, cinq étoiles pleines
 * et une mention, posés à même la page.
 */
export function Note({
  className,
  tone = "light",
}: {
  className?: string;
  /** `light` = sur fond encre, `dark` = sur fond carton */
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.8125rem]",
        tone === "light" ? "text-carton/70" : "text-encre/60",
        className
      )}
    >
      <Stars tone={tone} />
      <span className={tone === "light" ? "text-carton" : "text-encre"}>5,0</span>
      <span>sur Google</span>
    </p>
  );
}

export function Stars({
  count = 5,
  tone = "light",
  className,
}: {
  count?: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`${count} étoiles sur 5`}
      className={cn("inline-flex items-center gap-[3px]", className)}
    >
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          aria-hidden
          className={cn(
            "h-[11px] w-[11px]",
            tone === "light" ? "fill-laiton" : "fill-laiton-600"
          )}
        >
          <path d="M6 0l1.6 3.9L12 4.4 8.8 7.2l1 4.4L6 9.3 2.2 11.6l1-4.4L0 4.4l4.4-.5z" />
        </svg>
      ))}
    </span>
  );
}
