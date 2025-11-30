import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

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

const FloatingCodeFieldContent = () => {
  const keywords = useMemo(() => [
    "React", "TypeScript", "JavaScript", "Python", "Node.js",
    "API", "Database", "UI/UX", "Cloud", "Git",
    "Docker", "PostgreSQL", "MongoDB", "Express", "Next.js",
    "Tailwind", "REST", "GraphQL", "AWS", "DevOps"
  ], []);

  const words = useMemo(() => 
    keywords.map((word, i) => ({
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
  return (
    <div className="fixed inset-0 -z-10 opacity-20 sm:opacity-30 blur-[0.5px] sm:blur-[1px]">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }} dpr={[1, 1.5]}>
        <FloatingCodeFieldContent />
      </Canvas>
    </div>
  );
};

export default FloatingCodeField;
