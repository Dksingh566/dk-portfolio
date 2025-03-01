
import React, { useState } from 'react';
import { projects } from '@/lib/data';
import { useElementInView } from '@/hooks/use-intersection-observer';
import { Badge } from '@/components/ui/badge';
import ProjectCard from '@/components/ui/project-card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type ProjectCategory = 'All' | 'UI/UX' | 'Web Dev' | 'Front-End' | 'CS Projects';

export function ProjectsSection() {
  const [headerRef, isHeaderVisible] = useElementInView<HTMLDivElement>({ threshold: 0.2 });
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [showAll, setShowAll] = useState(false);
  
  const categories: ProjectCategory[] = ['All', 'UI/UX', 'Web Dev', 'Front-End', 'CS Projects'];
  
  const filteredProjects = projects.filter(
    project => selectedCategory === 'All' || project.category === selectedCategory
  );
  
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);
  
  return (
    <section id="projects" className="section-spacing relative overflow-hidden">
      {/* Background effect for the projects section */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="container-custom mx-auto relative z-10">
        <div 
          ref={headerRef}
          className={`transition-all duration-1000 ${
            isHeaderVisible ? "opacity-100" : "opacity-0 transform translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 rounded-full">
              Portfolio
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of my recent work showcasing UI/UX design and front-end development skills
            </p>
          </div>
          
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`rounded-full px-4 py-1 text-sm ${
                  selectedCategory === category 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted/30'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate={isHeaderVisible ? "visible" : "hidden"}
        >
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              category={project.category}
              image={project.image}
              technologies={project.technologies}
              link={project.link}
              github={project.github}
              featured={project.featured}
              details={project.details}
            />
          ))}
        </motion.div>
        
        {filteredProjects.length > 3 && (
          <div className="flex justify-center mt-12">
            <Button 
              variant="outline"
              className="border-primary/30 hover:border-primary/60"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'Load More'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
