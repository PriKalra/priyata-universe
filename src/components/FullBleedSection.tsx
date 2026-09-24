import { ReactNode, useEffect, useRef, useState } from 'react';

interface FullBleedSectionProps {
  backgroundImage?: string;
  backgroundColor?: string;
  children: ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
  minHeight?: string;
}

export const FullBleedSection = ({
  backgroundImage,
  backgroundColor = 'hsl(var(--cosmic-dark))',
  children,
  overlay = true,
  overlayOpacity = 0.6,
  minHeight = "100vh"
}: FullBleedSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  // Start with no image on touch devices' data plans: it is fetched only when
  // the section is about to scroll into view.
  const [loadImage, setLoadImage] = useState(false);
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    if (!backgroundImage) return;
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setLoadImage(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadImage(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [backgroundImage]);

  // background-attachment: fixed is a repaint-heavy effect that mobile
  // browsers handle poorly (iOS ignores it entirely). Keep the parallax
  // feel on desktop pointers, use normal scrolling elsewhere.
  const [fixedBg, setFixedBg] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFixedBg(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center"
      style={{ minHeight }}
    >
      {/* Base color layer (always present, also the loading state) */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor }}
      />

      {/* Background image — only fetched near the viewport, fades in when ready */}
      {backgroundImage && loadImage && (
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${fixedBg ? 'bg-fixed' : 'bg-scroll'}`}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            opacity: imageReady ? 1 : 0,
          }}
        />
      )}
      {backgroundImage && loadImage && !imageReady && (
        // Hidden probe image tells us when the background is decoded
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="hidden"
          onLoad={() => setImageReady(true)}
        />
      )}

      {backgroundImage && overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 text-white">
        {children}
      </div>
    </section>
  );
};
