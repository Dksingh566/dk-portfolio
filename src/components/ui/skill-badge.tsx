
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useElementInView } from '@/hooks/use-intersection-observer';

interface SkillBadgeProps {
  name: string;
  level: number;
  icon?: string;
  className?: string;
  isActive?: boolean;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  name,
  level,
  icon,
  className,
  isActive = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const [badgeRef, isVisible] = useElementInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={badgeRef}
      className={cn(
        "relative group py-3 px-4 rounded-lg transition-all duration-300 cursor-pointer",
        "bg-muted/30 hover:bg-muted/50 backdrop-blur-sm border border-white/5",
        "transform hover:scale-105 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]",
        isActive && "border-primary/30 bg-muted/50",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{name}</span>
        <span className="text-xs text-primary font-mono">{level}%</span>
      </div>

      <div className="mt-2 h-1.5 w-full bg-secondary/70 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full bg-primary transition-all duration-500 ease-out rounded-full",
            hovered ? "animate-pulse-glow" : ""
          )}
          style={{ width: `${level}%` }}
        />
      </div>

      {(hovered || isActive) && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full z-10 w-40 pointer-events-none animate-fade-in">
          <div className="bg-secondary/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-lg">
            <div className="text-xs font-medium text-foreground mb-1">{name}</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Beginner</span>
                <span className="text-muted-foreground">Expert</span>
              </div>
              <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${level}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillBadge;
