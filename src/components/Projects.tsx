import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Layers } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Projects = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const projects = [
    {
      title: "Dashboard KPI",
      description:
        "Dashboard interactivo con gráficos en tiempo real y filtros personalizables.",
      technologies: ["React", "TypeScript", "Tailwind", "Recharts"],
      demoUrl: "https://preview--vision-kpi-tool.lovable.app/",
      repoUrl: "https://github.com/wiburga/vision-kpi-tool",
      gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    },
    {
      title: "E-Commerce Web",
      description:
        "Tienda virtual moderna con carrito de compras y gestión de productos.",
      technologies: ["React", "TypeScript", "Supabase", "shadcn/ui"],
      demoUrl: "https://preview--mern-commerce.lovable.app",
      repoUrl: "https://github.com/wiburga/mern-commerce",
      gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    },
    {
      title: "Sistema de Citas",
      description:
        "Gestión de citas médicas con autenticación y panel administrativo.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      demoUrl: "https://preview--patient-appointments-pro.lovable.app/auth",
      repoUrl: "https://github.com/wiburga/patient-appointments-pro",
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    },
  ];

  return (
    <section ref={containerRef} id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute right-0 bottom-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(221 83% 53%) 0%, transparent 70%)",
          y,
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-glow-subtle">
            Proyectos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4" />
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Algunos de los proyectos en los que he trabajado durante mi formación
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card className="h-full glass hover:shadow-[var(--shadow-glow)] transition-all duration-500 group overflow-hidden relative">
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 p-6">
                  {/* Project icon */}
                  <motion.div
                    className="mb-4 p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors duration-300"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <Layers className="w-6 h-6 text-primary" />
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-full backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild size="sm" variant="default" className="shadow-lg">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild size="sm" variant="outline" className="glass">
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Código
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
