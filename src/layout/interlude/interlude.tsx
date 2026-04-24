"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import styles from "./interlude.module.css";
import { usePremiumLandingConfig } from "@/landings/premium/context";

type ScrollRowProps = {
  text: string;
  fromX: string;
  toX: string;
  smooth: MotionValue<number>;
};

function ScrollRow({ text, fromX, toX, smooth }: ScrollRowProps) {
  const x = useTransform(smooth, [0, 1], [fromX, toX]);
  return (
    <div className={styles.row}>
      <motion.div style={{ x }} className={styles.track}>
        <span className={styles.chunk}>{text}</span>
        <span className={styles.chunk}>{text}</span>
        <span className={styles.chunk}>{text}</span>
        <span className={styles.chunk}>{text}</span>
      </motion.div>
    </div>
  );
}

export default function InterludeSection() {
  const {
    sections: { interlude },
  } = usePremiumLandingConfig();

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 120 });
  const highlightIndex = interlude.quote.indexOf(interlude.quoteHighlight);
  const quoteBefore =
    highlightIndex >= 0
      ? interlude.quote.slice(0, highlightIndex)
      : interlude.quote;
  const quoteAfter =
    highlightIndex >= 0
      ? interlude.quote.slice(highlightIndex + interlude.quoteHighlight.length)
      : "";

  return (
    <section className={styles.interlude} ref={sectionRef}>
      <h2 className="srOnly">{interlude.srHeading}</h2>

      <div className={styles.textLayer} aria-hidden="true">
        <ScrollRow text={interlude.rows[0]} fromX="0%" toX="-18%" smooth={smooth} />
        <ScrollRow text={interlude.rows[1]} fromX="-18%" toX="0%" smooth={smooth} />
        <ScrollRow text={interlude.rows[2]} fromX="-4%" toX="-20%" smooth={smooth} />
      </div>

      <article className={styles.card}>
        <div className={styles.imageWrap}>
          <Image
            src={interlude.image.src}
            alt={interlude.image.alt}
            fill
            className={styles.photo}
            sizes="(max-width: 768px) 92vw, 420px"
          />
          <div className={styles.imageOverlay} />
        </div>

        <div className={styles.copy}>
          <p className={styles.role}>{interlude.role}</p>
          <h3 className={styles.name}>{interlude.name}</h3>
          <p className={styles.subtitle}>
            &quot; {quoteBefore}
            <span className={styles.textHighlight}>{interlude.quoteHighlight}</span>
            {quoteAfter}
            &quot;
          </p>
        </div>
      </article>
    </section>
  );
}
