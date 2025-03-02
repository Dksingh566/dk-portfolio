
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';

export function ContactButton() {
  const [isContactHovered, setIsContactHovered] = React.useState(false);

  return (
    <Button 
      className={cn(
        "ml-4 relative group overflow-hidden transition-all duration-300",
        isContactHovered ? "bg-background text-primary scale-105" : "bg-primary hover:bg-primary/80 text-primary-foreground"
      )}
      onMouseEnter={() => setIsContactHovered(true)}
      onMouseLeave={() => setIsContactHovered(false)}
      onClick={() => window.location.href = '/contact'}
    >
      <span className="flex items-center gap-2 relative z-10">
        Let's Talk
        <MessageSquare className={cn(
          "h-4 w-4 transition-all duration-300",
          isContactHovered ? "rotate-12" : ""
        )} />
      </span>
      <span className={cn(
        "absolute inset-0 border-2 border-primary rounded-md transition-all duration-300",
        isContactHovered ? "scale-105 opacity-100" : "scale-90 opacity-0"
      )}></span>
    </Button>
  );
}
