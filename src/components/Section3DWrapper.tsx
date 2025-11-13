import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Section3DWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
}

const Section3DWrapper = ({ 
  children, 
  id, 
  className = "", 
  delay = 0,
  direction = "up" 
}: Section3DWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directionVariants = {
    left: { x: -100, rotateY: -15 },
    right: { x: 100, rotateY: 15 },
    up: { y: 100, rotateX: 15 },
    down: { y: -100, rotateX: -15 },
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{
        opacity: 0,
        ...directionVariants[direction],
        scale: 0.95,
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      } : {}}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {children}
    </motion.section>
  );
};

export default Section3DWrapper;
