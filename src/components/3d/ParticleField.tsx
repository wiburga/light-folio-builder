import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDevicePerformance } from "@/hooks/use-device-performance";

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
  spread?: number;
}

const ParticleField = ({ 
  count = 500, 
  color = "#00D9FF", 
  size = 0.02,
  spread = 20 
}: ParticleFieldProps) => {
  const points = useRef<THREE.Points>(null);
  const { isMobile, isLowEnd } = useDevicePerformance();
  
  // Reduce particle count for mobile/low-end devices
  const actualCount = isLowEnd ? Math.floor(count * 0.3) : isMobile ? Math.floor(count * 0.5) : count;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(actualCount * 3);
    const velocities = new Float32Array(actualCount * 3);
    const opacities = new Float32Array(actualCount);
    
    for (let i = 0; i < actualCount; i++) {
      const i3 = i * 3;
      // Spread particles in a 3D space
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;
      
      // Random velocities for subtle movement
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
      
      // Random opacity for depth effect
      opacities[i] = Math.random() * 0.5 + 0.2;
    }
    
    return { positions, velocities, opacities };
  }, [actualCount, spread]);

  useFrame((state) => {
    if (!points.current) return;
    
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < actualCount; i++) {
      const i3 = i * 3;
      
      // Subtle floating movement
      positions[i3] += particles.velocities[i3] + Math.sin(time * 0.5 + i) * 0.0005;
      positions[i3 + 1] += particles.velocities[i3 + 1] + Math.cos(time * 0.3 + i) * 0.0005;
      positions[i3 + 2] += particles.velocities[i3 + 2];
      
      // Wrap around boundaries
      const halfSpread = spread / 2;
      if (positions[i3] > halfSpread) positions[i3] = -halfSpread;
      if (positions[i3] < -halfSpread) positions[i3] = halfSpread;
      if (positions[i3 + 1] > halfSpread) positions[i3 + 1] = -halfSpread;
      if (positions[i3 + 1] < -halfSpread) positions[i3 + 1] = halfSpread;
      if (positions[i3 + 2] > halfSpread) positions[i3 + 2] = -halfSpread;
      if (positions[i3 + 2] < -halfSpread) positions[i3 + 2] = halfSpread;
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
    
    // Gentle rotation of entire particle system
    points.current.rotation.y = time * 0.02;
    points.current.rotation.x = Math.sin(time * 0.01) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={actualCount}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleField;
