
import React from 'react';
import CursorEffect from '@/components/cursor-effect';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import ProjectsSection from '@/components/projects-section';
import SkillsSection from '@/components/skills-section';
import { Footer } from '@/components/ui/footer';
import { NavBar } from '@/components/ui/nav-bar';
import { ThemeProvider } from '@/hooks/use-theme';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <CursorEffect color="#4ADE80" />
        <NavBar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
        </main>
        <Footer />
        <Toaster />
        <SonnerToaster position="bottom-right" />
      </div>
    </ThemeProvider>
  );
};

export default Index;
