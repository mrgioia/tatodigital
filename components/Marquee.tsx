'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/lib/language-context';

export default function Marquee() {
  const { t } = useLanguage();

  return (
    <div className="relative w-full py-20 overflow-hidden border-y border-white/5 bg-white/2">
       <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center pr-20"
        >
          {[...t.marquee, ...t.marquee].map((item, i) => (
            <React.Fragment key={i}>
              <span className="text-6xl md:text-8xl font-display font-black text-white/5 uppercase tracking-tighter hover:text-frozen-lake/20 transition-all hover:scale-110 cursor-default">
                {item}
              </span>
              <div className="w-4 h-4 rounded-full bg-yellow-green shadow-[0_0_15px_#98CE00] opacity-30" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-ink-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-ink-black to-transparent z-10" />
    </div>
  );
}
