import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
  phase: number;
}

export const ParticleTitle = ({ text = "State of Being" }: { text?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const startTimeRef = useRef(Date.now());

  const sampleText = useCallback((canvas: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    const vw = window.innerWidth;
    let fontSize: number;
    if (vw < 480) fontSize = 40;
    else if (vw < 640) fontSize = 52;
    else if (vw < 768) fontSize = 72;
    else if (vw < 1024) fontSize = 100;
    else if (vw < 1280) fontSize = 130;
    else fontSize = 160;

    const offscreen = document.createElement('canvas');
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const offCtx = offscreen.getContext('2d')!;
    offCtx.scale(dpr, dpr);

    offCtx.fillStyle = '#ffffff';
    offCtx.font = `400 ${fontSize}px Lato, sans-serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText(text, w / 2, h / 2);

    // Dense sampling — gap of 2px for crisp readable text
    const gap = vw < 640 ? 2.5 : 2;
    const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
    const particles: Particle[] = [];
    const stepPx = Math.round(gap * dpr);

    for (let y = 0; y < canvas.height; y += stepPx) {
      for (let x = 0; x < canvas.width; x += stepPx) {
        const i = (y * canvas.width + x) * 4;
        if (imageData.data[i + 3] > 100) {
          const px = x / dpr;
          const py = y / dpr;
          // Start near origin with small scatter for fast assembly
          const scatter = 30;
          particles.push({
            x: px + (Math.random() - 0.5) * scatter,
            y: py + (Math.random() - 0.5) * scatter,
            originX: px,
            originY: py,
            size: Math.random() * 0.6 + 1.0, // 1.0–1.6px, bigger for readability
            opacity: Math.random() * 0.3 + 0.7, // 0.7–1.0, brighter
            speed: Math.random() * 0.05 + 0.12, // fast spring-back
            drift: Math.random() * 0.4 + 0.1,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    particlesRef.current = particles;
    startTimeRef.current = Date.now();
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
      sampleText(canvas);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const animate = () => {
      const currentDpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(currentDpr, currentDpr);

      time += 0.016;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Assembly progress: particles settle in ~0.5s
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const assemblyT = Math.min(1, elapsed / 0.5);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle breathing once assembled
        const breathScale = assemblyT;
        const breathX = Math.sin(time * 0.6 + p.phase) * p.drift * breathScale;
        const breathY = Math.cos(time * 0.5 + p.phase * 1.3) * p.drift * breathScale;

        const targetX = p.originX + breathX;
        const targetY = p.originY + breathY;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulseRadius = 60;

        if (dist < repulseRadius && dist > 0) {
          const force = (repulseRadius - dist) / repulseRadius;
          p.x += (dx / dist) * force * 4;
          p.y += (dy / dist) * force * 4;
        }

        // Fast spring — use higher speed during assembly
        const springSpeed = assemblyT < 1 ? 0.2 : p.speed;
        p.x += (targetX - p.x) * springSpeed;
        p.y += (targetY - p.y) * springSpeed;

        // Subtle shimmer
        const shimmer = Math.sin(time * 1.5 + p.phase) * 0.1;
        const alpha = Math.min(1, p.opacity + shimmer);

        const lightness = 88 + Math.sin(time * 0.8 + p.phase) * 7;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsl(210, 25%, ${lightness}%)`;
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
      <h1 className="sr-only">State of Being</h1>
    </div>
  );
};
