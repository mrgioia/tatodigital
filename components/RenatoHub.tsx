'use client';

import React, { useRef, useMemo, useState, useSyncExternalStore } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useLanguage } from '@/lib/language-context';
import TypewriterHeader from '@/components/TypewriterHeader';

interface FlareRayProps {
  index: number;
  progress: any;
  color: any;
  type: 'lateral' | 'vertical' | 'radial' | 'angular';
}

const FlareRay = ({ index, progress, color, type }: FlareRayProps) => {
  // Use lazy initializer in useState to keep random data stable and fix purity issue
  const [{ rotation, length, width }] = useState(() => {
    const base = index * (360 / 12);
    let rot = base + (Math.random() * 10 - 5);
    
    if (type === 'vertical') {
      rot = base % 90 < 45 ? 90 + (Math.random() * 20 - 10) : 270 + (Math.random() * 20 - 10);
    } else if (type === 'lateral') {
      rot = base % 90 < 45 ? 0 + (Math.random() * 40 - 20) : 180 + (Math.random() * 40 - 20);
    } else if (type === 'angular') {
      rot = base % 90 < 45 ? 45 + (Math.random() * 30 - 15) : 135 + (Math.random() * 30 - 15);
    }

    return {
      rotation: rot,
      length: 300 + Math.random() * 400,
      width: 0.5 + Math.random() * 1.5
    };
  });
  
  // Rays evolve with scroll
  const scaleX = useTransform(progress, [0, 0.5, 1], [0.1, 1.4, 0.3]);
  const opacity = useTransform(progress, [0, 0.3, 0.6, 0.9, 1], [0, 0.4, 0.7, 0.2, 0]);
  const skew = useTransform(progress, [0, 1], [-30, 30]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: length,
        height: width,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        originX: 0,
        rotate: rotation,
        scaleX,
        opacity,
        skewX: skew,
        filter: 'blur(3px)',
        zIndex: -1,
      }}
    />
  );
};

const LetterWithFlares = ({ letter, index, progress, color, isClient }: { letter: string; index: number; progress: any; color: any; isClient: boolean }) => {
  const typeMap: Record<string, 'lateral' | 'vertical' | 'radial' | 'angular'> = {
    'G': 'lateral',
    'I': 'vertical',
    'O': 'radial',
    'A': 'angular'
  };

  const rays = Array.from({ length: 12 });

  return (
    <div className="relative inline-block px-1">
      <motion.span
        style={{ color }}
        className="relative z-10 select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      >
        {letter}
      </motion.span>
      
      {/* Light Emission Layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {isClient && rays.map((_, i) => (
          <FlareRay 
            key={i} 
            index={i} 
            progress={progress} 
            color={color} 
            type={typeMap[letter] || 'radial'} 
          />
        ))}
      </div>

      {/* Subtle bloom behind the letter */}
      <motion.div
        style={{
          boxShadow: `0 0 60px ${color}`,
          opacity: useTransform(progress, [0.1, 0.5, 0.9], [0, 0.2, 0]),
          backgroundColor: color,
        }}
        className="absolute inset--4 blur-[60px] rounded-full z-0 pointer-events-none mix-blend-screen"
      />
    </div>
  );
};

