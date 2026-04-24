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
  return (
    <PremiumLandingProvider config={config}>
      <main className={styles.main}>
        <section id="inicio">
          <Hero />
        </section>
        <Snapshot />
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

        <section id="form" className={styles.formWrapper}>
          <CTAForm />
        </section>

        <DeferredSection id="marquee" minHeight="28rem" bg="var(--bg)">
          <MarqueeSection />
        </DeferredSection>

        <DeferredSection id="footer" minHeight="60svh" bg="#000000">
          <Footer />
        </DeferredSection>
      </main>
    </PremiumLandingProvider>
  );
}
