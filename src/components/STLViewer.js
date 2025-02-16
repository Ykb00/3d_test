"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Dropzone from "react-dropzone";
import Lottie from "lottie-react";
import { Upload } from "lucide-react";
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import pricingData from "./pricing";
import printerAnimation from "../assets/3dpint.json";
import loadingAnimation from "../assets/loading.json";
import uploadingAnimation from "../assets/upload.json";
import ImageCarousel from "./carousel";
import styles from "../styles/Stlviewer.module.css";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Dynamically import ThreeScene
const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className={styles.threeDPreview}>
      <Lottie
        animationData={loadingAnimation}
        className={styles.loadingAnimation}
      />
    </div>
  ),
});

/** Helper function: Calculate the signed volume of a triangle */
function signedVolumeOfTriangle(p1, p2, p3) {
  const cross = new THREE.Vector3();
  cross.crossVectors(p2, p3);
  return p1.dot(cross) / 6.0;
}

/** Compute volume (in mm³) from geometry */
function getVolume(geometry) {
  const pos = geometry.attributes.position;
  const faces = pos.count / 3;
  let volume = 0;
  const p1 = new THREE.Vector3(), 
        p2 = new THREE.Vector3(), 
        p3 = new THREE.Vector3();
  
  for (let i = 0; i < faces; i++) {
    p1.fromBufferAttribute(pos, i * 3 + 0);
    p2.fromBufferAttribute(pos, i * 3 + 1);
    p3.fromBufferAttribute(pos, i * 3 + 2);
    volume += signedVolumeOfTriangle(p1, p2, p3);
  }
  return Math.abs(volume);
}

/** Compute dimensions from geometry */
function computeDimensions(geometry) {
  const pos = geometry.attributes.position;
  const bbox = {
    x: { min: Infinity, max: -Infinity },
    y: { min: Infinity, max: -Infinity },
    z: { min: Infinity, max: -Infinity }
  };
  
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    if (x < bbox.x.min) bbox.x.min = x;
    if (x > bbox.x.max) bbox.x.max = x;
    if (y < bbox.y.min) bbox.y.min = y;
    if (y > bbox.y.max) bbox.y.max = y;
    if (z < bbox.z.min) bbox.z.min = z;
    if (z > bbox.z.max) bbox.z.max = z;
  }
  
  return {
    x: bbox.x.max - bbox.x.min,
    y: bbox.y.max - bbox.y.min,
    z: bbox.z.max - bbox.z.min,
  };
}

