import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const Logo3DContent = () => {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.3;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.2} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="hsl(221, 83%, 53%)" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={groupRef}>
          <Center>
            {/* Front text */}
            <Text3D
              ref={textRef}
              font="/fonts/helvetiker_bold.typeface.json"
              size={1.5}
              height={0.3}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
            >
              IB
              <MeshTransmissionMaterial
                backside
                samples={4}
                thickness={0.5}
                chromaticAberration={0.5}
                anisotropy={0.3}
                distortion={0.5}
                distortionScale={0.5}
                temporalDistortion={0.1}
                clearcoat={1}
                attenuationDistance={0.5}
                attenuationColor="hsl(221, 83%, 53%)"
                color="hsl(221, 83%, 53%)"
                transmission={0.9}
              />
            </Text3D>
            
            {/* Back text - subtitle */}
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={0.3}
              height={0.1}
              position={[0, -0.5, -0.5]}
              rotation={[0, Math.PI, 0]}
              curveSegments={8}
            >
              DEVELOPER
              <meshStandardMaterial 
                color="hsl(221, 83%, 53%)" 
                metalness={0.95} 
                roughness={0.1}
                emissive="hsl(221, 83%, 53%)"
                emissiveIntensity={0.3}
              />
            </Text3D>
          </Center>
        </group>
      </Float>
    </>
  );
};

const Logo3D = () => {
  return (
    <div className="w-32 h-32 md:w-40 md:h-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Logo3DContent />
      </Canvas>
    </div>
  );
};

export default Logo3D;
