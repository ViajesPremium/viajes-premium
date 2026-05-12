"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "./faqs.module.css";
import accordionStyles from "@/components/ui/accordion/accordion.module.css";
import Badge from "@/components/ui/badge/badge";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import { usePremiumLandingConfig } from "@/landings/premium/context";

type FaqsProps = {
  hideCharacters?: boolean;
};

export default function Faqs({ hideCharacters = false }: FaqsProps) {
  const {
    sections: { faqs },
  } = usePremiumLandingConfig();

  const faqItems = faqs.items;
  const sectionStyle = {
    "--faq-left-image": faqs.leftImage ? `url("${faqs.leftImage}")` : "none",
    "--faq-right-image": faqs.rightImage ? `url("${faqs.rightImage}")` : "none",
  } as CSSProperties;

  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileFiguresRef = useRef<HTMLDivElement | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string>(
    () => faqItems[0]?.id ?? "",
  );

  // Nota: se removió el pin de FAQs para evitar conflicto de flujo con el
  // nuevo bloque cta-map, que ahora maneja la transición hacia CTA form.

  // -- Scroll animation: progreso de los laterales --------------------------
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

      // -- Progreso independiente para las figuras mobile --------------------
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

    // Usar el evento de Lenis cuando esté disponible para sincronizar
    // con el ticker de GSAP. Fallback a scroll nativo si Lenis no cargó.
    let lenisUnsubscribe: (() => void) | null = null;

    const attachLenis = () => {
      const lenis = (
        window as unknown as {
          __lenis?: {
            on: (e: string, cb: () => void) => void;
            off: (e: string, cb: () => void) => void;
          };
        }
      ).__lenis;
      if (lenis) {
        lenis.on("scroll", requestUpdate);
        lenisUnsubscribe = () => lenis.off("scroll", requestUpdate);
      } else {
        window.addEventListener("scroll", requestUpdate, { passive: true });
        lenisUnsubscribe = () =>
          window.removeEventListener("scroll", requestUpdate);
      }
    };

    // Lenis puede inicializarse de forma asíncrona, esperar un frame
    const rafSetup = window.requestAnimationFrame(attachLenis);
    window.addEventListener("resize", requestUpdate);
    requestUpdate();

    return () => {
      window.cancelAnimationFrame(rafSetup);
      lenisUnsubscribe?.();
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
    <section ref={sectionRef} className={styles.section} style={sectionStyle}>
      <h2 className="srOnly">{faqs.srHeading}</h2>
      {!hideCharacters ? (
        <>
          {/* Lateral izquierdo - samurai de perfil */}
          <div className={styles.sideLeft}>
            <div className={styles.sideImgFadeLeft} />
          </div>
        </>
      ) : null}

      {/* Contenido central */}
      <div className={styles.center}>
        {/* Encabezado */}
        <div className={styles.header}>
          <Badge text={faqs.badgeText} variant="dark" align="center" />
          <h2 className={styles.title}>{faqs.title}</h2>

          <BlurredStagger text={faqs.subtitle} className={styles.subtitle} />

          <div className={styles.contactHint}>
            <p className={styles.contactLabel}>{faqs.contactLabel}</p>
            <a
              href={`mailto:${faqs.contactEmail}`}
              className={styles.contactLink}
            >
              {faqs.contactEmail}
            </a>
          </div>
        </div>

        {/* Acordeon */}
        <div className={styles.accordionWrap}>
          <div role="list" aria-label={faqs.accordionAriaLabel}>
            {faqItems.map((faq) => {
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

      {!hideCharacters ? (
        <>
          <div
            ref={mobileFiguresRef}
            className={styles.mobileFigures}
            aria-hidden="true"
          >
            <div className={styles.mobileFigureLeft} />
            <div className={styles.mobileFigureRight} />
          </div>

          {/* Lateral derecho - geisha de perfil */}
          <div className={styles.sideRight}>
            <div className={styles.sideImgFade} />
          </div>
        </>
      ) : null}
    </section>
  );
}
