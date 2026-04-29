'use client';

import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Spline from '@splinetool/react-spline';
import { useLanguage } from '@/lib/language-context';
import TypewriterHeader from '@/components/TypewriterHeader';

// Error Boundary for Spline to catch runtime issues
class SplineErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Spline Runtime Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-full border border-white/10 italic text-white/40">
          Core Visualization Engine Offline
        </div>
      );
    }
    return this.props.children;
  }
}

const CLOCK_POSITIONS = [
  { h: 12, angle: 0 },
  { h: 2, angle: 60 },
  { h: 4, angle: 120 },
  { h: 6, angle: 180 },
  { h: 8, angle: 240 },
  { h: 10, angle: 300 },
];

export default function TatoMethod() {
  const { t, language } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const methodKeywords = language === 'pt' ? ['diagnóstico', 'digital'] : ['diagnosis', 'digital'];

  const steps = t.method.steps;

  // Suppress Spline's Web3 / MetaMask connection attempts if the scene includes them
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).ethereum) {
      (window as any).ethereum = {
        isMetaMask: false,
        request: async () => [],
        on: () => {},
        removeListener: () => {},
        autoRefreshOnNetworkChange: false,
        enable: async () => [],
        connect: async () => []
      };
    }
  }, []);

  return (
    <div className="relative w-full overflow-visible">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-900/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      
      {/* Header - Aligned to the design system */}
      <div className="max-w-4xl space-y-6 mb-24 lg:mb-0 relative z-40">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-[1px] bg-frozen-lake" />
          <span className="text-xs font-mono font-black text-frozen-lake uppercase tracking-[0.4em]">{t.method.label}</span>
        </motion.div>
        <TypewriterHeader 
          text={t.method.title}
          keywords={methodKeywords}
          className="text-4xl md:text-7xl lg:text-8xl font-display font-black leading-[0.95] text-white uppercase italic tracking-tighter"
          highlightColor="cyan"
        />
      </div>

      {/* Radial System Container */}
      <div className="relative min-h-[1000px] lg:min-h-[1200px] flex items-center justify-center pt-20 overflow-visible">
        
        {/* Central 3D Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] md:max-w-[800px] aspect-square z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-ink-black/20 via-transparent to-ink-black/20" />
            <div className="w-full h-full pointer-events-auto" style={{ clipPath: 'inset(0 0 20% 0)' }}>
              <SplineErrorBoundary>
                <Spline 
                  scene="https://prod.spline.design/fXzp5rZyNlTIJmHg/scene.splinecode"
                  className="w-full h-full scale-110"
                />
              </SplineErrorBoundary>
            </div>
            
            {/* Subtle Pulsing Nucleus Halo */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-frozen-lake/20 blur-[100px] -z-10"
            />
          </motion.div>
        </div>

        {/* Connectors Layer (SVG) - Responsive Handling */}
        <div className="absolute inset-0 hidden lg:block pointer-events-none opacity-30 z-10">
          <svg viewBox="0 0 1000 1000" className="w-full h-full">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {CLOCK_POSITIONS.map((pos, i) => {
              const rad = (pos.angle - 90) * (Math.PI / 180);
              const x2 = 500 + 350 * Math.cos(rad);
              const y2 = 430 + 350 * Math.sin(rad);
              const x1 = 500 + 80 * Math.cos(rad);
              const y1 = 430 + 80 * Math.sin(rad);

              const isActive = hoveredIndex === i;

              return (
                <motion.g key={i}>
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(128, 232, 255, 0.15)"
                    strokeWidth="1"
                    strokeDasharray="2 6"
                  />
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.line
                        key={`active-line-${i}`}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#80E8FF"
                        strokeWidth="2"
                        filter="url(#glow)"
                      />
                    )}
                  </AnimatePresence>
                </motion.g>
              );
            })}
            
            <circle cx="500" cy="430" r="180" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <circle cx="500" cy="430" r="320" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          </svg>
        </div>

        {/* Methods (Clock Distribution) */}
        <div className="lg:absolute lg:inset-0 z-30 pointer-events-none w-full h-full">
          <div className="relative w-full h-full flex flex-col lg:block px-4 lg:px-0 mt-20 lg:mt-0">
            {steps.map((step: any, i: number) => {
              const pos = CLOCK_POSITIONS[i];
              if (!pos) return null; // Safety check

              const angle = pos.angle;
              // Radius relative to center
              const radius = 35; // percentage

              // Position calculation - Rounded to catch precision mismatch during SSR
              const top = parseFloat((43 + (radius * Math.cos((angle + 180) * (Math.PI / 180)))).toFixed(2));
              const left = parseFloat((50 + (radius * Math.sin((angle + 180) * (Math.PI / 180)))).toFixed(2));

              return (
                <motion.div
                  key={`method-step-${i}`}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`
                    lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2
                    w-full lg:w-[320px] 
                    group cursor-default
                    pointer-events-auto
                    mb-8 lg:mb-0
                  `}
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                  } as any}
                >
                  <div 
                    data-cursor="hover"
                    className={`
                      p-6 lg:p-8 rounded-2xl 
                      bg-white/[0.02] border border-white/5 backdrop-blur-md
                      group-hover:bg-white/[0.05] group-hover:border-frozen-lake/50 
                      transition-all duration-700 relative overflow-hidden
                      ${hoveredIndex === i ? 'scale-105 shadow-[0_30px_60px_rgba(0,0,0,0.6)]' : 'scale-100'}
                    `}
                  >
                    {/* Dynamic Gradient interaction */}
                    <div className={`
                      absolute inset-0 transition-opacity duration-1000 pointer-events-none
                      bg-gradient-to-br from-frozen-lake/10 to-transparent
                      ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}
                    `} />

                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className={`w-3 h-3 rounded-full bg-frozen-lake shadow-[0_0_15px_rgba(128,232,255,0.6)]`}
                          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                        />
                        <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight leading-none group-hover:text-frozen-lake transition-colors duration-500">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm md:text-base font-medium text-porcelain/50 leading-relaxed group-hover:text-porcelain/90 transition-colors duration-500">
                        {step.text}
                      </p>
                    </div>
                    
                    {/* Visual underline glow */}
                    <div className={`
                      absolute bottom-0 left-0 h-[2px] bg-frozen-lake transition-all duration-700
                      ${hoveredIndex === i ? 'w-full opacity-100' : 'w-0 opacity-0'}
                    `} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Global Interaction hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="mt-16 text-center text-white/10 text-[10px] font-mono uppercase tracking-[0.5em] hidden lg:block"
      >
        Orbital System Integrated • Hover for details
      </motion.div>
    </div>
  );
}
