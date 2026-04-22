"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import styles from "./first-form.module.css";
import ImageSectionForm, { type ImageSectionFormConfig } from "./form";

const STRENGTH = 18;

const firstFormConfig: ImageSectionFormConfig = {
  eyebrow: "Asesoria Privada",
  title: "Disena tu viaje a Japon",
  subtitle: "Un itinerario curado a tu ritmo, con acompanamiento experto.",
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
      {/* Fondo con movimiento */}
      <motion.div className={styles.img} aria-hidden="true" style={{ x: imgX, y: imgY }} />
      <div className={styles.imgOverlay} aria-hidden="true" />

      {/* Contenedor del contenido */}
      <div className={styles.inner}>
        {/* Izquierda: Formulario */}
        <div className={styles.left}>
          <ImageSectionForm config={firstFormConfig} idPrefix="first-form" />
        </div>

        {/* Derecha: Vacio para dejar ver la imagen de la geisha */}
        <div className={styles.right}></div>
      </div>
    </section>
  );
}
