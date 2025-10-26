import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "Vision KPI Tool",
      description:
        "Dashboard interactivo para análisis de datos y seguimiento de KPIs en tiempo real, con gráficos dinámicos y filtros personalizables.",
      technologies: [
        "Vite",
        "React 18",
        "TypeScript",
        "shadcn/ui",
        "Tailwind CSS",
        "Recharts",
        "React Hook Form",
        "Lucide React",
      ],
      demoUrl: "https://vision-kpi-tool-demo.vercel.app",
      repoUrl: "https://github.com/tuusuario/vision-kpi-tool",
    },
    {
      title: "TechStore - Tienda Virtual",
      description:
        "Aplicación web moderna de e-commerce con catálogo responsive, sistema de carrito y backend en Supabase.",
      technologies: [
        "React 18",
        "TypeScript",
        "Vite",
        "React Router",
        "TanStack Query",
        "ReactQuill",
        "Tailwind CSS",
        "shadcn/ui",
        "Supabase",
      ],
      demoUrl: "https://techstore-demo.vercel.app",
      repoUrl: "https://github.com/tuusuario/mern-commerce",
    },
    {
      title: "Blogsmith Zone",
      description:
        "Blog con CMS, autenticación, roles y permisos, inspirado en Medium y Dev.to.",
      technologies: [
        "React 18",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "Supabase",
      ],
      demoUrl: "https://blogsmith-zone.vercel.app",
      repoUrl: "https://github.com/tuusuario/blogsmith-zone",
    },
    {
      title: "Patient Appointments Pro",
      description:
        "Aplicación para gestión de citas médicas con autenticación, roles y panel administrativo.",
      technologies: [
        "Vite",
        "TypeScript",
        "React",
        "shadcn-ui",
        "Tailwind CSS",
      ],
      demoUrl: "https://patient-appointments-pro.vercel.app",
      repoUrl: "https://github.com/tuusuario/patient-appointments-pro",
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 px-4 bg-secondary/30 scroll-mt-20 transition-all"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          🚀 Proyectos Destacados
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card className="p-6 bg-card border-border rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1">
                <h3 className="text-2xl font-semibold text-primary mb-2">
                  {project.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-primary/20 transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.demoUrl && (
                    <Button
                      asChild
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 inline-block" />
                        Ver Demo
                      </a>
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="border-gray-500 text-gray-700 hover:bg-gray-100"
                    >
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2 inline-block" />
                        Código
                      </a>
                    </Button>
                  )}
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
