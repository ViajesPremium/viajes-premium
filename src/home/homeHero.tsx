"use client";

import Image from "next/image";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import { Button } from "@/components/ui/button/button";
import LogoLoop, { type LogoItem } from "@/components/ui/marquee/marquee";
import styles from "./homeHero.module.css";

const destinationBackgrounds = [
  { src: "/images/japon/hero/japanHero.jpg", alt: "Japon" },
  { src: "/vision/assets/dest-europa.jpg", alt: "Europa" },
  { src: "/vision/assets/dest-corea.jpg", alt: "Corea" },
  { src: "/vision/assets/dest-canada.jpg", alt: "Canada" },
  { src: "/vision/assets/dest-peru.jpg", alt: "Peru" },
  { src: "/vision/assets/dest-yucatan.jpg", alt: "Mexico" },
  { src: "/vision/assets/dest-barrancas.jpg", alt: "Barrancas" },
];

const heroBackgroundFrames = [
  {
    image: destinationBackgrounds[0],
    className: "editorialFrame1",
    sizes: "(max-width: 900px) 40vw, 18vw",
  },
  {
    image: destinationBackgrounds[1],
    className: "editorialFrame2",
    sizes: "(max-width: 900px) 44vw, 22vw",
  },
  {
    image: destinationBackgrounds[3],
    className: "editorialFrame3",
    sizes: "(max-width: 900px) 50vw, 28vw",
  },
  {
    image: destinationBackgrounds[5],
    className: "editorialFrame4",
    sizes: "(max-width: 900px) 34vw, 17vw",
  },
  {
    image: destinationBackgrounds[6],
    className: "editorialFrame5",
    sizes: "(max-width: 900px) 36vw, 16vw",
  },
];

const heroLogoSources = [
  { src: "/logos/japon/japon-grande-logo.png", alt: "Japon Grande Logo" },
  { src: "/logos/europa/europa-grande-logo.png", alt: "Europa Grande Logo" },
  { src: "/logos/canada/canada-grande-logo.png", alt: "Canada Grande Logo" },
  { src: "/logos/corea/corea-grande-logo.png", alt: "Corea Grande Logo" },
  {
    src: "/logos/barrancas/barrancas-grande-logo.png",
    alt: "Barrancas Grande Logo",
  },
  { src: "/logos/peru/peru-grande-logo.png", alt: "Peru Grande Logo" },
];

const heroMarqueeLogos: LogoItem[] = Array.from({ length: 12 }, (_, index) => {
  const logo = heroLogoSources[index % heroLogoSources.length];
  return {
    src: logo.src,
    alt: `${logo.alt} ${index + 1}`,
    width: 200,
    height: 90,
  };
});

export default function HomeHero() {
  return (
    <section className={styles.heroPane}>
      <div className={styles.editorialImages} aria-hidden="true">
        {heroBackgroundFrames.map((frame, index) => (
          <figure
            key={`${frame.image.src}-${index}`}
            className={`${styles.editorialFrame} ${styles[frame.className]}`}
          >
            <Image
              src={frame.image.src}
              alt=""
              fill
              sizes={frame.sizes}
              quality={70}
              className={styles.editorialImage}
              loading={index < 2 ? "eager" : "lazy"}
              priority={index < 2}
            />
          </figure>
        ))}
      </div>
      <div className={styles.backgroundOverlay} aria-hidden="true" />

      <div className={styles.titleWrap}>
        <BlurredStagger text="Viajes diseñados" className={styles.titleFirst} />
        <BlurredStagger
          text="con intención,"
          className={styles.titleSecond}
          highlights={[{ word: "intención", useGradient: true }]}
        />
        <BlurredStagger text="no improvisados." className={styles.titleThird} />

        <div className={styles.buttonRow}>
          <Button type="button" variant="outline">
            Hablar con un asesor
          </Button>
          <Button type="button" className={styles.heroCta}>
            Explorar destinos
          </Button>
        </div>

        <div className={styles.logoMarquee} aria-hidden="true">
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
            ariaLabel="Logos de Japon Premium"
          />
        </div>
      </div>
    </section>
  );
}
