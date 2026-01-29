import { motion, useScroll, useTransform } from "motion/react";
import styles from "./styles.module.css";
import Link from "next/link";

const NAVBAR_SCROLL_THRESHOLD = 470;
const NAVBAR_FADE_END = 800;

export const Navbar = ({
  scrollMotionEnabled = true,
}: {
  scrollMotionEnabled?: boolean;
}) => {
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
          <li>
            <Link href="/">
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
            </Link>
          </li>
          <li>
            <Link href="/team">TEAM</Link>
          </li>
        </ul>
      </motion.nav>
    </>
  );
};
