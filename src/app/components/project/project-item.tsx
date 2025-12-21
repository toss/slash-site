import { useQuery } from "@tanstack/react-query";
import styles from "./styles.module.css";
import { LinkIcon } from "../ui/link-icon";
import Image from "next/image";

export const ProjectItem = ({
  name,
  description,
  url,
  logoUrl,
  websiteUrl,
  githubUrl,
}: {
  name: string;
  description: string;
  url: string;
  logoUrl: string;
  websiteUrl: string;
  githubUrl: string;
}) => {
  const { data: project, isLoading } = useQuery<{
    stargazers_count: number;
  }>({
    queryKey: ["project", name],
    queryFn: async () => {
      const res = await fetch(`https://api.github.com/repos/toss${url}`);
      return res.json();
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 60 * 60 * 1000, // 1 hour
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

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
            {isLoading ? null : (
              <>
                <span className={styles.projectStar}>
                  {project?.stargazers_count}
                </span>{" "}
                Github stars
              </>
            )}
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
