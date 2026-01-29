import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";

import styles from "./styles.module.css";
import { useRef, useState, useCallback, useEffect } from "react";

import { Logo } from "./logo";
import Image from "next/image";

import startBackground from "@/assets/start-background.png";
import endBackground from "@/assets/end-background.png";

export const IntroduceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastUpdateTime = useRef<number>(0);

  const [animationState, setAnimationState] = useState<"hidden" | "visible">(
    "hidden"
  );

  const { scrollY } = useScroll();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const startImageOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 0]);
  const endImageOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

  const VIDEO_THROTTLE_MS = 16;

  const updateVideo = useCallback(() => {
    const now = Date.now();
    if (now - lastUpdateTime.current < VIDEO_THROTTLE_MS) return;
    lastUpdateTime.current = now;

    if (videoRef.current && sectionRef.current) {
      const video = videoRef.current;
      const section = sectionRef.current;
      const duration = video.duration;

      if (duration && duration > 0 && video.readyState >= 3) {
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;

        const scrolled = -rect.top;
        const totalScrollDistance = sectionHeight - windowHeight;
        const progress = Math.max(
          0,
          Math.min(1, scrolled / totalScrollDistance)
        );

        requestAnimationFrame(() => {
          if (video.currentTime !== undefined) {
            video.currentTime = progress * duration;
          }
        });

        if (progress >= 0.4) {
          setAnimationState("visible");
        } else {
          setAnimationState("hidden");
        }
      }
    }
  }, []);

  useMotionValueEvent(scrollY, "change", updateVideo);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const initVideo = () => {
        video.play().then(() => {
          video.pause();
          video.currentTime = 0;
        }).catch(() => {});
      };

      if (video.readyState >= 1) {
        initVideo();
      } else {
        video.addEventListener("loadedmetadata", initVideo, { once: true });
      }
    }
  }, []);

  const containerVariants = {
    hidden: {
      opacity: 0,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const subtitleVariants = {
    hidden: {
      opacity: 1,
      rotateX: 0,
    },
    visible: {
      opacity: 0,
      rotateX: 90,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section className={styles.section} ref={sectionRef}>
      <video
        ref={videoRef}
        className={styles.backgroundVideo}
        src="/background-small.mp4"
        poster={startBackground.src}
        muted
        playsInline
        preload="auto"
      />
      <motion.img
        src={startBackground.src}
        alt="Start background"
        className={styles.startImage}
        style={{ opacity: startImageOpacity }}
      />
      <motion.img
        src={endBackground.src}
        alt="End background"
        className={styles.endImage}
        style={{ opacity: endImageOpacity }}
      />
      <Logo animationState={animationState} />
      <motion.div className={styles.contentWrapper}>
        <motion.p
          className={styles.subtitle}
          variants={subtitleVariants}
          initial="hidden"
          animate={animationState}
          style={{
            position: "fixed",
            bottom: "52px",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          PRODUCTIVITY
          <br />
          THAT READS
          <br className={styles.mobileBreak} />
          AS UX
        </motion.p>
      </motion.div>
      <motion.div
        className={styles.logoGridWrapper}
        variants={containerVariants}
        initial="hidden"
        animate={animationState}
        style={{
          position: "fixed",
          bottom: "52px",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <motion.div className={styles.logoGrid}>
          {ADOPTERS.map((adopter, index) => (
            <motion.div
              key={adopter.name}
              className={styles.logoWrapper}
              variants={logoVariants}
              custom={index}
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src={adopter.src}
                alt={adopter.name}
                fill
                className={styles.logoImage}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

const ADOPTERS = [
  {
    name: "yarn",
    src: "/other-logos/yarn.svg",
  },
  {
    name: "microsoft",
    src: "/other-logos/microsoft.svg",
  },
  {
    name: "storybook",
    src: "/other-logos/storybook.svg",
  },
  {
    name: "jest-dom",
    src: "/other-logos/jest-dom.svg",
  },
];
