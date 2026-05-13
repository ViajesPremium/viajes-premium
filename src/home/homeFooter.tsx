"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { scrollToSection } from "@/lib/scroll-to-section";
import { useAnimationsEnabled } from "@/lib/animation-budget";
import styles from "./homeFooter.module.css";

gsap.registerPlugin(ScrollTrigger);

const TextPressure = dynamic(
  () => import("@/components/ui/text-pressure/textPressure"),
  {
    ssr: false,
    loading: () => <span className={styles.logoPremiumFallback}>PREMIUM</span>,
  },
);

const pressureFont = "/fonts/nohemi-font-family/Nohemi-VF.woff2";

const HOME_FOOTER = {
  srHeading: "Footer Home",
  address:
    "Cda. de Omega 306, Romero de Terreros, Coyoacan, 04310 Ciudad de Mexico, CDMX",
  mapEmbedTitle: "Ubicacion Viajes Premium",
  contactEmail: "reservaciones@viajespremium.com.mx",
  contactPhoneDisplay: "+52 55 4161 9428",
  contactPhoneLink: "+525541619428",
  pageLinks: [
    { label: "Inicio", href: "#inicio" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Itinerarios", href: "#itinerarios" },
    { label: "Que Incluye", href: "#includes" },
    { label: "Opiniones", href: "#testimonials" },
    { label: "Sobre Japon", href: "#faqs" },
    { label: "Contacto", href: "#form" },
  ],
  socialLinks: [
    { label: "TikTok", href: "https://www.tiktok.com/@viajespremium" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/viajespremium.oficial",
    },
    {
      label: "Youtube",
      href: "https://www.youtube.com/@viajespremiumelevatuvida",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/turismosantafeoficial",
    },
  ],
  copyrightText:
    "Todas las marcas y servicios que se ofrecen son propiedad de Viajes PREMIUM. Consulte Terminos y Condiciones en el Contrato de Adhesion ante PROFECO con numero 7735-2015 y 7180-2015",
  backToTopLabel: "Volver al inicio",
  legalLinks: [
    {
      label: "AVISO DE PRIVACIDAD",
      href: "/japon-premium/aviso-de-privacidad",
    },
  ],
};

function getSocialBrandIcon(label: string): IconType | null {
  const normalized = label.toLowerCase();
  if (normalized.includes("instagram")) return FaInstagram;
  if (normalized.includes("youtube")) return FaYoutube;
  if (normalized.includes("facebook")) return FaFacebookF;
  if (normalized.includes("tiktok")) return FaTiktok;
  return null;
}

export default function HomeFooter() {
  const animationsEnabled = useAnimationsEnabled();
  const footerRef = useRef<HTMLElement>(null);
  const logoBandRef = useRef<HTMLDivElement>(null);
  const pressureWordRef = useRef<HTMLDivElement>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobileViewport(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      const disableForDevice =
        !animationsEnabled && window.matchMedia("(max-width: 1024px)").matches;
      if (disableForDevice) return;

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
    { scope: footerRef, dependencies: [animationsEnabled] },
  );

  const mapQuery = useMemo(() => encodeURIComponent(HOME_FOOTER.address), []);
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
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: number, opts: object) => void };
      }
    ).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <h2 className="srOnly">{HOME_FOOTER.srHeading}</h2>

      <div className={styles.topSection}>
        <div className={styles.topLeft}>
          <div className={styles.textCols}>
            <div className={styles.navSection}>
              <span className={styles.sectionLabel}>PAGINAS</span>
              <nav className={styles.navLinks}>
                {HOME_FOOTER.pageLinks.map((item) => (
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
              <span className={styles.sectionLabel}>SIGUENOS</span>
              <nav className={styles.socialNav} aria-label="Redes sociales">
                {HOME_FOOTER.socialLinks.map((item) => {
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
                  href={`mailto:${HOME_FOOTER.contactEmail}`}
                  className={styles.navLink}
                >
                  {HOME_FOOTER.contactEmail}
                </a>
                <a
                  href={`tel:${HOME_FOOTER.contactPhoneLink}`}
                  className={styles.navLink}
                >
                  {HOME_FOOTER.contactPhoneDisplay}
                </a>
              </nav>
            </div>

            <div className={`${styles.navSection} ${styles.backToTopSection}`}>
              <button
                type="button"
                onClick={handleBackToTop}
                className={styles.backToTopIcon}
                aria-label={HOME_FOOTER.backToTopLabel}
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
            <p className={styles.mapAddress}>{HOME_FOOTER.address}</p>
            <div className={styles.mapFrameWrap}>
              <iframe
                title={HOME_FOOTER.mapEmbedTitle}
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
          <div className={styles.logoTopRow}>
            <div className={styles.logoViajesWord}>VIAJES</div>
            <div className={styles.logoTopLine} />
          </div>
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
            animate={animationsEnabled && !isMobileViewport}
            textColor="#ffffff"
          />
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copy}>{HOME_FOOTER.copyrightText}</p>
        <div className={styles.legalLinks}>
          {HOME_FOOTER.legalLinks.map((legalLink) => (
            <a key={legalLink.label} href={legalLink.href}>
              {legalLink.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
