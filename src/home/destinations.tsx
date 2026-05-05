"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GradientText from "@/components/ui/gradient-text/gradient-text";
import HeroOverlayLazy from "@/components/HeroOverlayLazy";
import { Button } from "@/components/ui/button/button";
import { barrancasPremiumLandingConfig } from "@/landings/premium/configs/barrancas-premium";
import { canadaPremiumLandingConfig } from "@/landings/premium/configs/canada-premium";
import { chiapasPremiumLandingConfig } from "@/landings/premium/configs/chiapas-premium";
import { coreaPremiumLandingConfig } from "@/landings/premium/configs/corea-premium";
import { europaPremiumLandingConfig } from "@/landings/premium/configs/europa-premium";
import { japonPremiumLandingConfig } from "@/landings/premium/configs/japon-premium";
import { peruPremiumLandingConfig } from "@/landings/premium/configs/peru-premium";
import { yucatanPremiumLandingConfig } from "@/landings/premium/configs/yucatan-premium";
import type { PremiumLandingConfig } from "@/landings/premium/types";
import styles from "./destinations.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type DestinationCard = {
  label: string;
  route: string;
  overlayImages?: PremiumLandingConfig["sections"]["hero"]["heroOverlay"];
  primaryColor: string;
  backgroundImage?: string;
  description: string;
  galleryImages: string[];
  reviewUrl: string;
  reviews: Array<{ name: string; quote: string; avatar: string }>;
};

type DestinationVisualSet = {
  backgroundImage: string;
  galleryImages: string[];
};

// ─── Visual overrides per destination ────────────────────────────────────────

