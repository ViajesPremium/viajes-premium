"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./nosotros.module.css";
import HomeFooter from "@/home/homeFooter";

type TimelineEntry = {
  year: string;
  copy: string;
};

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    year: "2005",
    copy: "Nacimos como Viajes Liberacion, iniciando operaciones con entusiasmo y dedicacion al servicio del viajero.",
  },
  {
    year: "2006",
    copy: "Abrimos nuestra primera sucursal oficial en el centro de la Ciudad de Mexico, dando el primer paso hacia la expansion.",
  },
  {
    year: "2007",
    copy: "Consolidamos una red de atencion mas amplia, manteniendo la cercania y confianza con nuestros viajeros frecuentes.",
  },
  {
    year: "2008",
    copy: "Incorporamos nuevos destinos internacionales a nuestro catalogo, elevando la experiencia de viaje a otro nivel.",
  },
  {
    year: "2009",
    copy: "Fortalecimos alianzas estrategicas con proveedores clave para ofrecer una experiencia aun mas premium.",
  },
  {
    year: "2010",
    copy: "Renacimos como Turismo Santa Fe, reflejando nuestra evolucion y compromiso con la excelencia operativa.",
  },
  {
    year: "2012",
    copy: "Oficializamos el nombre Viajes PREMIUM, marcando una nueva etapa como operador turistico especializado.",
  },
  {
    year: "2020",
    copy: "Nos adaptamos a los retos de la pandemia, manteniendo el compromiso con nuestros clientes a traves de atencion personalizada y cambios flexibles.",
  },
  {
    year: "2026",
    copy: "Celebramos 21 anos de trayectoria con nuevos destinos, alianzas internacionales y una vision mas global que nunca.",
  },
];

type PathPoint = {
  x: number;
  y: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function buildSmoothPath(points: PathPoint[]): string {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    const dy = curr.y - prev.y;
    const controlOffset = Math.max(40, Math.abs(dy) * 0.52);

    d += ` C ${prev.x} ${prev.y + controlOffset}, ${curr.x} ${curr.y - controlOffset}, ${curr.x} ${curr.y}`;
  }

  return d;
}

