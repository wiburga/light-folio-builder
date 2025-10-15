import { Card } from "@/components/ui/card";

const Experience = () => {
  const experiences = [
    {
      company: "Tech Innovators Inc.",
      position: "Senior Full Stack Developer",
      period: "2021 - Present",
      description: "Leading development of enterprise web applications, mentoring junior developers, and implementing best practices for code quality and performance.",
      achievements: [
        "Improved application performance by 40%",
        "Led team of 5 developers",
        "Implemented CI/CD pipeline"
      ]
    },
    {
      company: "Digital Solutions Co.",
      position: "Full Stack Developer",
      period: "2019 - 2021",
      description: "Developed and maintained multiple client projects, working with cross-functional teams to deliver high-quality web applications.",
      achievements: [
        "Built 10+ successful projects",
        "Reduced bug count by 60%",
        "Implemented responsive designs"
      ]
    },
    {
      company: "Startup Labs",
      position: "Junior Developer",
      period: "2018 - 2019",
      description: "Started my professional journey building web applications and learning modern development practices in a fast-paced startup environment.",
      achievements: [
        "Learned React and Node.js",
        "Contributed to 5+ projects",
        "Improved development workflow"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          Experience
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-1/2" />
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative animate-slide-up ${
                  index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 md:translate-x-0 top-6 animate-glow" />
                
                <Card className="ml-8 md:ml-0 p-6 bg-card border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)]">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-primary">
                      {exp.position}
                    </h3>
                    <p className="text-lg text-foreground font-medium">
                      {exp.company}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {exp.period}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                    <ul className="space-y-2 mt-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary text-lg">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;