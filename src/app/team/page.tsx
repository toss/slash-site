"use client";

import styles from "./page.module.css";
import { Navbar } from "../components/navbar";
import { TeamSection } from "../components/team";
import { HiringSection } from "../components/hiring";

export default function TeamPage() {
  return (
    <div className={styles.container}>
      <Navbar scrollMotionEnabled={false} />
      <TeamSection />
      <HiringSection variant="absolute" />
    </div>
  );
}
