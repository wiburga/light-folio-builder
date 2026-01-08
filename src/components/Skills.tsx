import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Monitor, Server, Wrench } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Skills = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yFloat1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const yFloat2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  const skillCategories = [
    {
      title: "Frontend",
      icon: Monitor,
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js", "HTML/CSS"],
    },
    {
      title: "Backend",
      icon: Server,
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
    },
    {
      title: "Herramientas",
      icon: Wrench,
      skills: ["Git", "Docker", "AWS", "Figma", "CI/CD", "Agile/Scrum"],
    },
  ];

  return (
    <section ref={ref} id="skills" className="py-24 px-4 relative overflow-hidden">
      {/* Parallax decorative elements */}
      <motion.div
        style={{ y: yFloat1 }}
        className="absolute top-32 left-10 w-20 h-20 border-2 border-primary/10 rounded-full"
      />
      <motion.div
        style={{ y: yFloat2, scale }}
        className="absolute bottom-32 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
      />
      <motion.div
        style={{ y: yFloat1 }}
        className="absolute top-1/3 left-1/4 w-6 h-6 bg-primary/10 rounded-sm rotate-45"
      />
      <motion.div
        style={{ y: yFloat2 }}
        className="absolute bottom-1/4 right-1/3 w-12 h-12 border border-primary/15 rounded-lg"
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Habilidades y Tecnologías
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <AnimatedSection key={category.title} delay={categoryIndex * 0.1}>
              <Card className="h-full p-6 backdrop-blur-sm bg-card/80 border-primary/10 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)] transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + skillIndex * 0.05 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-secondary/50 text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
