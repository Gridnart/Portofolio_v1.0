'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import anime from 'animejs';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: string;
  image?: string; // Path to the certificate image
  imageAlt?: string; // Alt text for accessibility
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: 'Static Website Development',
    issuer: 'NxtWave',
    date: '2025',
    description: 'Static Frontend Development',
    category: 'Frontend',
    image: '/certificates/DJSOJMMYQH.jpg',
    imageAlt: 'NxtWave Certificate of Completion'
  },
  {
    id: 2,
    title: 'Gen AI Image Generator',
    issuer: 'IEEE SRMIST',
    date: '2024',
    description: 'Gen AI Image Generator using OpenAI API',
    category: 'Programming',
    image: '/certificates/GenAIWorkshop.jpg',
    imageAlt: 'IEEE SRMIST Certificate'
  },
  {
    id: 3,
    title: 'Chief Web Developer',
    issuer: 'Seth.M.R. Jaipuria School',
    date: '2022',
    description: 'Designed, developed and deployed the website for JMUN\'22',
    category: 'Web Development',
    image: '/certificates/Prajval.jpg',
    imageAlt: 'JMUN\'22 Website Developer '
  }
  // },
  // {
  //   id: 4,
  //   title: 'TypeScript Mastery',
  //   issuer: 'Frontend Masters',
  //   date: '2024',
  //   description: 'Advanced TypeScript patterns and practices',
  //   category: 'Frontend'
  // },
  // {
  //   id: 5,
  //   title: 'AWS Cloud Practitioner',
  //   issuer: 'Amazon Web Services',
  //   date: '2023',
  //   description: 'Cloud computing fundamentals and AWS services',
  //   category: 'Cloud'
  // },
  // {
  //   id: 6,
  //   title: 'UI/UX Design',
  //   issuer: 'Coursera',
  //   date: '2023',
  //   description: 'User interface and experience design principles',
  //   category: 'Design'
  // }
];

export default function Certificates() {
  const gridRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!gridRef.current) return;

    const gridItems = gridRef.current.querySelectorAll('.grid-item');
    
    // Set initial state
    anime.set(gridItems, {
      opacity: 0,
      scale: 0.8,
      translateY: 50
    });

    // Animate grid items in
    anime.timeline({
      easing: 'easeOutExpo',
      duration: 800
    })
    .add({
      targets: gridItems,
      opacity: [0, 1],
      scale: [0.8, 1],
      translateY: [50, 0],
      delay: anime.stagger(100, { start: 200 })
    });

    // Add hover animations
    gridItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        anime({
          targets: item,
          scale: 1.05,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });

      item.addEventListener('mouseleave', () => {
        anime({
          targets: item,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });

  }, []);



  return (
    <section id="certificates" className="py-24 bg-card/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-academia-gradient opacity-50" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading mb-6 text-gold">
              <span className="text-accent">03. </span>Certificates & Achievements
            </h2>
            <p className="text-cream/80 max-w-2xl mx-auto text-lg">
              A collection of my professional certifications and learning achievements.
            </p>
          </div>

          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certificates.map((certificate) => (
              <a 
                key={certificate.id}
                href={certificate.image} 
                target="_blank"
                rel="noopener noreferrer"
                className="grid-item group block"

                title="Click to view full size certificate"
              >
                <div className="relative overflow-hidden border border-gold/20 bg-card/60 backdrop-blur-sm hover:border-gold/40 transition-colors duration-300">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gold/20 to-brown/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gold/30 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                        {certificate.image && (
                          <div className="mb-4 overflow-hidden rounded-lg relative group">
                            <Image 
                              src={certificate.image} 
                              alt={certificate.imageAlt || `${certificate.title} certificate`}
                              width={400}
                              height={300}
                              className="w-full h-48 object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                              <div className="bg-white/90 p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-gold text-sm font-semibold">{certificate.category}</span>
                            <span className="text-gray-400 text-sm">{certificate.date}</span>
                          </div>
                          <h3 className="text-xl font-heading font-bold mb-2 text-white">{certificate.title}</h3>
                          <p className="text-gray-300 mb-4">{certificate.issuer}</p>
                          <p className="text-gray-400 text-sm">{certificate.description}</p>
                        </div>
                        <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>



    </section>
  );
} 