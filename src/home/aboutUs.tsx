import styles from "./aboutUs.module.css";

export default function AboutUs() {
  return (
    <section className={styles.container} aria-labelledby="about-us-title">
      <div className={styles.content}>
        <h2 id="about-us-title" className={styles.title}>
          Diseñamos viajes premium con detalle humano
        </h2>
      </div>
    </section>
  );
}
