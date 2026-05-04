"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
// 1. IMPORTACIÓN ESTÁTICA OBLIGATORIA
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./premium-landing-client.module.css";
import type { PremiumLandingConfig } from "@/landings/premium/types";
import { PremiumLandingProvider } from "@/landings/premium/context";
import Hero from "@/layout/hero/hero";
import Snapshot from "@/layout/snapshot/snapshot";
import FirstForm from "@/layout/first-form/first-form";

// 2. REGISTRAR GSAP GLOBALMENTE PARA ESTE CLIENTE
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Itineraries = dynamic(() => import("@/layout/itineraries/itineraries"), {
  loading: () => <PinPlaceholder height="110svh" bg="var(--black)" />,
});
const Includes = dynamic(() => import("@/layout/includes/includes"), {
  loading: () => <PinPlaceholder height="100svh" bg="var(--black)" />,
});
const CTAForm = dynamic(() => import("@/layout/form/ctaForm"), {
  loading: () => <PinPlaceholder height="100svh" bg="var(--bg)" />,
});
const Faqs = dynamic(() => import("@/layout/faqs/faqs"), {
  loading: () => <PinPlaceholder height="100svh" bg="var(--bg)" />,
});
const CtaMapMobile = dynamic(
  () => import("@/layout/cta-map-mobile/cta-map-mobile"),
  { loading: () => <PinPlaceholder height="100svh" bg="var(--black)" /> },
);
const Highlights = dynamic(() => import("@/layout/highlights/highlights"));
const Testimonials = dynamic(
  () => import("@/layout/testimonials/testimonials"),
);
const Interlude = dynamic(() => import("@/layout/interlude/interlude"));
const MarqueeSection = dynamic(
  () => import("@/layout/marquee/marquee-section"),
);
const Footer = dynamic(() => import("@/layout/footer/footer"));

function PinPlaceholder({ height, bg }: { height: string; bg?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{ height, width: "100%", backgroundColor: bg }}
    />
  );
}

function SectionPlaceholder({
  minHeight,
  bg,
}: {
  minHeight: string;
  bg?: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{ minHeight, width: "100%", backgroundColor: bg }}
    />
  );
}

type DeferredSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  minHeight: string;
  bg?: string;
  rootMargin?: string;
};

function DeferredSection({
  id,
  children,
  className,
  minHeight,
  bg,
  rootMargin = "800px 0px",
}: DeferredSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window),
  );

  useEffect(() => {
    if (mounted) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setMounted(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  // ELIMINADO: Ya no necesitamos el useEffect con setTimeout aquí.
  // El ResizeObserver global en el Client se encargará de refrescar GSAP
  // automáticamente cuando el componente termine de compilarse en Localhost.

  return (
    <section id={id} className={className} ref={ref}>
      {mounted ? (
        children
      ) : (
        <SectionPlaceholder minHeight={minHeight} bg={bg} />
      )}
    </section>
  );
}

type PremiumLandingClientProps = {
  config: PremiumLandingConfig;
};

export default function PremiumLandingClient({
  config,
}: PremiumLandingClientProps) {
  useEffect(() => {
    // Inicialización
    window.scrollTo(0, 0);
    window.__lenis?.scrollTo(0, { immediate: true });
    window.__lenis?.start();
    document.documentElement.classList.remove("lenis-stopped");
    document.body.classList.remove("lenis-stopped");

    // 3. EL GUARDIÁN INTELIGENTE (Debounced ResizeObserver)
    // Cuando Next.js en local compila un componente dinámico, inyecta múltiples
    // nodos rápidamente. Usamos un "debounce" para esperar a que termine de inyectar
    // antes de recalcular GSAP.
    let debounceTimeout: NodeJS.Timeout;

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        window.__lenis?.resize();
        ScrollTrigger.refresh();
      }, 200); // 200ms de calma tras el último cambio en el DOM
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    // Refresco de respaldo después de un tiempo prudencial por si la hidratación fue lenta
    const fallbackTimeout = setTimeout(() => {
      window.__lenis?.resize();
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(debounceTimeout);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return (
    <PremiumLandingProvider config={config}>
      <main className={styles.main}>
        <section id="inicio">
          <Hero />
        </section>
        <section id="nosotros">
          <Snapshot />
        </section>
        <FirstForm />

        <DeferredSection
          id="highlights"
          className={styles.highlightsLayer}
          minHeight="100svh"
          bg="var(--bg)"
        >
          <Highlights />
        </DeferredSection>

        <section id="itinerarios" className={styles.itinerariesLayer}>
          <Itineraries />
        </section>

        <section id="includes" className={styles.includesLayer}>
          <Includes />
        </section>

        <DeferredSection
          id="testimonials"
          className={styles.testimonialsLayer}
          minHeight="100svh"
          bg="var(--bg)"
        >
          <Testimonials />
        </DeferredSection>

        <DeferredSection id="interlude" minHeight="80svh" bg="var(--bg)">
          <Interlude />
        </DeferredSection>

        <section id="faqs" className={styles.faqsLayer}>
          <Faqs />
        </section>

        <section id="cta-map-mobile" className={styles.ctaMapMobileLayer}>
          <CtaMapMobile />
        </section>

        <section id="form" className={styles.formWrapper}>
          <CTAForm />
        </section>

        <DeferredSection
          id="marquee-footer"
          className={styles.marqueeFooterLayer}
          minHeight="88rem"
          bg="var(--black)"
        >
          <section id="marquee" className={styles.marqueeBlock}>
            <MarqueeSection />
          </section>
          <section id="footer" className={styles.footerBlock}>
            <Footer />
          </section>
        </DeferredSection>
      </main>
    </PremiumLandingProvider>
  );
}
