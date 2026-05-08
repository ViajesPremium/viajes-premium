"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import styles from "./homeFaqs.module.css";
import accordionStyles from "@/components/ui/accordion/accordion.module.css";

type HomeFaqItem = {
  id: string;
  question: string;
  answer: string;
};

const HOME_FAQS = {
  srHeading: "Preguntas frecuentes sobre Japon Premium",
  accordionAriaLabel: "Preguntas frecuentes",
  badgeText: "Preguntas frecuentes",
  title: "Todo lo que necesitas saber",
  subtitle:
    "Resolvemos las dudas mas comunes sobre nuestros viajes a Japon. Si no encuentras lo que buscas, escribenos directamente.",
  contactLabel: "Otra pregunta?",
  contactEmail: "reservaciones@viajespremium.com.mx",
  items: [
    {
      id: "1",
      question: "Japon es un destino complicado para viajar?",
      answer:
        "No, Japon no es un destino complicado si esta bien planificado. Aunque el idioma y la logistica pueden parecer desafiantes al inicio, el pais es seguro, ordenado y facil de recorrer.",
    },
    {
      id: "2",
      question: "Cuantos dias se recomiendan para viajar a Japon?",
      answer:
        "Entre 10 y 15 dias permiten una experiencia mas completa. Ese rango da espacio para combinar cultura, gastronomia, ciudades y momentos de descanso.",
    },
    {
      id: "3",
      question: "Es posible viajar sin hablar japones?",
      answer:
        "Si. En las zonas mas visitadas hay senalizacion clara y servicios para viajeros internacionales. Ademas, el acompanamiento en espanol hace todo mas sencillo.",
    },
    {
      id: "4",
      question: "Cual es la mejor temporada para viajar?",
      answer:
        "Depende del estilo de viaje que busques. Primavera y otono son temporadas muy valoradas por sus paisajes, aunque hay ventanas menos concurridas con gran experiencia.",
    },
    {
      id: "5",
      question: "Es seguro viajar por Japon?",
      answer:
        "Si, es uno de los destinos mas seguros del mundo. Con una buena planeacion, el viaje se vuelve todavia mas comodo, claro y disfrutable.",
    },
    {
      id: "6",
      question: "Que tipo de experiencias incluye?",
      answer:
        "Desde ciudades vibrantes y cultura tradicional hasta bienestar, gastronomia y recorridos escenicos. Se adapta al ritmo y al perfil de cada viajero.",
    },
  ] as HomeFaqItem[],
};

export default function HomeFaqs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const faqItems = HOME_FAQS.items;
  const [openFaqId, setOpenFaqId] = useState<string>(
    () => faqItems[0]?.id ?? "",
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const clamp = (value: number, min = 0, max = 1) =>
      Math.min(max, Math.max(min, value));
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInCubic = (t: number) => t * t * t;

    const ENTRY_START_TOP_VH = 0.7;
    const ENTRY_END_TOP_VH = 0.3;
    const EXIT_START_BOTTOM_VH = 0.86;

    let rafId: number | null = null;

    const updateMotionProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const entryStartTop = viewportHeight * ENTRY_START_TOP_VH;
      const entryEndTop = viewportHeight * ENTRY_END_TOP_VH;
      const entryRange = Math.max(entryStartTop - entryEndTop, 1);

      const entryRaw = clamp((entryStartTop - rect.top) / entryRange);
      const entryProgress = easeOutCubic(entryRaw);
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
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <h2 className="srOnly">{HOME_FAQS.srHeading}</h2>

      <div className={styles.center}>
        <div className={styles.header}>
          <h2 className={styles.title}>{HOME_FAQS.title}</h2>
          <BlurredStagger
            text={HOME_FAQS.subtitle}
            className={styles.subtitle}
          />
          <div className={styles.contactHint}>
            <p className={styles.contactLabel}>{HOME_FAQS.contactLabel}</p>
            <a
              href={`mailto:${HOME_FAQS.contactEmail}`}
              className={styles.contactLink}
            >
              {HOME_FAQS.contactEmail}
            </a>
          </div>
        </div>

        <div className={styles.accordionWrap}>
          <div role="list" aria-label={HOME_FAQS.accordionAriaLabel}>
            {faqItems.map((faq) => {
              const isOpen = openFaqId === faq.id;
              const triggerId = `home-faq-trigger-${faq.id}`;
              const contentId = `home-faq-content-${faq.id}`;

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
                      onClick={() => setOpenFaqId(faq.id)}
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
    </section>
  );
}
