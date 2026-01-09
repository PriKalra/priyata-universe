import { useEffect, useRef, useState } from 'react';

// Golden Ratio constants
const PHI = 1.618033988749895;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees in radians
const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];

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

    // Golden ratio based spiral galaxies
    const goldenSpirals: Array<{
      cx: number;
      cy: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      hue: number;
      direction: number;
    }> = [];
    
    // Distribute spirals using golden ratio positioning
    const numSpirals = 5;
    for (let i = 0; i < numSpirals; i++) {
      const angle = i * GOLDEN_ANGLE;
      const radius = Math.sqrt(i + 1) * (Math.min(width, height) / 4);
      goldenSpirals.push({
        cx: width / 2 + Math.cos(angle) * radius * 0.5,
        cy: height / 2 + Math.sin(angle) * radius * 0.4,
        size: FIBONACCI[6 + (i % 4)] * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.0003 / PHI,
        hue: 180 + i * (60 / PHI),
        direction: i % 2 === 0 ? 1 : -1,
      });
    }

    // Fibonacci-distributed neural nodes
    const neurons: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      hue: number;
      pulsePhase: number;
      pulseSpeed: number;
      fibIndex: number;
    }> = [];
    
    const numNeurons = FIBONACCI[7]; // 21 neurons
    for (let i = 0; i < numNeurons; i++) {
      const angle = i * GOLDEN_ANGLE;
      const radius = Math.sqrt(i) * (Math.min(width, height) / 15);
      neurons.push({
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: Math.cos(angle + Math.PI / 2) * 0.08,
        vy: Math.sin(angle + Math.PI / 2) * 0.08,
        radius: 2 + (FIBONACCI[i % 8] / FIBONACCI[7]) * 5,
        hue: 180 + (i / numNeurons) * 60,
        pulsePhase: (i / numNeurons) * Math.PI * 2,
        pulseSpeed: 0.015 / PHI,
        fibIndex: i % FIBONACCI.length,
      });
    }

    // Golden-angle distributed particles
    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      orbitRadius: number;
      orbitSpeed: number;
      orbitPhase: number;
      hue: number;
      alpha: number;
      pulsePhase: number;
      pulseSpeed: number;
    }> = [];
    
    const numParticles = FIBONACCI[10]; // 89 particles - cleaner, more intentional
    for (let i = 0; i < numParticles; i++) {
      const angle = i * GOLDEN_ANGLE;
      const radius = Math.sqrt(i) * (Math.min(width, height) / 12);
      const baseX = width / 2 + Math.cos(angle) * radius;
      const baseY = height / 2 + Math.sin(angle) * radius;
      
      particles.push({
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        size: 0.5 + (Math.sqrt(i + 1) / Math.sqrt(numParticles)) * 2.5,
        orbitRadius: FIBONACCI[i % 7] * 0.3,
        orbitSpeed: 0.008 / (1 + (i % 5) * 0.2),
        orbitPhase: angle,
        hue: 170 + (i / numParticles) * 80,
        alpha: 0.3 + (1 - i / numParticles) * 0.5,
        pulsePhase: (i / numParticles) * Math.PI * 2,
        pulseSpeed: 0.01 + (1 / PHI) * 0.005,
      });
    }

    // Comets following golden spiral paths
    const comets: Array<{
      angle: number;
      distance: number;
      speed: number;
      hue: number;
      tailLength: number;
      size: number;
      spiralTightness: number;
    }> = [];
    
    for (let i = 0; i < 2; i++) {
      comets.push({
        angle: Math.random() * Math.PI * 2,
        distance: FIBONACCI[8 + i] * 2,
        speed: 0.003 + i * 0.001,
        hue: 190 + i * 40,
        tailLength: FIBONACCI[6 + i],
        size: 2 + i,
        spiralTightness: 0.2 + i * 0.1,
      });
    }

    // Draw golden spiral (Fibonacci spiral)
    const drawGoldenSpiral = (
      cx: number, 
      cy: number, 
      size: number, 
      rotation: number, 
      hue: number,
      direction: number
    ) => {
      const arms = FIBONACCI[3]; // 3 arms for golden aesthetic
      const pointsPerArm = FIBONACCI[8]; // 34 points per arm
      
      for (let arm = 0; arm < arms; arm++) {
        const armAngle = (arm / arms) * Math.PI * 2 + rotation;
        
        for (let i = 0; i < pointsPerArm; i++) {
          const t = i / pointsPerArm;
          // Golden spiral: r = a * e^(b * theta)
          const b = Math.log(PHI) / (Math.PI / 2);
          const theta = t * Math.PI * 3 * direction;
          const distance = size * Math.pow(PHI, theta / (Math.PI * 2)) * 0.15;
          const angle = armAngle + theta;
          
          const x = cx + Math.cos(angle) * distance;
          const y = cy + Math.sin(angle) * distance;
          
          // Particle size follows inverse golden ratio for organic falloff
          const particleSize = (1 - t) * 2.5 + 0.3;
          const alpha = Math.pow(1 - t, 1 / PHI) * 0.7;
          
          // Color shift along spiral using golden ratio
          const colorShift = t * 40 / PHI;
          
          ctx.fillStyle = `hsla(${hue + colorShift}, 75%, ${55 + t * 25}%, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, particleSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Subtle glow for larger particles
          if (particleSize > 1.5) {
            ctx.shadowBlur = particleSize * 4;
            ctx.shadowColor = `hsla(${hue}, 90%, 65%, ${alpha * 0.4})`;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }
      
      // Draw central glow
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.3);
      gradient.addColorStop(0, `hsla(${hue}, 80%, 75%, 0.4)`);
      gradient.addColorStop(0.5 / PHI, `hsla(${hue + 20}, 70%, 60%, 0.15)`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw neuron with golden ratio proportions
    const drawNeuron = (neuron: typeof neurons[0], pulse: number) => {
      const radius = neuron.radius * (0.85 + pulse * 0.3);
      
      // Outer glow using phi proportions
      const glowRadius = radius * (1 + PHI);
      const gradient = ctx.createRadialGradient(
        neuron.x, neuron.y, 0,
        neuron.x, neuron.y, glowRadius
      );
      gradient.addColorStop(0, `hsla(${neuron.hue}, 85%, 70%, 0.7)`);
      gradient.addColorStop(1 / PHI, `hsla(${neuron.hue + 15}, 80%, 60%, 0.25)`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Core
      ctx.fillStyle = `hsla(${neuron.hue}, 90%, 75%, 0.95)`;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner highlight at golden ratio position
      ctx.fillStyle = `hsla(${neuron.hue}, 100%, 92%, 0.85)`;
      ctx.beginPath();
      ctx.arc(
        neuron.x - radius / PHI, 
        neuron.y - radius / PHI, 
        radius / (PHI * 2), 
        0, Math.PI * 2
      );
      ctx.fill();
    };

    // Draw comet following golden spiral path
    const drawGoldenComet = (comet: typeof comets[0], frame: number) => {
      const b = Math.log(PHI) / (Math.PI / 2) * comet.spiralTightness;
      const r = comet.distance * Math.pow(Math.E, b * comet.angle * 0.1);
      
      const x = width / 2 + Math.cos(comet.angle) * r;
      const y = height / 2 + Math.sin(comet.angle) * r;
      
      // Direction for tail
      const prevAngle = comet.angle - comet.speed * 10;
      const prevR = comet.distance * Math.pow(Math.E, b * prevAngle * 0.1);
      const dx = Math.cos(comet.angle) * r - Math.cos(prevAngle) * prevR;
      const dy = Math.sin(comet.angle) * r - Math.sin(prevAngle) * prevR;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      
      // Draw tail with Fibonacci-based segments
      const tailSegments = FIBONACCI[5]; // 8 segments
      for (let i = 0; i < tailSegments; i++) {
        const t = i / tailSegments;
        const tailDist = t * comet.tailLength;
        const tailX = x - (dx / len) * tailDist * 3;
        const tailY = y - (dy / len) * tailDist * 3;
        const tailSize = comet.size * Math.pow(1 - t, 1 / PHI) * 1.5;
        const tailAlpha = Math.pow(1 - t, PHI) * 0.7;
        
        ctx.fillStyle = `hsla(${comet.hue + t * 30}, 75%, 70%, ${tailAlpha})`;
        ctx.beginPath();
        ctx.arc(tailX, tailY, tailSize, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Comet head with glow
      const headGlow = ctx.createRadialGradient(x, y, 0, x, y, comet.size * PHI * 2);
      headGlow.addColorStop(0, `hsla(${comet.hue}, 100%, 95%, 1)`);
      headGlow.addColorStop(0.5, `hsla(${comet.hue}, 90%, 80%, 0.6)`);
      headGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = headGlow;
      ctx.beginPath();
      ctx.arc(x, y, comet.size * PHI * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Bright core
      ctx.fillStyle = `hsla(${comet.hue + 20}, 100%, 98%, 1)`;
      ctx.beginPath();
      ctx.arc(x, y, comet.size, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw organic nebula clouds with golden ratio fade
    const drawNebula = (frame: number) => {
      const numClouds = FIBONACCI[3]; // 3 nebula clouds
      
      for (let i = 0; i < numClouds; i++) {
        const phase = frame * 0.0003 + (i * Math.PI * 2) / numClouds;
        const x = width / 2 + Math.sin(phase * PHI) * (width / 4);
        const y = height / 2 + Math.cos(phase) * (height / 5);
        const size = FIBONACCI[8 + i] * 3;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        const hue = 200 + i * (50 / PHI);
        gradient.addColorStop(0, `hsla(${hue}, 60%, 45%, 0.04)`);
        gradient.addColorStop(1 / PHI, `hsla(${hue + 30}, 50%, 35%, 0.015)`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Animation loop
    let frame = 0;
    let animationId: number;
    
    const animate = () => {
      // Deep space background with subtle gradient
      const bgGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0, 
        width / 2, height / 2, Math.max(width, height) / PHI
      );
      bgGradient.addColorStop(0, '#0c0c1a');
      bgGradient.addColorStop(1 / PHI, '#060610');
      bgGradient.addColorStop(1, '#020204');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      frame++;

      // Draw nebulae
      drawNebula(frame);

      // Draw and update golden spirals
      goldenSpirals.forEach((spiral) => {
        spiral.rotation += spiral.rotationSpeed;
        const pulse = Math.sin(frame * 0.008) * 0.08 + 1;
        drawGoldenSpiral(
          spiral.cx, 
          spiral.cy, 
          spiral.size * pulse, 
          spiral.rotation, 
          spiral.hue,
          spiral.direction
        );
      });

      // Update and draw particles with orbital motion
      particles.forEach((p) => {
        p.orbitPhase += p.orbitSpeed;
        p.pulsePhase += p.pulseSpeed;
        
        // Gentle orbital motion around base position
        p.x = p.baseX + Math.cos(p.orbitPhase) * p.orbitRadius;
        p.y = p.baseY + Math.sin(p.orbitPhase * PHI) * p.orbitRadius;
        
        const pulse = Math.sin(p.pulsePhase) * 0.3 + 0.7;
        const currentSize = p.size * pulse;
        const currentAlpha = p.alpha * (0.6 + pulse * 0.4);

        ctx.fillStyle = `hsla(${p.hue}, 85%, 70%, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        if (currentSize > 1.2) {
          ctx.shadowBlur = currentSize * 5;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${currentAlpha * 0.5})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw particle connections (constellation effect) - only nearby particles
      ctx.globalAlpha = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const connectLimit = Math.min(i + FIBONACCI[4], particles.length); // Connect only to nearby in sequence
        for (let j = i + 1; j < connectLimit; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < FIBONACCI[7] * 4) { // 84px max connection
            const alpha = Math.pow(1 - distance / (FIBONACCI[7] * 4), PHI) * 0.2;
            ctx.strokeStyle = `hsla(195, 70%, 55%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Update and draw neurons
      neurons.forEach((neuron) => {
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;
        neuron.pulsePhase += neuron.pulseSpeed;

        // Soft boundary wrapping
        if (neuron.x < -50) neuron.x = width + 50;
        if (neuron.x > width + 50) neuron.x = -50;
        if (neuron.y < -50) neuron.y = height + 50;
        if (neuron.y > height + 50) neuron.y = -50;

        const pulse = (Math.sin(neuron.pulsePhase) + 1) / 2;
        drawNeuron(neuron, pulse);
      });

      // Draw neural connections with organic curves
      ctx.globalAlpha = 0.7;
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDist = FIBONACCI[8] * 5; // ~170px
          if (distance < maxDist) {
            const alpha = Math.pow(1 - distance / maxDist, PHI) * 0.4;
            
            // Curved connection using quadratic bezier
            const midX = (neurons[i].x + neurons[j].x) / 2;
            const midY = (neurons[i].y + neurons[j].y) / 2;
            const perpX = -dy / distance * 15;
            const perpY = dx / distance * 15;
            
            const gradient = ctx.createLinearGradient(
              neurons[i].x, neurons[i].y,
              neurons[j].x, neurons[j].y
            );
            gradient.addColorStop(0, `hsla(${neurons[i].hue}, 75%, 60%, ${alpha})`);
            gradient.addColorStop(1, `hsla(${neurons[j].hue}, 75%, 60%, ${alpha})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(neurons[i].x, neurons[i].y);
            ctx.quadraticCurveTo(midX + perpX, midY + perpY, neurons[j].x, neurons[j].y);
            ctx.stroke();
            
            // Signal pulse traveling along connection
            const signalPos = (frame * 0.012 + i * 0.1) % 1;
            const t = signalPos;
            const signalX = Math.pow(1-t, 2) * neurons[i].x + 
                           2 * (1-t) * t * (midX + perpX) + 
                           Math.pow(t, 2) * neurons[j].x;
            const signalY = Math.pow(1-t, 2) * neurons[i].y + 
                           2 * (1-t) * t * (midY + perpY) + 
                           Math.pow(t, 2) * neurons[j].y;
            
            const signalAlpha = Math.sin(signalPos * Math.PI) * 0.8;
            ctx.fillStyle = `hsla(195, 100%, 80%, ${signalAlpha})`;
            ctx.beginPath();
            ctx.arc(signalX, signalY, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Update and draw comets
      comets.forEach((comet) => {
        comet.angle += comet.speed;
        comet.distance += Math.sin(frame * 0.01) * 0.5;
        
        // Reset when too far
        if (comet.distance > Math.max(width, height)) {
          comet.distance = FIBONACCI[6] * 2;
          comet.angle = Math.random() * Math.PI * 2;
        }
        
        drawGoldenComet(comet, frame);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: '#020204' }}>
      <canvas 
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
};
