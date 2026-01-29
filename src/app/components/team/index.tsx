import Image, { StaticImageData } from "next/image";
import styles from "./styles.module.css";
import githubIcon from "@/assets/github.png";

import sojinPark from "@/assets/images/people/sojin-park.jpeg";
import dongwookMoon from "@/assets/images/people/dongwook-moon.jpeg";
import jonghyeonKo from "@/assets/images/people/jonghyeon-ko.jpeg";
import sanghyeonSong from "@/assets/images/people/song-sang-hyun.jpeg";
import chanhyuckPark from "@/assets/images/people/okinawaa.png";
import yunhoKim from "@/assets/images/people/kim-you-know.jpeg";
import yongbeenIm from "@/assets/images/people/yongbeen-im.jpeg";
import sukyeongPark from "@/assets/images/people/sukyung-park.jpeg";
import dayongLee from "@/assets/images/people/dayong-lee.jpeg";
import juhyeokKang from "@/assets/images/people/juhyeok-kang.jpg";
import seonjinKim from "@/assets/images/people/seonjin-kim.jpg";
import seokjuNa from "@/assets/images/people/seokju-na.jpeg";
import myounghoPark from "@/assets/images/people/myoungho-park.jpeg";

export const TeamSection = () => {
  return (
    <div className={styles.section}>
      <div className={styles.title}>TEAM</div>
      <div className={styles.membersContainer}>
        {MEMBERS.map((member) => (
          <div className={styles.member} key={member.name}>
            <div className={styles.memberImage}>
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={100}
                height={100}
              />
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
                <Image
                  src={githubIcon}
                  alt="github link"
                  width={16}
                  height={16}
                />
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
  imageUrl: StaticImageData | string;
  githubId: string;
  githubUrl: string;
};

const MEMBERS: MemberInfo[] = [
  {
    name: "Sojin Park",
    position: "Toss Team",
    imageUrl: sojinPark,
    githubId: "raon0211",
    githubUrl: "https://github.com/raon0211",
  },
  {
    name: "Dongwook Moon",
    position: "Toss Team",
    imageUrl: dongwookMoon,
    githubId: "evan-moon",
    githubUrl: "https://github.com/evan-moon",
  },
  {
    name: "Jonghyeon Ko",
    position: "Toss Team",
    imageUrl: jonghyeonKo,
    githubId: "manudeli",
    githubUrl: "https://github.com/manudeli",
  },
  {
    name: "Sanghyeon Song",
    position: "Toss Team",
    imageUrl: sanghyeonSong,
    githubId: "moraeso",
    githubUrl: "https://github.com/moraeso",
  },
  {
    name: "Chanhyuck Park",
    position: "Toss Team",
    imageUrl: chanhyuckPark,
    githubId: "okinawaa",
    githubUrl: "https://github.com/okinawaa",
  },
  {
    name: "Yunho Kim",
    position: "Toss Team",
    imageUrl: yunhoKim,
    githubId: "kimyouknow",
    githubUrl: "https://github.com/kimyouknow",
  },
  {
    name: "Yongbeen Im",
    position: "Toss Team",
    imageUrl: yongbeenIm,
    githubId: "jungpaeng",
    githubUrl: "https://github.com/jungpaeng",
  },
  {
    name: "Sukyeong Park",
    position: "Toss Team",
    imageUrl: sukyeongPark,
    githubId: "zztnrudzz13",
    githubUrl: "https://github.com/zztnrudzz13",
  },
  {
    name: "Dayong Lee",
    position: "Toss Team",
    imageUrl: dayongLee,
    githubId: "dayongkr",
    githubUrl: "https://github.com/dayongkr",
  },
  {
    name: "Juhyeok Kang",
    position: "Toss Team",
    imageUrl: juhyeokKang,
    githubId: "kangju2000",
    githubUrl: "https://github.com/kangju2000",
  },
  {
    name: "Seonjin Kim",
    position: "Toss Team",
    imageUrl: seonjinKim,
    githubId: "Junnis0123",
    githubUrl: "https://github.com/Junnis0123",
  },
  {
    name: "Seokju Na",
    position: "Toss Team",
    imageUrl: seokjuNa,
    githubId: "seokju-na",
    githubUrl: "https://github.com/seokju-na",
  },
  {
    name: "Myoungho Park",
    position: "Toss Team",
    imageUrl: myounghoPark,
    githubId: "qkraudghgh",
    githubUrl: "https://github.com/qkraudghgh",
  },
];
