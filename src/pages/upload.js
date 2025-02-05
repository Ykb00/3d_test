import Link from "next/link";
import styles from "../styles/header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <Link href="/" className={styles.logo}>
        Quaticks
      </Link>

      {/* Navigation Buttons */}
      <div className={styles.buttons}>
        <Link href="/upload">
          <button className={styles.button}>Upload a Design</button>
        </Link>
        <Link href="/designer">
          <button className={`${styles.button} ${styles.secondary}`}>
            Need a Designer?
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
