
import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, ExternalLink, Mail, Phone } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-white/5 py-12">
      <div className="container-custom mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-2xl font-bold">
              <span className="text-primary">D</span>heerendra
            </a>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              Crafting digital experiences that blend beautiful design with exceptional functionality.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-primary" />
              <a href={`mailto:${personalInfo.email}`} className="text-sm hover:text-primary transition-colors">
                {personalInfo.email}
              </a>
            </div>
            
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-primary" />
              <a href={`tel:${personalInfo.phone}`} className="text-sm hover:text-primary transition-colors">
                {personalInfo.phone}
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Dheerendra Singh. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={personalInfo.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
