import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Layers } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Projects = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yFloat1 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yFloat2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const projects = [
    {
      title: "Dashboard KPI",
      description:
        "Dashboard interactivo con gráficos en tiempo real y filtros personalizables.",
      technologies: ["React", "TypeScript", "Tailwind", "Recharts"],
      demoUrl: "https://preview--vision-kpi-tool.lovable.app/",
      repoUrl: "https://github.com/wiburga/vision-kpi-tool",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    },
    {
      title: "E-Commerce Web",
      description:
        "Tienda virtual moderna con carrito de compras y gestión de productos.",
      technologies: ["React", "TypeScript", "Supabase", "shadcn/ui"],
      demoUrl: "https://preview--mern-commerce.lovable.app",
      repoUrl: "https://github.com/wiburga/mern-commerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    },
    {
      title: "Sistema de Citas",
      description:
        "Gestión de citas médicas con autenticación y panel administrativo.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      demoUrl: "https://preview--patient-appointments-pro.lovable.app/auth",
      repoUrl: "https://github.com/wiburga/patient-appointments-pro",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    },
  ];

  return (
    <section ref={ref} id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Parallax decorative elements */}
      <motion.div
        style={{ y: yFloat1, rotate }}
        className="absolute top-20 left-10 w-16 h-16 border-2 border-primary/10 rounded-lg"
      />
      <motion.div
        style={{ y: yFloat2 }}
        className="absolute bottom-40 right-16 w-24 h-24 bg-primary/5 rounded-full blur-xl"
      />
      <motion.div
        style={{ y: yFloat1 }}
        className="absolute top-1/2 right-10 w-10 h-10 border border-primary/15 rotate-12"
      />
      <motion.div
        style={{ y: yFloat2, rotate }}
        className="absolute bottom-20 left-1/4 w-8 h-8 bg-primary/10 rounded-full"
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Proyectos
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Algunos de los proyectos en los que he trabajado durante mi formación
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full group/card"
              >
                <Card className="relative h-full overflow-hidden backdrop-blur-xl bg-gradient-to-br from-card/90 via-card/70 to-card/50 border border-primary/10 transition-all duration-500 group-hover/card:border-primary/40 group-hover/card:shadow-[0_0_60px_hsl(var(--primary)/0.25),0_20px_60px_-20px_hsl(var(--primary)/0.3)] shadow-[0_8px_32px_hsl(0_0%_0%/0.4)]">
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-[-1px] bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50 rounded-lg blur-sm" />
                  </div>
                  
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000" />
                  </div>

                  <div className="relative h-44 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover/card:scale-110 group-hover/card:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    {/* Floating icon badge */}
                    <motion.div 
                      className="absolute top-4 right-4 p-2.5 rounded-xl bg-primary/20 backdrop-blur-md border border-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Layers className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>

                  <div className="relative p-5">
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover/card:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary/90 rounded-full border border-primary/20 backdrop-blur-sm hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button asChild size="sm" className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300 group/btn">
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                            Demo
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                          </a>
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button asChild size="sm" variant="outline" className="w-full backdrop-blur-md bg-card/50 border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 group/btn">
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                            Código
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
