import { Card } from "@/components/ui/card";
import { User, GraduationCap, Code, Rocket } from "lucide-react";

const About = () => {
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
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Sobre Mí
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-stretch">
          <Card className="h-full p-6 sm:p-8">
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

          <Card className="h-full p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-primary">
              Datos Rápidos
            </h3>
            <ul className="space-y-4">
              {quickFacts.map((fact, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <fact.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground">
                    {fact.text}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
