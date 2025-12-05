import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Preload } from "@react-three/drei";
import * as THREE from "three";
import { useDevicePerformance } from "@/hooks/use-device-performance";
import { use3DGraphics } from "@/contexts/Graphics3DContext";
import { motion, AnimatePresence } from "framer-motion";

interface MorphingLogoContentProps {
  stage: "code" | "brackets";
}

const MorphingLogoContent = ({ stage }: MorphingLogoContentProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="hsl(221, 83%, 53%)" />
      
      <group ref={groupRef}>
        <Center>
          {stage === "code" ? (
            <>
              {["C", "O", "D", "E"].map((letter, i) => (
                <Text3D
                  key={i}
                  font="/fonts/helvetiker_bold.typeface.json"
                  size={0.5}
                  height={0.2}
                  position={[(i - 1.5) * 0.6, 0, 0]}
                  curveSegments={8}
                >
                  {letter}
                  <meshStandardMaterial
                    color="hsl(221, 83%, 53%)"
                    metalness={0.95}
                    roughness={0.05}
                    emissive="hsl(221, 83%, 53%)"
                    emissiveIntensity={0.5}
                  />
                </Text3D>
              ))}
            </>
          ) : (
            <Text3D
              font="/fonts/helvetiker_bold.typeface.json"
              size={0.8}
              height={0.3}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.05}
              bevelSize={0.02}
            >
              {"< >"}
              <meshStandardMaterial
                color="hsl(221, 83%, 53%)"
                metalness={0.95}
                roughness={0.05}
                emissive="hsl(221, 83%, 53%)"
                emissiveIntensity={0.6}
              />
            </Text3D>
          )}
        </Center>
      </group>
    </>
  );
};

// Simple 2D fallback for low-end devices
const MorphingLogoFallback = () => {
  const [stage, setStage] = useState<"code" | "brackets">("code");

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev === "code" ? "brackets" : "code"));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-20 sm:h-28 md:h-32 flex items-center justify-center">
      <span 
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary transition-all duration-500"
        style={{ textShadow: "0 0 20px hsl(221, 83%, 53%)" }}
      >
        {stage === "code" ? "CODE" : "< >"}
      </span>
    </div>
  );
};

const MorphingLogo = () => {
  const [stage, setStage] = useState<"code" | "brackets">("code");
  const { isMobile, isLowEnd, reducedMotion, maxDpr } = useDevicePerformance();
  const { is3DEnabled } = use3DGraphics();

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev === "code" ? "brackets" : "code"));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const show3D = is3DEnabled && !isLowEnd && !reducedMotion;

  return (
    <div className="w-full h-20 sm:h-28 md:h-32 overflow-hidden">
      <AnimatePresence mode="wait">
        {!show3D ? (
          <motion.div
            key="fallback"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <MorphingLogoFallback />
          </motion.div>
        ) : (
          <motion.div
            key="3d"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <Canvas 
              camera={{ position: [0, 0, 4], fov: 50 }} 
              dpr={[1, maxDpr]}
              gl={{
                antialias: !isMobile,
                alpha: true,
                powerPreference: isMobile ? "low-power" : "high-performance",
                stencil: false,
              }}
            >
              <Suspense fallback={null}>
                <MorphingLogoContent stage={stage} />
                <Preload all />
              </Suspense>
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MorphingLogo;
