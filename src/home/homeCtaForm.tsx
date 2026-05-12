"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import ImageSectionForm, {
  type ImageSectionFormConfig,
} from "@/layout/first-form/form";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import styles from "./homeCtaForm.module.css";

const CTA_FORM_MOBILE_BACKGROUND_IMAGE = "/images/japon/fullblack.webp";
const CTA_FORM_MOBILE_FIGURE_IMAGE = "/images/japon/samuraiFormSola2.webp";

const HOME_CTA_FORM = {
  srHeading: "Formulario de contacto Japon Premium",
  sectionTitle: "Ultima oportunidad",
  sectionTitleHighlightWord: "oportunidad",
  sectionSubtitle:
    "Completa tus datos y da el primer paso hacia tu viaje a Japon, disenado a tu medida por Japon PREMIUM.",
  backgroundImage: "/images/japon/samuraiForm.webp",
  formTheme: "terra" as const,
  formConfig: {
    eyebrow: "",
    title: "",
    subtitle: "",
    submitLabel: "Solicita tu propuesta",
    contactEmail: "reservaciones@viajespremium.com.mx",
    contactPhoneDisplay: "+52 55 4161 9428",
    contactPhoneLink: "+525541619428",
    experienceOptions: [
      {
        label: "Alma de Japon — Espiritual y de bienestar",
        value: "alma-de-japon",
      },
      {
        label: "Japon Pop — Anime, tecnologia y cultura pop",
        value: "japon-pop",
      },
      {
        label: "El Camino del Shogun — Autentico y cultural",
        value: "camino-del-shogun",
      },
      { label: "Otro", value: "otro" },
    ],
  } as ImageSectionFormConfig,
};

export default function HomeCtaForm() {
  const sectionStyle = {
    "--cta-form-bg-image": `url("${HOME_CTA_FORM.backgroundImage}")`,
    "--cta-form-mobile-bg-image": `url("${CTA_FORM_MOBILE_BACKGROUND_IMAGE}")`,
  } as CSSProperties;

  const titleHighlights =
    HOME_CTA_FORM.sectionTitle && HOME_CTA_FORM.sectionTitleHighlightWord
      ? [
          {
            word: HOME_CTA_FORM.sectionTitleHighlightWord,
            useGradient: true,
            gradientColors: ["#BF953F", "#FCF6BA", "#B38728"],
          },
        ]
      : [];

  return (
    <section className={styles.section} style={sectionStyle}>
      <h2 className="srOnly">{HOME_CTA_FORM.srHeading}</h2>

      <div className={styles.stage}>
        <div className={styles.bgImage} aria-hidden="true" />
        <div className={styles.bgOverlay} aria-hidden="true" />

        <div className={styles.formLayer}>
          <div className={styles.inner}>
            <div className={styles.leftPane} aria-hidden="true" />

            <div className={styles.rightPane}>
              <div className={styles.sectionCopy}>
                <BlurredStagger
                  text={HOME_CTA_FORM.sectionTitle}
                  className={styles.sectionTitle}
                  highlights={titleHighlights}
                />
                <p className={styles.sectionSubtitle}>
                  {HOME_CTA_FORM.sectionSubtitle}
                </p>
              </div>

              <div className={styles.formShell}>
                <ImageSectionForm
                  config={HOME_CTA_FORM.formConfig}
                  idPrefix="home-cta-form"
                  theme={HOME_CTA_FORM.formTheme}
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
