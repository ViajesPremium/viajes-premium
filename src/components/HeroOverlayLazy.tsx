"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import Image from "next/image";
import { useAnimationsEnabled } from "@/lib/animation-budget";
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
  disableParallax?: boolean;
};

export type HeroOverlayLazyProps = {
  overlayImages?: Partial<HeroOverlayImages>;
  disableParallax?: boolean;
  forceStatic?: boolean;
  preferLiteAnimation?: boolean;
};

const DEFAULT_HERO_OVERLAY_IMAGES: HeroOverlayImages = {
  baseImage: "/images/japon/hero/geishaHero.webp",
  samuraiImage: "/images/japon/hero/samuraiHero.webp",
  baseAlt: "Hero Base",
  samuraiAlt: "Hero Samurai",
};
const HERO_BASE_IMAGE_SIZES = "(max-width: 768px) 745px, 690px";
const HERO_SAMURAI_IMAGE_SIZES = "(max-width: 768px) 779px, 0px";

function resolveOverlayImages(
  overlayImages?: Partial<HeroOverlayImages>,
): HeroOverlayImages {
  return {
    ...DEFAULT_HERO_OVERLAY_IMAGES,
    ...(overlayImages ?? {}),
  };
}

function HeroOverlayStatic() {
  return null;
}

function HeroOverlayMobileLite({ images }: { images: HeroOverlayImages }) {
  return (
    <div className={styles.heroOverlay} aria-hidden="true">
      {/* Geisha — imagen base, siempre visible en mobile */}
      <div className={styles.geishaParallaxLayer}>
        <Image
          src={images.baseImage}
          alt={images.baseAlt}
          width={745}
          height={745}
          sizes={HERO_BASE_IMAGE_SIZES}
          loading="eager"
          quality={85}
          className={styles.geishaHero}
        />
      </div>

      <div className={styles.mobileLiteSamuraiMask}>
        <Image
          src={images.samuraiImage}
          alt={images.samuraiAlt}
          fill
          sizes={HERO_SAMURAI_IMAGE_SIZES}
          quality={75}
          className={styles.mobileLiteSamuraiImage}
        />
      </div>

      <div className={styles.mobileLiteGlow} />
    </div>
  );
}

function HeroOverlayMobileStatic({ images }: { images: HeroOverlayImages }) {
  return (
    <div className={styles.heroOverlay} aria-hidden="true">
      <div className={styles.geishaParallaxLayer}>
        <Image
          src={images.baseImage}
          alt={images.baseAlt}
          width={745}
          height={745}
          sizes={HERO_BASE_IMAGE_SIZES}
          loading="eager"
          quality={85}
          className={styles.geishaHero}
        />
      </div>

      <div className={styles.mobileLiteSamuraiMask}>
        <Image
          src={images.samuraiImage}
          alt={images.samuraiAlt}
          fill
          sizes={HERO_SAMURAI_IMAGE_SIZES}
          quality={75}
          className={styles.mobileLiteSamuraiImage}
        />
      </div>
    </div>
  );
}

export default function HeroOverlayLazy({
  overlayImages,
  disableParallax = false,
  forceStatic = false,
  preferLiteAnimation = false,
}: HeroOverlayLazyProps) {
  const animationsEnabled = useAnimationsEnabled();
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
    if (forceStatic || !isDesktop || prefersReducedMotion) {
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
  }, [forceStatic, isMobileViewport, prefersReducedMotion]);

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
    return prefersReducedMotion || !animationsEnabled ? (
      <HeroOverlayMobileStatic images={images} />
    ) : (
      <HeroOverlayMobileLite images={images} />
    );
  }

  if (!animationsEnabled) {
    return <HeroOverlayStatic />;
  }

  if (forceStatic) {
    return <HeroOverlayStatic />;
  }

  if (preferLiteAnimation) {
    return <HeroOverlayMobileLite images={images} />;
  }

  if (enableEnhancedOverlay && EnhancedOverlay) {
    return <EnhancedOverlay {...images} />;
  }

  return <HeroOverlayStatic />;
}