export default function NosotrosTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const spineSvgRef = useRef<SVGSVGElement | null>(null);
  const spineBasePathRef = useRef<SVGPathElement | null>(null);
  const spineProgressPathRef = useRef<SVGPathElement | null>(null);
  const spineDotRef = useRef<SVGCircleElement | null>(null);
  const rowRefs = useRef<Array<HTMLLIElement | null>>([]);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const yearRefs = useRef<Array<HTMLHeadingElement | null>>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const timeline = timelineRef.current;
      const spineSvg = spineSvgRef.current;
      const spineBasePath = spineBasePathRef.current;
      const spineProgressPath = spineProgressPathRef.current;
      const spineDot = spineDotRef.current;
      if (
        !section ||
        !timeline ||
        !spineSvg ||
        !spineBasePath ||
        !spineProgressPath ||
        !spineDot
      ) {
        return;
      }

      const rows = rowRefs.current.filter((row): row is HTMLLIElement =>
        Boolean(row),
      );
      const cards = cardRefs.current.filter((card): card is HTMLElement =>
        Boolean(card),
      );
      const years = yearRefs.current.filter(
        (year): year is HTMLHeadingElement => Boolean(year),
      );

      if (!rows.length || !cards.length) return;

      const drawTracker = { progress: 0 };
      let totalPathLength = 0;
      let refreshFrame = 0;

      const syncLineDraw = () => {
        if (!totalPathLength) return;

        const drawLength = totalPathLength * drawTracker.progress;
        const boundedDrawLength = clamp(drawLength, 0, totalPathLength);
        const point = spineProgressPath.getPointAtLength(boundedDrawLength);

        gsap.set(spineProgressPath, {
          strokeDasharray: totalPathLength,
          strokeDashoffset: totalPathLength - boundedDrawLength,
        });

        gsap.set(spineDot, {
          autoAlpha: drawTracker.progress > 0.003 ? 1 : 0,
          attr: {
            cx: point.x,
            cy: point.y,
          },
        });
      };

      const updateSpineLayout = () => {
        const timelineRect = timeline.getBoundingClientRect();
        const width = Math.max(320, Math.round(timeline.clientWidth));
        const height = Math.max(920, Math.round(timeline.scrollHeight));
        const isMobile = window.matchMedia("(max-width: 959px)").matches;
        const centerX = isMobile ? 38 : width / 2;
        const swing = isMobile ? 16 : clamp(width * 0.115, 62, 112);

        const rowCenters = rows.map((row) => {
          const rowRect = row.getBoundingClientRect();
          return rowRect.top - timelineRect.top + rowRect.height / 2;
        });

        if (!rowCenters.length) return;

        const startY = Math.max(24, rowCenters[0] - (isMobile ? 58 : 84));
        const endY = Math.min(
          height - 24,
          rowCenters[rowCenters.length - 1] + (isMobile ? 116 : 156),
        );

        const pathPoints: PathPoint[] = [{ x: centerX, y: startY }];

        rowCenters.forEach((y, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          pathPoints.push({ x: centerX + direction * swing, y });
        });

        pathPoints.push({ x: centerX, y: endY });

        const d = buildSmoothPath(pathPoints);
        spineSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        spineBasePath.setAttribute("d", d);
        spineProgressPath.setAttribute("d", d);

        totalPathLength = spineProgressPath.getTotalLength();
        syncLineDraw();
      };

      const queueRefresh = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          updateSpineLayout();
          ScrollTrigger.refresh();
        });
      };

      gsap.set(cards, { autoAlpha: 0, y: 28 });
      gsap.set(spineDot, { autoAlpha: 0 });

      const cardReveals = cards.map((card, index) => {
        const year = years[index];
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
            end: "top 58%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          card,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
          },
          0,
        );

        if (year) {
          tl.to(
            year,
            {
              color: "#95231c",
              duration: 0.5,
              ease: "power2.out",
            },
            0.06,
          );
        }

        return tl;
      });

      updateSpineLayout();

      const lineTween = gsap.to(drawTracker, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
          invalidateOnRefresh: true,
          onRefreshInit: updateSpineLayout,
        },
        onUpdate: syncLineDraw,
      });

      const resizeObserver = new ResizeObserver(queueRefresh);
      resizeObserver.observe(timeline);
      window.addEventListener("orientationchange", queueRefresh);
      window.addEventListener("resize", queueRefresh);

      return () => {
        cancelAnimationFrame(refreshFrame);
        resizeObserver.disconnect();
        window.removeEventListener("orientationchange", queueRefresh);
        window.removeEventListener("resize", queueRefresh);

        cardReveals.forEach((tl) => {
          tl.scrollTrigger?.kill();
          tl.kill();
        });

        lineTween.scrollTrigger?.kill();
        lineTween.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <main className={styles.page}>
      <section ref={sectionRef} className={styles.section}>
        <header className={styles.header}>
          <p className={styles.kicker}>NOSOTROS</p>
          <h1 className={styles.title}>Nuestra Historia</h1>
          <p className={styles.subtitle}>
            Desde 2005 construimos una historia de evolucion continua, servicio
            y vision premium.
          </p>
        </header>

        <div ref={timelineRef} className={styles.timelineTrack}>
          <svg ref={spineSvgRef} className={styles.spineSvg} aria-hidden="true">
            <path ref={spineBasePathRef} className={styles.spineBase} />
            <path ref={spineProgressPathRef} className={styles.spineProgress} />
            <circle ref={spineDotRef} className={styles.spineDot} r="8" />
          </svg>

          <ol className={styles.list}>
            {TIMELINE_ENTRIES.map((entry, index) => {
              const sideClass =
                index % 2 === 0 ? styles.rowLeft : styles.rowRight;
              return (
                <li
                  key={entry.year}
                  className={`${styles.row} ${sideClass}`}
                  ref={(row) => {
                    rowRefs.current[index] = row;
                  }}
                >
                  <span className={styles.centerCol} aria-hidden="true" />

                  <article
                    className={styles.card}
                    ref={(card) => {
                      cardRefs.current[index] = card;
                    }}
                  >
                    <h2
                      className={styles.year}
                      ref={(year) => {
                        yearRefs.current[index] = year;
                      }}
                    >
                      {entry.year}
                    </h2>
                    <p className={styles.copy}>{entry.copy}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
      <HomeFooter />
    </main>
  );
}