function PricingOptions({ volume, stl, dimensions }) {
  const router = useRouter();
  const [selectedInfill, setSelectedInfill] = useState("20");
  const [selectedMaterial, setSelectedMaterial] = useState("PLA");
  const [selectedColor, setSelectedColor] = useState("White");
  const [modelId] = useState(uuidv4());

  const colorOptions = {
    PLA: ["White", "Black"],
    DualColorPLA: ["Green-Violet", "Reddish-Gold"],
    ABS: ["Gray", "Black"],
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    setSelectedColor(colorOptions[material][0]);
  };

  const calculatePrice = (volume_mm3, infillPercentage) => {
    const volume_cm3 = volume_mm3 / 1000;
    
    let baseD, densityFactor;
    
    if (volume_cm3 < 15) {
      // Small models like Bitcoin
      baseD = 0.498;
      densityFactor = 0.00622;
    } else if (volume_cm3 < 70) {
      // Medium models like Scrapper
      baseD = 0.266;
      densityFactor = 0.00332;
    } else {
      // Large models like Benchy
      baseD = 0.190;
      densityFactor = 0.00126;
    }

    const weight = volume_cm3 * (baseD + (infillPercentage - 20) * densityFactor);
    const materialMultiplier = 
      selectedMaterial === 'PLA' ? 1 : 
      selectedMaterial === 'DualColorPLA' ? 1.6 : 
      1.4;
    
    return Math.max(30, weight * 5 * materialMultiplier);
  };

  const finalPrice = calculatePrice(volume, parseInt(selectedInfill));
  const advancePayment = Math.max(15, finalPrice * 0.4);

  const handlePayment = async () => {
    try {
      if (stl instanceof File) {
        const { data, error } = await supabase.storage
          .from('stl-files')
          .upload(`${modelId}/${stl.name}`, stl, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) throw error;
        console.log('Successfully uploaded file to Supabase:', data);
      }

      router.push({
        pathname: "/payment",
        query: {
          stl: stl instanceof File ? stl.name : 'model',
          modelId: modelId,
          cost: finalPrice.toFixed(2),
          advance: advancePayment.toFixed(2),
          dims: JSON.stringify(dimensions),
          material: selectedMaterial,
          infill: selectedInfill,
          color: selectedColor
        },
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  return (
    <div className={styles.pricingPanel}>
      <h3 className={styles.pricingTitle}>Print Settings</h3>
      <div className={styles.optionsContainer}>
        <div className={styles.optionGroup}>
          <label className={styles.optionLabel}>Material</label>
          <div className={`${styles.buttonGrid} ${styles.twoColumns}`}>
            {Object.keys(colorOptions).map((material) => (
              <button
                key={material}
                onClick={() => handleMaterialChange(material)}
                className={`${styles.optionButton} ${
                  selectedMaterial === material ? styles.selected : styles.unselected
                }`}
              >
                {material}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.optionGroup}>
          <label className={styles.optionLabel}>Color</label>
          <div className={`${styles.buttonGrid} ${styles.twoColumns}`}>
            {colorOptions[selectedMaterial].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`${styles.optionButton} ${
                  selectedColor === color ? styles.selected : styles.unselected
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.optionGroup}>
          <label className={styles.optionLabel}>Infill</label>
          <div className={`${styles.buttonGrid} ${styles.threeColumns}`}>
            {["20", "50", "100"].map((infill) => (
              <button
                key={infill}
                onClick={() => setSelectedInfill(infill)}
                className={`${styles.optionButton} ${
                  selectedInfill === infill ? styles.selected : styles.unselected
                }`}
              >
                {infill}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.dimensions}>
        <h4>Model Dimensions (mm):</h4>
        <p>
          X: {dimensions?.x?.toFixed(2) || "N/A"}, 
          Y: {dimensions?.y?.toFixed(2) || "N/A"}, 
          Z: {dimensions?.z?.toFixed(2) || "N/A"}
        </p>
      </div>

      <div className={styles.pricingFooter}>
        <p className={styles.totalPrice}>Total: ₹{finalPrice.toFixed(2)}</p>
        <button onClick={handlePayment} className={styles.paymentButton}>
          Pay Advance: ₹{advancePayment.toFixed(2)}
        </button>
      </div>
    </div>
  );
}

export default function STLViewer() {
  const [stlUrl, setStlUrl] = useState("");
  const [stlFile, setStlFile] = useState(null);
  const [volume, setVolume] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    if (!file.name.toLowerCase().endsWith(".stl")) {
      alert("Please upload an STL file");
      return;
    }
    
    setLoading(true);
    setStlFile(file);
    
    const reader = new FileReader();
    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const loader = new STLLoader();
      try {
        const geometry = loader.parse(arrayBuffer);
        const vol = getVolume(geometry);
        setVolume(vol);
        const dims = computeDimensions(geometry);
        setDimensions(dims);
      } catch (err) {
        alert("Error parsing STL file: " + err.message);
      }
      setLoading(false);
    };
    reader.readAsArrayBuffer(file);
    
    const url = URL.createObjectURL(file);
    setStlUrl(url);
  };

  const carouselMarginClass =
    stlUrl || loading ? styles.carouselActive : styles.carouselDefault;

  return (
    <div className={styles.container}>
      <div className={styles.dropzoneContainer}>
        <Dropzone onDrop={handleFileUpload} accept={{ "model/stl": [".stl"] }}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className={styles.dropzoneArea}>
              <input {...getInputProps()} />
              <div className={styles.dropzoneContent}>
                {loading ? (
                  <Lottie
                    animationData={uploadingAnimation}
                    className={styles.uploadingAnimation}
                  />
                ) : (
                  <>
                    <Upload className={styles.uploadIcon} />
                    <p className={styles.dropzoneText}>
                      Drag and drop your STL file here, or click to select.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </Dropzone>
      </div>

      {!stlUrl && !loading && (
        <div className={styles.animationContainer}>
          <Lottie
            animationData={printerAnimation}
            className={styles.printerAnimation}
          />
        </div>
      )}

      {stlUrl && volume && (
        <div className={styles.viewerLayout}>
          <ThreeScene stlUrl={stlUrl} />
          <PricingOptions volume={volume} stl={stlFile} dimensions={dimensions} />
        </div>
      )}

      <ImageCarousel className={carouselMarginClass} />
    </div>
  );
}