import { ReactNode } from 'react';

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
  return (
    <section 
      className="relative w-full flex items-center justify-center"
      style={{ minHeight }}
    >
      {/* Background */}
      {backgroundImage ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              willChange: 'transform'
            }}
          />
          {overlay && (
            <div 
              className="absolute inset-0 bg-black"
              style={{ opacity: overlayOpacity }}
            />
          )}
        </>
      ) : (
        <div 
          className="absolute inset-0"
          style={{ backgroundColor }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 text-white">
        {children}
      </div>
    </section>
  );
};