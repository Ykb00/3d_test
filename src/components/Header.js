import Link from "next/link";
import styles from "../styles/header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Logo on the left */}
      <Link href="/" className={styles.logo}>
        Quaticks
      </Link>

      {/* Centered buttons */}
      <div className={styles.buttons}>
        <Link href="/" className={styles.button}>
          Upload Design
        </Link>
        <Link href="/designer" className={`${styles.button} ${styles.secondary}`}>
          Find a Designer
        </Link>
      </div>
    </header>
  );
};

export default Header;
