
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
  onComplete?: () => void;
  repeat?: boolean;
  repeatDelay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  delay = 0,
  charDelay = 50,
  onComplete,
  repeat = false,
  repeatDelay = 2000,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    let mounted = true;
    
    const startTyping = () => {
      if (!mounted) return;
      
      setIsTyping(true);
      setDisplayedText('');
      
      let index = 0;
      
      const type = () => {
        if (!mounted) return;
        
        if (index < text.length) {
          setDisplayedText(prev => prev + text.charAt(index));
          index++;
          timeoutRef.current = setTimeout(type, charDelay);
        } else {
          setIsTyping(false);
          if (onComplete) onComplete();
          
          if (repeat) {
            timeoutRef.current = setTimeout(() => {
              if (mounted) {
                setDisplayedText('');
                startTyping();
              }
            }, repeatDelay);
          }
        }
      };
      
      type();
    };
    
    // Initial delay
    timeoutRef.current = setTimeout(startTyping, delay);
    
    return () => {
      mounted = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, delay, charDelay, onComplete, repeat, repeatDelay]);
  
  return (
    <span className={cn(className)}>
      {displayedText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
};

interface RotatingTextProps {
  texts: string[];
  className?: string;
  textClassName?: string;
  delay?: number;
  duration?: number;
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  className,
  textClassName,
  delay = 3000,
  duration = 500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayText, setDisplayText] = useState(texts[0]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % texts.length);
        setDisplayText(texts[(currentIndex + 1) % texts.length]);
        setIsAnimating(false);
      }, duration);
    }, delay);
    
    return () => clearInterval(interval);
  }, [texts, delay, duration, currentIndex]);
  
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "transition-all duration-500",
          isAnimating ? "opacity-0 -translate-y-5" : "opacity-100 translate-y-0",
          textClassName
        )}
      >
        {displayText}
      </div>
    </div>
  );
};

export default AnimatedText;
