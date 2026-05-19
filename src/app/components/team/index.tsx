import Image, { StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./styles.module.css";

import sojinPark from "@/assets/images/people/sojin-park.jpeg";
import dongwookMoon from "@/assets/images/people/dongwook-moon.jpeg";
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
    <section className={styles.section}>
      <h2 className={styles.title}>Team</h2>
      <div className={styles.grid}>
        {MEMBERS.map((member, index) => {
          const isRight = index % 2 === 1;

          const info = (
            <div className={styles.cardInfo}>
              <span className={styles.name}>{member.name}</span>
              <div className={styles.cardMeta}>
                <span className={styles.position}>{member.position}</span>
                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubLink}
                >
                  GitHub <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          );

          const photo = (
            <div className={styles.cardPhoto}>
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={200}
                height={240}
                className={styles.photo}
              />
            </div>
          );

          return (
            <div className={styles.card} key={member.name}>
              {isRight ? (
                <>
                  {photo}
                  {info}
                </>
              ) : (
                <>
                  {info}
                  {photo}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
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
