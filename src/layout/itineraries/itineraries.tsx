"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./itineraries.module.css";
import GradientText from "@/components/ui/gradient-text/gradient-text";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import { Button } from "@/components/ui/button/button";

const toRoman = (value: number) => {
  const numerals: Array<[number, string]> = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let remainder = Math.max(1, Math.floor(value));
  let output = "";

  for (const [arabic, roman] of numerals) {
    while (remainder >= arabic) {
      output += roman;
      remainder -= arabic;
    }
  }

  return output;
};

const items = [
  {
    id: 1,
    day: "14 DÍAS · ESPIRITUALIDAD · TRADICIÓN · BIENESTAR · CULTURA",
    title: "Alma de Japón",
    description:
      "Un recorrido por el Japón más espiritual y profundo: templos milenarios, rutas sagradas, ryokans, onsen y experiencias que transforman el viaje.",
    ideal:
      "Ideal para parejas, familias, lunas de miel y viajeros que buscan desconexión profunda.",
    image1: "/images/japon/stockImage.webp",
    image2: "/images/japon/stockImage.webp",
  },
  {
    id: 2,
    day: "14 DÍAS · ANIME · PARQUES TEMÁTICOS · TECNOLOGÍA · CULTURA POP",
    title: "Japón Pop",
    description:
      "Un recorrido por el Japón más vibrante y fantástico: anime, parques temáticos, tecnología, neón, tradición y experiencias que transforman el viaje.",
    ideal:
      "Ideal para familias, amigos, parejas jóvenes, fans del anime, manga y la tecnología.",
    image1: "/images/japon/stockImage.webp",
    image2: "/images/japon/stockImage.webp",
  },
  {
    id: 3,
    day: "15 DÍAS · SAMURÁIS · GEISHAS · SUMO · ALPES JAPONESES",
    title: "El Camino del Shōgun",
    description:
      "Un recorrido por el Japón más auténtico y menos transitado: alpes japoneses, templos zen, ryokans y santuarios sagrados que transforman el viaje.",
    ideal:
      "Ideal para parejas aventureras, viajeros con mirada cultural y quienes prefieren el Japón que pocos conocen.",
    image1: "/images/japon/stockImage.webp",
    image2: "/images/japon/stockImage.webp",
  },
];

type LenisLike = { scrollTo: (target: number, opts: object) => void };

