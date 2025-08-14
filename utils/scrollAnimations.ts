import * as THREE from 'three';
import anime from 'animejs';

// Scroll-based animation controller
export class ScrollAnimator {
  private scrollY: number = 0;
  private scrollTarget: THREE.Object3D[] = [];
  private scrollAnimations: anime.AnimeInstance[] = [];

  constructor() {
    this.handleScroll = this.handleScroll.bind(this);
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  // Add an object to be animated on scroll
  addScrollTarget(object: THREE.Object3D, config: {
    startScroll: number;
    endScroll: number;
    properties: {
      [key: string]: {
        start: any;
        end: any;
        easing?: string;
      };
    };
  }) {
    type ObjectKey = keyof typeof object;
    this.scrollTarget.push(object);
    
    const animation = anime({
      targets: { progress: 0 },
      progress: 1,
      duration: config.endScroll - config.startScroll,
      easing: 'easeInOutQuad',
      autoplay: false,
      update: (anim) => {
        const progress = anim.progress / 100;
        Object.entries(config.properties).forEach(([prop, { start, end }]) => {
          const key = prop as keyof typeof object;
          const value = object[key];
          
          if (value instanceof THREE.Vector3) {
            value.lerpVectors(
              new THREE.Vector3().fromArray(start as [number, number, number]),
              new THREE.Vector3().fromArray(end as [number, number, number]),
              progress
            );
          } else if (value instanceof THREE.Euler) {
            value.set(
              THREE.MathUtils.lerp((start as [number, number, number])[0], (end as [number, number, number])[0], progress),
              THREE.MathUtils.lerp((start as [number, number, number])[1], (end as [number, number, number])[1], progress),
              THREE.MathUtils.lerp((start as [number, number, number])[2], (end as [number, number, number])[2], progress)
            );
          } else if (typeof start === 'number' && typeof end === 'number') {
            (object as any)[key] = THREE.MathUtils.lerp(start, end, progress);
          }
        });
      },
    });

    this.scrollAnimations.push(animation);
  }

  private handleScroll() {
    this.scrollY = window.scrollY;
    this.scrollAnimations.forEach((anim) => {
      const target = (anim as any).animatables[0].target as { progress: number };
      const scrollProgress = (this.scrollY - anim.duration * 0.5) / (window.innerHeight * 0.5);
      target.progress = THREE.MathUtils.clamp(scrollProgress, 0, 1);
      anim.seek(anim.duration * target.progress);
    });
  }

  // Clean up event listeners
  dispose() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
    }
    this.scrollAnimations.forEach(anim => anim.pause());
    this.scrollTarget = [];
    this.scrollAnimations = [];
  }
}

// Parallax effect for mouse movement
export class ParallaxEffect {
  private mouseX: number = 0;
  private mouseY: number = 0;
  private targetX: number = 0;
  private targetY: number = 0;
  private windowHalfX: number;
  private windowHalfY: number;
  private objects: { object: THREE.Object3D; intensity: number }[] = [];
  private animationId: number | null = null;

  constructor() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('resize', this.onWindowResize);
      this.animate();
    }
  }

  addObject(object: THREE.Object3D, intensity: number = 0.1) {
    this.objects.push({ object, intensity });
  }

  private onMouseMove(event: MouseEvent) {
    this.mouseX = (event.clientX - this.windowHalfX) * 0.05;
    this.mouseY = (event.clientY - this.windowHalfY) * 0.05;
  }

  private onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
  }

  private animate() {
    this.animationId = requestAnimationFrame(this.animate.bind(this));
    
    this.targetX = this.mouseX * 0.05;
    this.targetY = this.mouseY * 0.05;

    this.objects.forEach(({ object, intensity }) => {
      object.rotation.x += (this.targetY - object.rotation.x) * intensity;
      object.rotation.y += (this.targetX - object.rotation.y) * intensity;
    });
  }

  dispose() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('resize', this.onWindowResize);
    }
    this.objects = [];
  }
}
