"use client";

import Image from "next/image";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import styles from "./homeAbout.module.css";

const ABOUT_GRID_IMAGES = [
  { src: "/images/japon/hero/japanHero.jpg", alt: "Japon" },
  { src: "/vision/assets/dest-europa.jpg", alt: "Europa" },
  { src: "/vision/assets/dest-corea.jpg", alt: "Corea" },
  { src: "/vision/assets/dest-canada.jpg", alt: "Canada" },
  { src: "/vision/assets/dest-peru.jpg", alt: "Peru" },
  { src: "/vision/assets/dest-yucatan.jpg", alt: "Mexico" },
  { src: "/vision/assets/dest-barrancas.jpg", alt: "Barrancas" },
  { src: "/vision/assets/dest-chiapas.jpg", alt: "Chiapas" },
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
