import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const heroImg = "/vision/assets/hero-kyoto.jpg";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100dvh] w-full overflow-hidden bg-primary text-primary-foreground">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Mujer elegante observando el amanecer sobre Kioto desde una terraza privada"
          className="h-full w-full object-cover animate-ken-burns"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-primary/20" />
      </div>

      {/* Top frame label */}
      <div className="absolute top-20 md:top-28 left-0 right-0 z-10">
        <div className="editorial-container flex items-center justify-between text-primary-foreground/80">
          <div className="flex items-center gap-3">
            <span className="gold-line" />
            <span className="label-mono">Edición 2026 · Viajes Curados</span>
          </div>
          <span className="label-mono hidden md:inline">N° 001 — Eleva tu Vida</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 editorial-container min-h-[100dvh] flex flex-col justify-end pb-20 md:pb-28 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <h1 className="display-xl text-primary-foreground">
            El viaje, <em className="font-extralight italic text-gold">curado</em>
            <br />
            como una obra
            <br />
            de arte.
          </h1>

          <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-6 body-lg text-primary-foreground/85 max-w-xl">
              Diseñamos experiencias premium para quienes ya no viajan por turismo, sino por significado. Más de
              19 años elevando vidas a través del viaje.
            </p>

            <div className="md:col-span-6 flex flex-col sm:flex-row gap-3 md:justify-end">
              <a
                href="#contacto"
                className="group inline-flex items-center justify-between gap-6 bg-gold text-primary px-7 py-5 transition-all duration-500 hover:bg-primary-foreground"
              >
                <span className="uppercase tracking-[0.22em] text-[0.72rem] font-semibold">
                  Diseñar mi viaje PREMIUM<sup className="text-[0.55em]">®</sup>
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
              </a>
              <a
                href="#destinos"
                className="group inline-flex items-center justify-between gap-6 border border-primary-foreground/30 text-primary-foreground px-7 py-5 hover:bg-primary-foreground hover:text-primary transition-all duration-500"
              >
                <span className="uppercase tracking-[0.22em] text-[0.72rem] font-semibold">Explorar destinos</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-primary-foreground/15">
        <div className="editorial-container py-5 flex items-center justify-between text-primary-foreground/70">
          <span className="label-mono">Scroll · Una promesa de transformación</span>
          <span className="label-mono">JP · EU · KR · CA · PE · MX</span>
        </div>
      </div>
    </section>
  );
}
