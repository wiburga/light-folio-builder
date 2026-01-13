import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax layers with different speeds
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background parallax layer */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" 
      />
      
      {/* Mid parallax layer - animated gradient orbs */}
      <motion.div style={{ y: yMid }} className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 border border-primary/20 rotate-45"
          animate={{ rotate: [45, 90, 45] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-16 h-16 border border-primary/15 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-primary/10 rounded-lg blur-sm"
          animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Content parallax layer */}
      <motion.div 
        style={{ y: yContent, opacity }} 
        className="container mx-auto px-4 z-10 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 sm:mb-6 tracking-tight"
          >
            <motion.span 
              className="relative inline-block"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Glow layer */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent blur-2xl opacity-50">
                Isaias Burga
              </span>
              {/* Main text with gradient */}
              <span className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent drop-shadow-[0_0_40px_hsl(var(--primary)/0.4)]">
                Isaias Burga
              </span>
              {/* Decorative underline */}
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 sm:mb-8"
          >
            <p className="text-xl sm:text-3xl md:text-4xl text-foreground/90 font-medium tracking-wide">
              Desarrollador de Software
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-3 italic">
              Autodidacta <span className="text-primary mx-2">+</span> Formación Universitaria
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground mb-10 sm:mb-14 max-w-2xl mx-auto px-2 leading-relaxed"
          >
            Apasionado por la tecnología y el desarrollo de software. Creando
            soluciones digitales innovadoras y transformando ideas en proyectos
            funcionales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground text-base font-semibold px-10 py-7 rounded-xl shadow-[0_0_30px_hsl(var(--primary)/0.4),0_10px_40px_-10px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.6),0_20px_50px_-10px_hsl(var(--primary)/0.6)] transition-all duration-300 border border-primary/30 group"
                onClick={() => scrollToSection("projects")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Ver Mi Trabajo
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
                {/* Animated shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {/* Inner glow */}
                <span className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="relative overflow-hidden border-2 border-primary/40 text-foreground text-base font-semibold px-10 py-7 rounded-xl backdrop-blur-md bg-primary/5 hover:bg-primary/15 hover:border-primary/70 shadow-[0_0_20px_hsl(var(--primary)/0.15),inset_0_0_20px_hsl(var(--primary)/0.05)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.3),inset_0_0_30px_hsl(var(--primary)/0.1)] transition-all duration-300 group"
                onClick={() => scrollToSection("contact")}
              >
                <span className="relative z-10 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
                  Contáctame
                </span>
                {/* Animated border glow */}
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 2 }
        }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer bg-transparent border-none z-10"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-8 h-8 text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
      </motion.button>
    </section>
  );
};

export default Hero;
