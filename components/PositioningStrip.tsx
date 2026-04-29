'use client';

import React from 'react';
import { useLanguage } from '@/lib/language-context';

export default function PositioningStrip() {
  const { t } = useLanguage();
  const phrases = [...t.positioning, ...t.positioning];

  return (
    <div className="py-20 border-y border-white/5 bg-ink-black overflow-hidden relative group">
      {/* Background glow strip */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-frozen-lake/15 to-transparent h-[1px] top-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-frozen-lake/15 to-transparent h-[1px] bottom-0" />
      
      <div className="flex whitespace-nowrap animate-marquee">
        {phrases.map((phrase, i) => (
          <div key={i} className="flex items-center gap-12 px-12">
            <span className="text-4xl md:text-6xl font-display font-black text-white/20 group-hover:text-frozen-lake transition-colors duration-1000 uppercase italic tracking-tighter">
              {phrase}
            </span>
            <div className="w-16 h-[1px] bg-white/10 group-hover:bg-frozen-lake/30 transition-all duration-1000" />
          </div>
        ))}
      </div>
    </div>
  );
}
