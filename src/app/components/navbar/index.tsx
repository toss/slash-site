import styles from "./styles.module.css";
import Link from "next/link";
import { PixelSlash } from "../ui/pixel-slash";

export const Navbar = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li>
          <Link href="/" className={styles.logo}>
            S<PixelSlash />ash
          </Link>
        </li>
        <li>
          <Link href="/team">TEAM</Link>
        </li>
      </ul>
    </nav>
  );
};
