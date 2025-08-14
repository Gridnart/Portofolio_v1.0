'use client';

import { useEffect, useRef, useCallback } from 'react';
import anime from 'animejs';

const LayeredAnimation = () => {
  const animationRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  // Removed unused animationInstances

  // Enhanced mouse movement with velocity tracking
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!animationRef.current) return;
    
    const now = Date.now();
    const deltaTime = now - lastTime.current;
    lastTime.current = now;
    
    const rect = animationRef.current.getBoundingClientRect();
    const newX = (e.clientX - rect.left) / rect.width - 0.5;
    const newY = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Calculate velocity
    if (deltaTime > 0) {
      velocity.current = {
        x: (newX - lastMousePos.current.x) * (1000 / deltaTime) * 10,
        y: (newY - lastMousePos.current.y) * (1000 / deltaTime) * 10
      };
    }
    
    lastMousePos.current = { x: newX, y: newY };
    mousePos.current = { x: newX, y: newY };
  }, []);

  // Add mouse move listener
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (!animationRef.current) return;

    const fitElementToParent = (el: HTMLElement | SVGElement) => {
      let timeout: NodeJS.Timeout;
      function resize() {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          const parentEl = el.parentNode as HTMLElement;
          if (!parentEl) return;
          
          // Use getBoundingClientRect() which works for both HTMLElement and SVGElement
          const elRect = el.getBoundingClientRect();
          const parentRect = parentEl.getBoundingClientRect();
          
          const elWidth = elRect.width;
          const parentWidth = parentRect.width;
          
          // If element has no width yet, skip this frame
          if (elWidth === 0) return;
          
          const isPortrait = window.innerHeight > window.innerWidth;
          const scale = isPortrait 
            ? parentWidth / elWidth * 1.5 
            : parentWidth / elWidth * 1.1;
            
          // Apply styles that work for both element types
          if ('style' in el) {
            el.style.position = 'absolute';
            el.style.left = '50%';
            el.style.top = '50%';
            el.style.transform = `translate(-50%, -50%) scale(${scale})`;
          }
        }, 10);
      }
      
      resize();
      window.addEventListener('resize', resize);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', resize);
        if (timeout) clearTimeout(timeout);
      };
    };

    const animateShape = (el: SVGElement) => {
      const polyEl = el.querySelector('polygon');
      const easings = ['easeInOutQuad', 'easeInOutCirc', 'easeInOutSine'];
      
      // Slower animation with more natural movement
      const baseDuration = () => anime.random(3000, 6000);
      
      const createKeyframes = (valueFn: (el: SVGElement) => unknown) => {
        try {
          return Array(15).fill(0).map(() => ({
            value: valueFn(el)
          }));
        } catch (error) {
          console.error('Error creating keyframes:', error);
          return [];
        }
      };

      const trianglePoints = polyEl?.getAttribute('points')?.split(' ') || [];

      // Check if element is still in the DOM before animating
  if (!document.body.contains(el)) {
    return;
  }

  let animation: anime.AnimeTimelineInstance;
  try {
    animation = anime.timeline({
      targets: el,
      duration: baseDuration,
      easing: () => easings[anime.random(0, easings.length - 1)] as anime.EasingOptions,
      complete: (anim) => {
        try {
          if (anim.animatables && anim.animatables[0] && anim.animatables[0].target) {
            const target = anim.animatables[0].target as unknown as SVGElement;
            if (target && document.body.contains(target)) {
              animateShape(target);
            }
          }
        } catch (error) {
          console.error('Error in animation complete callback:', error);
        }
      },
    });
  } catch (error) {
    console.error('Error creating animation timeline:', error);
    return;
  }

      // Enhanced cursor interaction with velocity and distance-based effects
      const cursorInfluence = 120; // Increased cursor influence
      const velocityInfluence = 0.8; // How much velocity affects the movement
      const distanceFactor = el.classList.contains('small') ? 2 : 1.5; // Smaller shapes move more
      const sizeFactor = el.classList.contains('large') ? 0.8 : 1.2; // Size-based movement
      
      const baseX = el.classList.contains('large') ? anime.random(-150, 150) : anime.random(-300, 300);
      const baseY = el.classList.contains('large') ? anime.random(-60, 60) : anime.random(-150, 150);
      
      // Store original positions for spring-like effect
      const originalX = baseX;
      const originalY = baseY;
      
      animation.add({
        translateX: createKeyframes(() => {
          // Base cursor position effect
          const cursorX = mousePos.current.x * cursorInfluence * distanceFactor * sizeFactor;
          // Add velocity-based movement
          const velocityX = velocity.current.x * velocityInfluence * (el.classList.contains('small') ? 1.8 : 1.2);
          // Spring effect towards original position
          const springX = (originalX - baseX) * 0.1;
          
          return baseX + cursorX + velocityX + springX;
        }),
        translateY: createKeyframes(() => {
          // Base cursor position effect
          const cursorY = mousePos.current.y * cursorInfluence * distanceFactor * sizeFactor;
          // Add velocity-based movement
          const velocityY = velocity.current.y * velocityInfluence * (el.classList.contains('small') ? 1.8 : 1.2);
          // Spring effect towards original position
          const springY = (originalY - baseY) * 0.1;
          
          return baseY + cursorY + velocityY + springY;
        }),
        rotate: createKeyframes(() => {
          // Dynamic rotation based on cursor velocity and position
          const baseRotation = anime.random(-30, 30);
          const velocityRotation = (velocity.current.x + velocity.current.y) * 0.5;
          const cursorRotation = (mousePos.current.x + mousePos.current.y) * 60;
          return baseRotation + velocityRotation + cursorRotation;
        }),
        // Dynamic scale based on cursor proximity and velocity
        scale: createKeyframes(() => {
          const baseScale = anime.random(8, 12) / 10; // Base scale between 0.8 and 1.2
          // Scale up when cursor is near
          const cursorDistance = Math.sqrt(
            Math.pow(mousePos.current.x, 2) + 
            Math.pow(mousePos.current.y, 2)
          );
          const proximityScale = 1.2 - (cursorDistance * 0.5);
          // Add pulse effect based on velocity
          const velocityPulse = Math.abs(velocity.current.x + velocity.current.y) * 0.01;
          return Math.max(0.7, Math.min(1.5, baseScale * proximityScale + velocityPulse));
        }),
        // Add opacity variation for more dynamic feel
        opacity: createKeyframes(() => {
          return anime.random(4, 10) / 10; // Between 0.4 and 1.0
        }),
        // Smooth easing for all properties
        easing: () => easings[anime.random(0, easings.length - 1)],
      }, 0);

      // Rectangle animation removed as rectEl was causing reference issues

      if (polyEl && trianglePoints.length) {
        animation.add({
          targets: polyEl,
          points: createKeyframes(() => {
            const baseScale = el.classList.contains('small') ? 0.8 : 1.2;
            const scale = anime.random(70, 130) / 100 * baseScale;
            return trianglePoints.map(p => {
              const num = parseFloat(p);
              return isNaN(num) ? p : (num * scale).toString();
            }).join(' ');
          }),
          // Add cursor influence on triangle points
          transform: createKeyframes(() => {
            const x = mousePos.current.x * 10;
            const y = mousePos.current.y * 10;
            return `translate(${x}px, ${y}px)`;
          }),
        }, 0);
      }
    };

    const layeredAnimationEl = animationRef.current.querySelector('.layered-animations');
    if (!layeredAnimationEl) return;

    const shapeEls = layeredAnimationEl.querySelectorAll<SVGElement>('.shape');
    shapeEls.forEach(shapeEl => animateShape(shapeEl));
    
    fitElementToParent(layeredAnimationEl as HTMLElement);

  }, []);

  return (
    <div ref={animationRef} className="animation-wrapper">
      <div className="layered-animations">
        <svg className="large shape" viewBox="0 0 96 96">
          <defs>
            <linearGradient id="circleGradient" x1="0%" x2="100%" y1="20%" y2="80%">
              <stop stopColor="#373734" offset="0%"/>
              <stop stopColor="#242423" offset="50%"/>
              <stop stopColor="#0D0D0C" offset="100%"/>
            </linearGradient>
          </defs>
          <circle cx="48" cy="48" r="28" fillRule="evenodd" strokeLinecap="square" fill="url(#circleGradient)"/>
        </svg>
        <svg className="small shape color-red" viewBox="0 0 96 96">
          <polygon fillRule="evenodd" points="48 17.28 86.4 80.11584 9.6 80.11584" strokeLinecap="square"/>
        </svg>
        <svg className="large shape" viewBox="0 0 96 96">
          <defs>
            <linearGradient id="triangleGradient" x1="0%" x2="100%" y1="20%" y2="80%">
              <stop stopColor="#373734" offset="0%"/>
              <stop stopColor="#242423" offset="50%"/>
              <stop stopColor="#0D0D0C" offset="100%"/>
            </linearGradient>
          </defs>
          <polygon fillRule="evenodd" points="48 17.28 86.4 80.11584 9.6 80.11584" strokeLinecap="square" fill="url(#triangleGradient)"/>
        </svg>
        <svg className="x-small shape" viewBox="0 0 96 96">
          <polygon fillRule="evenodd" points="48 17.28 86.4 80.11584 9.6 80.11584" strokeLinecap="square"/>
        </svg>
        <svg className="x-small shape" viewBox="0 0 96 96">
          <rect width="48" height="48" x="24" y="24" fillRule="evenodd" strokeLinecap="square"/>
        </svg>
        <svg className="small shape color-red" viewBox="0 0 96 96">
          <rect width="48" height="48" x="24" y="24" fillRule="evenodd" strokeLinecap="square"/>
        </svg>
        <svg className="large shape" viewBox="0 0 96 96">
          <defs>
            <linearGradient id="rectGradient" x1="0%" x2="100%" y1="20%" y2="80%">
              <stop stopColor="#373734" offset="0%"/>
              <stop stopColor="#242423" offset="50%"/>
              <stop stopColor="#0D0D0C" offset="100%"/>
            </linearGradient>
          </defs>
          <rect width="48" height="48" x="24" y="24" fillRule="evenodd" strokeLinecap="square" fill="url(#rectGradient)"/>
        </svg>
        <svg className="small shape color-red" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="32" fillRule="evenodd" strokeLinecap="square"/>
        </svg>
        <svg className="x-small shape" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="32" fillRule="evenodd" strokeLinecap="square"/>
        </svg>
      </div>
    </div>
  );
};

export default LayeredAnimation;
