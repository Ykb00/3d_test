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
        <button className={styles.button}>Upload Design</button>
        <button className={`${styles.button} ${styles.secondary}`}>Find a Designer</button>
      </div>
    </header>
  );
};

export default Header;
