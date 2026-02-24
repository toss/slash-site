"use client";

import { useState, useEffect } from "react";
import { formatNumberWithUnit } from "../../utils/formatNumber";
import styles from "./styles.module.css";

export const CountUpItem = ({
  count,
  label,
  isVisible,
  large,
}: {
  count: number;
  label: string;
  isVisible: boolean;
  large?: boolean;
}) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = count / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= count) {
        setDisplayCount(count);
        clearInterval(interval);
      } else {
        setDisplayCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isVisible, count]);

  return (
    <div className={styles.statItem}>
      <div className={large ? styles.statLarge : styles.statMedium}>
        {formatNumberWithUnit(displayCount)}+
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
};
