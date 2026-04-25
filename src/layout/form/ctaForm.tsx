"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageSectionForm from "@/layout/first-form/form";
import styles from "./ctaForm.module.css";
import { usePremiumLandingConfig } from "@/landings/premium/context";

gsap.registerPlugin(ScrollTrigger);

const CTA_FORM_SCROLL_TUNING = {
  // Reducido drásticamente: con Lenis lerp=0.08 ya hay suavizado.
  // Doble suavizado (Lenis + GSAP scrub alto) = tirones visibles.
  // Se mantiene un valor pequeño para el efecto cinematográfico de las puertas.
  desktopScrub: 0.28,
  mobileScrub: 0.14,
  pinAnticipation: 0.4,
} as const;

export default function CTAForm() {
  const {
    sections: { ctaForm },
  } = usePremiumLandingConfig();

  const sectionRef = useRef<HTMLElement>(null);
  const shojiRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const roomGlowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const shoji = shojiRef.current;
      const base = baseRef.current;
      const leftDoor = leftDoorRef.current;
      const rightDoor = rightDoorRef.current;
      const form = formRef.current;
      const roomGlow = roomGlowRef.current;

      if (
        !section ||
        !shoji ||
        !base ||
        !leftDoor ||
        !rightDoor ||
        !form ||
        !roomGlow
      ) {
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
      const getOpenDistance = () => (isMobile() ? 10 : 18);
      const getExitDistance = () => (isMobile() ? 76 : 108);
      const getPinDistance = () =>
        window.innerHeight * (isMobile() ? 1.55 : 3.15);
      const getHoldDuration = () => (isMobile() ? 0.45 : 1.15);
      const getFinalScale = () => (isMobile() ? 1.34 : 1.55);
      const getFinalBlur = () => (isMobile() ? "5px" : "8px");
      const scrubStrength = isMobile()
        ? CTA_FORM_SCROLL_TUNING.mobileScrub
        : CTA_FORM_SCROLL_TUNING.desktopScrub;

      if (prefersReducedMotion) {
        gsap.set(shoji, { autoAlpha: 0 });
        gsap.set(base, { autoAlpha: 0 });
        gsap.set([leftDoor, rightDoor], { autoAlpha: 0 });
        gsap.set(form, { autoAlpha: 1, scale: 1, y: 0 });
        gsap.set(roomGlow, { autoAlpha: 0.08, scale: 1 });
        return;
      }

      gsap.set(base, { autoAlpha: 1, filter: "blur(0px)", force3D: true });
      gsap.set(leftDoor, { xPercent: -2 });
      gsap.set(rightDoor, { xPercent: 2 });
      gsap.set([leftDoor, rightDoor], {
        autoAlpha: 1,
        filter: "blur(0px)",
        force3D: true,
      });
      gsap.set(shoji, {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        force3D: true,
      });
      gsap.set(form, { autoAlpha: 1, scale: 1, y: 0 });
      gsap.set(roomGlow, { autoAlpha: 0.26, scale: 0.9 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getPinDistance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: CTA_FORM_SCROLL_TUNING.pinAnticipation,
          scrub: scrubStrength,
          invalidateOnRefresh: true,
          onRefresh: () => {
            window.__lenis?.resize();
          },
        },
      });

      timeline
        .to(leftDoor, { xPercent: () => -getOpenDistance(), duration: 1 }, 0)
        .to(rightDoor, { xPercent: () => getOpenDistance(), duration: 1 }, 0)
        .to(roomGlow, { autoAlpha: 0.55, scale: 1, duration: 0.4 }, 1.25)
        .to(
          leftDoor,
          {
            xPercent: () => -(getOpenDistance() + getExitDistance()),
            scale: 1.06,
            duration: 0.88,
          },
          1.5,
        )
        .to(
          rightDoor,
          {
            xPercent: () => getOpenDistance() + getExitDistance(),
            scale: 1.06,
            duration: 0.88,
          },
          1.5,
        )
        .to(
          shoji,
          {
            scale: () => getFinalScale(),
            filter: () => `blur(${getFinalBlur()})`,
            duration: 0.88,
          },
          1.5,
        )
        .to(
          [leftDoor, rightDoor],
          { autoAlpha: 0, filter: "blur(4px)", duration: 0.42 },
          1.86,
        )
        .to(base, { autoAlpha: 0, filter: "blur(6px)", duration: 0.56 }, 1.5)
        .to(roomGlow, { autoAlpha: 0.06, duration: 0.1 }, 1.72);

      timeline.to({}, { duration: getHoldDuration() });
    },
    { scope: sectionRef },
  );

  const sectionStyle = {
    "--cta-form-bg-image": `url("${ctaForm.backgroundImage}")`,
  } as CSSProperties;

  return (
    <section ref={sectionRef} className={styles.section} style={sectionStyle}>
      <h2 className="srOnly">{ctaForm.srHeading}</h2>
      <div className={styles.stage}>
        <div ref={roomGlowRef} className={styles.roomGlow} aria-hidden="true" />

        <div ref={shojiRef} className={styles.shojiLayer} aria-hidden="true">
          <div ref={baseRef} className={styles.baseWrap}>
            <Image
              src={ctaForm.shojiBaseImage}
              alt=""
              fill
              sizes="100vw"
              className={styles.baseImage}
            />
          </div>

          <div ref={leftDoorRef} className={styles.leftDoor}>
            <Image
              src={ctaForm.shojiLeftImage}
              alt=""
              fill
              sizes="100vw"
              className={styles.doorImage}
            />
          </div>

          <div ref={rightDoorRef} className={styles.rightDoor}>
            <Image
              src={ctaForm.shojiRightImage}
              alt=""
              fill
              sizes="100vw"
              className={styles.doorImage}
            />
          </div>
        </div>

        <div ref={formRef} className={styles.formLayer}>
          <div className={styles.formShell}>
            <ImageSectionForm
              config={ctaForm.formConfig}
              idPrefix="cta-form"
              theme={ctaForm.formTheme ?? "light"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
