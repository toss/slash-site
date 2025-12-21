"use client";

import styles from "./page.module.css";
import { ProjectSection } from "./components/project";

import { IntroduceSection } from "./components/introduce";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DownloadsSection } from "./components/downloads";
import { PrincipleSection } from "./components/principle";
import { HiringSection } from "./components/hiring";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <IntroduceSection />
        <ProjectSection />
        <DownloadsSection />
        <PrincipleSection />
        <HiringSection />
      </div>
    </QueryClientProvider>
  );
}
