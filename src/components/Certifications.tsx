import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Award, Cloud, Lightbulb, Calendar, Building2, Eye } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

type Certification = {
  icon: typeof Award;
  title: string;
  institution: string;
  date?: string;
  tag: string;
  inProgress?: boolean;
  file?: string;
};

const certifications: Certification[] = [
  {
    icon: Lightbulb,
    title: "Hackatón Internacional de Innovación Educativa Juvenil «Ideas que Transforman»",
    institution: "Empower Youth SV · Santa Tecla, El Salvador",
    date: "26 y 27 de septiembre de 2026 · 48 horas",
    tag: "Certificado de participación",
    file: "/certificados/hackaton-ideas-que-transforman.png",
  },
  {
    icon: Award,
    title: "10 Principios para ser un Agente de Cambio (Líder Lab)",
    institution: "Corporación Líderes para Gobernar, con aval académico de UNESCO (Cátedra UNESCO UTPL Ecuador)",
    date: "Julio 2026 · 20 horas",
    tag: "Diploma",
    file: "/certificados/liderlab-agente-de-cambio.jpg",
  },
  {
    icon: Cloud,
    title: "Fundamentos de Microsoft Azure",
    institution: "Microsoft Learn",
    tag: "En curso",
    inProgress: true,
  },
];

const Certifications = () => {
  const [open, setOpen] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Certificaciones</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {certifications.map((cert, index) => (
            <AnimatedSection key={cert.title} delay={index * 0.1}>
              <Card
                className={`h-full p-6 flex flex-col backdrop-blur-sm bg-card/80 hover:border-primary/30 transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)] ${
                  cert.inProgress ? "border-dashed border-primary/30" : "border-primary/10"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <cert.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge
                    variant={cert.inProgress ? "outline" : "secondary"}
                    className={cert.inProgress ? "border-dashed border-primary/50 text-primary" : "bg-primary/10 text-primary"}
                  >
                    {cert.tag}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3 leading-snug">{cert.title}</h3>
                <p className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                  <Building2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/70" />
                  {cert.institution}
                </p>
                {cert.date && (
                  <p className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/70" />
                    {cert.date}
                  </p>
                )}
                {cert.file && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-6 w-full border-primary/30 hover:border-primary/60 hover:bg-primary/10"
                    onClick={() => setOpen(cert)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver certificado
                  </Button>
                )}
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="pr-6">{open?.title}</DialogTitle>
            <DialogDescription>{open?.institution}</DialogDescription>
          </DialogHeader>
          {open?.file && (
            <img src={open.file} alt={`Certificado: ${open.title}`} className="w-full h-auto rounded-md" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Certifications;
