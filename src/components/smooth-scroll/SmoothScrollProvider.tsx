"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

const DESKTOP_LERP = 0.08;
const MOBILE_LERP = 0.1;
const DESKTOP_WHEEL_MULTIPLIER = 0.85;
const MOBILE_WHEEL_MULTIPLIER = 1;

// Mínima diferencia de altura (px) para considerar un resize real en mobile.
// Cambios menores (barra del navegador: ~56–100 px) quedan por debajo de este
// umbral y se ignoran. Cambios mayores (rotación, teclado virtual) lo superan.
const MOBILE_HEIGHT_THRESHOLD = 100;

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

    // Dimensiones rastreadas para filtrar cambios de barra de navegador en mobile.
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

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

      // autoRefreshEvents limitado: ScrollTrigger sólo auto-refresca en estos
      // eventos del DOM — NO en "resize" — porque manejamos eso manualmente con
      // filtrado inteligente para evitar saltos por la barra del navegador.
      ScrollTrigger.config({
        ignoreMobileResize: false,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });

      // normalizeScroll suaviza la inercia nativa de touch sin interceptar los
      // eventos de forma agresiva. allowNestedScroll permite que los contenedores
      // internos con scroll propio (p.ej. el form) sigan funcionando.
      ScrollTrigger.normalizeScroll({ allowNestedScroll: true });

      // syncTouch: false — inercia nativa del navegador en mobile.
      // normalizeScroll de GSAP complementa la suavidad sin los freezes de syncTouch.
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

      // Ticker de GSAP como fuente única de verdad para el RAF.
      // lenis.raf recibe ms absolutos — time del ticker ya viene en segundos.
      tickerCb = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsapApi.ticker.add(tickerCb);
      gsapApi.ticker.lagSmoothing(0);

      stRefreshCb = () => scheduleLenisResize();
      ScrollTrigger.addEventListener("refresh", stRefreshCb);

      // ── Resize inteligente ─────────────────────────────────────────────────
      // En mobile, ignoramos cambios que sean solo de altura < 100 px (barra del
      // navegador). Solo refrescamos si el ancho cambió (orientación real) o si
      // la altura varió significativamente (teclado virtual, cambio de layout).
      const onResize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        const widthChanged = newWidth !== lastWidth;
        const heightDiff = Math.abs(newHeight - lastHeight);

        if (isMobile && !widthChanged && heightDiff <= MOBILE_HEIGHT_THRESHOLD) {
          return; // cambio de barra de navegador — ignorar
        }

        lastWidth = newWidth;
        lastHeight = newHeight;
        scheduleRefresh(120);
      };

      const onOrientation = () => {
        // Actualizar referencias para que onResize no filtre el cambio post-rotación.
        lastWidth = window.innerWidth;
        lastHeight = window.innerHeight;
        scheduleRefresh(150);
        scheduleRefresh(400);
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

      // ResizeObserver en desktop para detectar cambios de layout por contenido
      // (imágenes lazy, fuentes, etc.). En mobile está controlado por onResize.
      if (!isMobile) {
        resizeObserver = new ResizeObserver(() => scheduleLenisResize());
        resizeObserver.observe(document.documentElement);
      }

      // Fuentes cargadas → posiciones de elementos pueden haber cambiado.
      document.fonts?.ready.then(() => {
        if (cancelled) return;
        scheduleRefresh(0);
      });

      // Ordenar triggers por posición en el DOM antes del primer refresh para
      // garantizar que itineraries y demás secciones se calculen en secuencia.
      ScrollTrigger.sort();
      scheduleRefresh(0);

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onOrientation);
        window.removeEventListener("pageshow", onPageShow);
        document.removeEventListener("visibilitychange", onVisibility);
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
