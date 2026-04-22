"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./hero.module.css";
import HeroOverlayLazy from "@/components/HeroOverlayLazy";
import { Button } from "@/components/ui/button/button";

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
  const [enablePressureTitle, setEnablePressureTitle] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const isDesktop = window.matchMedia("(min-width: 769px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!isDesktop || prefersReducedMotion) {
      return;
    }

    const enable = () => {
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
      const idleId = requestIdle(enable, { timeout: 1200 });
      return () => {
        cancelled = true;
        cancelIdle(idleId);
      };
    }

    const timeoutId = setTimeout(enable, 350);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.titleContainer}>
        {/* EL H1 PARA GOOGLE: Limpio, perfecto y sin duplicados */}
        <h1 className={styles.srOnly}>Viaja a Japón desde México</h1>

        {/* EL CONTENEDOR VISUAL: Cambiado a <div> y oculto para rastreadores */}
        <div className={styles.h1} aria-hidden="true">
          <span className={`${styles.line} ${styles.desktopLine}`}>
            <span className={styles.wordSlot}>
              <PressureWord
                pressureEnabled={enablePressureTitle}
                text="Viaja a"
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
                text={`Jap\u00f3n`}
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
                text="desde"
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
                text={`M\u00e9xico`}
                fontWeight={900}
                italic={false}
                weightFrom={500}
                weightTo={100}
                scaleFrom={1.09}
                scaleTo={1}
              />
            </span>
          </span>

          {/* Tu versión móvil se mantiene intacta aquí adentro */}
          <span className={styles.mobileLine}>
            <span className={styles.mobileSmall}>Viaja a</span>
            <span className={styles.mobileBig}>{`Jap\u00f3n`}</span>
          </span>
          <span className={styles.mobileLine}>
            <span className={styles.mobileSmall}>Desde</span>
            <span className={styles.mobileBig}>{`M\u00e9xico`}</span>
          </span>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.description}>
          <p>{`Eleva tu vida con una forma m\u00e1s cuidada de vivir Jap\u00f3n.`}</p>
          <p>{`Dise\u00f1amos experiencias para quienes valoran atenci\u00f3n personal, criterio y una forma m\u00e1s cuidada de vivir Jap\u00f3n.`}</p>
        </div>

        <div className={styles.ctaRow}>
          <Button type="button" variant="primary">
            Solicita tu propuesta
          </Button>
          <div className={styles.cta2}>
            <Button type="button" variant="secondary">
              Ver itinerarios
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.circle} aria-hidden="true" />

      <HeroOverlayLazy />
    </div>
  );
}