const destinationVisualsByRoute: Record<string, DestinationVisualSet> = {
  "/japon-premium": {
    backgroundImage:
      "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "/europa-premium": {
    backgroundImage:
      "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "https://images.unsplash.com/photo-1499856871958-5b9357976b82?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "/corea-premium": {
    backgroundImage:
      "https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "https://images.unsplash.com/photo-1538485399081-7c89779f9b35?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/2948247/pexels-photo-2948247.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1440475/pexels-photo-1440475.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "/canada-premium": {
    backgroundImage:
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/1126384/pexels-photo-1126384.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "/peru-premium": {
    backgroundImage:
      "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/1653361/pexels-photo-1653361.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "/chiapas-premium": {
    backgroundImage:
      "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "https://images.unsplash.com/photo-1518632616182-6b3c9952f4f5?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "/barrancas-premium": {
    backgroundImage:
      "https://images.pexels.com/photos/356807/pexels-photo-356807.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1510595/pexels-photo-1510595.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "/yucatan-premium": {
    backgroundImage:
      "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/1202723/pexels-photo-1202723.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
};

// ─── Card builder ─────────────────────────────────────────────────────────────

function buildDestinationCard(
  label: string,
  route: string,
  config: PremiumLandingConfig,
): DestinationCard {
  const heroLine = config.sections.hero.descriptionLines?.[0];
  const description = heroLine
    ? `${heroLine.highlight} ${heroLine.text}`
    : config.metadata.description;

  const fallbackGalleryImages = [
    config.sections.hero.backgroundImage,
    ...config.sections.snapshot.cards.map((card) => card.image),
    ...config.sections.includes.items.map((item) => item.image),
  ]
    .filter(Boolean)
    .filter((value, index, array) => array.indexOf(value) === index)
    .slice(0, 7);

  const destinationVisualSet = destinationVisualsByRoute[route];
  const backgroundImage =
    destinationVisualSet?.backgroundImage ??
    config.sections.hero.backgroundImage;
  const galleryImages = destinationVisualSet?.galleryImages?.length
    ? destinationVisualSet.galleryImages
    : fallbackGalleryImages;

  const reviews = config.sections.testimonials.items
    .slice(0, 3)
    .map((item) => ({
      name: item.name,
      quote: item.quote,
      avatar: item.avatar,
    }));

  const reviewUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `${config.metadata.title} reseñas`,
  )}`;

  return {
    label,
    route,
    overlayImages: config.sections.hero.heroOverlay,
    primaryColor: config.theme.primary,
    backgroundImage,
    description,
    galleryImages,
    reviewUrl,
    reviews,
  };
}

const destinationCards: DestinationCard[] = [
  buildDestinationCard("Japon", "/japon-premium", japonPremiumLandingConfig),
  buildDestinationCard("Europa", "/europa-premium", europaPremiumLandingConfig),
  buildDestinationCard("Corea", "/corea-premium", coreaPremiumLandingConfig),
  buildDestinationCard("Canada", "/canada-premium", canadaPremiumLandingConfig),
  buildDestinationCard("Peru", "/peru-premium", peruPremiumLandingConfig),
  buildDestinationCard("Chiapas", "/chiapas-premium", chiapasPremiumLandingConfig),
  buildDestinationCard("Barrancas", "/barrancas-premium", barrancasPremiumLandingConfig),
  buildDestinationCard("Mexico", "/yucatan-premium", yucatanPremiumLandingConfig),
];

// ─── Animation constants ──────────────────────────────────────────────────────

/**
 * FOLD_DUR   – tiempo que dura el pliegue del card (se dobla hasta quedar de canto)
 * DWELL_DUR  – tiempo que el nuevo card queda quieto antes del siguiente pliegue
 * STEP_DUR   – duración total de cada transición en la timeline
 *
 * perspective – alto valor → menos distorsión → aspecto más editorial / impreso
 */
const FOLD_DUR  = 0.65;
const DWELL_DUR = 1.0;
const STEP_DUR  = FOLD_DUR + DWELL_DUR;
const PERSPECTIVE = 2600;

// ─── Component ────────────────────────────────────────────────────────────────

export default function Destinations() {
  const pinRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const pin = pinRef.current;
      if (!pin) return;

      const cards = Array.from(
        pin.querySelectorAll<HTMLElement>(`.${styles.card}`),
      );
      if (cards.length < 2) return;

      const stepCount = cards.length - 1;

      // ── Z-order: primer card arriba (mayor z-index) ──────────────────
      cards.forEach((card, index) => {
        card.style.zIndex = String(cards.length + 1 - index);
      });

      // ── Estado inicial ───────────────────────────────────────────────
      gsap.set(cards, {
        rotationY: 0,
        transformOrigin: "50% 50%",  // eje de doblado: mitad del card
        transformPerspective: PERSPECTIVE,
        backfaceVisibility: "hidden", // se oculta cuando pasa de canto (-90°)
        pointerEvents: "none",
      });
      gsap.set(cards[0], { pointerEvents: "auto" });

      // Cards debajo comienzan levemente más pequeños → sensación de profundidad
      gsap.set(cards.slice(1), { scale: 0.96 });

      // Spine: línea de pliegue central
      const spines = Array.from(
        pin.querySelectorAll<HTMLElement>(`.${styles.bookSpine}`),
      );
      gsap.set(spines, { opacity: 0, scaleY: 0 });

      // Shadow: oscurece el card mientras se dobla
      const shadows = Array.from(
        pin.querySelectorAll<HTMLElement>(`.${styles.bookShadow}`),
      );
      gsap.set(shadows, { opacity: 0 });

      // ── Timeline principal ───────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "none" } });

      for (let i = 0; i < stepCount; i++) {
        const t = i * STEP_DUR;

        // Card se dobla en su eje central hasta quedar de canto (-90°)
        tl.to(
          cards[i],
          { rotationY: -90, duration: FOLD_DUR },
          t,
        );

        // El card debajo sube de escala mientras el de arriba se dobla
        tl.to(
          cards[i + 1],
          { scale: 1, duration: FOLD_DUR },
          t,
        );

        // Línea de pliegue: aparece al inicio del fold y se desvanece al terminar
        if (spines[i]) {
          tl.to(
            spines[i],
            { opacity: 1, scaleY: 1, duration: FOLD_DUR * 0.45, ease: "power2.out" },
            t,
          );
          tl.to(
            spines[i],
            { opacity: 0, duration: FOLD_DUR * 0.55, ease: "power2.in" },
            t + FOLD_DUR * 0.45,
          );
        }

        // Sombra progresiva: simula la oscuridad en el doblez del papel
        if (shadows[i]) {
          tl.to(
            shadows[i],
            { opacity: 1, duration: FOLD_DUR * 0.5 },
            t,
          );
          tl.to(
            shadows[i],
            { opacity: 0, duration: FOLD_DUR * 0.5 },
            t + FOLD_DUR * 0.5,
          );
        }
      }

      const totalDuration = stepCount * STEP_DUR;

      // Snap points: tras cada pliegue, el nuevo card queda centrado un momento
      const snapPoints = cards.map((_, i) => {
        if (i === 0) return 0;
        // snap justo cuando termina el fold (inicio del dwell)
        return (i * STEP_DUR - DWELL_DUR * 0.5) / totalDuration;
      });

      const trigger = ScrollTrigger.create({
        animation: tl,
        trigger: pin,
        start: "top top",
        end: () => `+=${window.innerHeight * stepCount * 2.4}`,
        scrub: 1.1,
        pin: true,
        anticipatePin: 1,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: snapPoints,
          duration: { min: 0.08, max: 0.28 },
          delay: 0.04,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress * totalDuration;
          let activeIndex = 0;
          for (let i = 0; i < stepCount; i++) {
            if (progress >= i * STEP_DUR + FOLD_DUR * 0.5) activeIndex = i + 1;
          }
          cards.forEach((card, index) => {
            card.style.pointerEvents = index === activeIndex ? "auto" : "none";
          });
        },
      });

      return () => {
        trigger.kill();
        tl.kill();
      };
    },
    { scope: pinRef },
  );

  return (
    <section
      ref={pinRef}
      className={styles.container}
      aria-label="Destinations Story"
    >
      <div className={styles.stack}>
        {destinationCards.map((card) => (
          <article
            key={card.route}
            className={styles.card}
            style={{ "--card-primary": card.primaryColor } as CSSProperties}
          >
            {/* ── Fondo ────────────────────────────────────────────────── */}
            <div
              className={styles.cardBackground}
              style={{ backgroundImage: `url(${card.backgroundImage})` }}
              aria-hidden="true"
            />
            <div className={styles.cardBackgroundOverlay} aria-hidden="true" />

            {/* ── Overlay interactivo ──────────────────────────────────── */}
            <div className={styles.heroOverlayWrap}>
              <HeroOverlayLazy overlayImages={card.overlayImages} />
            </div>

            {/* ── Efectos de doblado (animados por GSAP) ───────────────── */}
            {/* Línea de pliegue en el eje central */}
            <div className={styles.bookSpine} aria-hidden="true" />
            {/* Sombra que oscurece el card mientras se dobla */}
            <div className={styles.bookShadow} aria-hidden="true" />

            {/* ── Galería fotográfica ──────────────────────────────────── */}
            <div className={styles.visualPane} aria-hidden="true">
              <div className={styles.photoSpread}>
                {card.galleryImages.slice(0, 3).map((image, index) => (
                  <figure
                    key={`${card.route}-photo-${index}`}
                    className={`${styles.photoFrame} ${styles[`photoFrame${index + 1}`]}`}
                  >
                    <img
                      src={image}
                      alt=""
                      className={styles.photoImage}
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
            </div>

            {/* ── Contenido editorial ──────────────────────────────────── */}
            <div className={styles.cardCopy}>
              <h2 className={styles.title}>{card.label}</h2>
              <GradientText as="span" className={styles.premiumText}>
                PREMIUM
              </GradientText>
              <p className={styles.description}>{card.description}</p>

              <Button
                type="button"
                className={styles.primaryButton}
                onClick={() => {
                  window.location.href = card.route;
                }}
              >
                Ver Destino
              </Button>

              <div className={styles.reviewsFlow}>
                {card.reviews.slice(0, 2).map((review, index) => (
                  <article
                    key={`${card.route}-review-${review.name}-${index}`}
                    className={styles.reviewNoteFlow}
                  >
                    <div className={styles.reviewHeader}>
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className={styles.reviewAvatar}
                      />
                      <p className={styles.reviewName}>{review.name}</p>
                    </div>
                    <p className={styles.reviewText}>"{review.quote}"</p>
                    <Button
                      type="button"
                      variant="secondary"
                      className={styles.reviewButton}
                      onClick={() =>
                        window.open(
                          card.reviewUrl,
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                    >
                      Ver reseña en Google
                    </Button>
                  </article>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
