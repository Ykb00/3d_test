import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link href="/about" className={styles.link}>About Us</Link>
        <Link href="/contact" className={styles.link}>Contact</Link>
        <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
        <Link href="/terms" className={styles.link}>Terms & Conditions</Link>
      </div>
      <p className={styles.copy}>
        &copy; {new Date().getFullYear()} Quaticks. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
