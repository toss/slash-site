"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { PixelSlash } from "../ui/pixel-slash";

export const IntroduceSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 2;
      const playVideo = () => {
        video.play().catch(() => {});
      };

      if (video.readyState >= 1) {
        playVideo();
      } else {
        video.addEventListener("loadedmetadata", playVideo, { once: true });
      }
    }
  }, []);

  return (
    <header className={styles.section}>
      <video
        ref={videoRef}
        className={styles.backgroundVideo}
        src="/background-small.mp4"
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

        <div className={styles.trustedBy}>
          <div className={styles.description}>
            <p>Trusted by teams at</p>
          </div>
          <div className={styles.trustedByLogos}>
            <img
              src="/other-logos/yarn.svg"
              alt="Yarn"
              className={styles.trustedLogo}
            />
            <img
              src="/other-logos/microsoft.svg"
              alt="Microsoft"
              className={styles.trustedLogo}
            />
            <img
              src="/other-logos/storybook.svg"
              alt="Storybook"
              className={styles.trustedLogo}
            />
            <img
              src="/other-logos/jest-dom.svg"
              alt="Jest Dom"
              className={styles.trustedLogo}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
