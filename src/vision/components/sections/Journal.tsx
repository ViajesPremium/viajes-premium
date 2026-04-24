import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    tag: "Japon · Cultura",
    title: "El kaiseki como filosofia: una cena en Kioto que dura cinco horas",
    read: "9 min",
    img: "/vision/assets/journal-1.jpg",
  },
  {
    tag: "Europa · Arte",
    title: "Visitar el Louvre cuando no hay nadie: el privilegio del acceso privado",
    read: "6 min",
    img: "/vision/assets/journal-2.jpg",
  },
  {
    tag: "Mexico · Lujo",
    title: "Las suites con piscina privada que redefinen el Caribe mexicano",
    read: "7 min",
    img: "/vision/assets/journal-3.jpg",
  },
];

export function Journal() {
  return (
    <section id="diario" className="bg-cream py-24 md:py-40">
      <div className="editorial-container">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <span className="gold-line" />
              <span className="label-mono">El Diario · 011</span>
            </div>
            <h2 className="display-lg">
              Inspiracion
              <br />
              <em className="font-extralight italic text-gold">curada.</em>
            </h2>
          </div>
          <a
            href="#"
            className="hidden items-center gap-3 border-b border-foreground pb-1 text-sm tracking-[0.2em] uppercase transition-colors hover:border-gold hover:text-gold md:inline-flex"
          >
            Ver todos los ensayos{" "}
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
          {articles.map((a, i) => (
            <a key={i} href="#" className="group block">
              <div className="mb-6 overflow-hidden bg-primary aspect-[4/5]">
                <img
                  src={a.img}
                  alt={a.title}
                  loading="lazy"
                  width={1200}
                  height={1500}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-105"
                />
              </div>
              <div className="mb-4 flex items-center justify-between text-ink-soft">
                <span className="label-mono">{a.tag}</span>
                <span className="label-mono">{a.read}</span>
              </div>
              <h3 className="text-2xl leading-[1.2] tracking-[-0.02em] font-display font-light transition-colors duration-500 group-hover:text-gold md:text-[1.6rem]">
                {a.title}
              </h3>
              <div className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-ink-soft transition-colors group-hover:text-foreground">
                Leer ensayo
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
