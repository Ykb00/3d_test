import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pdcbzxohtjosfeibqjmz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2J6eG9odGpvc2ZlaWJxam16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1ODI2NjQsImV4cCI6MjA1NDE1ODY2NH0.zPoNcVre2qyGTcF4rxYXAbNraQq9AhxYv2nGiVkyOfM"
);


const STLDropdown = ({ onSelect }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const { data, error } = await supabase.from("stl_files").select("*");
    if (error) {
      console.error("Error fetching files:", error);
    } else {
      setFiles(data);
    }
  };

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select an STL file</option>
      {files.map((file) => (
        <option key={file.id} value={file.url}>
          {file.name}
        </option>
      ))}
    </select>
  );
};

export default STLDropdown;
