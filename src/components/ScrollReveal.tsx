import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  className,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold, triggerOnce });

  const directionClass = {
    up: 'scroll-reveal-up',
    down: 'scroll-reveal-down',
    left: 'scroll-reveal-left',
    right: 'scroll-reveal-right',
    scale: 'scroll-reveal-scale',
  }[direction];

  return (
    <div
      ref={ref}
      className={cn(
        'scroll-reveal',
        directionClass,
        isVisible && 'visible',
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
