import Image from "next/image";
import styles from "./hero.module.css";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";

export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrap}>
        <BlurredStagger
          text="Viaja en clase PREMIUM"
          className={styles.titleFirst}
          highlights={[{ word: "PREMIUM", useGradient: true }]}
        />
        <p className={styles.subtitle}>
          Eleva tu vida con el máximo confort y lujo que Viajes PREMIUM tiene
          para ti en cualquiera de nuestros destinos altamente especializados.
        </p>
      </div>
    </div>
  );
}
