"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./snapshot.module.css";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import BentoGrid from "./BentoGrid";
import Badge from "@/components/ui/badge/badge";

export default function Snapshot() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      const createPinnedSnapshot = (start: string) => {
        const st = ScrollTrigger.create({
          trigger: section,
          start,
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        return () => st.kill();
      };

      mm.add("(min-width: 769px)", () => {
        const pinDelay = Math.round(window.innerHeight * 0.12);
        return createPinnedSnapshot(`top+=${pinDelay} top`);
      });

      mm.add("(max-width: 768px)", () => {
        // En mobile el pin inicia hasta que se alcanzó el final visual de Snapshot.
        return createPinnedSnapshot("bottom bottom");
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={styles.snapshot}>
      <div className={styles.postersWrapper} />
      <div className={styles.snapshotContent}>
        <Badge text={`Nueva secci\u00f3n`} variant="dark" align="center" />
        <BlurredStagger
          text={`M\u00e1s de 21 a\u00f1os dise\u00f1ando experiencias premium.`}
          className={styles.trustStrip}
          highlights={[
            { word: "21", useGradient: true },
            { word: `a\u00f1os`, useGradient: true },
            { word: "premium", useGradient: true },
          ]}
        />
        <BentoGrid />
      </div>
    </section>
  );
}
