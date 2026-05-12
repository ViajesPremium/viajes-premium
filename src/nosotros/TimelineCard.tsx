import type { TimelineEntry } from "./timelineData";
import styles from "./nosotros.module.css";

type TimelineCardProps = {
  entry: TimelineEntry;
  index: number;
  cardRef: (el: HTMLElement | null) => void;
  yearRef: (el: HTMLHeadingElement | null) => void;
};

export function TimelineCard({ entry, index, cardRef, yearRef }: TimelineCardProps) {
  return (
    <li className={styles.row}>
      <article className={styles.card} ref={cardRef}>
        <div className={styles.cardContent}>
          <h2 className={styles.year} ref={yearRef}>
            {entry.year}
          </h2>
          <p className={styles.copy}>{entry.copy}</p>
        </div>
        <div
          className={styles.cardMedia}
          style={{ backgroundImage: `url("${entry.image}")` }}
          role="img"
          aria-label={`Fotografia de ${entry.year}`}
        />
      </article>
    </li>
  );
}
