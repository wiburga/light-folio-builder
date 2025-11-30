import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import Section3DWrapper from "@/components/Section3DWrapper";
import SculptedProjectTitle from "@/components/3d/SculptedProjectTitle";

const Projects = () => {
  const projects = [
    {
      title: "Dashboard KPI",
      description:
        "Dashboard interactivo con gráficos en tiempo real y filtros personalizables.",
      technologies: ["React", "TypeScript", "Tailwind", "Recharts"],
      demoUrl: "https://preview--vision-kpi-tool.lovable.app/",
      repoUrl: "https://github.com/wiburga/vision-kpi-tool",
      material: "glass" as const,
    },
    {
      title: "E-Commerce Web",
      description:
        "Tienda virtual moderna con carrito de compras y gestión de productos.",
      technologies: ["React", "TypeScript", "Supabase", "shadcn/ui"],
      demoUrl: "https://preview--mern-commerce.lovable.app",
      repoUrl: "https://github.com/wiburga/mern-commerce",
      material: "metal" as const,
    },
    {
      title: "Sistema de Citas",
      description:
        "Gestión de citas médicas con autenticación y panel administrativo.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      demoUrl: "https://preview--patient-appointments-pro.lovable.app/auth",
      repoUrl: "https://github.com/wiburga/patient-appointments-pro",
      material: "concrete" as const,
    },
  ];

  return (
    <Section3DWrapper
      id="projects"
      className="py-20 px-4 scroll-mt-20"
      direction="right"
      delay={0.15}
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-4">
          Proyectos
        </h2>
        <p className="text-center text-muted-foreground text-sm sm:text-base mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
          Algunos de los proyectos en los que he trabajado durante mi formación
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="h-full p-4 sm:p-6 hover:shadow-lg transition-all hover:-translate-y-1 border-border/50">
                {/* 3D Sculpted Title */}
                <div className="mb-4 -mt-2">
                  <SculptedProjectTitle 
                    title={project.title} 
                    material={project.material} 
                  />
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <Button
                    asChild
                    size="sm"
                    variant="default"
                  >
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Demo
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                  >
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      Código
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section3DWrapper>
  );
};

export default Projects;
