import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import styles from "./styles.module.css";

const SCROLL_CONFIG = {
  TRIGGER_MULTIPLIER: 0.15,
  END_OFFSET: 0.01,
  Y_TRANSFORM_BASE: -70,
  Y_TRANSFORM_INCREMENT: 20,
  X_TRANSFORM: "-60%",
  LEFT_POSITION_BASE: 50,
  LEFT_POSITION_INCREMENT: 5,
} as const;

interface CardData {
  title: string;
  description: string;
  backgroundColor: string;
  color: string;
}

interface CardProps {
  card: CardData;
  index: number;
  scrollYProgress: MotionValue<number>;
}

export const PrincipleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 50%", "end start"],
  });

  const fixedPosition = useTransform(scrollYProgress, (value) =>
    value > 0 ? "fixed" : "absolute"
  );

  return (
    <motion.section className={styles.section} ref={sectionRef}>
      <motion.div className={styles.sectionContent}>
        <motion.div
          className={styles.title}
          style={{ position: fixedPosition }}
        >
          PRINCIPLES
        </motion.div>
      </motion.div>
      <motion.div className={styles.cardsContainer}>
        {CARDS.map((card, index) => (
          <Card
            key={card.title}
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
  const triggerPoint = (index + 1) * SCROLL_CONFIG.TRIGGER_MULTIPLIER;
  const endPoint = triggerPoint + SCROLL_CONFIG.END_OFFSET;

  const cardOpacity = useTransform(
    scrollYProgress,
    [triggerPoint, endPoint],
    [0, 1]
  );

  const yTransform = `${
    SCROLL_CONFIG.Y_TRANSFORM_BASE + index * SCROLL_CONFIG.Y_TRANSFORM_INCREMENT
  }%`;

  const leftPercentage =
    SCROLL_CONFIG.LEFT_POSITION_BASE +
    index * SCROLL_CONFIG.LEFT_POSITION_INCREMENT;

  const zIndex = isHovered ? 100 : 0;

  return (
    <motion.div
      className={styles.card}
      style={{
        zIndex,
        position: "fixed",
        x: SCROLL_CONFIG.X_TRANSFORM,
        y: yTransform,
        left: `${leftPercentage}%`,
        backgroundColor: card.backgroundColor,
        color: card.color,
        opacity: cardOpacity,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className={styles.cardTitle}>{card.title}</motion.div>
      <motion.div className={styles.cardDescription}>
        {card.description}
      </motion.div>
    </motion.div>
  );
};

const CARDS = [
  {
    title: "Production-first",
    description:
      "Problems come from production, solutions go back to production.",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  {
    title: "Make it small",
    description: "Small APIs, minimal dependencies, predictable behavior.",
    backgroundColor: "#283A60",
    color: "#ffffff",
  },
  {
    title: "Simplicity over scope",
    description:
      "Clarity beats feature breadth; we remove options before adding them.",
    backgroundColor: "#1D3978",
    color: "#ffffff",
  },
  {
    title: "Performance as a default",
    description: "Fast by design — not as an afterthought.",
    backgroundColor: "#07349A",
    color: "#ffffff",
  },
];
