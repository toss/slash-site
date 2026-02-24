import Image from "next/image";
import slashBottom from "@/assets/slash-logo/slash-bottom.png";
import styles from "./styles.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logoImage}>
          <Image
            src={slashBottom}
            alt="Slash"
            className={styles.logo}
            priority
          />
        </div>
        <div className={styles.copyright}>
          Copyright &copy; 2024 Viva Republica - Toss Frontend Chapter
        </div>
      </div>
    </footer>
  );
};
