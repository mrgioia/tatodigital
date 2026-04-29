'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function FAQ() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-32 px-6 bg-white/[0.01]">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-frozen-lake font-mono text-xs tracking-[0.3em] uppercase mb-4 block">{t.faq.label}</span>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight uppercase italic">{t.faq.title}</h2>
        </motion.div>

        <div className="space-y-4">
          {t.faq.items.map((item: any, index: number) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                activeIndex === index ? 'bg-white/5 border-frozen-lake/30' : 'bg-transparent border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
              >
                <span className={`text-lg md:text-xl font-bold transition-all duration-300 ${
                  activeIndex === index ? 'text-frozen-lake' : 'text-porcelain/80 group-hover:text-porcelain'
                }`}>
                  {item.q}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
                  activeIndex === index ? 'rotate-180 border-frozen-lake text-frozen-lake' : 'border-white/10 text-grey'
                }`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 md:px-8 pb-8 text-grey leading-relaxed text-base md:text-lg max-w-3xl">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
