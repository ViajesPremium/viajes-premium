"use client";

import "@/vision/vision.css";
import styles from "./page.module.css";
import homeHorizontalStyles from "@/home/homeHorizontal.module.css";
import HomeHero from "@/home/homeHero";
import HomeGlobe from "@/home/homeGlobe";
import HomeAbout from "@/home/homeAbout";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { DEFAULT_SITE_CONFIG } from "@/config/default-site-config";

const Destinations = dynamic(() => import("@/home/destinations"), {
  ssr: false,
  loading: () => <div className={styles.destinationsFallback} aria-hidden="true" />,
});
const HomeFaqs = dynamic(() => import("@/home/homeFaqs"), {
  ssr: false,
  loading: () => <div className={styles.faqsFallback} aria-hidden="true" />,
});
const HomeTestimonials = dynamic(() => import("@/home/homeTestimonials"), {
  ssr: false,
  loading: () => <div className={styles.sectionFallback} aria-hidden="true" />,
});
const Footer = dynamic(() => import("@/layout/footer/footer"), {
  ssr: false,
  loading: () => <div className={styles.footerFallback} aria-hidden="true" />,
});
const HomeCtaForm = dynamic(() => import("@/home/homeCtaForm"), {
  ssr: false,
  loading: () => <div className={styles.sectionFallback} aria-hidden="true" />,
});
const HomeMarquee = dynamic(() => import("@/home/homeMarquee"), {
  ssr: false,
  loading: () => <div className={styles.sectionFallback} aria-hidden="true" />,
});

export default function Home() {
  const horizontalRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const page = horizontalRef.current;
      const track = trackRef.current;
      if (!page || !track) return;

      let disposed = false;
      let cleanup: (() => void) | undefined;

      void (async () => {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (disposed) return;

        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();

        const createHorizontalTween = (isMobileViewport: boolean) => {
          const getMaxHorizontalScroll = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          if (getMaxHorizontalScroll() <= 0) return;

          const tween = gsap.to(track, {
            x: () => -getMaxHorizontalScroll(),
            ease: "none",
            scrollTrigger: {
              trigger: page,
              start: "top top",
              end: () => `+=${getMaxHorizontalScroll()}`,
              scrub: isMobileViewport ? 1 : 1.25,
              pin: true,
              anticipatePin: isMobileViewport ? 0.25 : 0.4,
              fastScrollEnd: true,
              refreshPriority: 2,
              invalidateOnRefresh: true,
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        };

        // Scroll horizontal solo en desktop; en mobile las secciones se apilan.
        mm.add("(min-width: 901px)", () => createHorizontalTween(false));

        cleanup = () => {
          mm.revert();
        };
      })();

      return () => {
        disposed = true;
        cleanup?.();
      };
    },
    { scope: horizontalRef },
  );

  return (
    <main className={styles.page}>
      <section ref={horizontalRef} className={styles.horizontalScene}>
        <div ref={trackRef} className={styles.track}>
          <section
            className={homeHorizontalStyles.container}
            aria-label="Hero y About Us"
          >
            <HomeHero />
            <HomeGlobe />
            <HomeAbout />
          </section>
        </div>
      </section>

      <section className={styles.destinationsScene}>
        <Destinations embedded />
      </section>

      <section className={styles.testimonialsScene}>
        <HomeTestimonials />
      </section>

      <section className={styles.faqScene}>
        <HomeFaqs />
      </section>

      <section className={styles.ctaFormScene}>
        <HomeCtaForm />
      </section>

      <section className={styles.marqueeScene}>
        <HomeMarquee />
      </section>

      <section className={styles.footerScene}>
        <Footer config={DEFAULT_SITE_CONFIG.footer} />
      </section>
    </main>
  );
}
