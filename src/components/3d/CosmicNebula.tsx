import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDevicePerformance } from "@/hooks/use-device-performance";

const CosmicNebula = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { isMobile, isLowEnd } = useDevicePerformance();
  
  // Reduce complexity for low-end devices
  const cloudCount = isLowEnd ? 3 : isMobile ? 5 : 8;
  
  const clouds = useMemo(() => {
    const items = [];
    for (let i = 0; i < cloudCount; i++) {
      items.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          -15 - Math.random() * 15
        ),
        scale: 3 + Math.random() * 5,
        rotation: Math.random() * Math.PI * 2,
        speed: 0.0005 + Math.random() * 0.001,
        color: Math.random() > 0.5 ? "#00D9FF" : "#8B5CF6",
        opacity: 0.03 + Math.random() * 0.04,
      });
    }
    return items;
  }, [cloudCount]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        child.rotation.z = clouds[i].rotation + time * clouds[i].speed;
        // Subtle breathing effect
        const breathe = 1 + Math.sin(time * 0.2 + i) * 0.05;
        child.scale.setScalar(clouds[i].scale * breathe);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {clouds.map((cloud, i) => (
        <mesh
          key={i}
          position={cloud.position}
          rotation={[0, 0, cloud.rotation]}
          scale={cloud.scale}
        >
          <planeGeometry args={[4, 4, 1, 1]} />
          <meshBasicMaterial
            color={cloud.color}
            transparent
            opacity={cloud.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      
      {/* Central glow effect */}
      <mesh position={[0, 0, -25]}>
        <sphereGeometry args={[12, 16, 16]} />
        <meshBasicMaterial
          color="#00D9FF"
          transparent
          opacity={0.015}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Secondary purple glow */}
      <mesh position={[8, -5, -20]}>
        <sphereGeometry args={[8, 12, 12]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.02}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Tertiary cyan glow */}
      {!isLowEnd && (
        <mesh position={[-10, 6, -22]}>
          <sphereGeometry args={[6, 12, 12]} />
          <meshBasicMaterial
            color="#00D9FF"
            transparent
            opacity={0.018}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
};

export default CosmicNebula;
