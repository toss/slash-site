"use client";

import { motion } from "motion/react";
import styles from "./styles.module.css";

const CARDS = [
  { title: "Boost DX", description: "For developer experience performance further.", rotate: 10 },
  { title: "Turn Productivity", description: "With even better UX for millions.", rotate: -6 },
  { title: "Raise UX", description: "For developer experience performance further.", rotate: 12 },
];

export const HiringSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.stickyHeader}>
        <h2 className={styles.title}>We&apos;re Hiring</h2>
        <p className={styles.subtitle}>If you want to</p>
      </div>

      {/* PC: 기존 겹쳐진 카드 */}
      <div className={styles.cardsDesktop}>
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            className={`${styles.card} ${styles[`card${i + 1}`]}`}
          >
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDescription}>{card.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile: sticky 스택 + 아래에서 올라오는 카드 */}
      <div className={styles.cardsMobile}>
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            className={styles.stickyCard}
            style={{ top: `${120 + i * 20}px`, zIndex: i + 1 }}
          >
            <motion.div
              className={styles.cardMobile}
              style={{ rotate: card.rotate }}
              initial={{ y: 200, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </motion.div>
          </div>
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <a
          href="https://toss.im/career/job-detail?job_id=4664498003"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.hiringButton}
        >
          Join the Team
        </a>
      </div>
    </section>
  );
};
