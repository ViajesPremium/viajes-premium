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
import { downloadFiles } from "@/lib/download-files";
import { usePremiumLandingConfig } from "@/landings/premium/context";

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

const ITINERARIES_SCROLL_TUNING = {
  mobilePinAnticipation: 0.25,
  desktopPinAnticipation: 0.25,
  // scrub: true → GSAP sigue la posición de scroll directamente.
  // Lenis ya provee suavizado; agregar lag de GSAP encima creaba doble
  // suavizado y generaba tirones al entrar/salir de la sección.
  desktopScrub: 0.8,
  desktopSnapDelay: 0.24,
  desktopSnapMin: 0.12,
  desktopSnapMax: 0.3,
} as const;

type LenisLike = {
  scrollTo: (
    target: number,
    opts?: {
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
      force?: boolean;
    },
  ) => void;
  stop: () => void;
  start: () => void;
  resize: () => void;
  /** Posición destino de un scrollTo() en curso. 0 si no hay animación. */
  targetScroll?: number;
};

export default function Itinerary() {
  const {
    sections: { itineraries },
  } = usePremiumLandingConfig();

  const items = itineraries.items;
  const containerRef = useRef<HTMLDivElement>(null);
  const c1Refs = useRef<(HTMLDivElement | null)[]>([]);
  const c2Refs = useRef<(HTMLDivElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeStep, setActiveStep] = useState(0);
  const currentStepRef = useRef(0);
  const handleDownloadPdf = useCallback(() => {
    const files = itineraries.pdfDownloads ?? [];
    if (!files.length) return;
    const activeFile = files[activeStep];
    if (activeFile) {
      downloadFiles([activeFile]);
      return;
    }
    // Fallback para configuraciones con menos PDFs que cards.
    downloadFiles(files);
  }, [activeStep, itineraries.pdfDownloads]);
  const handleGoToForm = useCallback(() => {
    const target = itineraries.primaryCta.target;
    if (target.startsWith("#")) {
      scrollToSection(target, { duration: 1.15 });
      return;
    }
    window.location.href = target;
  }, [itineraries.primaryCta.target]);

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
          gsap.set(info[i], {
            yPercent: infoY,
            opacity: infoOpacity,
            force3D: true,
          });
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
        // Two-phase state machine:
        //   WAITING     → section being uncovered by Highlights scrolling away
        //   INTERACTIVE → Highlights gone, user swipes to change cards
        //   EXITING     → user triggered exit, Lenis takes over scroll
        let isInteractive = false;
        let isExiting = false;

        const MOBILE_STEP_DURATION = 0.52;
        const MOBILE_INFO_ACTIVE_DURATION = 0.4;
        const MOBILE_INFO_INACTIVE_DURATION = 0.32;
        // Pin only needs to cover: (A) unlock scroll ≈1 vh + (B) exit scroll ≈0.3 vh.
        // We never reach the natural end — exit is always triggered programmatically.
        const MOBILE_PIN_VH = 1.65;
        const EXIT_OFFSET_PX = Math.max(16, Math.round(window.innerHeight * 0.08));

        const getLenis = () =>
          (window as unknown as Record<string, LenisLike>).__lenis;

        const getBypassDirection = (): 1 | -1 | null => {
          const state = window as unknown as Record<string, unknown>;
          const until =
            typeof state.__itinerariesBypassUntil === "number"
              ? (state.__itinerariesBypassUntil as number)
              : 0;
          if (!until || Date.now() > until) return null;
          return state.__itinerariesBypassDirection === -1 ? -1 : 1;
        };

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
        };

        const exitInteractive = () => {
          if (!isInteractive) return;
          isInteractive = false;
        };

        const captureAt = (step: number, scrollTarget: number) => {
          const lenis = getLenis();
          activeTransition?.kill();
          activeTransition = null;
          isExiting = false;

          if (lenis) {
            lenis.scrollTo(scrollTarget, { immediate: true, force: true });
          } else {
            window.scrollTo({ top: scrollTarget, behavior: "auto" });
          }

          setStepState(step);
          setVisualState(step);
          enterInteractive();
        };

        const captureFromTop = () => {
          captureAt(0, pinTrigger.start + 2);
        };

        const captureFromBottom = () => {
          captureAt(total - 1, Math.max(pinTrigger.start + 2, pinTrigger.end - 2));
        };

        // ── Step animation ────────────────────────────────────────────────────
        const animateToStep = (targetStep: number) => {
          const from = currentStepRef.current;
          if (targetStep === from || activeTransition) return;

          setStepState(targetStep);
          activeTransition = gsap.timeline({
            defaults: { ease: "power2.out", duration: MOBILE_STEP_DURATION },
            onComplete: () => {
              activeTransition = null;
            },
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
          exitInteractive();

          const lenis = getLenis();
          // Instant scroll releases the pin immediately so the
          // user's remaining touch momentum carries them naturally
          // into the next section. Animated scroll fights the pin
          // on iOS and causes the "stuck" feeling.
          const target =
            dir > 0
              ? pinTrigger.end + EXIT_OFFSET_PX
              : Math.max(0, pinTrigger.start - EXIT_OFFSET_PX);

          if (lenis) {
            lenis.scrollTo(target, {
              duration: 0,
              immediate: true,
              force: true,
            });
          } else {
            window.scrollTo({ top: target, left: 0, behavior: "auto" });
          }
        };

        // ── ScrollTrigger pin ─────────────────────────────────────────────────
        const pinTrigger = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: () => `+=${window.innerHeight * MOBILE_PIN_VH}`,
          pin: true,
          pinType: "fixed",
          pinSpacing: true,
          anticipatePin: ITINERARIES_SCROLL_TUNING.mobilePinAnticipation,
          fastScrollEnd: true,
          refreshPriority: 40,
          invalidateOnRefresh: true,
          onEnter: () => {
            const bypassDirection = getBypassDirection();
            if (bypassDirection === 1) {
              isExiting = true;
              exitInteractive();
              return;
            }
            captureFromTop();
          },
          onUpdate: () => {
            // Continuously poll until Highlights is gone, then lock in.
            if (!isInteractive && !isExiting && isFullyUncovered()) {
              enterInteractive();
            }
          },
          onLeave: () => {
            exitInteractive();
            isExiting = false;
            const lastStep = Math.max(0, total - 1);
            currentStepRef.current = lastStep;
            setActiveStep(lastStep);
            setVisualState(lastStep);
          },
          onLeaveBack: () => {
            // Igual que onLeave: solo limpiar, sin tocar el scroll.
            exitInteractive();
            isExiting = false;
            currentStepRef.current = 0;
            setActiveStep(0);
            setVisualState(0);
          },
          onEnterBack: () => {
            // Guard: scroll programático activo (p.ej. botón back-to-top).
            const lenis = getLenis();
            const bypassDirection = getBypassDirection();
            const isPassthrough =
              bypassDirection === -1 ||
              !!(window as unknown as Record<string, unknown>).__lenisScrollingToTop ||
              (lenis &&
                typeof lenis.targetScroll === "number" &&
                lenis.targetScroll < pinTrigger.start);

            if (isPassthrough) {
              isExiting = true;
              exitInteractive();
              return;
            }

            captureFromBottom();
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
          if (!t) {
            touchPrimed = false;
            return;
          }
          touchStartY = t.clientY;
          touchStartX = t.clientX;
          touchPrimed = true;
        };

        const onTouchMove = (event: TouchEvent) => {
          // Before unlock: let native scroll / Lenis advance pin progress.
          if (!isInteractive) return;
          // After unlock: we own all scroll. Prevent browser default AND stop
          // propagation so any window-level Lenis listener can't interfere.
          if (event.cancelable) {
            event.preventDefault();
          }
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
            } else {
              doExit(-1);
            }
          }
        };

        const onTouchCancel = () => {
          touchPrimed = false;
        };

        // Wheel (useful in browser DevTools mobile emulation / foldable w/ mouse)
        const onWheel = (event: WheelEvent) => {
          if (!isInteractive || isExiting) return;
          if (Math.abs(event.deltaY) < 4) return;
          if (event.cancelable) {
            event.preventDefault();
          }
          event.stopPropagation();

          if (activeTransition) return; // one step at a time

          const dir = event.deltaY > 0 ? 1 : -1;
          const step = currentStepRef.current;

          if (dir > 0) {
            if (step < total - 1) animateToStep(step + 1);
            else doExit(1);
          } else {
            if (step > 0) animateToStep(step - 1);
            else doExit(-1);
          }
        };

        container.addEventListener("touchstart", onTouchStart, {
          passive: true,
        });
        container.addEventListener("touchmove", onTouchMove, {
          passive: false,
        });
        container.addEventListener("touchend", onTouchEnd, { passive: true });
        container.addEventListener("touchcancel", onTouchCancel, {
          passive: true,
        });
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
      const transitionEndProg =
        (ENTRY_HOLD_VH + TRANSITION_UNITS) / TOTAL_UNITS;
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
          anticipatePin: ITINERARIES_SCROLL_TUNING.desktopPinAnticipation,
          scrub: ITINERARIES_SCROLL_TUNING.desktopScrub,
          snap: {
            snapTo: (value: number) => closestStop(value),
            duration: {
              min: ITINERARIES_SCROLL_TUNING.desktopSnapMin,
              max: ITINERARIES_SCROLL_TUNING.desktopSnapMax,
            },
            delay: ITINERARIES_SCROLL_TUNING.desktopSnapDelay,
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
      masterTl.to(
        {},
        { duration: REVEAL_PIN_VH },
        ENTRY_HOLD_VH + TRANSITION_UNITS,
      );

      return () => {
        masterTl.scrollTrigger?.kill();
        masterTl.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <h2 className="srOnly">{itineraries.srHeading}</h2>
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

      <div className={styles.cardShell}>
        <div className={styles.tabTop} aria-hidden="true">
          {itineraries.topTabText}
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
                    allowWrap
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
              <Button
                variant="secondary"
                className={styles.ctaButton2}
                onClick={handleDownloadPdf}
              >
                {itineraries.secondaryCtaLabel}
              </Button>
              <Button
                variant="primary"
                className={styles.ctaButton}
                onClick={handleGoToForm}
              >
                {itineraries.primaryCta.label}
              </Button>
            </div>

            <div className={styles.controls}>
              <div className={styles.counterGroup}>
                <span className={styles.current}>
                  {toRoman(activeStep + 1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className={styles.tabBottom}>
          <span
            className={styles.tabPrice}
            key={activeStep}
          >
            {items[activeStep].price}
          </span>
        </div>
      </div>
    </div>
  );
}







