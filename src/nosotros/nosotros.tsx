"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./nosotros.module.css";
import Footer from "@/layout/footer/footer";
import { DEFAULT_SITE_CONFIG } from "@/config/default-site-config";
import Founders from "@/components/fouders/founders";
import Hero from "@/components/nosotros-hero/nosotros-hero";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";

type TimelineEntry = {
  year: string;
  copy: string;
  image: string;
};

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    year: "2005",
    copy: "Nacimos como Viajes Liberacion, iniciando operaciones con entusiasmo y dedicacion al servicio del viajero.",
    image: "/images/japon/1-alma-de-japon.webp",
  },
  {
    year: "2006",
    copy: "Abrimos nuestra primera sucursal oficial en el centro de la Ciudad de Mexico, dando el primer paso hacia la expansion.",
    image: "/images/japon/1-camino-del-shogun.webp",
  },
  {
    year: "2007",
    copy: "Consolidamos una red de atencion mas amplia, manteniendo la cercania y confianza con nuestros viajeros frecuentes.",
    image: "/images/japon/1-japon-pop.webp",
  },
  {
    year: "2008",
    copy: "Incorporamos nuevos destinos internacionales a nuestro catalogo, elevando la experiencia de viaje a otro nivel.",
    image: "/images/japon/4.2-japon-pop-izq.webp",
  },
  {
    year: "2009",
    copy: "Fortalecimos alianzas estrategicas con proveedores clave para ofrecer una experiencia aun mas premium.",
    image: "/images/japon/4.3-japon-pop-der.webp",
  },
  {
    year: "2010",
    copy: "Renacimos como Turismo Santa Fe, reflejando nuestra evolucion y compromiso con la excelencia operativa.",
    image: "/images/japon/5.2-el-camino-del-shogun-izq.webp",
  },
  {
    year: "2012",
    copy: "Oficializamos el nombre Viajes PREMIUM, marcando una nueva etapa como operador turistico especializado.",
    image: "/images/japon/5.1-el-camino-del-shogun-der.webp",
  },
  {
    year: "2020",
    copy: "Nos adaptamos a los retos de la pandemia, manteniendo el compromiso con nuestros clientes a traves de atencion personalizada y cambios flexibles.",
    image: "/images/japon/6.1-acompañamiento-en-cada-etapa.webp",
  },
  {
    year: "2026",
    copy: "Celebramos 21 años de trayectoria con nuevos destinos, alianzas internacionales y una vision mas global que nunca.",
    image: "/images/japon/6.1-experiencias-culturales-curadas.webp",
  },
];

export default function NosotrosTimeline() {
  const heroPinRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const yearRefs = useRef<Array<HTMLHeadingElement | null>>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const heroPin = heroPinRef.current;
      if (!section || !heroPin) {
        return;
      }

      const heroCoverTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "top top",
        pin: heroPin,
        pinSpacing: false,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      });

      const cards = cardRefs.current.filter((card): card is HTMLElement =>
        Boolean(card),
      );
      const years = yearRefs.current.filter(
        (year): year is HTMLHeadingElement => Boolean(year),
      );

      if (!cards.length) return;

      gsap.set(cards, {
        autoAlpha: 0,
        y: 72,
        scale: 0.92,
        rotateX: 8,
        rotateZ: -1.6,
        filter: "blur(10px)",
        transformOrigin: "50% 80%",
      });

      const cardReveals = cards.map((card, index) => {
        const year = years[index];
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
          rotateZ: index % 2 === 0 ? 0.15 : -0.15,
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
        heroCoverTrigger.kill();

        cardReveals.forEach((tl) => {
          tl.scrollTrigger?.kill();
          tl.kill();
        });
      };
    },
    { scope: sectionRef },
  );

  return (
    <main className={styles.page}>
      <div ref={heroPinRef} className={styles.heroPinned}>
        <Hero />
      </div>

      <section ref={sectionRef} className={styles.section}>
        <header className={styles.header}>
          <BlurredStagger text="Nuestra Historia" className={styles.title} />
          <p className={styles.subtitle}>
            Desde 2005 construimos una historia de evolucion continua, servicio
            y vision premium.
          </p>
        </header>

        <div className={styles.timelineTrack}>
          <ol className={styles.list}>
            {TIMELINE_ENTRIES.map((entry, index) => {
              return (
                <li key={entry.year} className={styles.row}>
                  <article
                    className={styles.card}
                    ref={(card) => {
                      cardRefs.current[index] = card;
                    }}
                  >
                    <div className={styles.cardContent}>
                      <h2
                        className={styles.year}
                        ref={(year) => {
                          yearRefs.current[index] = year;
                        }}
                      >
                        {entry.year}
                      </h2>
                      <p className={styles.copy}>{entry.copy}</p>
                    </div>
                    <div
                      className={styles.cardMedia}
                      style={{ backgroundImage: `url("${entry.image}")` }}
                      role="img"
                      aria-label={`Fotografia de ${entry.year}`}
                    />
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        <Founders />
      </section>
      <Footer config={DEFAULT_SITE_CONFIG.footer} />
    </main>
  );
}
