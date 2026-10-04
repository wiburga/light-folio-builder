import { Card } from "@/components/ui/card";
import { Wrench, GraduationCap, Code, Cloud } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yFloat1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yFloat2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const quickFacts = [
    { icon: Code, text: "Desarrollador full-stack remoto y freelance desde Quito, Ecuador" },
    { icon: Wrench, text: "Fundador de PCs Bur: soporte técnico y hardware" },
    { icon: GraduationCap, text: "Actualmente en varios proyectos" },
    { icon: Cloud, text: "Estudiando Azure" },
  ];

  return (
    <section ref={ref} id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Parallax decorative elements */}
      <motion.div
        style={{ y: yFloat1, rotate }}
        className="absolute top-20 right-10 w-24 h-24 border border-primary/10 rounded-lg opacity-50"
      />
      <motion.div
        style={{ y: yFloat2 }}
        className="absolute bottom-20 left-10 w-16 h-16 bg-primary/5 rounded-full blur-xl"
      />
      <motion.div
        style={{ y: yFloat1 }}
        className="absolute top-1/2 right-1/4 w-8 h-8 border border-primary/15 rotate-45"
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Sobre Mí
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-stretch">
          <AnimatedSection delay={0.1}>
            <Card className="h-full p-6 sm:p-8 backdrop-blur-sm bg-card/80 border-primary/10 hover:border-primary/30 transition-colors">
              <div className="space-y-4 text-muted-foreground">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Soy Isaias Burga, desarrollador full-stack y técnico en sistemas en Quito, Ecuador. Trabajo de forma remota y freelance creando aplicaciones web con React, TypeScript y Supabase.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Tengo mi propio negocio de soporte técnico y hardware, PCs Bur, donde ayudo a personas y pequeñas empresas a mantener sus equipos funcionando. Además, estudio Sistemas y Gestión de Data en el Instituto Superior Tecnológico ISTER.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Me interesa especialmente la tecnología aplicada a la educación y al impacto comunitario: soluciones sencillas que mejoren la vida de las personas.
                </p>
              </div>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Card className="h-full p-6 sm:p-8 backdrop-blur-sm bg-card/80 border-primary/10 hover:border-primary/30 transition-colors">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-primary">
                Datos Rápidos
              </h3>
              <ul className="space-y-4">
                {quickFacts.map((fact, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <fact.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-muted-foreground">
                      {fact.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
