"use client";

import { useCallback } from "react";
import Badge from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import { FocusRail } from "@/components/ui/focus-rail/focus-rail";
import { scrollToSection } from "@/lib/scroll-to-section";
import BracketHoverBox from "./bracket-hover-box";
import styles from "./highlights.module.css";
import { usePremiumLandingConfig } from "@/landings/premium/context";

function getToneClass(
  tone: "ot" | "epochal" | undefined,
  classes: typeof styles,
) {
  return tone === "epochal" ? classes.epochal : classes.ot;
}

function splitByHighlight(text: string, highlight: string) {
  const normalizedText = text.toLowerCase();
  const normalizedHighlight = highlight.toLowerCase();
  const index = normalizedText.indexOf(normalizedHighlight);
  if (index < 0) {
    return { before: text, highlighted: highlight };
  }

  return {
    before: text.slice(0, index).trim(),
    highlighted: text.slice(index, index + highlight.length).trim(),
  };
}

export default function Highlights() {
  const {
    sections: { highlights },
  } = usePremiumLandingConfig();

  const goToTarget = useCallback((target: string) => {
    if (target.startsWith("#")) {
      scrollToSection(target, { duration: 1.15 });
      return;
    }
    window.location.href = target;
  }, []);

  const handleGoToPrimary = useCallback(() => {
    goToTarget(highlights.ctaPrimary.target);
  }, [goToTarget, highlights.ctaPrimary.target]);

  const handleGoToSecondary = useCallback(() => {
    goToTarget(highlights.ctaSecondary.target);
  }, [goToTarget, highlights.ctaSecondary.target]);

  const line4Parts = splitByHighlight(
    highlights.line4.text,
    highlights.line4.highlightWord,
  );

  return (
    <section className={styles.highlights}>
      <h2 className="srOnly">{highlights.srHeading}</h2>
      <div className={styles.container}>
        <div className={styles.badgeRow}>
          <Badge text={highlights.badgeText} variant="dark" align="center" />
        </div>

        <header className={styles.kicker}>
          <BlurredStagger text={highlights.kickerTop} className={styles.kickerTop} />
          <p className={styles.kickerBottom}>{highlights.kickerBottom}</p>
        </header>

        <div className={styles.editorialGrid}>
          <div className={`${styles.lineRow} ${styles.lineRowWithBracket}`}>
            <p className={`${styles.megaText} ${styles.lineText}`}>
              {highlights.line1.lead}
            </p>
            <BracketHoverBox
              className={styles.inlineBracket}
              imageSrc={highlights.line1.bracket.imageSrc}
              imageAlt={highlights.line1.bracket.imageAlt}
            >
              <p
                className={`${getToneClass(highlights.line1.bracket.textTone, styles)} ${styles.flipInner}`}
              >
                {highlights.line1.bracket.label}
              </p>
            </BracketHoverBox>
            <p className={`${styles.megaText} ${styles.lineText}`}>
              {highlights.line1.tail}
            </p>
          </div>

          <div className={`${styles.lineRow} ${styles.lineRowWithBracket}`}>
            <BlurredStagger
              text={highlights.line2.text}
              className={`${styles.megaText} ${styles.lineText}`}
              highlights={[
                {
                  word: highlights.line2.highlightWord,
                  className: `${styles.japanWord} ${styles.secondaryUnderline}`,
                },
              ]}
            />
            <BracketHoverBox
              className={styles.inlineBracket}
              imageSrc={highlights.line2.bracket.imageSrc}
              imageAlt={highlights.line2.bracket.imageAlt}
            >
              <p
                className={`${getToneClass(highlights.line2.bracket.textTone, styles)} ${styles.flipInner}`}
              >
                {highlights.line2.bracket.label}
              </p>
            </BracketHoverBox>
            <p className={`${styles.megaText} ${styles.lineText}`}>
              {highlights.line2.tail}
            </p>
          </div>

          <div className={`${styles.lineRow} ${styles.lineRowWithBracket}`}>
            <p className={`${styles.megaText} ${styles.lineText}`}>
              {highlights.line3.lead}
            </p>
            <BracketHoverBox
              className={styles.inlineBracket}
              imageSrc={highlights.line3.bracket.imageSrc}
              imageAlt={highlights.line3.bracket.imageAlt}
            >
              <p
                className={`${getToneClass(highlights.line3.bracket.textTone, styles)} ${styles.flipInner}`}
              >
                {highlights.line3.bracket.label}
              </p>
            </BracketHoverBox>
            <p className={`${styles.megaText} ${styles.lineText}`}>
              {highlights.line3.tail}
            </p>
          </div>

          <div className={styles.lineRow}>
            <BlurredStagger
              text={highlights.line4.text}
              className={`${styles.megaText} ${styles.lineText}`}
              highlights={[
                {
                  word: highlights.line4.highlightWord,
                  className: styles.secondaryUnderline,
                },
              ]}
            />
          </div>
        </div>

        <div className={styles.editorialGridMobile}>
          <div className={styles.mobileLineRow}>
            <p className={`${styles.megaText} ${styles.mobileLineText}`}>
              {highlights.line1.lead}
            </p>
            <BracketHoverBox
              className={`${styles.inlineBracket} ${styles.mobileBracket}`}
              imageSrc={highlights.line1.bracket.imageSrc}
              imageAlt={highlights.line1.bracket.imageAlt}
            >
              <p
                className={`${getToneClass(highlights.line1.bracket.textTone, styles)} ${styles.flipInner}`}
              >
                {highlights.line1.bracket.label}
              </p>
            </BracketHoverBox>
            <p className={`${styles.megaText} ${styles.mobileLineText}`}>
              {highlights.line1.tail}
            </p>
          </div>

          <div className={styles.mobileLineRow}>
            <BlurredStagger
              text={highlights.line2.text}
              className={`${styles.megaText} ${styles.mobileLineText}`}
              highlights={[
                {
                  word: highlights.line2.highlightWord,
                  className: `${styles.japanWord} ${styles.secondaryUnderline}`,
                },
              ]}
            />
            <BracketHoverBox
              className={`${styles.inlineBracket} ${styles.mobileBracket}`}
              imageSrc={highlights.line2.bracket.imageSrc}
              imageAlt={highlights.line2.bracket.imageAlt}
            >
              <p
                className={`${getToneClass(highlights.line2.bracket.textTone, styles)} ${styles.flipInner}`}
              >
                {highlights.line2.bracket.label}
              </p>
            </BracketHoverBox>
            <p className={`${styles.megaText} ${styles.mobileLineText}`}>
              {highlights.line2.tail}
            </p>
          </div>

          <div className={styles.mobileLineRow}>
            <p className={`${styles.megaText} ${styles.mobileLineText}`}>
              {highlights.line3.lead}
            </p>
            <BracketHoverBox
              className={`${styles.inlineBracket} ${styles.mobileBracket}`}
              imageSrc={highlights.line3.bracket.imageSrc}
              imageAlt={highlights.line3.bracket.imageAlt}
            >
              <p
                className={`${getToneClass(highlights.line3.bracket.textTone, styles)} ${styles.flipInner}`}
              >
                {highlights.line3.bracket.label}
              </p>
            </BracketHoverBox>
            <p className={`${styles.megaText} ${styles.mobileLineText}`}>
              {highlights.line3.tail}
            </p>
          </div>

          <div className={styles.mobileLineRow}>
            <BlurredStagger
              text={line4Parts.before || highlights.line4.text}
              className={`${styles.megaText} ${styles.mobileLineText}`}
            />
            <BlurredStagger
              text={line4Parts.highlighted}
              className={`${styles.megaText} ${styles.mobileLineText}`}
              highlights={[
                {
                  word: highlights.line4.highlightWord,
                  className: styles.secondaryUnderline,
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className={styles.skiperSection}>
        <FocusRail items={highlights.focusRailItems} autoPlay={false} loop={true} />
      </div>

      <div className={styles.ctaRow}>
        <Button variant="primary" onClick={handleGoToPrimary}>
          {highlights.ctaPrimary.label}
        </Button>
        <Button variant="secondary" onClick={handleGoToSecondary}>
          {highlights.ctaSecondary.label}
        </Button>
      </div>
    </section>
  );
}
