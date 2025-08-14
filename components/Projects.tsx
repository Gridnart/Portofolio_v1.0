'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    title: 'Project One',
    description: 'A brief description of the project and what it does. Highlight the technologies used and the problem it solves.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
    github: '#',
    demo: '#',
    image: '/project-placeholder-1.jpg'
  },
  {
    title: 'Project Two',
    description: 'Another project description that explains what the project does and the technologies used to build it.',
    tags: ['TypeScript', 'Express', 'MongoDB', 'Docker'],
    github: '#',
    demo: '#',
    image: '/project-placeholder-2.jpg'
  },
  // Add more projects as needed
];

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-heading mb-16 text-center">
            <span className="text-accent">02. </span>Some Things I&apos;ve Built
          </h2>

          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className={`group relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                <div className="md:col-span-7 relative">
                  <div className="relative z-10 rounded-lg overflow-hidden border border-accent/20">
                    <div className="aspect-video bg-accent/10 flex items-center justify-center">
                      <span className="text-text/50">Project Screenshot</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-accent/10 rounded-lg group-hover:bg-transparent transition-colors duration-300 z-0"></div>
                </div>

                <div className={`md:col-span-5 z-10 ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}>
                  <p className="text-accent font-mono text-sm mb-2">Featured Project</p>
                  <h3 className="text-2xl font-heading font-bold mb-4">{project.title}</h3>
                  
                  <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg mb-4">
                    <p className="mb-4">{project.description}</p>
                    
                    <div className={`flex flex-wrap gap-2 mb-4 ${
                      index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-mono text-text/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className={`flex gap-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-text/70 hover:text-accent transition-colors"
                          aria-label="GitHub"
                        >
                          <FiGithub className="w-5 h-5" />
                        </a>
                      )}
                      {project.demo && (
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-text/70 hover:text-accent transition-colors flex items-center gap-1"
                        >
                          <span>Live Demo</span>
                          <FiExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
