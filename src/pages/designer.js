import Header from "../components/Header";
import Footer from "../components/Footer";
import LottiePlayer from "../components/LottiePlayer";
import animationData from "../assets/designer.json"; // Lottie JSON file for the designer animation
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import styles from "../styles/designer.module.css";

export default function Designer() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          {/* Left Column: Lottie Animation */}
          <div className={styles.leftColumn}>
            <LottiePlayer animationPath={animationData} />
          </div>
          {/* Right Column: Designer Information */}
          <div className={styles.rightColumn}>
            <h1 className={styles.title}>Our Experienced Designers</h1>
            <ul className={styles.list}>
              <li>Expert in SolidWorks, Catia, and NX for robust functional designs.</li>
              <li>Skilled in Blender and Creo for organic and innovative designs.</li>
              <li>Proficient in Fusion 360 for versatile product development.</li>
              <li>Strong portfolio in industrial, consumer, and artistic design projects.</li>
              <li>Years of experience in 3D modeling, rapid prototyping, and design optimization.</li>
            </ul>
            <div className={styles.cta}>
              <a
                href="https://wa.me/918921378281"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                <FaWhatsapp className={styles.ctaButtonIcon} /> WhatsApp
              </a>
              <a
                href="mailto:yaswanthkumar7b@gmail.com"
                className={styles.ctaButton}
              >
                <FaEnvelope className={styles.ctaButtonIcon} /> Email
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
