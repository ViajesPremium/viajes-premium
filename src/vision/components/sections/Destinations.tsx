import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const dests = [
  {
    code: "JP",
    name: "Japon",
    tag: "Ceremonia & Contemplacion",
    img: "/vision/assets/dest-japon.jpg",
    copy: "De Kioto a Kanazawa, donde la elegancia es un arte cotidiano.",
  },
  {
    code: "EU",
    name: "Europa",
    tag: "Capitales & Mesas de Autor",
    img: "/vision/assets/dest-europa.jpg",
    copy: "Un Grand Tour curado por hoteles de caracter y cocinas con historia.",
  },
  {
    code: "KR",
    name: "Corea",
    tag: "Tradicion & Diseno",
    img: "/vision/assets/dest-corea.jpg",
    copy: "Seul, Busan y los templos del sur en una sola partitura.",
  },
  {
    code: "CA",
    name: "Canada",
    tag: "Naturaleza Cinematografica",
    img: "/vision/assets/dest-canada.jpg",
    copy: "Lagos en silencio, lodges de altura, otonos imposibles.",
  },
  {
    code: "PE",
    name: "Peru",
    tag: "Andes & Memoria Inca",
    img: "/vision/assets/dest-peru.jpg",
    copy: "Machu Picchu al amanecer, Sacred Valley con guias expertos.",
  },
  {
    code: "MX",
    name: "Barrancas",
    tag: "Sierra Tarahumara",
    img: "/vision/assets/dest-barrancas.jpg",
    copy: "El Chepe Express, miradores privados y el silencio del canon.",
  },
  {
    code: "MX",
    name: "Chiapas",
    tag: "Selva & Color",
    img: "/vision/assets/dest-chiapas.jpg",
    copy: "Cascadas turquesa, San Cristobal y rituales que no caducan.",
  },
  {
    code: "MX",
    name: "Yucatan",
    tag: "Mundo Maya",
    img: "/vision/assets/dest-yucatan.jpg",
    copy: "Cenotes privados, hacienda boutique y la grandeza de Chichen Itza.",
  },
];

export function Destinations() {
  return (
    <section id="destinos" className="bg-cream py-24 md:py-40">
      <div className="editorial-container">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6 md:mb-24">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <span className="gold-line" />
              <span className="label-mono">Colecciones · 003</span>
            </div>
            <h2 className="display-lg max-w-3xl">
              Destinos firmados
              <br />
              <em className="font-extralight italic">
                PREMIUM<sup className="text-[0.45em]">®</sup>
              </em>
            </h2>
          </div>
          <p className="body-lg max-w-sm text-ink-soft">
            Cada coleccion es una marca con identidad propia. Misma promesa,
            mismo estandar.
          </p>
        </div>

        <div className="grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {dests.map((d, i) => (
            <motion.a
              key={d.name}
              href="#contacto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 3) * 0.08,
              }}
              className={`group block ${
                i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden bg-primary ${
                  i === 0
                    ? "aspect-[4/5] lg:h-full lg:min-h-[640px] lg:aspect-auto"
                    : "aspect-[4/5]"
                }`}
              >
                <img
                  src={d.img}
                  alt={`${d.name} PREMIUM`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-105"
                  width={1280}
                  height={1600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />

                <div className="absolute top-5 right-5 left-5 flex justify-between text-primary-foreground/80">
                  <span className="label-mono">{d.code}</span>
                  <span className="label-mono">N° 0{i + 1}</span>
                </div>

                <div className="absolute right-0 bottom-0 left-0 p-6 text-primary-foreground md:p-8">
                  <div className="label-mono mb-3 text-gold">{d.tag}</div>
                  <h3
                    className={`mb-4 font-display leading-[1] tracking-[-0.02em] font-light ${
                      i === 0 ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"
                    }`}
                  >
                    {d.name}{" "}
                    <span className="ml-2 align-middle text-base tracking-[0.05em] font-bold md:text-lg">
                      PREMIUM<sup className="text-[0.55em]">®</sup>
                    </span>
                  </h3>
                  <p
                    className={`max-w-md font-light text-primary-foreground/80 ${
                      i === 0 ? "body-lg" : "text-sm md:text-base"
                    }`}
                  >
                    {d.copy}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-3 border-b border-primary-foreground/40 pb-1 text-[0.72rem] tracking-[0.22em] uppercase transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
                    Explorar coleccion
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
