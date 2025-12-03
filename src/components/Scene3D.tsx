import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, Torus, Box, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useDevicePerformance } from "@/hooks/use-device-performance";

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

// Dispose resources on unmount
function ResourceManager() {
  const { gl, scene } = useThree();
  
  useEffect(() => {
    return () => {
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((m) => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      gl.dispose();
    };
  }, [gl, scene]);
  
  return null;
}

function Scene({ isMobile }: { isMobile: boolean }) {
  // Reduce geometries on mobile
  const geometries = useMemo(() => {
    if (isMobile) {
      return [
        { position: [-3, 1, -3] as [number, number, number], geometry: "sphere" as const },
        { position: [3, -1, -2] as [number, number, number], geometry: "torus" as const },
        { position: [0, 2, -4] as [number, number, number], geometry: "box" as const },
      ];
    }
    return [
      { position: [-4, 2, -3] as [number, number, number], geometry: "sphere" as const },
      { position: [4, -1, -2] as [number, number, number], geometry: "torus" as const },
      { position: [0, 3, -4] as [number, number, number], geometry: "box" as const },
      { position: [-3, -2, -3] as [number, number, number], geometry: "torus" as const },
      { position: [3, 1, -5] as [number, number, number], geometry: "sphere" as const },
    ];
  }, [isMobile]);

  return (
    <>
      <ResourceManager />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      {!isMobile && (
        <pointLight position={[-10, -10, -5]} intensity={0.6} color="hsl(221, 83%, 53%)" />
      )}
      
      {geometries.map((geo, i) => (
        <FloatingGeometry key={i} position={geo.position} geometry={geo.geometry} />
      ))}
      
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
  const { isMobile, isLowEnd, reducedMotion, maxDpr } = useDevicePerformance();

  // Don't render on very low-end devices
  if (isLowEnd || reducedMotion) {
    return (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent" />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, maxDpr]}
        style={{ background: 'transparent' }}
        performance={{ min: isMobile ? 0.3 : 0.5 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
          stencil: false,
        }}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
