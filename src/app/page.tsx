"use client";

import styles from "./page.module.css";
import { IntroduceSection } from "./components/introduce";
import { ProjectSection } from "./components/project";
import { DownloadsSection } from "./components/downloads";
import { PrincipleSection } from "./components/principle";
import { HiringSection } from "./components/hiring";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <IntroduceSection />
      <ProjectSection />
      <DownloadsSection />
      <PrincipleSection />
      <HiringSection />
      <Footer />
    </div>
  );
}
