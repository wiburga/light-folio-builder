import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useDevicePerformance } from "@/hooks/use-device-performance";

interface LensFlareProps {
  lightPositions?: THREE.Vector3[];
}

const LensFlare = ({ lightPositions }: LensFlareProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { isMobile, isLowEnd } = useDevicePerformance();
  const { camera, pointer } = useThree();
  
  // Default light positions if none provided
  const lights = useMemo(() => {
    return lightPositions || [
      new THREE.Vector3(10, 10, 5),
      new THREE.Vector3(-10, -10, -5),
      new THREE.Vector3(0, 8, -20),
    ];
  }, [lightPositions]);

  const flareCount = isLowEnd ? 3 : isMobile ? 4 : 6;

  // Create flare elements for each light
  const flareElements = useMemo(() => {
    return lights.map((_, lightIndex) => {
      return Array.from({ length: flareCount }, (_, i) => ({
        scale: 0.1 + Math.random() * 0.3,
        offset: 0.2 + (i / flareCount) * 0.8,
        color: i % 2 === 0 ? "#00D9FF" : "#8B5CF6",
        opacity: 0.15 - i * 0.02,
        rotation: Math.random() * Math.PI,
      }));
    });
  }, [lights, flareCount]);

  const materials = useMemo(() => {
    return flareElements.flat().map((flare) => {
      return new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(flare.color) },
          uOpacity: { value: 0 },
          uTime: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacity;
          uniform float uTime;
          varying vec2 vUv;
          
          void main() {
            vec2 center = vUv - 0.5;
            float dist = length(center);
            
            // Circular gradient with soft edges
            float circle = 1.0 - smoothstep(0.0, 0.5, dist);
            
            // Add subtle ring
            float ring = smoothstep(0.3, 0.35, dist) * (1.0 - smoothstep(0.35, 0.5, dist));
            
            float alpha = (circle * 0.6 + ring * 0.4) * uOpacity;
            
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      });
    });
  }, [flareElements]);

  // Main flare glow material
  const mainGlowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color("#00D9FF") },
        uOpacity: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform float uTime;
        varying vec2 vUv;
        
        void main() {
          vec2 center = vUv - 0.5;
          float dist = length(center);
          
          // Soft radial gradient
          float glow = exp(-dist * 4.0);
          
          // Add rays
          float angle = atan(center.y, center.x);
          float rays = sin(angle * 6.0 + uTime) * 0.5 + 0.5;
          rays = pow(rays, 3.0) * 0.3;
          
          float alpha = (glow + rays * glow) * uOpacity;
          
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Convert pointer to world ray
    const mouseWorld = new THREE.Vector3(pointer.x * 5, pointer.y * 5, 0);
    
    let materialIndex = 0;
    
    lights.forEach((lightPos, lightIndex) => {
      // Project light position to screen space
      const lightScreen = lightPos.clone().project(camera);
      
      // Calculate distance from mouse to light in screen space
      const mouseScreen = new THREE.Vector2(pointer.x, pointer.y);
      const lightScreen2D = new THREE.Vector2(lightScreen.x, lightScreen.y);
      const distanceToLight = mouseScreen.distanceTo(lightScreen2D);
      
      // Intensity based on proximity (closer = brighter)
      const proximity = Math.max(0, 1 - distanceToLight * 1.5);
      const intensity = Math.pow(proximity, 2);
      
      // Update flare elements
      flareElements[lightIndex].forEach((flare, flareIndex) => {
        const mat = materials[materialIndex];
        if (mat) {
          mat.uniforms.uOpacity.value = intensity * flare.opacity;
          mat.uniforms.uTime.value = time;
        }
        materialIndex++;
      });
    });
    
    // Update main glow
    const closestLight = lights.reduce((closest, light) => {
      const lightScreen = light.clone().project(camera);
      const dist = new THREE.Vector2(pointer.x - lightScreen.x, pointer.y - lightScreen.y).length();
      return dist < closest.dist ? { light, dist } : closest;
    }, { light: lights[0], dist: Infinity });
    
    const mainIntensity = Math.max(0, 1 - closestLight.dist * 1.5);
    mainGlowMaterial.uniforms.uOpacity.value = Math.pow(mainIntensity, 2) * 0.3;
    mainGlowMaterial.uniforms.uTime.value = time;
  });

  return (
    <group ref={groupRef}>
      {/* Main central glow that follows cursor toward lights */}
      <mesh position={[0, 0, 4]}>
        <planeGeometry args={[3, 3]} />
        <primitive object={mainGlowMaterial} attach="material" />
      </mesh>
      
      {/* Flare elements along light-to-center axis */}
      {lights.map((lightPos, lightIndex) =>
        flareElements[lightIndex].map((flare, flareIndex) => {
          const materialIdx = lightIndex * flareCount + flareIndex;
          const offsetPos = lightPos.clone().multiplyScalar(flare.offset * 0.3);
          
          return (
            <mesh
              key={`${lightIndex}-${flareIndex}`}
              position={[offsetPos.x * 0.5, offsetPos.y * 0.5, 3]}
              rotation={[0, 0, flare.rotation]}
              scale={flare.scale}
            >
              <planeGeometry args={[1, 1]} />
              <primitive object={materials[materialIdx]} attach="material" />
            </mesh>
          );
        })
      )}
    </group>
  );
};

export default LensFlare;
