'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface GlowingCardProps {
  title: string;
  subtitle?: string;
  description: string;
  features: string[];
  className?: string;
  delay?: number;
}

export default function GlowingCard({ 
  title, 
  subtitle,
  description, 
  features,
  className = "", 
  delay = 0,
}: GlowingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay }}
      data-cursor="view"
      data-cursor-label="GO"
      className={`group relative h-full bg-white/[0.02] rounded-[48px] border border-white/10 hover:border-frozen-lake/30 transition-all duration-700 overflow-hidden flex flex-col p-12 md:p-16 hover:bg-white/[0.04] ${className}`}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-tato-blue/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:bg-frozen-lake/10 transition-colors duration-1000" />
      
      <div className="relative z-10 flex flex-col h-full gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h3 className="text-4xl md:text-6xl font-display font-black text-white italic tracking-tighter group-hover:text-frozen-lake transition-colors">
              {title}
            </h3>
            <div className="h-px flex-1 bg-white/10 group-hover:bg-frozen-lake/20 transition-all duration-700" />
          </div>
          {subtitle && (
            <p className="text-xl md:text-2xl font-display font-bold text-porcelain/80 tracking-tight leading-tight">
              {subtitle}
            </p>
          )}
        </div>

        <p className="text-lg md:text-xl text-porcelain/80 leading-relaxed font-medium">
          {description}
        </p>

        <div className="space-y-4 py-8 border-y border-white/5">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-4 text-sm font-display font-bold text-porcelain/80 group-hover:text-porcelain transition-colors">
              <div className="w-5 h-5 rounded-full bg-frozen-lake/10 flex items-center justify-center text-frozen-lake group-hover:bg-frozen-lake group-hover:text-ink-black transition-all duration-500">
                <Check size={12} strokeWidth={4} />
              </div>
              {feature}
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
           <span className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.4em]">Product Systems</span>
           <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-frozen-lake group-hover:bg-frozen-lake group-hover:text-ink-black group-hover:border-transparent transition-all duration-700">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform">
                <path d="M12 5V19M12 5L18 11M12 5L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 12 12)"/>
              </svg>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
