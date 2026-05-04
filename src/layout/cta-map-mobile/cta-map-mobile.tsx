"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./cta-map-mobile.module.css";

const MOBILE_QUERY = "(max-width: 768px)";
const DESKTOP_QUERY = "(min-width: 769px)";
const CTA_MAP_IMAGE = "/images/japon/segundo_formulario_2.webp";
const REVEAL_SCROLL_VH = 1;
const CIRCLE_START_DELAY = 0.45;
const CIRCLE_DURATION = 5;

gsap.registerPlugin(ScrollTrigger);

export default function CtaMapMobile() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealSurfaceRef = useRef<HTMLDivElement>(null);
  const startCircleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let cancelled = false;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (cancelled) return;
          ScrollTrigger.refresh();
          window.__lenis?.resize();
        }),
      );
      return () => {
        cancelled = true;
      };
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      const revealSurface = revealSurfaceRef.current;
      const startCircle = startCircleRef.current;
      if (!section || !revealSurface || !startCircle) return;

      const mm = gsap.matchMedia();

      mm.add(DESKTOP_QUERY, () => {
        const getMaskRadius = () =>
          Math.hypot(window.innerWidth, window.innerHeight) * 1.4;

        gsap.set(revealSurface, {
          "--desktop-mask-r": "14px",
          clipPath: "inset(0% 0% 0% 0%)",
          autoAlpha: 1,
        });
        gsap.set(startCircle, { autoAlpha: 1, scale: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * REVEAL_SCROLL_VH}`,
            pin: true,
            pinSpacing: false,
            scrub: 0.7,
            anticipatePin: 0.2,
            invalidateOnRefresh: true,
            onRefresh: () => {
              window.__lenis?.resize();
            },
          },
        });

        tl.to(
          revealSurface,
          {
            "--desktop-mask-r": () => `${getMaskRadius()}px`,
            duration: CIRCLE_DURATION,
          },
          CIRCLE_START_DELAY,
        )
          .to(
            startCircle,
            {
              autoAlpha: 0,
              scale: 1.35,
              duration: 0.24,
            },
            0,
          )
          .to(
            revealSurface,
            {
              autoAlpha: 0,
              duration: 0.8,
            },
            CIRCLE_START_DELAY + CIRCLE_DURATION - 0.08,
          );

        return () => tl.kill();
      });

      mm.add(MOBILE_QUERY, () => {
        gsap.set(revealSurface, {
          "--desktop-mask-r": "0px",
          autoAlpha: 1,
          yPercent: 0,
        });
        gsap.set(startCircle, { autoAlpha: 0 });
        gsap.set(revealSurface, {
          clipPath: "none",
        });
        return undefined;
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={styles.section} aria-hidden="true">
      <div className={styles.stickyViewport}>
        <div ref={revealSurfaceRef} className={styles.revealSurface}>
          <div className={styles.mapScene}>
            <div className={styles.mapBase} />
            <div className={styles.mapWrap}>
              <Image
                src={CTA_MAP_IMAGE}
                alt="Imagen CTA"
                width={1920}
                height={2000}
                sizes="100vw"
                className={styles.mapImage}
              />
            </div>

            <div ref={startCircleRef} className={styles.startCircle} />
          </div>
        </div>
      </div>
    </section>
  );
}
