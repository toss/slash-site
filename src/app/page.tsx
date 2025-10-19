"use client";

import styles from "./page.module.css";
import { ProjectSection } from "./components/project";

import { IntroduceSection } from "./components/introduce";

export default function Home() {
  return (
    <div className={styles.container}>
      <IntroduceSection />
      <ProjectSection />
    </div>
  );
}
