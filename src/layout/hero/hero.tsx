import styles from "./hero.module.css";
import HeroOverlay from "@/components/heroOverlay";
import { Button } from "@/components/ui/button/button";
import TextPressure from "@/components/ui/text-pressure/textPressure";

const pressureFont = "/fonts/nohemi-font-family/Nohemi-VF-BF6438cc58ad63d.ttf";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroHeading}>Viaja a Japón desde México</h1>

      <div className={styles.desktopHeroTitle} aria-hidden="true">
        <div className={styles.titleLine}>
          <span className={`${styles.titleWord} ${styles.titleWordViaja}`}>
            <TextPressure
              text="Viaja a"
              fontFamily="Nohemi Pressure"
              fontUrl={pressureFont}
              fontSize={190}
              fontWeight={100}
              fontStyle="normal"
              flex={false}
              width
              weight
              italic
              weightFrom={100}
              weightTo={400}
              scaleFrom={1}
              scaleTo={1}
              minFontSize={52}
              textColor="#000000"
            />
          </span>
          <span className={`${styles.titleWord} ${styles.titleWordJapon}`}>
            <TextPressure
              text="Japón"
              fontFamily="Nohemi Pressure"
              fontUrl={pressureFont}
              fontSize={190}
              fontWeight={100}
              fontStyle="normal"
              flex={false}
              width
              weight
              italic={false}
              weightFrom={100}
              weightTo={400}
              scaleFrom={1}
              scaleTo={1}
              minFontSize={52}
              textColor="#000000"
            />
          </span>
        </div>

        <div className={`${styles.titleLine} ${styles.titleLineBottom}`}>
          <span className={`${styles.titleWord} ${styles.titleWordDesde}`}>
            <TextPressure
              text="desde"
              fontFamily="Nohemi Pressure"
              fontUrl={pressureFont}
              fontSize={190}
              fontWeight={900}
              fontStyle="normal"
              flex={false}
              width
              weight
              italic={false}
              weightFrom={600}
              weightTo={100}
              scaleFrom={1.09}
              scaleTo={1}
              minFontSize={60}
              textColor="#000000"
            />
          </span>
          <span className={`${styles.titleWord} ${styles.titleWordMexico}`}>
            <TextPressure
              text="México"
              fontFamily="Nohemi Pressure"
              fontUrl={pressureFont}
              fontSize={190}
              fontWeight={900}
              fontStyle="normal"
              flex={false}
              width
              weight
              italic={false}
              weightFrom={600}
              weightTo={100}
              scaleFrom={1.09}
              scaleTo={1}
              minFontSize={60}
              textColor="#000000"
            />
          </span>
        </div>
      </div>

      <p className={styles.heroSubtitleDesktop}>
        Eleva tu vida con una forma más cuidada de vivir Japón.
      </p>

      <div className={styles.mobileHeroText}>
        <div className={styles.heroLeft}>
          <p className={styles.heroTextBlock}>
            <span className={styles.heroTextLabel}>Viaja a</span>
            <span className={styles.heroTextValue}>Japón</span>
          </p>
          <p className={styles.heroSubtitle}>
            Eleva tu vida con una forma más cuidada de vivir Japón.
          </p>
        </div>

        <div className={styles.heroRight}>
          <p className={styles.heroTextBlock}>
            <span className={styles.heroTextLabel}>Desde</span>
            <span className={styles.heroTextValue}>México</span>
          </p>
        </div>
      </div>

      <div className={styles.heroCircle} aria-hidden="true" />

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
