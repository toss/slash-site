import { motion } from "motion/react";
import styles from "./styles.module.css";
import Image from "next/image";

export const Logo = ({
  animationState,
}: {
  animationState: "hidden" | "visible" | undefined;
}) => {
  return (
    <>
      <motion.span className={styles.title}>
        <div className={styles.logoLetter}>
          <Image
            src="/slash-logo/logo-big-s.png"
            alt=""
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <motion.div
          className={styles.logoLetter}
          animate={{
            skewX: animationState === "visible" ? -8 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <Image 
            src="/slash-logo/logo-l.png" 
            alt="" 
            fill
            style={{ objectFit: 'contain' }}
          />
        </motion.div>
        <div className={styles.logoLetter}>
          <Image 
            src="/slash-logo/logo-a.png" 
            alt="" 
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className={styles.logoLetter}>
          <Image 
            src="/slash-logo/logo-s.png" 
            alt="" 
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className={styles.logoLetter}>
          <Image 
            src="/slash-logo/logo-h.png" 
            alt="" 
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </motion.span>
    </>
  );
};
