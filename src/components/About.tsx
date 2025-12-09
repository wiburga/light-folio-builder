import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Sobre Mí
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-4 sm:p-6 md:p-8 bg-card border-border shadow-[var(--shadow-card)]">
              <div className="space-y-3 sm:space-y-4 text-muted-foreground">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  ¡Hola! Soy Isaias Burga, estudiante de la Universidad de las Fuerzas Armadas ESPE. Estoy comenzando mi camino como desarrollador, con mucha pasión por aprender y crear soluciones tecnológicas.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Mi viaje en la tecnología está recién comenzando, y cada día es una oportunidad para aprender algo nuevo. Me enfoco en desarrollar mis habilidades en desarrollo web y programación.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Cuando no estoy estudiando o programando, me encanta explorar nuevas tecnologías y estar al día con las últimas tendencias en desarrollo.
                </p>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="p-4 sm:p-6 md:p-8 bg-gradient-card border-border shadow-[var(--shadow-card)]">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-primary">Datos Rápidos</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-primary text-lg sm:text-xl">▹</span>
                  <span className="text-sm sm:text-base text-muted-foreground">Estudiante de la Universidad de las Fuerzas Armadas ESPE</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-primary text-lg sm:text-xl">▹</span>
                  <span className="text-sm sm:text-base text-muted-foreground">Desarrollador Junior recién comenzando</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-primary text-lg sm:text-xl">▹</span>
                  <span className="text-sm sm:text-base text-muted-foreground">Aprendiendo React, TypeScript y desarrollo web moderno</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-primary text-lg sm:text-xl">▹</span>
                  <span className="text-sm sm:text-base text-muted-foreground">Motivado por aprender y crecer profesionalmente</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
