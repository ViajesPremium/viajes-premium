"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { scrollToSection } from "@/lib/scroll-to-section";
import styles from "./footer.module.css";
import { usePremiumLandingConfig } from "@/landings/premium/context";

gsap.registerPlugin(ScrollTrigger);

const TextPressure = dynamic(
  () => import("@/components/ui/text-pressure/textPressure"),
  {
    ssr: false,
    loading: () => <span className={styles.logoPremiumFallback}>PREMIUM</span>,
  },
);

const pressureFont = "/fonts/nohemi-font-family/Nohemi-VF-BF6438cc58ad63d.ttf";

function getSocialBrandIcon(label: string): IconType | null {
  const normalized = label.toLowerCase();
  if (normalized.includes("instagram")) return FaInstagram;
  if (normalized.includes("youtube")) return FaYoutube;
  if (normalized.includes("facebook")) return FaFacebookF;
  if (normalized.includes("tiktok")) return FaTiktok;
  return null;
}

export default function Footer() {
  const {
    sections: { footer },
  } = usePremiumLandingConfig();

  const footerRef = useRef<HTMLElement>(null);
  const logoBandRef = useRef<HTMLDivElement>(null);
  const pressureWordRef = useRef<HTMLDivElement>(null);
  const [logoSvgMarkup, setLogoSvgMarkup] = useState("");
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobileViewport(media.matches);
    sync();

    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadLogoSvg = async () => {
      try {
        const response = await fetch("/logos/japon/jp-blanco2.svg", {
          cache: "force-cache",
        });
        if (!response.ok) return;

        const raw = await response.text();
        const cleaned = raw
          .replace(/<\?xml[\s\S]*?\?>/i, "")
          .replace(/fill:\s*#fff\s*;/gi, "fill: currentColor;")
          .replace(/stroke:\s*#fff\s*;/gi, "stroke: currentColor;")
          .replace(/viewBox="0 0 900 300"/i, 'viewBox="0 0 900 82"')
          .trim();

        if (!cancelled) {
          setLogoSvgMarkup(cleaned);
        }
      } catch {
        // No-op fallback handled in render.
      }
    };

    void loadLogoSvg();

    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      const footerEl = footerRef.current;
      const logoBand = logoBandRef.current;
      const pressureWord = pressureWordRef.current;
      if (!footerEl || !logoBand || !logoSvgMarkup) return;

      const svgEl = logoBand.querySelector("svg");
      if (!svgEl) return;

      const topLogoShapes = Array.from(
        svgEl.querySelectorAll<SVGPathElement>("path.cls-1, path.cls-3"),
      );

      if (topLogoShapes.length === 0) return;

      const resetState = () => {
        gsap.set(topLogoShapes, {
          y: 8,
          autoAlpha: 0.001,
          filter: "blur(1px)",
        });
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
      revealTl.to(topLogoShapes, {
        y: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 0.72,
        ease: "power2.out",
        stagger: {
          each: 0.018,
          from: "start",
        },
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
        onLeave: () => {
          resetState();
        },
        onLeaveBack: () => {
          resetState();
        },
      });
    },
    { scope: footerRef, dependencies: [logoSvgMarkup] },
  );

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
      <h2 className="srOnly">{footer.srHeading}</h2>

      <div className={styles.topSection}>
        <div className={styles.topLeft}>
          <div className={styles.textCols}>
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

            <div className={styles.navSection}>
              <span className={styles.sectionLabel}>SÍGUENOS</span>
              <nav className={styles.socialNav} aria-label="Redes sociales">
                {footer.socialLinks.map((item) => {
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
              <button
                type="button"
                onClick={handleBackToTop}
                className={styles.backToTopIcon}
                aria-label={footer.backToTopLabel || "Volver al inicio"}
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
      </div>

      <div ref={logoBandRef} className={styles.logoBand} aria-hidden="true">
        <div className={styles.logoBandTop}>
          {logoSvgMarkup ? (
            <div
              className={styles.logoBandSvg}
              dangerouslySetInnerHTML={{ __html: logoSvgMarkup }}
            />
          ) : (
            <div className={styles.logoFallback}>JP</div>
          )}
        </div>

        <div ref={pressureWordRef} className={styles.logoPremiumPressure}>
          <TextPressure
            text="PREMIUM"
            className={styles.logoPressureText}
            fontFamily="Nohemi"
            fontUrl={pressureFont}
            fontWeight={900}
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
            textColor="var(--primary-japon)"
          />
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
