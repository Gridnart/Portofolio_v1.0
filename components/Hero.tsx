'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import AnimatedElements from './AnimatedElements';
import LayeredAnimation from './LayeredAnimation';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Ensure gold color persists after any potential style resets
    const applyGoldColor = () => {
      if (nameRef.current) {
        nameRef.current.style.color = '#d4af37';
        nameRef.current.style.setProperty('color', '#d4af37', 'important');
      }
    };
    
    // Apply immediately
    applyGoldColor();
    
    // Re-apply after a short delay to catch any style resets
    const timer = setTimeout(applyGoldColor, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate decorative elements with more sophisticated patterns
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
      anime({
        targets: el,
        translateY: ['-15px', '15px'],
        translateX: ['-5px', '5px'],
        rotate: ['-2deg', '2deg'],
        duration: 4000 + (index * 800),
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        delay: 1000 + (index * 300)
      });
    });

    // Enhanced typewriter effect for the title
    if (titleRef.current) {
      const titleText = titleRef.current.textContent || '';
      titleRef.current.innerHTML = '';
      
      titleText.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(30px) rotateX(90deg)';
        titleRef.current?.appendChild(span);
        
        anime({
          targets: span,
          opacity: 1,
          translateY: 0,
          rotateX: 0,
          duration: 750,
          delay: i * 50,
          easing: 'easeOutExpo'
        });
      });
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <LayeredAnimation />
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gold/5 rounded-full filter blur-xl floating-element" />
      <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-gold/3 rounded-full filter blur-xl floating-element" />
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-pink-500/5 rounded-full filter blur-xl floating-element" />

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center py-4">
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-2 text-white">
            Hi, I&apos;m <span className="text-gold">Prajval Sahu</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-2 mb-8 max-w-2xl mx-auto px-4">
            From schematics to software — crafting the future, one project at a time.
          </p>
          
          <div ref={buttonsRef} className="flex flex-wrap justify-center gap-6">
            <AnimatedElements animationType="fadeIn" delay={800}>
              <Link
                href="#certificates"
                className="px-8 py-4 bg-gradient-to-r from-gold to-amber-500 text-dark font-bold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Certifications
              </Link>
            </AnimatedElements>
            <AnimatedElements animationType="fadeIn" delay={1000}>
              <Link
                href="#contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                Let&apos;s Talk
              </Link>
            </AnimatedElements>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <AnimatedElements animationType="float" duration={4000}>
          <button 
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="cursor-pointer focus:outline-none group"
            aria-label="Scroll to About Me section"
          >
            <div className="mt-24 text-center">
              <p className="text-cream/70 mb-4 font-heading group-hover:text-gold transition-colors duration-300">
                Scroll to explore
              </p>
              <div className="animate-bounce w-12 h-12 border-2 border-gold rounded-full flex items-center justify-center mx-auto group-hover:border-amber-400 group-hover:bg-gold/10 transition-colors duration-300">
                <svg 
                  className="w-5 h-5 text-gold group-hover:text-amber-400 transition-colors duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </button>
        </AnimatedElements>
      </div>
    </section>
  );
}
