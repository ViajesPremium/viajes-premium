"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import createGlobe from "cobe";

type Marker = {
  id: string;
  location: [number, number];
};

type Arc = {
  id: string;
  from: [number, number];
  to: [number, number];
};

type GlobeProps = {
  markers?: Marker[];
  arcs?: Arc[];
  className?: string;
  markerColor?: [number, number, number];
  baseColor?: [number, number, number];
  arcColor?: [number, number, number];
  glowColor?: [number, number, number];
  dark?: number;
  mapBrightness?: number;
  markerSize?: number;
  markerElevation?: number;
  arcWidth?: number;
  arcHeight?: number;
  speed?: number;
  theta?: number;
  diffuse?: number;
  mapSamples?: number;
};

export default function Globe({
  markers = [],
  arcs = [],
  className = "",
  markerColor = [0.75, 0.64, 0.24],
  baseColor = [0.98, 0.98, 0.98],
  arcColor = [0.75, 0.64, 0.24],
  glowColor = [0.94, 0.93, 0.91],
  dark = 0.08,
  mapBrightness = 9,
  markerSize = 0.085,
  markerElevation = 0.015,
  arcWidth = 0.95,
  arcHeight = 0.18,
  speed = 0.0055,
  theta = 0.18,
  diffuse = 1.45,
  mapSamples = 8000,
}: GlobeProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const animateRef = useRef<(() => void) | null>(null);
  const phiRef = useRef(0);
  const isVisibleRef = useRef(false);
  const [shouldInit, setShouldInit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const markersData = useMemo(
    () =>
      markers.map((marker) => ({
        id: marker.id,
        location: marker.location,
        size: markerSize,
      })),
    [markers, markerSize],
  );

  const arcsData = useMemo(
    () =>
      arcs.map((arc) => ({
        id: arc.id,
        from: arc.from,
        to: arc.to,
      })),
    [arcs],
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const lazyObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldInit(true);
        lazyObserver.disconnect();
      },
      {
        rootMargin: "280px 0px",
        threshold: 0.01,
      },
    );

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible((entry?.isIntersecting ?? false) && (entry?.intersectionRatio ?? 0) > 0.01);
      },
      {
        threshold: [0, 0.01, 0.1],
      },
    );

    lazyObserver.observe(wrapper);
    visibilityObserver.observe(wrapper);

    return () => {
      lazyObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    isVisibleRef.current = isVisible;

    if (!isVisible && animationIdRef.current !== null) {
      window.cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
      return;
    }

    if (
      isVisible &&
      animationIdRef.current === null &&
      animateRef.current
    ) {
      animationIdRef.current = window.requestAnimationFrame(animateRef.current);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!shouldInit) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ro: ResizeObserver | null = null;
    let mountRafId: number | null = null;
    let disposed = false;

    const initGlobe = () => {
      if (disposed || globeRef.current) return;
      const width = canvas.offsetWidth;
      if (!width) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.2);
      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width,
        height: width,
        phi: 0,
        theta,
        dark,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markerElevation,
        markers: markersData,
        arcs: arcsData,
        arcColor,
        arcWidth,
        arcHeight,
        opacity: 0.88,
      });

      phiRef.current = 0;
      animateRef.current = () => {
        const globe = globeRef.current;
        if (!globe) {
          animationIdRef.current = null;
          return;
        }
        if (!isVisibleRef.current) {
          animationIdRef.current = null;
          return;
        }

        phiRef.current += speed;
        globe.update({
          phi: phiRef.current,
          theta,
          dark,
          mapBrightness,
          markerColor,
          baseColor,
          arcColor,
          markerElevation,
          markers: markersData,
          arcs: arcsData,
        });

        animationIdRef.current = window.requestAnimationFrame(animateRef.current!);
      };

      mountRafId = window.requestAnimationFrame(() => {
        canvas.style.opacity = "1";
      });

      if (isVisibleRef.current && animateRef.current && animationIdRef.current === null) {
        animationIdRef.current = window.requestAnimationFrame(animateRef.current);
      }
    };

    if (canvas.offsetWidth > 0) {
      initGlobe();
    } else {
      ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          initGlobe();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      disposed = true;
      if (ro) ro.disconnect();
      if (mountRafId !== null) {
        window.cancelAnimationFrame(mountRafId);
      }
      if (animationIdRef.current !== null) {
        window.cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      animateRef.current = null;
      globeRef.current?.destroy();
      globeRef.current = null;
      canvas.style.opacity = "0";
    };
  }, [
    shouldInit,
    arcColor,
    arcHeight,
    arcWidth,
    arcsData,
    baseColor,
    dark,
    diffuse,
    glowColor,
    mapBrightness,
    mapSamples,
    markerColor,
    markerElevation,
    markersData,
    speed,
    theta,
  ]);

  return (
    <div ref={wrapperRef} className={className}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0,
          transition: "opacity 0.7s ease",
          borderRadius: "9999px",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
