import { useState, useEffect } from "react";

interface DevicePerformance {
  isMobile: boolean;
  isLowEnd: boolean;
  gpuTier: "low" | "medium" | "high";
  maxDpr: number;
  reducedMotion: boolean;
}

export const useDevicePerformance = (): DevicePerformance => {
  const [performance, setPerformance] = useState<DevicePerformance>({
    isMobile: false,
    isLowEnd: false,
    gpuTier: "medium",
    maxDpr: 2,
    reducedMotion: false,
  });

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

    // Check for reduced motion preference
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Estimate GPU tier based on device
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    let gpuTier: "low" | "medium" | "high" = "medium";
    
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        const rendererLower = renderer.toLowerCase();
        
        // Low-end indicators
        if (
          rendererLower.includes("intel") ||
          rendererLower.includes("mali-4") ||
          rendererLower.includes("adreno 3") ||
          rendererLower.includes("powervr")
        ) {
          gpuTier = "low";
        }
        // High-end indicators
        else if (
          rendererLower.includes("nvidia") ||
          rendererLower.includes("radeon") ||
          rendererLower.includes("adreno 6") ||
          rendererLower.includes("apple gpu")
        ) {
          gpuTier = "high";
        }
      }
    }

    // Determine if low-end device
    const isLowEnd = isMobile && gpuTier === "low";
    
    // Set max DPR based on device
    const maxDpr = isLowEnd ? 1 : isMobile ? 1.5 : 2;

    setPerformance({
      isMobile,
      isLowEnd,
      gpuTier,
      maxDpr,
      reducedMotion,
    });
  }, []);

  return performance;
};
