import { useState } from "react";
import { z } from "zod";
import { ArrowRight, Check, MessageCircle } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Tu nombre completo, por favor").max(80),
  email: z.string().trim().email("Correo no valido").max(120),
  phone: z.string().trim().min(7, "Telefono incompleto").max(30),
  destination: z.string().trim().min(1).max(60),
  travelers: z.string().trim().min(1).max(10),
  dates: z.string().trim().max(60),
  style: z.string().trim().max(60),
  notes: z.string().trim().max(800).optional(),
});

const destinations = [
  "Japon",
  "Europa",
  "Corea",
  "Canada",
  "Peru",
  "Barrancas",
  "Chiapas",
  "Yucatan",
  "Otro",
];

const styles = [
  "Cultural & Editorial",
  "Familiar",
  "Pareja / Romantico",
  "Aventura curada",
  "Sin definir aun",
];

export function CTAForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      setErrorMessage(
        parsed.error.issues[0]?.message ?? "Algunos datos requieren atencion.",
      );
      return;
    }

    setErrorMessage(null);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitting(false);
    setDone(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contacto" className="bg-primary text-primary-foreground">
      <div className="editorial-container py-24 md:py-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="mb-8 flex items-center gap-3">
              <span className="gold-line" />
              <span className="label-mono text-primary-foreground/70">
                La conversacion · 012
              </span>
            </div>
            <h2 className="display-lg mb-8">
              Empieza a disenar
              <br />
              tu proximo
              <br />
              <em className="font-extralight italic text-gold">capitulo.</em>
            </h2>
            <p className="body-lg mb-12 max-w-md text-primary-foreground/75">
              Sin presion. Una llamada breve para entender que te mueve. Despues
              decides si quieres una propuesta.
            </p>

            <ul className="mb-12 space-y-5">
              {[
                "Asesor dedicado · respuesta en menos de 24 hrs.",
                "Propuesta personalizada y sin compromiso",
                "Pagos flexibles y mensualidades disponibles",
                "100% confidencial",
              ].map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-primary-foreground/85"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                  <span className="text-sm font-light md:text-base">{t}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/525555555555"
              className="group inline-flex items-center gap-3 border-b border-primary-foreground/40 pb-2 text-sm tracking-[0.22em] uppercase transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              Prefiero hablar por WhatsApp
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="bg-background p-8 text-foreground shadow-editorial md:p-12 lg:p-14"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="label-mono">Solicitud privada</span>
                <span className="label-mono text-ink-soft">Form · 001</span>
              </div>

              {done ? (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gold/20">
                    <Check className="h-6 w-6 text-gold-deep" strokeWidth={2} />
                  </div>
                  <h3 className="display-md mb-4">Recibido.</h3>
                  <p className="body-lg mx-auto max-w-md text-ink-soft">
                    Un asesor PREMIUM<sup className="text-[0.55em]">®</sup>{" "}
                    revisara tu solicitud y se pondra en contacto contigo en las
                    proximas horas.
                  </p>
                </div>
              ) : (
                <div className="grid gap-x-6 gap-y-7 md:grid-cols-2">
                  <Field label="Nombre" name="name" placeholder="Tu nombre completo" />
                  <Field label="Correo" name="email" type="email" placeholder="tu@correo.com" />
                  <Field label="Telefono / WhatsApp" name="phone" placeholder="+52 ..." />
                  <Field label="Viajeros" name="travelers" placeholder="2 adultos · 1 menor" />

                  <Select label="Destino de interes" name="destination" options={destinations} />
                  <Field label="Fechas estimadas" name="dates" placeholder="Octubre 2026" />

                  <div className="md:col-span-2">
                    <Select label="Estilo de viaje" name="style" options={styles} />
                  </div>

                  <div className="md:col-span-2">
                    <label className="label-mono mb-3 block">
                      Algo mas que quieras compartir
                    </label>
                    <textarea
                      name="notes"
                      rows={4}
                      maxLength={800}
                      className="w-full resize-none border-b border-hairline bg-transparent py-3 font-light placeholder:text-ink-soft/50 focus:border-foreground focus:outline-none"
                      placeholder="Aniversario, restricciones, ocasion, intereses..."
                    />
                  </div>

                  {errorMessage && (
                    <p className="md:col-span-2 text-sm text-destructive">
                      {errorMessage}
                    </p>
                  )}

                  <div className="mt-4 md:col-span-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex w-full items-center justify-between gap-12 bg-foreground px-8 py-5 text-background transition-all duration-500 hover:bg-gold hover:text-primary disabled:opacity-60 md:w-auto"
                    >
                      <span className="text-[0.72rem] tracking-[0.22em] font-semibold uppercase">
                        {submitting ? "Enviando..." : "Enviar solicitud"}
                      </span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                        strokeWidth={1.5}
                      />
                    </button>
                    <p className="mt-5 max-w-md text-xs font-light text-ink-soft">
                      Al enviar, aceptas que tu asesor PREMIUM<sup>®</sup> te
                      contacte. Tus datos se tratan con confidencialidad
                      absoluta.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="label-mono mb-3 block">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border-b border-hairline bg-transparent py-3 font-light placeholder:text-ink-soft/50 transition-colors focus:border-foreground focus:outline-none"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="label-mono mb-3 block">{label}</label>
      <select
        name={name}
        className="w-full border-b border-hairline bg-transparent py-3 font-light text-foreground focus:border-foreground focus:outline-none"
        defaultValue=""
      >
        <option value="" disabled>
          Seleccionar...
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
