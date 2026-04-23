"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

// Lower lerp => smoother and slightly slower response.
const DESKTOP_LERP = 0.03;
const DESKTOP_WHEEL_MULTIPLIER = 0.52;

export default function SmoothScrollProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const setupLenis = () => {
      let cancelled = false;
      let tick: ((time: number) => void) | null = null;
      let gsapApi: typeof import("gsap").gsap | null = null;
      let ro: ResizeObserver | null = null;
      let resizeRaf: number | null = null;
      let stRefreshCb: (() => void) | null = null;
      let ScrollTriggerApi:
        | typeof import("gsap/ScrollTrigger").ScrollTrigger
        | null = null;
      let localLenis: Lenis | null = null;

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
        ScrollTrigger.config({
          ignoreMobileResize: true,
        });

        const lenis = new LenisCtor({
          lerp: DESKTOP_LERP,
          smoothWheel: true,
          wheelMultiplier: DESKTOP_WHEEL_MULTIPLIER,
          autoRaf: false,
          syncTouch: false,
        });

        localLenis = lenis;
        lenisRef.current = lenis;
        window.__lenis = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        const scheduleLenisResize = () => {
          if (resizeRaf !== null) return;
          resizeRaf = window.requestAnimationFrame(() => {
            resizeRaf = null;
            lenis.resize();
          });
        };

        tick = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsapApi.ticker.add(tick);
        gsapApi.ticker.lagSmoothing(0);

        scheduleLenisResize();

        stRefreshCb = () => scheduleLenisResize();
        ScrollTrigger.addEventListener("refresh", stRefreshCb);

        let lastHeight = document.body.clientHeight;
        ro = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const currentHeight = entry.contentRect.height;
            if (Math.abs(currentHeight - lastHeight) > 2) {
              scheduleLenisResize();
              lastHeight = currentHeight;
            }
          }
        });
        ro.observe(document.body);
      };

      void initSmoothScroll();

      return () => {
        cancelled = true;
        ro?.disconnect();
        if (resizeRaf !== null) {
          window.cancelAnimationFrame(resizeRaf);
          resizeRaf = null;
        }

        if (tick && gsapApi) {
          gsapApi.ticker.remove(tick);
        }

        if (stRefreshCb && ScrollTriggerApi) {
          ScrollTriggerApi.removeEventListener("refresh", stRefreshCb);
        }

        localLenis?.destroy();
        if (lenisRef.current === localLenis) {
          lenisRef.current = null;
        }

        if (window.__lenis === localLenis) {
          delete window.__lenis;
        }
      };
    };

    let disposeLenis: (() => void) | null = null;
    let isActive = false;

    const syncLenisMode = () => {
      const shouldEnableLenis = !reducedMotionMq.matches;

      if (shouldEnableLenis && !isActive) {
        isActive = true;
        disposeLenis = setupLenis();
        return;
      }

      if (!shouldEnableLenis && isActive) {
        isActive = false;
        disposeLenis?.();
        disposeLenis = null;
      }
    };

    syncLenisMode();
    reducedMotionMq.addEventListener("change", syncLenisMode);

    return () => {
      reducedMotionMq.removeEventListener("change", syncLenisMode);
      isActive = false;
      disposeLenis?.();
      disposeLenis = null;
    };
  }, []);

  return <>{children ?? null}</>;
}
