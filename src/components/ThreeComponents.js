'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Suspense } from 'react';

const Model = ({ url }) => {
  const geometry = useLoader(STLLoader, url);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#666666" />
    </mesh>
  );
};

const ThreeComponents = ({ stlUrl }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6}>
          <Model url={stlUrl} />
        </Stage>
        <OrbitControls 
          autoRotate={false}
          enableZoom={true}
          enablePan={true}
        />
      </Suspense>
    </Canvas>
  );
};

export default ThreeComponents;