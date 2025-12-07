import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDevicePerformance } from "@/hooks/use-device-performance";

interface ShootingStar {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  trail: Float32Array;
  trailIndex: number;
  active: boolean;
  lifetime: number;
  maxLifetime: number;
}

let starIdCounter = 0;

const ShootingStars = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { isMobile, isLowEnd } = useDevicePerformance();
  
  const maxStars = isLowEnd ? 1 : isMobile ? 2 : 3;
  const spawnInterval = isLowEnd ? 4000 : isMobile ? 3000 : 2000;
  const trailLength = isLowEnd ? 10 : isMobile ? 15 : 20;
  
  const starsRef = useRef<ShootingStar[]>([]);
  const [, forceUpdate] = useState(0);

  const createStar = (): ShootingStar => {
    // Random starting position at edges of the scene
    const side = Math.random() > 0.5 ? 1 : -1;
    const startX = side * (15 + Math.random() * 5);
    const startY = 8 + Math.random() * 7;
    const startZ = (Math.random() - 0.5) * 10;
    
    // Velocity pointing toward opposite side and downward
    const speed = 0.3 + Math.random() * 0.2;
    const velX = -side * speed;
    const velY = -(0.1 + Math.random() * 0.15);
    const velZ = (Math.random() - 0.5) * 0.05;
    
    const trail = new Float32Array(trailLength * 3);
    // Initialize all trail points to starting position
    for (let i = 0; i < trailLength; i++) {
      trail[i * 3] = startX;
      trail[i * 3 + 1] = startY;
      trail[i * 3 + 2] = startZ;
    }
    
    return {
      id: starIdCounter++,
      position: new THREE.Vector3(startX, startY, startZ),
      velocity: new THREE.Vector3(velX, velY, velZ),
      trail,
      trailIndex: 0,
      active: true,
      lifetime: 0,
      maxLifetime: 2 + Math.random() * 1.5
    };
  };

  // Spawn new stars periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const activeCount = starsRef.current.filter(s => s.active).length;
      if (activeCount < maxStars && Math.random() > 0.3) {
        starsRef.current = [...starsRef.current.filter(s => s.active), createStar()];
        forceUpdate(n => n + 1);
      }
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [maxStars, spawnInterval]);

  useFrame((_, delta) => {
    let needsUpdate = false;
    
    starsRef.current = starsRef.current.map(star => {
      if (!star.active) return star;
      
      // Update lifetime
      star.lifetime += delta;
      if (star.lifetime >= star.maxLifetime) {
        needsUpdate = true;
        return { ...star, active: false };
      }
      
      // Update position
      star.position.add(star.velocity);
      
      // Update trail - shift all points and add new position at end
      for (let i = 0; i < (trailLength - 1) * 3; i++) {
        star.trail[i] = star.trail[i + 3];
      }
      const lastIdx = (trailLength - 1) * 3;
      star.trail[lastIdx] = star.position.x;
      star.trail[lastIdx + 1] = star.position.y;
      star.trail[lastIdx + 2] = star.position.z;
      
      return star;
    }).filter(s => s.active);
    
    if (needsUpdate) {
      forceUpdate(n => n + 1);
    }
  });

  return (
    <group ref={groupRef}>
      {starsRef.current.filter(s => s.active).map((star) => {
        // Fade based on lifetime
        const fadeProgress = star.lifetime / star.maxLifetime;
        const opacity = Math.max(0, 0.9 * (1 - fadeProgress * fadeProgress));
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(star.trail, 3));
        
        return (
          <group key={star.id}>
            <primitive object={new THREE.Line(
              geometry,
              new THREE.LineBasicMaterial({
                color: new THREE.Color("#00D9FF"),
                transparent: true,
                opacity: opacity * 0.7,
                blending: THREE.AdditiveBlending,
              })
            )} />
            {/* Bright head of the shooting star */}
            <mesh position={star.position}>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshBasicMaterial
                color="#FFFFFF"
                transparent
                opacity={opacity}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            {/* Glow around the head */}
            <mesh position={star.position}>
              <sphereGeometry args={[0.1, 6, 6]} />
              <meshBasicMaterial
                color="#00D9FF"
                transparent
                opacity={opacity * 0.3}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export default ShootingStars;
