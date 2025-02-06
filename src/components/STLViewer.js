import { useState } from "react";
import dynamic from "next/dynamic";
import Dropzone from "react-dropzone";
import Lottie from "lottie-react";
import styles from "../styles/STLViewer.module.css"; // Import the styles
import uploadAnimation from "../assets/3dpint.json";
import loadingAnimation from "../assets/loading.json";
import uploadingAnimation from "../assets/upload.json";

// Dynamically import Three.js component with no SSR
const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className={styles.viewerContainer}>
      <Lottie animationData={loadingAnimation} style={{ width: 160, height: 160 }} />
    </div>
  ),
});

export default function STLViewer() {
  const [stlUrl, setStlUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState(null);

  const handleFileUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".stl")) {
      alert("Please upload an STL file.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setStlUrl(url);
      setLoading(false);
      calculateWeight(file);
    }, 2000); // Simulated loading
  };

  const calculateWeight = (file) => {
    const fileSizeMB = file.size / (1024 * 1024);
    const estimatedWeight = fileSizeMB * 10; // Approximate grams
    const estimatedCost = estimatedWeight * 5; // ₹5 per gram

    setFileData({
      weight: estimatedWeight.toFixed(2),
      cost: estimatedCost.toFixed(2),
    });
  };

  return (
    <div className={styles.stlViewerContainer}>
      {/* Dropzone on the Left */}
      <div className={styles.dragDropContainer}>
        <h2>Select Your 3D Model</h2>

        <Dropzone onDrop={handleFileUpload} accept={{ "model/stl": [".stl"] }}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className={styles.fileInput}>
              <input {...getInputProps()} />
              <Lottie animationData={uploadingAnimation} style={{ width: 160, height: 160 }} />
              <p>Drag & drop an STL file here, or click to select one.</p>
            </div>
          )}
        </Dropzone>

        {loading && (
          <div className={styles.lottieContainer}>
            <Lottie animationData={loadingAnimation} style={{ width: 80, height: 80 }} />
            <p>Uploading...</p>
          </div>
        )}
      </div>

      {/* 3D Viewer & Lottie on the Right */}
      <div className={styles.lottieContainer}>
        {stlUrl ? (
          <>
            <div className={styles.viewerContainer}>
              <ThreeScene stlUrl={stlUrl} />
            </div>
            {fileData && (
              <div>
                <p>Weight: {fileData.weight}g</p>
                <p>Estimated Cost: ₹{fileData.cost}</p>
              </div>
            )}
          </>
        ) : (
          <Lottie animationData={uploadAnimation} style={{ width: 256, height: 256 }} />
        )}
      </div>
    </div>
  );
}
