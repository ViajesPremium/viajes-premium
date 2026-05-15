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

        const createHorizontalTween = () => {
          const getRevealDistance = () => Math.max(window.innerHeight * 2.4, 1200);

          const aboutPanel =
            track.querySelector<HTMLElement>("[data-home-about-panel]");
          const aboutPreview =
            aboutPanel?.querySelector<HTMLElement>("[data-home-about-preview]") ?? null;
          const fadeLeft    = aboutPanel?.querySelector<HTMLElement>('[data-home-about-fade="left"]') ?? null;
          const fadeRight   = aboutPanel?.querySelector<HTMLElement>('[data-home-about-fade="right"]') ?? null;
          const fadeTop     = aboutPanel?.querySelector<HTMLElement>('[data-home-about-fade="top"]') ?? null;
          const fadeContent = aboutPanel?.querySelector<HTMLElement>('[data-home-about-fade="content"]') ?? null;

          // offsetLeft ignores CSS transforms, giving the true layout position of
          // HomeAbout, which is exactly how far the track must scroll.
          const getMaxHorizontalScroll = () =>
            Math.max(0, aboutPanel ? aboutPanel.offsetLeft : track.offsetWidth - window.innerWidth);

          if (getMaxHorizontalScroll() <= 0) return;

          let coverScale = 1;
          let startYOffset = 0;
          const recalcRevealMetrics = () => {
            if (!aboutPreview) return;
            const baseWidth = Math.max(1, aboutPreview.offsetWidth);
            const baseHeight = Math.max(1, aboutPreview.offsetHeight);
            const sx = window.innerWidth / baseWidth;
            const sy = window.innerHeight / baseHeight;
            coverScale = Math.max(sx, sy) * 1.02;
            startYOffset = Math.round(baseHeight * 0.78);
          };

          const renderAboutReveal = (progress: number) => {
            if (!aboutPreview) return;
            const p = gsap.utils.clamp(0, 1, progress);
            const eased = gsap.parseEase("power2.inOut")(p);

            gsap.set(aboutPreview, {
              y: gsap.utils.interpolate(startYOffset, 0, eased),
              scale: gsap.utils.interpolate(1, coverScale, eased),
              borderTopLeftRadius: Math.round(14 - 14 * eased),
              borderTopRightRadius: Math.round(14 - 14 * eased),
              force3D: true,
            });

            // Push elements off screen — no opacity, pure motion
            const pushX = window.innerWidth * 0.95 * eased;
            const pushY = window.innerHeight * eased;

            if (fadeLeft)    gsap.set(fadeLeft,    { x: -pushX, force3D: true });
            if (fadeRight)   gsap.set(fadeRight,   { x:  pushX, force3D: true });
            if (fadeTop)     gsap.set(fadeTop,     { y: -pushY * 0.7, force3D: true });
            if (fadeContent) gsap.set(fadeContent, { y: -pushY, force3D: true });
          };

          recalcRevealMetrics();
          renderAboutReveal(0);

          const revealState = { value: 0 };

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: page,
              start: "top top",
              end: () => `+=${getMaxHorizontalScroll() + getRevealDistance()}`,
              scrub: 1.15,
              pin: true,
              anticipatePin: 0.45,
              fastScrollEnd: false,
              refreshPriority: 2,
              invalidateOnRefresh: true,
              onRefreshInit: () => {
                if (aboutPreview) {
                  gsap.set(aboutPreview, {
                    y: startYOffset,
                    scale: 1,
                    transformOrigin: "50% 100%",
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                  });
                }
                if (fadeLeft)    gsap.set(fadeLeft,    { x: 0, opacity: 1, visibility: "visible" });
                if (fadeRight)   gsap.set(fadeRight,   { x: 0, opacity: 1, visibility: "visible" });
                if (fadeTop)     gsap.set(fadeTop,     { y: 0, opacity: 1, visibility: "visible" });
                if (fadeContent) gsap.set(fadeContent, { y: 0, opacity: 1, visibility: "visible" });
                recalcRevealMetrics();
                renderAboutReveal(0);
              },
              onRefresh: () => {
                recalcRevealMetrics();
                renderAboutReveal(revealState.value);
              },
            },
          });

          timeline
            .to(track, {
              x: () => -getMaxHorizontalScroll(),
              duration: () => getMaxHorizontalScroll(),
              ease: "none",
            })
            .to(
              revealState,
              {
                value: 1,
                duration: () => getRevealDistance(),
                ease: "none",
                onUpdate: () => renderAboutReveal(revealState.value),
              },
            );

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        };

        // Scroll horizontal solo en desktop; en mobile las secciones se apilan.
        mm.add("(min-width: 901px)", () => createHorizontalTween());

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

      <section id="destinations" className={styles.destinationsScene}>
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
