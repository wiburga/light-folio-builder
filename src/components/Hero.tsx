import { Button } from "@/components/ui/button";
import { ArrowDown, Code, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3)",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </motion.div>

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(221 83% 53%) 0%, transparent 70%)",
            top: "10%",
            left: "20%",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
          style={{
            background: "radial-gradient(circle, hsl(221 83% 63%) 0%, transparent 70%)",
            bottom: "20%",
            right: "10%",
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 z-10 relative"
        style={{ opacity, scale }}
      >
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Decorative elements */}
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              className="p-3 rounded-full glass pulse-glow"
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <Code className="w-6 h-6 text-primary" />
            </motion.div>
            <motion.div
              className="p-3 rounded-full glass pulse-glow"
              whileHover={{ scale: 1.1, rotate: -10 }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 text-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-primary via-primary-foreground to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
              Isaias Burga
            </span>
          </motion.h1>

          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="text-xl sm:text-3xl md:text-4xl text-foreground/90 font-medium tracking-wide">
              Desarrollador de Software
            </p>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-muted-foreground mt-3 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Autodidacta{" "}
              <span className="text-primary mx-2 text-glow-subtle">+</span>{" "}
              Formación Universitaria
            </motion.p>
          </motion.div>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-muted-foreground mb-10 sm:mb-14 max-w-2xl mx-auto px-2 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Apasionado por la tecnología y el desarrollo de software. Creando
            soluciones digitales innovadoras y transformando ideas en proyectos
            funcionales.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-300 text-base px-8 py-6"
                onClick={() => scrollToSection("projects")}
              >
                Ver Mi Trabajo
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary glass text-base px-8 py-6"
                onClick={() => scrollToSection("contact")}
              >
                Contáctame
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer bg-transparent border-none z-10"
        aria-label="Scroll to about section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-8 h-8 text-primary text-glow-subtle" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
