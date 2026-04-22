"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import styles from "./japon-premium.module.css";
import Hero from "@/layout/hero/hero";

type DeferredSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  minHeight: string;
  backgroundColor?: string;
  rootMargin?: string;
};

type SectionPlaceholderProps = {
  minHeight: string;
  backgroundColor?: string;
};

function SectionPlaceholder({ minHeight, backgroundColor }: SectionPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        minHeight,
        width: "100%",
        backgroundColor,
      }}
    />
  );
}

function DeferredSection({
  id,
  children,
  className,
  minHeight,
  backgroundColor,
  rootMargin = "900px 0px",
}: DeferredSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldRender, setShouldRender] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window),
  );

  useEffect(() => {
    if (shouldRender) {
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;

    let cancelled = false;

    const refreshScrollTriggers = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    };

    void refreshScrollTriggers();

    return () => {
      cancelled = true;
    };
  }, [shouldRender]);

  return (
    <section id={id} className={className} ref={sectionRef}>
      {shouldRender ? (
        children
      ) : (
        <SectionPlaceholder
          minHeight={minHeight}
          backgroundColor={backgroundColor}
        />
      )}
    </section>
  );
}

const Faqs = dynamic(() => import("@/layout/faqs/faqs"), {
  loading: () => (
    <SectionPlaceholder minHeight="100vh" backgroundColor="var(--bg)" />
  ),
});

const Snapshot = dynamic(() => import("@/layout/snapshot/snapshot"), {
  loading: () => (
    <SectionPlaceholder minHeight="100vh" backgroundColor="var(--bg)" />
  ),
});

const FirstForm = dynamic(() => import("@/layout/first-form/first-form"), {
  loading: () => (
    <SectionPlaceholder minHeight="100svh" backgroundColor="var(--bg)" />
  ),
});

const Highlights = dynamic(() => import("@/layout/highlights/highlights"), {
  loading: () => (
    <SectionPlaceholder minHeight="100vh" backgroundColor="var(--bg)" />
  ),
});

const Itineraries = dynamic(() => import("@/layout/itineraries/itineraries"), {
  loading: () => (
    <SectionPlaceholder minHeight="110vh" backgroundColor="var(--black)" />
  ),
});

const Includes = dynamic(() => import("@/layout/includes/includes"), {
  loading: () => (
    <SectionPlaceholder minHeight="100vh" backgroundColor="var(--black)" />
  ),
});

const Testimonials = dynamic(() => import("@/layout/testimonials/testimonials"), {
  loading: () => (
    <SectionPlaceholder minHeight="100vh" backgroundColor="var(--bg)" />
  ),
});

const Interlude = dynamic(() => import("@/layout/interlude/interlude"), {
  loading: () => (
    <SectionPlaceholder minHeight="80vh" backgroundColor="var(--bg)" />
  ),
});

const CTAForm = dynamic(() => import("@/layout/form/ctaForm"), {
  loading: () => (
    <SectionPlaceholder minHeight="100svh" backgroundColor="var(--bg)" />
  ),
});

const MarqueeSection = dynamic(() => import("@/layout/marquee/marquee-section"), {
  loading: () => (
    <SectionPlaceholder minHeight="28rem" backgroundColor="var(--bg)" />
  ),
});

const Footer = dynamic(() => import("@/layout/footer/footer"), {
  loading: () => (
    <SectionPlaceholder minHeight="100svh" backgroundColor="#000000" />
  ),
});

export default function JaponPremiumClient() {
  return (
    <main className={styles.main}>
      <Hero />

      <DeferredSection
        id="snapshot"
        minHeight="100vh"
        backgroundColor="var(--bg)"
        rootMargin="1400px 0px"
      >
        <Snapshot />
      </DeferredSection>

      <DeferredSection
        id="first-form"
        minHeight="100svh"
        backgroundColor="var(--bg)"
        rootMargin="1300px 0px"
      >
        <FirstForm />
      </DeferredSection>

      <DeferredSection
        id="highlights"
        className={styles.highlightsLayer}
        minHeight="100vh"
        backgroundColor="var(--bg)"
        rootMargin="1200px 0px"
      >
        <Highlights />
      </DeferredSection>

      <DeferredSection
        id="itinerarios"
        className={styles.itinerariesLayer}
        minHeight="110vh"
        backgroundColor="var(--black)"
        rootMargin="1200px 0px"
      >
        <Itineraries />
      </DeferredSection>

      <section id="includes" className={styles.includesLayer}>
        <Includes />
      </section>

      <DeferredSection
        id="testimonials"
        className={styles.testimonialsLayer}
        minHeight="100vh"
        backgroundColor="var(--bg)"
        rootMargin="1000px 0px"
      >
        <Testimonials />
      </DeferredSection>

      <DeferredSection
        id="interlude"
        minHeight="80vh"
        backgroundColor="var(--bg)"
        rootMargin="1000px 0px"
      >
        <Interlude />
      </DeferredSection>

      <DeferredSection
        id="faqs"
        minHeight="100vh"
        backgroundColor="var(--bg)"
        rootMargin="1000px 0px"
      >
        <Faqs />
      </DeferredSection>

      <section id="form">
        <CTAForm />
      </section>

      <DeferredSection
        id="marquee"
        minHeight="28rem"
        backgroundColor="var(--bg)"
        rootMargin="1000px 0px"
      >
        <MarqueeSection />
      </DeferredSection>

      <DeferredSection
        id="footer"
        minHeight="100svh"
        backgroundColor="#000000"
        rootMargin="1200px 0px"
      >
        <Footer />
      </DeferredSection>
    </main>
  );
}
