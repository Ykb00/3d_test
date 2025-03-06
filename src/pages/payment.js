// pages/payment.js
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
// import Lottie from "lottie-react";
import styles from "../styles/Payment.module.css";

// Instantiate Supabase client directly in this file.
const supabaseUrl = "https://pdcbzxohtjosfeibqjmz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2J6eG9odGpvc2ZlaWJxam16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1ODI2NjQsImV4cCI6MjA1NDE1ODY2NH0.zPoNcVre2qyGTcF4rxYXAbNraQq9AhxYv2nGiVkyOfM";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Payment() {
  const router = useRouter();
  // Expect cost, advance, and stl (STL URL or identifier) to be passed in query parameters.
  const { cost, advance, stl } = router.query;

  // Merchant details – adjust these as needed.
  const merchantUpi = "amrakash2102@oksbi";
  const merchantName = "Thirumani Akash";
  const currency = "INR";

  const [mobile, setMobile] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  // State for STL file if user needs to re-upload it for confirmation.
  const [stlFile, setStlFile] = useState(null);
  // State to show error message if file not uploaded.
  const [fileError, setFileError] = useState("");
  // State to indicate file is being uploaded.
  const [uploading, setUploading] = useState(false);

  // Function to copy the UPI id to clipboard.
  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(merchantUpi);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  // Build the UPI deep link with the pre-filled advance amount.
  const upiLink = `upi://pay?pa=${merchantUpi}&pn=${encodeURIComponent(
    merchantName
  )}&am=${advance}&cu=${currency}&tn=Payment for 3D Printing`;

  // Function to upload the STL file to Supabase Storage.
  const uploadSTLFile = async (file) => {
    const filePath = `stl-files/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("stl-files")
      .upload(filePath, file);
    if (uploadError) {
      throw new Error("Error uploading file: " + uploadError.message);
    }
    // Retrieve the public URL for the uploaded file.
    const { publicURL, error: urlError } = supabase.storage
      .from("stl-files")
      .getPublicUrl(filePath);
    if (urlError) {
      throw new Error("Error getting public URL: " + urlError.message);
    }
    return publicURL;
  };

  // Function to insert payment details into Supabase.
  const handleOk = async () => {
    // Validate mobile number.
    if (!mobile.trim()) {
      alert("Please enter your mobile number for contact during delivery.");
      return;
    }
    if (mobile.length < 8) {
      alert("Please enter a valid mobile number (minimum 8 digits).");
      return;
    }
    // Check if the STL file is available.
    if (!stl && !stlFile) {
      alert("Please upload your STL file for confirmation.");
      setFileError("Please upload your STL file for confirmation.");
      return;
    } else {
      setFileError("");
    }

    try {
      // If an STL file is re-uploaded here, upload it now.
      let stlURL = stl || "";
      if (!stlURL && stlFile) {
        setUploading(true);
        stlURL = await uploadSTLFile(stlFile);
        setUploading(false);
      }
      
      // Insert payment details into the 'payments' table.
      const { error } = await supabase.from("payments").insert([
        {
          stl_url: stlURL,
          total_cost: cost,
          advance_payment: advance,
          mobile: mobile,
        },
      ]);
      if (error) {
        alert("Error saving payment details: " + error.message);
      } else {
        alert(`Your file has been received and we will contact you at ${mobile} for delivery.`);
        router.push("/"); // Optionally redirect to home page
      }
    } catch (err) {
      setUploading(false);
      alert(err.message);
    }
  };

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <Link href="/" className={styles.backButton}>
        Back
      </Link>

      <div className={styles.card}>
        <h1 className={styles.header}>Confirm Your Payment</h1>
        <div className={styles.columns}>
          {/* Left Column: UPI App Buttons */}
          <div className={styles.leftColumn}>
            <p className={styles.columnTitle}>Pay via UPI App</p>
            <div className={styles.upiButtons}>
              {/* Google Pay */}
              <a href={upiLink} className={styles.upiButton}>
                <img
                  src="/images/googlepay.png"
                  alt="Google Pay"
                  className={styles.upiIcon}
                />
                <span>Google Pay</span>
              </a>
              {/* PhonePe */}
              <a href={upiLink} className={styles.upiButton}>
                <img
                  src="/images/phonepay.png"
                  alt="PhonePe"
                  className={styles.upiIcon}
                />
                <span>PhonePe</span>
              </a>
              {/* Paytm */}
              <a href={upiLink} className={styles.upiButton}>
                <img
                  src="/images/paytm.png"
                  alt="Paytm"
                  className={styles.upiIcon}
                />
                <span>Paytm</span>
              </a>
            </div>
          </div>

          {/* Right Column: QR Code, UPI ID, Mobile Input, and STL File Re-upload */}
          <div className={styles.rightColumn}>
            <p className={styles.columnTitle}>Scan QR Code</p>
            <img
              src="/images/QR_code.jpg"
              alt="UPI QR Code"
              className={styles.qrImage}
            />
            <div className={styles.upiInfo}>
              <span>UPI ID: {merchantUpi}</span>
              <button onClick={copyUpiId} className={styles.copyButton}>
                Copy
              </button>
            </div>
            {copySuccess && (
              <p className="text-green-500 mt-1 text-sm">{copySuccess}</p>
            )}
            <div className={styles.inputContainer}>
              <label htmlFor="mobile" className={styles.label}>
                <b>Enter your mobile number for contact during delivery</b>
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="e.g. 9876543210"
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="stlFile" className={styles.label}>
                Upload your STL file for confirmation
              </label>
              <input
                type="file"
                id="stlFile"
                name="stlFile"
                accept=".stl"
                onChange={(e) => setStlFile(e.target.files[0])}
                className={styles.fileInput}
              />
              {fileError && <p className={styles.fileError}>{fileError}</p>}
            </div>
            {uploading && (
              // <Lottie
              //   animationData={uploadingAnimation}
              //   className={styles.uploadingAnimation}
              // />
            )}
            <button onClick={handleOk} className={styles.okButton}>
              OK
            </button>
          </div>
        </div>
        <div className={styles.footerText}>
          <p>Total Cost: ₹{cost}</p>
          <p>Advance Required: ₹{advance}</p>
          <p className={styles.footerNote}>
            Please complete the payment using your UPI app or by scanning the QR code.
          </p>
        </div>
      </div>
    </div>
  );
}
