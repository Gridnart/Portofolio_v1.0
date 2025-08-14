"use client";

import { useEffect } from 'react';
import { animate } from 'framer-motion';

const SmoothScroll = () => {

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId) as HTMLElement;
        if (!targetElement) return;

        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100; // 100px offset from top
        const distance = targetPosition - startPosition;
        const duration = Math.min(1000, Math.abs(distance) * 0.8); // Adjust speed based on distance

        animate(startPosition, targetPosition, {
          duration: duration / 1000, // Convert to seconds
          ease: [0.25, 0.1, 0.25, 1],
          onUpdate: (latest) => {
            window.scrollTo(0, latest);
          },
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
};

export default SmoothScroll;
