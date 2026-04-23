"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
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
  interactive?: boolean;
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
  interactive = false,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

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

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!interactive) return;
      pointerInteracting.current = { x: event.clientX, y: event.clientY };
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
      isPausedRef.current = true;
    },
    [interactive],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!interactive || pointerInteracting.current === null) return;

      const deltaX = event.clientX - pointerInteracting.current.x;
      const deltaY = event.clientY - pointerInteracting.current.y;
      dragOffset.current = { phi: deltaX / 320, theta: deltaY / 1050 };

      const now = Date.now();
      if (lastPointer.current) {
        const dt = Math.max(now - lastPointer.current.t, 1);
        const maxVelocity = 0.15;
        velocity.current = {
          phi: Math.max(
            -maxVelocity,
            Math.min(maxVelocity, ((event.clientX - lastPointer.current.x) / dt) * 0.28),
          ),
          theta: Math.max(
            -maxVelocity,
            Math.min(maxVelocity, ((event.clientY - lastPointer.current.y) / dt) * 0.08),
          ),
        };
      }
      lastPointer.current = { x: event.clientX, y: event.clientY, t: now };
    },
    [interactive],
  );

  const handlePointerUp = useCallback(() => {
    if (!interactive) return;

    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
      lastPointer.current = null;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, [interactive]);

  useEffect(() => {
    if (!interactive) return;

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp, interactive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId = 0;
    let mountRafId = 0;
    let phi = 0;
    let ro: ResizeObserver | null = null;
    let initialized = false;

    const initGlobe = () => {
      if (initialized) return;
      const width = canvas.offsetWidth;
      if (!width) return;

      initialized = true;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      globe = createGlobe(canvas, {
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

      const animate = () => {
        if (!globe) return;

        if (!isPausedRef.current) {
          phi += speed;
          if (
            Math.abs(velocity.current.phi) > 0.0001 ||
            Math.abs(velocity.current.theta) > 0.0001
          ) {
            phiOffsetRef.current += velocity.current.phi;
            thetaOffsetRef.current += velocity.current.theta;
            velocity.current.phi *= 0.95;
            velocity.current.theta *= 0.95;
          }

          const thetaMin = -0.38;
          const thetaMax = 0.38;
          if (thetaOffsetRef.current < thetaMin) {
            thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * 0.1;
          } else if (thetaOffsetRef.current > thetaMax) {
            thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * 0.1;
          }
        }

        globe.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: theta + thetaOffsetRef.current + dragOffset.current.theta,
          dark,
          mapBrightness,
          markerColor,
          baseColor,
          arcColor,
          markerElevation,
          markers: markersData,
          arcs: arcsData,
        });

        animationId = window.requestAnimationFrame(animate);
      };

      animate();
      mountRafId = window.requestAnimationFrame(() => {
        canvas.style.opacity = "1";
      });
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
      if (ro) ro.disconnect();
      if (mountRafId) window.cancelAnimationFrame(mountRafId);
      if (animationId) window.cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  }, [
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
    <div className={className}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: interactive ? "grab" : "default",
          transition: "opacity 0.7s ease",
          borderRadius: "9999px",
          touchAction: interactive ? "pan-y" : "auto",
        }}
      />
    </div>
  );
}
