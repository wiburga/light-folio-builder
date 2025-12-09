import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    {
      company: "Prowessec – Servicios a la Comunidad en Proyectos Sociales",
      position: "Administrador y Soporte Web",
      period: "Quito, Ecuador | 2022",
      description:
        "Administré y di soporte a tiendas virtuales aplicando conocimientos en desarrollo web. Implementé estrategias de promoción en línea que mejoraron la visibilidad de los proyectos. Creé y mantuve páginas web con enfoque en usabilidad y accesibilidad. Lideré y capacité a nuevos participantes en el uso de herramientas digitales.",
      achievements: [
        "Gestión y soporte de tiendas virtuales",
        "Estrategias digitales para mejorar visibilidad",
        "Diseño web enfocado en usabilidad y accesibilidad",
        "Capacitación de nuevos participantes en herramientas digitales"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experiencia
        </motion.h2>
        <div className="relative">
          {/* Línea del tiempo - hidden on mobile */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-1/2 hidden sm:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative ${
                  index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                {/* Punto de la línea - hidden on mobile */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 md:translate-x-0 top-6 hidden sm:block" />

                <Card className="sm:ml-8 md:ml-0 p-4 sm:p-6 bg-card border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)]">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                      {exp.position}
                    </h3>
                    <p className="text-base sm:text-lg text-foreground font-medium">
                      {exp.company}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {exp.period}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                    <ul className="space-y-2 mt-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary text-lg">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
