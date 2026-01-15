import styles from "./styles.module.css";
import { LinkIcon } from "../ui/link-icon";
import Image from "next/image";
import { formatNumberWithUnit } from "../../utils/formatNumber";
import { githubStats } from "../../../data/github-stats";

export const ProjectItem = ({
  name,
  description,
  logoUrl,
  websiteUrl,
  githubUrl,
}: {
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  githubUrl: string;
}) => {
  // as 제거 예정
  const starCount =
    githubStats[name as keyof typeof githubStats]?.stargazers_count || 0;

  return (
    <li className={styles.projectItem}>
      <Image
        src={logoUrl}
        alt={name}
        width={160}
        height={160}
        className={styles.projectLogo}
      />
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{name}</h3>
        <div className={styles.projectBottom}>
          <p className={styles.projectDescription}>
            {description}
            <br />
            <span className={styles.projectStar}>
              {formatNumberWithUnit(starCount)}
            </span>{" "}
            Github stars
          </p>
          <div className={styles.projectLinks}>
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
              Site <LinkIcon />
            </a>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
              <LinkIcon />
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};
