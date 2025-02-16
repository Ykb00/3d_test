// SingleImageCarousel.jsx
'use client';

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../styles/Carousel.module.css";

export default function SingleImageCarousel({ className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // If your images are in the public folder, use their absolute paths:
  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
  ];

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`${styles.carouselContainer} ${className}`}>
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselSlide}>
          <div className={styles.carouselImageWrapper}>
            <img 
              src={images[currentIndex]} 
              alt={`Print sample ${currentIndex + 1}`} 
              className={styles.carouselImage}
            />
          </div>
        </div>
      </div>
      
      <button onClick={prev} className={`${styles.navButton} ${styles.prevButton}`}>
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button onClick={next} className={`${styles.navButton} ${styles.nextButton}`}>
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