export default function Itinerary() {
  const containerRef = useRef<HTMLDivElement>(null);
  const c1Refs = useRef<(HTMLDivElement | null)[]>([]);
  const c2Refs = useRef<(HTMLDivElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeStep, setActiveStep] = useState(0);
  const currentStepRef = useRef(0);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const total = items.length;
      const container = containerRef.current;
      const c1 = c1Refs.current;
      const c2 = c2Refs.current;
      const info = infoRefs.current;
      if (!container) return;

      const getLenis = () =>
        (window as unknown as Record<string, LenisLike>).__lenis;

      const setStepState = (step: number) => {
        const clamped = Math.max(0, Math.min(total - 1, step));
        if (clamped !== currentStepRef.current) {
          currentStepRef.current = clamped;
          setActiveStep(clamped);
        }
        return clamped;
      };

      const setVisualState = (step: number) => {
        for (let i = 0; i < total; i++) {
          const isVisibleLayer = i <= step;
          const infoY = i === step ? 0 : i < step ? -20 : 20;
          const infoOpacity = i === step ? 1 : 0;
          gsap.set(c1[i], {
            yPercent: isVisibleLayer ? 0 : 100,
            zIndex: i + 1,
            force3D: true,
          });
          gsap.set(c2[i], {
            yPercent: isVisibleLayer ? 0 : -100,
            zIndex: i + 1,
            force3D: true,
          });
          gsap.set(info[i], { yPercent: infoY, opacity: infoOpacity, force3D: true });
        }
      };

      const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;

      if (isMobileViewport) {
        setStepState(0);
        setVisualState(0);

        let activeTransition: gsap.core.Timeline | null = null;
        let touchStartY = 0;
        let touchStartX = 0;
        let touchPrimed = false;
        let touchLocked = false;
        const MOBILE_STEP_DURATION = 0.56;
        const MOBILE_INFO_ACTIVE_DURATION = 0.44;
        const MOBILE_INFO_INACTIVE_DURATION = 0.36;
        const MOBILE_PIN_VH = 1.4 + (total - 1) * 0.9;
        const INTERACTION_UNLOCK_PROGRESS = 0.12;

        const pinTrigger = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: () => `+=${window.innerHeight * MOBILE_PIN_VH}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            window.__lenis?.resize();
          },
        });

        const canInteract = () =>
          pinTrigger.isActive &&
          pinTrigger.progress >= INTERACTION_UNLOCK_PROGRESS;

        const animateToStep = (targetStep: number) => {
          const target = Math.max(0, Math.min(total - 1, targetStep));
          const from = currentStepRef.current;
          if (target === from) return;
          if (activeTransition) return;

          setStepState(target);
          activeTransition = gsap.timeline({
            defaults: { ease: "power2.out", duration: MOBILE_STEP_DURATION },
            onComplete: () => {
              activeTransition = null;
              touchLocked = false;
            },
          });

          for (let i = 0; i < total; i++) {
            const isVisibleLayer = i <= target;
            const infoY = i === target ? 0 : i < target ? -20 : 20;
            const infoOpacity = i === target ? 1 : 0;
            activeTransition.to(c1[i], { yPercent: isVisibleLayer ? 0 : 100 }, 0);
            activeTransition.to(c2[i], { yPercent: isVisibleLayer ? 0 : -100 }, 0);
            activeTransition.to(
              info[i],
              {
                yPercent: infoY,
                opacity: infoOpacity,
                duration:
                  i === target
                    ? MOBILE_INFO_ACTIVE_DURATION
                    : MOBILE_INFO_INACTIVE_DURATION,
              },
              i === target ? 0.12 : 0,
            );
          }
        };

        const goByDirection = (dir: number) => {
          if (activeTransition || touchLocked) return;
          const st = pinTrigger;
          if (!st || !st.isActive) return;

          const from = currentStepRef.current;
          const to = Math.max(0, Math.min(total - 1, from + dir));
          if (to === from) {
            const edgeOffset = Math.round(window.innerHeight * 0.24);
            const edgeTarget = dir > 0 ? st.end + edgeOffset : st.start - edgeOffset;
            const lenis = getLenis();
            if (lenis) {
              lenis.scrollTo(edgeTarget, { duration: 0.28 });
            } else {
              window.scrollTo({ top: edgeTarget, behavior: "smooth" });
            }
            return;
          }

          touchLocked = true;
          animateToStep(to);
        };

        const onTouchStart = (event: TouchEvent) => {
          if (!canInteract() || activeTransition || touchLocked) {
            touchPrimed = false;
            return;
          }
          const touch = event.touches[0];
          if (!touch) {
            touchPrimed = false;
            return;
          }
          touchStartY = touch.clientY;
          touchStartX = touch.clientX;
          touchPrimed = true;
        };

        const onTouchMove = (event: TouchEvent) => {
          if (!canInteract()) return;
          const touch = event.touches[0];
          if (!touch) return;

          const deltaY = touch.clientY - touchStartY;
          const currentStep = currentStepRef.current;
          const isLast = currentStep === total - 1;

          // Bloquear scroll vertical hasta llegar a la ultima card.
          if (!isLast) {
            event.preventDefault();
            return;
          }

          // En la ultima card: bloquear swipe hacia abajo (para volver cards),
          // permitir swipe hacia arriba para salir de la seccion.
          if (deltaY > 0) {
            event.preventDefault();
          }
        };

        const onTouchEnd = (event: TouchEvent) => {
          if (!touchPrimed || !canInteract()) return;
          if (activeTransition || touchLocked) return;
          touchPrimed = false;

          const touch = event.changedTouches[0];
          if (!touch) return;
          const deltaY = touch.clientY - touchStartY;
          const deltaX = touch.clientX - touchStartX;

          if (Math.abs(deltaY) < 28) return;
          if (Math.abs(deltaY) <= Math.abs(deltaX) * 1.15) return;

          goByDirection(deltaY < 0 ? 1 : -1);
        };

        const onWheel = (event: WheelEvent) => {
          if (!canInteract()) return;
          const deltaY = event.deltaY;
          if (Math.abs(deltaY) < 4) return;
          if (activeTransition || touchLocked) {
            event.preventDefault();
            return;
          }

          const dir = deltaY > 0 ? 1 : -1;
          const currentStep = currentStepRef.current;
          const isLast = currentStep === total - 1;

          if (!isLast) {
            event.preventDefault();
            goByDirection(dir);
            return;
          }

          // Ultima card: permitir solo salida hacia abajo.
          if (dir < 0) {
            event.preventDefault();
            goByDirection(-1);
          }
        };

        const onTouchCancel = () => {
          touchPrimed = false;
          touchStartY = 0;
          touchStartX = 0;
        };

        container.addEventListener("touchstart", onTouchStart, { passive: true });
        container.addEventListener("touchmove", onTouchMove, { passive: false });
        container.addEventListener("touchend", onTouchEnd, { passive: true });
        container.addEventListener("touchcancel", onTouchCancel, { passive: true });
        container.addEventListener("wheel", onWheel, { passive: false });

        return () => {
          container.removeEventListener("touchstart", onTouchStart);
          container.removeEventListener("touchmove", onTouchMove);
          container.removeEventListener("touchend", onTouchEnd);
          container.removeEventListener("touchcancel", onTouchCancel);
          container.removeEventListener("wheel", onWheel);
          activeTransition?.kill();
          pinTrigger.kill();
        };
      }

      // Desktop: conserva comportamiento original por scroll/scrub.
      const ENTRY_HOLD_VH = 1;
      const REVEAL_PIN_VH = 1;
      const TRANSITION_UNITS = total - 1;
      const TOTAL_UNITS = ENTRY_HOLD_VH + TRANSITION_UNITS + REVEAL_PIN_VH;
      const getTotalPinDistance = () => window.innerHeight * TOTAL_UNITS;
      const transitionStartProg = ENTRY_HOLD_VH / TOTAL_UNITS;
      const transitionEndProg = (ENTRY_HOLD_VH + TRANSITION_UNITS) / TOTAL_UNITS;
      const transitionRange = transitionEndProg - transitionStartProg;
      const interiorStops = Array.from(
        { length: total },
        (_, i) => (ENTRY_HOLD_VH + i) / TOTAL_UNITS,
      );
      const stops = [0, ...interiorStops, 1];
      const closestStop = (value: number) =>
        stops.reduce((closest, stop) =>
          Math.abs(stop - value) < Math.abs(closest - value) ? stop : closest,
        );
      const progressToStep = (progress: number) => {
        if (progress <= transitionStartProg) return 0;
        if (progress >= transitionEndProg) return total - 1;
        const normalized = (progress - transitionStartProg) / transitionRange;
        return Math.round(Math.min(normalized, 1) * (total - 1));
      };

      setStepState(0);
      setVisualState(0);

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getTotalPinDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.12,
          snap: {
            snapTo: (value: number) => closestStop(value),
            duration: { min: 0.03, max: 0.09 },
            delay: 0.25,
            ease: "power2.out",
            inertia: false,
          },
          onUpdate: (self) => {
            setStepState(progressToStep(self.progress));
          },
          invalidateOnRefresh: true,
          onRefresh: () => {
            window.__lenis?.resize();
          },
        },
      });

      for (let i = 1; i < total; i++) {
        const pos = ENTRY_HOLD_VH + (i - 1);
        masterTl.to(c1[i], { yPercent: 0, ease: "none", duration: 1 }, pos);
        masterTl.to(c2[i], { yPercent: 0, ease: "none", duration: 1 }, pos);
        masterTl.to(
          info[i - 1],
          { yPercent: -20, opacity: 0, ease: "none", duration: 0.4 },
          pos,
        );
        masterTl.to(
          info[i],
          { yPercent: 0, opacity: 1, ease: "none", duration: 0.4 },
          pos + 0.6,
        );
      }

      masterTl.to({}, { duration: ENTRY_HOLD_VH }, 0);
      masterTl.to({}, { duration: REVEAL_PIN_VH }, ENTRY_HOLD_VH + TRANSITION_UNITS);

      return () => {
        masterTl.scrollTrigger?.kill();
        masterTl.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.content1}>
        {items.map((item, i) => (
          <div
            key={`${item.id}-content1`}
            ref={(el) => {
              c1Refs.current[i] = el;
            }}
            className={styles.imageFrame}
          >
            <Image
              src={item.image1}
              alt={item.title}
              className={styles.image}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      <div className={styles.content2}>
        {items.map((item, i) => (
          <div
            key={`${item.id}-content2`}
            ref={(el) => {
              c2Refs.current[i] = el;
            }}
            className={styles.imageFrame}
          >
            <Image
              src={item.image2}
              alt={item.title}
              className={styles.image}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      <div className={styles.premiumCard}>
        <div className={styles.cardOverlay} />

        <div className={styles.contentWrapper}>
          <div className={styles.infoContainer}>
            {items.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => {
                  infoRefs.current[i] = el;
                }}
                className={`${styles.infoItem} ${
                  activeStep === i ? styles.active : ""
                }`}
              >
                <div className={styles.header}>
                  <span className={styles.eyebrow}>{item.day}</span>
                  <GradientText
                    className={styles.titleGradient}
                    colors={["#BF953F", "#FCF6BA", "#B38728", "#FCF6BA"]}
                    animationSpeed={6}
                    direction="horizontal"
                  >
                    <h2 className={styles.titleText}>{item.title}</h2>
                  </GradientText>
                </div>

                <div className={styles.body}>
                  <BlurredStagger
                    text={item.description}
                    className={styles.descriptionBlur}
                    isActive={activeStep === i}
                  />
                  <p className={styles.idealText}>{item.ideal}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.buttons}>
              <Button variant="secondary" className={styles.ctaButton2}>
                Descargar PDF
              </Button>
              <Button variant="primary" className={styles.ctaButton}>
                Quiero esta experiencia
              </Button>
            </div>

            <div className={styles.controls}>
              <div className={styles.counterGroup}>
                <span className={styles.current}>{toRoman(activeStep + 1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
