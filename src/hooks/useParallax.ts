import { useEffect, useRef } from 'react';

export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!element) return;
      
      const scrolled = window.scrollY;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled - window.innerHeight;
      
      // Only apply parallax when element is in viewport range
      if (scrolled > elementTop && scrolled < elementTop + rect.height + window.innerHeight) {
        const offset = (scrolled - elementTop) * speed;
        element.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return ref;
};
