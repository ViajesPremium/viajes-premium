import styles from "./hero.module.css";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import Image from "next/image";
import { Button } from "@/components/ui/button/button";

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

export default function Hero() {
  return (
    <div className={styles.container}>
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
    </div>
  );
}
