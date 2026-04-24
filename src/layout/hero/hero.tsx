"use client";

import { type CSSProperties, useCallback, useEffect, useState } from "react";
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

const pressureFont = "/fonts/nohemi-font-family/Nohemi-VF-BF6438cc58ad63d.ttf";

type PressureWordProps = {
  text: string;
  pressureEnabled: boolean;
  fontWeight: number;
  italic?: boolean;
  weightFrom: number;
  weightTo: number;
  scaleFrom: number;
  scaleTo: number;
};

function PressureWord({
  text,
  pressureEnabled,
  fontWeight,
  italic = false,
  weightFrom,
  weightTo,
  scaleFrom,
  scaleTo,
}: PressureWordProps) {
  if (!pressureEnabled) {
    return (
      <span
        className={styles.desktopWordFallback}
        style={{ fontStyle: italic ? "italic" : "normal", fontWeight }}
      >
        {text}
      </span>
    );
  }

  return (
    <TextPressure
      text={text}
      fontFamily="Nohemi"
      fontUrl={pressureFont}
      fontWeight={fontWeight}
      fontStyle="normal"
      fontSize={190}
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
  const {
    sections: { hero },
  } = usePremiumLandingConfig();

  const mobileTitle = hero.mobileTitle ?? {
    line1Lead: hero.title.line1Lead,
    line1Focus: hero.title.line1Focus,
    line2Lead: hero.title.line2Lead,
    line2Focus: hero.title.line2Focus,
  };

  const [enablePressureTitle, setEnablePressureTitle] = useState(false);

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

  useEffect(() => {
    let cancelled = false;

    const isDesktop = window.matchMedia("(min-width: 769px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!isDesktop || prefersReducedMotion) {
      return;
    }

    const enable = async () => {
      if ("fonts" in document) {
        try {
          await document.fonts.load("400 1em Nohemi");
          await document.fonts.ready;
        } catch {
          // Keep non-blocking behavior if the Font Loading API fails.
        }
      }
      if (cancelled) return;
      setEnablePressureTitle(true);
    };

    const requestIdle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback.bind(window)
        : null;
    const cancelIdle =
      typeof window.cancelIdleCallback === "function"
        ? window.cancelIdleCallback.bind(window)
        : null;

    if (requestIdle && cancelIdle) {
      const idleId = requestIdle(
        () => {
          void enable();
        },
        { timeout: 1200 },
      );
      return () => {
        cancelled = true;
        cancelIdle(idleId);
      };
    }

    const timeoutId = setTimeout(() => {
      void enable();
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  const heroStyle = {
    "--hero-bg-image": `url("${hero.backgroundImage}")`,
  } as CSSProperties;

  return (
    <div className={styles.hero} style={heroStyle}>
      <div className={styles.titleContainer}>
        <h1 className={styles.srOnly}>{hero.seoHeading}</h1>

        <div className={styles.h1} aria-hidden="true">
          <span className={`${styles.line} ${styles.desktopLine}`}>
            <span className={styles.wordSlot}>
              <PressureWord
                pressureEnabled={enablePressureTitle}
                text={hero.title.line1Lead}
                fontWeight={100}
                italic
                weightFrom={100}
                weightTo={400}
                scaleFrom={1}
                scaleTo={1}
              />
            </span>
            <span className={styles.wordSlot}>
              <PressureWord
                pressureEnabled={enablePressureTitle}
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
                pressureEnabled={enablePressureTitle}
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
                pressureEnabled={enablePressureTitle}
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
            <p key={`${line.highlight}-${index}`}>
              <span className={styles.highlightedText}>{line.highlight}</span>{" "}
              {line.text}
            </p>
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

      <div className={styles.circle} aria-hidden="true" />

      <HeroOverlayLazy overlayImages={hero.heroOverlay} />
    </div>
  );
}
