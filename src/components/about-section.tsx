
import React, { useState, useEffect } from 'react';
import { personalInfo, experience } from '@/lib/data';
import { useElementInView } from '@/hooks/use-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, CheckCircle2, Download, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export function AboutSection() {
  const [mainRef, isMainVisible] = useElementInView<HTMLDivElement>({ threshold: 0.2 });
  const [timelineRef, isTimelineVisible] = useElementInView<HTMLDivElement>({ threshold: 0.2 });
  const [imageHovered, setImageHovered] = useState(false);
  const [isHoveredMap, setIsHoveredMap] = useState<Record<string, boolean>>({});
  const controls = useAnimation();
  
  // Parallax effect for image
  useEffect(() => {
    if (isMainVisible) {
      controls.start({ 
        scale: 1,
        opacity: 1,
        transition: { 
          duration: 0.7,
          type: "spring",
          stiffness: 100
        } 
      });
    } else {
      controls.start({ scale: 0.95, opacity: 0 });
    }
  }, [isMainVisible, controls]);
  
  const handleHover = (id: string, isHovered: boolean) => {
    setIsHoveredMap(prev => ({ ...prev, [id]: isHovered }));
  };
  
  const handleDownloadCV = () => {
    toast.success("Resume downloading!", {
      description: "Thank you for your interest in my profile.",
      icon: <Download className="h-5 w-5 text-primary" />,
      duration: 3000
    });
    
    // Simulate resume download
    setTimeout(() => {
      toast.info("Resume downloaded successfully!");
    }, 2000);
  };
  
  return (
    <section id="about" className="section-spacing relative overflow-hidden">
      <div className="container-custom mx-auto relative z-10">
        <div 
          ref={mainRef} 
          className={`transition-all duration-1000 ${
            isMainVisible ? "opacity-100" : "opacity-0 transform translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 rounded-full">
              About Me
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Designing & <span className="text-gradient">Developing</span> Digital Experiences
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I blend creativity with technical expertise to build engaging user interfaces and seamless experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={controls}
              className="relative perspective-container"
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
            >
              <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden relative glass-panel border-primary/20 transition-all duration-300 shadow-lg hover:shadow-primary/20 h-[350px] sm:h-[400px] lg:h-[450px]">
                <img
                  src="/lovable-uploads/ce623ae9-1aaa-4274-bd07-81dfef61dffb.png"
                  alt={personalInfo.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${imageHovered ? 'scale-110' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                
                <motion.div 
                  className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-md p-4 rounded-lg transition-all duration-300"
                  initial={{ y: 20, opacity: 0 }}
                  animate={imageHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                >
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      {personalInfo.name} - {personalInfo.location}
                    </p>
                    <div className="flex space-x-2">
                      {Object.entries(personalInfo.socials).slice(0, 3).map(([platform, url]) => (
                        <a 
                          key={platform} 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full hover:bg-primary/40 transition-colors"
                        >
                          {platform}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isMainVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col space-y-6"
            >
              <h3 className="text-2xl font-bold">
                Hello! I'm <span className="text-gradient">{personalInfo.name}</span>
              </h3>
              
              <p className="text-muted-foreground">
                {personalInfo.bio}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Location", value: personalInfo.location },
                  { label: "Experience", value: "5+ Years" },
                  { label: "Email", value: personalInfo.email },
                  { label: "Phone", value: personalInfo.phone }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="glass-panel p-4 relative overflow-hidden group"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onMouseEnter={() => handleHover(`info-${i}`, true)}
                    onMouseLeave={() => handleHover(`info-${i}`, false)}
                  >
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium truncate">{item.value}</div>
                    {isHoveredMap[`info-${i}`] && (
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0.5 bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-2">
                <Button className="gap-2 group" onClick={handleDownloadCV}>
                  <span>Download CV</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div 
          ref={timelineRef}
          className={`mt-24 transition-all duration-1000 ${
            isTimelineVisible ? "opacity-100" : "opacity-0 transform translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Work Experience</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My professional journey spanning design and development roles
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/80 via-primary/50 to-primary/10 sm:transform sm:-translate-x-1/2"></div>
            
            {/* Timeline items */}
            {experience.map((item, index) => (
              <div 
                key={index}
                className={`relative flex flex-col sm:flex-row ${
                  index % 2 === 0 ? 'sm:flex-row-reverse' : ''
                } mb-12 sm:mb-20`}
              >
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={isTimelineVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`sm:w-1/2 ml-12 sm:ml-0 ${
                    index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'
                  }`}
                >
                  <Card 
                    className="glass-panel z-10 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-md"
                    onMouseEnter={() => handleHover(`exp-${index}`, true)}
                    onMouseLeave={() => handleHover(`exp-${index}`, false)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <Badge className="px-3 py-1 bg-primary/20 text-primary border-primary/30">
                          {item.company}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {item.duration}
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-bold mb-2">{item.role}</h4>
                      <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                      
                      <div className="space-y-2">
                        {item.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start">
                            <CheckCircle2 className={`h-4 w-4 ${isHoveredMap[`exp-${index}`] ? 'text-primary' : 'text-primary/70'} mr-2 mt-1 flex-shrink-0 transition-colors`} />
                            <span className="text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                      
                      {isHoveredMap[`exp-${index}`] && (
                        <div className="mt-4 pt-3 border-t border-border flex justify-end">
                          <Button variant="ghost" size="sm" className="gap-1 text-xs">
                            <span>More Details</span>
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Timeline dot */}
                <div className="absolute left-4 sm:left-1/2 top-10 w-4 h-4 rounded-full bg-primary shadow-glow sm:transform sm:-translate-x-1/2 z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
