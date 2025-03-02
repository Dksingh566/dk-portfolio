
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from '@/lib/data';
import { motion } from "framer-motion";

export function HeroSection() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  
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
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-md">
            Hi, I'm <span className="text-gradient">{personalInfo.name}</span>
          </h1>
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
          <Button size="lg" className="group w-full sm:w-auto animate-pulse hover:animate-none">
            My Projects
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto hover:bg-primary/10 transition-colors">
            <a href="/contact" className="w-full h-full flex items-center justify-center">Contact Me</a>
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex justify-center space-x-4"
        >
          {Object.entries(personalInfo.socials).map(([platform, url]) => (
            <a 
              key={platform} 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-200"
            >
              <span className="capitalize font-medium">{platform}</span>
            </a>
          ))}
        </motion.div>
      </div>
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-primary/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-background to-transparent"></div>
        
        {/* Animated shapes */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-1/4 left-10 w-8 h-8 bg-primary rounded-full opacity-40"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        />
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-1/3 right-20 w-6 h-6 bg-accent rounded-full opacity-50"
          style={{ animation: 'pulse-glow 4s ease-in-out infinite' }}
        />
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-1/4 left-20 w-4 h-4 bg-secondary rounded-full opacity-30"
          style={{ animation: 'float 5s ease-in-out infinite' }}
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-primary/20 rounded-full"
          style={{ animation: 'pulse-glow 7s ease-in-out infinite' }}
        />
      </div>
    </section>
  );
}

export default HeroSection;
