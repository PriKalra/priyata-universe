import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  opacity: number;
  speed: number;
  angle: number;
  drift: number;
  phase: number;
}

export const ParticleTitle = ({ text = "State of Being" }: { text?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const initializedRef = useRef(false);

  const sampleText = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    // Determine font size based on viewport width
    const vw = window.innerWidth;
    let fontSize: number;
    if (vw < 480) fontSize = 38;
    else if (vw < 640) fontSize = 48;
    else if (vw < 768) fontSize = 64;
    else if (vw < 1024) fontSize = 96;
    else if (vw < 1280) fontSize = 128;
    else fontSize = 160;

    // Render text offscreen to sample pixel positions
    const offscreen = document.createElement('canvas');
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const offCtx = offscreen.getContext('2d')!;
    offCtx.scale(dpr, dpr);

    offCtx.fillStyle = '#ffffff';
    offCtx.font = `300 ${fontSize}px Lato, sans-serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText(text, w / 2, h / 2);

    // Sample pixels — density based on screen size
    const gap = vw < 640 ? 4 : 3;
    const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
    const particles: Particle[] = [];

    for (let y = 0; y < canvas.height; y += gap * dpr) {
      for (let x = 0; x < canvas.width; x += gap * dpr) {
        const i = (y * canvas.width + x) * 4;
        if (imageData.data[i + 3] > 128) {
          const px = x / dpr;
          const py = y / dpr;
          particles.push({
            x: px + (Math.random() - 0.5) * 200,
            y: py + (Math.random() - 0.5) * 200,
            originX: px,
            originY: py,
            size: Math.random() * 1.8 + 0.6,
            opacity: Math.random() * 0.5 + 0.5,
            speed: Math.random() * 0.02 + 0.03,
            angle: Math.random() * Math.PI * 2,
            drift: Math.random() * 0.3 + 0.1,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    particlesRef.current = particles;
    initializedRef.current = true;
  }, [text]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      sampleText(canvas, ctx);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      time += 0.016;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ease toward origin with gentle drift
        const breathX = Math.sin(time * 0.5 + p.phase) * p.drift;
        const breathY = Math.cos(time * 0.4 + p.phase * 1.3) * p.drift;

        const targetX = p.originX + breathX;
        const targetY = p.originY + breathY;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulseRadius = 80;

        if (dist < repulseRadius && dist > 0) {
          const force = (repulseRadius - dist) / repulseRadius;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
        }

        // Spring back
        p.x += (targetX - p.x) * p.speed;
        p.y += (targetY - p.y) * p.speed;

        // Shimmer opacity
        const shimmer = Math.sin(time * 2 + p.phase) * 0.15;
        const alpha = Math.min(1, p.opacity + shimmer);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsla(210, 30%, ${85 + Math.sin(time + p.phase) * 10}%, 1)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [sampleText]);

  return (
    <div className="relative w-full" style={{ height: 'clamp(80px, 15vw, 220px)' }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-label="State of Being"
        role="img"
      />
      {/* SR-only fallback */}
      <h1 className="sr-only">State of Being</h1>
    </div>
  );
};
