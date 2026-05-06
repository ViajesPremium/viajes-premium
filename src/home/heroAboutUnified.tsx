import Image from "next/image";
import dynamic from "next/dynamic";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import { Button } from "@/components/ui/button/button";
import styles from "./heroAboutUnified.module.css";

const GlobePolaroids = dynamic(
  () =>
    import("@/components/ui/globe/cobe-globe-polaroids").then(
      (module) => module.GlobePolaroids,
    ),
  {
    ssr: false,
    loading: () => <div className={styles.bridgeGlobePlaceholder} aria-hidden="true" />,
  },
);

const destinationBackgrounds = [
  { src: "/images/japon/hero/japanHero.jpg", alt: "Japon" },
  { src: "/vision/assets/dest-europa.jpg", alt: "Europa" },
  { src: "/vision/assets/dest-corea.jpg", alt: "Corea" },
  { src: "/vision/assets/dest-canada.jpg", alt: "Canada" },
  { src: "/vision/assets/dest-peru.jpg", alt: "Peru" },
  { src: "/vision/assets/dest-yucatan.jpg", alt: "Mexico" },
  { src: "/vision/assets/dest-barrancas.jpg", alt: "Barrancas" },
];

const backgroundColumns = [
  [
    destinationBackgrounds[0],
    destinationBackgrounds[3],
    destinationBackgrounds[5],
  ],
  [
    destinationBackgrounds[1],
    destinationBackgrounds[4],
    destinationBackgrounds[6],
  ],
  [
    destinationBackgrounds[2],
    destinationBackgrounds[0],
    destinationBackgrounds[3],
  ],
];

export default function HeroAboutUnified() {
  return (
    <section className={styles.container} aria-label="Hero y About Us">
      <section className={styles.heroPane}>
        <div className={styles.backgroundMedia} aria-hidden="true">
          {backgroundColumns.map((column, columnIndex) => (
            <div
              key={`column-${columnIndex}`}
              className={styles.backgroundColumn}
            >
              <div
                className={`${styles.backgroundTrack} ${
                  columnIndex === 1 ? styles.trackDown : styles.trackUp
                }`}
              >
                {[...column, ...column].map((item, imageIndex) => (
                  <div
                    key={`${item.src}-${columnIndex}-${imageIndex}`}
                    className={styles.backgroundTile}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className={styles.backgroundImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.backgroundOverlay} aria-hidden="true" />

        <div className={styles.titleWrap}>
          <BlurredStagger
            text="Viajes PREMIUM"
            className={styles.titleFirst}
            highlights={[
              { word: "Viajes", className: styles.viajesWord },
              { word: "PREMIUM", useGradient: true },
            ]}
          />
          <p className={styles.subtitle}>
            Eleva tu vida con el maximo confort y lujo que Viajes PREMIUM tiene
            para ti en cualquiera de nuestros destinos altamente especializados.
          </p>
          <div className={styles.buttonRow}>
            <Button type="button" variant="secondary">
              Hablar con un asesor
            </Button>
            <Button type="button" className={styles.heroCta}>
              Explorar destinos
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.aboutPane} aria-labelledby="about-us-title">
        <div className={styles.aboutContent}>
          <h2 id="about-us-title" className={styles.aboutTitle}>
            Diseñamos viajes premium con detalle humano
          </h2>
        </div>
      </section>

      <div className={styles.bridgeGlobe} aria-label="Globo entre secciones">
        <GlobePolaroids
          className={styles.bridgeGlobeCanvas}
          rotationSpeed={0.5}
          mapSamples={32000}
          mapBrightness={0}
          diffuse={0.05}
          dark={0}
          opacity={0.8}
          markerColor={[0.75, 0.75, 0.75]}
          glowColor={[0.88, 0.88, 0.88]}
          markerSize={0.016}
        />
      </div>
    </section>
  );
}
