import { motion } from "motion/react";
import styles from "./styles.module.css";

export const Logo = ({
  animationState,
}: {
  animationState: "hidden" | "visible" | undefined;
}) => {
  return (
    <>
      <motion.span className={styles.title}>
        <span className={styles.logoLetter}>S</span>
        <motion.span
          className={styles.logoLetter}
          animate={{
            skewX: animationState === "visible" ? -15 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          l
        </motion.span>
        <div className={styles.logoLetter}>ash</div>
      </motion.span>
    </>
  );
};
