"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

// Mismas coordenadas que los polaroids del globe de desktop
const DESTINATION_MARKERS = [
  { location: [35.68, 139.65] as [number, number], size: 0.055 },  // Japón
  { location: [48.86, 2.35] as [number, number], size: 0.042 },    // Europa
  { location: [37.57, 126.98] as [number, number], size: 0.042 },  // Corea
  { location: [45.42, -75.69] as [number, number], size: 0.042 },  // Canadá
  { location: [-13.52, -71.97] as [number, number], size: 0.042 }, // Perú
  { location: [19.43, -99.13] as [number, number], size: 0.042 },  // México
  { location: [28.19, -108.23] as [number, number], size: 0.038 }, // Barrancas
];

interface CobeGlobeLiteProps {
  className?: string;
}

export default function CobeGlobeLite({ className = "" }: CobeGlobeLiteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: { destroy: () => void } | null = null;
    let phi = 1.2;
    let rafId = 0;

    const start = () => {
      // offsetWidth ya tiene el valor correcto porque el canvas tiene aspect-ratio: 1/1
      const size = canvas.offsetWidth;
if (size === 0) {
        // Layout todavía no resuelto — reintentar en el siguiente frame
        rafId = requestAnimationFrame(start);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi,
        theta: 0.2,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 12000,
        mapBrightness: 6,
        baseColor: [0.9, 0.9, 0.9],
        markerColor: [0.82, 0.65, 0.28],
        glowColor: [1, 1, 1],
        markers: DESTINATION_MARKERS,
        onRender: (state) => {
          state.phi = phi;
          phi += 0.004;
        },
      });
    };

    rafId = requestAnimationFrame(start);

    return () => {
      cancelAnimationFrame(rafId);
      globe?.destroy();
    };
  }, []);

  return (
    /*
     * aspect-ratio: 1/1 en el propio canvas — no depende de ningún padre.
     * offsetWidth da el ancho CSS real; height = width (siempre cuadrado).
     */
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", aspectRatio: "1 / 1", display: "block" }}
    />
  );
}
