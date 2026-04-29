'use client';

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/language-context';

interface SolutionItem {
  id: string;
  title: string;
  description: string;
  keywords: string[];
}

interface SolutionCardProps {
  item: SolutionItem;
  isActive?: boolean;
  isSide?: boolean;
  className?: string;
  progress?: number;
}

export default function SolutionCard({ item, isActive, isSide, className, progress = 0 }: SolutionCardProps) {
  const { t } = useLanguage();
  return (
    <div 
      className={cn(
        "relative w-[280px] md:w-[320px] aspect-[4/6] rounded-[32px] overflow-hidden transition-all duration-700",
        "bg-ink-black/40 backdrop-blur-xl border border-white/10",
        "shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
        isActive ? "z-30 border-frozen-lake/30 scale-100" : "z-10 border-white/5 scale-90 opacity-40",
        className
      )}
    >
      {/* GLOW BOTTOM PROGRESS BAR (Incorporated directly into the card) */}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 z-20">
          <motion.div 
            className="h-full bg-frozen-lake shadow-[0_0_15px_rgba(0,255,255,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: "tween", ease: "linear" }}
          />
        </div>
      )}
      {/* Glossy Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-px rounded-[32px] border border-white/5 pointer-events-none" />
      
      {/* Content Container */}
      <div className="relative z-10 h-full p-8 flex flex-col justify-between">
        
        {/* TOP: Solution ID & Micro Label */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-black text-neon-cyan tracking-[0.2em]">{item.id}</span>
            <div className="text-[9px] font-mono text-grey/40 uppercase tracking-widest block">{t.solutions.cardLabel}</div>
          </div>
          <div className={cn(
            "w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors duration-500",
            isActive && "border-frozen-lake/40 bg-frozen-lake/5"
          )}>
            <div className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-500",
              isActive ? "bg-frozen-lake shadow-[0_0_10px_rgba(0,255,255,0.8)] animate-pulse" : "bg-white/10"
            )} />
          </div>
        </div>

        {/* MID: Title & Description */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className={cn(
              "text-3xl font-display font-black leading-none uppercase italic tracking-tighter transition-colors duration-500",
              isActive ? "text-white" : "text-white/60"
            )}>
              {item.title}
            </h3>
            {isActive && (
              <motion.div 
                layoutId="underline"
                className="h-[2px] w-12 bg-frozen-lake" 
              />
            )}
          </div>
          
          <p className={cn(
            "text-sm md:text-base leading-relaxed font-medium transition-colors duration-500",
            isActive ? "text-grey" : "text-grey/40"
          )}>
            {item.description}
          </p>
        </div>

        {/* BOTTOM: Keywords Chips */}
        <div className="flex flex-wrap gap-2 pt-4">
          {item.keywords.map((kw, idx) => (
            <span 
              key={idx} 
              className={cn(
                "px-3 py-1 rounded-full text-[9px] font-mono font-black uppercase tracking-widest border transition-all duration-500",
                isActive 
                  ? "bg-frozen-lake/5 border-frozen-lake/20 text-frozen-lake" 
                  : "bg-white/5 border-white/5 text-grey/30"
              )}
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Subtle Glow Overlay for Active Card */}
      {isActive && (
        <>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-frozen-lake/20 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-tato-blue/10 blur-[60px] rounded-full pointer-events-none" />
        </>
      )}

      {/* Decorative Light Sweep */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"
        animate={isActive ? { x: ['-150%', '150%'] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
