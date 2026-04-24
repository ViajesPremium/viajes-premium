import { AtSign, Globe, MessageCircle } from "lucide-react";
import { BrandMark } from "../brand/BrandMark";

const cols = [
  {
    title: "Colecciones",
    links: ["Japón PREMIUM®", "Europa PREMIUM®", "Corea PREMIUM®", "Canadá PREMIUM®", "Perú PREMIUM®", "Chiapas PREMIUM®", "Yucatán PREMIUM®", "Barrancas PREMIUM®"],
  },
  { title: "La Marca", links: ["El Método", "Por qué PREMIUM®", "El Diario", "Casos de viajeros", "Trabaja con nosotros"] },
  { title: "Asistencia", links: ["Diseñar mi viaje", "Hablar con un asesor", "WhatsApp directo", "Pagos y financiamiento", "Términos & privacidad"] },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10">
      <div className="editorial-container pt-20 pb-10">
        {/* Top — manifesto */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-6">
            <BrandMark size="lg" variant="stacked" withTagline />
            <p className="body-lg text-primary-foreground/70 mt-10 max-w-md">
              Más de 19 años diseñando experiencias premium para quienes han entendido que un viaje bien curado
              cambia más cosas que unas vacaciones.
            </p>
          </div>
          <div className="lg:col-span-6 lg:text-right">
            <span className="label-mono text-primary-foreground/60">Una invitación</span>
            <p className="display-md mt-5 font-extralight">
              <em className="italic">Eleva tu Vida.</em>
            </p>
            <a
              href="#contacto"
              className="inline-block mt-8 border-b border-gold pb-1 text-sm uppercase tracking-[0.22em] text-gold hover:text-primary-foreground hover:border-primary-foreground transition-colors"
            >
              Comenzar la conversación
            </a>
          </div>
        </div>

        <div className="hairline bg-primary-foreground/15 mb-16" />

        {/* Columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="label-mono mb-6 text-primary-foreground/70">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[0.95rem] font-light text-primary-foreground/85 hover:text-gold transition-colors duration-300">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="label-mono mb-6 text-primary-foreground/70">Contacto</h4>
            <ul className="space-y-3 text-[0.95rem] font-light text-primary-foreground/85">
              <li>Ciudad de México, MX</li>
              <li>hola@viajespremium.com</li>
              <li>+52 55 5555 5555</li>
            </ul>
            <div className="flex items-center gap-4 mt-8">
              {[Globe, AtSign, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social" className="h-9 w-9 inline-flex items-center justify-center border border-primary-foreground/20 hover:border-gold hover:text-gold transition-colors duration-500">
                  <Icon className="h-4 w-4" strokeWidth={1.25} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hairline bg-primary-foreground/15 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-primary-foreground/55">
          <span className="label-mono">© 2026 Viajes PREMIUM® · Todos los derechos reservados</span>
          <span className="label-mono">Edición 2026 · Curado en México · Eleva tu Vida</span>
        </div>
      </div>
    </footer>
  );
}
