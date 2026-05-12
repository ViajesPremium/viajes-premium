"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { scrollToSection } from "@/lib/scroll-to-section";
import type { FooterSectionConfig } from "@/landings/premium/types";
import styles from "./footer.module.css";

gsap.registerPlugin(ScrollTrigger);

const TextPressure = dynamic(
  () => import("@/components/ui/text-pressure/textPressure"),
  {
    ssr: false,
    loading: () => <span className={styles.logoPremiumFallback}>PREMIUM</span>,
  },
);

const pressureFont = "/fonts/nohemi-font-family/Nohemi-VF.woff2";

function getSocialBrandIcon(label: string): IconType | null {
  const normalized = label.toLowerCase();
  if (normalized.includes("instagram")) return FaInstagram;
  if (normalized.includes("youtube")) return FaYoutube;
  if (normalized.includes("facebook")) return FaFacebookF;
  if (normalized.includes("tiktok")) return FaTiktok;
  return null;
}

type FooterProps = {
  config: FooterSectionConfig;
};

export default function Footer({ config }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const logoBandRef = useRef<HTMLDivElement>(null);
  const pressureWordRef = useRef<HTMLDivElement>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const logoWord = config.logoWord ?? "VIAJES";
  const isMainBrandFooter = logoWord.trim().toUpperCase() === "VIAJES";
  const logoColor =
    config.logoWordColor ?? (isMainBrandFooter ? "#ffffff" : "var(--primary)");
  const logoBandStyle = {
    "--footer-logo-line-color": logoColor,
  } as CSSProperties;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobileViewport(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      const footerEl = footerRef.current;
      const logoBand = logoBandRef.current;
      const pressureWord = pressureWordRef.current;
      if (!footerEl || !logoBand) return;

      const viajesWord = logoBand.querySelector<HTMLElement>(
        `.${styles.logoViajesWord}`,
      );
      if (!viajesWord) return;

      const resetState = () => {
        gsap.set(viajesWord, { y: 8, autoAlpha: 0.001, filter: "blur(1px)" });
        if (pressureWord) {
          gsap.set(pressureWord, {
            y: 14,
            autoAlpha: 0.001,
            scale: 0.994,
            filter: "blur(2px)",
            transformOrigin: "50% 100%",
          });
        }
      };

      resetState();
      const revealTl = gsap.timeline({ paused: true });
      revealTl.to(viajesWord, {
        y: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 0.72,
        ease: "power2.out",
      });
      if (pressureWord) {
        revealTl.to(
          pressureWord,
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.88,
            ease: "power2.out",
          },
          0.16,
        );
      }

      ScrollTrigger.create({
        trigger: footerEl,
        start: "top 82%",
        end: "bottom 20%",
        onEnter: () => {
          resetState();
          revealTl.restart();
        },
        onEnterBack: () => {
          resetState();
          revealTl.restart();
        },
        onLeave: resetState,
        onLeaveBack: resetState,
      });
    },
    { scope: footerRef },
  );

  const mapQuery = useMemo(
    () => encodeURIComponent(config.address),
    [config.address],
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
    const globalState = window as unknown as Record<string, unknown>;
    const BYPASS_MS = 9000;
    globalState.__itinerariesBypassDirection = -1;
    globalState.__itinerariesBypassUntil = Date.now() + BYPASS_MS;
    setTimeout(() => {
      const until =
        typeof globalState.__itinerariesBypassUntil === "number"
          ? (globalState.__itinerariesBypassUntil as number)
          : 0;
      if (Date.now() >= until) {
        delete globalState.__itinerariesBypassDirection;
        delete globalState.__itinerariesBypassUntil;
      }
    }, BYPASS_MS + 200);

    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: number, opts: object) => void };
      }
    ).__lenis;

    if (lenis) {
      (window as unknown as Record<string, unknown>).__lenisScrollingToTop =
        true;
      setTimeout(() => {
        delete (window as unknown as Record<string, unknown>)
          .__lenisScrollingToTop;
      }, 1800);
      lenis.scrollTo(0, { duration: 1.5 });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <h2 className="srOnly">{config.srHeading}</h2>

      <div className={styles.topSection}>
        <div className={styles.topLeft}>
          <div className={styles.textCols}>
            <div className={styles.navSection}>
              <span className={styles.sectionLabel}>PÁGINAS</span>
              <nav className={styles.navLinks}>
                {config.pageLinks.map((item) => (
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

            <div className={styles.navSection}>
              <span className={styles.sectionLabel}>SÍGUENOS</span>
              <nav className={styles.socialNav} aria-label="Redes sociales">
                {config.socialLinks.map((item) => {
                  const Icon = getSocialBrandIcon(item.label);
                  if (!Icon) return null;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className={styles.socialIconLink}
                      aria-label={item.label}
                      title={item.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={24} aria-hidden="true" />
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className={styles.navSection}>
              <span className={styles.sectionLabel}>CONTACTO</span>
              <nav className={styles.navLinks}>
                <a
                  href={`mailto:${config.contactEmail}`}
                  className={styles.navLink}
                >
                  {config.contactEmail}
                </a>
                <a
                  href={`tel:${config.contactPhoneLink}`}
                  className={styles.navLink}
                >
                  {config.contactPhoneDisplay}
                </a>
              </nav>
            </div>

            <div className={`${styles.navSection} ${styles.backToTopSection}`}>
              <button
                type="button"
                onClick={handleBackToTop}
                className={styles.backToTopIcon}
                aria-label={config.backToTopLabel || "Volver al inicio"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.topRight}>
          <div className={styles.mapCard}>
            <p className={styles.mapAddress}>{config.address}</p>
            <div className={styles.mapFrameWrap}>
              <iframe
                title={config.mapEmbedTitle}
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
      </div>

      <div
        ref={logoBandRef}
        className={styles.logoBand}
        style={logoBandStyle}
        aria-hidden="true"
      >
        <div className={styles.logoBandTop}>
          <div className={styles.logoTopRow}>
            <div className={styles.logoViajesWord} style={{ color: logoColor }}>
              {logoWord}
            </div>
            <div className={styles.logoTopLine} />
          </div>
        </div>

        <div ref={pressureWordRef} className={styles.logoPremiumPressure}>
          <TextPressure
            text="PREMIUM"
            className={styles.logoPressureText}
            fontFamily="Nohemi"
            fontUrl={pressureFont}
            fontWeight={700}
            fontStyle="normal"
            fontSize="var(--footer-premium-font-size)"
            minFontSize={48}
            flex={false}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            weightFrom={700}
            weightTo={400}
            scaleFrom={1}
            scaleTo={1}
            animate={!isMobileViewport}
            textColor={logoColor}
          />
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copy}>{config.copyrightText}</p>
        <div className={styles.legalLinks}>
          {config.legalLinks.map((legalLink) => (
            <a key={legalLink.label} href={legalLink.href}>
              {legalLink.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
