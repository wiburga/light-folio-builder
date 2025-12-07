import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDevicePerformance } from "@/hooks/use-device-performance";

const HolographicGrid = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isMobile, isLowEnd } = useDevicePerformance();
  
  const gridSize = isLowEnd ? 40 : isMobile ? 60 : 100;
  const gridDivisions = isLowEnd ? 20 : isMobile ? 30 : 50;

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#00D9FF") },
        uFadeDistance: { value: gridSize * 0.4 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uFadeDistance;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // Grid lines
          float gridSize = 2.0;
          vec2 grid = abs(fract(vPosition.xz / gridSize - 0.5) - 0.5) / fwidth(vPosition.xz / gridSize);
          float line = min(grid.x, grid.y);
          float gridLine = 1.0 - min(line, 1.0);
          
          // Distance fade from center
          float dist = length(vPosition.xz);
          float fade = 1.0 - smoothstep(0.0, uFadeDistance, dist);
          
          // Horizon fade (based on z position)
          float horizonFade = smoothstep(-uFadeDistance, 0.0, vPosition.z);
          
          // Pulse effect along grid
          float pulse = sin(dist * 0.1 - uTime * 2.0) * 0.5 + 0.5;
          float pulseIntensity = pulse * 0.3 + 0.7;
          
          // Scan line effect
          float scanLine = sin(vPosition.z * 0.5 + uTime * 3.0) * 0.5 + 0.5;
          scanLine = smoothstep(0.8, 1.0, scanLine) * 0.5;
          
          float alpha = gridLine * fade * horizonFade * 0.4 * pulseIntensity;
          alpha += scanLine * fade * horizonFade * 0.1;
          
          vec3 finalColor = uColor + vec3(scanLine * 0.2);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [gridSize]);

  useFrame((state) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -8, -20]}
    >
      <planeGeometry args={[gridSize, gridSize, gridDivisions, gridDivisions]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

export default HolographicGrid;
