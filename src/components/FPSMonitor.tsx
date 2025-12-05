import { useEffect, useRef, useState } from "react";
import { use3DGraphics } from "@/contexts/Graphics3DContext";

const FPSMonitor = () => {
  const [fps, setFps] = useState(0);
  const [avgFps, setAvgFps] = useState(0);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsHistoryRef = useRef<number[]>([]);
  const { is3DEnabled } = use3DGraphics();

  useEffect(() => {
    // Only run in development mode
    if (import.meta.env.PROD) return;

    let animationFrameId: number;

    const measureFPS = () => {
      frameCountRef.current++;
      const currentTime = performance.now();
      const elapsed = currentTime - lastTimeRef.current;

      if (elapsed >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / elapsed);
        setFps(currentFps);
        
        // Keep last 10 FPS readings for average
        fpsHistoryRef.current.push(currentFps);
        if (fpsHistoryRef.current.length > 10) {
          fpsHistoryRef.current.shift();
        }
        const avg = Math.round(
          fpsHistoryRef.current.reduce((a, b) => a + b, 0) / fpsHistoryRef.current.length
        );
        setAvgFps(avg);

        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }

      animationFrameId = requestAnimationFrame(measureFPS);
    };

    animationFrameId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Only render in development mode
  if (import.meta.env.PROD) return null;

  const getFpsColor = (value: number) => {
    if (value >= 55) return "text-green-400";
    if (value >= 30) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="fixed bottom-2 left-2 sm:bottom-4 sm:left-4 z-50 bg-background/90 backdrop-blur-sm border border-border rounded-md sm:rounded-lg p-1.5 sm:p-3 font-mono text-[10px] sm:text-xs shadow-lg">
      <div className="flex flex-row sm:flex-col gap-2 sm:gap-1">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-muted-foreground hidden sm:inline">FPS:</span>
          <span className={`font-bold ${getFpsColor(fps)}`}>{fps}</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-muted-foreground hidden sm:inline">AVG:</span>
          <span className={`font-bold ${getFpsColor(avgFps)}`}>{avgFps}</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 sm:pt-1 sm:border-t border-border/50">
          <span className={`w-2 h-2 rounded-full ${is3DEnabled ? "bg-green-400" : "bg-muted-foreground"}`} />
          <span className="hidden sm:inline text-muted-foreground">3D</span>
        </div>
      </div>
    </div>
  );
};

export default FPSMonitor;
