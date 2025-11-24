import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Scene3D from "@/components/Scene3D";
import FloatingCodeField from "@/components/3d/FloatingCodeField";
import MorphingLogo from "@/components/3d/MorphingLogo";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* 3D Scene Background */}
      <Scene3D />
      <FloatingCodeField />
      
      <div className="container mx-auto px-4 z-10 relative">
        {/* Morphing Logo */}
        <div className="flex justify-center mb-8">
          <MorphingLogo />
        </div>
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            style={{
              transform: "translateZ(50px)",
              transformStyle: "preserve-3d",
            }}
          >
            Isaias Burga
          </motion.h1>
          <motion.p 
            className="text-2xl md:text-3xl text-muted-foreground mb-8"
            style={{
              transform: "translateZ(30px)",
              transformStyle: "preserve-3d",
            }}
          >
            Desarrollador Junior & Estudiante ESPE
          </motion.p>
          <motion.p 
            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
            style={{
              transform: "translateZ(20px)",
              transformStyle: "preserve-3d",
            }}
          >
            Estudiante de la Universidad de las Fuerzas Armadas ESPE, apasionado por la tecnología y el desarrollo web. Comenzando mi camino en el mundo de la programación.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            style={{
              transform: "translateZ(40px)",
              transformStyle: "preserve-3d",
            }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)]"
              onClick={() => scrollToSection("projects")}
            >
              Ver Mi Trabajo
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-foreground hover:bg-primary/10"
              onClick={() => scrollToSection("contact")}
            >
              Contáctame
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-8 h-8 text-primary" />
      </button>
    </section>
  );
};

export default Hero;