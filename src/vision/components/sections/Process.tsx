const steps = [
  { n: "I", title: "Conversación inicial", body: "Una llamada sin compromiso para entender tu momento, tus prioridades y tu estilo de viajar." },
  { n: "II", title: "Propuesta a tu medida", body: "Recibes un itinerario curado, con hoteles, ritmo y experiencias justificadas, listo para refinar." },
  { n: "III", title: "Personalización", body: "Ajustamos cada detalle contigo. Tiempos, mesas, transferencias, sorpresas: tú decides el grado." },
  { n: "IV", title: "Reserva con confianza", body: "Pagas con esquemas flexibles. Confirmamos hoteles, vuelos, guías y todos los servicios." },
  { n: "V", title: "Acompañamiento total", body: "Soporte 24/7 mientras viajas. Y al regresar, un cierre cuidado y la siguiente conversación." },
];

export function Process() {
  return (
    <section id="metodo" className="bg-primary text-primary-foreground py-24 md:py-40">
      <div className="editorial-container">
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <span className="gold-line" />
              <span className="label-mono text-primary-foreground/70">El Método · 005</span>
            </div>
            <h2 className="display-lg">
              Cinco actos
              <br />
              <em className="font-extralight italic text-gold">sin fricciones.</em>
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-7 body-lg text-primary-foreground/75">
            La planificación de un viaje extraordinario no debería sentirse como un trabajo. Te llevamos de la idea al
            destino sin que tengas que cargar con la logística.
          </p>
        </div>

        <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
          {steps.map((s) => (
            <li key={s.n} className="relative">
              <div className="flex items-center gap-4 mb-6">
                <span className="num-marker text-4xl text-gold">{s.n}</span>
                <div className="flex-1 h-px bg-primary-foreground/15" />
              </div>
              <h3 className="font-display font-light text-2xl tracking-[-0.02em] mb-4 leading-[1.1]">{s.title}</h3>
              <p className="text-primary-foreground/65 text-[0.92rem] leading-[1.7] font-light">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
