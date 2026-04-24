const stories = [
  {
    quote:
      "Habíamos viajado a Japón antes. Con Viajes PREMIUM® fue otro país: cenamos donde no hay reserva online, vimos Kioto en silencio al amanecer, y mi esposa lloró tres veces de pura belleza.",
    name: "Ricardo M.",
    role: "Director General · 14 días en Japón",
    rating: 5,
  },
  {
    quote:
      "Viajamos cuatro generaciones a Europa. Yo solo tenía que aparecer en el lobby. Mi mamá de 78 años caminó menos, vio más, y todos volvimos hablando de lo mismo.",
    name: "Adriana L.",
    role: "Familia · 18 días en Europa",
    rating: 5,
  },
  {
    quote:
      "Nuestra luna de miel en Perú no fue un viaje, fue una declaración. Cada noche un detalle nuevo. Cada día algo que no aparece en ninguna guía.",
    name: "Pablo y Sofía",
    role: "Luna de miel · 10 días en Perú",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="bg-background py-24 md:py-40">
      <div className="editorial-container">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="gold-line" />
              <span className="label-mono">Testimonios · 008</span>
            </div>
            <h2 className="display-lg max-w-3xl">
              Lo que vuelven
              <br />
              <em className="font-extralight italic text-gold">a contar.</em>
            </h2>
          </div>
          <div className="flex items-baseline gap-6 text-ink-soft">
            <div>
              <div className="num-marker text-5xl">4.97</div>
              <div className="label-mono mt-2">de 5.0 — 1,200+ reseñas</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-hairline">
          {stories.map((s, i) => (
            <figure key={i} className="bg-background p-10 md:p-12 flex flex-col">
              <div className="flex items-center gap-1 mb-8 text-gold">
                {Array.from({ length: s.rating }).map((_, k) => (
                  <span key={k}>★</span>
                ))}
              </div>
              <blockquote className="font-display font-light text-xl md:text-2xl leading-[1.4] tracking-[-0.015em] mb-10 flex-1">
                <span className="text-gold text-3xl mr-1 leading-none align-top">“</span>
                {s.quote}
              </blockquote>
              <figcaption className="border-t border-hairline pt-6">
                <div className="font-display font-medium">{s.name}</div>
                <div className="label-mono mt-2">{s.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
