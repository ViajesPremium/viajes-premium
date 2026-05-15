"use client";

import Image from "next/image";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import { Button } from "@/components/ui/button/button";
import styles from "./homeAbout.module.css";

const ABOUT_LAYOUT_IMAGES = [
  {
    src: "/images/viajes-premium/destinos/canada/canada-premium-2.avif",
    alt: "Escena editorial Canada Premium",
  },
  {
    src: "/images/viajes-premium/destinos/europa/europa-premium-2.avif",
    alt: "Escena editorial Europa Premium",
  },
  {
    src: "/images/viajes-premium/destinos/corea/corea-premium-2.avif",
    alt: "Escena editorial Corea Premium",
  },
] as const;

export default function HomeAbout() {
  const scrollToDestinations = () => {
    document.getElementById("destinations")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      data-home-about-panel
      className={styles.aboutPane}
      aria-labelledby="about-us-title"
    >
      <div data-home-about-fade="content" className={styles.aboutContent}>
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

        <Button
          type="button"
          className={styles.aboutCta}
          onClick={scrollToDestinations}
        >
          Explorar destinos
        </Button>
      </div>

      <figure
        data-home-about-preview
        className={styles.aboutBottomPreview}
        aria-hidden="true"
      >
        <div className={styles.aboutBottomPreviewMedia}>
          <Image
            src="/images/viajes-premium/destinos/europa/europa-premium-4.avif"
            alt=""
            fill
            sizes="100vw"
            priority
            className={styles.aboutBottomPreviewImage}
            quality={82}
          />
        </div>
      </figure>
    </section>
  );
}
