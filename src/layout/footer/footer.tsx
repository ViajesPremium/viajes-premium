"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { scrollToSection } from "@/lib/scroll-to-section";
import styles from "./footer.module.css";
import { usePremiumLandingConfig } from "@/landings/premium/context";

export default function Footer() {
  const {
    sections: { footer },
  } = usePremiumLandingConfig();

  const mapQuery = useMemo(
    () => encodeURIComponent(footer.address),
    [footer.address],
  );
  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const googleMapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const handleSectionNav = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      event.preventDefault();
      scrollToSection(href, { duration: 1.15, updateHash: true, defer: true });
    },
    [],
  );

  const handleBackToTop = useCallback(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  return (
    <footer className={styles.footer}>
      <h2 className="srOnly">{footer.srHeading}</h2>
      <div className={styles.topCap} />

      <div className={styles.wrapper}>
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.logoLayer}>
            <div className={styles.logoWrap}>
              <Image
                src={footer.brandLogo}
                alt=""
                fill
                sizes="(max-width: 768px) 80vw, 55vw"
                loading="lazy"
                className={styles.logoImg}
              />
            </div>
          </div>

          <div className={styles.samuraiLayer}>
            <motion.div
              className={styles.samuraiMotion}
              initial={{ y: 120, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <div className={styles.samuraiWrap}>
                <Image
                  src={footer.samuraiImage}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 70vw, 36vw"
                  loading="lazy"
                  className={styles.samuraiImg}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.colLeft}>
            <div className={styles.navSection}>
              <span className={styles.sectionLabel}>PÁGINAS</span>
              <nav className={styles.navLinks}>
                {footer.pageLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={styles.navLink}
                    onClick={(event) => handleSectionNav(event, item.href)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className={styles.mapCard}>
              <p className={styles.mapAddress}>{footer.address}</p>
              <div className={styles.mapFrameWrap}>
                <iframe
                  title={footer.mapEmbedTitle}
                  src={googleMapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={googleMapsOpenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapButton}
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>

          <div className={styles.centerGap} aria-hidden="true" />

          <div className={styles.colRight}>
            <div className={styles.navSection}>
              <span className={styles.sectionLabel}>SÍGUENOS</span>
              <nav className={styles.navLinks}>
                {footer.socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={styles.navLink}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className={styles.navSection}>
              <span className={styles.sectionLabel}>CONTACTO</span>
              <nav className={styles.navLinks}>
                <a
                  href={`mailto:${footer.contactEmail}`}
                  className={styles.navLink}
                >
                  {footer.contactEmail}
                </a>
                <a
                  href={`tel:${footer.contactPhoneLink}`}
                  className={styles.navLink}
                >
                  {footer.contactPhoneDisplay}
                </a>
              </nav>
            </div>

            <button
              type="button"
              onClick={handleBackToTop}
              className={styles.backToTopIcon}
              aria-label="Volver al inicio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copy}>{footer.copyrightText}</p>

        <div className={styles.legalLinks}>
          {footer.legalLinks.map((legalLink) => (
            <a key={legalLink.label} href={legalLink.href}>
              {legalLink.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
