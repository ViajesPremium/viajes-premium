"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button/button";
import { scrollToSection } from "@/lib/scroll-to-section";
import styles from "./snapshot.module.css";

gsap.registerPlugin(ScrollTrigger);

const bentoCards = [
  { image: "/images/japon/stockImage.webp", text: "Kyoto & Nara", wide: false },
  {
    image: "/images/japon/stockImage.webp",
    text: "Gastronomía auténtica",
    wide: false,
  },
  { image: "/images/japon/stockImage.webp", text: "Hospedaje de lujo", wide: false },
];

export default function BentoGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const handleGoToForm = useCallback(() => {
    scrollToSection("#form", { duration: 1.15 });
  }, []);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards.slice(0, 3),
        { y: 34, opacity: 0, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.68,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cards[0],
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
      {bentoCards.map((card, i) => (
        <div
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={`${styles.bentoCard} ${card.wide ? styles.bentoCardWide : ""}`}
          style={{ backgroundImage: `url(${card.image})` }}
        >
          <div className={styles.bentoCardOverlay} />
          <div className={styles.bentoCardContent}>
            <p className={styles.bentoCardText}>{card.text}</p>
            <Button variant="secondary" onClick={handleGoToForm}>
              Descubrir
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
