"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import styles from "./hero.module.css";
import HeroOverlayLazy from "@/components/HeroOverlayLazy";
import { Button } from "@/components/ui/button/button";
import { scrollToSection } from "@/lib/scroll-to-section";
import { usePremiumLandingConfig } from "@/landings/premium/context";

const TextPressure = dynamic(
  () => import("@/components/ui/text-pressure/textPressure"),
  { ssr: false },
);

const pressureFont = "/fonts/nohemi-font-family/Nohemi-VF.woff2";

type PressureWordProps = {
  text: string;
  fontWeight: number;
  italic?: boolean;
  weightFrom: number;
  weightTo: number;
  scaleFrom: number;
  scaleTo: number;
};

function PressureWord({
  text,
  fontWeight,
  italic = false,
  weightFrom,
  weightTo,
  scaleFrom,
  scaleTo,
}: PressureWordProps) {
  return (
    <TextPressure
      text={text}
      fontFamily="Nohemi"
      fontUrl={pressureFont}
      fontWeight={fontWeight}
      fontStyle="normal"
      fontSize="inherit"
      flex={false}
      alpha={false}
      stroke={false}
      width
      weight
      italic={italic}
      weightFrom={weightFrom}
      weightTo={weightTo}
      scaleFrom={scaleFrom}
      scaleTo={scaleTo}
      textColor="#000000"
      strokeColor="#DB2F21"
      minFontSize={50}
    />
  );
}

export default function Hero() {
  const config = usePremiumLandingConfig();
  const {
    sections: { hero },
  } = config;
  const showCircle = config.id === "japon-premium";

  const mobileTitle = hero.mobileTitle ?? {
    line1Lead: hero.title.line1Lead,
    line1Focus: hero.title.line1Focus,
    line2Lead: hero.title.line2Lead,
    line2Focus: hero.title.line2Focus,
  };

  const goToTarget = useCallback((target: string) => {
    if (target.startsWith("#")) {
      scrollToSection(target, { duration: 1.15 });
      return;
    }
    window.location.href = target;
  }, []);

  const handleGoToPrimary = useCallback(() => {
    goToTarget(hero.ctaPrimary.target);
  }, [goToTarget, hero.ctaPrimary.target]);

  const handleGoToSecondary = useCallback(() => {
    goToTarget(hero.ctaSecondary.target);
  }, [goToTarget, hero.ctaSecondary.target]);

  return (
    <div className={styles.hero}>
      <div className={styles.titleContainer}>
        <h1 className={styles.srOnly}>{hero.seoHeading}</h1>

        <div className={styles.h1} aria-hidden="true">
          <span className={`${styles.line} ${styles.desktopLine}`}>
            <span className={styles.wordSlot}>
              <PressureWord
                text={hero.title.line1Lead}
                fontWeight={100}
                italic={false}
                weightFrom={100}
                weightTo={400}
                scaleFrom={1}
                scaleTo={1}
              />
            </span>
            <span className={styles.wordSlot}>
              <PressureWord
                text={hero.title.line1Focus}
                fontWeight={100}
                italic={false}
                weightFrom={100}
                weightTo={400}
                scaleFrom={1}
                scaleTo={1}
              />
            </span>
          </span>

          <span className={`${styles.line} ${styles.desktopLine}`}>
            <span className={styles.wordSlot}>
              <PressureWord
                text={hero.title.line2Lead}
                fontWeight={900}
                italic={false}
                weightFrom={500}
                weightTo={100}
                scaleFrom={1.09}
                scaleTo={1}
              />
            </span>
            <span className={styles.wordSlot}>
              <PressureWord
                text={hero.title.line2Focus}
                fontWeight={900}
                italic={false}
                weightFrom={500}
                weightTo={100}
                scaleFrom={1.09}
                scaleTo={1}
              />
            </span>
          </span>

          <span className={styles.mobileLine}>
            <span className={styles.mobileSmall}>{mobileTitle.line1Lead}</span>
            <span className={styles.mobileBig}>{mobileTitle.line1Focus}</span>
          </span>
          <span className={styles.mobileLine}>
            <span className={styles.mobileSmall}>{mobileTitle.line2Lead}</span>
            <span className={styles.mobileBig}>{mobileTitle.line2Focus}</span>
          </span>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.description}>
          {hero.descriptionLines.map((line, index) => (
            <p key={index}>{line.text}</p>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <Button type="button" variant="primary" onClick={handleGoToPrimary}>
            {hero.ctaPrimary.label}
          </Button>
          <div className={styles.cta2}>
            <Button
              type="button"
              variant="secondary"
              onClick={handleGoToSecondary}
            >
              {hero.ctaSecondary.label}
            </Button>
          </div>
        </div>
      </div>

      {showCircle ? <div className={styles.circle} aria-hidden="true" /> : null}

      <HeroOverlayLazy overlayImages={hero.heroOverlay} />
    </div>
  );
}
