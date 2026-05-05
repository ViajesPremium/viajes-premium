"use client";

import "@/vision/vision.css";
import VisionLandingPage from "@/vision/VisionLandingPage";
import styles from "./page.module.css";
import Hero from "@/home/hero";
import AboutUs from "@/home/aboutUs";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const pageRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const page = pageRef.current;
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
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: pageRef },
  );

  // return <VisionLandingPage />;
  return (
    <main ref={pageRef} className={styles.page}>
      <div ref={trackRef} className={styles.track}>
        <section className={styles.column}>
          <Hero />
        </section>
        <section className={styles.column}>
          <AboutUs />
        </section>
      </div>
    </main>
  );
}
