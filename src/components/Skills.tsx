import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Monitor, Server, Wrench } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

const Skills = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const skillCategories = [
    {
      title: "Frontend",
      icon: Monitor,
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js", "HTML/CSS"],
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Backend",
      icon: Server,
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Herramientas",
      icon: Wrench,
      skills: ["Git", "Docker", "AWS", "Figma", "CI/CD", "Agile/Scrum"],
      color: "from-purple-500/20 to-pink-500/20",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="skills"
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(221 83% 53%) 0%, hsl(280 70% 50%) 50%, transparent 70%)",
          y,
        }}
      />
      
      {/* Floating particles */}
      <FloatingParticles count={15} color="hsl(221 83% 53%)" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-glow-subtle">
            Habilidades y Tecnologías
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card className="h-full p-6 glass hover:shadow-[var(--shadow-glow)] transition-all duration-500 group overflow-hidden relative">
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
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
                        transition={{
                          delay: index * 0.1 + skillIndex * 0.05,
                          duration: 0.3,
                        }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default backdrop-blur-sm"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
