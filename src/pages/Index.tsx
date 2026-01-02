import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import LazySection from "@/components/LazySection";
import {
  AboutSkeleton,
  SkillsSkeleton,
  ExperienceSkeleton,
  ProjectsSkeleton,
  ContactSkeleton
} from "@/components/skeletons/SectionSkeletons";

// Lazy load heavy sections
const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
const Contact = lazy(() => import("@/components/Contact"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background animated-gradient noise-overlay">
      <CustomCursor />
      <ParticleBackground />
      <Navigation />
      <Hero />
      
      <LazySection fallback={<AboutSkeleton />}>
        <Suspense fallback={<AboutSkeleton />}>
          <About />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<SkillsSkeleton />}>
        <Suspense fallback={<SkillsSkeleton />}>
          <Skills />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<ExperienceSkeleton />}>
        <Suspense fallback={<ExperienceSkeleton />}>
          <Experience />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<ProjectsSkeleton />}>
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<ContactSkeleton />}>
        <Suspense fallback={<ContactSkeleton />}>
          <Contact />
        </Suspense>
      </LazySection>
      
      <Footer />
    </div>
  );
};

export default Index;
