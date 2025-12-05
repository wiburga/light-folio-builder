import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useDevicePerformance } from "@/hooks/use-device-performance";
import { use3DGraphics } from "@/contexts/Graphics3DContext";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingWordProps {
  text: string;
  position: [number, number, number];
  speed: number;
  size: number;
}

const FloatingWord = ({ text, position, speed, size }: FloatingWordProps) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.5;
      ref.current.rotation.y = clock.getElapsedTime() * speed * 0.2;
    }
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={size}
      color="hsl(221, 83%, 53%)"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.015}
      outlineColor="hsl(221, 83%, 30%)"
    >
      {text}
    </Text>
  );
};

// FloatingCodeFieldContent moved below

const FloatingCodeFieldContent = ({ wordCount }: { wordCount: number }) => {
  const keywords = useMemo(() => [
    "React", "TypeScript", "JavaScript", "Python", "Node.js",
    "API", "Database", "UI/UX", "Cloud", "Git",
    "Docker", "PostgreSQL", "MongoDB", "Express", "Next.js",
    "Tailwind", "REST", "GraphQL", "AWS", "DevOps"
  ].slice(0, wordCount), [wordCount]);

  const words = useMemo(() => 
    keywords.map((word) => ({
      text: word,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      speed: 0.3 + Math.random() * 0.5,
      size: 0.3 + Math.random() * 0.4,
    })),
    [keywords]
  );

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="hsl(221, 83%, 53%)" />
      
      {words.map((word, i) => (
        <FloatingWord key={i} {...word} />
      ))}
    </>
  );
};

const FloatingCodeField = () => {
  const { isMobile, isLowEnd, reducedMotion, maxDpr } = useDevicePerformance();
  const { is3DEnabled } = use3DGraphics();

  const show3D = is3DEnabled && !isLowEnd && !reducedMotion;

  // Reduce words on mobile
  const wordCount = isMobile ? 10 : 20;

  return (
    <AnimatePresence>
      {show3D && (
        <motion.div
          key="floating-code"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 -z-10 opacity-20 sm:opacity-30 blur-[0.5px] sm:blur-[1px]"
        >
          <Canvas 
            camera={{ position: [0, 0, 10], fov: 75 }} 
            dpr={[1, maxDpr]}
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: isMobile ? "low-power" : "high-performance",
              stencil: false,
            }}
          >
            <FloatingCodeFieldContent wordCount={wordCount} />
          </Canvas>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCodeField;
