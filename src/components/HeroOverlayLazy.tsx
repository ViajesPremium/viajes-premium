"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./heroOverlay.module.css";

const HERO_GEISHA_IMAGE = "/images/japon/hero/geishaHero.webp";
const HERO_SAMURAI_IMAGE = "/images/japon/hero/samuraiHero.webp";

function HeroOverlayStatic() {
  return (
    <div className={styles.heroOverlay} aria-hidden="true">
      <Image
        src={HERO_GEISHA_IMAGE}
        alt="Hero Base"
        width={5000}
        height={5000}
        sizes="(max-width: 768px) 210vw, 62vw"
        quality={75}
        fetchPriority="high"
        decoding="async"
        className={styles.geishaHero}
      />
      <div className={styles.samuraiHeroPlaceholder} />
    </div>
  );
}

function HeroOverlayMobileLite() {
  return (
    <div className={styles.heroOverlay} aria-hidden="true">
      <Image
        src={HERO_GEISHA_IMAGE}
        alt="Hero Base"
        width={5000}
        height={5000}
        sizes="(max-width: 768px) 210vw, 62vw"
        quality={75}
        fetchPriority="high"
        decoding="async"
        className={styles.geishaHero}
      />

      <div className={styles.mobileLiteSamuraiMask}>
        <Image
          src={HERO_SAMURAI_IMAGE}
          alt=""
          fill
          sizes="(max-width: 768px) 199vw, 0px"
          quality={58}
          className={styles.mobileLiteSamuraiImage}
        />
      </div>

      <div className={styles.mobileLiteGlow} />
    </div>
  );
}

const HeroOverlayEnhanced = dynamic(() => import("./heroOverlay"), {
  ssr: false,
  loading: HeroOverlayStatic,
});

export default function HeroOverlayLazy() {
  const [enableEnhancedOverlay, setEnableEnhancedOverlay] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mobileMq = window.matchMedia("(max-width: 768px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncFlags = () => {
      setIsMobileViewport(mobileMq.matches);
      setPrefersReducedMotion(motionMq.matches);
    };

    syncFlags();
    mobileMq.addEventListener("change", syncFlags);
    motionMq.addEventListener("change", syncFlags);

    return () => {
      mobileMq.removeEventListener("change", syncFlags);
      motionMq.removeEventListener("change", syncFlags);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let releaseScheduled: (() => void) | null = null;

    const isDesktop = !isMobileViewport;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const isConstrainedNetwork =
      !!connection?.saveData || /2g/.test(connection?.effectiveType ?? "");

    // Mobile uses CSS pre-animated effect instead of runtime WebGL.
    if (!isDesktop || prefersReducedMotion) {
      return;
    }

    const enable = () => {
      if (cancelled) return;
      setEnableEnhancedOverlay(true);
    };

    const scheduleEnable = () => {
      const idleTimeout = isConstrainedNetwork ? 2200 : 1200;
      const fallbackTimeout = isConstrainedNetwork ? 1200 : 450;

      const requestIdle =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback.bind(window)
          : null;
      const cancelIdle =
        typeof window.cancelIdleCallback === "function"
          ? window.cancelIdleCallback.bind(window)
          : null;

      if (requestIdle && cancelIdle) {
        const idleId = requestIdle(enable, { timeout: idleTimeout });
        return () => {
          cancelled = true;
          cancelIdle(idleId);
        };
      }

      const timeoutId = setTimeout(enable, fallbackTimeout);
      return () => {
        cancelled = true;
        clearTimeout(timeoutId);
      };
    };

    releaseScheduled = scheduleEnable();

    return () => {
      cancelled = true;
      releaseScheduled?.();
    };
  }, [isMobileViewport, prefersReducedMotion]);

  if (isMobileViewport) {
    return prefersReducedMotion ? <HeroOverlayStatic /> : <HeroOverlayMobileLite />;
  }

  return enableEnhancedOverlay ? (
    <HeroOverlayEnhanced />
  ) : (
    <HeroOverlayStatic />
  );
}
