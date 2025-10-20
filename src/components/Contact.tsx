import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const Contact = () => {
  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      url: "mailto:isaias.burga99@gmail.com",
      label: "isaias.burga99@gmail.com"
    },
    {
      name: "Teléfono",
      icon: Mail,
      url: "tel:+593962923294",
      label: "0962923294"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "www.linkedin.com/in/isaias-burga-ba8170189",
      label: "/in/isaiasburga"
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/wiburga",
      label: "@wiburga"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 animate-fade-in">
          Let's Connect
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Siempre estoy interesado en conocer nuevos proyectos y oportunidades de aprendizaje. Si tienes alguna pregunta o simplemente quieres saludar, ¡no dudes en contactarme!
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {socialLinks.map((link, index) => (
            <Card
              key={link.name}
              className="p-6 bg-card border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)] animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-[var(--transition-smooth)]">
                  <link.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-[var(--transition-smooth)]">
                    {link.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{link.label}</p>
                </div>
              </a>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)]"
            asChild
          >
            <a href="mailto:isaias.burga99@gmail.com">
              <Mail className="w-5 h-5 mr-2" />
              Envíame un Email
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;