"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "./homeGlobe.module.css";
import { useAnimationsEnabled } from "@/lib/animation-budget";

const GlobePolaroids = dynamic(
  () =>
    import("@/components/ui/globe/cobe-globe-polaroids").then(
      (module) => module.GlobePolaroids,
    ),
  {
    ssr: false,
    loading: () => (
      <div className={styles.bridgeGlobePlaceholder} aria-hidden="true" />
    ),
  },
);

export default function HomeGlobe() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const animationsEnabled = useAnimationsEnabled();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const disableAnimationsForDevice = isMobile === true && !animationsEnabled;

  return (
    <section className={styles.planetPane} aria-label="Planeta central">
      <div className={styles.bridgeGlobe}>
        {isMobile === null ? (
          <div className={styles.bridgeGlobePlaceholder} aria-hidden="true" />
        ) : disableAnimationsForDevice ? (
          <div className={styles.bridgeGlobePlaceholder} aria-hidden="true" />
        ) : (
          <GlobePolaroids
            className={styles.bridgeGlobeCanvas}
            rotationSpeed={0.5}
            mapSamples={isMobile ? 6000 : 32000}
            mapBrightness={0}
            diffuse={0.05}
            dark={0}
            opacity={1}
            markerColor={[0.75, 0.75, 0.75]}
            glowColor={[0, 0, 0]}
            markerSize={0.016}
            maxPixelRatio={isMobile ? 1.5 : 2}
            // Optimizaciones mobile
            antialias={!isMobile}
            disableBumpMap={isMobile}
            maxGeometryDetail={isMobile ? 48 : 256}
            powerPreference={isMobile ? "low-power" : "default"}
            markers={isMobile ? [] : undefined}
          />
        )}
      </div>
      <div className={styles.textContainer} aria-hidden="true">
        <p className={styles.text}>Experiencia</p>
        <p className={styles.text}>Logistica</p>
        <p className={styles.text}>Hospedaje</p>
      </div>
    </section>
  );
}
