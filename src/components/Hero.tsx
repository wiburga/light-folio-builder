import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6">
            <span className="text-primary">Isaias Burga</span>
          </h1>

          <div className="mb-6 sm:mb-8">
            <p className="text-xl sm:text-3xl md:text-4xl text-foreground/90 font-medium tracking-wide">
              Desarrollador de Software
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-3 italic">
              Autodidacta <span className="text-primary mx-2">+</span> Formación Universitaria
            </p>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-10 sm:mb-14 max-w-2xl mx-auto px-2 leading-relaxed">
            Apasionado por la tecnología y el desarrollo de software. Creando
            soluciones digitales innovadoras y transformando ideas en proyectos
            funcionales.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6"
              onClick={() => scrollToSection("projects")}
            >
              Ver Mi Trabajo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary text-base px-8 py-6"
              onClick={() => scrollToSection("contact")}
            >
              Contáctame
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer bg-transparent border-none z-10"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-8 h-8 text-primary" />
      </button>
    </section>
  );
};

export default Hero;
