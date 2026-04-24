const items = [
  { num: "19", label: "Años elevando vidas" },
  { num: "12+", label: "Destinos curados" },
  { num: "4–5★", label: "Hoteles certificados" },
  { num: "24/7", label: "Acompañamiento" },
  { num: "100%", label: "A tu medida" },
];

export function TrustStrip() {
  return (
    <section className="bg-primary text-primary-foreground border-t border-primary-foreground/10">
      <div className="editorial-container py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6">
          {items.map((it, i) => (
            <div key={i} className="flex flex-col items-start gap-3 md:border-l md:first:border-l-0 md:border-primary-foreground/10 md:pl-6">
              <span className="display-md font-extralight text-gold">{it.num}</span>
              <span className="label-mono text-primary-foreground/70">{it.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee promise */}
      <div className="overflow-hidden border-t border-primary-foreground/10 py-5">
        <div className="flex marquee-track whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12 pr-12 shrink-0">
              {Array.from({ length: 8 }).map((__, j) => (
                <span key={j} className="flex items-center gap-12">
                  <span className="font-display font-extralight italic text-2xl md:text-3xl text-primary-foreground/85">
                    Eleva tu Vida
                  </span>
                  <span className="text-gold text-3xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