export default function RenatoHub() {
  const { t, language } = useLanguage();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Sunrise Color Progression
  const flareColor = useTransform(
    smoothProgress,
    [0.1, 0.25, 0.4, 0.55, 0.7, 0.85],
    [
      '#4B0082', // Deep Indigo/Violet
      '#9400D3', // Dark Violet
      '#FF00FF', // Magenta
      '#FF69B4', // Hot Pink
      '#FF8C00', // Dark Orange/Gold
      '#FFD700', // Gold
    ]
  );

  const renatoKeywords = language === 'pt' ? ['experiência', 'dados', 'execução'] : ['experience', 'data', 'execution'];

  const parseHighlight = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <motion.span 
            key={i} 
            style={{ color: flareColor }}
            className="font-black"
          >
            {part.slice(2, -2)}
          </motion.span>
        );
      }
      return part;
    });
  };

  const nameLetters = "GIOIA".split("");

  return (
    <div ref={containerRef} className="space-y-32">
      {/* Hero Typography Section */}
      <div className="flex flex-col items-center text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="text-[10px] font-mono font-black text-grey uppercase tracking-[0.5em]">{t.renato.label}</span>
            <div className="w-12 h-[1px] bg-white/20" />
          </div>

          <div className="relative">
            <h3 className="text-7xl md:text-[12rem] lg:text-[15rem] font-display font-black leading-none tracking-tighter uppercase italic flex items-center justify-center">
              <span className="text-white opacity-90">RENATO</span>
              <span className="block ml-4 md:ml-8">
                {nameLetters.map((char, i) => (
                  <LetterWithFlares 
                    key={i} 
                    letter={char} 
                    index={i} 
                    progress={smoothProgress} 
                    color={flareColor} 
                    isClient={isClient}
                  />
                ))}
              </span>
            </h3>
          </div>

          <motion.div
            style={{ color: flareColor }}
            className="text-2xl md:text-5xl font-display font-black italic uppercase tracking-tighter leading-tight max-w-4xl"
          >
            {t.renato.vision}
          </motion.div>
        </motion.div>

        <div className="max-w-4xl">
          <TypewriterHeader 
            text={t.renato.title}
            keywords={renatoKeywords}
            className="text-xl md:text-3xl font-display font-medium leading-relaxed text-porcelain/90 uppercase tracking-tight"
            highlightColor="cyan"
          />
        </div>
      </div>

      {/* Narrative & Competences Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start pt-24">
        <div className="lg:col-span-8 space-y-12 relative">
          <div className="space-y-12 relative z-10">
            {(Array.isArray(t.renato.bio) ? t.renato.bio : [t.renato.bio]).map((paragraph: string, i: number) => (
              <motion.p 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-xl md:text-3xl text-porcelain/90 leading-tight font-medium"
              >
                {parseHighlight(paragraph)}
              </motion.p>
            ))}
          </div>

          {/* Illuminating beams passing over bio */}
          <motion.div 
            style={{ 
              background: `linear-gradient(45deg, transparent, ${flareColor}, transparent)`,
              opacity: useTransform(smoothProgress, [0.3, 0.5, 0.7], [0, 0.15, 0]),
              translateX: useTransform(smoothProgress, [0, 1], [-200, 400]),
            }}
            className="absolute inset-0 pointer-events-none blur-3xl rounded-[200px]"
          />
          
          <div className="pt-12 flex flex-wrap items-center gap-12 border-t border-white/5">
            {t.renato.roles.map((role: any, i: number) => (
              <React.Fragment key={i}>
                <div className="space-y-2">
                  <div className="text-3xl font-display font-black text-white italic tracking-tight">{role.title}</div>
                  <div className="text-[10px] font-mono text-white/60 uppercase tracking-[0.3em] font-bold">{role.sub}</div>
                </div>
                {i < t.renato.roles.length - 1 && <div className="hidden md:block w-px h-12 bg-white/10" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <span className="inline-block text-[10px] font-mono font-black text-white/60 uppercase tracking-[0.4em] mb-8">{t.renato.specialties}</span>
          <div className="grid grid-cols-1 gap-4">
            {t.renato.competences.map((skill: string, i: number) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative"
                data-cursor="hover"
              >
                <div className="flex items-baseline gap-6 py-4 border-b border-white/5 group-hover:border-white/20 transition-colors">
                  <span className="text-xs font-mono font-bold text-white/40 group-hover:text-white transition-colors">0{i + 1}</span>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-frozen-lake tracking-tight uppercase transition-all duration-500">
                    {skill}
                  </h3>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
