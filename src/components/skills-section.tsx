
import React, { useState } from 'react';
import { skills } from '@/lib/data';
import { useElementInView } from '@/hooks/use-intersection-observer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SkillBadge from '@/components/ui/skill-badge';
import { motion } from 'framer-motion';

type SkillCategory = 'technical' | 'design' | 'soft';

export function SkillsSection() {
  const [headerRef, isHeaderVisible] = useElementInView<HTMLDivElement>({ threshold: 0.2 });
  const [skillsRef, isSkillsVisible] = useElementInView<HTMLDivElement>({ threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('technical');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const handleSkillHover = (skillName: string | null) => {
    setHoveredSkill(skillName);
  };
  
  return (
    <section id="skills" className="section-spacing relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="container-custom mx-auto relative z-10">
        <div 
          ref={headerRef}
          className={`transition-all duration-1000 ${
            isHeaderVisible ? "opacity-100" : "opacity-0 transform translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 rounded-full">
              Skills & Expertise
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical <span className="text-gradient">Proficiency</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my skills in design, development, and other areas
            </p>
          </div>
        </div>
        
        <div 
          ref={skillsRef}
          className={`transition-all duration-1000 ${
            isSkillsVisible ? "opacity-100" : "opacity-0 transform translate-y-10"
          }`}
        >
          <Tabs defaultValue="technical" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-12">
              <TabsTrigger 
                value="technical"
                className="data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:ring-1 data-[state=active]:ring-primary/40"
                onClick={() => setSelectedCategory('technical')}
              >
                Development
              </TabsTrigger>
              <TabsTrigger 
                value="design"
                className="data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:ring-1 data-[state=active]:ring-primary/40"
                onClick={() => setSelectedCategory('design')}
              >
                Design
              </TabsTrigger>
              <TabsTrigger 
                value="soft"
                className="data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:ring-1 data-[state=active]:ring-primary/40"
                onClick={() => setSelectedCategory('soft')}
              >
                Soft Skills
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="technical" className="relative">
              <div className="absolute inset-0 w-full h-full -z-10 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-radial from-primary/30 via-primary/10 to-transparent blur-3xl"></div>
              </div>
              
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                initial="hidden"
                animate={isSkillsVisible ? "visible" : "hidden"}
              >
                {skills.technical.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                    onMouseEnter={() => handleSkillHover(skill.name)}
                    onMouseLeave={() => handleSkillHover(null)}
                  >
                    <SkillBadge
                      name={skill.name}
                      level={skill.level}
                      icon={skill.icon}
                      isActive={hoveredSkill === skill.name}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="design" className="relative">
              <div className="absolute inset-0 w-full h-full -z-10 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-radial from-primary/30 via-primary/10 to-transparent blur-3xl"></div>
              </div>
              
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                initial="hidden"
                animate={isSkillsVisible ? "visible" : "hidden"}
              >
                {skills.design.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                    onMouseEnter={() => handleSkillHover(skill.name)}
                    onMouseLeave={() => handleSkillHover(null)}
                  >
                    <SkillBadge
                      name={skill.name}
                      level={skill.level}
                      icon={skill.icon}
                      isActive={hoveredSkill === skill.name}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="soft" className="relative">
              <div className="absolute inset-0 w-full h-full -z-10 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-radial from-primary/30 via-primary/10 to-transparent blur-3xl"></div>
              </div>
              
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                initial="hidden"
                animate={isSkillsVisible ? "visible" : "hidden"}
              >
                {skills.soft.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                    onMouseEnter={() => handleSkillHover(skill.name)}
                    onMouseLeave={() => handleSkillHover(null)}
                  >
                    <SkillBadge
                      name={skill.name}
                      level={skill.level}
                      isActive={hoveredSkill === skill.name}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
