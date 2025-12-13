import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const trailId = useRef(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add new trail point
      trailId.current += 1;
      setTrail(prev => [...prev.slice(-12), { x: e.clientX, y: e.clientY, id: trailId.current }]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * { cursor: none !important; }
      `}</style>
      
      {/* Trail particles */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-[9998]"
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ 
            opacity: 0, 
            scale: 0,
            x: point.x - 4,
            y: point.y - 4
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            width: 8 + (index * 0.5),
            height: 8 + (index * 0.5),
            background: `radial-gradient(circle, hsl(var(--primary) / ${0.3 + index * 0.05}) 0%, transparent 70%)`,
            borderRadius: '50%',
          }}
        />
      ))}

      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          width: 40,
          height: 40,
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
        <motion.div 
          className="absolute rounded-full"
          animate={{
            scale: isHovering ? 0.5 : 1,
          }}
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
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full border border-primary/50"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.8 : 1,
          borderColor: isHovering ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.5)',
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        style={{
          width: 48,
          height: 48,
        }}
      />
    </>
  );
};

export default CustomCursor;
