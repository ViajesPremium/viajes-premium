const pillars = [
  { n: "01", title: "Itinerarios curados por expertos culturales", body: "Nada de plantillas. Cada ruta se diseña con asesores que han vivido el destino y conocen sus matices." },
  { n: "02", title: "Hoteles 4 y 5★ con calidad certificada", body: "Solo seleccionamos propiedades que pasan nuestro propio filtro de servicio, ubicación y estética." },
  { n: "03", title: "Atención personal antes, durante y después", body: "Un asesor dedicado te acompaña desde la primera idea hasta el regreso a casa. Sin call centers." },
  { n: "04", title: "Soporte 24/7 mientras viajas", body: "Cualquier imprevisto se resuelve en minutos. Tú nunca quedas a la deriva, sin importar el huso horario." },
  { n: "05", title: "Guías expertos en español", body: "Profesionales locales bilingües que abren puertas, traducen contexto y elevan cada visita." },
  { n: "06", title: "Pagos flexibles y mensualidades", body: "Esquemas pensados para que un viaje extraordinario no tenga que ser un sacrificio financiero." },
];

export function WhyPremium() {
  return (
    <section id="porque" className="bg-background py-24 md:py-40">
      <div className="editorial-container">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-24">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <span className="gold-line" />
              <span className="label-mono">Diferenciales · 004</span>
            </div>
            <h2 className="display-lg">
              Por qué PREMIUM<sup className="text-[0.4em]">®</sup>{" "}
              <em className="font-extralight italic text-gold">no es un adjetivo.</em>
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-7 body-lg text-ink-soft">
            Es un estándar verificable, una operación obsesiva con el detalle, y un equipo que entiende que la excelencia
            no se improvisa. Estas son las seis convicciones que sostienen cada viaje.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-hairline">
          {pillars.map((p, i) => (
            <article
              key={p.n}
              className={`group p-8 md:p-10 border-b border-hairline ${
                i % 3 !== 2 ? "lg:border-r" : ""
              } ${i % 2 === 0 ? "md:border-r lg:border-r" : ""} ${i % 3 === 2 ? "lg:border-r-0" : ""} hover:bg-cream transition-colors duration-700`}
            >
              <div className="flex items-baseline justify-between mb-8">
                <span className="num-marker text-3xl">{p.n}</span>
                <div className="h-px w-16 bg-hairline group-hover:bg-gold group-hover:w-24 transition-all duration-700" />
              </div>
              <h3 className="font-display font-light text-2xl md:text-[1.7rem] leading-[1.15] tracking-[-0.02em] mb-5">
                {p.title}
              </h3>
              <p className="text-ink-soft text-[0.95rem] leading-[1.7] font-light">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
