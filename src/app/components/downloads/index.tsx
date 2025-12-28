"use client";

import styles from "./styles.module.css";
import { formatNumberWithUnit } from "../../utils/formatNumber";
import { Separator } from "../ui/separator";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ReactElement, Suspense } from "react";
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

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>Downloads</h2>
        </div>

        <div className={styles.downloadsCountWrapper}>
          <DownloadsCountItem
            count={totalStars}
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
            description={
              <span>
                Total NPM
                <br />
                downloads
              </span>
            }
          />
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="month" hide domain={["dataMin", "dataMax"]} />
                <YAxis hide domain={["dataMin", "dataMax"]} />
                <Line
                  type="monotone"
                  dataKey="downloads"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={true}
                  className={styles.glowingLine}
                />
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
}: {
  count: number;
  description: ReactElement;
}) => {
  return (
    <div className={styles.downloadsCount}>
      <span className={styles.downloadsCountNumber}>
        {formatNumberWithUnit(count)}+
      </span>
      <span className={styles.downloadsCountDescription}>{description}</span>
    </div>
  );
};
