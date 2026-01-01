import { motion, useScroll, useTransform } from "motion/react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

const NAVBAR_SCROLL_THRESHOLD = 470;
const NAVBAR_FADE_END = 800;

export const Navbar = ({
  scrollMotionEnabled = true,
}: {
  scrollMotionEnabled?: boolean;
}) => {
  const router = useRouter();
  const { scrollY } = useScroll();
  const opacity = useTransform(
    scrollY,
    [NAVBAR_SCROLL_THRESHOLD, NAVBAR_FADE_END],
    [0, 1]
  );

  return (
    <>
      <motion.nav
        className={styles.container}
        style={{ opacity: scrollMotionEnabled ? opacity : 1 }}
      >
        <ul className={styles.list}>
          <li
            onClick={() => {
              router.push("/", { scroll: false });
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            S
            <span
              style={{
                display: "inline-block",
                transform: "skewX(-15deg)",
              }}
            >
              l
            </span>
            ash
          </li>
          <li
            onClick={() => {
              window.scrollTo({
                top: 0,
              });
              router.push("/team");
            }}
          >
            TEAM
          </li>
        </ul>
      </motion.nav>
    </>
  );
};
