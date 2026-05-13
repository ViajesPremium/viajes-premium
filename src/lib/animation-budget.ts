"use client";

import { useEffect, useState } from "react";

const LOW_END_RAM_THRESHOLD_GB = 4;

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  hardwareConcurrency?: number;
  connection?: {
    saveData?: boolean;
  };
};

function isTouchLikeDevice() {
  return (
    window.matchMedia("(hover: none), (pointer: coarse)").matches ||
    window.matchMedia("(max-width: 1024px)").matches
  );
}

export function isLowEndMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  if (!isTouchLikeDevice()) return false;

  const nav = navigator as NavigatorWithHints;
  if (typeof nav.deviceMemory === "number") {
    return nav.deviceMemory <= LOW_END_RAM_THRESHOLD_GB;
  }

  // Fallback conservador para navegadores sin deviceMemory (ej. iOS Safari).
  const lowCoreCount =
    typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
  const saveDataEnabled = nav.connection?.saveData === true;
  return lowCoreCount || saveDataEnabled;
}

export function areAnimationsEnabledForDevice(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return !isLowEndMobileDevice();
}

export function useAnimationsEnabled() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    return areAnimationsEnabledForDevice();
  });

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerMq = window.matchMedia("(hover: none), (pointer: coarse)");
    const widthMq = window.matchMedia("(max-width: 1024px)");

    const recompute = () => {
      setEnabled(areAnimationsEnabledForDevice());
    };

    recompute();
    motionMq.addEventListener("change", recompute);
    pointerMq.addEventListener("change", recompute);
    widthMq.addEventListener("change", recompute);

    return () => {
      motionMq.removeEventListener("change", recompute);
      pointerMq.removeEventListener("change", recompute);
      widthMq.removeEventListener("change", recompute);
    };
  }, []);

  return enabled;
}

