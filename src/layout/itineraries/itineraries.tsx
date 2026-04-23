"use client";

import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./itineraries.module.css";
import GradientText from "@/components/ui/gradient-text/gradient-text";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import { Button } from "@/components/ui/button/button";
import { scrollToSection } from "@/lib/scroll-to-section";

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

type LenisLike = {
  scrollTo: (
    target: number,
    opts?: { duration?: number; easing?: (t: number) => number; immediate?: boolean },
  ) => void;
  stop: () => void;
  start: () => void;
  resize: () => void;
};

export default function Itinerary() {
  const containerRef = useRef<HTMLDivElement>(null);
  const c1Refs = useRef<(HTMLDivElement | null)[]>([]);
  const c2Refs = useRef<(HTMLDivElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeStep, setActiveStep] = useState(0);
  const currentStepRef = useRef(0);
  const handleGoToForm = useCallback(() => {
    scrollToSection("#form", { duration: 1.15 });
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const total = items.length;
      const container = containerRef.current;
      const c1 = c1Refs.current;
      const c2 = c2Refs.current;
      const info = infoRefs.current;
      if (!container) return;

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
      const PIN_CATCH_OFFSET_PX = 6;

      if (isMobileViewport) {
        setStepState(0);
        setVisualState(0);

        let activeTransition: gsap.core.Timeline | null = null;
        let touchStartY = 0;
        let touchStartX = 0;
        let touchPrimed = false;
        // Two-phase state machine:
        //   WAITING     → section being uncovered by Highlights scrolling away
        //   INTERACTIVE → Highlights gone, user swipes to change cards
        //   EXITING     → user triggered exit, Lenis takes over scroll
        let isInteractive = false;
        let isExiting = false;
        // True when the user scrolled back up into this section from below (Includes).
        // Enables backward exit from step 0 so they can return to Highlights.
        let enteredFromBelow = false;
        // True once the user advanced at least one card in the current mobile session.
        // Allows exiting upward from step 0 after interacting (prevents hard lock).
        let hasMovedForwardInSession = false;

        const MOBILE_STEP_DURATION = 0.52;
        const MOBILE_INFO_ACTIVE_DURATION = 0.4;
        const MOBILE_INFO_INACTIVE_DURATION = 0.32;
        // Pin only needs to cover: (A) unlock scroll ≈1 vh + (B) exit scroll ≈0.3 vh.
        // We never reach the natural end — exit is always triggered programmatically.
        const MOBILE_PIN_VH = 1.42;

        const getLenis = () =>
          (window as unknown as Record<string, LenisLike>).__lenis;

        // ── Unlock detection ──────────────────────────────────────────────────
        // True once the Highlights section (z-index layer above Itineraries) has
        // completely scrolled off the top of the viewport.
        // The #highlights DeferredSection will be in DOM long before the user
        // reaches Itineraries, so getElementById is safe here.
        const isFullyUncovered = (): boolean => {
          const hl = document.getElementById("highlights");
          if (!hl) return true; // fallback: assume uncovered
          // Allow a small threshold for rounding / sub-pixel rendering
          return hl.getBoundingClientRect().bottom <= 4;
        };

        // ── Interactive mode ──────────────────────────────────────────────────
        // Stop Lenis so it can't scroll the page while the user is swiping cards.
        // On mobile Lenis is not initialised (SmoothScrollProvider returns early),
        // so these calls are no-ops — the real scroll prevention is preventDefault
        // in onTouchMove.
        const enterInteractive = () => {
          if (isInteractive) return;
          isInteractive = true;
          getLenis()?.stop();
        };

        const exitInteractive = () => {
          if (!isInteractive) return;
          isInteractive = false;
          getLenis()?.start();
        };

        // ── Step animation ────────────────────────────────────────────────────
        const animateToStep = (targetStep: number) => {
          const from = currentStepRef.current;
          if (targetStep === from || activeTransition) return;
          if (targetStep > from) hasMovedForwardInSession = true;

          setStepState(targetStep);
          activeTransition = gsap.timeline({
            defaults: { ease: "power2.out", duration: MOBILE_STEP_DURATION },
            onComplete: () => { activeTransition = null; },
          });

          for (let i = 0; i < total; i++) {
            const visible = i <= targetStep;
            const infoY = i === targetStep ? 0 : i < targetStep ? -20 : 20;
            const infoOpacity = i === targetStep ? 1 : 0;
            activeTransition.to(c1[i], { yPercent: visible ? 0 : 100 }, 0);
            activeTransition.to(c2[i], { yPercent: visible ? 0 : -100 }, 0);
            activeTransition.to(
              info[i],
              {
                yPercent: infoY,
                opacity: infoOpacity,
                duration:
                  i === targetStep
                    ? MOBILE_INFO_ACTIVE_DURATION
                    : MOBILE_INFO_INACTIVE_DURATION,
              },
              i === targetStep ? 0.1 : 0,
            );
          }
        };

        // ── Section exit ──────────────────────────────────────────────────────
        // Re-enable Lenis / native scroll and programmatically scroll past the
        // pin boundary so the section unpins cleanly.
        const doExit = (dir: 1 | -1) => {
          if (isExiting) return;
          isExiting = true;
          exitInteractive(); // re-enable Lenis first

          const lenis = getLenis();
          // Scroll just past the pin end (forward) or start (backward)
          const target =
            dir > 0
              ? pinTrigger.end + 2
              : Math.max(0, pinTrigger.start - 2);

          if (lenis) {
            lenis.scrollTo(target, {
              duration: 0.38,
              easing: (t) => t * (2 - t),
            });
          } else {
            window.scrollTo({ top: target, behavior: "smooth" });
          }
        };

        // ── ScrollTrigger pin ─────────────────────────────────────────────────
        const pinTrigger = ScrollTrigger.create({
          trigger: container,
          start: () => `top top+=${PIN_CATCH_OFFSET_PX}`,
          end: () => `+=${window.innerHeight * MOBILE_PIN_VH}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1.35,
          invalidateOnRefresh: true,
          onEnter: () => {
            // Fresh forward entry (from top). Reset everything to card 0.
            activeTransition?.kill();
            activeTransition = null;
            enteredFromBelow = false;
            hasMovedForwardInSession = false;
            isExiting = false;
            isInteractive = false;
            setStepState(0);
            setVisualState(0);
          },
          onUpdate: () => {
            // Continuously poll until Highlights is gone, then lock in.
            if (!isInteractive && !isExiting && isFullyUncovered()) {
              enterInteractive();
            }
          },
          onLeave: () => {
            // Pin naturally ended (edge case — normally exit is via doExit).
            exitInteractive();
            isExiting = false;
          },
          onLeaveBack: () => {
            // User scrolled back above the pin start (past Highlights into top).
            exitInteractive();
            isExiting = false;
            enteredFromBelow = false;
            hasMovedForwardInSession = false;
          },
          onEnterBack: () => {
            // User scrolled back UP into the pin from below (from Includes).
            // Kill any lingering animation, reset all flags, land on last card.
            activeTransition?.kill();
            activeTransition = null;
            enteredFromBelow = true;
            hasMovedForwardInSession = true;
            isExiting = false;
            isInteractive = false; // reset so enterInteractive() fires cleanly
            setStepState(total - 1);
            setVisualState(total - 1);
            // Highlights is definitely gone if we're coming from below.
            enterInteractive();
          },
          onRefresh: () => {
            window.__lenis?.resize();
          },
        });

        // ── Touch handlers ────────────────────────────────────────────────────
        const onTouchStart = (event: TouchEvent) => {
          if (!isInteractive || activeTransition || isExiting) {
            touchPrimed = false;
            return;
          }
          const t = event.touches[0];
          if (!t) { touchPrimed = false; return; }
          touchStartY = t.clientY;
          touchStartX = t.clientX;
          touchPrimed = true;
        };

        const onTouchMove = (event: TouchEvent) => {
          // Before unlock: let native scroll / Lenis advance pin progress.
          if (!isInteractive) return;
          // After unlock: we own all scroll. Prevent browser default AND stop
          // propagation so any window-level Lenis listener can't interfere.
          event.preventDefault();
          event.stopPropagation();
        };

        const onTouchEnd = (event: TouchEvent) => {
          if (!touchPrimed) return;
          touchPrimed = false;
          if (!isInteractive || activeTransition || isExiting) return;

          const t = event.changedTouches[0];
          if (!t) return;

          const deltaY = t.clientY - touchStartY;
          const deltaX = t.clientX - touchStartX;

          // Ignore weak or horizontal swipes
          if (Math.abs(deltaY) < 24) return;
          if (Math.abs(deltaY) <= Math.abs(deltaX) * 1.1) return;

          // Finger moved UP (negative deltaY) → forward/down in content → next card
          const goingForward = deltaY < 0;
          const step = currentStepRef.current;

          if (goingForward) {
            if (step < total - 1) {
              animateToStep(step + 1);
            } else {
              doExit(1); // last card → exit forward
            }
          } else {
            if (step > 0) {
              animateToStep(step - 1);
            } else if (enteredFromBelow || hasMovedForwardInSession) {
              doExit(-1); // first card + came from below → exit backward to Highlights
            }
            // First card + came from top → do nothing (must see all cards first)
          }
        };

        const onTouchCancel = () => { touchPrimed = false; };

        // Wheel (useful in browser DevTools mobile emulation / foldable w/ mouse)
        const onWheel = (event: WheelEvent) => {
          if (!isInteractive || isExiting) return;
          if (Math.abs(event.deltaY) < 4) return;

          event.preventDefault();
          event.stopPropagation();

          if (activeTransition) return; // one step at a time

          const dir = event.deltaY > 0 ? 1 : -1;
          const step = currentStepRef.current;

          if (dir > 0) {
            if (step < total - 1) animateToStep(step + 1);
            else doExit(1);
          } else {
            if (step > 0) animateToStep(step - 1);
            else if (enteredFromBelow || hasMovedForwardInSession) doExit(-1);
            // First card + came from top → no backward exit
          }
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
          exitInteractive(); // always re-enable Lenis on unmount
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
          start: () => `top top+=${PIN_CATCH_OFFSET_PX}`,
          end: () => `+=${getTotalPinDistance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1.35,
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
              loading={i === 0 ? "eager" : "lazy"}
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "auto"}
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
              loading={i === 0 ? "eager" : "lazy"}
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "auto"}
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
                    staticOnMobile
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
              <Button
                variant="primary"
                className={styles.ctaButton}
                onClick={handleGoToForm}
              >
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
