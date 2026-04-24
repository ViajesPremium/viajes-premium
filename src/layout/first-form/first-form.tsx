"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import styles from "./first-form.module.css";
import ImageSectionForm from "./form";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import { usePremiumLandingConfig } from "@/landings/premium/context";

const STRENGTH = 18;

export default function ImgSection() {
  const {
    sections: { firstForm },
  } = usePremiumLandingConfig();

  const sectionRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });
  const imgX = useTransform(x, [-1, 1], [-STRENGTH, STRENGTH]);
  const imgY = useTransform(y, [-1, 1], [-STRENGTH, STRENGTH]);

  const sectionStyle = {
    "--first-form-bg-image": `url("${firstForm.backgroundImage}")`,
  } as CSSProperties;

  const titleHighlights = firstForm.sectionTitleHighlightWord
    ? [
        {
          word: firstForm.sectionTitleHighlightWord,
          useGradient: true,
          gradientColors: ["#BF953F", "#FCF6BA", "#B38728"],
        },
      ]
    : [];

  return (
    <section ref={sectionRef} className={styles.section} style={sectionStyle}>
      <h2 className="srOnly">{firstForm.srHeading}</h2>
      <motion.div
        className={styles.img}
        aria-hidden="true"
        style={{ x: imgX, y: imgY }}
      />
      <div className={styles.imgOverlay} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.sectionCopy}>
            <BlurredStagger
              text={firstForm.sectionTitle}
              className={styles.sectionTitle}
              highlights={titleHighlights}
            />
            <p className={styles.sectionSubtitle}>
              {firstForm.sectionSubtitle}
            </p>
          </div>
          <ImageSectionForm
            config={firstForm.formConfig}
            idPrefix="first-form"
            theme="light"
          />

          <div className={styles.mobileGallery} aria-hidden="true">
            <div className={styles.mobileGalleryItem}>
              <Image
                src={firstForm.mobileImage.src}
                alt={firstForm.mobileImage.alt}
                width={900}
                height={1400}
                sizes="(max-width: 768px) 100vw, 0px"
                className={styles.mobileGalleryImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.right} />
      </div>
    </section>
  );
}
