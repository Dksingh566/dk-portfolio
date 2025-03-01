
import React from 'react';
import CursorEffect from '@/components/cursor-effect';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import ProjectsSection from '@/components/projects-section';
import SkillsSection from '@/components/skills-section';
import { Footer } from '@/components/ui/footer';
import { NavBar } from '@/components/ui/nav-bar';
import { ThemeProvider } from '@/hooks/use-theme';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <CursorEffect />
        <NavBar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
