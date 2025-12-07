import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDevicePerformance } from "@/hooks/use-device-performance";

const AuroraBorealis = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isMobile, isLowEnd } = useDevicePerformance();
  
  const ribbonCount = isLowEnd ? 2 : isMobile ? 3 : 5;
  const segments = isLowEnd ? 20 : isMobile ? 40 : 80;
  
  const ribbons = useMemo(() => {
    return Array.from({ length: ribbonCount }, (_, i) => ({
      offset: i * 2,
      height: -8 + i * 3,
      speed: 0.3 + Math.random() * 0.2,
      amplitude: 1.5 + Math.random() * 0.5,
      color1: i % 2 === 0 ? "#00D9FF" : "#8B5CF6",
      color2: i % 2 === 0 ? "#8B5CF6" : "#00D9FF",
      opacity: 0.08 - i * 0.01,
    }));
  }, [ribbonCount]);

  const geometries = useMemo(() => {
    return ribbons.map(() => {
      const geo = new THREE.PlaneGeometry(60, 4, segments, 1);
      return geo;
    });
  }, [ribbons, segments]);

  const materials = useMemo(() => {
    return ribbons.map((ribbon) => {
      return new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color(ribbon.color1) },
          uColor2: { value: new THREE.Color(ribbon.color2) },
          uOpacity: { value: ribbon.opacity },
          uAmplitude: { value: ribbon.amplitude },
          uSpeed: { value: ribbon.speed },
        },
        vertexShader: `
          uniform float uTime;
          uniform float uAmplitude;
          uniform float uSpeed;
          varying vec2 vUv;
          varying float vWave;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Create flowing wave effect
            float wave = sin(pos.x * 0.15 + uTime * uSpeed) * uAmplitude;
            wave += sin(pos.x * 0.08 + uTime * uSpeed * 0.7) * uAmplitude * 0.5;
            wave += sin(pos.x * 0.25 + uTime * uSpeed * 1.3) * uAmplitude * 0.3;
            
            pos.y += wave;
            pos.z += sin(pos.x * 0.1 + uTime * uSpeed * 0.5) * 0.5;
            
            vWave = wave / uAmplitude;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform float uOpacity;
          uniform float uTime;
          varying vec2 vUv;
          varying float vWave;
          
          void main() {
            // Gradient based on UV and wave
            float mixFactor = vUv.x + sin(uTime * 0.2) * 0.2;
            vec3 color = mix(uColor1, uColor2, mixFactor);
            
            // Fade edges
            float fadeY = smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
            float fadeX = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
            
            // Add shimmer based on wave
            float shimmer = 0.7 + 0.3 * sin(vWave * 3.14159 + uTime);
            
            float alpha = uOpacity * fadeY * fadeX * shimmer;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
    });
  }, [ribbons]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    materials.forEach((mat) => {
      mat.uniforms.uTime.value = time;
    });
  });

  return (
    <group position={[0, 8, -20]} rotation={[0.2, 0, 0]}>
      {ribbons.map((ribbon, i) => (
        <mesh
          key={i}
          geometry={geometries[i]}
          material={materials[i]}
          position={[0, ribbon.height, -i * 2]}
        />
      ))}
    </group>
  );
};

export default AuroraBorealis;
