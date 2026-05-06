"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./cta-map-mobile.module.css";

const CTA_MAP_VIDEO_720 = "/images/japon/video/Japon-Premium-Video-720p.mp4";
const CTA_MAP_VIDEO_480 = "/images/japon/video/Japon-Premium-Video-480p.mp4";
const CTA_MAP_POSTER = "/images/japon/ejemplo-japon8.webp";

export default function CtaMapMobile() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (shouldLoadVideo) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setShouldLoadVideo(true);
        observer.disconnect();
      },
      { rootMargin: "550px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldLoadVideo]);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Video CTA">
      {shouldLoadVideo ? (
        <video
          className={styles.video}
          poster={CTA_MAP_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={CTA_MAP_VIDEO_480} type="video/mp4" media="(max-width: 640px)" />
          <source src={CTA_MAP_VIDEO_720} type="video/mp4" />
        </video>
      ) : (
        <img
          src={CTA_MAP_POSTER}
          alt=""
          className={styles.video}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      )}
    </section>
  );
}
