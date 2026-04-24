const profiles = [
  {
    n: "01",
    who: "Para el ejecutivo",
    title: "Que necesita desconectar sin renunciar al estándar.",
    body: "Itinerarios pausados, hoteles silenciosos, conectividad cuando la pides y privacidad cuando la necesitas. Vuelves descansado, no agotado.",
  },
  {
    n: "02",
    who: "Para la familia",
    title: "Que quiere recuerdos, no logística.",
    body: "Ritmo a medida para varias generaciones. Habitaciones conectadas, experiencias para cada edad, seguridad invisible y una sola persona resolviendo todo.",
  },
  {
    n: "03",
    who: "Para la pareja",
    title: "Que celebra un momento que merece marcarse.",
    body: "Aniversarios, lunas de miel, segundas lunas. Cenas privadas, suites con vistas imposibles, gestos pensados que nadie más recuerda.",
  },
  {
    n: "04",
    who: "Para el viajero exigente",
    title: "Que ya lo ha hecho casi todo.",
    body: "Acceso a experiencias que no existen en buscadores: chefs privados, talleres con artesanos, encuentros culturales que no se reservan online.",
  },
];

export function Profiles() {
  return (
    <section className="bg-cream py-24 md:py-40">
      <div className="editorial-container">
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="gold-line" />
            <span className="label-mono">Para quién · 007</span>
          </div>
          <h2 className="display-lg">
            Cuatro formas
            <br />
            de viajar
            <br />
            <em className="font-extralight italic text-gold">en serio.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-hairline">
          {profiles.map((p) => (
            <article key={p.n} className="bg-cream p-10 md:p-14 hover:bg-background transition-colors duration-700">
              <div className="flex items-start justify-between mb-10">
                <span className="num-marker text-2xl">{p.n}</span>
                <span className="label-mono">{p.who}</span>
              </div>
              <h3 className="font-display font-light text-3xl md:text-[2.25rem] leading-[1.1] tracking-[-0.025em] mb-6 max-w-md">
                {p.title}
              </h3>
              <p className="text-ink-soft text-base md:text-lg leading-[1.7] font-light max-w-md">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
