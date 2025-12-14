import { useEffect, useRef, memo } from 'react';

const CustomCursor = memo(() => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const position = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Check for touch device once
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Use RAF for smooth cursor animation
    const animate = () => {
      // Lerp for smooth following
      position.current.x += (targetPosition.current.x - position.current.x) * 0.15;
      position.current.y += (targetPosition.current.y - position.current.y) * 0.12;

      const x = position.current.x;
      const y = position.current.y;
      const scale = isHovering.current ? 1.5 : 1;
      const ringScale = isHovering.current ? 1.8 : 1;

      cursor.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0) scale(${scale})`;
      ring.style.transform = `translate3d(${x - 24}px, ${y - 24}px, 0) scale(${ringScale})`;
      ring.style.borderColor = isHovering.current 
        ? 'hsl(var(--primary))' 
        : 'hsl(var(--primary) / 0.5)';

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovering.current = !!(
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button')
      );
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Early return for SSR and touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Main cursor glow */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] will-change-transform"
        style={{
          width: 40,
          height: 40,
          top: 0,
          left: 0,
        }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
            filter: 'blur(4px)',
          }}
        />

        {/* Inner core */}
        <div
          className="absolute rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 8,
            height: 8,
            background: 'hsl(var(--primary))',
            boxShadow: '0 0 15px hsl(var(--primary)), 0 0 30px hsl(var(--primary) / 0.5)',
          }}
        />
      </div>

      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9999] rounded-full border border-primary/50 will-change-transform"
        style={{
          width: 48,
          height: 48,
          top: 0,
          left: 0,
          transition: 'border-color 0.15s ease',
        }}
      />
    </>
  );
});

CustomCursor.displayName = "CustomCursor";

export default CustomCursor;