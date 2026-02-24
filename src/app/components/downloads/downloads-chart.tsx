import styles from "./styles.module.css";

interface ChartDataPoint {
  month: string;
  downloads: number;
  fullDate: string;
}

export const DownloadsChart = ({
  data,
  isVisible,
}: {
  data: ChartDataPoint[];
  isVisible: boolean;
}) => {
  const maxDownloads = Math.max(...data.map((d) => d.downloads));

  const pathD = data.reduce((acc, d, i) => {
    const x = (i / (data.length - 1)) * 1000;
    const y = 200 - (d.downloads / maxDownloads) * 180;
    if (i === 0) return `M${x},${y}`;
    const prevX = ((i - 1) / (data.length - 1)) * 1000;
    const prevY = 200 - (data[i - 1].downloads / maxDownloads) * 180;
    const cpx1 = prevX + (x - prevX) / 3;
    const cpx2 = x - (x - prevX) / 3;
    return `${acc} C${cpx1},${prevY} ${cpx2},${y} ${x},${y}`;
  }, "");

  const lastX = 1000;
  const lastY =
    200 - (data[data.length - 1].downloads / maxDownloads) * 180;

  return (
    <div
      className={styles.chartContainer}
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      <svg viewBox="0 0 1000 200" className={styles.chart}>
        <line
          x1="0"
          y1="200"
          x2="1000"
          y2="200"
          stroke="#333"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="180"
          x2="1000"
          y2="180"
          stroke="#333"
          strokeWidth="1"
          strokeDasharray="5,5"
          opacity="0.3"
        />
        <path
          d={pathD}
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={lastX} cy={lastY} r="4" fill="#ffffff" />
      </svg>
      <div className={styles.chartLabel}>Project Downloads</div>
    </div>
  );
};
