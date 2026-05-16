"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import styles from "./homeHero.module.css";

export default function HomeHero() {
  const slides = [
    {
      right: "/images/europa/itinerarios/derecha/scroll-gala-derecha.webp",
      left: "/images/europa/itinerarios/izquierda/scroll-gala-izquierda.webp",
    },
    {
      right:
        "/images/europa/itinerarios/derecha/scroll-maravillas-derecha.webp",
      left: "/images/europa/itinerarios/izquierda/scroll-maravillas-izquierda.webp",
    },
    {
      right: "/images/europa/itinerarios/derecha/scroll-reserva-derecha.webp",
      left: "/images/europa/itinerarios/izquierda/scroll-reserva-izquierda.webp",
    },
  ] as const;
  const containerRef = useRef<HTMLDivElement>(null);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeStepRef = useRef(0);

  useGSAP(
    () => {
      const total = slides.length;
      if (!total) return;

      for (let i = 0; i < total; i++) {
        const visible = i <= activeStepRef.current;
        gsap.set(rightRefs.current[i], { yPercent: visible ? 0 : 100 });
        gsap.set(leftRefs.current[i], { yPercent: visible ? 0 : -100 });
      }

      const intervalId = window.setInterval(() => {
        const nextStep = (activeStepRef.current + 1) % total;
        activeStepRef.current = nextStep;

        const tl = gsap.timeline({
          defaults: { ease: "power2.out", duration: 0.2 },
        });

        for (let i = 0; i < total; i++) {
          const visible = i <= nextStep;
          tl.to(rightRefs.current[i], { yPercent: visible ? 0 : 100 }, 0);
          tl.to(leftRefs.current[i], { yPercent: visible ? 0 : -100 }, 0);
        }
      }, 5000);

      return () => {
        window.clearInterval(intervalId);
      };
    },
    { scope: containerRef },
  );

  return (
    <section className={styles.planetPane} aria-label="Planeta central">
      <div className={styles.imgContainer} ref={containerRef}>
        <div className={styles.heroTitleWrap}>
          <p className={styles.heroKicker}>El poder de viajar en clase</p>
          <h1 className={styles.heroTitle}>PREMIUM</h1>
        </div>
        <div className={styles.imgCol}>
          {slides.map((slide, i) => (
            <div
              key={`right-${slide.right}`}
              ref={(el) => {
                rightRefs.current[i] = el;
              }}
              className={styles.imageFrame}
            >
              <Image
                src={slide.right}
                alt="Alojamiento de lujo"
                fill
                className={styles.imgMedia}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
        <div className={styles.imgCol}>
          {slides.map((slide, i) => (
            <div
              key={`left-${slide.left}`}
              ref={(el) => {
                leftRefs.current[i] = el;
              }}
              className={styles.imageFrame}
            >
              <Image
                src={slide.left}
                alt="Naturaleza escondida"
                fill
                className={styles.imgMedia}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
