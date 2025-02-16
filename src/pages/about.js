import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import styles from "../styles/about.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>About Our Founders</h1>
        <div className={styles.founders}>
          <div className={styles.founder}>
            <h2 className={styles.founderName}>Thirumani Akash</h2>
            <p className={styles.cofounderText}>CO-FOUNDER</p>
            <p className={styles.founderQuote}>
              "Innovation distinguishes between a leader and a follower. With relentless passion and perseverance, Thirumani leads our vision with creativity and heart."
            </p>
          </div>
          <div className={styles.founder}>
            <h2 className={styles.founderName}>Yaswanth Kumar</h2>
            <p className={styles.cofounderText}>CO-FOUNDER</p>
            <p className={styles.founderQuote}>
              "Success is not final, failure is not fatal: It is the courage to continue that counts. Yaswanth inspires us every day with his commitment to excellence and breakthrough thinking."
            </p>
          </div>
        </div>
        <div className={styles.contactCall}>
          <p className={styles.contactText}>
            Want to learn more or get in touch? We're here to help!
          </p>
          <Link href="/contact" className={styles.contactButton}>
            Contact Us
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
