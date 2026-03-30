"use client";

import styles from "./styles.module.css";
import { ProjectItem } from "./project-item";
import { StaticImageData } from "next/image";

import esToolkitLogo from "@/assets/package-logos/es-toolkit.png";
import esGitLogo from "@/assets/package-logos/es-git.png";
import esHangulLogo from "@/assets/package-logos/es-hangul.png";
import overlayKitLogo from "@/assets/package-logos/overlay-kit.png";
import simplikitLogo from "@/assets/package-logos/simplikit.png";
import useFunnelLogo from "@/assets/package-logos/use-funnel.png";
import suspensiveLogo from "@/assets/package-logos/suspensive.png";

export const ProjectSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Projects <span className={styles.count}>(7)</span>
      </h2>

      <ul className={styles.projectList}>
        {PROJECTS.map((project) => (
          <ProjectItem key={project.name} {...project} />
        ))}
      </ul>
    </section>
  );
};

const PROJECTS: {
  name: string;
  description: string;
  logoUrl: StaticImageData;
  websiteUrl: string;
  githubUrl: string;
}[] = [
  {
    name: "es-toolkit",
    description: "Focused TypeScript utilities for tests & DX.",
    logoUrl: esToolkitLogo,
    websiteUrl: "https://es-toolkit.dev",
    githubUrl: "https://github.com/toss/es-toolkit",
  },
  {
    name: "es-hangul",
    description: "Utilities for Hangul parsing, particles, and matching.",
    logoUrl: esHangulLogo,
    websiteUrl: "https://es-hangul.slash.page/en",
    githubUrl: "https://github.com/toss/es-hangul",
  },
  {
    name: "suspensive",
    description: "Practical building blocks for React Suspense in production.",
    logoUrl: suspensiveLogo,
    websiteUrl: "https://suspensive.org/en",
    githubUrl: "https://github.com/toss/suspensive",
  },
  {
    name: "overlay-kit",
    description:
      "Declarative overlay primitives for modals, popovers, and dialogs.",
    logoUrl: overlayKitLogo,
    websiteUrl: "https://overlay-kit.slash.page/en",
    githubUrl: "https://github.com/toss/overlay-kit",
  },
  {
    name: "use-funnel",
    description: "Type-safe UI flow management for multi-step screens.",
    logoUrl: useFunnelLogo,
    websiteUrl: "https://use-funnel.slash.page",
    githubUrl: "https://github.com/toss/use-funnel",
  },
  {
    name: "es-git",
    description: "Fast Git data access utilities for Node environments.",
    logoUrl: esGitLogo,
    websiteUrl: "https://es-git.dev",
    githubUrl: "https://github.com/toss/es-git",
  },
  {
    name: "react-simplikit",
    description: "Lightweight React utilities and hooks for everyday use.",
    logoUrl: simplikitLogo,
    websiteUrl: "https://react-simplikit.slash.page",
    githubUrl: "https://github.com/toss/react-simplikit",
  },
];
