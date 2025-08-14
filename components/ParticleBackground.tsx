'use client';

import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear container
    container.innerHTML = '';

    // Create simple particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      
      particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: #d4af37;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0.8;
        pointer-events: none;
        z-index: 1;
      `;

      container.appendChild(particle);

      // Simple animation
      const animate = () => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        particle.style.transition = 'all 3s ease-in-out';
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        setTimeout(animate, 3000);
      };

      setTimeout(animate, Math.random() * 3000);
    }

    // Add some cream particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #f5f5dc;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0.6;
        pointer-events: none;
        z-index: 1;
      `;

      container.appendChild(particle);
    }

    // Add some brown particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      
      particle.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background: #8b7355;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0.7;
        pointer-events: none;
        z-index: 1;
      `;

      container.appendChild(particle);
    }

  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  );
} 