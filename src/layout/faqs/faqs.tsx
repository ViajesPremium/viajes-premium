"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "./faqs.module.css";
import accordionStyles from "@/components/ui/accordion/accordion.module.css";
import Badge from "@/components/ui/badge/badge";
import GradientText from "@/components/ui/gradient-text/gradient-text";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";

const FAQS = [
  {
    id: "1",
    question: "¿Japón es un destino complicado para viajar?",
    answer:
      "No, Japón no es un destino complicado si está bien planificado. Aunque el idioma y la logística pueden parecer desafiantes al inicio, el país es seguro, ordenado y fácil de recorrer. Cuando el viaje está bien estructurado, todo fluye con mayor claridad. En Japón Premium cuidamos ese proceso para que la experiencia se viva sin fricción.",
  },
  {
    id: "2",
    question: "¿Se puede viajar a Japón sin hablar japonés?",
    answer:
      "Sí, es posible viajar a Japón sin hablar japonés. En ciudades como Tokio o Kioto hay señalización clara y servicios pensados para viajeros internacionales. Aun así, saber cómo moverse y qué decisiones tomar marca la diferencia en la experiencia por eso nuestros guías hablan español para que no te preocupes por el idioma.",
  },
  {
    id: "3",
    question: "¿Cuántos días se recomiendan para viajar a Japón?",
    answer:
      "Se recomienda viajar entre 10 y 15 días para conocer Japón con mayor profundidad. Este tiempo permite recorrer varias ciudades y equilibrar cultura, gastronomía y experiencias. La duración ideal depende del ritmo del viajero y del tipo de experiencia que quiera construir.",
  },
  {
    id: "4",
    question: "¿Cuál es la mejor temporada para viajar a Japón?",
    answer:
      "No hay una única mejor temporada, depende del tipo de experiencia que buscas. Primavera (Sakuras) y otoño (Momiji) son muy populares por sus paisajes, pero también hay épocas con menos afluencia que permiten disfrutar Japón con mayor tranquilidad.",
  },
  {
    id: "5",
    question: "¿Es seguro viajar a Japón?",
    answer:
      "Sí, Japón es uno de los países más seguros del mundo. Se puede viajar con tranquilidad tanto en grandes ciudades como en zonas más tradicionales. Esa seguridad se aprovecha mucho más cuando el viaje está bien organizado y cada detalle está pensado.",
  },
  {
    id: "6",
    question: "¿Qué tipo de experiencias se pueden vivir en Japón?",
    answer:
      "Japón ofrece una combinación única de cultura, gastronomía, tradición, tecnología y naturaleza. Se pueden recorrer ciudades modernas, templos históricos y paisajes muy distintos en un mismo viaje. En Japón Premium diseñamos cada proyecto para integrar estos contrastes de forma coherente.",
  },
  {
    id: "7",
    question: "¿Es fácil moverse dentro de Japón?",
    answer:
      "Sí, moverse dentro de Japón es fácil gracias a su sistema de transporte eficiente y puntual. Los trenes y conexiones permiten recorrer el país de forma organizada y cómoda.",
  },
  {
    id: "8",
    question:
      "¿Japón es un destino recomendable para viajar en pareja o en familia?",
    answer:
      "Sí, Japón es un destino ideal tanto para viajar en pareja como en familia ya que hay diversos parques de diversiones y experiencias que se disfrutan en compañía. La clave está en diseñar el recorrido según el tipo de experiencia que se quiere vivir.",
  },
];

