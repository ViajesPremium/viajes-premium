"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./hero.module.css";
import HeroOverlay from "@/components/heroOverlay";
import { Button } from "@/components/ui/button/button";
import TextPressure from "@/components/ui/text-pressure/textPressure";


const pressureFont = "/fonts/nohemi-font-family/Nohemi-VF-BF6438cc58ad63d.ttf";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      const createPinnedHero = () => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        return () => st.kill();
      };

      mm.add("(min-width: 769px)", () => createPinnedHero());
      mm.add("(max-width: 768px)", () => createPinnedHero());

      return () => mm.revert();
    },
    { scope: sectionRef },
  );
  return (
    <div ref={sectionRef} className={styles.hero}>
      <div className={styles.titleContainer}>
        <h1 className={styles.h1}>
          <span className={`${styles.line} ${styles.desktopLine}`}>
            <span className={styles.wordSlot}>
              <TextPressure
                text="Viaja a"
                fontFamily="Nohemi"
                fontUrl={pressureFont}
                fontWeight={100}
                fontStyle="normal"
                fontSize={190}
                flex={false}
                alpha={false}
                stroke={false}
                width
                weight
                italic
                weightFrom={100}
                weightTo={400}
                scaleFrom={1}
                scaleTo={1}
                textColor="#000000"
                strokeColor="#DB2F21"
                minFontSize={50}
              />
            </span>
            <span className={styles.wordSlot}>
              <TextPressure
                text={`Jap\u00f3n`}
                fontFamily="Nohemi"
                fontUrl={pressureFont}
                fontWeight={100}
                fontStyle="normal"
                fontSize={190}
                flex={false}
                alpha={false}
                stroke={false}
                width
                weight
                italic={false}
                weightFrom={100}
                weightTo={400}
                scaleFrom={1}
                scaleTo={1}
                textColor="#000000"
                strokeColor="#DB2F21"
                minFontSize={50}
              />
            </span>
          </span>

          <span className={`${styles.line} ${styles.desktopLine}`}>
            <span className={styles.wordSlot}>
              <TextPressure
                text="desde"
                fontFamily="Nohemi"
                fontUrl={pressureFont}
                fontWeight={900}
                fontStyle="normal"
                fontSize={190}
                flex={false}
                alpha={false}
                stroke={false}
                width
                weight
                italic={false}
                weightFrom={500}
                weightTo={100}
                scaleFrom={1.09}
                scaleTo={1}
                textColor="#000000"
                strokeColor="#DB2F21"
                minFontSize={50}
              />
            </span>
            <span className={styles.wordSlot}>
              <TextPressure
                text={`M\u00e9xico`}
                fontFamily="Nohemi"
                fontUrl={pressureFont}
                fontWeight={900}
                fontStyle="normal"
                fontSize={190}
                flex={false}
                alpha={false}
                stroke={false}
                width
                weight
                italic={false}
                weightFrom={500}
                weightTo={100}
                scaleFrom={1.09}
                scaleTo={1}
                textColor="#000000"
                strokeColor="#DB2F21"
                minFontSize={50}
              />
            </span>
          </span>

          <span className={styles.mobileLine}>
            <span className={styles.mobileSmall}>Viaja a</span>
            <span className={styles.mobileBig}>{`Jap\u00f3n`}</span>
          </span>
          <span className={styles.mobileLine}>
            <span className={styles.mobileSmall}>Desde</span>
            <span className={styles.mobileBig}>{`M\u00e9xico`}</span>
          </span>
        </h1>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.description}>
          <p>{`Eleva tu vida con una forma m\u00e1s cuidada de vivir Jap\u00f3n.`}</p>
          <p>{`Dise\u00f1amos experiencias para quienes valoran atenci\u00f3n personal, criterio y una forma m\u00e1s cuidada de vivir Jap\u00f3n.`}</p>
        </div>

        <div className={styles.ctaRow}>
          <Button type="button" variant="primary">
            Solicita tu propuesta
          </Button>
          <div className={styles.cta2}>
            <Button type="button" variant="secondary">
              Ver itinerarios
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.circle} aria-hidden="true" />

      <HeroOverlay />
    </div>
  );
}

