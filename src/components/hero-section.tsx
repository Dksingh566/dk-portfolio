import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MousePointer, Code, Eye, Sparkles, ArrowDown, Star } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from '@/lib/data';
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export function HeroSection() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [animateNow, setAnimateNow] = useState(false);
  const controls = useAnimation();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;
      
      setMousePosition({ x: moveX, y: moveY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useEffect(() => {
    controls.start({
      x: mousePosition.x * 15,
      y: mousePosition.y * 15,
      transition: { type: 'spring', stiffness: 150 }
    });
  }, [mousePosition, controls]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setTimeout(() => setAnimateNow(true), 300);
        }
      },
      { threshold: 0.3 }
    );
    
    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }
    
    return () => {
      if (heroSectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProjectsClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
      toast.success("Loading my projects...", {
        description: "Scroll down to see my latest work!",
        icon: <Code className="h-5 w-5 text-primary" />,
        duration: 3000
      });
    }
  };

  const handleButtonHover = () => {
    const buttonGlow = document.querySelector('.button-glow');
    if (buttonGlow) {
      buttonGlow.classList.add('pulse-animation');
      setTimeout(() => {
        buttonGlow.classList.remove('pulse-animation');
      }, 1000);
    }
  };
  
  return (
    <section 
      className={`min-h-screen relative flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 overflow-hidden transition-opacity duration-1000 ${
        isHeroVisible ? "opacity-100" : "opacity-0"
      }`} 
      id="home" 
      ref={heroSectionRef}
    >
      <div className="container-custom mx-auto text-center relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="perspective-container"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-md"
            animate={controls}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            Hi, I'm <span className="text-gradient relative inline-block">
              {personalInfo.name}
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary/70 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.2 }}
              />
              <AnimatePresence>
                {isHovering && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute -right-6 -top-6"
                  >
                    <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          </motion.h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="min-h-[40px] md:min-h-[50px]"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-6 sm:mb-8 text-shadow-sm">
            <TypeAnimation
              sequence={[
                'Full-Stack Developer',
                1000,
                'UI/UX Designer',
                1000,
                'Software Engineer',
                1000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
            />
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 px-2 leading-relaxed
            xs:text-[10px] xs:leading-tight">
            {personalInfo.bio}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:space-x-4"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button 
              size="lg" 
              className="group w-full sm:w-auto relative overflow-hidden"
              onClick={handleProjectsClick}
              onMouseEnter={handleButtonHover}
            >
              <motion.span 
                className="relative z-10 flex items-center"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                My Projects
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.span>
              <span className="absolute inset-0 w-full h-full bg-primary/80 animate-pulse button-glow"></span>
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto hover:bg-primary/10 transition-colors relative group"
              onClick={() => {
                window.location.href = '/contact';
                toast("Let's connect!", {
                  description: "I'm excited to hear about your project!",
                  icon: <Eye className="h-5 w-5 text-primary" />
                });
              }}
              onMouseEnter={handleButtonHover}
            >
              <span className="relative z-10">Contact Me</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 sm:mt-12 flex justify-center flex-wrap gap-3 sm:gap-4"
        >
          {Object.entries(personalInfo.socials).map(([platform, url], index) => (
            <motion.a 
              key={platform} 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2 relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={animateNow ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.8 + index * 0.1 }
              } : {}}
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => toast.info(`View my ${platform} profile`, { duration: 1500 })}
            >
              <span className="capitalize text-sm sm:text-base font-medium">{platform}</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-primary/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-background to-transparent"></div>
        
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full opacity-${20 + i * 5} bg-primary/50`}
            style={{
              width: `${5 + i * 1.5}px`,
              height: `${5 + i * 1.5}px`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              y: [0, -(10 + i * 2), 0],
              x: [0, (5 + i), 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
        
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-primary/40"
            style={{
              top: `${Math.random() * 90 + 5}%`,
              left: `${Math.random() * 90 + 5}%`,
              transform: `rotate(${Math.random() * 45}deg) scale(${0.7 + Math.random() * 0.5})`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          >
            <Star className="h-5 w-5 stroke-[1.5px]" />
          </motion.div>
        ))}
        
        {['circle', 'triangle', 'square', 'hexagon'].map((shape, i) => {
          let shapeJSX;
          if (shape === 'circle') {
            shapeJSX = <div className="w-full h-full rounded-full border-2 border-primary/20"></div>;
          } else if (shape === 'triangle') {
            shapeJSX = <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-primary/20"></div>;
          } else if (shape === 'square') {
            shapeJSX = <div className="w-full h-full border-2 border-primary/20"></div>;
          } else {
            shapeJSX = <div className="w-full h-full border-2 border-primary/20 rotate-45"></div>;
          }
          
          return (
            <motion.div
              key={`shape-${i}`}
              className="absolute"
              style={{
                width: shape === 'triangle' ? 'auto' : `${20 + i * 5}px`,
                height: shape === 'triangle' ? 'auto' : `${20 + i * 5}px`,
                top: `${10 + i * 20}%`,
                left: `${5 + i * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
            >
              {shapeJSX}
            </motion.div>
          );
        })}
      </div>
      
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div 
            className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div 
              className="flex flex-col items-center cursor-pointer"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <ArrowDown className="h-5 w-5 text-primary mb-2" />
              </motion.div>
              <motion.div 
                className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-primary/50 rounded-full flex justify-center p-1 mx-auto"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  boxShadow: [
                    '0 0 0px rgba(74, 222, 128, 0.3)',
                    '0 0 10px rgba(74, 222, 128, 0.6)',
                    '0 0 0px rgba(74, 222, 128, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div 
                  className="w-1 h-2 bg-primary/80 rounded-full"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <p className="text-xs text-muted-foreground mt-2">Scroll Down</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-4 top-4 bottom-4 border border-primary/20 rounded-xl pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/80 to-transparent shadow-[0_0_8px_rgba(74,222,128,0.6)]"
          animate={{ 
            left: ['-100%', '100%'],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/80 to-transparent shadow-[0_0_8px_rgba(74,222,128,0.6)]"
          animate={{ 
            right: ['-100%', '100%'],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-primary/80 to-transparent shadow-[0_0_8px_rgba(74,222,128,0.6)]"
          animate={{ 
            top: ['-100%', '100%'],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute right-0 bottom-0 h-full w-[2px] bg-gradient-to-b from-transparent via-primary/80 to-transparent shadow-[0_0_8px_rgba(74,222,128,0.6)]"
          animate={{ 
            bottom: ['-100%', '100%'],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "linear"
          }}
        />
      </div>
      
      <style>
        {`
        @keyframes pulse-animation {
          0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(74, 222, 128, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }
        .pulse-animation {
          animation: pulse-animation 1s cubic-bezier(0.4, 0, 0.6, 1) 1;
        }
        
        @media (max-width: 360px) {
          .xs\\:text-\\[10px\\] {
            font-size: 10px;
          }
          .xs\\:leading-tight {
            line-height: 1.2;
          }
        }
        `}
      </style>
    </section>
  );
}

export default HeroSection;
