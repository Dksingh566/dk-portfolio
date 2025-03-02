
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MousePointer, Code, Eye } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from '@/lib/data';
import { motion, useAnimation } from "framer-motion";
import { toast } from "sonner";

export function HeroSection() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  
  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate distance from center (normalized between -1 and 1)
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;
      
      setMousePosition({ x: moveX, y: moveY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Parallax effect on mouse movement
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
      },
      { threshold: 0.5 }
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
  
  return (
    <section 
      className={`min-h-screen relative flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 overflow-hidden transition-opacity duration-700 ${
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-md"
            animate={controls}
          >
            Hi, I'm <span className="text-gradient relative">
              {personalInfo.name}
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary/70 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </span>
          </motion.h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="min-h-[40px] md:min-h-[50px]"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-8 text-shadow-sm">
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
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            {personalInfo.bio}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:space-x-4"
        >
          <Button 
            size="lg" 
            className="group w-full sm:w-auto relative overflow-hidden"
            onClick={handleProjectsClick}
          >
            <span className="relative z-10 flex items-center">
              My Projects
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 w-full h-full bg-primary/80 animate-pulse"></span>
          </Button>
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
          >
            <span className="relative z-10">Contact Me</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex justify-center space-x-4"
        >
          {Object.entries(personalInfo.socials).map(([platform, url]) => (
            <motion.a 
              key={platform} 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2 relative group"
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => toast.info(`View my ${platform} profile`, { duration: 1500 })}
            >
              <span className="capitalize font-medium">{platform}</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-primary/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-background to-transparent"></div>
        
        {/* Interactive animated shapes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full opacity-${20 + i * 10} bg-primary/50`}
            style={{
              width: `${8 + i * 2}px`,
              height: `${8 + i * 2}px`,
              top: `${20 + i * 15}%`,
              left: `${15 + i * 12}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>
      
      {/* Mouse scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center opacity-80"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center p-1 mx-auto"
          animate={{ opacity: [0.5, 1, 0.5] }}
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
    </section>
  );
}

export default HeroSection;
