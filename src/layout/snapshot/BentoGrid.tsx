"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button/button";
import { scrollToSection } from "@/lib/scroll-to-section";
import styles from "./snapshot.module.css";
import type { SnapshotCardConfig } from "@/landings/premium/types";

gsap.registerPlugin(ScrollTrigger);

type BentoGridProps = {
  cards: SnapshotCardConfig[];
  buttonLabel: string;
  buttonTarget: string;
};

export default function BentoGrid({
  cards,
  buttonLabel,
  buttonTarget,
}: BentoGridProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleGoToTarget = useCallback(() => {
    if (buttonTarget.startsWith("#")) {
      scrollToSection(buttonTarget, { duration: 1.15 });
      return;
    }
    window.location.href = buttonTarget;
  }, [buttonTarget]);

  useEffect(() => {
    const cardElements = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cardElements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardElements.slice(0, 3),
        { y: 34, opacity: 0, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.68,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardElements[0],
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.bentoGrid}>
      {cards.map((card, index) => (
        <div
          key={`${card.text}-${index}`}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className={`${styles.bentoCard} ${card.wide ? styles.bentoCardWide : ""}`}
          style={{ backgroundImage: `url(${card.image})` }}
        >
          <div className={styles.bentoCardOverlay} />
          <p className={styles.bentoCardText}>{card.text}</p>
          <div className={styles.bentoCardContent}>
            <span className={styles.bentoCardExperiences}>
              {card.experiences}
            </span>
            <Button variant="secondary" onClick={handleGoToTarget}>
              {buttonLabel}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
