"use client";

import { useCallback, useRef, type TouchEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Badge from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { scrollToSection } from "@/lib/scroll-to-section";
import styles from "./includes.module.css";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";

type IncludeItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
};

const INCLUDE_ITEMS: IncludeItem[] = [
  {
    id: "stays",
    label: "I",
    title: "Estancias con carácter",
    description:
      "Espacios cuidadosamente seleccionados por ubicación, servicio y la experiencia que aportan al viaje.",
    image: "/images/japon/6-estancias-con-caracter.webp",
  },
  {
    id: "transport",
    label: "II",
    title: "Traslados mejor coordinados",
    description:
      "Shinkansen, traslados privados y tiempos pensados para que el viaje fluya con más orden y comodidad.",
    image: "/images/japon/6-traslados-mejor-coordinados.webp",
  },
  {
    id: "culture",
    label: "III",
    title: "Experiencias culturales curadas",
    description:
      "Templos, barrios históricos y actividades elegidas para conectar con el Japón más auténtico.",
    image: "/images/japon/6-experiencias-culturales-curadas.webp",
  },
  {
    id: "gastronomy",
    label: "IV",
    title: "Escenas gastronómicas seleccionadas",
    description:
      "Reservas y momentos en la mesa pensados para descubrir Japón con más detalle y autenticidad.",
    image: "/images/japon/6-escenas-gastronomicas-seleccionadas.webp",
  },
  {
    id: "support",
    label: "V",
    title: "Acompañamiento en cada etapa",
    description:
      "Atención en español antes y durante el viaje para acompañarle con claridad y resolver cada detalle.",
    image: "/images/japon/6-acompañamiento-en-cada-etapa.webp",
  },
];

// Ajuste de ritmo horizontal (solo codigo, no UI):
// - horizontalFactor: mayor valor = cards avanzan mas lento
const INCLUDES_SCROLL_TUNING = {
  horizontalFactor: 3,
  pinAnticipation: 0.72,
  pinScrub: 0.68,
} as const;

export default function Includes() {
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
      const maxIndex = Math.max(INCLUDE_ITEMS.length - 1, 0);
      const clampedIndex = Math.max(0, Math.min(index, maxIndex));
      viewport.scrollTo({
        left: clampedIndex * step,
        behavior,
      });
    },
    [getCardStep],
  );
  const handleGoToForm = useCallback(() => {
    scrollToSection("#form", { duration: 1.15 });
  }, []);

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
        // Mobile: sin pin ni desplazamiento horizontal.
        gsap.set(track, { clearProps: "transform" });
        gsap.set(progressFill, { clearProps: "transform" });
      });

      mm.add("(min-width: 769px)", () => {
        gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });

        // Debe calcularse con el ancho visible del carrusel (viewport),
        // no con pinLayer, para que la ultima card llegue completa.
        const getShift = () =>
          Math.max(track.scrollWidth - viewport.clientWidth, 0);
        const getEndDistance = () =>
          getShift() * INCLUDES_SCROLL_TUNING.horizontalFactor;

        // Timeline de una sola fase: solo desplazamiento horizontal.
        // Se elimina la pausa final para liberar el pin en cuanto termina.
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
            // Keep Lenis limit in sync after pin spacer is inserted/resized
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

  return (
    <section ref={sectionRef} className={styles.includes}>
      <h2 className="srOnly">Lo esencial de la experiencia premium</h2>
      <div ref={pinRef} className={styles.pinLayer}>
        <Badge text="LO ESCENCIAL" align="center" />

        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <BlurredStagger
              text="Lo que da forma a tu experiencia premium"
              className={styles.title}
              highlights={[
                {
                  word: "premium",
                  useGradient: true,
                  gradientColors: ["#BF953F", "#FCF6BA", "#B38728"],
                },
                {
                  word: "forma",
                  useGradient: true,
                  gradientColors: ["#BF953F", "#FCF6BA", "#B38728"],
                },

                {
                  word: "da",
                  useGradient: true,
                  gradientColors: ["#BF953F", "#FCF6BA", "#B38728"],
                },
              ]}
            />
          </div>

          <Button
            variant="primary"
            className={styles.headerButton}
            type="button"
            onClick={handleGoToForm}
          >
            Solicita tu propuesta
          </Button>
        </header>

        <div className={styles.carouselShell}>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
            aria-label="Anterior"
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
              {INCLUDE_ITEMS.map((item) => (
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
                      <span className={styles.cardChip}>Integramos</span>
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
            aria-label="Siguiente"
            onClick={() => scrollCards(1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>

        <div className={styles.progressWrap} aria-hidden="true">
          <span className={styles.progressTrack}>
            <span ref={progressRef} className={styles.progressFill} />
          </span>
        </div>
      </div>
    </section>
  );
}
