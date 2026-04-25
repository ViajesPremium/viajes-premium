"use client";

import { useCallback, useEffect, useRef, type TouchEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Badge from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { scrollToSection } from "@/lib/scroll-to-section";
import styles from "./includes.module.css";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import { usePremiumLandingConfig } from "@/landings/premium/context";

const INCLUDES_SCROLL_TUNING = {
  horizontalFactor: 3,
  // 0.4 calibrado para lerp=0.08: suficiente para absorber el salto de layout
  // al entrar en scroll horizontal, sin disparar el pin demasiado pronto.
  pinAnticipation: 0.4,
  pinScrub: true,
} as const;

export default function Includes() {
  const {
    sections: { includes },
  } = usePremiumLandingConfig();

  const includeItems = includes.items;
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchStartIndexRef = useRef(0);
  const isHorizontalGestureRef = useRef(false);

  const getCardStep = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport) return 0;
    const computedTrackStyles = track ? window.getComputedStyle(track) : null;
    const rawGap =
      computedTrackStyles?.columnGap || computedTrackStyles?.gap || "0";
    const gap = Number.parseFloat(rawGap) || 0;
    return viewport.clientWidth + gap;
  }, []);

  const getCurrentCardIndex = useCallback(() => {
    const viewport = viewportRef.current;
    const step = getCardStep();
    if (!viewport || step <= 0) return 0;
    return Math.round(viewport.scrollLeft / step);
  }, [getCardStep]);

  const scrollToCard = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const viewport = viewportRef.current;
      const step = getCardStep();
      if (!viewport || step <= 0) return;
      const maxIndex = Math.max(includeItems.length - 1, 0);
      const clampedIndex = Math.max(0, Math.min(index, maxIndex));
      viewport.scrollTo({
        left: clampedIndex * step,
        behavior,
      });
    },
    [getCardStep, includeItems.length],
  );

  const handleGoToTarget = useCallback(() => {
    if (includes.cta.target.startsWith("#")) {
      scrollToSection(includes.cta.target, { duration: 1.15 });
      return;
    }
    window.location.href = includes.cta.target;
  }, [includes.cta.target]);

  const scrollCards = useCallback(
    (direction: number) => {
      const currentIndex = getCurrentCardIndex();
      scrollToCard(currentIndex + direction, "smooth");
    },
    [getCurrentCardIndex, scrollToCard],
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStartXRef.current = touch.clientX;
      touchStartYRef.current = touch.clientY;
      touchStartIndexRef.current = getCurrentCardIndex();
      isHorizontalGestureRef.current = false;
    },
    [getCurrentCardIndex],
  );

  const handleTouchMove = useCallback((event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    const deltaX = Math.abs(touch.clientX - touchStartXRef.current);
    const deltaY = Math.abs(touch.clientY - touchStartYRef.current);
    if (deltaX > 10 && deltaX > deltaY) {
      isHorizontalGestureRef.current = true;
    }
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStartXRef.current;
      const absDeltaX = Math.abs(deltaX);
      const didHorizontalSwipe =
        isHorizontalGestureRef.current && absDeltaX > 36;

      if (didHorizontalSwipe) {
        const direction = deltaX < 0 ? 1 : -1;
        scrollToCard(touchStartIndexRef.current + direction, "smooth");
      } else {
        scrollToCard(getCurrentCardIndex(), "smooth");
      }

      isHorizontalGestureRef.current = false;
    },
    [getCurrentCardIndex, scrollToCard],
  );

  const handleTouchCancel = useCallback(() => {
    isHorizontalGestureRef.current = false;
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const pinLayer = pinRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const progressFill = progressRef.current;

      if (!section || !pinLayer || !viewport || !track || !progressFill) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(max-width: 768px)", () => {
        gsap.set(track, { clearProps: "transform" });
        gsap.set(progressFill, { clearProps: "transform" });
      });

      mm.add("(min-width: 769px)", () => {
        gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });

        const getShift = () =>
          Math.max(track.scrollWidth - viewport.clientWidth, 0);
        const getEndDistance = () =>
          getShift() * INCLUDES_SCROLL_TUNING.horizontalFactor;

        const tl = gsap.timeline();
        tl.to(track, { x: () => -getShift(), ease: "none", duration: 1 }, 0);
        tl.to(progressFill, { scaleX: 1, ease: "none", duration: 1 }, 0);

        const st = ScrollTrigger.create({
          animation: tl,
          trigger: section,
          start: "top top",
          end: () => `+=${getEndDistance()}`,
          pin: section,
          pinSpacing: true,
          scrub: INCLUDES_SCROLL_TUNING.pinScrub,
          anticipatePin: INCLUDES_SCROLL_TUNING.pinAnticipation,
          invalidateOnRefresh: true,
          onRefresh: () => {
            window.__lenis?.resize();
          },
        });

        return () => {
          st.kill();
          tl.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  // Bloqueo de overscroll en los extremos del carrusel (mobile).
  // React usa listeners pasivos por defecto; necesitamos uno no-pasivo
  // para poder llamar preventDefault() y cortar el rubber-band de iOS/Android.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let startX = 0;

    const onStart = (e: globalThis.TouchEvent) => {
      startX = e.touches[0]?.clientX ?? 0;
    };

    const onMove = (e: globalThis.TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const dx = touch.clientX - startX;
      const atStart = viewport.scrollLeft <= 0;
      const atEnd =
        viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 1;
      if ((atStart && dx > 0) || (atEnd && dx < 0)) {
        e.preventDefault();
      }
    };

    viewport.addEventListener("touchstart", onStart, { passive: true });
    viewport.addEventListener("touchmove", onMove, { passive: false });

    return () => {
      viewport.removeEventListener("touchstart", onStart);
      viewport.removeEventListener("touchmove", onMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.includes}>
      <h2 className="srOnly">{includes.srHeading}</h2>
      <div ref={pinRef} className={styles.pinLayer}>
        <Badge text={includes.badgeText} align="center" />

        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <BlurredStagger
              text={includes.titleText}
              className={styles.title}
              highlights={includes.titleHighlightWords.map((word) => ({
                word,
                useGradient: true,
                gradientColors: ["#BF953F", "#FCF6BA", "#B38728"],
              }))}
            />
          </div>

          <Button
            variant="primary"
            className={styles.headerButton}
            type="button"
            onClick={handleGoToTarget}
          >
            {includes.cta.label}
          </Button>
        </header>

        <div className={styles.carouselShell}>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
            aria-label={includes.previousButtonAriaLabel}
            onClick={() => scrollCards(-1)}
          >
            <span aria-hidden="true">‹</span>
          </button>

          <div
            ref={viewportRef}
            className={styles.viewport}
            data-lenis-prevent-touch
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
          >
            <div ref={trackRef} className={styles.track}>
              {includeItems.map((item) => (
                <article key={item.id} className={styles.card}>
                  <div className={styles.cardMedia}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 84vw, (max-width: 1024px) 52vw, 33vw"
                      className={styles.cardImage}
                    />
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardIndex}>{item.label}</span>
                      <span className={styles.cardChip}>
                        {includes.cardChipLabel}
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDescription}>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
            aria-label={includes.nextButtonAriaLabel}
            onClick={() => scrollCards(1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>

        <span className={styles.desliza}>Desliza para más →</span>

        <div className={styles.progressWrap} aria-hidden="true">
          <span className={styles.progressTrack}>
            <span ref={progressRef} className={styles.progressFill} />
          </span>
        </div>
      </div>
    </section>
  );
}
