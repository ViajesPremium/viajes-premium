"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "motion/react";
import styles from "./interlude.module.css";

/* ── Fila de texto con parallax de scroll ── */
type ScrollRowProps = {
  text: string;
  fromX: string;
  toX: string;
  smooth: MotionValue<number>;
};

function ScrollRow({ text, fromX, toX, smooth }: ScrollRowProps) {
  const x = useTransform(smooth, [0, 1], [fromX, toX]);
  return (
    <div className={styles.row}>
      <motion.div style={{ x }} className={styles.track}>
        <span className={styles.chunk}>{text}</span>
        <span className={styles.chunk}>{text}</span>
        <span className={styles.chunk}>{text}</span>
        <span className={styles.chunk}>{text}</span>
      </motion.div>
    </div>
  );
}

/* ── Sección principal ── */
export default function InterludeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 120 });

  return (
    <section className={styles.interlude} ref={sectionRef}>
      <h2 className="srOnly">Mensaje del equipo Japón Premium</h2>
      {/* ── Texto de fondo — estático, solo se mueve con scroll ── */}
      <div className={styles.textLayer} aria-hidden="true">
        <ScrollRow
          text="japon premium experience"
          fromX="0%"
          toX="-18%"
          smooth={smooth}
        />
        <ScrollRow
          text="curaduria atencion precision"
          fromX="-18%"
          toX="0%"
          smooth={smooth}
        />
        <ScrollRow
          text="momentos que si importan"
          fromX="-4%"
          toX="-20%"
          smooth={smooth}
        />
      </div>

      {/* ── Card central ── */}
      <article className={styles.card}>
        {/* Imagen a todo el card con pequeño padding */}
        <div className={styles.imageWrap}>
          <Image
            src="/images/karina-img.webp"
            alt="Asesora de viaje Japon Premium"
            fill
            className={styles.photo}
            sizes="(max-width: 768px) 92vw, 420px"
          />
          <div className={styles.imageOverlay} />
        </div>

        {/* Texto superpuesto */}
        <div className={styles.copy}>
          <p className={styles.role}>Directora Comercial</p>
          <h3 className={styles.name}>Karina Sánchez</h3>
          <p className={styles.subtitle}>
            &quot; Nuestra misión es diseñar experiencias personalizadas para
            que conectes emocionalmente con tu viaje. Creemos que{" "}
            <span className={styles.textHighlight}>
              viajar va más allá de acumular destinos; se trata de crear
              vínculos reales con cada lugar.
            </span>
            &quot;
          </p>
        </div>
      </article>
    </section>
  );
}
