"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button/button";
import { scrollToSection } from "@/lib/scroll-to-section";
import styles from "./snapshot.module.css";
import type { AboutUsCardConfig } from "@/landings/premium/types";

gsap.registerPlugin(ScrollTrigger);

type BentoGridProps = {
  cards: AboutUsCardConfig[];
  buttonLabel: string;
  buttonTarget: string;
};

export default function BentoGrid({
  cards,
  buttonLabel,
  buttonTarget,
}: BentoGridProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleGoToTarget = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (buttonTarget.startsWith("#")) {
        scrollToSection(buttonTarget, { duration: 1.15 });
        return;
      }
      window.location.href = buttonTarget;
    },
    [buttonTarget],
  );

  useEffect(() => {
    const cardElements = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cardElements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardElements[0],
            start: "top 85%",
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
          className={styles.bentoCard}
        >
          <Image
            src={card.image}
            alt=""
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
            style={{ objectFit: "cover" }}
          />
          <p className={styles.bentoCardText}>{card.text}</p>
          <div className={styles.bentoCardOverlay} />

          <div className={styles.bentoCardFooter}>
            <span className={styles.bentoCardExperiences}>
              {card.experiences}
            </span>

            <Button
              variant="secondary"
              onClick={handleGoToTarget}
              className="shrink-0"
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
