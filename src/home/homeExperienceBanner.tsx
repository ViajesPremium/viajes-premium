"use client";

import { Button } from "@/components/ui/button/button";
import { usePageTransition } from "@/components/page-transition/TransitionProvider";
import styles from "./homeExperienceBanner.module.css";

export default function HomeExperienceBanner() {
  const { triggerTransition } = usePageTransition();

  const goToNosotros = () => {
    triggerTransition("/nosotros/");
  };

  return (
    <section className={styles.banner} aria-labelledby="experience-banner-title">
      <h2 id="experience-banner-title" className={styles.title}>
        <span className={styles.line}>
          Más de <span className={styles.gold}>21 años</span>
        </span>
        <span className={styles.line}>diseñando experiencias</span>
        <span className={styles.line}>
          clase <span className={styles.gold}>PREMIUM.</span>
        </span>
      </h2>

      <Button type="button" variant="primary" className={styles.cta} onClick={goToNosotros}>
        Conócenos
      </Button>
    </section>
  );
}
