
import React from 'react';
import { cn } from '@/lib/utils';
import { NavItem, navigateTo } from './nav-items';

interface DesktopNavProps {
  navItems: NavItem[];
  activeSection: string;
}

export function DesktopNav({ navItems, activeSection }: DesktopNavProps) {
  const [isResumeHovered, setIsResumeHovered] = React.useState(false);

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            navigateTo(item.href, item.name);
          }}
          onMouseEnter={() => item.name === 'Resume' && setIsResumeHovered(true)}
          onMouseLeave={() => item.name === 'Resume' && setIsResumeHovered(false)}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md relative hover:scale-105 flex items-center gap-1",
            activeSection === item.href.substring(1) && item.href.startsWith('#')
              ? "text-primary" 
              : "text-foreground/80 hover:text-foreground",
            item.name === 'Resume' && "bg-primary/10 hover:bg-primary/20"
          )}
        >
          {item.icon && <item.icon className={cn(
            "h-4 w-4 transition-transform duration-300",
            isResumeHovered && item.name === 'Resume' ? "rotate-12" : ""
          )} />}
          
          {activeSection === item.href.substring(1) && item.href.startsWith('#') && (
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
          )}
          {item.name}
        </a>
      ))}
    </nav>
  );
}
