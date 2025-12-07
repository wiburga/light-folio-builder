import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useDevicePerformance } from "@/hooks/use-device-performance";
import { use3DGraphics } from "@/contexts/Graphics3DContext";
import { motion, AnimatePresence } from "framer-motion";
import ParticleField from "./3d/ParticleField";
import ShootingStars from "./3d/ShootingStars";
// LOD configuration: distance thresholds and segment counts
const LOD_CONFIG = {
  sphere: {
    high: { segments: 32, distance: 0 },
    medium: { segments: 16, distance: 5 },
    low: { segments: 8, distance: 10 },
  },
  torus: {
    high: { radialSegments: 16, tubularSegments: 64, distance: 0 },
    medium: { radialSegments: 8, tubularSegments: 32, distance: 5 },
    low: { radialSegments: 6, tubularSegments: 16, distance: 10 },
  },
  box: {
    high: { segments: 4, distance: 0 },
    medium: { segments: 2, distance: 5 },
    low: { segments: 1, distance: 10 },
  },
};

// Material shared across all geometries for efficiency
const sharedMaterialProps = {
  color: new THREE.Color("hsl(221, 83%, 53%)"),
  wireframe: true,
  transparent: true,
  emissive: new THREE.Color("hsl(221, 83%, 53%)"),
};

// LOD Sphere component
function LODSphere({ opacity = 0.25, emissiveIntensity = 0.2 }: { opacity?: number; emissiveIntensity?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [lodLevel, setLodLevel] = useState<"high" | "medium" | "low">("high");
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      const distance = camera.position.distanceTo(groupRef.current.position);
      
      if (distance > LOD_CONFIG.sphere.low.distance) {
        if (lodLevel !== "low") setLodLevel("low");
      } else if (distance > LOD_CONFIG.sphere.medium.distance) {
        if (lodLevel !== "medium") setLodLevel("medium");
      } else {
        if (lodLevel !== "high") setLodLevel("high");
      }
      
      groupRef.current.rotation.x += 0.001;
      groupRef.current.rotation.y += 0.002;
    }
  });

  const segments = LOD_CONFIG.sphere[lodLevel].segments;

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1, segments, segments]} />
        <meshStandardMaterial
          {...sharedMaterialProps}
          opacity={opacity}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </group>
  );
}

// LOD Torus component
function LODTorus({ opacity = 0.2, emissiveIntensity = 0.15 }: { opacity?: number; emissiveIntensity?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [lodLevel, setLodLevel] = useState<"high" | "medium" | "low">("high");
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      const distance = camera.position.distanceTo(groupRef.current.position);
      
      if (distance > LOD_CONFIG.torus.low.distance) {
        if (lodLevel !== "low") setLodLevel("low");
      } else if (distance > LOD_CONFIG.torus.medium.distance) {
        if (lodLevel !== "medium") setLodLevel("medium");
      } else {
        if (lodLevel !== "high") setLodLevel("high");
      }
      
      groupRef.current.rotation.x += 0.001;
      groupRef.current.rotation.y += 0.002;
    }
  });

  const config = LOD_CONFIG.torus[lodLevel];

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[1.2, 0.4, config.radialSegments, config.tubularSegments]} />
        <meshStandardMaterial
          {...sharedMaterialProps}
          opacity={opacity}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </group>
  );
}

// LOD Box component
function LODBox({ opacity = 0.18, emissiveIntensity = 0.1 }: { opacity?: number; emissiveIntensity?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [lodLevel, setLodLevel] = useState<"high" | "medium" | "low">("high");
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      const distance = camera.position.distanceTo(groupRef.current.position);
      
      if (distance > LOD_CONFIG.box.low.distance) {
        if (lodLevel !== "low") setLodLevel("low");
      } else if (distance > LOD_CONFIG.box.medium.distance) {
        if (lodLevel !== "medium") setLodLevel("medium");
      } else {
        if (lodLevel !== "high") setLodLevel("high");
      }
      
      groupRef.current.rotation.x += 0.001;
      groupRef.current.rotation.y += 0.002;
    }
  });

  const segments = LOD_CONFIG.box[lodLevel].segments;

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5, segments, segments, segments]} />
        <meshStandardMaterial
          {...sharedMaterialProps}
          opacity={opacity}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </group>
  );
}

// Floating geometry with LOD
function FloatingGeometry({ position, geometry }: { position: [number, number, number], geometry: 'sphere' | 'torus' | 'box' }) {
  const renderGeometry = () => {
    switch (geometry) {
      case 'sphere':
        return <LODSphere />;
      case 'torus':
        return <LODTorus />;
      case 'box':
        return <LODBox />;
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
      
      {/* Particle field background */}
      <ParticleField 
        count={isMobile ? 300 : 600} 
        color="#00D9FF" 
        size={isMobile ? 0.015 : 0.02}
        spread={25}
      />
      
      {/* Shooting stars effect */}
      <ShootingStars />
      
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
  const { is3DEnabled } = use3DGraphics();

  const show3D = is3DEnabled && !isLowEnd && !reducedMotion;

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        {!show3D ? (
          <motion.div
            key="fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent"
          />
        ) : (
          <motion.div
            key="3d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scene3D;
