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

    // Reduced-motion: keep static overlay, no WebGL.
    // Mobile now gets the full WebGL effect thanks to the mobile-optimised shader
    // (mediump, value noise, half-res buffer, 30fps cap, low-power GPU mode).
    if (prefersReducedMotion) {
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
      // Give mobile a bit more time (browser is busier at first paint)
      const timeout = isDesktop ? 1200 : 2000;
      const idleId = requestIdle(enable, { timeout });
      return () => {
        cancelled = true;
        cancelIdle(idleId);
      };
    }

    // Fallback setTimeout: slightly longer on mobile to not compete with first paint
    const timeoutId = setTimeout(enable, isDesktop ? 450 : 800);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return enableEnhancedOverlay ? <HeroOverlayEnhanced /> : <HeroOverlayStatic />;
}
