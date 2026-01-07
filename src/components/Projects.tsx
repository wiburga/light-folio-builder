import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Layers } from "lucide-react";

const Projects = () => {
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
    <section id="projects" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Proyectos
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Algunos de los proyectos en los que he trabajado durante mi formación
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="h-full overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              <div className="p-4">
                <div className="mb-3 p-2 rounded-lg bg-primary/10 w-fit">
                  <Layers className="w-5 h-5 text-primary" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button asChild size="sm" variant="default">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Código
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
