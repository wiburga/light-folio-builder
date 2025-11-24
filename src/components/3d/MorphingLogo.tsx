import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

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
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />
      
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
                    color="#60a5fa"
                    metalness={0.9}
                    roughness={0.1}
                    emissive="#3b82f6"
                    emissiveIntensity={0.3}
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
                color="#a78bfa"
                metalness={0.9}
                roughness={0.1}
                emissive="#a78bfa"
                emissiveIntensity={0.5}
              />
            </Text3D>
          )}
        </Center>
      </group>
    </>
  );
};

const MorphingLogo = () => {
  const [stage, setStage] = useState<"code" | "brackets">("code");

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev === "code" ? "brackets" : "code"));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-32">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <MorphingLogoContent stage={stage} />
      </Canvas>
    </div>
  );
};

export default MorphingLogo;
