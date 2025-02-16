import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import styles from "../styles/contact.module.css";

export default function Contact() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Get in Touch</h1>
        <p className={styles.description}>
          We love to hear from you! Whether you have questions, feedback, or
          simply want to say hello, reach out and we'll get back to you shortly.
        </p>
        <div className={styles.buttons}>
          <a
            href="https://wa.me/+918921378281"  
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappButton}
          >
            <FaWhatsapp className={styles.icon} /> WhatsApp Us
          </a>
          <a
            href="mailto:yaswanthkumar7b@gmail.com"
            className={styles.emailButton}
          >
            <FaEnvelope className={styles.icon} /> Email Us
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
