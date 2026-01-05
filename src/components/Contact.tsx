import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Github, Phone, Send } from "lucide-react";

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
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      url: "mailto:isaias.burga99@gmail.com",
      label: "isaias.burga99@gmail.com",
      color: "group-hover:text-red-400",
    },
    {
      name: "Teléfono",
      icon: Phone,
      url: "tel:+593962923294",
      label: "0962923294",
      color: "group-hover:text-green-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/isaias-burga-ba8170189",
      label: "/in/isaiasburga",
      color: "group-hover:text-blue-400",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/wiburga",
      label: "@wiburga",
      color: "group-hover:text-purple-400",
    },
    {
      name: "TikTok",
      icon: TikTokIcon,
      url: "https://www.tiktok.com/@isaiasDev1",
      label: "@isaiasDev1",
      color: "group-hover:text-pink-400",
    },
  ];

  return (
    <section ref={containerRef} id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(221 83% 53%) 0%, transparent 60%)",
          y,
        }}
      />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-glow-subtle">
            Conectemos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Siempre estoy interesado en conocer nuevos proyectos y oportunidades
            de aprendizaje. Si tienes alguna pregunta o simplemente quieres
            saludar, ¡no dudes en contactarme!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="p-5 sm:p-6 glass hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <link.icon
                        className={`w-6 h-6 text-primary transition-colors duration-300 ${link.color}`}
                      />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {link.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {link.label}
                      </p>
                    </div>
                  </div>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-300 text-base px-8 py-6"
              asChild
            >
              <a href="mailto:isaias.burga99@gmail.com">
                <Send className="w-5 h-5 mr-2" />
                Envíame un Email
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
