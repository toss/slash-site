import clsx from "clsx";
import styles from "./styles.module.css";

export const HiringSection = ({ 
  variant = "relative" 
}: { 
  variant?: "relative" | "absolute" 
}) => {
  return (
    <section className={clsx(styles.section, styles[variant])}>
      <div className={styles.contentWrapper}>
        <span className={styles.title}> We&apos;re Hiring! </span>
        <span className={styles.subtitle}>If you want to</span>
      </div>

      <div className={styles.cardsContainer}>
        <div className={clsx(styles.card, styles.card1)}>
          <h3 className={styles.cardTitle}>Boost DX</h3>
          <p className={styles.cardDescription}>
            for developer experience performance
            <br />
            further.
          </p>
        </div>
        <div className={clsx(styles.card, styles.card2)}>
          <h3 className={styles.cardTitle}>Turn productivity</h3>
          <p className={styles.cardDescription}>
            gains into better UX for millions
          </p>
        </div>
        <div className={clsx(styles.card, styles.card3)}>
          <h3 className={styles.cardTitle}>Raise UX</h3>
          <p className={styles.cardDescription}>
            for developer experience performance further.
          </p>
        </div>
      </div>

      <a
        href="https://toss.im/career/job-detail?job_id=4664498003"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.hiringButton}
      >
        Join Toss Team
      </a>
      <span className={styles.copyright}>
        Copyright © 2025 Viva Republica · Toss Frontend Chapter
      </span>
    </section>
  );
};
