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
        quality={75}
        fetchPriority="high"
        decoding="async"
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
    let releaseScheduled: (() => void) | null = null;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isDesktop = window.matchMedia("(min-width: 769px)").matches;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const isConstrainedNetwork =
      !!connection?.saveData || /2g/.test(connection?.effectiveType ?? "");

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

    const scheduleEnable = () => {
      const idleTimeout = isDesktop ? 1200 : isConstrainedNetwork ? 5600 : 3800;
      const fallbackTimeout = isDesktop
        ? 450
        : isConstrainedNetwork
          ? 3200
          : 2200;

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

    if (isDesktop || document.readyState === "complete") {
      releaseScheduled = scheduleEnable();
      return () => {
        cancelled = true;
        releaseScheduled?.();
      };
    }

    const onLoad = () => {
      window.removeEventListener("load", onLoad);
      if (cancelled) return;
      // Extra frame so initial paint and CTA layout settle first.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;
          releaseScheduled = scheduleEnable();
        });
      });
    };

    window.addEventListener("load", onLoad, { once: true });

    return () => {
      cancelled = true;
      releaseScheduled?.();
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return enableEnhancedOverlay ? (
    <HeroOverlayEnhanced />
  ) : (
    <HeroOverlayStatic />
  );
}
