"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import styles from "./japon-premium.module.css";

// ── Imports estáticos: above-the-fold, se necesitan en el primer paint ────────
import Hero from "@/layout/hero/hero";
import Snapshot from "@/layout/snapshot/snapshot";
import FirstForm from "@/layout/first-form/first-form";

// ── Dynamic SIN defer: tienen pin:true en ScrollTrigger ───────────────────────
// Se separan en su propio chunk (code-split) pero se renderizan de inmediato
// para que ScrollTrigger mida el documento completo desde el inicio.
// Poner estas secciones detrás de un IntersectionObserver causa que el pin
// se calcule con un DOM más corto (el placeholder) → scroll atascado.
const Itineraries = dynamic(() => import("@/layout/itineraries/itineraries"), {
  loading: () => <PinPlaceholder height="110vh" bg="var(--black)" />,
});
const Includes = dynamic(() => import("@/layout/includes/includes"), {
  loading: () => <PinPlaceholder height="100vh" bg="var(--black)" />,
});
const CTAForm = dynamic(() => import("@/layout/form/ctaForm"), {
  loading: () => <PinPlaceholder height="100svh" bg="var(--bg)" />,
});

// ── Dynamic CON defer: sin pinning, se activan al acercarse al viewport ───────
const Highlights = dynamic(() => import("@/layout/highlights/highlights"));
const Testimonials = dynamic(
  () => import("@/layout/testimonials/testimonials"),
);
const Interlude = dynamic(() => import("@/layout/interlude/interlude"));
const Faqs = dynamic(() => import("@/layout/faqs/faqs"));
const MarqueeSection = dynamic(
  () => import("@/layout/marquee/marquee-section"),
);
const Footer = dynamic(() => import("@/layout/footer/footer"));

// ── Placeholder mientras carga el chunk de una sección con pin ────────────────
function PinPlaceholder({ height, bg }: { height: string; bg?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{ height, width: "100%", backgroundColor: bg }}
    />
  );
}

// ── Placeholder genérico para secciones diferidas ─────────────────────────────
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

// ── DeferredSection ───────────────────────────────────────────────────────────
// Sólo usar en secciones que NO tengan GSAP pin:true.
// Muestra un placeholder hasta que la sección se acerca al viewport,
// luego monta el componente real y refresca ScrollTrigger.
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

  // Tras montar el componente real, refrescar ScrollTrigger (para que los
  // pines recalculen offsets) y notificar a Lenis (para que recalcule su
  // límite de scroll con el nuevo alto del documento).
  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (cancelled) return;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          window.__lenis?.resize();
        }),
      );
    });

    return () => {
      cancelled = true;
    };
  }, [mounted]);

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

// ── Página ────────────────────────────────────────────────────────────────────
export default function JaponPremiumClient() {
  return (
    <main className={styles.main}>
      {/* ── Above the fold ─────────────────────────────────────────── */}
      <Hero />
      <Snapshot />
      <FirstForm />

      {/* ── Sin pin: carga diferida por IntersectionObserver ────────── */}
      <DeferredSection
        id="highlights"
        className={styles.highlightsLayer}
        minHeight="100vh"
        bg="var(--bg)"
      >
        <Highlights />
      </DeferredSection>

      {/* ── Con pin: chunk separado, render inmediato ───────────────── */}
      <section id="itinerarios" className={styles.itinerariesLayer}>
        <Itineraries />
      </section>

      <section id="includes" className={styles.includesLayer}>
        <Includes />
      </section>

      {/* ── Sin pin: carga diferida ──────────────────────────────────── */}
      <DeferredSection
        id="testimonials"
        className={styles.testimonialsLayer}
        minHeight="100vh"
        bg="var(--bg)"
      >
        <Testimonials />
      </DeferredSection>

      <DeferredSection id="interlude" minHeight="80vh" bg="var(--bg)">
        <Interlude />
      </DeferredSection>

      <DeferredSection id="faqs" minHeight="100vh" bg="var(--bg)">
        <Faqs />
      </DeferredSection>

      {/* ── Con pin: chunk separado, render inmediato ───────────────── */}
      <section id="form">
        <CTAForm />
      </section>

      {/* ── Sin pin: carga diferida ──────────────────────────────────── */}
      <DeferredSection id="marquee" minHeight="28rem" bg="var(--bg)">
        <MarqueeSection />
      </DeferredSection>

      <DeferredSection id="footer" minHeight="60vh" bg="#000000">
        <Footer />
      </DeferredSection>
    </main>
  );
}
