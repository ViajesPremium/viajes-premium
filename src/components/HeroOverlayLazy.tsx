"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import Image from "next/image";
import styles from "./heroOverlay.module.css";

type HeroOverlayImages = {
  baseImage: string;
  samuraiImage: string;
  baseAlt: string;
  samuraiAlt: string;
};

type HeroOverlayEnhancedProps = {
  baseImage: string;
  samuraiImage: string;
  baseAlt?: string;
  samuraiAlt?: string;
};

export type HeroOverlayLazyProps = {
  overlayImages?: Partial<HeroOverlayImages>;
};

const DEFAULT_HERO_OVERLAY_IMAGES: HeroOverlayImages = {
  baseImage: "/images/japon/hero/geishaHero.webp",
  samuraiImage: "/images/japon/hero/samuraiHero.webp",
  baseAlt: "Hero Base",
  samuraiAlt: "Hero Samurai",
};

function resolveOverlayImages(
  overlayImages?: Partial<HeroOverlayImages>,
): HeroOverlayImages {
  return {
    ...DEFAULT_HERO_OVERLAY_IMAGES,
    ...(overlayImages ?? {}),
  };
}

function HeroOverlayStatic({ images }: { images: HeroOverlayImages }) {
  return (
    <div className={styles.heroOverlay} aria-hidden="true">
      <Image
        src={images.baseImage}
        alt={images.baseAlt}
        width={5000}
        height={5000}
        sizes="(max-width: 768px) 210vw, 62vw"
        loading="eager"
        quality={100}
        fetchPriority="high"
        decoding="async"
        className={styles.geishaHero}
      />
      <div className={styles.samuraiHeroPlaceholder} />
    </div>
  );
}

function HeroOverlayMobileLite({ images }: { images: HeroOverlayImages }) {
  return (
    <div className={styles.heroOverlay} aria-hidden="true">
      <Image
        src={images.baseImage}
        alt={images.baseAlt}
        width={5000}
        height={5000}
        sizes="(max-width: 768px) 210vw, 62vw"
        loading="eager"
        quality={100}
        fetchPriority="high"
        decoding="async"
        className={styles.geishaHero}
      />

      <div className={styles.mobileLiteSamuraiMask}>
        <Image
          src={images.samuraiImage}
          alt={images.samuraiAlt}
          fill
          sizes="(max-width: 768px) 199vw, 0px"
          quality={100}
          className={styles.mobileLiteSamuraiImage}
        />
      </div>

      <div className={styles.mobileLiteGlow} />
    </div>
  );
}

export default function HeroOverlayLazy({ overlayImages }: HeroOverlayLazyProps) {
  const images = useMemo(
    () => resolveOverlayImages(overlayImages),
    [overlayImages],
  );

  const [EnhancedOverlay, setEnhancedOverlay] =
    useState<ComponentType<HeroOverlayEnhancedProps> | null>(null);
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

  useEffect(() => {
    if (!enableEnhancedOverlay || EnhancedOverlay) return;

    let cancelled = false;

    import("./heroOverlay").then((module) => {
      if (cancelled) return;
      setEnhancedOverlay(() => module.default);
    });

    return () => {
      cancelled = true;
    };
  }, [enableEnhancedOverlay, EnhancedOverlay]);

  if (isMobileViewport) {
    return prefersReducedMotion ? (
      <HeroOverlayStatic images={images} />
    ) : (
      <HeroOverlayMobileLite images={images} />
    );
  }

  if (enableEnhancedOverlay && EnhancedOverlay) {
    return <EnhancedOverlay {...images} />;
  }

  return <HeroOverlayStatic images={images} />;
}
