import { Suspense, ReactNode, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { useDevicePerformance } from "@/hooks/use-device-performance";

interface OptimizedCanvasProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  fallback?: ReactNode;
  enableShadows?: boolean;
}

// Fallback component while loading
const CanvasFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const OptimizedCanvas = ({
  children,
  className = "",
  cameraPosition = [0, 0, 5],
  cameraFov = 50,
  fallback,
  enableShadows = false,
}: OptimizedCanvasProps) => {
  const { isMobile, isLowEnd, maxDpr, reducedMotion } = useDevicePerformance();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cleanup WebGL context on unmount
  useEffect(() => {
    return () => {
      if (canvasRef.current) {
        const gl = canvasRef.current.getContext("webgl") || 
                   canvasRef.current.getContext("webgl2");
        if (gl) {
          const ext = gl.getExtension("WEBGL_lose_context");
          if (ext) ext.loseContext();
        }
      }
    };
  }, []);

  // Don't render 3D on very low-end devices or if user prefers reduced motion
  if (isLowEnd || reducedMotion) {
    return fallback ? <>{fallback}</> : null;
  }

  return (
    <div className={className}>
      <Canvas
        ref={canvasRef}
        camera={{ position: cameraPosition, fov: cameraFov }}
        dpr={[1, maxDpr]}
        performance={{ min: isMobile ? 0.3 : 0.5 }}
        shadows={enableShadows && !isMobile}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default OptimizedCanvas;
