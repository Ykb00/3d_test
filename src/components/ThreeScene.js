// ThreeScene.js
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Float, Edges } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Suspense } from "react";

function Model({ url }) {
  const geometry = useLoader(STLLoader, url);
  
  return (
    <Center scale={1.5}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh geometry={geometry}>
          <meshPhongMaterial color="#4a9eff" shininess={100} specular="#ffffff" />
          <Edges threshold={15} color="black" />
        </mesh>
      </Float>
    </Center>
  );
}

export default function ThreeScene({ stlUrl, viewerSize = 500 }) {
  return (
    <div
      style={{
        width: `${viewerSize}px`,
        height: `${viewerSize}px`,
        backgroundColor: "#f3f4f6",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas camera={{ position: [15, 25, 15], fov: 60 }} shadows>
        <color attach="background" args={["#f3f4f6"]} />
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
          <OrbitControls enableZoom enablePan enableRotate makeDefault />
        </Suspense>
      </Canvas>
    </div>
  );
}
