"use client";

import styles from "./styles.module.css";
import Image, { StaticImageData } from "next/image";
import { formatNumberWithUnit } from "../../utils/formatNumber";
import { githubStats } from "../../../data/github-stats";
import { ArrowUpRight } from "lucide-react";
import { useTypingEffect } from "../ui/use-typing-effect";

export const ProjectItem = ({
  name,
  description,
  logoUrl,
  websiteUrl,
  githubUrl,
}: {
  name: string;
  description: string;
  logoUrl: StaticImageData;
  websiteUrl: string;
  githubUrl: string;
}) => {
  const starCount =
    githubStats[name as keyof typeof githubStats]?.stargazers_count || 0;

  const { displayText, isAnimating, trigger } = useTypingEffect(name);

  return (
    <li
      className={styles.projectItem}
      onClick={() => window.open(websiteUrl, "_blank")}
      style={{ cursor: "pointer" }}
      onMouseEnter={trigger}
    >
      <div className={styles.projectInfo}>
        <div className={styles.logoWrapper}>
          <Image
            src={logoUrl}
            alt={name}
            width={160}
            height={160}
            className={styles.projectLogo}
          />
        </div>
        <div className={styles.projectContent}>
          <h3 className={styles.projectTitle}>
            {displayText}
            <span className={styles.cursor}>|</span>
          </h3>
          <p className={styles.projectDescription}>{description}</p>
          <p className={styles.projectStar}>
            <span className={styles.starCount}>
              {formatNumberWithUnit(starCount)}
            </span>{" "}
            <span className={styles.starLabel}>Github stars</span>
          </p>
        </div>
      </div>
      <div className={styles.projectLinks}>
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Site <ArrowUpRight size={12} />
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Github <ArrowUpRight size={12} />
        </a>
      </div>
    </li>
  );
};