export default function Faqs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileFiguresRef = useRef<HTMLDivElement | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string>(() => FAQS[0]?.id ?? "");

  // Igual que Snapshot: pin al final sin spacer extra para que la siguiente
  // seccion la cubra naturalmente desde abajo hacia arriba.
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const setupPinnedFaqs = async () => {
      const section = sectionRef.current;
      if (!section) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const st = ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        anticipatePin: 0.72,
        invalidateOnRefresh: true,
      });

      cleanup = () => st.kill();
    };

    void setupPinnedFaqs();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  // ── Scroll animation: progreso de los laterales ──────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const clamp = (value: number, min = 0, max = 1) =>
      Math.min(max, Math.max(min, value));

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInCubic = (t: number) => t * t * t;

    // Curva de movimiento:
    // - Entrada visible: desde que el top toca casi el borde inferior
    //   hasta que sube hacia la zona media del viewport.
    // - Hold largo en pantalla.
    // - Salida tardia solo casi al final.
    const ENTRY_START_TOP_VH = 0.7;
    const ENTRY_END_TOP_VH = 0.3;
    const EXIT_START_BOTTOM_VH = 0.86;

    let rafId: number | null = null;

    const mobileFigures = mobileFiguresRef.current;

    const updateMotionProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const entryStartTop = viewportHeight * ENTRY_START_TOP_VH;
      const entryEndTop = viewportHeight * ENTRY_END_TOP_VH;
      const entryRange = Math.max(entryStartTop - entryEndTop, 1);

      // Entrada perceptible en un tramo mas largo del viewport.
      const entryRaw = clamp((entryStartTop - rect.top) / entryRange);
      const entryProgress = easeOutCubic(entryRaw);

      // Salida tardia: solo cuando el bottom ya va muy abajo en viewport.
      const exitRaw = clamp(
        (viewportHeight * EXIT_START_BOTTOM_VH - rect.bottom) /
          (viewportHeight * EXIT_START_BOTTOM_VH),
      );
      const exitProgress = easeInCubic(exitRaw);

      const motionProgress = clamp(entryProgress * (1 - exitProgress));

      section.style.setProperty(
        "--faq-motion-progress",
        motionProgress.toFixed(4),
      );

      // ── Progreso independiente para las figuras mobile ────────────────────
      // Trackeamos el propio elemento (no la sección entera) porque en mobile
      // el acordeón puede ser muy largo y las figuras están al fondo.
      if (mobileFigures) {
        const fig = mobileFigures.getBoundingClientRect();

        // Entrada: figuras suben desde la parte inferior del viewport
        // Empieza cuando el top toca el borde inferior, termina al 40% del viewport.
        const figEntryRaw = clamp(
          (viewportHeight - fig.top) / (viewportHeight * 0.6),
        );
        const figEntryProgress = easeOutCubic(figEntryRaw);

        // Salida tardía: solo cuando el bottom empieza a subir hacia la mitad
        const figExitRaw = clamp(
          (viewportHeight * 0.65 - fig.bottom) / (viewportHeight * 0.65),
        );
        const figExitProgress = easeInCubic(figExitRaw);

        const figuresProgress = clamp(figEntryProgress * (1 - figExitProgress));

        mobileFigures.style.setProperty(
          "--faq-figures-progress",
          figuresProgress.toFixed(4),
        );
      }
    };

    const requestUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateMotionProgress();
      });
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleFaqOpen = (faqId: string) => {
    if (faqId === openFaqId) return;
    setOpenFaqId(faqId);
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Lateral izquierdo â€” samurai de perfil */}
      <div className={styles.sideLeft}>
        <div className={styles.sideImgFadeLeft} />
      </div>

      {/* â”€â”€ Contenido central â”€â”€ */}
      <div className={styles.center}>
        {/* Encabezado */}
        <div className={styles.header}>
          <Badge text="Preguntas frecuentes" variant="dark" align="center" />

          <GradientText
            colors={["#BF953F", "#FCF6BA", "#B38728", "#FCF6BA"]}
            animationSpeed={6}
            direction="horizontal"
            className={styles.titleGradient}
          >
            <h2 className={styles.title}>Todo lo que necesitas saber</h2>
          </GradientText>

          <BlurredStagger
            text="Resolvemos las dudas más comunes sobre nuestros viajes a Japón. Si no encuentras lo que buscas, escríbenos directamente."
            className={styles.subtitle}
          />

          <div className={styles.contactHint}>
            <p className={styles.contactLabel}>¿Otra pregunta?</p>
            <a
              href="mailto:hola@japonpremium.com"
              className={styles.contactLink}
            >
              hola@japonpremium.com
            </a>
          </div>
        </div>

        {/* AcordeÃ³n */}
        <div className={styles.accordionWrap}>
          <div role="list" aria-label="Preguntas frecuentes">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              const triggerId = `faq-trigger-${faq.id}`;
              const contentId = `faq-content-${faq.id}`;

              return (
                <div
                  key={faq.id}
                  className={accordionStyles.item}
                  role="listitem"
                >
                  <h3 className={accordionStyles.header}>
                    <button
                      id={triggerId}
                      type="button"
                      className={accordionStyles.trigger}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      onClick={() => handleFaqOpen(faq.id)}
                    >
                      {faq.question}
                      <motion.span
                        className={accordionStyles.chevron}
                        animate={{
                          rotate: isOpen ? 180 : 0,
                          opacity: isOpen ? 0.9 : 0.5,
                        }}
                        transition={{
                          duration: 0.28,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        aria-hidden="true"
                      >
                        <ChevronDownIcon width={16} height={16} />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={triggerId}
                        className={accordionStyles.content}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.22, ease: "easeOut" },
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className={accordionStyles.contentInner}>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div ref={mobileFiguresRef} className={styles.mobileFigures} aria-hidden="true">
        <div className={styles.mobileFigureLeft} />
        <div className={styles.mobileFigureRight} />
      </div>

      {/* Lateral derecho â€” geisha de perfil */}
      <div className={styles.sideRight}>
        <div className={styles.sideImgFade} />
      </div>
    </section>
  );
}
