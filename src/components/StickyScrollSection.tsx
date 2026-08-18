import { ReactNode, useEffect, useRef } from 'react';

interface StickyScrollSectionProps {
  stickyContent: ReactNode;
  children: ReactNode;
  minHeight?: string;
  id?: string;
}

export const StickyScrollSection = ({ 
  stickyContent, 
  children,
  minHeight = "100vh",
  id
}: StickyScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      if (!section || !sticky) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Skip work entirely when the section is off screen
      if (rect.bottom < 0 || rect.top > windowHeight) return;

      const scrollProgress = Math.max(0, Math.min(1,
        (windowHeight - rect.top) / (rect.height + windowHeight)
      ));

      // Write styles directly — avoids a React re-render on every scroll frame
      sticky.style.opacity = `${0.4 + scrollProgress * 0.6}`;
      sticky.style.transform = `scale(${0.95 + scrollProgress * 0.05})`;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    update(); // Initial call

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);


  return (
    <section 
      ref={sectionRef}
      id={id}
      className="relative"
      style={{ minHeight }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
        {/* Sticky content on the left - hidden on very small screens, visible on md+ */}
        <div className="hidden md:flex lg:sticky lg:top-0 lg:h-screen items-center justify-center p-4 sm:p-6 lg:p-12">
          <div 
            ref={stickyRef}
            className="w-full will-change-transform"
            style={{ opacity: 0.4, transform: 'scale(0.95)' }}
          >

            {stickyContent}
          </div>
        </div>

        {/* Scrolling content on the right */}
        <div className="flex flex-col justify-center space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-12 lg:py-24 md:col-span-1 col-span-full">
          {children}
        </div>
      </div>
    </section>
  );
};