import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Center, Float } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Suspense } from 'react';

function Model({ url }) {
  const geometry = useLoader(STLLoader, url);
  
  return (
    <Center scale={1.5}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh geometry={geometry}>
          <meshPhongMaterial 
            color="#4a9eff"
            shininess={100}
            specular="#ffffff"
          />
        </mesh>
      </Float>
    </Center>
  );
}

export default function ThreeScene({ stlUrl }) {
  return (
    <div className="w-[600px] h-[800px] bg-gray-100 rounded-lg">
      <Canvas
        camera={{ position: [15, 25, 15], fov: 60 }}
        shadows
      >
        <color attach="background" args={['#f3f4f6']} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[20, 20, 20]} 
            angle={0.15} 
            penumbra={1} 
            intensity={0.5}
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          
          <Model url={stlUrl} />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            makeDefault
          />
          <gridHelper args={[30, 30]} position={[0, -5, 0]} />
          <axesHelper args={[5]} />
        </Suspense>
      </Canvas>
    </div>
  );
}