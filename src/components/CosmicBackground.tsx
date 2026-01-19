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

    // Golden ratio and Fibonacci constants
    const PHI = 1.618033988749895; // Golden ratio
    const GOLDEN_ANGLE = 137.508; // Golden angle in degrees
    const FIBONACCI_NUMS = [1, 1, 2, 3, 5, 8, 13, 21, 34];

    // Fibonacci spiral biological cells
    const fibonacciCells = [];
    const numFibonacciCells = 21; // Fibonacci number
    const spiralCenterX = width / 2 + (Math.random() - 0.5) * width * 0.3;
    const spiralCenterY = height / 2 + (Math.random() - 0.5) * height * 0.3;

    for (let i = 0; i < numFibonacciCells; i++) {
      const angle = i * GOLDEN_ANGLE * (Math.PI / 180);
      const radius = Math.sqrt(i + 1) * 35; // Fibonacci spiral spacing
      const x = spiralCenterX + Math.cos(angle) * radius;
      const y = spiralCenterY + Math.sin(angle) * radius;

      fibonacciCells.push({
        x: x,
        y: y,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
        radius: 8 + (i % 5) * 2,
        hue: 160 + (i * 5) % 60,
        pulsePhase: (i / numFibonacciCells) * Math.PI * 2,
        pulseSpeed: 0.015,
        projections: FIBONACCI_NUMS[i % FIBONACCI_NUMS.length],
        projectionLength: 12 + (i % 4) * 3,
        spiralIndex: i,
      });
    }

    // Golden ratio phyllotaxis pattern cells
    const phyllotaxisCells = [];
    const numPhyllotaxisCells = 34; // Fibonacci number
    const phyllotaxisCenterX = width * (1 / PHI); // Golden ratio position
    const phyllotaxisCenterY = height * (1 / PHI);

    for (let i = 0; i < numPhyllotaxisCells; i++) {
      const angle = i * GOLDEN_ANGLE * (Math.PI / 180);
      const radius = Math.sqrt(i + 1) * 25;
      const x = phyllotaxisCenterX + Math.cos(angle) * radius;
      const y = phyllotaxisCenterY + Math.sin(angle) * radius;

      phyllotaxisCells.push({
        x: x,
        y: y,
        baseX: x,
        baseY: y,
        radius: 5 + (i % 3) * 1.5,
        hue: 120 + (i * 7) % 80,
        pulsePhase: (i / numPhyllotaxisCells) * Math.PI * 2,
        pulseSpeed: 0.018,
        projections: 5 + (i % 3),
        projectionLength: 10 + (i % 3) * 2,
        phyllotaxisIndex: i,
      });
    }

    // Additional biological cells (random placement)
    const bioCells = [];
    const numBioCells = 8; // Fibonacci number

    for (let i = 0; i < numBioCells; i++) {
      bioCells.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        radius: 12 + Math.random() * 8,
        hue: 140 + Math.random() * 40,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.012 + Math.random() * 0.012,
        projections: 6 + Math.floor(Math.random() * 4),
        projectionLength: 15 + Math.random() * 10,
      });
    }

    // Mathematical equations (subtle overlay) - initialized after spiral centers are defined
    const equations = [
      { text: 'dC/dt = ka·D - ke·C', x: 0, y: 0, vx: 0, vy: 0, opacity: 0, targetOpacity: 0.25, type: 'pk' },
      { text: '∂²u/∂t² = c²∇²u', x: 0, y: 0, vx: 0, vy: 0, opacity: 0, targetOpacity: 0.25, type: 'wave' },
      { text: 'E = Emax·C/(EC50+C)', x: 0, y: 0, vx: 0, vy: 0, opacity: 0, targetOpacity: 0.25, type: 'pd' },
      { text: 'φ = (1+√5)/2 ≈ 1.618', x: 0, y: 0, vx: 0, vy: 0, opacity: 0, targetOpacity: 0.3, type: 'phi' },
      { text: 'θ = 137.508°', x: 0, y: 0, vx: 0, vy: 0, opacity: 0, targetOpacity: 0.3, type: 'golden' },
      { text: 'Fn = Fn-1 + Fn-2', x: 0, y: 0, vx: 0, vy: 0, opacity: 0, targetOpacity: 0.3, type: 'fib' },
    ];

    equations.forEach((eq, idx) => {
      if (eq.type === 'phi' || eq.type === 'golden') {
        // Place golden ratio equations near the spiral centers
        const nearSpiral = Math.random() > 0.5;
        if (nearSpiral) {
          eq.x = spiralCenterX + (Math.random() - 0.5) * 200;
          eq.y = spiralCenterY + (Math.random() - 0.5) * 200;
        } else {
          eq.x = phyllotaxisCenterX + (Math.random() - 0.5) * 200;
          eq.y = phyllotaxisCenterY + (Math.random() - 0.5) * 200;
        }
      } else if (eq.type === 'fib') {
        // Place Fibonacci equation near the Fibonacci spiral
        eq.x = spiralCenterX + (Math.random() - 0.5) * 250;
        eq.y = spiralCenterY + (Math.random() - 0.5) * 250;
      } else {
        eq.x = Math.random() * width * 0.7 + width * 0.15;
        eq.y = Math.random() * height * 0.6 + height * 0.2;
      }
      eq.vx = (Math.random() - 0.5) * 0.08;
      eq.vy = (Math.random() - 0.5) * 0.08;
    });

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

    // Draw mathematical equation (subtle)
    const drawEquation = (eq: any) => {
      ctx.save();

      // Different colors for different equation types
      let hue = 260; // Default purple
      let fontSize = 14;

      if (eq.type === 'phi' || eq.type === 'golden' || eq.type === 'fib') {
        hue = 45; // Golden color for mathematical constants
        fontSize = 15;
      }

      ctx.font = `italic ${fontSize}px Georgia, serif`;
      ctx.fillStyle = `hsla(${hue}, 70%, 70%, ${eq.opacity})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsla(${hue}, 90%, 75%, ${eq.opacity * 0.5})`;
      ctx.fillText(eq.text, eq.x, eq.y);
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    // Draw biological cell (gut/epithelial cell)
    const drawBioCell = (cell: any, pulse: number, showGoldenRatio: boolean = false) => {
      const radius = cell.radius * (0.9 + pulse * 0.2);

      // Draw projections (villi/dendrites)
      for (let i = 0; i < cell.projections; i++) {
        const angle = (i / cell.projections) * Math.PI * 2;
        const projEndX = cell.x + Math.cos(angle) * (radius + cell.projectionLength);
        const projEndY = cell.y + Math.sin(angle) * (radius + cell.projectionLength);

        ctx.strokeStyle = `hsla(${cell.hue}, 75%, 55%, ${0.4 + pulse * 0.2})`;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cell.x + Math.cos(angle) * radius, cell.y + Math.sin(angle) * radius);
        ctx.lineTo(projEndX, projEndY);
        ctx.stroke();

        // Tip glow
        ctx.fillStyle = `hsla(${cell.hue}, 90%, 70%, ${0.5 + pulse * 0.3})`;
        ctx.beginPath();
        ctx.arc(projEndX, projEndY, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cell body glow
      const bodyGradient = ctx.createRadialGradient(
        cell.x, cell.y, 0,
        cell.x, cell.y, radius * 2
      );
      bodyGradient.addColorStop(0, `hsla(${cell.hue}, 85%, 60%, 0.6)`);
      bodyGradient.addColorStop(0.5, `hsla(${cell.hue}, 80%, 55%, 0.4)`);
      bodyGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = bodyGradient;
      ctx.beginPath();
      ctx.arc(cell.x, cell.y, radius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Cell membrane
      ctx.fillStyle = `hsla(${cell.hue}, 85%, 65%, 0.8)`;
      ctx.beginPath();
      ctx.arc(cell.x, cell.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Nucleus
      ctx.fillStyle = `hsla(${cell.hue + 25}, 90%, 70%, 0.7)`;
      ctx.beginPath();
      ctx.arc(cell.x - radius * 0.25, cell.y - radius * 0.25, radius * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Show golden ratio marker if requested
      if (showGoldenRatio) {
        ctx.strokeStyle = `hsla(45, 80%, 60%, 0.3)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, radius * 1.618, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    // Draw Fibonacci spiral guide (subtle)
    const drawFibonacciSpiral = (centerX: number, centerY: number, numPoints: number, frame: number) => {
      const GOLDEN_ANGLE_RAD = 137.508 * (Math.PI / 180);
      ctx.strokeStyle = `hsla(45, 70%, 55%, ${0.08 + Math.sin(frame * 0.01) * 0.03})`;
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let i = 0; i < numPoints; i++) {
        const angle = i * GOLDEN_ANGLE_RAD;
        const radius = Math.sqrt(i + 1) * 35;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    // Draw phyllotaxis pattern guide (subtle)
    const drawPhyllotaxisGuide = (centerX: number, centerY: number, numPoints: number, frame: number) => {
      const GOLDEN_ANGLE_RAD = 137.508 * (Math.PI / 180);

      // Draw connecting spiral
      ctx.strokeStyle = `hsla(120, 60%, 50%, ${0.06 + Math.sin(frame * 0.008) * 0.02})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();

      for (let i = 0; i < numPoints; i++) {
        const angle = i * GOLDEN_ANGLE_RAD;
        const radius = Math.sqrt(i + 1) * 25;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    // Draw Fibonacci number labels at key points
    const drawFibonacciLabels = (centerX: number, centerY: number, frame: number) => {
      const GOLDEN_ANGLE_RAD = 137.508 * (Math.PI / 180);
      const fibNumbersToShow = [1, 2, 3, 5, 8, 13, 21];
      const opacity = 0.15 + Math.sin(frame * 0.01) * 0.05;

      ctx.save();
      ctx.font = '11px monospace';
      ctx.fillStyle = `hsla(45, 80%, 65%, ${opacity})`;
      ctx.textAlign = 'center';

      fibNumbersToShow.forEach((num, idx) => {
        const i = [0, 1, 2, 4, 7, 12, 20][idx]; // Indices in the spiral
        const angle = i * GOLDEN_ANGLE_RAD;
        const radius = Math.sqrt(i + 1) * 35;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.fillText(num.toString(), x, y - 15);
      });
      ctx.restore();
    };

    // Draw golden ratio spiral segments (like nautilus shell)
    const drawGoldenRatioSegments = (centerX: number, centerY: number, frame: number) => {
      const segments = 6;
      let size = 5;
      let x = centerX;
      let y = centerY;
      const opacity = 0.08 + Math.sin(frame * 0.012) * 0.03;

      ctx.strokeStyle = `hsla(45, 70%, 60%, ${opacity})`;
      ctx.lineWidth = 1.5;

      for (let i = 0; i < segments; i++) {
        ctx.beginPath();
        const startAngle = (i * Math.PI) / 2;
        const endAngle = ((i + 1) * Math.PI) / 2;

        // Draw quarter circle arc
        ctx.arc(x, y, size, startAngle, endAngle);
        ctx.stroke();

        // Update position for next segment
        const nextSize = size * PHI;
        const cosA = Math.cos(endAngle);
        const sinA = Math.sin(endAngle);
        x += cosA * size;
        y += sinA * size;
        size = nextSize;
      }
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

      // Update and draw equations (subtle background layer)
      equations.forEach((eq) => {
        eq.x += eq.vx;
        eq.y += eq.vy;

        if (eq.opacity < eq.targetOpacity) {
          eq.opacity += 0.002;
        }

        if (eq.x < 0) eq.x = width;
        if (eq.x > width) eq.x = 0;
        if (eq.y < 0) eq.y = height;
        if (eq.y > height) eq.y = 0;

        drawEquation(eq);
      });

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

      // Draw golden ratio segments (nautilus shell pattern)
      drawGoldenRatioSegments(spiralCenterX - 100, spiralCenterY + 80, frame);

      // Draw Fibonacci spiral guide
      drawFibonacciSpiral(spiralCenterX, spiralCenterY, numFibonacciCells, frame);

      // Draw Fibonacci number labels
      drawFibonacciLabels(spiralCenterX, spiralCenterY, frame);

      // Update and draw Fibonacci spiral cells
      fibonacciCells.forEach((cell) => {
        cell.pulsePhase += cell.pulseSpeed;

        // Gentle breathing motion while maintaining spiral pattern
        const breathe = Math.sin(frame * 0.005 + cell.spiralIndex * 0.3) * 8;
        const angle = cell.spiralIndex * GOLDEN_ANGLE * (Math.PI / 180);
        cell.x = cell.baseX + Math.cos(angle) * breathe;
        cell.y = cell.baseY + Math.sin(angle) * breathe;

        const pulse = Math.sin(cell.pulsePhase) * 0.5 + 0.5;
        drawBioCell(cell, pulse, false);
      });

      // Draw connections between adjacent Fibonacci cells
      for (let i = 0; i < fibonacciCells.length - 1; i++) {
        const cell1 = fibonacciCells[i];
        const cell2 = fibonacciCells[i + 1];
        const dx = cell2.x - cell1.x;
        const dy = cell2.y - cell1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const alpha = (1 - distance / 100) * 0.25;
          ctx.strokeStyle = `hsla(${(cell1.hue + cell2.hue) / 2}, 70%, 60%, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cell1.x, cell1.y);
          ctx.lineTo(cell2.x, cell2.y);
          ctx.stroke();
        }
      }

      // Draw phyllotaxis pattern guide
      drawPhyllotaxisGuide(phyllotaxisCenterX, phyllotaxisCenterY, numPhyllotaxisCells, frame);

      // Update and draw phyllotaxis cells
      phyllotaxisCells.forEach((cell) => {
        cell.pulsePhase += cell.pulseSpeed;

        // Gentle radial breathing
        const breathe = Math.sin(frame * 0.006 + cell.phyllotaxisIndex * 0.2) * 5;
        const angle = cell.phyllotaxisIndex * GOLDEN_ANGLE * (Math.PI / 180);
        const currentRadius = Math.sqrt(cell.phyllotaxisIndex + 1) * 25 + breathe;
        cell.x = phyllotaxisCenterX + Math.cos(angle) * currentRadius;
        cell.y = phyllotaxisCenterY + Math.sin(angle) * currentRadius;

        const pulse = Math.sin(cell.pulsePhase) * 0.5 + 0.5;
        drawBioCell(cell, pulse, false);
      });

      // Draw connections between nearby phyllotaxis cells
      for (let i = 0; i < phyllotaxisCells.length; i++) {
        for (let j = i + 1; j < phyllotaxisCells.length; j++) {
          const cell1 = phyllotaxisCells[i];
          const cell2 = phyllotaxisCells[j];
          const dx = cell2.x - cell1.x;
          const dy = cell2.y - cell1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 60) {
            const alpha = (1 - distance / 60) * 0.2;
            ctx.strokeStyle = `hsla(${(cell1.hue + cell2.hue) / 2}, 65%, 55%, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(cell1.x, cell1.y);
            ctx.lineTo(cell2.x, cell2.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw biological cells (random placement)
      bioCells.forEach((cell) => {
        cell.x += cell.vx;
        cell.y += cell.vy;
        cell.pulsePhase += cell.pulseSpeed;

        if (cell.x < 0) cell.x = width;
        if (cell.x > width) cell.x = 0;
        if (cell.y < 0) cell.y = height;
        if (cell.y > height) cell.y = 0;

        const pulse = Math.sin(cell.pulsePhase) * 0.5 + 0.5;
        drawBioCell(cell, pulse);
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

      // Draw subtle connections between equations and nearby biological structures
      equations.forEach((eq) => {
        if (eq.opacity > 0.15) {
          // Find closest biological structure (neuron, bioCell, fibonacciCell, or phyllotaxisCell)
          let closestDist = Infinity;
          let closestX = 0;
          let closestY = 0;
          let closestHue = 200;
          let isFibonacci = false;

          const allCells = neurons.concat(bioCells).concat(fibonacciCells).concat(phyllotaxisCells);
          allCells.forEach((cell, idx) => {
            const dx = eq.x - cell.x;
            const dy = eq.y - cell.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < closestDist && dist < 250) {
              closestDist = dist;
              closestX = cell.x;
              closestY = cell.y;
              closestHue = cell.hue;
              // Check if it's a Fibonacci or phyllotaxis cell
              isFibonacci = idx >= neurons.length + bioCells.length;
            }
          });

          if (closestDist < 250) {
            const alpha = eq.opacity * 0.3 * (1 - closestDist / 250);
            ctx.strokeStyle = `hsla(${(260 + closestHue) / 2}, 75%, 65%, ${alpha})`;
            ctx.lineWidth = isFibonacci ? 1.2 : 0.8; // Thicker lines to golden ratio patterns
            ctx.setLineDash([3, 6]);
            ctx.beginPath();
            ctx.moveTo(eq.x, eq.y);
            ctx.lineTo(closestX, closestY);
            ctx.stroke();
            ctx.setLineDash([]);

            // Add golden sparkle effect for Fibonacci connections
            if (isFibonacci && Math.random() > 0.95) {
              const midX = (eq.x + closestX) / 2;
              const midY = (eq.y + closestY) / 2;
              ctx.fillStyle = `hsla(45, 90%, 70%, ${alpha * 2})`;
              ctx.beginPath();
              ctx.arc(midX, midY, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      });

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
