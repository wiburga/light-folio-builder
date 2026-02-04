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
                className="block group/card"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="relative p-5 sm:p-6 overflow-hidden backdrop-blur-xl bg-gradient-to-br from-card/90 via-card/70 to-card/50 border border-primary/10 transition-all duration-500 group-hover/card:border-primary/40 group-hover/card:shadow-[0_0_40px_hsl(var(--primary)/0.2),0_10px_40px_-15px_hsl(var(--primary)/0.25)] shadow-[0_8px_32px_hsl(0_0%_0%/0.4)]">
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-[-1px] bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 rounded-lg blur-sm" />
                  </div>
                  
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000" />
                  </div>

                  <div className="relative flex items-center gap-4">
                    <motion.div 
                      className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm border border-primary/20 group-hover/card:bg-primary/20 group-hover/card:border-primary/40 group-hover/card:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300"
                      whileHover={{ rotate: 6, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <link.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-foreground group-hover/card:text-primary transition-colors duration-300">
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
