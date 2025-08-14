"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import anime from 'animejs';

export type AnimationType = 'fadeIn' | 'slideUp' | 'float' | 'fadeInWithScale';

export interface AnimatedElementsProps {
  className?: string;
  children: React.ReactNode;
  animationType?: AnimationType;
  delay?: number;
  duration?: number;
}

export interface AnimatedElementsRef {
  play: () => void;
  pause: () => void;
  restart: () => void;
}

const AnimatedElements = forwardRef<AnimatedElementsRef, AnimatedElementsProps>(({
  className = '',
  children,
  animationType = 'fadeIn',
  delay = 0,
  duration = 1000
}, ref) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<anime.AnimeInstance | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    // Set initial styles based on animation type
    switch (animationType) {
      case 'fadeIn':
        element.style.opacity = '0';
        break;
      case 'slideUp':
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        break;
      case 'float':
        element.style.willChange = 'transform';
        break;
      case 'fadeInWithScale':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.95)';
        break;
    }

    // Create animation timeline
    const tl = anime.timeline({
      targets: element,
      autoplay: false,
      delay: delay,
      duration: duration,
      easing: 'easeOutExpo',
    });

    // Add animation based on type
    switch (animationType) {
      case 'fadeIn':
        tl.add({
          opacity: [0, 1],
        });
        break;
      case 'slideUp':
        tl.add({
          opacity: [0, 1],
          translateY: [30, 0],
        });
        break;
      case 'float':
        tl.add({
          translateY: ['-10px', '10px'],
          loop: true,
          direction: 'alternate',
          duration: 3000,
          easing: 'easeInOutSine',
        });
        break;
      case 'fadeInWithScale':
        tl.add({
          opacity: [0, 1],
          scale: [0.95, 1],
        });
        break;
    }

    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tl.play();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (tl) tl.pause();
    };
  }, [animationType, delay, duration]);

  // Expose animation controls via ref
  useImperativeHandle(ref, () => ({
    play: () => {
      if (animationRef.current) {
        animationRef.current.play();
      }
    },
    pause: () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    },
    restart: () => {
      if (animationRef.current) {
        animationRef.current.restart();
      }
    },
  }));

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
});

AnimatedElements.displayName = 'AnimatedElements';

export default AnimatedElements;
