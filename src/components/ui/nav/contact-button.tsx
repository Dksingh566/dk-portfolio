
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MessageSquare, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ContactButton() {
  const [isContactHovered, setIsContactHovered] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Button 
      className={cn(
        "ml-4 relative group overflow-hidden transition-all duration-300",
        isContactHovered ? "bg-background text-primary border border-primary scale-105" : "bg-primary hover:bg-primary/80 text-primary-foreground"
      )}
      onMouseEnter={() => setIsContactHovered(true)}
      onMouseLeave={() => setIsContactHovered(false)}
      onClick={() => navigate('/contact')}
    >
      <span className="flex items-center gap-2 relative z-10">
        {isContactHovered ? (
          <>
            Let's Connect
            <Sparkles className="h-4 w-4 animate-pulse" />
          </>
        ) : (
          <>
            Let's Talk
            <MessageSquare className="h-4 w-4" />
          </>
        )}
      </span>
      <span className={cn(
        "absolute inset-0 border-2 border-primary rounded-md transition-all duration-300",
        isContactHovered ? "scale-105 opacity-100" : "scale-90 opacity-0"
      )}></span>
      {isContactHovered && (
        <span className="absolute inset-0 bg-primary/10 animate-pulse"></span>
      )}
    </Button>
  );
}
