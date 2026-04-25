"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

// lerp: fracción de la distancia que se cubre por frame.
// 0.08 = suave sin lag excesivo. Con lerp=0.03 el scroll "arrastraba"
// muy lejos del cursor y luego aceleraba bruscamente (tirones).
const DESKTOP_LERP = 0.08;
const MOBILE_LERP = 0.09;
// Multiplicador de rueda: afecta cuánto avanza cada tick de scroll.
// 0.52 era muy bajo; 0.85 da respuesta natural sin sobre-disparar.
const DESKTOP_WHEEL_MULTIPLIER = 0.85;
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

    // 🚨 CAMBIO 1: Se eliminó el bloqueo para móviles (isMobile).
    // Ahora solo detenemos la ejecución si el usuario prefiere movimiento reducido.
    if (prefersReducedMotion) {
      return;
    }

    let cancelled = false;
    let tick: ((time: number) => void) | null = null;
    let gsapApi: typeof import("gsap").gsap | null = null;
    let ro: ResizeObserver | null = null;
    let resizeRaf: number | null = null;
    // Stored at outer scope so the cleanup function can reference them
    // without needing a second async import.
    let stRefreshCb: (() => void) | null = null;
    let ScrollTriggerApi:
      | typeof import("gsap/ScrollTrigger").ScrollTrigger
      | null = null;

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

      // 1. Registras el plugin
      gsapApi.registerPlugin(ScrollTrigger);

      // 🚨 EL FIX DE GSAP PARA CHROME MOBILE 🚨
      // Esto evita que ScrollTrigger haga refresh cuando la barra se oculta/muestra
      ScrollTrigger.config({
        ignoreMobileResize: true,
      });

      // Usamos isMobile para aplicar las constantes específicas de mobile
      const lenis = new LenisCtor({
        lerp: isMobile ? MOBILE_LERP : DESKTOP_LERP,
        smoothWheel: true,
        wheelMultiplier: isMobile
          ? MOBILE_WHEEL_MULTIPLIER
          : DESKTOP_WHEEL_MULTIPLIER,
        autoRaf: false,
        syncTouch: isMobile, // Sync with native touch on mobile
      });

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

      // ── Keep Lenis scroll limit in sync with GSAP pin spacers ───────────────

      // A — Immediate resize: measure real page height right now
      scheduleLenisResize();

      // B — Global ScrollTrigger "refresh" listener
      stRefreshCb = () => scheduleLenisResize();
      ScrollTrigger.addEventListener("refresh", stRefreshCb);

      // C — ResizeObserver on document.body as a final safety net.
      // 🚨 CAMBIO 2: Lógica de tolerancia añadida. Ignora cambios de altura
      // menores a 100px (como la barra de navegación de Chrome en Android/iOS)
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
