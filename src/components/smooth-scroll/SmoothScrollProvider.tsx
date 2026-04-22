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
    let ro: ResizeObserver | null = null;
    // Stored at outer scope so the cleanup function can reference them
    // without needing a second async import.
    let stRefreshCb: (() => void) | null = null;
    let ScrollTriggerApi: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    const initSmoothScroll = async () => {
      const [{ default: LenisCtor }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;

      gsapApi = gsap;
      ScrollTriggerApi = ScrollTrigger;
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

      // ── Keep Lenis scroll limit in sync with GSAP pin spacers ───────────────
      //
      // Root problem: Lenis caches limit = scrollHeight − viewportHeight at init.
      // GSAP pin animations insert spacer divs that make the page taller AFTER
      // Lenis is created. Dynamic chunk imports and the Lenis import race with no
      // guaranteed order, so pin spacers may already exist when Lenis starts, or
      // appear later. Three layers of defence:

      // A — Immediate resize: measure real page height right now, capturing any
      //     pin spacers already added by whichever chunk loaded first.
      lenis.resize();

      // B — Global ScrollTrigger "refresh" listener: GSAP fires this every time
      //     it recalculates triggers (new pin, window resize, manual refresh).
      //     This covers spacers added AFTER Lenis initialises.
      stRefreshCb = () => lenis.resize();
      ScrollTrigger.addEventListener("refresh", stRefreshCb);

      // C — ResizeObserver on document.body as a final safety net.
      //     Must observe document.body, NOT document.documentElement:
      //     html { height: 100% } means documentElement.clientHeight never changes.
      //     body grows with content, so its ResizeObserver fires on height changes.
      ro = new ResizeObserver(() => {
        lenis.resize();
      });
      ro.observe(document.body);
    };

    void initSmoothScroll();

    return () => {
      cancelled = true;
      ro?.disconnect();

      if (tick && gsapApi) {
        gsapApi.ticker.remove(tick);
      }

      if (stRefreshCb && ScrollTriggerApi) {
        ScrollTriggerApi.removeEventListener("refresh", stRefreshCb);
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
