import { motion, useScroll, useTransform } from "motion/react";
import { SCENE } from "../../constants";
import styles from "./styles.module.css";

export const ProjectSection = () => {
  const { scrollY } = useScroll();
  const projectTitleScale = useTransform(scrollY, SCENE[3], [1, 0.3]);

  return (
    <section className={styles.projectSection}>
      <motion.div className={styles.contentWrapper}>
        <motion.div
          className={styles.title}
          style={{ scale: projectTitleScale }}
        >
          PROJECTS
        </motion.div>
      </motion.div>
    </section>
  );
};
