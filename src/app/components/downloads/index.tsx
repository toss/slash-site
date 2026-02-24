"use client";

import styles from "./styles.module.css";
import { Suspense, useState, useEffect, useRef } from "react";
import { npmStats } from "../../../data/npm-stats";
import { DownloadsChart } from "./downloads-chart";
import { CountUpItem } from "./count-up-item";

export const DownloadsSection = () => {
  return (
    <Suspense fallback={null}>
      <Resolved />
    </Suspense>
  );
};

const Resolved = () => {
  const { totalDownloads, totalStars, totalDependents } = npmStats;

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const chartData = (npmStats.monthlyData || []).filter(
    (d) => d.fullDate < currentMonth
  );

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <h2 className={styles.title}>Downloads</h2>

      <div className={styles.statsGrid}>
        <CountUpItem
          count={totalDownloads}
          isVisible={isVisible}
          label="NPM Downloads"
          large
        />
        <CountUpItem
          count={totalStars}
          isVisible={isVisible}
          label="GitHub Stars"
        />
        <CountUpItem
          count={totalDependents}
          isVisible={isVisible}
          label="GitHub Dependents"
        />
      </div>

      <DownloadsChart data={chartData} isVisible={isVisible} />
    </section>
  );
};
