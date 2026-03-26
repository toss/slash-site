"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { PixelSlash } from "../ui/pixel-slash";

export const IntroduceSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1;
    video.play().catch(() => {});
  }, []);

  return (
    <header className={styles.section}>
      <video
        ref={videoRef}
        className={styles.backgroundVideo}
        src="/background.mp4"
        muted
        playsInline
        preload="auto"
        autoPlay
        loop
      />

      <div className={styles.shards}>
        <div className={`${styles.shard} ${styles.shard1}`} />
        <div className={`${styles.shard} ${styles.shard2}`} />
        <div className={`${styles.shard} ${styles.shard3}`} />
        <div className={`${styles.shard} ${styles.shard4}`} />
        <div className={styles.glowBg} />
      </div>

      <div className={styles.content}>
        <div className={styles.logo}>
          <span className={styles.logoText}>S</span>
          <span className={styles.logoSlash}>
            <PixelSlash animated />
          </span>
          <span className={styles.logoText}>ash</span>
        </div>

        <div className={styles.description}>
          <p>
            The Slash library is a collection of TypeScript/JavaScript packages
            used by Toss.
          </p>
        </div>

        <div className={styles.usedBy}>
          <span className={styles.usedByLabel}>Used by</span>
          <span className={styles.usedByNames}>
            {["Yarn Berry", "MUI", "Storybook", "ink", "Recharts", "CKEditor"].map(
              (name, i, arr) => (
                <span key={name}>
                  {name}
                  {i < arr.length - 1 && (
                    <span className={styles.usedBySeparator}>/</span>
                  )}
                </span>
              ),
            )}
          </span>
        </div>
      </div>
    </header>
  );
};
