
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Github, Linkedin, Twitter, ArrowRight, ExternalLink, MousePointer } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { AnimatedText } from '@/components/ui/animated-text';
import { useElementInView } from '@/hooks/use-intersection-observer';

const TextLines = [
  "Hi, I'm Dhirendra Singh – UI/UX Designer & Front-End Developer.",
  "Crafting Digital Experiences | Building Future Tech"
];

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [matrixChars, setMatrixChars] = useState<string[][]>([]);
  const [heroRef, isVisible] = useElementInView<HTMLDivElement>({ threshold: 0.1 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
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

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroSectionRef.current) {
        const rect = heroSectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (heroSectionRef.current) {
        const scrollY = window.scrollY;
        const sectionHeight = heroSectionRef.current.offsetHeight;
        const progress = Math.min(scrollY / sectionHeight, 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleTextComplete = () => {
    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % TextLines.length);
  };

  // Function to play sound effect on button click
  const playClickSound = () => {
    const audio = new Audio('/click-sound.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Ignore errors if sound can't be played
      console.log('Sound playback failed, likely due to browser autoplay policies');
    });
  };
  
  return (
    <section 
      id="home" 
      ref={(el) => {
        if (el) {
          // Using a type assertion to ensure el is treated as HTMLDivElement
          const divElement = el as HTMLDivElement;
          
          // Using function-based ref pattern for the heroRef from useElementInView
          if (typeof heroRef === 'function') {
            heroRef(divElement);
          }
          
          // Update our local ref
          heroSectionRef.current = divElement;
        }
      }}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Parallax matrix background effect */}
      <div 
        className="absolute inset-0 overflow-hidden opacity-10 select-none pointer-events-none z-0"
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
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

      {/* Glowing orb background effect */}
      <div 
        className="absolute hidden md:block w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
        style={{
          left: `calc(50% + ${mousePosition.x * 100 - 50}px)`,
          top: `calc(50% + ${mousePosition.y * 100 - 50}px)`,
          transform: 'translate(-50%, -50%)',
          opacity: 0.3 + (scrollProgress * -0.3),
          transition: 'all 0.5s ease-out'
        }}
      ></div>

      <div 
        className={`container-custom mx-auto relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0 transform translate-y-10"
        }`}
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center justify-center animate-pulse">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer">
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
            <Button 
              className={`min-w-40 relative overflow-hidden group ${
                isButtonHovered
                  ? "bg-background border-2 border-primary text-primary"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              } hover:scale-105 transition-all duration-300`}
              size="lg"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              onClick={() => {
                playClickSound();
                const projectsSection = document.getElementById('projects');
                if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Projects
                <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${
                  isButtonHovered ? "translate-x-1" : ""
                }`} />
              </span>
              <span className={`absolute inset-0 bg-primary/10 transform origin-left transition-transform duration-500 ${
                isButtonHovered ? "scale-x-100" : "scale-x-0"
              }`}></span>
            </Button>
            <Button 
              className="min-w-40 hover:scale-105 transition-all duration-300 group" 
              variant="outline" 
              size="lg"
              onClick={() => {
                playClickSound();
                window.location.href = '/contact';
              }}
            >
              <span className="flex items-center gap-2">
                Get in Touch
                <MousePointer className="h-4 w-4 group-hover:translate-y-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>
          
          <div className="flex space-x-5 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-primary/20"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-primary/20"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={personalInfo.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-primary/20"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a 
          href="#about" 
          className="p-2 rounded-full hover:text-primary transition-colors hover:scale-110 duration-300"
          onClick={(e) => {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
