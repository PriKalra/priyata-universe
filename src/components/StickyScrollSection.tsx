import { ReactNode, useEffect, useRef, useState } from 'react';

interface StickyScrollSectionProps {
  stickyContent: ReactNode;
  children: ReactNode;
  minHeight?: string;
}

export const StickyScrollSection = ({ 
  stickyContent, 
  children,
  minHeight = "100vh"
}: StickyScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate progress through the section
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - sectionTop) / (sectionHeight + windowHeight)
      ));

      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative"
      style={{ minHeight }}
    >
      <div className="grid lg:grid-cols-2 gap-0 lg:gap-12">
        {/* Sticky content on the left */}
        <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center p-6 lg:p-12">
          <div 
            ref={stickyRef}
            className="w-full"
            style={{ 
              opacity: 0.4 + (progress * 0.6),
              transform: `scale(${0.95 + (progress * 0.05)})`
            }}
          >
            {stickyContent}
          </div>
        </div>

        {/* Scrolling content on the right */}
        <div className="flex flex-col justify-center space-y-8 p-6 lg:p-12 lg:py-24">
          {children}
        </div>
      </div>
    </section>
  );
};