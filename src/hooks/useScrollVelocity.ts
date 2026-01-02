import { useEffect, useRef, useState } from "react";

interface ScrollVelocity {
  velocity: number;
  direction: "up" | "down" | "idle";
}

export const useScrollVelocity = (sampleRate = 50): ScrollVelocity => {
  const [velocity, setVelocity] = useState<ScrollVelocity>({
    velocity: 0,
    direction: "idle"
  });
  
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    let rafId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const calculateVelocity = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTime.current;

      if (timeDelta >= sampleRate) {
        const scrollDelta = currentScrollY - lastScrollY.current;
        const speed = Math.abs(scrollDelta / timeDelta) * 1000; // pixels per second
        
        setVelocity({
          velocity: Math.min(speed, 5000), // Cap at 5000px/s
          direction: scrollDelta > 0 ? "down" : scrollDelta < 0 ? "up" : "idle"
        });

        lastScrollY.current = currentScrollY;
        lastTime.current = currentTime;
      }

      rafId = requestAnimationFrame(calculateVelocity);
    };

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setVelocity(prev => ({ ...prev, velocity: 0, direction: "idle" }));
      }, 150);
    };

    rafId = requestAnimationFrame(calculateVelocity);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sampleRate]);

  return velocity;
};

// Calculate dynamic root margin based on velocity
export const getPreloadMargin = (velocity: number): string => {
  // Slow scroll (< 500px/s): 200px margin
  // Medium scroll (500-1500px/s): 400px margin
  // Fast scroll (> 1500px/s): 800px margin
  if (velocity < 500) return "200px";
  if (velocity < 1500) return "400px";
  return "800px";
};
