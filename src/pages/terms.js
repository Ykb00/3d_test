import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/terms.module.css";

export default function Terms() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Terms & Conditions</h1>
        <p className={styles.subtitle}>Effective Date: 01-02-2025</p>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Introduction</h2>
          <p className={styles.text}>
            Welcome to Quaticks, your trusted partner for 3D print on demand services.
            By accessing or using our website and services, you agree to be bound by these Terms & Conditions.
            Please read them carefully.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Service Description</h2>
          <p className={styles.text}>
            Quaticks offers a platform for customers to upload 3D design files, customize them,
            and order high-quality 3D printed products on demand. All services provided are subject to availability
            and confirmation.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>User Obligations</h2>
          <p className={styles.text}>
            As a user, you agree to provide accurate information, ensure that your design files do not infringe on
            any intellectual property rights, and use our services only for lawful purposes. Any misuse of our
            platform may result in termination of your account.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Payment Terms</h2>
          <p className={styles.text}>
            All orders must be confirmed with payment. The prices displayed on our website are subject to change
            without notice. Payment details, including any advance or full payment requirements, will be provided
            during the order process.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
          <p className={styles.text}>
            Quaticks shall not be liable for any indirect, incidental, or consequential damages arising from
            the use or inability to use our services. Our total liability shall be limited to the amount paid by
            you for the service in question.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Changes to Terms</h2>
          <p className={styles.text}>
            We reserve the right to modify these Terms & Conditions at any time. Any changes will be posted on
            this page with an updated effective date. Your continued use of our services after such changes
            constitutes acceptance of the new terms.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <p className={styles.text}>
            If you have any questions about these Terms & Conditions, please contact us at{" "}
            <a href="mailto:yaswanthkumar7b@gmail.com" className={styles.link}>
              terms@quaticks.com
            </a>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
