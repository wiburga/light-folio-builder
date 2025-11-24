import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [stage, setStage] = useState<"idea" | "plan" | "code" | "error" | "solution" | "complete">("idea");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // IDEA → PLAN (1.5s + 1.0s)
    timers.push(setTimeout(() => setStage("plan"), 1500));
    
    // PLAN → CODE (2.5s + 1.5s)
    timers.push(setTimeout(() => setStage("code"), 2500));
    
    // CODE → ERROR (4.0s + 0.5s)
    timers.push(setTimeout(() => {
      setShowError(true);
      setTimeout(() => setShowError(false), 500);
    }, 4000));
    
    // ERROR → SOLUTION (4.5s + 1.0s)
    timers.push(setTimeout(() => setStage("solution"), 4500));
    
    // SOLUTION → COMPLETE (5.5s + 2.0s)
    timers.push(setTimeout(() => setStage("complete"), 5500));
    
    // Final fade out (7.5s + 1.0s)
    timers.push(setTimeout(() => onComplete(), 7500));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const techChars = "$L_0,\\[x],/y^2,\\beta,{},@,#,<>,%,^,&,*,+=,//,||,!=,==,::,->".split(",");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      {/* Film grain effect */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-30 animate-[scan_8s_linear_infinite]" 
             style={{ backgroundSize: '100% 4px' }} />
      </div>

      <AnimatePresence mode="wait">
        {/* STAGE 1: IDEA */}
        {stage === "idea" && (
          <motion.div
            key="idea"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              textShadow: [
                "0 0 20px hsl(var(--primary))",
                "0 0 40px hsl(var(--primary))",
                "0 0 20px hsl(var(--primary))",
              ]
            }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ 
              duration: 1.5,
              textShadow: {
                repeat: Infinity,
                duration: 2,
              }
            }}
            className="text-8xl md:text-9xl font-bold tracking-wider"
            style={{
              color: "hsl(var(--primary))",
              fontFamily: "'Courier New', monospace",
              textShadow: "0 0 30px hsl(var(--primary))",
            }}
          >
            IDEA
          </motion.div>
        )}

        {/* STAGE 2: PLAN */}
        {stage === "plan" && (
          <motion.div
            key="plan"
            className="relative text-8xl md:text-9xl font-bold tracking-wider"
            style={{
              color: "hsl(var(--primary))",
              fontFamily: "'Courier New', monospace",
            }}
          >
            {["P", "L", "A", "N"].map((letter, i) => (
              <motion.span
                key={i}
                initial={{ 
                  opacity: 0, 
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                  rotate: Math.random() * 360,
                  scale: 0.3,
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                }}
                transition={{ 
                  duration: 0.8,
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                style={{
                  display: "inline-block",
                  textShadow: "0 0 30px hsl(var(--primary))",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* STAGE 3: CODE (Chaos) */}
        {stage === "code" && (
          <motion.div
            key="code"
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  x: "50%",
                  y: "50%",
                }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
                className="absolute text-2xl md:text-4xl font-mono"
                style={{
                  color: showError ? "hsl(0, 100%, 60%)" : "hsl(var(--accent))",
                  textShadow: showError 
                    ? "0 0 20px hsl(0, 100%, 60%)" 
                    : "0 0 20px hsl(var(--accent))",
                }}
              >
                {techChars[Math.floor(Math.random() * techChars.length)]}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* STAGE 4: ERROR Glitch */}
        {showError && (
          <motion.div
            key="error"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0, 1, 0],
              backgroundColor: ["rgba(255,0,0,0)", "rgba(255,0,0,0.1)", "rgba(255,0,0,0)"],
            }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1] }}
          />
        )}

        {/* STAGE 5: SOLUTION */}
        {(stage === "solution" || stage === "complete") && (
          <motion.div
            key="solution"
            initial={{ 
              opacity: 0,
              scale: 3,
              filter: "blur(20px)",
            }}
            animate={{ 
              opacity: stage === "complete" ? 0 : 1,
              scale: 1,
              filter: "blur(0px)",
              textShadow: [
                "0 0 30px hsl(var(--primary))",
                "0 0 60px hsl(var(--primary)), 0 0 30px hsl(var(--accent))",
                "0 0 30px hsl(var(--primary))",
              ]
            }}
            transition={{ 
              opacity: stage === "complete" ? { duration: 1, delay: 1.5 } : { duration: 0.8 },
              scale: { duration: 0.8, type: "spring", stiffness: 80 },
              filter: { duration: 0.8 },
              textShadow: {
                repeat: Infinity,
                duration: 2,
                delay: 0.8,
              }
            }}
            className="text-6xl md:text-8xl font-bold tracking-wider text-center"
            style={{
              color: "hsl(var(--primary))",
              fontFamily: "'Courier New', monospace",
              textShadow: "0 0 40px hsl(var(--primary)), 0 0 20px hsl(var(--accent))",
            }}
          >
            ISAIAS BURGA
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroAnimation;
