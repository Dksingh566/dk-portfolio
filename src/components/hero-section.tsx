import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useElementInView } from '@/hooks/use-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from '@/lib/data';
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export function HeroSection() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [heroRef, isHeroVisible] = useElementInView<HTMLDivElement>({ threshold: 0.5 });
  
  useEffect(() => {
    if (heroRef && typeof heroRef === 'object' && 'current' in heroRef) {
      heroRef.current = heroSectionRef.current;
    }
  }, [heroRef]);
  
  return (
    <section 
      className={`min-h-screen relative flex flex-col items-center justify-center px-4 overflow-hidden ${
        isHeroVisible ? "opacity-100" : "opacity-0"
      }`} 
      id="home" 
      ref={(el) => {
        if (el) {
          // Using a type assertion to ensure el is treated as HTMLDivElement
          const divElement = el as HTMLDivElement;
          
          // For the heroRef from useElementInView, only update if it's an object with current
          if (heroRef && typeof heroRef === 'object' && 'current' in heroRef) {
            heroRef.current = divElement;
          }
          
          // Update our local ref
          heroSectionRef.current = divElement;
        }
      }}
    >
      <div className="container-custom mx-auto text-center relative z-10">
        <Avatar className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 shadow-md border-2 border-primary">
          <AvatarImage src={personalInfo.avatar} alt={personalInfo.name} className="object-cover" />
        </Avatar>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-md">
          Hi, I'm <span className="text-gradient">{personalInfo.name}</span>
        </h1>
        
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
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          {personalInfo.hero_description}
        </p>
        
        <div className="space-x-4">
          <Button size="lg" className="group">
            My Projects
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline">
            <a href="/contact">Contact Me</a>
          </Button>
        </div>
      </div>
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-primary/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-background to-transparent"></div>
        
        {/* Example animated shapes - customize these */}
        <div className="absolute top-1/4 left-10 w-8 h-8 bg-primary rounded-full animate-float opacity-40"></div>
        <div className="absolute top-1/3 right-20 w-6 h-6 bg-accent rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-1/4 left-20 w-4 h-4 bg-secondary rounded-full animate-float opacity-30"></div>
      </div>
    </section>
  );
}

export default HeroSection;
