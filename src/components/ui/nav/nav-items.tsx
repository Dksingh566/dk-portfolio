
import React from 'react';
import { FileText, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export interface NavItem {
  name: string;
  href: string;
  icon?: React.ElementType;
}

export const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Resume', href: '#resume', icon: FileText },
  { name: 'Contact', href: '/contact' },
];

// Function to handle navigation
export const navigateTo = (href: string, name: string) => {
  if (href.startsWith('#')) {
    // Internal section navigation
    const element = document.getElementById(href.substring(1));
    if (element) {
      // Small delay for mobile menu to close before scrolling
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300); // Increased delay for better mobile experience
    }
    
    // Special case for Resume
    if (name === 'Resume') {
      handleResumeClick();
    }
  } else {
    // External page navigation
    window.location.href = href;
  }
};

// Function to handle resume click
export const handleResumeClick = () => {
  toast.success("Resume is now downloading!", {
    description: "Thank you for your interest in my profile.",
    position: "bottom-right",
    duration: 3000
  });
  
  // Simulate resume download (in a real app, this would be an actual download link)
  setTimeout(() => {
    toast.info("Resume downloaded successfully!", {
      position: "bottom-right"
    });
  }, 2000);
};
