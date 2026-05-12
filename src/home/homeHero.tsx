"use client";

import Image from "next/image";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import { Button } from "@/components/ui/button/button";
import LogoLoop, { type LogoItem } from "@/components/ui/marquee/marquee";
import styles from "./homeHero.module.css";

/* ── Imágenes editoriales ─────────────────────────────────────────── */
const editorialGridImages = [
  {
    src: "/images/japon/hero/japanHero.jpg",
    sizes: "(max-width: 768px) 50vw, 22vw",
    priority: true,
  },
  {
    src: "/vision/assets/dest-europa.jpg",
    sizes: "(max-width: 768px) 50vw, 22vw",
    priority: false,
  },
  {
    src: "/vision/assets/dest-canada.jpg",
    sizes: "(max-width: 768px) 0vw, 22vw",
    priority: false,
  },
];

/* ── Marquee de logos ─────────────────────────────────────────────── */
const heroLogoSources = [
  { src: "/logos/japon/japon-grande-logo.png", alt: "Japón" },
  { src: "/logos/europa/europa-grande-logo.png", alt: "Europa" },
  { src: "/logos/canada/canada-grande-logo.png", alt: "Canadá" },
  { src: "/logos/corea/corea-grande-logo.png", alt: "Corea" },
  { src: "/logos/barrancas/barrancas-grande-logo.png", alt: "Barrancas" },
  { src: "/logos/peru/peru-grande-logo.png", alt: "Perú" },
];

const heroMarqueeLogos: LogoItem[] = Array.from({ length: 12 }, (_, i) => {
  const logo = heroLogoSources[i % heroLogoSources.length];
  return { src: logo.src, alt: `${logo.alt} ${i + 1}`, width: 200, height: 90 };
});

/* ── Componente ───────────────────────────────────────────────────── */
export default function HomeHero() {
  return (
    <section className={styles.heroPane}>
      {/* ── Fila superior: copy | imágenes ──────────────────────── */}
      <div className={styles.heroContent}>
        {/* Columna izquierda — copy editorial */}
        <div className={styles.leftCol}>
          <div className={styles.titleWrap}>
            <BlurredStagger
              text="Viajes diseñados"
              className={styles.titleLine}
            />
            <BlurredStagger
              text="con intención,"
              className={`${styles.titleLine} ${styles.titleItalic}`}
              highlights={[{ word: "intención", useGradient: true }]}
            />
            <BlurredStagger
              text="no improvisados."
              className={styles.titleLine}
            />
          </div>

          <div className={styles.buttonRow}>
            <Button type="button" variant="outline">
              Hablar con un asesor
            </Button>
            <Button type="button" className={styles.heroCta}>
              Explorar destinos
            </Button>
          </div>
        </div>

        {/* Columna derecha — grid editorial */}
        <div className={styles.rightCol} aria-hidden="true">
          {/* Imagen principal — ocupa todo el alto */}
          <figure className={`${styles.imgFrame} ${styles.imgFrameMain}`}>
            <Image
              src={editorialGridImages[0].src}
              alt=""
              fill
              sizes={editorialGridImages[0].sizes}
              quality={75}
              className={styles.editorialImage}
              priority
            />
          </figure>

          {/* Imagen superior derecha */}
          <figure className={`${styles.imgFrame} ${styles.imgFrameTop}`}>
            <Image
              src={editorialGridImages[1].src}
              alt=""
              fill
              sizes={editorialGridImages[1].sizes}
              quality={70}
              className={styles.editorialImage}
              loading="lazy"
            />
          </figure>

          {/* Imagen inferior derecha */}
          <figure className={`${styles.imgFrame} ${styles.imgFrameBottom}`}>
            <Image
              src={editorialGridImages[2].src}
              alt=""
              fill
              sizes={editorialGridImages[2].sizes}
              quality={70}
              className={styles.editorialImage}
              loading="lazy"
            />
          </figure>
        </div>
      </div>

      {/* ── Franja inferior: marquee full-width ─────────────────── */}
      <div className={styles.marqueeStrip} aria-hidden="true">
        <LogoLoop
          className={styles.logoLoop}
          logos={heroMarqueeLogos}
          speed={54}
          direction="left"
          logoHeight={42}
          gap={34}
          fadeOut
          fadeOutColor="var(--black)"
          pauseOnHover
          ariaLabel="Logos de destinos premium"
        />
      </div>
    </section>
  );
}
