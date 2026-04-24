const lifestyle = "/vision/assets/lifestyle-couple.jpg";

export function Promise() {
  return (
    <section className="bg-background py-24 md:py-40">
      <div className="editorial-container">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="mb-10 flex items-center gap-3">
              <span className="gold-line" />
              <span className="label-mono">Manifiesto · 002</span>
            </div>
            <h2 className="display-lg">
              No vendemos viajes.
              <br />
              <em className="font-extralight italic text-gold">
                Devolvemos tiempo,
              </em>
              <br />
              belleza y asombro.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pl-12">
            <div className="relative mb-10 aspect-[4/3] overflow-hidden">
              <img
                src={lifestyle}
                alt="Pareja elegante disfrutando una cata privada"
                loading="lazy"
                className="h-full w-full object-cover"
                width={1600}
                height={1200}
              />
            </div>
            <div className="max-w-xl space-y-6">
              <p className="body-lg text-foreground">
                Viajes{" "}
                <span className="brand-premium tracking-[0.04em] font-bold">
                  PREMIUM
                </span>{" "}
                nacio para una idea obstinada: que un viaje verdaderamente bien
                hecho puede cambiar la forma en que recuerdas un ano entero de
                tu vida.
              </p>
              <p className="text-base leading-[1.7] font-light text-ink-soft md:text-lg">
                Nuestro trabajo es invisible y obsesivo. Cada hotel se prueba.
                Cada itinerario se afina. Cada traslado, cada reserva, cada
                detalle pequeno esta pensado para que tu solo te ocupes de
                mirar, de sentir, de volver distinto. Eso es{" "}
                <span className="tagline text-foreground">Eleva tu Vida</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
