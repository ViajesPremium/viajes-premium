import { BlurredStagger } from "@/components/ui/blurred-stagger-text/blurred-stagger-text";
import styles from "./nosotros.module.css";

export function NosotrosHeader() {
  return (
    <header className={styles.header}>
      <BlurredStagger text="Nuestra Historia" className={styles.title} />
      <p className={styles.subtitle}>
        Desde 2005 construimos una historia de evolucion continua, servicio
        y vision premium.
      </p>
    </header>
  );
}
