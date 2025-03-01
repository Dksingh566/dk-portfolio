
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Github, Linkedin, ExternalLink, Twitter } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { AnimatedText } from '@/components/ui/animated-text';
import { useElementInView } from '@/hooks/use-intersection-observer';

const TextLines = [
  "Hi, I'm Dheerendra Singh – UI/UX Designer & Front-End Developer.",
  "Crafting Digital Experiences | Building Future Tech"
];

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [matrixChars, setMatrixChars] = useState<string[][]>([]);
  const [heroRef, isVisible] = useElementInView<HTMLDivElement>({ threshold: 0.1 });
  
  // Matrix effect setup
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,./<>?'.split('');
    const rows = 15;
    const cols = 40;
    
    const initialMatrix = Array(rows).fill(0).map(() => 
      Array(cols).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)])
    );
    
    setMatrixChars(initialMatrix);
    
    const interval = setInterval(() => {
      setMatrixChars(prev => {
        // Update random positions in the matrix
        const newMatrix = [...prev];
        for (let i = 0; i < 10; i++) {
          const row = Math.floor(Math.random() * rows);
          const col = Math.floor(Math.random() * cols);
          newMatrix[row][col] = chars[Math.floor(Math.random() * chars.length)];
        }
        return newMatrix;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleTextComplete = () => {
    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % TextLines.length);
  };
  
  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Matrix background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10 select-none pointer-events-none z-0">
        <div className="matrix-bg w-full h-full">
          {matrixChars.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center opacity-60">
              {row.map((char, colIndex) => (
                <span
                  key={`${rowIndex}-${colIndex}`}
                  className="text-primary font-mono text-xs md:text-sm animate-matrix-effect"
                  style={{ 
                    animationDelay: `${(rowIndex * 0.1) + (colIndex * 0.01)}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div 
        className={`container-custom mx-auto relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0 transform translate-y-10"
        }`}
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center justify-center">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              Available for freelance work
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <AnimatedText
              text={TextLines[currentTextIndex]}
              className="inline-block"
              delay={500}
              charDelay={40}
              onComplete={handleTextComplete}
              repeat
              repeatDelay={4000}
            />
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8 animate-fade-in">
            I craft intuitive and engaging user interfaces that transform complex interactions into seamless experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button className="min-w-40 bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
              <a href="#projects">View My Projects</a>
            </Button>
            <Button className="min-w-40" variant="outline" size="lg">
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
          
          <div className="flex space-x-5 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 hover:text-primary transition-all duration-300"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 hover:text-primary transition-all duration-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={personalInfo.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 hover:text-primary transition-all duration-300"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" className="p-2 rounded-full hover:text-primary transition-colors">
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
