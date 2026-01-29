import styles from "./styles.module.css";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li>
          <Link href="/">
            S
            <span
              style={{
                display: "inline-block",
                transform: "skewX(-15deg)",
              }}
            >
              l
            </span>
            ash
          </Link>
        </li>
        <li>
          <Link href="/team">TEAM</Link>
        </li>
      </ul>
    </nav>
  );
};
