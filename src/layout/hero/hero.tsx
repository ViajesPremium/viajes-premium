import styles from "./hero.module.css";
import HeroOverlay from "@/components/heroOverlay";
import { Button } from "@/components/ui/button/button";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroText}>
        <div className={styles.heroLeft}>
          <p className={styles.heroTextBlock}>
            <span className={styles.heroTextLabel}>Viaja a</span>
            <span className={styles.heroTextValue}>Japon</span>
          </p>
          <p className={styles.heroSubtitle}>
          Eleva tu vida con una forma más cuidada de vivir Japón.
          </p>
        </div>

        <div className={styles.heroRight}>
          <p className={styles.heroTextBlock}>
            <span className={styles.heroTextLabel}>Desde</span>
            <span className={styles.heroTextValue}>Mexico</span>
          </p>
        </div>
      </div>

      <div className={styles.heroActions}>
        <Button type="button" variant="primary">
          Cotizar viaje
        </Button>
        <Button type="button" variant="secondary">
          Ver itinerario
        </Button>
      </div>

      <HeroOverlay />
    </div>
  );
}
