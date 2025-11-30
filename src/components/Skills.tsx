import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Section3DWrapper from "@/components/Section3DWrapper";
import HolographicSkill from "@/components/3d/HolographicSkill";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js", "HTML/CSS"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
    },
    {
      title: "Herramientas y Otros",
      skills: ["Git", "Docker", "AWS", "Figma", "CI/CD", "Agile/Scrum"],
    },
  ];

  return (
    <Section3DWrapper id="skills" className="py-20 px-4 bg-secondary/30" direction="left" delay={0.1}>
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 animate-fade-in">
          Habilidades y Tecnologías
        </h2>
        
        {/* Holographic Skills Showcase - hidden on small screens for performance */}
        <div className="mb-8 sm:mb-12 hidden sm:grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {["React", "TypeScript", "Node.js", "PostgreSQL"].map((skill) => (
            <HolographicSkill key={skill} skill={skill} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={category.title}
              className="p-4 sm:p-6 bg-card border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)] animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-primary">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-[var(--transition-smooth)] cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section3DWrapper>
  );
};

export default Skills;