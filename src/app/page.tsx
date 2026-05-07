"use client";

import "@/vision/vision.css";
import styles from "./page.module.css";
import HeroAboutUnified from "@/home/heroAboutUnified";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { destinationCardsData } from "@/home/destinations.data";

const Destinations = dynamic(() => import("@/home/destinations"), {
  ssr: false,
  loading: () => <div className={styles.destinationsFallback} aria-hidden="true" />,
});
const HomeFaqs = dynamic(() => import("@/home/homeFaqs"), {
  ssr: false,
  loading: () => <div className={styles.faqsFallback} aria-hidden="true" />,
});
const HomeTestimonials = dynamic(() => import("@/home/homeTestimonials"), {
  ssr: false,
  loading: () => <div className={styles.sectionFallback} aria-hidden="true" />,
});
const HomeFooter = dynamic(() => import("@/home/homeFooter"), {
  ssr: false,
  loading: () => <div className={styles.footerFallback} aria-hidden="true" />,
});

export default function Home() {
  const horizontalRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dualSceneRef = useRef<HTMLElement | null>(null);
  const dualTrackRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadDestinations, setShouldLoadDestinations] = useState(false);

  useEffect(() => {
    if (shouldLoadDestinations) return;
    const target = dualSceneRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setShouldLoadDestinations(true);
        observer.disconnect();
      },
      { root: null, rootMargin: "1200px 0px" },
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
          end: () => `+=${getMaxHorizontalScroll() * 1.12}`,
          scrub: 1.25,
          pin: true,
          anticipatePin: 0.4,
          fastScrollEnd: true,
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

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const scene = dualSceneRef.current;
      const track = dualTrackRef.current;
      if (!scene || !track) return;

      const stepCount = Math.max(1, destinationCardsData.length - 1);
      const cardsScrollDistance = window.innerHeight * stepCount * 1.9;
      const faqHorizontalDistance = window.innerWidth;
      const totalDistance = cardsScrollDistance + faqHorizontalDistance;

      gsap.set(track, { x: () => -window.innerWidth });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scene,
          start: "top top",
          end: () => `+=${totalDistance * 1.08}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 0.35,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(track, { x: () => -window.innerWidth, duration: cardsScrollDistance })
        .to(track, { x: 0, duration: faqHorizontalDistance });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: dualSceneRef },
  );

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const scene = dualSceneRef.current;
      if (!scene) return;

      const onRefresh = () => {
        const lenis = (
          window as unknown as {
            __lenis?: { resize: () => void };
          }
        ).__lenis;
        lenis?.resize();
      };

      ScrollTrigger.addEventListener("refresh", onRefresh);
      return () => {
        ScrollTrigger.removeEventListener("refresh", onRefresh);
      };
    },
    { scope: dualSceneRef },
  );

  // return <VisionLandingPage />;
  return (
    <main className={styles.page}>
      <section ref={horizontalRef} className={styles.horizontalScene}>
        <div ref={trackRef} className={styles.track}>
          <HeroAboutUnified />
        </div>
      </section>

      <section ref={dualSceneRef} className={styles.dualScene}>
        <div ref={dualTrackRef} className={styles.dualTrack}>
          <div className={styles.dualPanelFaq}>
            <HomeFaqs />
          </div>
          <div className={styles.dualPanelDest}>
            {shouldLoadDestinations ? (
              <Destinations embedded />
            ) : (
              <div
                className={styles.destinationsFallback}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </section>

      <section className={styles.testimonialsScene}>
        <HomeTestimonials />
      </section>

      <section className={styles.footerScene}>
        <HomeFooter />
      </section>
    </main>
  );
}
