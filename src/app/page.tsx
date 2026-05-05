"use client";

import "@/vision/vision.css";
import VisionLandingPage from "@/vision/VisionLandingPage";
import styles from "./page.module.css";
import Hero from "@/home/hero";
import AboutUs from "@/home/aboutUs";
import Destinations from "@/home/destinations";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const horizontalRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const page = horizontalRef.current;
      const track = trackRef.current;
      if (!page || !track) return;

      const sections = track.querySelectorAll(`.${styles.column}`);
      if (!sections.length) return;

      const getMaxHorizontalScroll = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getMaxHorizontalScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: page,
          start: "top top",
          end: () => `+=${getMaxHorizontalScroll()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          refreshPriority: 2,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: horizontalRef },
  );

  // return <VisionLandingPage />;
  return (
    <main className={styles.page}>
      <section ref={horizontalRef} className={styles.horizontalScene}>
        <div ref={trackRef} className={styles.track}>
          <section className={styles.column}>
            <Hero />
          </section>
          <section className={styles.column}>
            <AboutUs />
          </section>
        </div>
      </section>
      <section className={styles.verticalScene}>
        <Destinations />
      </section>
    </main>
  );
}
