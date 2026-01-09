import { useEffect, useRef, useState } from 'react';

export const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = dimensions;
    
    canvas.width = width;
    canvas.height = height;

    // Fractal star clusters
    const starClusters = [];
    const numClusters = 8;
    
    for (let i = 0; i < numClusters; i++) {
      starClusters.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 50 + Math.random() * 150,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.001,
        hue: Math.random() * 60 + 180,
      });
    }

    // Neural nodes (neurons)
    const neurons = [];
    const numNeurons = 40;
    
    for (let i = 0; i < numNeurons; i++) {
      neurons.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: 3 + Math.random() * 4,
        hue: 180 + Math.random() * 60,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      });
    }

    // Particles
    const particles = [];
    const numParticles = 250;
    
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        hue: Math.random() * 360,
        alpha: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Comets
    const comets = [];
    const numComets = 3;
    
    for (let i = 0; i < numComets; i++) {
      comets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2 + 1.5,
        vy: (Math.random() - 0.5) * 2 + 1.5,
        hue: 180 + Math.random() * 80,
        tailLength: 30 + Math.random() * 20,
        size: 2 + Math.random() * 2,
      });
    }

    // Draw a fractal branch (recursive)
    const drawFractalBranch = (x: number, y: number, length: number, angle: number, depth: number, hue: number) => {
      if (depth === 0 || length < 2) return;

      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;

      const gradient = ctx.createLinearGradient(x, y, endX, endY);
      gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.4)`);
      gradient.addColorStop(1, `hsla(${hue + 30}, 90%, 70%, 0.7)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = depth * 0.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      const newLength = length * 0.7;
      const angleOffset = Math.PI / 6;
      
      drawFractalBranch(endX, endY, newLength, angle - angleOffset, depth - 1, hue + 10);
      drawFractalBranch(endX, endY, newLength, angle + angleOffset, depth - 1, hue + 10);
    };

    // Draw spiral galaxy pattern
    const drawSpiralGalaxy = (cx: number, cy: number, size: number, rotation: number, hue: number) => {
      const arms = 5;
      const pointsPerArm = 50;
      
      for (let arm = 0; arm < arms; arm++) {
        const armAngle = (arm / arms) * Math.PI * 2 + rotation;
        
        for (let i = 0; i < pointsPerArm; i++) {
          const t = i / pointsPerArm;
          const distance = t * size;
          const angle = armAngle + t * Math.PI * 4;
          
          const x = cx + Math.cos(angle) * distance;
          const y = cy + Math.sin(angle) * distance;
          
          const particleSize = (1 - t) * 3 + 0.5;
          const alpha = (1 - t) * 0.6;
          
          ctx.fillStyle = `hsla(${hue + t * 40}, 80%, ${60 + t * 20}%, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, particleSize, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsla(${hue}, 100%, 70%, ${alpha * 0.5})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    };

    // Draw neuron with glow
    const drawNeuron = (neuron: any, pulse: number) => {
      const radius = neuron.radius * (0.8 + pulse * 0.4);
      
      // Nucleus
      ctx.fillStyle = `hsla(${neuron.hue}, 90%, 70%, 0.9)`;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Glow
      const gradient = ctx.createRadialGradient(
        neuron.x, neuron.y, 0,
        neuron.x, neuron.y, radius * 3
      );
      gradient.addColorStop(0, `hsla(${neuron.hue}, 100%, 80%, 0.6)`);
      gradient.addColorStop(0.5, `hsla(${neuron.hue}, 100%, 70%, 0.3)`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, radius * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Core highlight
      ctx.fillStyle = `hsla(${neuron.hue}, 100%, 95%, 0.8)`;
      ctx.beginPath();
      ctx.arc(neuron.x - radius * 0.3, neuron.y - radius * 0.3, radius * 0.4, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw comet with tail
    const drawComet = (comet: any) => {
      const tailPoints = 15;
      
      // Draw tail
      for (let i = 0; i < tailPoints; i++) {
        const t = i / tailPoints;
        const tailX = comet.x - comet.vx * t * comet.tailLength;
        const tailY = comet.y - comet.vy * t * comet.tailLength;
        const tailSize = comet.size * (1 - t) * 1.5;
        const tailAlpha = (1 - t) * 0.6;
        
        ctx.fillStyle = `hsla(${comet.hue}, 80%, 70%, ${tailAlpha})`;
        ctx.beginPath();
        ctx.arc(tailX, tailY, tailSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${comet.hue}, 100%, 80%, ${tailAlpha * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      // Draw comet head
      ctx.fillStyle = `hsla(${comet.hue}, 100%, 90%, 0.95)`;
      ctx.beginPath();
      ctx.arc(comet.x, comet.y, comet.size * 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Bright core
      ctx.fillStyle = `hsla(${comet.hue + 20}, 100%, 95%, 1)`;
      ctx.beginPath();
      ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowBlur = 25;
      ctx.shadowColor = `hsla(${comet.hue}, 100%, 90%, 0.8)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    // Animation loop
    let frame = 0;
    const animate = () => {
      // Create deep space background
      const bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
      bgGradient.addColorStop(0, '#0a0a1f');
      bgGradient.addColorStop(0.5, '#050510');
      bgGradient.addColorStop(1, '#000005');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      frame++;

      // Draw cosmic nebula
      for (let i = 0; i < 5; i++) {
        const x = width / 2 + Math.sin(frame * 0.001 + i) * 300;
        const y = height / 2 + Math.cos(frame * 0.001 + i) * 200;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 200);
        gradient.addColorStop(0, `hsla(${200 + i * 30}, 70%, 40%, 0.05)`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw star clusters
      starClusters.forEach((cluster, idx) => {
        cluster.rotation += cluster.rotationSpeed;
        const pulse = Math.sin(frame * 0.02 + idx) * 0.3 + 1;
        
        drawSpiralGalaxy(cluster.x, cluster.y, cluster.size * pulse, cluster.rotation, cluster.hue);

        if (idx % 2 === 0) {
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 + cluster.rotation;
            drawFractalBranch(cluster.x, cluster.y, 40, angle, 4, cluster.hue);
          }
        }
      });

      // Update and draw neurons
      neurons.forEach((neuron) => {
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;
        neuron.pulsePhase += neuron.pulseSpeed;

        if (neuron.x < 0) neuron.x = width;
        if (neuron.x > width) neuron.x = 0;
        if (neuron.y < 0) neuron.y = height;
        if (neuron.y > height) neuron.y = 0;

        const pulse = Math.sin(neuron.pulsePhase) * 0.5 + 0.5;
        drawNeuron(neuron, pulse);
      });

      // Draw neural connections
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.5;
            const gradient = ctx.createLinearGradient(
              neurons[i].x, neurons[i].y,
              neurons[j].x, neurons[j].y
            );
            gradient.addColorStop(0, `hsla(${neurons[i].hue}, 80%, 60%, ${alpha})`);
            gradient.addColorStop(1, `hsla(${neurons[j].hue}, 80%, 60%, ${alpha})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(neurons[i].x, neurons[i].y);
            ctx.lineTo(neurons[j].x, neurons[j].y);
            ctx.stroke();
            
            // Signal pulse
            const signalPos = (frame * 0.02) % 1;
            const signalX = neurons[i].x - dx * signalPos;
            const signalY = neurons[i].y - dy * signalPos;
            
            ctx.fillStyle = `hsla(200, 100%, 80%, ${0.8 * (1 - signalPos)})`;
            ctx.beginPath();
            ctx.arc(signalX, signalY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Update and draw comets
      comets.forEach((comet) => {
        comet.x += comet.vx;
        comet.y += comet.vy;

        if (comet.x < -100) {
          comet.x = width + 100;
          comet.y = Math.random() * height;
        }
        if (comet.x > width + 100) {
          comet.x = -100;
          comet.y = Math.random() * height;
        }
        if (comet.y < -100) {
          comet.y = height + 100;
          comet.x = Math.random() * width;
        }
        if (comet.y > height + 100) {
          comet.y = -100;
          comet.x = Math.random() * width;
        }

        drawComet(comet);
      });

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulsePhase += p.pulseSpeed;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(p.pulsePhase) * 0.5 + 0.5;
        const currentSize = p.size * (0.5 + pulse);
        const currentAlpha = p.alpha * (0.5 + pulse);

        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${currentAlpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw constellation connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const alpha = (1 - distance / 100) * 0.15;
            ctx.strokeStyle = `hsla(200, 80%, 60%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [dimensions]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: '#000' }}>
      <canvas 
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
};
