"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

type TransitionContextValue = {
  triggerTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue>({
  triggerTransition: () => {},
});

export function useBlogTransition() {
  return useContext(TransitionContext);
}

export function BlogTransitionProvider({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isFirstMount = useRef(true);
  const pendingTransition = useRef(false);

  useEffect(() => {
    // Posición inicial: fuera del viewport por abajo, igual que en destinations
    if (cardRef.current) {
      gsap.set(cardRef.current, {
        yPercent: 100,
        scale: 0.92,
        transformOrigin: "50% 100%",
      });
    }
    if (dimRef.current) {
      gsap.set(dimRef.current, { opacity: 0 });
    }
  }, []);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (!pendingTransition.current) return;
    pendingTransition.current = false;

    // Nueva página lista — resetea la card al estado inicial instantáneamente
    if (cardRef.current) {
      gsap.set(cardRef.current, { yPercent: 100, scale: 0.92 });
    }
    if (dimRef.current) {
      gsap.set(dimRef.current, { opacity: 0 });
    }
  }, [pathname]);

  const triggerTransition = useCallback(
    (href: string) => {
      const card = cardRef.current;
      const dim = dimRef.current;
      if (!card) {
        router.push(href);
        return;
      }

      pendingTransition.current = true;

      const tl = gsap.timeline({
        onComplete: () => router.push(href),
      });

      // Dim sobre la página actual (igual que previousCardDim en destinations)
      if (dim) {
        tl.to(dim, { opacity: 0.13, duration: 0.2 }, 0);
        tl.to(dim, { opacity: 0, duration: 0.8 }, 0.2);
      }

      // Card sube desde abajo con scale: 0.92 → 1, igual que en destinations
      tl.to(
        card,
        {
          yPercent: 0,
          scale: 1,
          duration: 0.9,
          ease: "power2.inOut",
        },
        0,
      );
    },
    [router],
  );

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {/* Dim overlay sobre la página actual */}
      <div
        ref={dimRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          backgroundColor: "#000",
          pointerEvents: "none",
          opacity: 0,
        }}
      />
      {/* Card que sube desde abajo — misma mecánica que destinations */}
      <div
        ref={cardRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "var(--bg, #f3f3f0)",
          willChange: "transform",
          pointerEvents: "none",
          transform: "translateY(100%) scale(0.92)",
          transformOrigin: "50% 100%",
        }}
      />
      {children}
    </TransitionContext.Provider>
  );
}
