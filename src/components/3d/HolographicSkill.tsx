import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

interface HolographicSkillContentProps {
  text: string;
  isHovered: boolean;
}

const HolographicSkillContent = ({ text, isHovered }: HolographicSkillContentProps) => {
  const textRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.z = Math.sin(clock.getElapsedTime() * 2) * 0.1;
      
      if (isHovered) {
        const pulse = Math.sin(clock.getElapsedTime() * 5) * 0.1 + 1;
        textRef.current.scale.setScalar(pulse);
      } else {
        textRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }

    if (linesRef.current) {
      linesRef.current.rotation.z = clock.getElapsedTime() * 0.5;
      linesRef.current.visible = isHovered;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="hsl(221, 83%, 53%)" />
      
      <Center>
        <Text3D
          ref={textRef}
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.3}
          height={0.05}
          curveSegments={8}
        >
          {text}
          <meshStandardMaterial
            color="hsl(221, 83%, 53%)"
            emissive="hsl(221, 83%, 53%)"
            emissiveIntensity={isHovered ? 0.8 : 0.3}
            transparent
            opacity={isHovered ? 0.95 : 0.85}
            metalness={0.9}
            roughness={0.1}
          />
        </Text3D>
      </Center>

      {/* Energy lines when hovered */}
      <group ref={linesRef}>
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh key={i} position={[Math.cos(rad) * 1.5, Math.sin(rad) * 1.5, 0]}>
              <boxGeometry args={[0.02, 0.5, 0.02]} />
              <meshStandardMaterial
                color="hsl(221, 83%, 53%)"
                emissive="hsl(221, 83%, 53%)"
                emissiveIntensity={1}
                transparent
                opacity={0.7}
              />
            </mesh>
          );
        })}
      </group>
    </>
  );
};

interface HolographicSkillProps {
  skill: string;
}

const HolographicSkill = ({ skill }: HolographicSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-24 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <HolographicSkillContent text={skill} isHovered={isHovered} />
      </Canvas>
      <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-muted-foreground">
        {skill}
      </div>
    </div>
  );
};

export default HolographicSkill;
