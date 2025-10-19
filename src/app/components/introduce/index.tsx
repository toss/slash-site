import { motion, useAnimate, useScroll, useTransform } from "motion/react";
import { SCENE } from "../../constants";
import styles from "./styles.module.css";
import { useEffect } from "react";
import Image from "next/image";
import Logo from "./logo";

export const IntroduceSection = () => {
  const [scope, animate] = useAnimate();

  const { scrollY } = useScroll();

  const teamScale = useTransform(scrollY, SCENE[0], [1, 0.2]);
  const teamOpacity = useTransform(scrollY, SCENE[1], [0, 1]);

  const subtitleScale = useTransform(scrollY, SCENE[0], [1, 2]);
  const subtitleY = useTransform(scrollY, SCENE[1], [200, -200]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (value) => {
      if (value >= SCENE[1][1]) {
        animate(scope.current, { opacity: 1, y: 100 }, { duration: 0.3 });
      } else {
        animate(scope.current, { opacity: 0, y: 300 }, { duration: 0.3 });
      }
    });

    return () => unsubscribe();
  }, [scrollY, animate, scope]);

  return (
    <section className={styles.landingSection1}>
      <motion.div className={styles.contentWrapper}>
        <Logo />
        <motion.span
          className={styles.title}
          style={{
            scale: teamScale,
            position: "fixed",
            top: "20px",
            right: "20px",
            opacity: teamOpacity,
            transformOrigin: "right top",
          }}
        >
          TEAM
        </motion.span>

        <motion.p
          className={styles.subtitle}
          style={{
            position: "fixed",
            scale: subtitleScale,
            y: subtitleY,
          }}
        >
          PRODUCTIVITY
          <br />
          THAT READS
          <br className={styles.mobileBreak} />
          AS UX
        </motion.p>

        <motion.p
          className={styles.monadDescription}
          ref={scope}
          initial={{ opacity: 0, y: 300 }}
          style={{
            position: "fixed",
          }}
        >
          Toss open source committee designs cohesive, <br />
          production-first tools that reduce decisions and accelerate feedback
          loops; <br />
          so productivity turns into better UX for everyone. <br />
        </motion.p>
      </motion.div>
    </section>
  );
};
