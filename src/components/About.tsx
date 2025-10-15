import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <Card className="p-8 bg-card border-border shadow-[var(--shadow-card)]">
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Hi! I'm a passionate developer with a love for creating elegant solutions to complex problems. With years of experience in full-stack development, I specialize in building modern web applications that are both beautiful and functional.
                </p>
                <p className="text-lg leading-relaxed">
                  My journey in tech started with a curiosity about how things work, and it has evolved into a career where I get to bring ideas to life through code. I'm constantly learning and adapting to new technologies to stay at the forefront of web development.
                </p>
                <p className="text-lg leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
                </p>
              </div>
            </Card>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Card className="p-8 bg-gradient-card border-border shadow-[var(--shadow-card)]">
              <h3 className="text-2xl font-semibold mb-6 text-primary">Quick Facts</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">▹</span>
                  <span className="text-muted-foreground">5+ years of professional experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">▹</span>
                  <span className="text-muted-foreground">Specialized in React, TypeScript, and Node.js</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">▹</span>
                  <span className="text-muted-foreground">Strong focus on user experience and accessibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">▹</span>
                  <span className="text-muted-foreground">Active contributor to open-source projects</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;