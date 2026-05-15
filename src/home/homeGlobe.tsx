"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./homeGlobe.module.css";
import { useAnimationsEnabled } from "@/lib/animation-budget";

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

  return (
    <section className={styles.planetPane} aria-label="Planeta central">
      <div className={styles.imgContainer}>
        <div className={styles.img1}>
          <Image
            src="/images/europa/itinerarios/derecha/scroll-gala-derecha.avif"
            alt="Alojamiento de lujo"
            fill
            className={styles.imgMedia}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className={styles.img2}>
          <Image
            src="/images/europa/itinerarios/izquierda/scroll-gala-izquierda.avif"
            alt="Naturaleza escondida"
            fill
            className={styles.imgMedia}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
