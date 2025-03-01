
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, Github, Linkedin, ExternalLink } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      
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
          className="text-xl font-bold text-foreground hover:text-primary transition-colors"
        >
          <span className="text-primary">D</span>heerendra
        </a>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md relative",
                activeSection === item.href.substring(1)
                  ? "text-primary" 
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              {activeSection === item.href.substring(1) && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
              {item.name}
            </a>
          ))}
          
          <Button className="ml-4 bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="#contact">Let's Talk</a>
          </Button>
        </nav>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-secondary/90 backdrop-blur-xl border-white/10">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold">
                  <span className="text-primary">D</span>heerendra
                </span>
              </div>
              
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-4 py-3 text-base font-medium transition-all duration-200 rounded-md",
                      activeSection === item.href.substring(1)
                        ? "bg-muted/50 text-primary" 
                        : "text-foreground/80 hover:bg-muted/30 hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              
              <div className="mt-auto">
                <Button className="w-full mb-4">
                  <a href="#contact">Let's Talk</a>
                </Button>
                
                <div className="flex items-center justify-center space-x-3 pt-4 border-t border-white/10">
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default NavBar;
