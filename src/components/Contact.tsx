import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Github, Phone, Send } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Contact = () => {
  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      url: "mailto:isaias.burga99@gmail.com",
      label: "isaias.burga99@gmail.com",
    },
    {
      name: "Teléfono",
      icon: Phone,
      url: "tel:+593962923294",
      label: "0962923294",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/isaias-burga-ba8170189",
      label: "/in/isaiasburga",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/wiburga",
      label: "@wiburga",
    },
    {
      name: "TikTok",
      icon: TikTokIcon,
      url: "https://www.tiktok.com/@isaiasDev1",
      label: "@isaiasDev1",
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Conectemos
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Siempre estoy interesado en conocer nuevos proyectos y oportunidades
            de aprendizaje. Si tienes alguna pregunta o simplemente quieres
            saludar, ¡no dudes en contactarme!
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {socialLinks.map((link, index) => (
            <AnimatedSection key={link.name} delay={index * 0.05}>
              <motion.a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Card className="p-5 sm:p-6 backdrop-blur-sm bg-card/80 border-primary/10 hover:border-primary/50 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)]">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <link.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {link.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {link.label}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.a>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3} className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-shadow"
            asChild
          >
            <a href="mailto:isaias.burga99@gmail.com">
              <Send className="w-5 h-5 mr-2" />
              Envíame un Email
            </a>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;
