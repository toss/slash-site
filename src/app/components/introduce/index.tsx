"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { PixelSlash } from "../ui/pixel-slash";

export const IntroduceSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationId: number;
    const slowRate = 1;
    const fastRate = 3;
    const holdSlow = 400;  // 0.4초 느리게
    const fastDur = 500;   // 0.5초 빠르게
    const slowDown = 1000; // 1초 감속

    const tick = (now: number, start: number) => {
      const elapsed = now - start;
      const total = holdSlow + fastDur + slowDown;

      if (elapsed < holdSlow) {
        video.playbackRate = slowRate;
      } else if (elapsed < holdSlow + fastDur) {
        const p = (elapsed - holdSlow) / fastDur;
        video.playbackRate = slowRate + (fastRate - slowRate) * Math.sin(p * Math.PI);
      } else if (elapsed < total) {
        const p = (elapsed - holdSlow - fastDur) / slowDown;
        video.playbackRate = slowRate + (1 - slowRate) * p;
      } else {
        video.playbackRate = 1;
      }

      if (elapsed < total) {
        animationId = requestAnimationFrame((t) => tick(t, start));
      }
    };

    const playVideo = () => {
      video.playbackRate = slowRate;
      video.play().catch(() => {});
      animationId = requestAnimationFrame((t) => tick(t, t));
    };

    if (video.readyState >= 1) {
      playVideo();
    } else {
      video.addEventListener("loadedmetadata", playVideo, { once: true });
    }

    return () => cancelAnimationFrame(animationId);
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
