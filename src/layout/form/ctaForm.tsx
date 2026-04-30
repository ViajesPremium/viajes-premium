"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ImageSectionForm from "@/layout/first-form/form";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import styles from "./ctaForm.module.css";
import { usePremiumLandingConfig } from "@/landings/premium/context";

const CTA_FORM_MOBILE_BACKGROUND_IMAGE = "/images/japon/fullblack.webp";
const CTA_FORM_MOBILE_FIGURE_IMAGE = "/images/japon/samuraiFormSola.webp";
const DESKTOP_QUERY = "(min-width: 769px)";
const MOBILE_QUERY = "(max-width: 768px)";
const CTA_FORM_PIN_VH = 0.72;
const CTA_FORM_PIN_MOBILE_VH = 1.15;

gsap.registerPlugin(ScrollTrigger);

export default function CTAForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    sections: { ctaForm },
  } = usePremiumLandingConfig();

  const sectionStyle = {
    "--cta-form-bg-image": `url("${ctaForm.backgroundImage}")`,
    "--cta-form-mobile-bg-image": `url("${CTA_FORM_MOBILE_BACKGROUND_IMAGE}")`,
  } as CSSProperties;

  const titleHighlights =
    ctaForm.sectionTitle && ctaForm.sectionTitleHighlightWord
      ? [
          {
            word: ctaForm.sectionTitleHighlightWord,
            useGradient: true,
            gradientColors: ["#BF953F", "#FCF6BA", "#B38728"],
          },
        ]
      : [];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(DESKTOP_QUERY, () => {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * CTA_FORM_PIN_VH}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0.2,
          invalidateOnRefresh: true,
          onRefresh: () => window.__lenis?.resize(),
        });

        return () => trigger.kill();
      });

      mm.add(MOBILE_QUERY, () => {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * CTA_FORM_PIN_MOBILE_VH}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0.2,
          invalidateOnRefresh: true,
          onRefresh: () => window.__lenis?.resize(),
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={styles.section} style={sectionStyle}>
      <h2 className="srOnly">{ctaForm.srHeading}</h2>

      <div className={styles.stage}>
        <div className={styles.bgImage} aria-hidden="true" />
        <div className={styles.bgOverlay} aria-hidden="true" />

        <div className={styles.formLayer}>
          <div className={styles.inner}>
            <div className={styles.leftPane} aria-hidden="true" />

            <div className={styles.rightPane}>
              <div className={styles.sectionCopy}>
                {ctaForm.sectionTitle && (
                  <BlurredStagger
                    text={ctaForm.sectionTitle}
                    className={styles.sectionTitle}
                    highlights={titleHighlights}
                  />
                )}
                {ctaForm.sectionSubtitle && (
                  <p className={styles.sectionSubtitle}>
                    {ctaForm.sectionSubtitle}
                  </p>
                )}
              </div>

              <div className={styles.formShell}>
                <ImageSectionForm
                  config={ctaForm.formConfig}
                  idPrefix="cta-form"
                  theme={ctaForm.formTheme ?? "light"}
                />
              </div>

              <div className={styles.mobileGallery} aria-hidden="true">
                <div className={styles.mobileGalleryItem}>
                  <Image
                    src={CTA_FORM_MOBILE_FIGURE_IMAGE}
                    alt=""
                    width={900}
                    height={1400}
                    sizes="(max-width: 768px) 100vw, 0px"
                    className={styles.mobileGalleryImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
