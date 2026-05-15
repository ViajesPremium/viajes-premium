"use client";

import { useRef } from "react";
import Image from "next/image";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import { Button } from "@/components/ui/button/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./homeAbout.module.css";

export default function HomeAbout() {
  const aboutRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = aboutRef.current;
      if (!section) return;
      gsap.registerPlugin(ScrollTrigger);

      const preview = section.querySelector<HTMLElement>(
        "[data-home-about-preview]",
      );
      const content = section.querySelector<HTMLElement>(
        '[data-home-about-fade="content"]',
      );

      if (!preview || !content) return;

      let coverScale = 1;
      let startYOffset = 0;
      let contentLift = 0;

      const recalcRevealMetrics = () => {
        const baseWidth = Math.max(1, preview.offsetWidth);
        const baseHeight = Math.max(1, preview.offsetHeight);
        const sx = window.innerWidth / baseWidth;
        const sy = window.innerHeight / baseHeight;
        coverScale = Math.max(sx, sy) * 1.01;
        startYOffset = Math.round(baseHeight * 0.72);
        contentLift = Math.round(window.innerHeight * 0.84);
      };

      const renderReveal = (progress: number) => {
        const p = gsap.utils.clamp(0, 1, progress);
        const motionProgress = gsap.utils.clamp(0, 1, (p - 0.14) / 0.86);
        const eased = gsap.parseEase("power2.inOut")(motionProgress);

        gsap.set(preview, {
          y: gsap.utils.interpolate(startYOffset, 0, eased),
          scale: gsap.utils.interpolate(1, coverScale, eased),
          borderTopLeftRadius: Math.round(14 - 14 * eased),
          borderTopRightRadius: Math.round(14 - 14 * eased),
          force3D: true,
        });

        gsap.set(content, {
          y: gsap.utils.interpolate(0, -contentLift, eased),
          opacity: gsap.utils.interpolate(1, 0.14, eased),
        });
      };

      recalcRevealMetrics();
      renderReveal(0);

      const revealState = { value: 0 };
      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "home-about-pin",
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 3.2, 1700)}`,
          scrub: 0.9,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0.6,
          fastScrollEnd: false,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            recalcRevealMetrics();
            renderReveal(revealState.value);
          },
          onRefresh: () => {
            recalcRevealMetrics();
            renderReveal(revealState.value);
          },
        },
      });

      timeline.to(revealState, {
        value: 1,
        duration: () => Math.max(window.innerHeight * 3.2, 1700),
        ease: "none",
        onUpdate: () => renderReveal(revealState.value),
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: aboutRef },
  );

  const scrollToDestinations = () => {
    document.getElementById("destinations")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={aboutRef}
      data-home-about-panel
      className={styles.aboutPane}
      aria-labelledby="about-us-title"
    >
      <div data-home-about-fade="content" className={styles.aboutContent}>
        <div id="about-us-title" className={styles.aboutTitleWrap}>
          <BlurredStagger
            text="Más de 21 años"
            className={styles.aboutTitleFirst}
            highlights={[
              { word: "años", useGradient: true },
              { word: "21", useGradient: true },
            ]}
          />
          <BlurredStagger
            text="diseñando experiencias"
            className={styles.aboutTitleSecond}
          />
          <BlurredStagger
            text="clase PREMIUM."
            className={styles.aboutTitleThird}
            highlights={[{ word: "PREMIUM", useGradient: true }]}
          />
        </div>

        <Button
          type="button"
          className={styles.aboutCta}
          onClick={scrollToDestinations}
        >
          Explorar destinos
        </Button>
      </div>

      <figure
        data-home-about-preview
        className={styles.aboutBottomPreview}
        aria-hidden="true"
      >
        <div className={styles.aboutBottomPreviewMedia}>
          <Image
            src="/images/viajes-premium/destinos/europa/europa-premium-4.avif"
            alt=""
            fill
            sizes="100vw"
            priority
            className={styles.aboutBottomPreviewImage}
            quality={82}
          />
        </div>
      </figure>
    </section>
  );
}
