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

function lockScroll() {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = "hidden";
  // Compensar el ancho del scrollbar para evitar layout shift
  if (scrollbarWidth > 0) {
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
  }
}

function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.documentElement.style.paddingRight = "";
}

export function BlogTransitionProvider({ children }: { children: ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isFirstMount = useRef(true);
  const pendingTransition = useRef(false);

  useEffect(() => {
    gsap.set(panelRef.current, { y: "100vh" });
  }, []);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (!pendingTransition.current) return;
    pendingTransition.current = false;

    gsap.to(panelRef.current, {
      y: "-100vh",
      duration: 0.6,
      ease: "expo.inOut",
      onComplete: () => {
        gsap.set(panelRef.current, { y: "100vh" });
        // Scroll libre solo cuando el panel ya salió completamente
        unlockScroll();
      },
    });
  }, [pathname]);

  const triggerTransition = useCallback(
    (href: string) => {
      const panel = panelRef.current;
      if (!panel) {
        router.push(href);
        return;
      }

      pendingTransition.current = true;
      // Bloquear scroll antes de animar para que el scrollbar no aparezca
      lockScroll();

      gsap.fromTo(
        panel,
        { y: "100vh" },
        {
          y: "0vh",
          duration: 0.6,
          ease: "expo.inOut",
          onComplete: () => router.push(href),
        },
      );
    },
    [router],
  );

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      <div
        ref={panelRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "#16181b",
          willChange: "transform",
          pointerEvents: "none",
        }}
      />
      {children}
    </TransitionContext.Provider>
  );
}
