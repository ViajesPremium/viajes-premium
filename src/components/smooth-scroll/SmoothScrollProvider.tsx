"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation"; // <- IMPORTANTE
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ANIMATION_BUDGET_EVENT,
  areAnimationsEnabledForDevice,
  isLowEndMobileDevice,
} from "@/lib/animation-budget";

const DESKTOP_LERP = 0.05;
const DESKTOP_WHEEL_MULTIPLIER = 0.8;
const MOBILE_FPS_PROBE_WARMUP_MS = 350;
const MOBILE_FPS_PROBE_DURATION_MS = 3200;
const MOBILE_FPS_MIN_SAMPLES = 45;
const MOBILE_FPS_DISABLE_AVG = 40;
const MOBILE_FPS_DISABLE_P10 = 30;
const MOBILE_FPS_LOW_STREAK_TO_DISABLE = 2;

function clearStaleLenisStoppedClass() {
  document.documentElement.classList.remove("lenis-stopped");
  document.body.classList.remove("lenis-stopped");
}

function setAnimationBudgetState(
  enabled: boolean,
  source: "static" | "fps",
) {
  window.__animationsEnabled = enabled;
  document.documentElement.dataset.animations = enabled ? "on" : "off";
  window.dispatchEvent(
    new CustomEvent(ANIMATION_BUDGET_EVENT, {
      detail: { enabled, source },
    }),
  );
}

