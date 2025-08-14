'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';    

const skills = [
  'JavaScript', 'Bootstrap', 'React', 'Next.js', 'Node.js',
  'Tailwind CSS', 'Java', 'MySQL', 'Git', 'Figma'
];

const aboutVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function About() {
  return (
    <section id="about" className="py-24 bg-card/40 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-academia-gradient opacity-50" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={aboutVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-heading mb-16 text-center">
            <span className="text-gold">01. </span>About Me
          </motion.h2>
          
          <div className="flex flex-col items-center">
            <motion.div 
              variants={itemVariants} 
              className="relative w-80 h-80 mb-12"
            >
              <div className="absolute inset-0 border-2 border-gold/40 rounded-none transform rotate-3 hover:rotate-0 transition-transform duration-700" />
              <div className="absolute inset-2 border border-gold/20 rounded-none transform -rotate-2 hover:rotate-0 transition-transform duration-700" />
              <div className="absolute inset-4 bg-card-gradient rounded-none overflow-hidden shadow-academia">
                <Image
                  src="/20240811_194000.jpg"
                  alt="Prajval Sahu"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="w-full max-w-3xl">
              <div className="bg-card/60 backdrop-blur-sm p-8 border border-gold/20 shadow-academia">
                <p className="mb-6 text-lg leading-relaxed text-cream/90">
                  Greetings! I am <span className="text-gold font-semibold">Prajval Sahu</span>, an engineering student with a strong academic foundation in Physics, Chemistry, and Mathematics, complemented by practical expertise in electronics, embedded systems, and software development.
                </p>
                <p className="mb-6 text-lg leading-relaxed text-cream/90">
                My work bridges the gap between scientific theory and practical implementation — from designing precise hardware schematics to developing efficient, reliable code for data processing, automation, and intelligent systems. I approach every project with a research-oriented mindset, ensuring that solutions are grounded in theory yet optimized for real-world performance.
                </p>
                <p className="mb-8 text-lg leading-relaxed text-cream/90">
                Whether creating AI models, programming microcontrollers, or integrating hardware and software for innovative prototypes, I combine analytical rigor with technical creativity. As an aspiring intern, I aim to contribute meaningfully by applying my interdisciplinary skills as both an engineer and a developer.
                </p>
              </div>
              
              <motion.div variants={itemVariants} className="mt-12">
                <h3 className="text-2xl font-heading mb-6 text-gold">Here are a few technologies I&apos;ve been working with recently:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center p-3 bg-card/40 border border-gold/10 hover:border-gold/30 transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-gold mr-3 text-lg">▹</span>
                      <span className="text-cream font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            

          </div>
        </motion.div>
      </div>
    </section>
  );
}
