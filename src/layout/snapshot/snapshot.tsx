"use client";

import { useEffect, useRef } from "react";
import styles from "./snapshot.module.css";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import BentoGrid from "./BentoGrid";
import Badge from "@/components/ui/badge/badge";
import { usePremiumLandingConfig } from "@/landings/premium/context";

export default function Snapshot() {
  const {
    sections: { snapshot },
  } = usePremiumLandingConfig();

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const setupPinnedSnapshot = async () => {
      const section = sectionRef.current;
      if (!section) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();
      const createPinnedSnapshot = (start: string) => {
        const st = ScrollTrigger.create({
          trigger: section,
          start,
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          // Valor bajo: con lerp=0.08 el scroll es rápido y la sección
          // ya está en su posición exacta cuando el pin dispara.
          // Más anticipación = arranca antes del momento correcto = se ve brusco.
          anticipatePin: 0.2,
          invalidateOnRefresh: true,
        });

        return () => st.kill();
      };

      mm.add("(min-width: 769px)", () => {
        // "top top": pin arranca exactamente cuando el borde superior del
        // elemento toca el borde superior del viewport — visualmente idéntico
        // a su posición natural, por lo que la transición es imperceptible.
        return createPinnedSnapshot("top top");
      });

      mm.add("(max-width: 768px)", () => createPinnedSnapshot("bottom bottom"));

      cleanup = () => mm.revert();
    };

    void setupPinnedSnapshot();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

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
