// Carousel.js
import { useState, useEffect } from "react";
import styles from "../styles/STLViewer.module.css";

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;
  const totalImages = images.length;

  // Automatically advance the carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex < totalImages - itemsToShow) {
          return prevIndex + 1;
        } else {
          return 0;
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [totalImages, itemsToShow]);

  const next = () => {
    if (currentIndex < totalImages - itemsToShow) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(totalImages - itemsToShow);
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <button onClick={prev} className={`${styles.carouselBtn} ${styles.prev}`}>
        Prev
      </button>
      <div className={styles.carouselItems}>
        {images.slice(currentIndex, currentIndex + itemsToShow).map((img, index) => (
          <img key={index} src={img} alt={`Carousel ${index}`} className={styles.carouselImage} />
        ))}
      </div>
      <button onClick={next} className={`${styles.carouselBtn} ${styles.next}`}>
        Next
      </button>
    </div>
  );
}
