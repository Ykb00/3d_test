import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const { data, error } = await supabase.storage.from('uploads').upload(`stl/${file.name}`, file);
    if (error) console.error(error);
    else console.log('Uploaded:', data);
  };

  return (
    <div>
      <h1>STL File Upload</h1>
      <input type="file" accept=".stl" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {preview && (
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <STLObject url={preview} />
          <OrbitControls />
        </Canvas>
      )}
    </div>
  );
}

function STLObject({ url }) {
  const loader = new STLLoader();
  const [geometry, setGeometry] = useState(null);

  useState(() => {
    loader.load(url, (geo) => {
      const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
      setGeometry(new THREE.Mesh(geo, material));
    });
  }, [url]);

  return geometry ? <primitive object={geometry} /> : null;
}
