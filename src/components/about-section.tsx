
import React, { useState } from 'react';
import { personalInfo, experience } from '@/lib/data';
import { useElementInView } from '@/hooks/use-intersection-observer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function AboutSection() {
  const [mainRef, isMainVisible] = useElementInView<HTMLDivElement>({ threshold: 0.2 });
  const [timelineRef, isTimelineVisible] = useElementInView<HTMLDivElement>({ threshold: 0.2 });
  const [imageHovered, setImageHovered] = useState(false);
  
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
              initial={{ opacity: 0, y: 20 }}
              animate={isMainVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
            >
              <div className="aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden relative glass-panel border-primary/20 transition-all duration-300 shadow-lg hover:shadow-primary/20">
                <img
                  src="/lovable-uploads/ce623ae9-1aaa-4274-bd07-81dfef61dffb.png"
                  alt={personalInfo.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${imageHovered ? 'scale-110' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                
                <motion.div 
                  className="absolute bottom-4 left-4 right-4 bg-background/70 backdrop-blur-sm p-3 rounded-lg transition-all duration-300"
                  initial={{ y: 20, opacity: 0 }}
                  animate={imageHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                >
                  <p className="text-sm font-medium text-foreground">
                    {personalInfo.name} - {personalInfo.location}
                  </p>
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
                <div className="glass-panel p-4">
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium">{personalInfo.location}</div>
                </div>
                
                <div className="glass-panel p-4">
                  <div className="text-sm text-muted-foreground">Experience</div>
                  <div className="font-medium">5+ Years</div>
                </div>
                
                <div className="glass-panel p-4">
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium truncate">{personalInfo.email}</div>
                </div>
                
                <div className="glass-panel p-4">
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="font-medium">{personalInfo.phone}</div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button className="gap-2 group">
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
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/80 via-primary/50 to-primary/10 md:transform md:-translate-x-1/2"></div>
            
            {/* Timeline items */}
            {experience.map((item, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } mb-12 md:mb-20`}
              >
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={isTimelineVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <Card className="interactive-card z-10 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
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
                            <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-10 w-4 h-4 rounded-full bg-primary shadow-glow md:transform md:-translate-x-1/2 z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
