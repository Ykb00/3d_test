import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/privacy.module.css";

export default function Privacy() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.subtitle}>Effective Date: 01-02-2025</p>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Introduction</h2>
          <p className={styles.text}>
            At Quaticks, your privacy is our priority. This Privacy Policy outlines how we collect, use, and safeguard your personal data when you visit our website and use our 3D print on demand services.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Information We Collect</h2>
          <p className={styles.text}>
            We may collect information that you voluntarily provide when you register, place an order, or contact us. This information may include your name, email address, phone number, and any other details necessary to provide and improve our services.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
          <p className={styles.text}>
            Your data is used to process your orders, communicate with you, and improve our offerings. With your consent, we may also use your information for promotional and marketing purposes.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Data Security</h2>
          <p className={styles.text}>
            We implement appropriate technical and organizational measures to protect your personal data from unauthorized access or disclosure. However, no method of transmission over the Internet is completely secure.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Rights</h2>
          <p className={styles.text}>
            You have the right to access, correct, or delete your personal data. If you have any questions or concerns about your data, please contact us.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
          <p className={styles.text}>
            We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <p className={styles.text}>
            If you have any questions or concerns about this Privacy Policy, please email us at{" "}
            <a href="mailto:yaswanthkumar7b@gmail.com" className={styles.link}>
              privacy@quaticks.com
            </a>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
