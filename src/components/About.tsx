import { Card } from "@/components/ui/card";
import Section3DWrapper from "@/components/Section3DWrapper";

const About = () => {
  return (
    <Section3DWrapper id="about" className="py-20 px-4" direction="right">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          Sobre Mí
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <Card className="p-8 bg-card border-border shadow-[var(--shadow-card)]">
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  ¡Hola! Soy Isaias Burga, estudiante de la Universidad de las Fuerzas Armadas ESPE. Estoy comenzando mi camino como desarrollador, con mucha pasión por aprender y crear soluciones tecnológicas.
                </p>
                <p className="text-lg leading-relaxed">
                  Mi viaje en la tecnología está recién comenzando, y cada día es una oportunidad para aprender algo nuevo. Me enfoco en desarrollar mis habilidades en desarrollo web y programación.
                </p>
                <p className="text-lg leading-relaxed">
                  Cuando no estoy estudiando o programando, me encanta explorar nuevas tecnologías y estar al día con las últimas tendencias en desarrollo.
                </p>
              </div>
            </Card>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Card className="p-8 bg-gradient-card border-border shadow-[var(--shadow-card)]">
              <h3 className="text-2xl font-semibold mb-6 text-primary">Datos Rápidos</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">▹</span>
                  <span className="text-muted-foreground">Estudiante de la Universidad de las Fuerzas Armadas ESPE</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">▹</span>
                  <span className="text-muted-foreground">Desarrollador Junior recién comenzando</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">▹</span>
                  <span className="text-muted-foreground">Aprendiendo React, TypeScript y desarrollo web moderno</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">▹</span>
                  <span className="text-muted-foreground">Motivado por aprender y crecer profesionalmente</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </Section3DWrapper>
  );
};

export default About;