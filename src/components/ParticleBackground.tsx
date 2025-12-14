import { useEffect, useRef, useCallback, memo } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

// Configuration - adjust for performance vs quality
const CONFIG = {
  particleCount: {
    mobile: 25,
    tablet: 40,
    desktop: 60,
  },
  connectionDistance: 120,
  mouseConnectionDistance: 150,
  targetFPS: 30,
  mouseThrottleMs: 16,
};

const ParticleBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();
  const lastFrameTime = useRef(0);
  const frameInterval = 1000 / CONFIG.targetFPS;
  const isVisibleRef = useRef(true);

  const getParticleCount = useCallback(() => {
    const width = window.innerWidth;
    if (width < 768) return CONFIG.particleCount.mobile;
    if (width < 1024) return CONFIG.particleCount.tablet;
    return CONFIG.particleCount.desktop;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Use device pixel ratio for retina, but cap at 2 for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      const count = getParticleCount();
      const { width, height } = canvas.getBoundingClientRect();
      particlesRef.current = [];

      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const drawParticles = () => {
      const particles = particlesRef.current;
      
      // Batch all particle draws
      ctx.fillStyle = "hsla(221, 83%, 53%, 0.6)";
      particles.forEach((p) => {
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const drawConnections = () => {
      const particles = particlesRef.current;
      const connectionDist = CONFIG.connectionDistance;
      const connectionDistSq = connectionDist * connectionDist;
      const mouseDistSq = CONFIG.mouseConnectionDistance * CONFIG.mouseConnectionDistance;
      
      ctx.lineWidth = 0.5;

      // Use spatial optimization - only check nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Particle to particle connections (skip distant pairs)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / connectionDist) * 0.15;
            ctx.strokeStyle = `hsla(221, 83%, 53%, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Mouse connection
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx > 0) {
          const dx = p1.x - mx;
          const dy = p1.y - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseDistSq) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / CONFIG.mouseConnectionDistance) * 0.3;
            ctx.strokeStyle = `hsla(221, 83%, 63%, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
            ctx.lineWidth = 0.5;
          }
        }
      }
    };

    const updateParticles = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges instead of bounce (smoother)
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse repulsion (only if mouse is on screen)
        if (mx > 0) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const distSq = dx * dx + dy * dy;
          const repulsionRadius = 80;

          if (distSq < repulsionRadius * repulsionRadius) {
            const dist = Math.sqrt(distSq);
            const force = (repulsionRadius - dist) / repulsionRadius * 0.1;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Velocity damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Limit velocity
        const speedSq = p.vx * p.vx + p.vy * p.vy;
        if (speedSq > 4) {
          const speed = Math.sqrt(speedSq);
          p.vx = (p.vx / speed) * 2;
          p.vy = (p.vy / speed) * 2;
        }
      }
    };

    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate);

      // Skip frame if not visible or not enough time passed
      if (!isVisibleRef.current) return;
      
      const deltaTime = currentTime - lastFrameTime.current;
      if (deltaTime < frameInterval) return;
      
      lastFrameTime.current = currentTime - (deltaTime % frameInterval);

      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      updateParticles();
      drawConnections();
      drawParticles();
    };

    // Throttled mouse handler
    let mouseThrottleTimer: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseThrottleTimer) return;
      mouseThrottleTimer = window.setTimeout(() => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
        mouseThrottleTimer = null;
      }, CONFIG.mouseThrottleMs);
    };

    // Visibility API - pause when tab is hidden
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };

    // Debounced resize handler
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resizeCanvas();
        createParticles();
      }, 200);
    };

    resizeCanvas();
    createParticles();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (mouseThrottleTimer) clearTimeout(mouseThrottleTimer);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [getParticleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-100"
      style={{ willChange: "auto" }}
    />
  );
});

ParticleBackground.displayName = "ParticleBackground";

export default ParticleBackground;