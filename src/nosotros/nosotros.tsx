"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./nosotros.module.css";
import { TIMELINE_ENTRIES } from "./timelineData";
import { NosotrosHeader } from "./NosotrosHeader";
import { TimelineCard } from "./TimelineCard";

import Hero from "@/components/nosotros-hero/nosotros-hero";
import Founders from "@/components/fouders/founders";
import Footer from "@/layout/footer/footer";
import { useAnimationsEnabled } from "@/lib/animation-budget";
import { DEFAULT_SITE_CONFIG } from "@/config/default-site-config";

export default function Nosotros() {
  const animationsEnabled = useAnimationsEnabled();
  const heroPinRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const yearRefs = useRef<Array<HTMLHeadingElement | null>>([]);

  useGSAP(
    () => {
      const disableForDevice =
        !animationsEnabled && window.matchMedia("(max-width: 1024px)").matches;
      if (disableForDevice) return;

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const heroPin = heroPinRef.current;
      if (!section || !heroPin) return;

      const isMobileViewport = window.matchMedia("(max-width: 959px)").matches;
      // En mobile evitamos el pin del hero para prevenir offsets visuales
      // en el primer viewport.
      const heroCoverTrigger = isMobileViewport
        ? null
        : ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "top top",
            pin: heroPin,
            pinSpacing: false,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          });

      const cards = cardRefs.current.filter((c): c is HTMLElement => Boolean(c));
      const years = yearRefs.current.filter((y): y is HTMLHeadingElement => Boolean(y));
      if (!cards.length) return;

      // Estado inicial de cada tarjeta (invisible, desplazada, girada)
      gsap.set(cards, {
        autoAlpha: 0,
        y: 72,
        scale: 0.92,
        rotateX: 8,
        rotateZ: -1.6,
        filter: "blur(10px)",
        transformOrigin: "50% 80%",
      });

      // Animación de entrada por scroll para cada tarjeta
      const cardReveals = cards.map((card, i) => {
        const year = years[i];
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "top 48%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });

        tl.to(card, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateZ: i % 2 === 0 ? 0.15 : -0.15,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "expo.out",
        });

        if (year) {
          tl.fromTo(
            year,
            { letterSpacing: "0.08em", y: 14, autoAlpha: 0.25 },
            {
              letterSpacing: "0em",
              y: 0,
              autoAlpha: 1,
              color: "var(--primary)",
              duration: 0.76,
              ease: "power3.out",
            },
            0.1,
          );
        }

        return tl;
      });

      return () => {
        heroCoverTrigger?.kill();
        cardReveals.forEach((tl) => {
          tl.scrollTrigger?.kill();
          tl.kill();
        });
      };
    },
    { scope: sectionRef, dependencies: [animationsEnabled] },
  );

  return (
    <main className={styles.page}>
      {/* Hero fijado mientras el timeline sube */}
      <div ref={heroPinRef} className={styles.heroPinned}>
        <Hero />
      </div>

      {/* Timeline + Founders */}
      <section ref={sectionRef} className={styles.section}>
        <NosotrosHeader />

        <div className={styles.timelineTrack}>
          <ol className={styles.list}>
            {TIMELINE_ENTRIES.map((entry, i) => (
              <TimelineCard
                key={entry.year}
                entry={entry}
                index={i}
                cardRef={(el) => { cardRefs.current[i] = el; }}
                yearRef={(el) => { yearRefs.current[i] = el; }}
              />
            ))}
          </ol>
        </div>

        <Founders />
      </section>

      <Footer config={DEFAULT_SITE_CONFIG.footer} />
    </main>
  );
}
