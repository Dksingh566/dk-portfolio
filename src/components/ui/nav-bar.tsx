
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { navItems } from './nav/nav-items';
import { DesktopNav } from './nav/desktop-nav';
import { ContactButton } from './nav/contact-button';
import { MobileNav } from './nav/mobile-nav';

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = navItems
        .filter(item => item.href.startsWith('#')) // Only check sections on current page
        .map(item => item.href.substring(1));
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-background/80 backdrop-blur-lg shadow-md" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container-custom mx-auto flex items-center justify-between">
        <a 
          href="#home"
          className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-300 transform hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-primary">D</span>hirendra
        </a>
        
        <DesktopNav navItems={navItems} activeSection={activeSection} />
        
        <div className="hidden md:flex items-center">
          <ContactButton />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="ml-2 hover:bg-muted/50 hover:scale-110 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        
        <MobileNav 
          navItems={navItems} 
          activeSection={activeSection} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      </div>
    </header>
  );
}

export default NavBar;
