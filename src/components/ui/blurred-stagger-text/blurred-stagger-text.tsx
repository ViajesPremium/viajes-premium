"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import GradientText from "@/components/ui/gradient-text/gradient-text";
import { useAnimationsEnabled } from "@/lib/animation-budget";
import styles from "./blurred-stagger-text.module.css";

type HighlightWord = {
  word: string;
  className?: string;
  useGradient?: boolean;
  gradientColors?: string[];
  gradientSpeed?: number;
};

export const BlurredStagger = ({
  text = "",
  className,
  highlights = [],
  style = {},
  isActive,
  staticOnMobile = false,
}: {
  text: string;
  className?: string;
  highlights?: HighlightWord[];
  style?: React.CSSProperties;
  isActive?: boolean;
  /** En mobile (≤768px) renderiza texto plano en lugar de la animación. */
  staticOnMobile?: boolean;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const animationsEnabled = useAnimationsEnabled();

  useEffect(() => {
    if (!staticOnMobile) return;
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [staticOnMobile]);

  // Texto plano cuando la sección lo pide y estamos en mobile
  if ((staticOnMobile && isMobile) || !animationsEnabled) {
    return (
      <div className={className} style={style}>
        {text}
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.018,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  const controlled = isActive !== undefined;

  return (
    <div className={className} style={style}>
      {/* 1. TEXTO LIMPIO PARA SEO: Google lee esto con espacios perfectos */}
      <span className={styles.srOnly}>{text}</span>

      {/* 2. TEXTO ANIMADO PARA USUARIOS: Oculto para Google con aria-hidden */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={controlled ? (isActive ? "show" : "hidden") : undefined}
        whileInView={controlled ? undefined : "show"}
        viewport={controlled ? undefined : { once: false, amount: 0.4 }}
        style={{ display: "flex", flexWrap: "wrap", columnGap: "0.3em", justifyContent: "center" }}
        aria-hidden="true"
      >
        {text.split(" ").map((word, wordIndex) => {
          const cleanWord = word.replace(/[.,!?;:]/g, "");
          const highlighted = highlights.find((h) => h.word === cleanWord);

          if (highlighted?.useGradient) {
            return (
              <motion.span
                key={wordIndex}
                variants={letterAnimation}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ display: "inline-flex" }}
              >
                <GradientText
                  colors={highlighted.gradientColors}
                  animationSpeed={highlighted.gradientSpeed}
                  className={styles.highlighted}
                >
                  {word}
                </GradientText>
              </motion.span>
            );
          }

          // --- TEXTO NORMAL LETRA POR LETRA ---
          return (
            <span
              key={wordIndex}
              className={highlighted ? (highlighted.className ?? "") : ""}
              style={{ display: "inline-flex" }}
            >
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={letterAnimation}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};
