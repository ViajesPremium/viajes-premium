"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

// Lower lerp => smoother and slightly slower response.
const DESKTOP_LERP = 0.04;
const MOBILE_LERP = 0.09;
const DESKTOP_WHEEL_MULTIPLIER = 0.9;
const MOBILE_WHEEL_MULTIPLIER = 0.92;

export default function SmoothScrollProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Keep native scroll on mobile/reduced-motion to save main-thread work.
    if (isMobile || prefersReducedMotion) {
      return;
    }

    let cancelled = false;
    let tick: ((time: number) => void) | null = null;
    let gsapApi: typeof import("gsap").gsap | null = null;

    const initSmoothScroll = async () => {
      const [{ default: LenisCtor }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;

      gsapApi = gsap;
      gsapApi.registerPlugin(ScrollTrigger);

      const lenis = new LenisCtor({
        lerp: isMobile ? MOBILE_LERP : DESKTOP_LERP,
        smoothWheel: true,
        wheelMultiplier: isMobile
          ? MOBILE_WHEEL_MULTIPLIER
          : DESKTOP_WHEEL_MULTIPLIER,
        // Let GSAP ticker drive the RAF to keep Lenis and ScrollTrigger in sync.
        autoRaf: false,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsapApi.ticker.add(tick);
      gsapApi.ticker.lagSmoothing(0);
    };

    void initSmoothScroll();

    return () => {
      cancelled = true;

      if (tick && gsapApi) {
        gsapApi.ticker.remove(tick);
      }

      const lenis = lenisRef.current;
      lenis?.destroy();
      lenisRef.current = null;

      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, []);

  return <>{children ?? null}</>;
}
