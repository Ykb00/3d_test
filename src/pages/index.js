import styles from "../styles/index.module.css";  
import Header from "../components/Header";
import STLViewer from "../components/STLViewer";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className={styles.body}>
      <Header />
      <main className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.header}>Upload Your Design</h1>
          <STLViewer />
        </div>
      </main>
      <Footer className={styles.footer} />
    </div>
  );
}
