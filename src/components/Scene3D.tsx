import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus, Box, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometry({ position, geometry }: { position: [number, number, number], geometry: 'sphere' | 'torus' | 'box' }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'sphere':
        return (
          <Sphere ref={meshRef} args={[1, 32, 32]}>
            <meshStandardMaterial 
              color="hsl(221, 83%, 53%)" 
              wireframe 
              transparent 
              opacity={0.25}
              emissive="hsl(221, 83%, 53%)"
              emissiveIntensity={0.2}
            />
          </Sphere>
        );
      case 'torus':
        return (
          <Torus ref={meshRef} args={[1.2, 0.4, 16, 100]}>
            <meshStandardMaterial 
              color="hsl(221, 83%, 53%)" 
              wireframe 
              transparent 
              opacity={0.2}
              emissive="hsl(221, 83%, 53%)"
              emissiveIntensity={0.15}
            />
          </Torus>
        );
      case 'box':
        return (
          <Box ref={meshRef} args={[1.5, 1.5, 1.5]}>
            <meshStandardMaterial 
              color="hsl(221, 83%, 53%)" 
              wireframe 
              transparent 
              opacity={0.18}
              emissive="hsl(221, 83%, 53%)"
              emissiveIntensity={0.1}
            />
          </Box>
        );
    }
  };

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
      position={position}
    >
      {renderGeometry()}
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color="hsl(221, 83%, 53%)" />
      
      <FloatingGeometry position={[-4, 2, -3]} geometry="sphere" />
      <FloatingGeometry position={[4, -1, -2]} geometry="torus" />
      <FloatingGeometry position={[0, 3, -4]} geometry="box" />
      <FloatingGeometry position={[-3, -2, -3]} geometry="torus" />
      <FloatingGeometry position={[3, 1, -5]} geometry="sphere" />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

const Scene3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        performance={{ min: 0.5 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Scene3D;
