"use client";

import styles from "./page.module.css";
import { ProjectSection } from "./components/project";

import { IntroduceSection } from "./components/introduce";
import { DownloadsSection } from "./components/downloads";
import { PrincipleSection } from "./components/principle";
import { HiringSection } from "./components/hiring";
import { Navbar } from "./components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <IntroduceSection />
        <ProjectSection />
        <DownloadsSection />
        <PrincipleSection />
        <HiringSection />
      </div>
    </>
  );
}
