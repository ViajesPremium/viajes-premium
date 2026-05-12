"use client";

import Image from "next/image";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import styles from "./homeAbout.module.css";

const ABOUT_GRID_IMAGES = [
  {
    src: "/images/viajes-premium/destinos/japon/japon-premium-1.webp",
    alt: "Japon",
  },
  {
    src: "/images/viajes-premium/destinos/europa/europa-premium-1.webp",
    alt: "Europa",
  },
  {
    src: "/images/viajes-premium/destinos/corea/corea-premium-1.webp",
    alt: "Corea",
  },
  {
    src: "/images/viajes-premium/destinos/canada/canada-premium-1.webp",
    alt: "Canada",
  },
  {
    src: "/images/viajes-premium/destinos/peru/peru-premium-1.webp",
    alt: "Peru",
  },
  {
    src: "/images/viajes-premium/destinos/yucatan/yucatan-premium-1.webp",
    alt: "Mexico",
  },
  {
    src: "/images/viajes-premium/destinos/barrancas/barrancas-premium-1.webp",
    alt: "Barrancas",
  },
  {
    src: "/images/viajes-premium/destinos/chiapas/chiapas-premium-1.webp",
    alt: "Chiapas",
  },
];

export default function HomeAbout() {
  return (
    <section className={styles.aboutPane} aria-labelledby="about-us-title">
      <div className={styles.aboutBackdropGrid} aria-hidden="true">
        {ABOUT_GRID_IMAGES.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className={`${styles.gridTile} ${
              index % 2 === 0 ? styles.gridTileTall : styles.gridTileShort
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 900px) 25vw, 12vw"
              className={styles.gridTileImage}
            />
            <div className={styles.gridTileShade} />
          </div>
        ))}
      </div>

      <div className={styles.aboutContent}>
        <div id="about-us-title" className={styles.aboutTitleWrap}>
          <BlurredStagger
            text="Más de 21 años"
            className={styles.aboutTitleFirst}
            highlights={[
              { word: "años", useGradient: true },
              { word: "21", useGradient: true },
            ]}
          />
          <BlurredStagger
            text="diseñando experiencias"
            className={styles.aboutTitleSecond}
          />
          <BlurredStagger
            text="clase PREMIUM."
            className={styles.aboutTitleThird}
            highlights={[{ word: "PREMIUM", useGradient: true }]}
          />
        </div>
        <p className={styles.aboutDescription}>
          Eleva tu vida viajando por nuestros destinos alrededor del mundo
          cuidadosamente seleccionados para ti.
        </p>
      </div>
    </section>
  );
}
