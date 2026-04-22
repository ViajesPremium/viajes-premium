"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./heroOverlay.module.css";

const HERO_GEISHA_IMAGE = "/images/japon/hero/geishaHero.webp";

function HeroOverlayStatic() {
  return (
    <div className={styles.heroOverlay} aria-hidden="true">
      <Image
        src={HERO_GEISHA_IMAGE}
        alt="Hero Base"
        width={5000}
        height={5000}
        sizes="(max-width: 768px) 210vw, 62vw"
        quality={60}
        preload
        className={styles.geishaHero}
      />
      <div className={styles.samuraiHeroPlaceholder} />
    </div>
  );
}

const HeroOverlayEnhanced = dynamic(() => import("./heroOverlay"), {
  ssr: false,
  loading: HeroOverlayStatic,
});

export default function HeroOverlayLazy() {
  const [enableEnhancedOverlay, setEnableEnhancedOverlay] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isDesktop = window.matchMedia("(min-width: 769px)").matches;

    // Keep mobile and reduced-motion on the static overlay to avoid
    // paying the WebGL + shader cost where it has the least UX benefit.
    if (!isDesktop || prefersReducedMotion) {
      return;
    }

    const enable = () => {
      if (cancelled) return;
      setEnableEnhancedOverlay(true);
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

    const timeoutId = setTimeout(enable, 450);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return enableEnhancedOverlay ? <HeroOverlayEnhanced /> : <HeroOverlayStatic />;
}
