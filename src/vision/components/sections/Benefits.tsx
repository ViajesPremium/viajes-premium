const suite = "/vision/assets/lifestyle-suite.jpg";

const benefits = [
  "Hospedaje 4 y 5 estrellas seleccionado a mano",
  "Itinerarios culturales con experiencias privadas",
  "Traslados privados en cada ciudad",
  "Mesas reservadas en restaurantes de autor",
  "Guias locales bilingues certificados",
  "Acceso a sitios y horarios fuera del flujo turistico",
  "Asistencia de viaje completa incluida",
  "Soporte 24/7 con tu asesor dedicado",
];

export function Benefits() {
  return (
    <section className="bg-background py-24 md:py-40">
      <div className="editorial-container">
        <div className="grid items-stretch gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            <img
              src={suite}
              alt="Suite de lujo con vista a montanas al amanecer"
              loading="lazy"
              className="h-full w-full object-cover aspect-[4/5] lg:min-h-[700px] lg:aspect-auto"
              width={1600}
              height={1200}
            />
            <div className="absolute right-6 bottom-6 left-6 flex justify-between text-primary-foreground/90">
              <span className="label-mono">Suite premium · Andes</span>
              <span className="label-mono">Curado por VP</span>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-5 lg:pl-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="gold-line" />
              <span className="label-mono">Lo incluido · 006</span>
            </div>
            <h2 className="display-md mb-10">
              Todo esta pensado.
              <br />
              <em className="font-extralight italic text-gold">
                Tu solo presente.
              </em>
            </h2>
            <p className="mb-10 text-lg leading-[1.7] font-light text-ink-soft">
              Cada experiencia{" "}
              <span className="brand-premium font-bold">PREMIUM</span> incluye,
              como base, lo que en otras agencias es opcional. Esa es la
              diferencia entre viajar y elevar tu vida.
            </p>

            <ul className="mt-auto grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-3 border-b border-hairline py-4"
                >
                  <span className="num-marker text-xs">0{i + 1}</span>
                  <span className="text-sm leading-[1.5] font-light">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
