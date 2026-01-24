import { motion, useScroll, useTransform } from "motion/react";

import styles from "./styles.module.css";
import { ProjectItem } from "./project-item";
import { Separator } from "../ui/separator";
import { Fragment, useRef } from "react";

import esToolkitLogo from "@/assets/package-logos/es-toolkit.png";
import esGitLogo from "@/assets/package-logos/es-git.png";
import esHangulLogo from "@/assets/package-logos/es-hangul.png";
import overlayKitLogo from "@/assets/package-logos/overlay-kit.png";
import simplikitLogo from "@/assets/package-logos/simplikit.png";
import useFunnelLogo from "@/assets/package-logos/use-funnel.png";
import suspensiveLogo from "@/assets/package-logos/suspensive.png";

export const ProjectSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 60%", "end start"],
  });

  const projectTitleScale = useTransform(scrollYProgress, [0, 0.2], [3, 1]);

  return (
    <motion.section className={styles.section} ref={sectionRef}>
      <motion.div className={styles.contentWrapper}>
        <motion.div
          className={styles.title}
          style={{ scale: projectTitleScale }}
        >
          PROJECTS
        </motion.div>
      </motion.div>
      <ul className={styles.projectList}>
        {PROJECTS.map((project, index) => (
          <Fragment key={project.name}>
            <ProjectItem key={project.name} {...project} />
            {index !== PROJECTS.length - 1 && <Separator />}
          </Fragment>
        ))}
      </ul>
    </motion.section>
  );
};

const PROJECTS = [
  {
    name: "es toolkit",
    description: "Focused TypeScript utilities for tests & DX.",
    logoUrl: esToolkitLogo,
    websiteUrl: "https://toss.tech/es-toolkit",
    githubUrl: "https://github.com/toss/es-toolkit",
  },
  {
    name: "es git",
    description: "Fast Git data access utilities for Node environments.",
    logoUrl: esGitLogo,
    websiteUrl: "https://toss.tech/es-git",
    githubUrl: "https://github.com/toss/es-git",
  },
  {
    name: "es hangul",
    description:
      "Minimal utilities for Hangul parsing, particles, and matching.",
    logoUrl: esHangulLogo,
    websiteUrl: "https://toss.tech/es-hangul",
    githubUrl: "https://github.com/toss/es-hangul",
  },
  {
    name: "overlay kit",
    description:
      "Declarative overlay primitives for modals, popovers, and dialogs.",
    logoUrl: overlayKitLogo,
    websiteUrl: "https://toss.tech/overlay-kit",
    githubUrl: "https://github.com/toss/overlay-kit",
  },
  {
    name: "react simplikit",
    description: "Lightweight React utilities and hooks for everyday use.",
    logoUrl: simplikitLogo,
    websiteUrl: "https://toss.tech/react-simplikit",
    githubUrl: "https://github.com/toss/react-simplikit",
  },
  {
    name: "use funnel",
    description: "Type-safe UI flow management for multi-step screens.",
    logoUrl: useFunnelLogo,
    websiteUrl: "https://toss.tech/use-funnel",
    githubUrl: "https://github.com/toss/use-funnel",
  },
  {
    name: "Suspensive",
    description: "Practical building blocks for React Suspense in production.",
    logoUrl: suspensiveLogo,
    websiteUrl: "https://toss.tech/suspensive",
    githubUrl: "https://github.com/toss/suspensive",
  },
];
