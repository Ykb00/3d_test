import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import Three.js component with no SSR
const ThreeScene = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-[500px] h-[500px] bg-red-500 rounded-lg flex items-center justify-center">
      Loading 3D viewer...
    </div>
  ),
});

export default function STLViewer() {
  const [stlUrl, setStlUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.stl')) {
      setError('Please upload an STL file');
      return;
    }

    const url = URL.createObjectURL(file);
    setStlUrl(url);
    setError('');
  };

  return (
    <div className="w-[200px] h-40 ">
      <div className="mb-4">
        <input
          type="file"
          accept=".stl"
          onChange={handleFileUpload}
          className="block w-[40rem] text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>

      {stlUrl && <ThreeScene stlUrl={stlUrl} />}
    </div>
  );
}