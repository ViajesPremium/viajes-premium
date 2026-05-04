"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import styles from "./premium-landing-client.module.css";
import type { PremiumLandingConfig } from "@/landings/premium/types";
import { PremiumLandingProvider } from "@/landings/premium/context";
import Hero from "@/layout/hero/hero";
import Snapshot from "@/layout/snapshot/snapshot";
import FirstForm from "@/layout/first-form/first-form";

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
  {
    loading: () => <PinPlaceholder height="100svh" bg="var(--black)" />,
  },
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

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (cancelled) return;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          // lenis.resize() debe ir primero para que Lenis recalcule la altura
          // total de la página antes de que ScrollTrigger recalcule sus triggers.
          window.__lenis?.resize();
          ScrollTrigger.refresh();
        }),
      );
    });

    return () => {
      cancelled = true;
    };
  }, [mounted]);

  return (
    <section id={id} className={className} ref={ref}>
      {mounted ? children : <SectionPlaceholder minHeight={minHeight} bg={bg} />}
    </section>
  );
}

type PremiumLandingClientProps = {
  config: PremiumLandingConfig;
};

export default function PremiumLandingClient({
  config,
}: PremiumLandingClientProps) {
  // useGSAP() en los hijos usa useLayoutEffect → se ejecuta antes de este
  // useEffect. En el momento en que este RAF corre, todos los ScrollTriggers
  // de Snapshot, Itineraries, Includes, etc. ya están registrados.
  // Lenis persiste entre rutas pero no sabe del nuevo contenido hasta que se
  // le notifica explícitamente con resize() + refresh().
  useEffect(() => {
    window.scrollTo(0, 0);
    window.__lenis?.scrollTo(0, { immediate: true });
    window.__lenis?.start();
    document.documentElement.classList.remove("lenis-stopped");
    document.body.classList.remove("lenis-stopped");

    let cancelled = false;
    const rafId = requestAnimationFrame(() => {
      if (cancelled) return;
      void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        if (cancelled) return;
        window.__lenis?.resize();
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
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
