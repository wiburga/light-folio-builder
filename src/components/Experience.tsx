import { Card } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, CheckCircle } from "lucide-react";

const Experience = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

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
    <section ref={containerRef} id="experience" className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(160 70% 45%) 0%, hsl(221 83% 53%) 50%, transparent 70%)",
          y,
        }}
      />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-glow-subtle">
            Experiencia
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-primary to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-16 md:pl-0"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full bg-background border-2 border-primary shadow-[0_0_15px_hsla(221,83%,53%,0.5)] md:-translate-x-1/2 top-8"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                />

                <Card className="glass hover:shadow-[var(--shadow-glow)] transition-all duration-500 overflow-hidden group md:max-w-[calc(50%-2rem)] md:ml-auto">
                  <div className="p-6 relative">
                    {/* Icon */}
                    <motion.div
                      className="mb-4 p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                      <Briefcase className="w-6 h-6 text-primary" />
                    </motion.div>

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
                        <motion.li
                          key={i}
                          className="flex items-start gap-3 text-muted-foreground group/item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                        >
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm group-hover/item:text-foreground transition-colors duration-300">
                            {achievement}
                          </span>
                        </motion.li>
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
