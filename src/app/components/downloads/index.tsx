"use client";

import styles from "./styles.module.css";
import { formatNumberWithUnit } from "../../utils/formatNumber";
import { Separator } from "../ui/separator";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ReactElement } from "react";

const data = [
  { month: "Jan", downloads: 100 },
  { month: "Feb", downloads: 110 },
  { month: "Mar", downloads: 115 },
  { month: "Apr", downloads: 120 },
  { month: "May", downloads: 125 },
  { month: "Jun", downloads: 130 },
  { month: "Jul", downloads: 135 },
  { month: "Aug", downloads: 140 },
  { month: "Sep", downloads: 145 },
  { month: "Oct", downloads: 155 },
  { month: "Nov", downloads: 175 },
  { month: "Dec", downloads: 220 },
];

export const DownloadsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>Downloads</h2>
        </div>

        <div className={styles.downloadsCountWrapper}>
          <DownloadsCountItem
            count={110000}
            description={
              <span>
                Total GitHub
                <br />
                stars
              </span>
            }
          />
          <DownloadsCountItem
            count={110000}
            description={
              <span>
                GitHub
                <br />
                Dependents
              </span>
            }
          />
          <DownloadsCountItem
            count={110000}
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
                data={data}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="month" hide />
                <YAxis hide />
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
