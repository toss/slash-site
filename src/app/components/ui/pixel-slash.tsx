"use client";

import { motion } from "motion/react";
import styles from "./pixel-slash.module.css";

export const PixelSlash = ({
  animated = false,
  fixedSize,
}: {
  animated?: boolean;
  fixedSize?: { width: number; height: number };
}) => {
  const containerStyle = fixedSize
    ? { width: `${fixedSize.width}px`, height: `${fixedSize.height}px` }
    : undefined;

  if (!animated) {
    return (
      <span className={styles.pixelSlash} style={containerStyle}>
        <span className={styles.pixel} style={{ bottom: 0, left: 0 }} />
        <span className={styles.pixel} style={{ bottom: "25%", left: "25%" }} />
        <span className={styles.pixel} style={{ bottom: "50%", left: "50%" }} />
        <span className={styles.pixel} style={{ bottom: "75%", left: "75%" }} />
      </span>
    );
  }

  // 위에서 떨어져 내려와 아래부터 쌓임
  const pixels = [
    { bottom: "0%", left: "0%" },
    { bottom: "25%", left: "25%" },
    { bottom: "50%", left: "50%" },
    { bottom: "75%", left: "75%" },
  ];

  return (
    <span className={styles.pixelSlash} style={containerStyle}>
      {pixels.map((p, i) => (
        <motion.span
          key={i}
          className={styles.pixel}
          style={{ left: p.left }}
          initial={{ bottom: "100%", opacity: 0 }}
          animate={{ bottom: p.bottom, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.5 + i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </span>
  );
};
