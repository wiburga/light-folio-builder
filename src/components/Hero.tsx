import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
    >
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Isaias Burga
          </motion.h1>
          <motion.div className="mb-6 sm:mb-8">
            <p className="text-lg sm:text-2xl md:text-3xl text-foreground/90 font-medium tracking-wide">
              Desarrollador de Software
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-2 italic">
              Autodidacta <span className="text-primary mx-2">+</span> Formación Universitaria
            </p>
          </motion.div>
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-2"
          >
            Apasionado por la tecnología y el desarrollo de software. Creando soluciones digitales innovadoras y transformando ideas en proyectos funcionales.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center">
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
