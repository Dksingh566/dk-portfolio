
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, X } from 'lucide-react';
import { useElementInView } from '@/hooks/use-intersection-observer';

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  link: string;
  github: string;
  featured?: boolean;
  details?: {
    challenge: string;
    solution: string;
    outcome: string;
  };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  category,
  image,
  technologies,
  link,
  github,
  featured = false,
  details,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [cardRef, isVisible] = useElementInView<HTMLDivElement>({ threshold: 0.2 });
  
  return (
    <Card 
      ref={cardRef}
      className={cn(
        "interactive-card overflow-hidden border-0 transition-all duration-500 bg-gradient-to-b from-secondary/50 to-secondary/20",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        featured ? "md:col-span-2" : "",
        expanded ? "scale-105 z-10" : ""
      )}
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden h-48 md:h-56">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">{category}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <CardTitle className="text-xl font-bold mb-2 text-gradient">{title}</CardTitle>
        <CardDescription className="text-sm mb-4 line-clamp-2">{description}</CardDescription>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-muted/50 hover:bg-muted/80">
              {tech}
            </Badge>
          ))}
          {technologies.length > 3 && (
            <Badge variant="outline" className="text-xs bg-muted/50 hover:bg-muted/80">
              +{technologies.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between p-6 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="text-xs hover:scale-105 transition-transform">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-secondary/90 backdrop-blur-lg border border-white/10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gradient">{title}</DialogTitle>
              <DialogDescription className="text-muted-foreground">{category}</DialogDescription>
            </DialogHeader>
            
            <div className="mt-4">
              <div className="relative overflow-hidden h-64 rounded-lg mb-6">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <p className="text-foreground/90">{description}</p>
                
                {details && (
                  <div className="space-y-4 mt-6">
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-1">Challenge</h4>
                      <p className="text-sm text-foreground/80">{details.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-1">Solution</h4>
                      <p className="text-sm text-foreground/80">{details.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-1">Outcome</h4>
                      <p className="text-sm text-foreground/80">{details.outcome}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-muted/50">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2 group" size="sm">
                    <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Live Preview
                  </Button>
                </a>
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 group" size="sm">
                    <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Source Code
                  </Button>
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="flex gap-2">
          <a href={github} target="_blank" rel="noopener noreferrer" className="glow-effect">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Github className="h-4 w-4" />
            </Button>
          </a>
          <a href={link} target="_blank" rel="noopener noreferrer" className="glow-effect">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
