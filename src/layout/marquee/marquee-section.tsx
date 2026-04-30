"use client";

import Image from "next/image";
import Badge from "@/components/ui/badge/badge";
import LogoLoop, { type LogoItem } from "@/components/ui/marquee/marquee";
import { usePremiumLandingConfig } from "@/landings/premium/context";
import styles from "./marquee-section.module.css";

export default function MarqueeSection() {
  const {
    sections: { marquee },
  } = usePremiumLandingConfig();

  const logoItems: LogoItem[] = marquee.logos;

  return (
    <section className={styles.section} aria-label={marquee.srHeading}>
      <h2 className="srOnly">{marquee.srHeading}</h2>
      <div className={styles.container}>
        <div className={styles.header}>
          <Badge text={marquee.badgeText} variant="light" align="center" />
        </div>

        <div className={styles.logoIntro}>
          <Image
            src={marquee.introLeftLogo.src}
            alt={marquee.introLeftLogo.alt}
            width={marquee.introLeftLogo.width}
            height={marquee.introLeftLogo.height}
            className={styles.logoIntroImage}
          />
          <span style={{ fontSize: "30px", color: "var(--white)" }}>x</span>
          <Image
            src={marquee.introRightLogo.src}
            alt={marquee.introRightLogo.alt}
            width={marquee.introRightLogo.width}
            height={marquee.introRightLogo.height}
            className={styles.logoIntroImage}
          />
        </div>

        <div className={styles.stage}>
          <LogoLoop
            className={styles.marquee}
            logos={logoItems}
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
