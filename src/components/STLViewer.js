// STLViewer.js
import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Dropzone from "react-dropzone";
import Lottie from "lottie-react";
import pricingData from "./pricing";
import printerAnimation from "../assets/3dpint.json";
import loadingAnimation from "../assets/loading.json";
import uploadingAnimation from "../assets/upload.json";
import styles from "../styles/Stlviewer.module.css";
import Carousel from "./carousel";
import Footer from "./Footer";

// Dynamically import the Three.js component with no SSR
const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className={styles.printerContainer}>
      <Lottie animationData={loadingAnimation} style={{ width: 500, height: 500 }} />
    </div>
  ),
});

// PricingOptions Component
function PricingOptions({ weight }) {
  const router = useRouter();
  const [selectedInfill, setSelectedInfill] = useState("20"); // Infill percentage
  const [selectedMaterial, setSelectedMaterial] = useState("PLA");
  const [selectedColor, setSelectedColor] = useState("");

  // Define color options based on material
  const colorOptions = {
    PLA: ["White", "Black"],
    "Coloured PLA": ["Green-Violet", "Reddish-Gold"],
    ABS: ["Gray", "Black"],
  };

  // Initialize selectedColor if not set or when material changes
  if (!selectedColor || !colorOptions[selectedMaterial].includes(selectedColor)) {
    setSelectedColor(colorOptions[selectedMaterial][0]);
  }

  // Handler for material change: update both material and default color
  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    setSelectedColor(colorOptions[material][0]);
  };

  // Get material price from pricing.js
  const materialPrice = pricingData[selectedMaterial];

  // Calculate the price based on weight (in grams) and material rate.
  const calculatedPrice = weight * materialPrice;
  // Final price is the maximum of Rs 30 or the calculated price.
  const finalPrice = Math.max(30, calculatedPrice);
  // Advance payment is the maximum of Rs 15 or 40% of the final price.
  const advancePayment = Math.max(15, finalPrice * 0.4);

  // Material options for buttons
  const materialOptions = Object.keys(pricingData);

  // Handler for payment button: store pricing details as JSON and send to payment page
  const handlePayment = () => {
    const pricingDetails = {
      selectedMaterial,
      selectedInfill,
      selectedColor,
      weight,
      finalPrice,
      advancePayment,
    };
    router.push({
      pathname: "/payment",
      query: { data: JSON.stringify(pricingDetails) },
    });
  };

  return (
    <div className={styles.pricingContainer}>
      <h3 className="text-xl font-bold mb-4">Pricing Options</h3>
      
      {/* Material Selection */}
      <div className="mb-4 space-y-2">
        <p className="mb-2 font-medium">Select Material:</p>
        <div className="flex gap-2">
          {materialOptions.map((material) => (
            <button
              key={material}
              onClick={() => handleMaterialChange(material)}
              className={`${styles.materialButton} ${
                selectedMaterial === material ? styles.activeMaterial : styles.inactiveMaterial
              }`}
            >
              {material}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="mb-4 space-y-2">
        <p className="mb-2 font-medium">Select Color:</p>
        <div className="flex gap-2">
          {colorOptions[selectedMaterial].map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(color)}
              className={`${styles.colorButton} ${
                selectedColor === color ? styles.activeColor : styles.inactiveColor
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Infill Selection */}
      <div className="mb-4 space-y-2">
        <p className="mb-2 font-medium">Select Infill Percentage:</p>
        <div className="flex gap-2">
          {["20", "50", "100"].map((infill) => (
            <button
              key={infill}
              onClick={() => setSelectedInfill(infill)}
              className={`${styles.infillButton} ${
                selectedInfill === infill ? styles.activeInfill : styles.inactiveInfill
              }`}
            >
              {infill}%
            </button>
          ))}
        </div>
      </div>

      {/* Price Display */}
      <div className="mb-4">
        <p className="text-lg font-semibold">Estimated Price: ₹{finalPrice.toFixed(2)}</p>
      </div>

      {/* Payment Button */}
      <button onClick={handlePayment} className={styles.payAdvanceButton}>
        Pay Advance: ₹{advancePayment.toFixed(2)}
      </button>
    </div>
  );
}

// Main STLViewer Component
export default function STLViewer() {
  const [stlUrl, setStlUrl] = useState("");
  const [loading, setLoading] = useState(false);
  // Store estimated weight (in grams) for pricing calculations.
  const [fileData, setFileData] = useState(null);

  const handleFileUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".stl")) {
      alert("Please upload an STL file.");
      return;
    }

    setLoading(true);
    // Simulate file upload delay
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setStlUrl(url);
      setLoading(false);
      calculateWeight(file);
    }, 2000);
  };

  // Simulated weight calculation (in grams) based on file size.
  const calculateWeight = (file) => {
    const fileSizeMB = file.size / (1024 * 1024);
    const estimatedWeight = fileSizeMB * 10;
    setFileData({ weight: estimatedWeight });
  };

  // Let the carousel take any number of images from the images folder.
  // (Make sure you update the array below with the correct paths.)
  const carouselImages = [
    "image1.jpg",
    "./images/image2.jpg",
    "./images/image3.jpg",
    "./images/image4.jpg",
    // You can add more image paths here.
  ];

  return (
    <div className={styles.mainContainer}>
      { !stlUrl ? (
        // No file uploaded: show the Dropzone and the printer lottie (or uploading lottie if in progress)
        <div className={styles.uploadContainer}>
          {/* <h2 className="text-xl font-bold mb-4">Select Your Design</h2> */}
          <div className="flex flex-row gap-4 w-full justify-center ">
            <div className="flex">
              <Dropzone onDrop={handleFileUpload} accept={{ "model/stl": [".stl"] }}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className={styles.fileInput}>
                    <input {...getInputProps()} />
                    <p className="mt-2 text-center">
                      Drag &amp; drop an STL file here, or click to select one.
                    </p>
                  </div>
                )}
              </Dropzone>
            </div>
            <div className={styles.printerContainer}>
              {loading ? (
                <Lottie animationData={uploadingAnimation} style={{ width: 500, height: 500 }} />
              ) : (
                <Lottie animationData={printerAnimation} style={{ width: 500, height: 500 }} />
              )}
            </div>
          </div>
        </div>
      ) : (
        // File is uploaded: show a two-column layout where the left side displays the STL viewer
        // and the right side displays the print settings.
        <div className={styles.resultContainer}>
          <div className={styles.viewerWrapper}>
            <ThreeScene stlUrl={stlUrl} viewerSize={500} />
          </div>
          <div className={styles.pricingWrapper}>
            <PricingOptions weight={fileData.weight} />
          </div>
        </div>
      )}

      {/* Carousel Component (accepting any number of images) */}
      <Carousel images={carouselImages} />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
