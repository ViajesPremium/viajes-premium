"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import styles from "./first-form.module.css";
import ImageSectionForm, { type ImageSectionFormConfig } from "./form";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";

const STRENGTH = 18;

const firstFormConfig: ImageSectionFormConfig = {
  eyebrow: "Asesoria Privada",
  title: "",
  subtitle: "",
  submitLabel: "Solicita tu propuesta",
  fields: [
    {
      id: "name",
      label: "Nombre",
      type: "text",
      placeholder: "Tu nombre",
      required: true,
    },
    {
      id: "email",
      label: "Correo",
      type: "email",
      placeholder: "tucorreo@ejemplo.com",
      required: true,
    },
    {
      id: "interest",
      label: "Destino de interes",
      type: "text",
      placeholder: "Ej. Kioto, Tokio...",
    },
  ],
};

export default function ImgSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Efecto Parallax opcional (puedes vincularlo a un onMouseMove en el section si lo deseas)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });
  const imgX = useTransform(x, [-1, 1], [-STRENGTH, STRENGTH]);
  const imgY = useTransform(y, [-1, 1], [-STRENGTH, STRENGTH]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <h2 className="srOnly">Cuéntanos cómo imaginas tu viaje a Japón</h2>
      {/* Fondo con movimiento */}
      <motion.div
        className={styles.img}
        aria-hidden="true"
        style={{ x: imgX, y: imgY }}
      />
      <div className={styles.imgOverlay} aria-hidden="true" />

      {/* Contenedor del contenido */}
      <div className={styles.inner}>
        {/* Izquierda: Formulario */}
        <div className={styles.left}>
          <div className={styles.sectionCopy}>
            <BlurredStagger
              text="Propuesta personalizada"
              className={styles.sectionTitle}
              highlights={[
                {
                  word: "personalizada",
                  useGradient: true,
                  gradientColors: ["#BF953F", "#FCF6BA", "#B38728"],
                },
              ]}
            />
            <p className={styles.sectionSubtitle}>
              Cuéntanos cómo imaginas tu viaje a Japón, compártenos tus
              intereses y te ayudaremos a identificar cuál de nuestros 3
              itinerarios se adapta mejor a tu estilo de viaje.
            </p>
          </div>
          <ImageSectionForm config={firstFormConfig} idPrefix="first-form" />

          <div className={styles.mobileGallery} aria-hidden="true">
            <div className={styles.mobileGalleryItem}>
              <Image
                src="/images/japon/geishaFormSola.webp"
                alt="Geisha en Japón"
                width={900}
                height={1400}
                sizes="(max-width: 768px) 100vw, 0px"
                className={styles.mobileGalleryImage}
              />
            </div>
          </div>
        </div>

        {/* Derecha: Vacio para dejar ver la imagen de la geisha */}
        <div className={styles.right}></div>
      </div>
    </section>
  );
}
