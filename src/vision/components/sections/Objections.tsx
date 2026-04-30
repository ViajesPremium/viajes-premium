const items = [
  {
    q: "¿Por qué no reservar yo mismo en línea?",
    a: "Puedes. Y lo harás bien. Pero no tendrás acceso a hoteles que no se publican en buscadores, ni a guías que no aceptan clientes directos, ni a un asesor que responda en minutos cuando algo se mueva. La diferencia se nota desde el primer check-in.",
  },
  {
    q: "¿Qué pasa si algo sale mal durante el viaje?",
    a: "Tienes un asesor dedicado en México, asistencia 24/7 internacional y partners locales en cada destino. La mayoría de los imprevistos los resolvemos antes de que tú los notes.",
  },
  {
    q: "¿Es realmente flexible el itinerario?",
    a: "Completamente. El itinerario inicial es una propuesta. Movemos días, cambiamos hoteles, agregamos experiencias, eliminamos lo que no resuene. Tu viaje, tu firma.",
  },
  {
    q: "¿El precio es justificado?",
    a: "Sí, y lo verás reflejado en cada habitación, cada mesa y cada hora ganada. Además ofrecemos pagos en mensualidades para que el momento financiero no posponga tu vida.",
  },
];

export function Objections() {
  return (
    <section className="bg-primary text-primary-foreground py-24 md:py-40">
      <div className="editorial-container">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="gold-line" />
            <span className="label-mono text-primary-foreground/70">Sin titubeos · 009</span>
          </div>
          <h2 className="display-lg">
            Lo que rara vez
            <br />
            <em className="font-extralight italic text-gold">se dice en voz alta.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
          {items.map((it, i) => (
            <div key={i} className="border-t border-primary-foreground/15 pt-8">
              <div className="flex items-baseline gap-4 mb-5">
                <span className="num-marker text-gold">0{i + 1}</span>
                <h3 className="font-display font-light text-2xl md:text-[1.7rem] leading-[1.2] tracking-[-0.02em]">
                  {it.q}
                </h3>
              </div>
              <p className="text-primary-foreground/70 text-[0.95rem] leading-[1.75] font-light max-w-xl">{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
