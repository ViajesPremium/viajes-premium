"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lower lerp => smoother and slightly slower response.
const DESKTOP_LERP = 0.04;
const MOBILE_LERP = 0.09;
const DESKTOP_WHEEL_MULTIPLIER = 0.9;
const MOBILE_WHEEL_MULTIPLIER = 0.92;

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const lenis = new Lenis({
      lerp: isMobile ? MOBILE_LERP : DESKTOP_LERP,
      smoothWheel: true,
      wheelMultiplier: isMobile
        ? MOBILE_WHEEL_MULTIPLIER
        : DESKTOP_WHEEL_MULTIPLIER,
      // Let GSAP ticker drive the RAF — keeps Lenis and ScrollTrigger in sync
      autoRaf: false,
    });

    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis virtual scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from the same ticker GSAP animations use
    const tick = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(tick);

    // Prevent GSAP from accumulating lag (would cause stutters after tab switch)
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
