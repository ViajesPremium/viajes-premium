"use client";

import "@/vision/vision.css";
import styles from "./page.module.css";
import HomeHero from "@/home/homeHero";
import HomeExperienceBanner from "@/home/homeExperienceBanner";
import HomeAbout from "@/home/homeAbout";
import dynamic from "next/dynamic";
import { DEFAULT_SITE_CONFIG } from "@/config/default-site-config";

const Destinations = dynamic(() => import("@/home/destinations"), {
  ssr: false,
  loading: () => (
    <div className={styles.destinationsFallback} aria-hidden="true" />
  ),
});
const HomeFaqs = dynamic(() => import("@/home/homeFaqs"), {
  ssr: false,
  loading: () => <div className={styles.faqsFallback} aria-hidden="true" />,
});
const HomeTestimonials = dynamic(() => import("@/home/homeTestimonials"), {
  ssr: false,
  loading: () => <div className={styles.sectionFallback} aria-hidden="true" />,
});
const Footer = dynamic(() => import("@/layout/footer/footer"), {
  ssr: false,
  loading: () => <div className={styles.footerFallback} aria-hidden="true" />,
});
const HomeCtaForm = dynamic(() => import("@/home/homeCtaForm"), {
  ssr: false,
  loading: () => <div className={styles.sectionFallback} aria-hidden="true" />,
});
const HomeMarquee = dynamic(() => import("@/home/homeMarquee"), {
  ssr: false,
  loading: () => <div className={styles.sectionFallback} aria-hidden="true" />,
});

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.globeScene} aria-label="Hero principal">
        <HomeHero />
      </section>

      <section className={styles.experienceScene} aria-label="Experiencia premium">
        <HomeExperienceBanner />
      </section>

      <section className={styles.aboutScene} aria-label="Sobre nosotros">
        <HomeAbout />
      </section>

      <section id="destinations" className={styles.destinationsScene}>
        <Destinations embedded />
      </section>

      <section className={styles.testimonialsScene}>
        <HomeTestimonials />
      </section>

      <section className={styles.faqScene}>
        <HomeFaqs />
      </section>

      <section className={styles.ctaFormScene}>
        <HomeCtaForm />
      </section>

      <section className={styles.marqueeScene}>
        <HomeMarquee />
      </section>

      <section className={styles.footerScene}>
        <Footer config={DEFAULT_SITE_CONFIG.footer} />
      </section>
    </main>
  );
}
