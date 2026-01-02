import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import LazySection from "@/components/LazySection";

// Lazy load heavy sections
const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
const Contact = lazy(() => import("@/components/Contact"));

const SectionLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background animated-gradient noise-overlay">
      <CustomCursor />
      <ParticleBackground />
      <Navigation />
      <Hero />
      
      <LazySection rootMargin="200px">
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
      </LazySection>
      
      <LazySection rootMargin="200px">
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
      </LazySection>
      
      <LazySection rootMargin="200px">
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
      </LazySection>
      
      <LazySection rootMargin="200px">
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
      </LazySection>
      
      <LazySection rootMargin="200px">
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </LazySection>
      
      <Footer />
    </div>
  );
};

export default Index;
