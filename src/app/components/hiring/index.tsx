import styles from "./styles.module.css";

export const HiringSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.contentWrapper}>
        <span className={styles.title}> We're Hiring! </span>
        <span className={styles.subtitle}>If you want to</span>
      </div>

      <div className={styles.cardsContainer}>
        <div
          className={styles.card}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            transform: "rotate(-5deg) translate(-20%, 0)",
          }}
        >
          <h3 className={styles.cardTitle} style={{ color: "#000000" }}>
            Boost DX
          </h3>
          <p className={styles.cardDescription} style={{ color: "#000000" }}>
            for developer experience performance
            <br />
            further.
          </p>
        </div>
        <div
          className={styles.card}
          style={{
            backgroundColor: "#283A60",
            color: "#ffffff",
            transform: "rotate(5deg) translate(40%, -10%)",
          }}
        >
          <h3 className={styles.cardTitle} style={{ color: "#ffffff" }}>
            Turn productivity
          </h3>
          <p className={styles.cardDescription} style={{ color: "#ffffff" }}>
            gains into better UX for millions
          </p>
        </div>
        <div
          className={styles.card}
          style={{
            backgroundColor: "#E0ECF8",
            color: "#333D4B",
            transform: "rotate(3deg) translate(-20%, -20%)",
            zIndex: 2,
            width: "618px",
            height: "200px",
          }}
        >
          <h3 className={styles.cardTitle} style={{ color: "#333D4B" }}>
            Raise UX
          </h3>
          <p className={styles.cardDescription} style={{ color: "#333D4B" }}>
            for developer experience performance further.
          </p>
        </div>
      </div>

      <button className={styles.hiringButton}>Join Toss Team</button>
      <span className={styles.copyright}>
        Copyright © 2025 Viva Republica · Toss Frontend Chapter
      </span>
    </section>
  );
};

const Card = ({
  title,
  description,
  backgroundColor,
  color,
  rotation,
  left,
}: {
  title: string;
  description: string;
  backgroundColor: string;
  color: string;
  rotation: number;
  left: string;
}) => {
  return (
    // 한 20도 기울어진 카드
    <div
      className={styles.card}
      style={{
        backgroundColor,
        color,
        transform: `rotate(${rotation}deg) translate(${left}, 0)`,
      }}
    >
      <h3 className={styles.cardTitle} style={{ color }}>
        {title}
      </h3>
      <p className={styles.cardDescription} style={{ color }}>
        {description}
      </p>
    </div>
  );
};

const CARDS = [
  {
    title: "Boost DX",
    description: "for developer experience performance further.",
    backgroundColor: "#ffffff",
    color: "#000000",
    rotation: -5,
    left: "-20%",
  },
  {
    title: "Turn productivity",
    description: "gains into better UX for millions",
    backgroundColor: "#283A60",
    color: "#ffffff",
    rotation: 5,
    left: "40%",
  },
  {
    title: "#E0ECF8",
    description: "gains into better UX for millions",
    backgroundColor: "#E0ECF8",
    color: "#333D4B",
    rotation: 3,
    left: "-20%",
  },
];
