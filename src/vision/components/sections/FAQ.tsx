import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/vision/components/ui/accordion";

const faqs = [
  {
    q: "¿Qué incluye exactamente un viaje PREMIUM®?",
    a: "Hospedaje 4 y 5 estrellas, itinerario curado, traslados privados, guías expertos, experiencias culturales seleccionadas, asistencia de viaje y acompañamiento 24/7 antes, durante y después del viaje. Vuelos internacionales pueden incluirse o no, dependiendo de la modalidad elegida.",
  },
  {
    q: "¿Cómo es el proceso de planificación?",
    a: "Comienza con una conversación sin compromiso. A partir de ahí recibes una propuesta a tu medida, la refinamos juntos hasta que cada detalle te haga sentido, y reservamos. Tu asesor dedicado está contigo en cada paso.",
  },
  {
    q: "¿Ofrecen pagos a meses?",
    a: "Sí. Trabajamos esquemas de pago flexibles, mensualidades sin intereses con tarjetas participantes y planes personalizados según el viaje y la fecha de salida.",
  },
  {
    q: "¿Qué pasa si necesito ayuda durante el viaje?",
    a: "Tienes acceso 24/7 a tu asesor y a nuestros partners locales. Cualquier imprevisto se resuelve en minutos, sin importar el huso horario.",
  },
  {
    q: "¿Cuándo es ideal reservar?",
    a: "Para temporadas altas (Sakura en Japón, verano europeo, fin de año) recomendamos reservar con 4 a 8 meses de anticipación. Para viajes fuera de temporada, 2 a 3 meses son suficientes.",
  },
  {
    q: "¿Qué hace diferente un hotel certificado por PREMIUM®?",
    a: "Cada hotel pasa por un filtro propio: ubicación, servicio, estética, experiencia del huésped y consistencia. Si no cumple con nuestros estándares, no entra al portafolio, sin importar cuán famoso sea.",
  },
];

export function FAQ() {
  return (
    <section className="bg-background py-24 md:py-40">
      <div className="editorial-container">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <span className="gold-line" />
              <span className="label-mono">Preguntas · 010</span>
            </div>
            <h2 className="display-lg sticky top-32">
              Lo que importa,
              <br />
              <em className="font-extralight italic text-gold">explicado.</em>
            </h2>
          </div>

          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="border-t border-hairline">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-hairline">
                  <AccordionTrigger className="py-7 text-left hover:no-underline group">
                    <div className="flex items-baseline gap-5 pr-4">
                      <span className="num-marker text-sm">0{i + 1}</span>
                      <span className="font-display font-light text-xl md:text-2xl leading-[1.25] tracking-[-0.015em] group-hover:text-gold transition-colors duration-300">
                        {f.q}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 pl-12 pr-4">
                    <p className="text-ink-soft text-base md:text-lg leading-[1.75] font-light max-w-2xl">{f.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
