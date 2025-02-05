import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pdcbzxohtjosfeibqjmz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2J6eG9odGpvc2ZlaWJxam16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1ODI2NjQsImV4cCI6MjA1NDE1ODY2NH0.zPoNcVre2qyGTcF4rxYXAbNraQq9AhxYv2nGiVkyOfM"
);


const STLUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an STL file.");

    setUploading(true);

    const filePath = `stl/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("stl-uploads")
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file.");
      setUploading(false);
      return;
    }

    // Get the public URL
    const { data: publicURL } = supabase.storage
      .from("stl-uploads")
      .getPublicUrl(filePath);

    // Save file info in the database
    const { error: insertError } = await supabase
      .from("stl_files")
      .insert([{ name: file.name, url: publicURL.publicUrl }]);

    if (insertError) {
      console.error("Database error:", insertError);
      alert("Failed to save file info.");
    } else {
      alert("Upload successful!");
    }

    setUploading(false);
  };

  return (
    <div>
      <input type="file" accept=".stl" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload STL"}
      </button>
    </div>
  );
};

export default STLUploader;
