"use client";

import "@/vision/vision.css";
import styles from "./page.module.css";
import HeroAboutUnified from "@/home/heroAboutUnified";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const Destinations = dynamic(() => import("@/home/destinations"), {
  ssr: false,
  loading: () => <div className={styles.destinationsFallback} aria-hidden="true" />,
});

export default function Home() {
  const horizontalRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const destinationsRef = useRef<HTMLElement | null>(null);
  const [shouldLoadDestinations, setShouldLoadDestinations] = useState(false);

  useEffect(() => {
    if (shouldLoadDestinations) return;
    const target = destinationsRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setShouldLoadDestinations(true);
        observer.disconnect();
      },
      { root: null, rootMargin: "450px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldLoadDestinations]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const page = horizontalRef.current;
      const track = trackRef.current;
      if (!page || !track) return;

      const getMaxHorizontalScroll = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      if (getMaxHorizontalScroll() <= 0) return;

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
          <HeroAboutUnified />
        </div>
      </section>
      <section ref={destinationsRef} className={styles.verticalScene}>
        {shouldLoadDestinations ? (
          <Destinations />
        ) : (
          <div className={styles.destinationsFallback} aria-hidden="true" />
        )}
      </section>
    </main>
  );
}
