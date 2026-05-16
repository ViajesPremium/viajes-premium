"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import ImageSectionForm from "@/layout/first-form/form";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import styles from "./ctaForm.module.css";
import { usePremiumLandingConfig } from "@/landings/premium/context";

const CTA_FORM_MOBILE_FIGURE_IMAGE = "/images/japon/samuraiFormSola2.webp";

export default function CTAForm() {
  const {
    sections: { ctaForm },
  } = usePremiumLandingConfig();

  const sectionStyle = {
    "--cta-form-bg-image": `url("${ctaForm.backgroundImage}")`,
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

  return (
    <section className={styles.section} style={sectionStyle}>
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
