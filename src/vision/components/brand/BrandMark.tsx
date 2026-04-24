interface Props {
  size?: "sm" | "md" | "lg";
  variant?: "stacked" | "inline";
  withTagline?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl md:text-4xl",
};

/**
 * Viajes PREMIUM® brand mark.
 * Always uppercase PREMIUM with ® per brand guidelines.
 * "Eleva tu Vida" in Nohemi ExtraLight when shown.
 */
export function BrandMark({ size = "md", variant = "inline", withTagline = false, className = "" }: Props) {
  if (variant === "stacked") {
    return (
      <div className={`inline-flex flex-col items-start leading-none ${className}`}>
        <span className={`font-display font-light tracking-[0.18em] uppercase ${sizeMap[size]}`}>
          Viajes
        </span>
        <span className={`font-display font-bold tracking-[0.08em] uppercase ${sizeMap[size]} -mt-1`}>
          PREMIUM<sup className="text-[0.5em] font-normal align-super ml-0.5">®</sup>
        </span>
        {withTagline && (
          <span className="tagline text-xs mt-1 text-ink-soft">Eleva tu Vida</span>
        )}
      </div>
    );
  }

  return (
    <span className={`inline-flex items-baseline gap-1.5 leading-none ${className}`}>
      <span className={`font-display font-light tracking-[0.18em] uppercase ${sizeMap[size]}`}>
        Viajes
      </span>
      <span className="font-display font-light text-ink-soft mx-0.5">|</span>
      <span className={`font-display font-bold tracking-[0.08em] uppercase ${sizeMap[size]}`}>
        PREMIUM<sup className="text-[0.5em] font-normal align-super ml-0.5">®</sup>
      </span>
      {withTagline && (
        <span className="tagline text-sm ml-3 text-ink-soft">Eleva tu Vida</span>
      )}
    </span>
  );
}