export default function SmoothScrollProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname(); // Detecta cambios de ruta en Next.js

  // 1. EFECTO PRINCIPAL DE INICIALIZACIÓN
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const animationsEnabled = areAnimationsEnabledForDevice();
    const lowEndMobile = isLowEndMobileDevice();

    setAnimationBudgetState(animationsEnabled, "static");
    window.__lowEndMobile = lowEndMobile;

    history.scrollRestoration = "manual";

    if (prefersReducedMotion || !animationsEnabled) {
      clearStaleLenisStoppedClass();
      if (window.__lenis) delete window.__lenis;
      return;
    }

    let tickerCb: ((time: number) => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let resizeDebounce: ReturnType<typeof setTimeout> | null = null;
    let fpsProbeRaf: number | null = null;
    let lastDocWidth = window.innerWidth;
    let lastDocHeight = window.innerHeight;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    if (isMobile) {
      // ── Mobile: Lenis ligero solo para mantener las barras del navegador ──
      // Con syncTouch: true, Lenis intercepta el touch scroll y pone
      // overflow: hidden en el documento. El browser no ve scroll nativo
      // → nunca oculta su barra de dirección ni la barra inferior.
      // lerp: 0 = sin suavizado, respuesta idéntica al scroll nativo.
      if (window.__lenis) delete window.__lenis;

      const mobileLenis = new Lenis({
        lerp: 0,
        smoothWheel: false,
        syncTouch: true,
        touchMultiplier: 1,
        gestureOrientation: "vertical",
        autoRaf: false,
      });
      let activeMobileLenis: Lenis | null = mobileLenis;

      lenisRef.current = mobileLenis;
      window.__lenis = mobileLenis;
      clearStaleLenisStoppedClass();

      mobileLenis.on("scroll", ScrollTrigger.update);

      tickerCb = (time: number) => {
        activeMobileLenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);

      const disableLenisForLowFps = () => {
        if (!activeMobileLenis) return;
        activeMobileLenis.destroy();
        activeMobileLenis = null;
        if (lenisRef.current === mobileLenis) {
          lenisRef.current = null;
        }
        if (window.__lenis === mobileLenis) {
          delete window.__lenis;
        }
        clearStaleLenisStoppedClass();
        ScrollTrigger.refresh();
      };

      const fpsSamples: number[] = [];
      let probeStartTs = 0;
      let probeLastTs = 0;
      let lowFpsStreak = 0;

      const runFpsProbe = (now: number) => {
        if (!activeMobileLenis) {
          fpsProbeRaf = null;
          return;
        }

        if (!probeStartTs) {
          probeStartTs = now;
        }

        if (probeLastTs) {
          const deltaMs = now - probeLastTs;
          const elapsedMs = now - probeStartTs;
          if (deltaMs > 0 && elapsedMs >= MOBILE_FPS_PROBE_WARMUP_MS) {
            fpsSamples.push(Math.min(120, 1000 / deltaMs));
          }
        }
        probeLastTs = now;

        const elapsedMs = now - probeStartTs;
        if (elapsedMs < MOBILE_FPS_PROBE_DURATION_MS) {
          fpsProbeRaf = window.requestAnimationFrame(runFpsProbe);
          return;
        }

        fpsProbeRaf = null;
        if (fpsSamples.length < MOBILE_FPS_MIN_SAMPLES) return;

        const avgFps =
          fpsSamples.reduce((sum, fps) => sum + fps, 0) / fpsSamples.length;
        const sorted = [...fpsSamples].sort((a, b) => a - b);
        const p10Index = Math.max(
          0,
          Math.min(sorted.length - 1, Math.floor(sorted.length * 0.1)),
        );
        const p10Fps = sorted[p10Index] ?? avgFps;

        const isLowFps =
          avgFps < MOBILE_FPS_DISABLE_AVG || p10Fps < MOBILE_FPS_DISABLE_P10;

        if (isLowFps) {
          lowFpsStreak += 1;
          if (lowFpsStreak < MOBILE_FPS_LOW_STREAK_TO_DISABLE) {
            fpsSamples.length = 0;
            probeStartTs = 0;
            probeLastTs = 0;
            fpsProbeRaf = window.requestAnimationFrame(runFpsProbe);
            return;
          }
          setAnimationBudgetState(false, "fps");
          disableLenisForLowFps();
          return;
        }

        lowFpsStreak = 0;
        setAnimationBudgetState(true, "fps");
      };

      fpsProbeRaf = window.requestAnimationFrame(runFpsProbe);

      requestAnimationFrame(() => {
        activeMobileLenis?.resize();
        ScrollTrigger.refresh();
      });
    } else {
      // Inicialización síncrona, eliminamos el await problemático
      const lenis = new Lenis({
        lerp: DESKTOP_LERP,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: DESKTOP_WHEEL_MULTIPLIER,
        gestureOrientation: "vertical",
        autoRaf: false,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;
      clearStaleLenisStoppedClass();

      // Sincronizar Lenis con GSAP
      lenis.on("scroll", ScrollTrigger.update);

      tickerCb = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);
    }

    // ResizeObserver global que actualiza Lenis Y ScrollTrigger
    if (!isMobile) {
      resizeObserver = new ResizeObserver(() => {
        if (resizeDebounce) clearTimeout(resizeDebounce);
        resizeDebounce = setTimeout(() => {
          const width = window.innerWidth;
          const height = window.innerHeight;
          const widthDelta = Math.abs(width - lastDocWidth);
          const heightDelta = Math.abs(height - lastDocHeight);
          if (widthDelta < 2 && heightDelta < 2) return;
          lastDocWidth = width;
          lastDocHeight = height;
          lenisRef.current?.resize();
          ScrollTrigger.refresh();
        }, 120);
      });
      resizeObserver.observe(document.documentElement);
    }

    // Refresco inicial asegurado
    requestAnimationFrame(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    });

    return () => {
      resizeObserver?.disconnect();
      if (resizeDebounce) clearTimeout(resizeDebounce);
      if (fpsProbeRaf) cancelAnimationFrame(fpsProbeRaf);

      if (tickerCb) {
        gsap.ticker.remove(tickerCb);
      }

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      if (window.__lenis) {
        delete window.__lenis;
      }
    };
  }, []);

  // 2. EFECTO DE NAVEGACIÓN (NEXT.JS ROUTER)
  useEffect(() => {
    if (lenisRef.current) {
      // 1. Resetea el scroll a 0 instantáneamente
      lenisRef.current.scrollTo(0, { immediate: true });

      // 2. Quitamos el killAll().
      // En su lugar, le damos tiempo a React para inyectar el DOM de la nueva página
      // y a useGSAP (en los hijos) para crear sus triggers.
      // Luego, simplemente forzamos a ScrollTrigger a recalcular las posiciones.
      const timeout = setTimeout(() => {
        lenisRef.current?.resize();
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }, 150);

      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  return <>{children}</>;
}
