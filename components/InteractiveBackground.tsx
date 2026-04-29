'use client';

import React, { useEffect, useRef, useSyncExternalStore } from 'react';

// SET TO TRUE TO SEE MOUSE INFLUENCE RADIUS AND STATS
const DEBUG_BACKGROUND = false;

// Subscription for client-side mounting
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ 
    x: 0, 
    y: 0, 
    active: false, 
    radius: 320, 
    easeX: 0, 
    easeY: 0 
  });
  
  const isClient = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!isClient) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rgb: string;
      alphaBase: number;
      layer: number; 
      life: number;
      rotation: number;
      rotationSpeed: number;

      constructor(layer: number) {
        this.layer = layer;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.life = Math.random();
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005;
        
        if (layer === 0) { // Data Clouds - High Visibility masses
          this.size = Math.random() * 380 + 280;
          this.rgb = '30, 90, 255'; // Vibrant Blue
          this.alphaBase = Math.random() * 0.18 + 0.12; 
        } else if (layer === 1) { // Network Nodes
          this.size = Math.random() * 3 + 1.8;
          this.rgb = '108, 207, 246'; // TATO Cyan
          this.alphaBase = 0.75;
        } else { // Micro Particles
          this.size = Math.random() * 1.8 + 0.8;
          this.rgb = '255, 255, 255';
          this.alphaBase = 0.65;
        }
      }

      draw() {
        if (!ctx) return;
        
        if (this.layer === 0) {
          const pulse = Math.sin(Date.now() / 2800 + this.life * 10) * 0.15 + 0.85;
          const currentAlpha = Math.max(0.01, Math.min(this.alphaBase * pulse, 1));
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
          
          gradient.addColorStop(0, `rgba(${this.rgb}, ${currentAlpha.toFixed(3)})`);
          gradient.addColorStop(0.5, `rgba(${this.rgb}, ${(currentAlpha * 0.35).toFixed(3)})`);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.layer === 1) {
          // Node with visual aura
          const distToMouse = Math.sqrt((this.x - mouse.current.easeX)**2 + (this.y - mouse.current.easeY)**2);
          const activeGlow = Math.max(0, 1 - distToMouse / 220);
          
          // Outer Glow
          if (activeGlow > 0.1) {
            ctx.fillStyle = `rgba(${this.rgb}, ${(activeGlow * 0.2).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * (1 + activeGlow * 4), 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = `rgba(${this.rgb}, ${(this.alphaBase + activeGlow * 0.4).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size + activeGlow * 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${this.rgb}, ${this.alphaBase.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      update() {
        this.life += 0.0005;
        if (this.life > 1) this.life = 0;
        this.rotation += this.rotationSpeed;

        this.x += this.vx;
        this.y += this.vy;

        // Interaction: Magnetism + Swirl
        if (mouse.current.active) {
          const dx = mouse.current.easeX - this.x;
          const dy = mouse.current.easeY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.current.radius) {
            const force = Math.pow((mouse.current.radius - distance) / mouse.current.radius, 1.5);
            const interactivity = (this.layer + 1) * 4.5;
            const dirX = dx / distance;
            const dirY = dy / distance;
            
            this.x -= dirX * force * interactivity * 3.5;
            this.y -= dirY * force * interactivity * 3.5;
            
            const swirl = 2.0 * force * interactivity;
            this.x += dirY * swirl;
            this.y -= dirX * swirl;
          }
        }

        const pad = this.size * 2;
        if (this.x < -pad) this.x = width + pad;
        if (this.x > width + pad) this.x = -pad;
        if (this.y < -pad) this.y = height + pad;
        if (this.y > height + pad) this.y = -pad;
      }
    }

    let pArray: Particle[] = [];
    const counts = width < 768 ? { 0: 7, 1: 55, 2: 75 } : { 0: 16, 1: 155, 2: 240 };

    const init = () => {
      pArray = [];
      Object.entries(counts).forEach(([lyr, count]) => {
        for (let i = 0; i < count; i++) pArray.push(new Particle(Number(lyr)));
      });
    };

    const drawNetwork = () => {
      if (!ctx) return;
      const nodes = pArray.filter(p => p.layer === 1);
      const maxD = 210;
      
      for (let i = 0; i < nodes.length; i++) {
        const nA = nodes[i];
        let cCount = 0;
        for (let j = i + 1; j < nodes.length; j++) {
          if (cCount > 6) break;
          const nB = nodes[j];
          const dx = nA.x - nB.x;
          const dy = nA.y - nB.y;
          const d2 = dx * dx + dy * dy;
          
          if (d2 < maxD * maxD) {
            const d = Math.sqrt(d2);
            const distScale = 1 - d / maxD;
            
            const mAx = mouse.current.easeX - nA.x;
            const mAy = mouse.current.easeY - nA.y;
            const mDistA = Math.sqrt(mAx * mAx + mAy * mAy);
            const mBoost = Math.max(0, (1 - mDistA / 280) * 0.85);
            
            const op = Math.min(1, (distScale * 0.5) + mBoost);
            
            ctx.strokeStyle = `rgba(108, 207, 246, ${op.toFixed(3)})`;
            ctx.lineWidth = 1.1 + mBoost * 2.8;
            ctx.beginPath();
            ctx.moveTo(nA.x, nA.y);
            
            if (mouse.current.active && mDistA < 300) {
                const mx = (nA.x + nB.x) / 2;
                const my = (nA.y + nB.y) / 2;
                const mdx = mouse.current.easeX - mx;
                const mdy = mouse.current.easeY - my;
                const md = Math.sqrt(mdx * mdx + mdy * mdy);
                if (md < 240) {
                    const mf = (240 - md) / 240;
                    ctx.quadraticCurveTo(mx + mdx * mf * 1.8, my + mdy * mf * 1.8, nB.x, nB.y);
                } else {
                    ctx.lineTo(nB.x, nB.y);
                }
            } else {
                ctx.lineTo(nB.x, nB.y);
            }
            ctx.stroke();

            // Polygon web fill
            if (d < 120 && i % 2 === 0) {
              for (let k = j + 1; k < nodes.length; k++) {
                const nC = nodes[k];
                const dAC = Math.sqrt((nA.x - nC.x)**2 + (nA.y - nC.y)**2);
                if (dAC < 120) {
                  ctx.fillStyle = `rgba(108, 207, 246, ${(op * 0.22).toFixed(3)})`;
                  ctx.beginPath();
                  ctx.moveTo(nA.x, nA.y);
                  ctx.lineTo(nB.x, nB.y);
                  ctx.lineTo(nC.x, nC.y);
                  ctx.fill();
                  break;
                }
              }
            }
            cCount++;
          }
        }
      }
    };

    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let easedScrollY = lastScrollY;
    let animationId: number;
    const renderLoop = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse Interpolation
      mouse.current.easeX += (mouse.current.x - mouse.current.easeX) * 0.08;
      mouse.current.easeY += (mouse.current.y - mouse.current.easeY) * 0.08;

      const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      
      // Calculate delta but handle large jumps (like navbar clicks) gracefully
      let scrollDelta = currentScrollY - lastScrollY;
      
      // If the jump is too sudden (jump navigation), we dampen the impact to avoid particles flying away
      if (Math.abs(scrollDelta) > 200) {
        scrollDelta = scrollDelta > 0 ? 50 : -50;
      }
      
      lastScrollY = currentScrollY;

    // Layer 0: Clouds
    pArray.filter(p => p.layer === 0).forEach(p => {
      p.update();
      p.y += scrollDelta * 0.12; 
      p.draw();
    });

    // Layer 1: Network
    drawNetwork();
    pArray.filter(p => p.layer === 1).forEach(p => {
      p.update();
      p.y += scrollDelta * 0.25;
      p.draw();
    });

    // Layer 2: Micro
    pArray.filter(p => p.layer === 2).forEach(p => {
      p.update();
      p.y += scrollDelta * 0.45;
      p.draw();
    });

    // Mouse Glow (Added for perception)
    if (mouse.current.active) {
      const g = ctx.createRadialGradient(
        mouse.current.easeX, mouse.current.easeY, 0,
        mouse.current.easeX, mouse.current.easeY, 150
      );
      g.addColorStop(0, 'rgba(108, 207, 246, 0.08)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(mouse.current.easeX, mouse.current.easeY, 150, 0, Math.PI * 2);
      ctx.fill();
    }

      if (DEBUG_BACKGROUND && mouse.current.active) {
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.current.easeX, mouse.current.easeY, mouse.current.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
        ctx.fill();
        
        ctx.fillStyle = 'yellow';
        ctx.font = '12px Courier New';
        ctx.fillText(`FIELD RADIUS: ${mouse.current.radius}px`, 20, height - 60);
        ctx.fillText(`TOTAL ENTITIES: ${pArray.length}`, 20, height - 40);
        ctx.fillText(`CURSOR: ${mouse.current.x.toFixed(0)},${mouse.current.y.toFixed(0)}`, 20, height - 20);
      }

      animationId = requestAnimationFrame(renderLoop);
    };

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };

    const handleLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('resize', () => {
      setCanvasSize();
      init();
    });

    init();
    renderLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <canvas
      ref={canvasRef}
      id="interactive-background"
      className="fixed inset-0 pointer-events-none z-[0] bg-[#000508]"
      style={{
        opacity: 1,
        mixBlendMode: 'screen',
        width: '100vw',
        height: '100dvh'
      }}
    />
  );
}
