"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./cta-map-mobile.module.css";

const CTA_MAP_VIDEO_720 = "/images/japon/video/Japon-Premium-Video-720p.mp4";
const CTA_MAP_VIDEO_540 = "/images/japon/video/Japon-Premium-Video-540p.mp4";
const CTA_MAP_VIDEO_480 = "/images/japon/video/Japon-Premium-Video-480p.mp4";
const CTA_MAP_VIDEO_540_WEBM = "/images/japon/video/Japon-Premium-Video-540p.webm";
const CTA_MAP_VIDEO_480_WEBM = "/images/japon/video/Japon-Premium-Video-480p.webm";
const CTA_MAP_POSTER = "/images/japon/ejemplo-japon8.webp";

export default function CtaMapMobile() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsNearViewport(Boolean(entries[0]?.isIntersecting));
      },
      { rootMargin: "550px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!isNearViewport) {
      video.pause();
      return;
    }
    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Ignore autoplay interruption and keep paused state if browser blocks playback.
      }
    };
    void tryPlay();
  }, [isNearViewport]);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Video CTA">
      <video
        ref={videoRef}
        className={styles.video}
        poster={CTA_MAP_POSTER}
        muted
        loop
        playsInline
        preload="none"
      >
        <source src={CTA_MAP_VIDEO_480_WEBM} type="video/webm" media="(max-width: 640px)" />
        <source src={CTA_MAP_VIDEO_480} type="video/mp4" media="(max-width: 640px)" />
        <source src={CTA_MAP_VIDEO_540_WEBM} type="video/webm" media="(max-width: 1280px)" />
        <source src={CTA_MAP_VIDEO_540} type="video/mp4" media="(max-width: 1280px)" />
        <source src={CTA_MAP_VIDEO_720} type="video/mp4" />
      </video>
    </section>
  );
}
