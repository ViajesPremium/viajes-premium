"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./snapshot.module.css";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import BentoGrid from "./BentoGrid";
import Badge from "@/components/ui/badge/badge";
import { useAnimationsEnabled } from "@/lib/animation-budget";
import { usePremiumLandingConfig } from "@/landings/premium/context";

gsap.registerPlugin(ScrollTrigger);

export default function Snapshot() {
  const animationsEnabled = useAnimationsEnabled();
  const {
    sections: { aboutUs: snapshot },
  } = usePremiumLandingConfig();

  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const disableForDevice =
        !animationsEnabled && window.matchMedia("(max-width: 1024px)").matches;
      if (disableForDevice) return;

      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      const createPinnedSnapshot = (delayPx: number) => {
        ScrollTrigger.create({
          trigger: section,
          start: `bottom+=${delayPx} bottom`,
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 0.12,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        });
      };

      mm.add("(min-width: 769px)", () => {
        const delayPx = Math.round(
          Math.min(Math.max(window.innerHeight * 0.12, 72), 140),
        );
        createPinnedSnapshot(delayPx);
      });

      mm.add("(max-width: 768px)", () => {
        const delayPx = Math.round(
          Math.min(Math.max(window.innerHeight * 0.08, 44), 88),
        );
        createPinnedSnapshot(delayPx);
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [animationsEnabled] }
  );

  const titleHighlights = snapshot.titleHighlightWords.map((word) => ({
    word,
    useGradient: true,
  }));

  return (
    <section ref={sectionRef} className={styles.snapshot}>
      <h2 className="srOnly">{snapshot.srHeading}</h2>
      <div className={styles.postersWrapper} />
      <div className={styles.snapshotContent}>
        <Badge text={snapshot.badgeText} variant="dark" align="center" />
        <BlurredStagger
          text={snapshot.titleText}
          className={styles.trustStrip}
          highlights={titleHighlights}
        />
        <BentoGrid
          cards={snapshot.cards}
          buttonLabel={snapshot.cardButtonLabel}
          buttonTarget={snapshot.cardButtonTarget}
        />
      </div>
    </section>
  );
}
