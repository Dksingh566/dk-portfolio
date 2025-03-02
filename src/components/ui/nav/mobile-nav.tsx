
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Menu, Sun, Moon, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem, navigateTo } from './nav-items';
import { personalInfo } from '@/lib/data';

interface MobileNavProps {
  navItems: NavItem[];
  activeSection: string;
  theme: string;
  toggleTheme: () => void;
}

export function MobileNav({ navItems, activeSection, theme, toggleTheme }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden hover:bg-muted/50 hover:scale-110 transition-all duration-300">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-secondary/90 backdrop-blur-xl border-white/10">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold">
              <span className="text-primary">D</span>hirendra
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="hover:bg-muted/50 hover:scale-110 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(item.href, item.name);
                }}
                className={cn(
                  "px-4 py-3 text-base font-medium transition-all duration-200 rounded-md hover:scale-105 flex items-center gap-2",
                  activeSection === item.href.substring(1) && item.href.startsWith('#')
                    ? "bg-muted/50 text-primary" 
                    : "text-foreground/80 hover:bg-muted/30 hover:text-foreground",
                  item.name === 'Resume' && "bg-primary/10 hover:bg-primary/20"
                )}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </a>
            ))}
          </nav>
          
          <div className="mt-auto">
            <Button 
              className="w-full mb-4 hover:bg-primary/80 hover:scale-105 transition-all duration-300 group"
              onClick={() => window.location.href = '/contact'}
            >
              <span className="flex items-center gap-2">
                Let's Talk
                <MessageSquare className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </Button>
            
            <div className="flex items-center justify-center space-x-3 pt-4 border-t border-white/10">
              {Object.entries(personalInfo.socials).map(([platform, url]) => (
                <SocialLink key={platform} platform={platform} url={url} />
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface SocialLinkProps {
  platform: string;
  url: string;
}

function SocialLink({ platform, url }: SocialLinkProps) {
  const getIcon = (platform: string) => {
    const { Github, Linkedin, Twitter } = require('lucide-react');
    
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full hover:bg-white/10 transition-colors hover:scale-110 duration-300"
    >
      {getIcon(platform)}
    </a>
  );
}
