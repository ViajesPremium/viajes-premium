"use client";

import dynamic from "next/dynamic";
import styles from "./homeGlobe.module.css";

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
  return (
    <section className={styles.planetPane} aria-label="Planeta central">
      <div className={styles.bridgeGlobe}>
        <GlobePolaroids
          className={styles.bridgeGlobeCanvas}
          rotationSpeed={0.5}
          mapSamples={32000}
          mapBrightness={0}
          diffuse={0.05}
          dark={0}
          opacity={1}
          markerColor={[0.75, 0.75, 0.75]}
          glowColor={[0, 0, 0]}
          markerSize={0.016}
        />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.text}>Experiencia</p>
        <p className={styles.text}>Logistica</p>
        <p className={styles.text}>Hospedaje</p>
      </div>
    </section>
  );
}
