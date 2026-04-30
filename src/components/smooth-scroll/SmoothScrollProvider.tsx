"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

const DESKTOP_LERP = 0.08;
const MOBILE_LERP = 0.1;
const DESKTOP_WHEEL_MULTIPLIER = 0.85;
const MOBILE_WHEEL_MULTIPLIER = 1;

type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;

function clearStaleLenisStoppedClass() {
  document.documentElement.classList.remove("lenis-stopped");
  document.body.classList.remove("lenis-stopped");
}

export default function SmoothScrollProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    if (prefersReducedMotion) return;

    let cancelled = false;
    let tickerCb: ((time: number) => void) | null = null;
    let lenisOffScroll: (() => void) | void;
    let gsapApi: typeof import("gsap").gsap | null = null;
    let stApi: ScrollTriggerType | null = null;
    let stRefreshCb: (() => void) | null = null;

    let resizeRaf: number | null = null;
    let refreshRaf: number | null = null;
    let refreshTimeout: ReturnType<typeof setTimeout> | null = null;
    let resizeObserver: ResizeObserver | null = null;

    // Tracked widths to detect orientation vs. browser-bar-only changes on mobile.
    let lastWindowWidth = window.innerWidth;
    let lastVVWidth = window.visualViewport?.width ?? window.innerWidth;
    // Tracked document height for the ResizeObserver threshold.
    let lastDocHeight = document.documentElement.clientHeight;
    // Minimum height delta (px) that we consider a real layout change on mobile.
    // Browser bars are typically 50-100 px; we use 150 as a comfortable margin.
    const MOBILE_HEIGHT_THRESHOLD = 150;

    const scheduleLenisResize = () => {
      if (resizeRaf !== null) return;
      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = null;
        lenisRef.current?.resize();
      });
    };

    const scheduleRefresh = (delay = 0) => {
      if (!stApi) return;

      if (refreshTimeout !== null) {
        clearTimeout(refreshTimeout);
        refreshTimeout = null;
      }

      refreshTimeout = setTimeout(() => {
        refreshTimeout = null;
        if (refreshRaf !== null) return;

        refreshRaf = window.requestAnimationFrame(() => {
          refreshRaf = null;
          lenisRef.current?.resize();
          stApi?.refresh();
        });
      }, delay);
    };

    const init = async () => {
      const [{ default: LenisCtor }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;

      gsapApi = gsap;
      stApi = ScrollTrigger;

      gsapApi.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      // syncTouch apagado por estabilidad: evita congelamientos táctiles
      // y deja la inercia nativa del navegador en mobile.
      const lenis = new LenisCtor({
        lerp: isMobile ? MOBILE_LERP : DESKTOP_LERP,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: isMobile
          ? MOBILE_WHEEL_MULTIPLIER
          : DESKTOP_WHEEL_MULTIPLIER,
        gestureOrientation: "vertical",
        autoRaf: false,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;
      clearStaleLenisStoppedClass();

      lenisOffScroll = lenis.on("scroll", () => {
        stApi?.update();
      });

      tickerCb = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsapApi.ticker.add(tickerCb);
      gsapApi.ticker.lagSmoothing(0);

      stRefreshCb = () => scheduleLenisResize();
      ScrollTrigger.addEventListener("refresh", stRefreshCb);

      // On mobile, only react to width changes (orientation / real resize).
      // Height-only changes are caused by the browser address bar appearing or
      // disappearing — we must ignore those to avoid page jumps.
      const onResize = () => {
        if (isMobile) {
          const newWidth = window.innerWidth;
          if (newWidth === lastWindowWidth) return; // height-only → browser bar, skip
          lastWindowWidth = newWidth;
        }
        scheduleRefresh(120);
      };

      const onOrientation = () => {
        // Orientation always means a real layout change; reset tracked widths so
        // the subsequent resize event is not filtered out.
        lastWindowWidth = window.innerWidth;
        lastVVWidth = window.visualViewport?.width ?? window.innerWidth;
        scheduleRefresh(100);
        scheduleRefresh(320);
      };
      const onPageShow = () => {
        gsapApi?.ticker.wake();
        clearStaleLenisStoppedClass();
        scheduleRefresh(0);
      };
      const onVisibility = () => {
        if (document.visibilityState !== "visible") return;
        gsapApi?.ticker.wake();
        clearStaleLenisStoppedClass();
        scheduleRefresh(0);
      };

      window.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("orientationchange", onOrientation);
      window.addEventListener("pageshow", onPageShow);
      document.addEventListener("visibilitychange", onVisibility);

      const vv = window.visualViewport;

      // visualViewport fires whenever the browser bar shows/hides (height-only).
      // We only act when the *width* changes (real resize / orientation change).
      const onVVResize = () => {
        const newWidth = vv?.width ?? window.innerWidth;
        if (newWidth === lastVVWidth) return; // height-only → browser bar, skip
        lastVVWidth = newWidth;
        scheduleRefresh(120);
      };
      vv?.addEventListener("resize", onVVResize, { passive: true });

      // ResizeObserver on <html>: only trigger lenis.resize() for changes large
      // enough to be a real layout change, not a browser-bar flicker.
      resizeObserver = new ResizeObserver(() => {
        const newHeight = document.documentElement.clientHeight;
        if (
          isMobile &&
          Math.abs(newHeight - lastDocHeight) < MOBILE_HEIGHT_THRESHOLD
        ) {
          return; // browser bar height change — ignore
        }
        lastDocHeight = newHeight;
        scheduleLenisResize();
      });
      resizeObserver.observe(document.documentElement);

      document.fonts?.ready.then(() => {
        if (cancelled) return;
        scheduleRefresh(0);
      });

      scheduleRefresh(0);

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onOrientation);
        window.removeEventListener("pageshow", onPageShow);
        document.removeEventListener("visibilitychange", onVisibility);
        vv?.removeEventListener("resize", onVVResize);
      };
    };

    let teardown: (() => void) | null = null;

    void init().then((cleanup) => {
      if (cancelled) {
        cleanup?.();
        return;
      }
      teardown = cleanup ?? null;
    });

    return () => {
      cancelled = true;
      teardown?.();

      resizeObserver?.disconnect();

      if (refreshTimeout !== null) {
        clearTimeout(refreshTimeout);
        refreshTimeout = null;
      }
      if (resizeRaf !== null) {
        window.cancelAnimationFrame(resizeRaf);
        resizeRaf = null;
      }
      if (refreshRaf !== null) {
        window.cancelAnimationFrame(refreshRaf);
        refreshRaf = null;
      }

      if (tickerCb && gsapApi) {
        gsapApi.ticker.remove(tickerCb);
      }
      if (stRefreshCb && stApi) {
        stApi.removeEventListener("refresh", stRefreshCb);
      }
      if (typeof lenisOffScroll === "function") {
        lenisOffScroll();
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
