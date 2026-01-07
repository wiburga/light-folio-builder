import { Card } from "@/components/ui/card";
import { Briefcase, CheckCircle } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      company: "Prowessec – Servicios a la Comunidad en Proyectos Sociales",
      position: "Administrador y Soporte Web",
      period: "Quito, Ecuador | 2022",
      description:
        "Administré y di soporte a tiendas virtuales aplicando conocimientos en desarrollo web. Implementé estrategias de promoción en línea que mejoraron la visibilidad de los proyectos.",
      achievements: [
        "Gestión y soporte de tiendas virtuales",
        "Estrategias digitales para mejorar visibilidad",
        "Diseño web enfocado en usabilidad y accesibilidad",
        "Capacitación de nuevos participantes en herramientas digitales",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Experiencia
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-16 md:pl-0">
                <div className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full bg-background border-2 border-primary md:-translate-x-1/2 top-8" />

                <Card className="md:max-w-[calc(50%-2rem)] md:ml-auto p-6">
                  <div className="mb-4 p-3 rounded-xl bg-primary/10 w-fit">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-2">
                    {exp.position}
                  </h3>
                  <p className="text-base sm:text-lg text-foreground font-medium mb-1">
                    {exp.company}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {exp.period}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
