import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      name: "Vision KPI Tool",
      description:
        "Aplicación web moderna de análisis de datos que permite visualizar y hacer seguimiento del rendimiento empresarial en tiempo real. Este dashboard interactivo presenta indicadores clave de rendimiento (KPIs) con gráficos dinámicos y filtros personalizables.",
      technologies: [
        "Vite - Herramienta de construcción ultrarrápida",
        "React 18 - Biblioteca de JavaScript para interfaces de usuario",
        "TypeScript - Superset tipado de JavaScript",
        "shadcn/ui - Componentes de UI de alta calidad",
        "Tailwind CSS - Framework de CSS utilitario",
        "Recharts - Biblioteca de gráficos para React",
        "React Hook Form - Gestión de formularios eficiente",
        "Lucide React - Iconos modernos",
      ],
      demo: "https://vision-kpi-tool-demo.vercel.app", // 🔗 tu link del deploy
      repo: "https://github.com/wiburga/vision-kpi-tool", // 💻 tu link del repo
    },
    {
      name: "TechStore - Tienda Virtual (mern-commerce)",
      description:
        "Una aplicación web moderna de e-commerce construida con React, TypeScript y Lovable Cloud (Supabase). Incluye un catálogo de productos responsive, sistema de carrito de compras y funcionalidades completas de gestión.",
      technologies: [
        "Frontend: React 18, TypeScript, Vite, React Router, TanStack Query, ReactQuill, Tailwind CSS, shadcn/ui, Lucide React",
        "Backend (Lovable Cloud): Supabase, PostgreSQL Database, Row Level Security (RLS), Authentication, Storage, Real-time subscriptions",
      ],
      demo: "https://techstore-demo.vercel.app",
      repo: "https://github.com/wiburga/mern-commerce",
    },
    {
      name: "blogsmith-zone",
      description:
        "Un blog moderno con sistema de gestión de contenidos (CMS), autenticación de usuarios, roles y permisos, inspirado en plataformas como Medium y Dev.to.",
      technologies: [
        "Frontend: React 18, TypeScript, Tailwind CSS, shadcn/ui",
        "Backend: Supabase (Lovable Cloud)",
      ],
      demo: "https://blogsmith-zone.vercel.app",
      repo: "https://github.com/wiburga/blogsmith-zone",
    },
    {
      name: "Patient Appointments Pro",
      description:
        "Aplicación web para gestión de citas médicas desarrollada con React, TypeScript y Vite. Incluye autenticación, manejo de roles y diseño UI profesional.",
      technologies: [
        "Vite",
        "TypeScript",
        "React",
        "shadcn-ui",
        "Tailwind CSS",
      ],
      demo: "https://patient-appointments-pro.vercel.app",
      repo: "https://github.com/wiburga/patient-appointments-pro",
    },
  ];

  return (
    <section className="grid gap-6">
      {projects.map((project, index) => (
        <Card key={index} className="p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-2">{project.name}</h2>
          <p className="text-gray-600 mb-3">{project.description}</p>

          <h3 className="font-medium text-gray-800 mb-1">
            Tecnologías Utilizadas:
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
            {project.technologies.map((tech, idx) => (
              <li key={idx}>{tech}</li>
            ))}
          </ul>

          <div className="flex gap-3">
            {project.demo && (
              <Button asChild variant="default">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} /> Ver Demo
                </a>
              </Button>
            )}
            {project.repo && (
              <Button asChild variant="outline">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github size={16} /> Código
                </a>
              </Button>
            )}
          </div>
        </Card>
      ))}
    </section>
  );
};

export default Projects;
