import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingCodeField from "@/components/3d/FloatingCodeField";
import FPSMonitor from "@/components/FPSMonitor";

const Index = () => {
  return (
    <>
      {/* 3D Floating Code Field - visible across all pages */}
      <FloatingCodeField />
      <FPSMonitor />
      <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
