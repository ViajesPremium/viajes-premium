"use client";

import Image from "next/image";
import Badge from "@/components/ui/badge/badge";
import LogoLoop, { type LogoItem } from "@/components/ui/marquee/marquee";
import styles from "./homeMarquee.module.css";

const HOME_MARQUEE = {
  srHeading: "Alianzas de Japon Premium",
  badgeText: "Nuestras alianzas",
  introLeftLogo: {
    src: "/logos/japon/jp-blanco.svg",
    alt: "Japon Premium",
    width: 460,
    height: 96,
  },
  introRightLogo: {
    src: "/logos/japon/japanEndlessDiscovery.svg",
    alt: "Japan Endless Discovery",
    width: 460,
    height: 96,
  },
  logos: [
    {
      src: "/images/japon/marquee-logos/22.png",
      alt: "Japon Premium",
      width: 420,
      height: 90,
    },
    {
      src: "/images/japon/marquee-logos/23.png",
      alt: "JP Logo",
      width: 280,
      height: 90,
    },
    {
      src: "/images/japon/marquee-logos/24.png",
      alt: "Japon Grande",
      width: 540,
      height: 120,
    },
    {
      src: "/images/japon/marquee-logos/25.png",
      alt: "Logo Japon",
      width: 380,
      height: 110,
    },
  ] as LogoItem[],
};

export default function HomeMarquee() {
  return (
    <section className={styles.section} aria-label={HOME_MARQUEE.srHeading}>
      <h2 className="srOnly">{HOME_MARQUEE.srHeading}</h2>
      <div className={styles.container}>
        <div className={styles.header}>
          <Badge text={HOME_MARQUEE.badgeText} variant="light" align="center" />
        </div>

        <div className={styles.logoIntro}>
          <Image
            src={HOME_MARQUEE.introLeftLogo.src}
            alt={HOME_MARQUEE.introLeftLogo.alt}
            width={HOME_MARQUEE.introLeftLogo.width}
            height={HOME_MARQUEE.introLeftLogo.height}
            className={styles.logoIntroImage}
          />
          <span style={{ fontSize: "30px", color: "var(--white)" }}>x</span>
          <Image
            src={HOME_MARQUEE.introRightLogo.src}
            alt={HOME_MARQUEE.introRightLogo.alt}
            width={HOME_MARQUEE.introRightLogo.width}
            height={HOME_MARQUEE.introRightLogo.height}
            className={styles.logoIntroImage}
          />
        </div>

        <div className={styles.stage}>
          <LogoLoop
            className={styles.marquee}
            logos={HOME_MARQUEE.logos}
            speed={58}
            direction="left"
            logoHeight={45}
            gap={90}
            fadeOutColor="var(--black)"
            fadeOut
            pauseOnHover
          />
        </div>
      </div>
    </section>
  );
}

