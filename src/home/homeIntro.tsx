import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import GradientText from "@/components/ui/gradient-text/gradient-text";
import styles from "./homeIntro.module.css";

export default function HomeIntro() {
  return (
    <section className={styles.introPane} aria-labelledby="intro-title">
      <div className={styles.introContent}>
        <div id="intro-title" className={styles.introTitleWrap}>
          <span className={styles.introLine}>Más de 21 años</span>
          <span className={styles.introLine}>diseñando experiencias</span>
          <span className={styles.introLine}>
            clase{" "}
            <GradientText as="span">PREMIUM.</GradientText>
          </span>
        </div>

        <Link href="/nosotros" className={styles.introCta} aria-label="Conocé quiénes somos">
          <span className={styles.introCtaLabel}>Quiénes somos</span>
          <span className={styles.introCtaIcon} aria-hidden="true">
            <ArrowUpRight size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
}
