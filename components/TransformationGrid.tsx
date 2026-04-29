'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import TypewriterHeader from '@/components/TypewriterHeader';

export default function TransformationGrid() {
  const { t, language } = useLanguage();

  const transformKeywords = language === 'pt' ? ['visão', 'negócio', 'execução', 'real'] : ['Business-vision', 'execution', 'real'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center pt-12 md:pt-[var(--header-height)]">
      <div className="space-y-12">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-[1px] bg-frozen-lake" />
            <span className="text-xs font-mono font-black text-frozen-lake uppercase tracking-[0.4em]">{t.transform.label}</span>
          </motion.div>
          <TypewriterHeader 
            text={t.transform.title}
            keywords={transformKeywords}
            className="text-5xl md:text-8xl font-display font-black leading-[0.95] text-white uppercase italic"
            highlightColor="green"
          />
        </div>
        <p className="text-xl md:text-2xl text-grey leading-relaxed max-w-2xl font-medium">
          {t.transform.text}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1 bg-white/5 rounded-[48px] border border-white/10">
        {t.transform.items.map((item: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-10 rounded-[40px] bg-ink-black border border-white/5 hover:border-frozen-lake/30 transition-all duration-700 group hover:shadow-[0_20px_50px_rgba(108,207,246,0.1)]"
            data-cursor="hover"
          >
            <div className="space-y-10">
              <div className="flex justify-between items-start">
                <div className="text-[9px] font-mono font-black text-grey/50 uppercase tracking-widest">{t.transform.cardLabel} 0{i+1}</div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-frozen-lake opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 rotate-[-45deg] group-hover:rotate-0">
                  <ArrowRight size={18} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-sm font-display font-bold text-grey uppercase tracking-widest leading-none line-through decoration-frozen-lake/30">
                  {item.from}
                </div>
                <div className="text-3xl md:text-4xl font-display font-black text-white italic tracking-tighter leading-none group-hover:text-frozen-lake transition-colors">
                  {item.to}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
