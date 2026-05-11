import styles from "./nosotros.module.css";

export default function nosotrosHero() {
  return (
    <section className={styles.container} aria-label="Nosotros Hero">
      <p className={styles.eyebrow}>
        Tu viaje merece algo
        <br />
        <span className={styles.highlight}>extraordinario</span>
      </p>
      <div className={styles.logoMask} role="img" aria-label="Viajes Premium" />
    </section>
  );
}
