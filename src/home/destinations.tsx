"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GradientText from "@/components/ui/gradient-text/gradient-text";
import { Button } from "@/components/ui/button/button";
import {
  destinationCardsData,
  type DestinationDataCard,
} from "./destinations.data";
import styles from "./destinations.module.css";

function shouldRenderCardMedia(
  index: number,
  activeIndex: number,
  total: number,
) {
  if (index === activeIndex) return true;
  if (index === activeIndex + 1) return true;
  if (index === activeIndex - 1) return true;
  if (activeIndex === 0 && index === total - 1) return true;
  if (activeIndex === total - 1 && index === 0) return true;
  return false;
}

export default function Destinations({ embedded = false }: { embedded?: boolean }) {
  const pinRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");

    const syncViewport = () => {
      setIsMobile(mediaQuery.matches);
    };

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const pin = pinRef.current;
      if (!pin) return;

      const cards = Array.from(
        pin.querySelectorAll<HTMLElement>(`.${styles.card}`),
      );
      const dimLayers = Array.from(
        pin.querySelectorAll<HTMLElement>(`.${styles.previousCardDim}`),
      );
      const leftCharacters = cards.map((card) =>
        card.querySelector<HTMLElement>(`.${styles.sideCharacterLeft}`),
      );
      const rightCharacters = cards.map((card) =>
        card.querySelector<HTMLElement>(`.${styles.sideCharacterRight}`),
      );
      if (cards.length < 2) return;

      cards.forEach((card, index) => {
        card.style.zIndex = String(index + 1);
      });

      gsap.set(cards.slice(1), {
        yPercent: 100,
        scale: 0.92,
        transformOrigin: "50% 100%",
      });
      gsap.set(dimLayers, { opacity: 0 });
      gsap.set(cards, { pointerEvents: "none" });
      gsap.set(cards[0], { pointerEvents: "auto" });
      gsap.set(leftCharacters, { xPercent: -130 });
      gsap.set(rightCharacters, { xPercent: 130 });
      if (leftCharacters[0] && rightCharacters[0]) {
        gsap.set([leftCharacters[0], rightCharacters[0]], { xPercent: 0 });
      }

      const timeline = gsap.timeline({ defaults: { ease: "none" } });

      for (let i = 1; i < cards.length; i += 1) {
        const start = i - 1;
        const previousLeft = leftCharacters[i - 1];
        const previousRight = rightCharacters[i - 1];
        const currentLeft = leftCharacters[i];
        const currentRight = rightCharacters[i];

        if (previousLeft) {
          timeline.to(
            previousLeft,
            {
              xPercent: -130,
              duration: 0.36,
              ease: "power2.inOut",
            },
            start + 0.02,
          );
        }
        if (previousRight) {
          timeline.to(
            previousRight,
            {
              xPercent: 130,
              duration: 0.36,
              ease: "power2.inOut",
            },
            start + 0.02,
          );
        }

        timeline.to(dimLayers[i - 1], { opacity: 0.13, duration: 0.2 }, start);
        timeline.to(cards[i], { yPercent: 0, scale: 1, duration: 1 }, start);
        timeline.to(
          dimLayers[i - 1],
          { opacity: 0, duration: 0.8 },
          start + 0.2,
        );

        if (currentLeft) {
          timeline.to(
            currentLeft,
            {
              xPercent: 0,
              duration: 0.42,
              ease: "power2.out",
            },
            start + 0.44,
          );
        }
        if (currentRight) {
          timeline.to(
            currentRight,
            {
              xPercent: 0,
              duration: 0.42,
              ease: "power2.out",
            },
            start + 0.44,
          );
        }
      }

      const stepCount = cards.length - 1;

      const trigger = ScrollTrigger.create({
        animation: timeline,
        trigger: pin,
        start: "top top",
        end: () => `+=${window.innerHeight * stepCount * 2.15}`,
        scrub: 1.2,
        pin: !embedded,
        anticipatePin: 0.35,
        fastScrollEnd: true,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        snap: embedded
          ? undefined
          : {
              snapTo: 1 / stepCount,
              duration: { min: 0.12, max: 0.32 },
              delay: 0.08,
            },
        onUpdate: (self) => {
          const nextIndex = Math.round(self.progress * stepCount);
          cards.forEach((card, index) => {
            card.style.pointerEvents = index === nextIndex ? "auto" : "none";
          });
          if (nextIndex !== activeIndexRef.current) {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }
        },
      });

      return () => {
        trigger.kill();
        timeline.kill();
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
        {destinationCardsData.map((card: DestinationDataCard, index) => {
          const renderHeavyMedia = shouldRenderCardMedia(
            index,
            activeIndex,
            destinationCardsData.length,
          );
          return (
            <article
              key={card.route}
              className={styles.card}
              style={
                {
                  "--card-primary": card.primaryColor,
                  "--card-secondary": card.secondaryColor,
                } as CSSProperties
              }
            >
              <div className={styles.previousCardDim} aria-hidden="true" />
              <div
                className={styles.cardBackgroundOverlay}
                aria-hidden="true"
              />

              <div className={styles.sideCharacters} aria-hidden="true">
                <div className={styles.sideCharacterLeft} />
                <div className={styles.sideCharacterRight} />
              </div>

              {renderHeavyMedia && !isMobile ? (
                <div className={styles.editorialImages} aria-hidden="true">
                  {card.galleryImages.slice(0, 4).map((image, imageIndex) => (
                    <figure
                      key={`${card.route}-photo-${imageIndex}`}
                      className={`${styles.editorialFrame} ${styles[`editorialFrame${imageIndex + 1}`]}`}
                    >
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(max-width: 900px) 55vw, 30vw"
                        quality={70}
                        className={styles.editorialImage}
                        loading={
                          index === 0 && imageIndex === 0 ? "eager" : "lazy"
                        }
                        priority={index === 0 && imageIndex === 0}
                      />
                    </figure>
                  ))}
                </div>
              ) : null}

              <div className={styles.cardCopy}>
                <h2 className={styles.title}>{card.label}</h2>
                <GradientText as="span" className={styles.premiumText}>
                  PREMIUM
                </GradientText>
                {isMobile ? (
                  <figure className={styles.mobileFeatureImage}>
                    <Image
                      src={card.galleryImages[0]}
                      alt={card.label}
                      fill
                      sizes="92vw"
                      quality={70}
                      className={styles.mobileFeatureImageMedia}
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                    />
                  </figure>
                ) : null}
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
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
