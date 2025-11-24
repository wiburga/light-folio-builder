import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

interface SculptedProjectTitleContentProps {
  title: string;
  material: "concrete" | "glass" | "metal";
  isHovered: boolean;
}

const SculptedProjectTitleContent = ({ 
  title, 
  material, 
  isHovered 
}: SculptedProjectTitleContentProps) => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (textRef.current) {
      const targetY = isHovered ? 0.3 : 0;
      textRef.current.position.y += (targetY - textRef.current.position.y) * 0.1;

      if (isHovered) {
        textRef.current.rotation.y += 0.01;
      } else {
        textRef.current.rotation.y *= 0.95;
      }
    }
  });

  const getMaterialProps = () => {
    switch (material) {
      case "concrete":
        return {
          color: "#6b7280",
          metalness: 0.1,
          roughness: 0.9,
          emissive: "#374151",
          emissiveIntensity: 0.1,
        };
      case "glass":
        return {
          color: "#60a5fa",
          metalness: 0.9,
          roughness: 0.05,
          emissive: "#3b82f6",
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: 0.7,
        };
      case "metal":
        return {
          color: "#d97706",
          metalness: 1,
          roughness: 0.3,
          emissive: "#ea580c",
          emissiveIntensity: 0.2,
        };
    }
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-5, -5, 5]} intensity={0.3} />
      
      <Center>
        <Text3D
          ref={textRef}
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.25}
          height={0.15}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelSegments={5}
        >
          {title}
          <meshStandardMaterial {...getMaterialProps()} />
        </Text3D>
      </Center>

      {/* Shadow plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </>
  );
};

interface SculptedProjectTitleProps {
  title: string;
  material: "concrete" | "glass" | "metal";
}

const SculptedProjectTitle = ({ title, material }: SculptedProjectTitleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full h-24 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 50 }}
        shadows
      >
        <SculptedProjectTitleContent 
          title={title} 
          material={material} 
          isHovered={isHovered} 
        />
      </Canvas>
    </div>
  );
};

export default SculptedProjectTitle;
