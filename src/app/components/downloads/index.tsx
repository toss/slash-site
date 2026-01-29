"use client";

import styles from "./styles.module.css";
import { formatNumberWithUnit } from "../../utils/formatNumber";
import { Separator } from "../ui/separator";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ReactElement, Suspense, useState, useEffect, useRef } from "react";
import { npmStats } from "../../../data/npm-stats";

export const DownloadsSection = () => {
  return (
    <Suspense fallback={<></>}>
      <Resolved />
    </Suspense>
  );
};

const Resolved = () => {
  const totalDownloads = npmStats.totalDownloads;
  const totalStars = npmStats.totalStars;
  const totalDependents = npmStats.totalDependents;
  const chartData = npmStats.monthlyData || [];

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
      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>Downloads</h2>
        </div>

        <div className={styles.downloadsCountWrapper}>
          <DownloadsCountItem
            count={totalStars}
            isVisible={isVisible}
            description={
              <span>
                Total GitHub
                <br />
                stars
              </span>
            }
          />
          <DownloadsCountItem
            count={totalDependents}
            isVisible={isVisible}
            description={
              <span>
                GitHub
                <br />
                Dependents
              </span>
            }
          />
          <DownloadsCountItem
            count={totalDownloads}
            isVisible={isVisible}
            description={
              <span>
                Total NPM
                <br />
                downloads
              </span>
            }
          />
        </div>
        <div className={styles.chartContainer} style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="month" hide domain={["dataMin", "dataMax"]} />
                <YAxis hide domain={["dataMin", "dataMax"]} />
                {isVisible && (
                  <Line
                    type="monotone"
                    dataKey="downloads"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={false}
                    isAnimationActive={true}
                    animationDuration={2000}
                    className={styles.glowingLine}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <Separator />
        <div className={styles.subText}>Out projects downloads</div>
      </div>
    </section>
  );
};

const DownloadsCountItem = ({
  count,
  description,
  isVisible,
}: {
  count: number;
  description: ReactElement;
  isVisible: boolean;
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
    <div className={styles.downloadsCount}>
      <span className={styles.downloadsCountNumber}>
        {formatNumberWithUnit(displayCount)}+
      </span>
      <span className={styles.downloadsCountDescription}>{description}</span>
    </div>
  );
};
