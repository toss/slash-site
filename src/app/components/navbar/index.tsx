"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { PixelSlash } from "../ui/pixel-slash";

export const Navbar = ({ showOnScroll = false }: { showOnScroll?: boolean }) => {
  const [visible, setVisible] = useState(!showOnScroll);

  useEffect(() => {
    if (!showOnScroll) return;

    const onScroll = () => {
      setVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showOnScroll]);

  return (
    <nav
      className={`${styles.container} ${visible ? styles.visible : styles.hidden}`}
    >
      <ul className={styles.list}>
        <li>
          <Link href="/" className={styles.logo}>
            S
            <span className={styles.logoSlash}>
              <PixelSlash />
            </span>
            ash
          </Link>
        </li>
        <li>
          <Link href="/team">Team</Link>
        </li>
      </ul>
    </nav>
  );
};
