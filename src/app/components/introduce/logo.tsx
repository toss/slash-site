import { motion, useScroll, useTransform } from "motion/react";
import styles from "./styles.module.css";
import { SCENE } from "@/app/constants";
import Image from "next/image";

const Logo = () => {
  const { scrollY } = useScroll();

  const monadScale = useTransform(scrollY, SCENE[0], [1, 0.2]);
  const monadTop = useTransform(scrollY, SCENE[0], ["25%", "0%"]);
  const monadLeft = useTransform(scrollY, SCENE[1], ["50%", "0%"]);
  const monadTranslateX = useTransform(scrollY, SCENE[1], ["-50%", "0%"]);
  const monadRotate = useTransform(scrollY, SCENE[0], [0, 360]);
  return (
    <>
      <motion.span
        className={styles.title}
        style={{
          scale: monadScale,
          willChange: "transform",
          position: "fixed",
          top: monadTop,
          left: monadLeft,
          translateX: monadTranslateX,
          display: "flex",
          alignItems: "center",
          gap: "0",
          transformOrigin: "20px 20px",
        }}
      >
        M
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
            marginTop: "-0.1em",
          }}
        >
          <motion.div
            style={{
              rotate: monadRotate,
            }}
          >
            <Image
              src="/o.svg"
              alt="O"
              width={120}
              height={120}
              style={{
                width: "1em",
                height: "1em",
                display: "block",
              }}
            />
          </motion.div>
        </div>
        NAD
      </motion.span>
    </>
  );
};

export default Logo;
