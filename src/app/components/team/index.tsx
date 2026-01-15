import Image from "next/image";
import styles from "./styles.module.css";

export const TeamSection = () => {
  return (
    <div className={styles.section}>
      <div className={styles.title}>TEAM</div>
      <div className={styles.membersContainer}>
        {MEMBERS.map((member) => (
          <div className={styles.member} key={member.name}>
            <div className={styles.memberImage}>
              <Image src={member.imageUrl} alt={member.name} width={100} height={100} />
            </div>
            <div className={styles.memberName}>{member.name}</div>
            <div className={styles.memberPosition}>{member.position}</div>
            <div className={styles.memberGithub}>
              <a
                href={member.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {member.githubId}
              </a>
              <a
                href={member.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/github.png" alt="github link" width={16} height={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type MemberInfo = {
  name: string;
  position: string;
  imageUrl: string;
  githubId: string;
  githubUrl: string;
};

const MEMBERS: MemberInfo[] = [
  {
    name: "DongWook Moon",
    position: "Toss Team",
    imageUrl: "https://avatars.githubusercontent.com/u/19145342?v=4",
    githubId: "evan-moon",
    githubUrl: "https://github.com/evan-moon",
  },
  {
    name: "Sojin Park",
    position: "Toss Team",
    imageUrl: "https://avatars.githubusercontent.com/u/3102175?v=4",
    githubId: "raon0211",
    githubUrl: "https://github.com/raon0211",
  },
  {
    name: "Jonghyeon Ko",
    position: "Toss Team",
    imageUrl: "https://avatars.githubusercontent.com/u/61593290?v=4",
    githubId: "manudeli",
    githubUrl: "https://github.com/manudeli",
  },
  {
    name: "Sanghyeon Song",
    position: "Toss Team",
    imageUrl: "https://avatars.githubusercontent.com/u/45632773?v=4",
    githubId: "moraeso",
    githubUrl: "https://github.com/moraeso",
  },
  {
    name: "Chanhyuck Park",
    position: "Toss Team",
    imageUrl: "https://avatars.githubusercontent.com/u/69495129?v=4",
    githubId: "okinawaa",
    githubUrl: "https://github.com/okinawaa",
  },
  {
    name: "Yunho Kim",
    position: "Toss Team",
    imageUrl: "https://avatars.githubusercontent.com/u/71386219?v=4",
    githubId: "kimyouknow",
    githubUrl: "https://github.com/kimyouknow",
  },
  {
    name: "Yongbeen Im",
    position: "Toss Team",
    imageUrl: "https://avatars.githubusercontent.com/u/26024412?v=4",
    githubId: "jungpaeng",
    githubUrl: "https://github.com/jungpaeng",
  },
  {
    name: "Sukyeong Park",
    position: "Toss Team",
    imageUrl: "https://avatars.githubusercontent.com/u/81177665?v=4",
    githubId: "zztnrudzz13",
    githubUrl: "https://github.com/zztnrudzz13",
  },
];
