import { Card } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { User, GraduationCap, Code, Rocket } from "lucide-react";

const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const quickFacts = [
    {
      icon: GraduationCap,
      text: "Estudiante de la Universidad de las Fuerzas Armadas ESPE",
    },
    {
      icon: Code,
      text: "Desarrollador Junior recién comenzando",
    },
    {
      icon: Rocket,
      text: "Aprendiendo React, TypeScript y desarrollo web moderno",
    },
    {
      icon: User,
      text: "Motivado por aprender y crecer profesionalmente",
    },
  ];

  return (
    <section ref={containerRef} id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute right-0 top-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(221 83% 53%) 0%, transparent 70%)",
          y,
        }}
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-glow-subtle">
            Sobre Mí
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full p-6 sm:p-8 glass hover:shadow-[var(--shadow-glow)] transition-all duration-500 group">
              <div className="space-y-4 text-muted-foreground">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  ¡Hola! Soy Isaias Burga, estudiante de la Universidad de las
                  Fuerzas Armadas ESPE. Estoy comenzando mi camino como
                  desarrollador, con mucha pasión por aprender y crear
                  soluciones tecnológicas.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Mi viaje en la tecnología está recién comenzando, y cada día
                  es una oportunidad para aprender algo nuevo. Me enfoco en
                  desarrollar mis habilidades en desarrollo web y programación.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Cuando no estoy estudiando o programando, me encanta explorar
                  nuevas tecnologías y estar al día con las últimas tendencias
                  en desarrollo.
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full p-6 sm:p-8 glass hover:shadow-[var(--shadow-glow)] transition-all duration-500">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-primary text-glow-subtle">
                Datos Rápidos
              </h3>
              <ul className="space-y-4">
                {quickFacts.map((fact, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <fact.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {fact.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
