import { useEffect, useRef } from 'react';

export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId = 0;
    let ticking = false;
    let visible = false;

    const update = () => {
      ticking = false;
      if (!visible) return;

      const scrolled = window.scrollY;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled - window.innerHeight;

      if (scrolled > elementTop && scrolled < elementTop + rect.height + window.innerHeight) {
        const offset = (scrolled - elementTop) * speed;
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    // Only listen while the element is near the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) handleScroll();
      },
      { rootMargin: '200px' }
    );
    observer.observe(element);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return ref;
};
