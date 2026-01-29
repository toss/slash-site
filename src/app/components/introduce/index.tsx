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

  const [animationState, setAnimationState] = useState<"hidden" | "visible">(
    "hidden"
  );

  const { scrollY } = useScroll();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const startImageOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 0]);
  const endImageOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

  const updateAnimationState = useCallback(() => {
    if (sectionRef.current) {
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrolled = -rect.top;
      const totalScrollDistance = sectionHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));

      if (progress >= 0.4) {
        setAnimationState("visible");
      } else {
        setAnimationState("hidden");
      }
    }
  }, []);

  useMotionValueEvent(scrollY, "change", updateAnimationState);

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
        muted
        playsInline
        preload="auto"
        autoPlay
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
            pointerEvents: "none",
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
          pointerEvents: "none",
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
