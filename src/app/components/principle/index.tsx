"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

const SCROLL_CONFIG = {
  TRIGGER_MULTIPLIER: 0.12,
  END_OFFSET: 0.01,
  Y_TRANSFORM_BASE: -45,
  Y_TRANSFORM_INCREMENT: 15,
  X_TRANSFORM: "-60%",
  LEFT_POSITION_BASE: 50,
  LEFT_POSITION_INCREMENT: 4,
} as const;

interface CardData {
  id: string;
  title: string;
  description: string;
}

interface CardProps {
  card: CardData;
  index: number;
  scrollYProgress: MotionValue<number>;
}

export const PrincipleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isTitleFixed, setIsTitleFixed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useEffect(function fixTitleOnScroll() {
    const handleScroll = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        setIsTitleFixed(rect.top <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.section className={styles.section} ref={sectionRef}>
      <div ref={titleRef} className={styles.titleSentinel} />
      <div
        className={styles.titleWrapper}
        style={{ position: isTitleFixed ? "fixed" : "sticky" }}
      >
        <h2 className={styles.title}>
          Principles <span className={styles.count}>({CARDS.length})</span>
        </h2>
      </div>
      <motion.div className={styles.cardsContainer}>
        {CARDS.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

const Card = ({ card, index, scrollYProgress }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const isFirst = index === 0;
  const adjustedIndex = isFirst ? 0 : index - 1;
  const triggerPoint = isFirst
    ? 0.005
    : (adjustedIndex + 1) * SCROLL_CONFIG.TRIGGER_MULTIPLIER;
  const endPoint = triggerPoint + SCROLL_CONFIG.END_OFFSET;

  const cardOpacity = useTransform(
    scrollYProgress,
    isFirst ? [0, triggerPoint, endPoint] : [triggerPoint, endPoint],
    isFirst ? [0, 1, 1] : [0, 1],
  );

  const yTransform = `${
    SCROLL_CONFIG.Y_TRANSFORM_BASE + index * SCROLL_CONFIG.Y_TRANSFORM_INCREMENT
  }%`;

  const leftPercentage =
    SCROLL_CONFIG.LEFT_POSITION_BASE +
    index * SCROLL_CONFIG.LEFT_POSITION_INCREMENT;

  const zIndex = isHovered ? 5 : index;
  const pointerEvents = useTransform(cardOpacity, (v) =>
    v > 0 ? "auto" : "none",
  );

  return (
    <motion.div
      className={styles.card}
      style={{
        zIndex,
        position: "fixed",
        x: SCROLL_CONFIG.X_TRANSFORM,
        y: yTransform,
        left: `${leftPercentage}%`,
        opacity: cardOpacity,
        pointerEvents,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.cardNumber}>{card.id}</div>
      <div className={styles.cardBottom}>
        <div className={styles.cardTitle}>{card.title}</div>
        <div className={styles.cardDescription}>{card.description}</div>
      </div>
    </motion.div>
  );
};

const CARDS: CardData[] = [
  {
    id: "01",
    title: "Production-first",
    description:
      "Problems come from production, solutions go back to production.",
  },
  {
    id: "02",
    title: "Make it small",
    description: "Small APIs, minimal dependencies, predictable behavior.",
  },
  {
    id: "03",
    title: "Simplicity over scope",
    description:
      "Clarity beats feature breadth; we remove options before adding them.",
  },
  {
    id: "04",
    title: "Performance as a default",
    description: "Fast by design — not as an afterthought.",
  },
  {
    id: "05",
    title: "Work in public",
    description:
      "Design notes, decisions, and trade-offs are shared whenever possible.",
  },
];
